
# AI Resume Analyzer

**Know how your resume fits the job before you apply.**

AI Resume Analyzer is a full-stack application that evaluates your resume against a target job description and helps you understand how well your profile aligns with the role.

It goes beyond a match score by identifying keyword gaps, analyzing resume sections, generating relevant interview questions, and creating a personalized preparation roadmap.

<p align="center">
  <img src="docs/screenshots/01-landing-hero.png" alt="AI Resume Analyzer landing page" width="100%">
</p>

---

## ✨ Features

- **Resume Analysis:** Upload your PDF resume and compare it against a target job description.
- **Overall Match Score:** Understand how closely your profile aligns with the target role.
- **Section-wise Analysis:** Evaluate contact details, education, experience, projects, skills, and achievements.
- **Keyword Analysis:** Identify relevant keywords found in your resume and discover missing ones.
- **Interview Questions:** Generate role-specific technical and behavioral questions, including question intent and model-answer guidance.
- **Preparation Roadmap:** Get a personalized, day-by-day interview preparation plan.
- **Tailored Resume:** Generate a role-focused resume using information from your profile.
- **Report Export:** Download your analysis report as a PDF.
- **Analysis History:** Access previously generated reports.
- **Authentication:** Secure registration, login, and protected application routes.

---

## 🖥️ Application Preview

### 1. Landing Page

<p align="center">
  <img src="docs/screenshots/01-landing-hero.png" alt="Landing page" width="100%">
</p>

### 2. Resume Analysis Dashboard

<p align="center">
  <img src="docs/screenshots/02-analyze-dashboard.png" alt="Resume analysis dashboard" width="100%">
</p>

### 3. Resume Review & Match Analysis

<p align="center">
  <img src="docs/screenshots/03-report-overview.png" alt="Resume review and match analysis" width="100%">
</p>

### 4. AI-Generated Interview Questions

<p align="center">
  <img src="docs/screenshots/04-interview-questions.png" alt="Interview questions" width="100%">
</p>

### 5. Personalized Preparation Roadmap

<p align="center">
  <img src="docs/screenshots/05-preparation-roadmap.png" alt="Preparation roadmap" width="100%">
</p>

### 6. How It Works

<p align="center">
  <img src="docs/screenshots/06-landing-features.png" alt="Application workflow and features" width="100%">
</p>

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React, Vite, React Router |
| Styling | SCSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| AI Integration | Google Gemini API |
| Authentication | JWT, HTTP-only Cookies |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 📁 Project Structure

```text
AI-Resume-Analyzer/
│
├── backend/
│   ├── scripts/
│   └── src/
│       ├── config/
│       ├── lib/
│       ├── middlewares/
│       ├── modules/
│       │   ├── auth/
│       │   └── interview/
│       │       └── ai/
│       └── utils/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── app/
│       ├── features/
│       │   ├── auth/
│       │   ├── interview/
│       │   └── landing/
│       ├── lib/
│       ├── shared/
│       └── styles/
│
├── docs/
│   └── screenshots/
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 22 or later
- npm
- MongoDB
- Google Gemini API key

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd AI-Resume-Analyzer
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example` and configure the required environment variables.

| Variable | Description |
|---|---|
| `NODE_ENV` | Application environment |
| `PORT` | Backend server port |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT signing secret |
| `CLIENT_URL` | Primary frontend origin |
| `CORS_ORIGINS` | Allowed frontend origins |
| `GOOGLE_GENAI_API_KEY` | Google Gemini API key |
| `GEMINI_MODELS` | Gemini model fallback list |

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend development server will start. Open the local URL printed in your terminal.

---

## 🧪 Validation

Build the frontend for production:

```bash
cd frontend
npm run build
```

Run backend resume-sanitizer checks:

```bash
cd backend
node scripts/check-resume-sanitizer.js
```

---

## 🔐 Security

- Environment files and secrets should never be committed.
- Production JWT secrets should be strong and unique.
- CORS should allow only trusted frontend origins.
- Database credentials and API keys should be stored in environment variables.
- Resume uploads should be validated and processed securely.

---

## ☁️ Deployment

The application uses two independently deployed Vercel projects:

- **Frontend:** Vercel project with `frontend/` as its root directory.
- **Backend:** Vercel project with `backend/` as its root directory.

Configure the required environment variables and frontend API rewrites before deployment.

---

## 👩‍💻 Author

**Arya Jha**

- GitHub: [Arya-1706](https://github.com/Arya-1706)
- LinkedIn: [Arya Jha](https://www.linkedin.com/in/aryajha17/)

---

<p align="center">
  <i>Built to make resume evaluation and interview preparation more structured, insightful, and accessible.</i>
</p>