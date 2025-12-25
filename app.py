from flask import Flask, render_template, request
from utils.pdf_reader import extract_text_from_pdf
from utils.skill_matcher import analyze
from utils.semantic_matcher import semantic_score

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def index():
    # -----------------------------
    # ALWAYS INITIALIZE VARIABLES
    # -----------------------------
    matched = {}
    missing = []
    explanations = {}
    skill_weights = {}

    skill_score = 0
    semantic = 0.0
    semantic_normalized = 0.0
    importance_bonus = 0
    final_score = 0

    explained_chunks = []
    top_chunks = []

    ai_insight = ""
    decision = ""

    # -----------------------------
    # HANDLE FORM SUBMISSION
    # -----------------------------
    if request.method == "POST":
        resume_file = request.files.get("resume")
        job_desc = request.form.get("job", "").strip().lower()

        if resume_file and job_desc:
            # -----------------------------
            #  EXTRACT RESUME TEXT
            # -----------------------------
            resume_text = extract_text_from_pdf(resume_file)

            # -----------------------------
            #  PHASE 1 — SKILL MATCHING
            # -----------------------------
            matched, missing, explanations, skill_weights = analyze(
                resume_text,
                job_desc
            )

            # Skill score (%)
            total_skills = len(matched) + len(missing)
            skill_score = int((len(matched) / max(total_skills, 1)) * 100)

            # Importance bonus (simple version)
            importance_bonus = min(sum(skill_weights.values()), 20)

            # -----------------------------
            #  PHASE 2 — SEMANTIC MATCHING
            # -----------------------------
            semantic, explained_chunks = semantic_score(
                resume_text,
                job_desc
            )

            semantic_normalized = round(semantic * 100, 1)

            if not explained_chunks:
                explained_chunks = []

            # -----------------------------
            #  TOP RELEVANT RESUME CHUNKS (UI-SHAPED)
            # -----------------------------
            top_chunks = [
                (
                    chunk["text"],
                    round(chunk["score"] * 100, 1)
                )
                for chunk in explained_chunks[:3]
            ]

            # -----------------------------
            #  FINAL SCORE (SAFE & CLAMPED)
            # -----------------------------
            final_score = int(
                (skill_score * 0.5) +
                (semantic_normalized * 0.4) +
                importance_bonus
            )
            final_score = max(0, min(100, final_score))

            # -----------------------------
            #  AI INSIGHT (EXPLAINABILITY)
            # -----------------------------
            if semantic > 0.7:
                ai_insight = "Your resume aligns strongly with the role’s responsibilities."
            elif semantic > 0.4:
                ai_insight = "Your resume partially aligns but uses different phrasing."
            else:
                ai_insight = "Your resume focuses on areas different from this role."

            # -----------------------------
            #  DECISION LABEL
            # -----------------------------
            if final_score >= 75:
                decision = "Strong Match"
            elif final_score >= 50:
                decision = "Moderate Match"
            else:
                decision = "Low Match"

    # -----------------------------
    #  RENDER TEMPLATE
    # -----------------------------
    return render_template(
        "index.html",
        matched=matched,
        missing=missing,
        explanations=explanations,
        skill_weights=skill_weights,
        score=final_score,
        skill_score=skill_score,
        semantic_score=semantic_normalized,
        importance_bonus=importance_bonus,
        decision=decision,
        ai_insight=ai_insight,
        top_chunks=top_chunks
    )


if __name__ == "__main__":
    app.run(debug=True)

