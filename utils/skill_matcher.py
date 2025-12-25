from utils.skills_taxonomy import SKILLS


def analyze(resume_text: str, job_desc: str):
    """
    Analyze resume against job description using skill taxonomy.

    Returns:
        matched (dict): {skill -> count_in_resume}
        missing (list): [missing_skill, ...]
        explanations (dict): {skill -> explanation_string}
        skill_weights (dict): {skill -> importance_weight}
    """

    # ----------------------------
    # 0. Normalize inputs (SAFETY)
    # ----------------------------
    resume_text = (resume_text or "").lower()
    job_desc = (job_desc or "").lower()

    matched = {}
    explanations = {}
    required = set()
    skill_weights = {}

    # -------------------------------------------------
    # 1. Detect REQUIRED skills from Job Description
    #    + weight them by frequency (ATS-like)
    # -------------------------------------------------
    for _, skills in SKILLS.items():
        for canonical, variations in skills.items():
            count = 0
            for variant in variations:
                count += job_desc.count(variant.lower())

            if count > 0:
                required.add(canonical)
                skill_weights[canonical] = count

    # -------------------------------------------------
    # 2. Check which REQUIRED skills appear in resume
    # -------------------------------------------------
    for canonical in required:
        variations = None

        # Find variations again safely
        for _, skills in SKILLS.items():
            if canonical in skills:
                variations = skills[canonical]
                break

        if not variations:
            continue

        count = 0
        for variant in variations:
            count += resume_text.count(variant.lower())

        if count > 0:
            matched[canonical] = count

            weight = skill_weights.get(canonical, 1)
            explanations[canonical] = (
                f"Detected {count} time(s) in resume. "
                f"High importance (mentioned {weight} time(s) in job description)."
            )

    # -------------------------------------------------
    # 3. Compute MISSING skills
    # -------------------------------------------------
    missing = sorted(required - set(matched.keys()))

    # -------------------------------------------------
    # 4. FINAL SAFETY (never return undefined values)
    # -------------------------------------------------
    return (
        matched or {},
        missing or [],
        explanations or {},
        skill_weights or {},
    )






