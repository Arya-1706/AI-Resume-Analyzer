SKILLS = {
    "programming_languages": {
        "python": ["python", "py", "python3"],
        "java": ["java"],
        "c++": ["c++", "cpp"],
        "javascript": ["javascript", "js"],
        "c": ["c language", "c programming"]
    },

    "frameworks": {
        "flask": ["flask"],
        "django": ["django"],
        "react": ["react", "reactjs"],
        "node.js": ["node", "nodejs", "node.js"],
        "spring": ["spring", "spring boot"]
    },

    "databases": {
        "sql": ["sql", "mysql", "postgresql", "sqlite"],
        "mongodb": ["mongodb", "mongo"],
        "dbms": ["dbms", "database management system"]
    },

    "cs_fundamentals": {
        "dsa": ["dsa", "data structures", "algorithms"],
        "oops": ["oops", "oop", "object oriented programming"],
        "operating systems": ["operating system", "os"],
        "computer networks": ["computer networks", "cn"],
    },

    "tools": {
        "git": ["git"],
        "github": ["github"],
        "docker": ["docker"],
        "linux": ["linux"]
    }
}

def extract_skills(text: str):
    text = text.lower()

    detected = {
        "programming_languages": set(),
        "frameworks": set(),
        "databases": set(),
        "cs_fundamentals": set(),
        "tools": set()
    }

    for category, skills in SKILLS.items():
        for canonical, variants in skills.items():
            for variant in variants:
                if variant in text:
                    detected[category].add(canonical)
                    break

    return detected
