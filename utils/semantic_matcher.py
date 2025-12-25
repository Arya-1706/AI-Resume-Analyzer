import numpy as np
import re
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer

# -------------------------------------------------
# Load model ONCE (important for performance)
# -------------------------------------------------
model = SentenceTransformer("all-MiniLM-L6-v2")


def semantic_score(resume_text: str, job_desc: str):
    """
    Returns:
        semantic_score (float between 0–1)
        explained_chunks (list of dicts)
    """

    # -------------------------------------------------
    # 1. Guard clauses (CRITICAL)
    # -------------------------------------------------
    if not resume_text or not resume_text.strip():
        return 0.0, []

    if not job_desc or not job_desc.strip():
        return 0.0, []

    resume_chunks = split_into_chunks(resume_text)
    if not resume_chunks:
        return 0.0, []

    # -------------------------------------------------
    # 2. Encode job description ONCE
    # -------------------------------------------------
    job_emb = model.encode(job_desc)
    job_emb = np.array(job_emb).reshape(1, -1)

    explained_chunks = []
    similarity_scores = []

    # -------------------------------------------------
    # 3. Compare each resume chunk
    # -------------------------------------------------
    for chunk in resume_chunks:
        chunk_emb = model.encode(chunk)
        chunk_emb = np.array(chunk_emb).reshape(1, -1)

        sim = cosine_similarity(chunk_emb, job_emb)[0][0]

        # Safety: skip invalid values
        if np.isnan(sim):
            continue

        similarity_scores.append(sim)

        # -------------------------------------------------
        # 4. Explanation mapping (Explainability)
        # -------------------------------------------------
        if sim >= 0.7:
            explanation = "Strong semantic alignment with the job responsibilities."
        elif sim >= 0.4:
            explanation = "Partial alignment; relevant experience but different phrasing."
        else:
            explanation = "Weak alignment; related but not central to the role."

        explained_chunks.append({
            "text": chunk,
            "score": float(sim),
            "explanation": explanation
        })

    # -------------------------------------------------
    # 5. Final safety check
    # -------------------------------------------------
    if not similarity_scores:
        return 0.0, []

    # -------------------------------------------------
    # 6. Final semantic score
    # -------------------------------------------------
    semantic = float(max(similarity_scores))

    # Clamp to [0, 1] for absolute safety
    semantic = max(0.0, min(1.0, semantic))

    # Sort chunks by relevance (descending)
    explained_chunks.sort(key=lambda x: x["score"], reverse=True)

    # Return top 3 most relevant chunks
    return semantic, explained_chunks[:3]


def split_into_chunks(text: str, chunk_size: int = 4):
    """
    Break resume text into meaningful chunks.
    """
    lines = re.split(r"\n+|-•", text)
    lines = [l.strip() for l in lines if len(l.strip()) > 20]

    if not lines:
        return []

    chunks = []
    for i in range(0, len(lines), chunk_size):
        chunk = " ".join(lines[i:i + chunk_size])
        chunks.append(chunk)

    return chunks




