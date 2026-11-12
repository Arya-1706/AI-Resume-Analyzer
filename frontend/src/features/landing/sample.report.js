// A made-up candidate, so the public sample page needs
// no login, database or AI quota.

const sampleReport = {
  _id: 'sample',
  title: 'Software Engineer Intern',
  matchScore: 92,
  previousMatchScore: 84,
  resumeFile: {
    name: 'Sample_Resume.pdf',
    size: 760000,
  },
  resume: `SAMPLE CANDIDATE
B.Tech, Computer Science
EXPERIENCE
Open Source Contributor, Summer Program
- Built new features for an open source project and fixed critical issues.
- Reviewed pull requests and improved the project documentation.
PROJECTS
Resume Analyzer (Python, Flask, OpenAI)
- Web app that analyzes resumes against job descriptions and gives AI feedback.
- Added text extraction and section-wise score generation.
Bookmark Manager (React, Supabase)
- Full-stack app with tagging, search and sync.
SKILLS
C++, Python, JavaScript, React, Node.js, Flask, SQL, MongoDB`,
  analysis: {
    jdMatch: {
      matched: 23,
      total: 25,
    },
    sectionScores: [
      { section: 'contact', score: 100 },
      { section: 'education', score: 95 },
      { section: 'experience', score: 88 },
      { section: 'projects', score: 94 },
      { section: 'skills', score: 90 },
      { section: 'achievements', score: 85 },
    ],
    keywords: {
      found: [
        'Python',
        'React',
        'SQL',
        'MongoDB',
        'JavaScript',
        'Node.js',
        'Flask',
        'Git',
        'JSON',
        'HTML',
        'CSS',
        'C++',
        'Data Structures',
        'Algorithms',
        'Open Source',
        'LLM',
        'OpenAI',
        'Web Development',
      ],
      missing: [
        'System Design',
        'Docker',
        'CI/CD',
        'REST APIs',
        'Agile',
        'Unit Testing',
        'Linux',
      ],
    },
    insights: [
      {
        type: 'strength',
        text: 'Strong match for core skills: Python, React, SQL and MongoDB.',
      },
      {
        type: 'strength',
        text: 'Project experience lines up well with the role requirements.',
      },
      {
        type: 'gap',
        text: 'Missing a few preferred skills: Docker, CI/CD and Linux.',
      },
      {
        type: 'tip',
        text: 'Add more impact numbers, for example performance or usage figures.',
      },
    ],
    suggestions: [
      {
        type: 'keywords',
        title: 'Add Missing Keywords',
        description:
          'Include relevant skills like Docker, CI/CD, System Design and Linux.',
      },
      {
        type: 'impact',
        title: 'Quantify Your Impact',
        description:
          'Add measurable results, for example: improved response time by 40%.',
      },
      {
        type: 'content',
        title: 'Enhance Projects Section',
        description:
          'Highlight your role, tech stack and the problem you solved.',
      },
    ],
  },
  technicalQuestions: [
    {
      question: 'How would you design a REST API for a bookmark manager?',
      intention:
        'Checks API design basics and how you think about resources and errors.',
      answer:
        'Name the resources (bookmarks, tags), use the right HTTP verbs and status codes, add pagination and search, and explain how you validate input.',
    },
    {
      question: 'When would you pick MongoDB over a SQL database?',
      intention:
        'Checks that you understand trade-offs instead of following trends.',
      answer:
        'Explain the data shape, the need for joins and transactions, and how each choice affects queries and consistency. Use your own projects as examples.',
    },
    {
      question: 'How does React decide when to re-render a component?',
      intention:
        'Checks your mental model of state, props and rendering.',
      answer:
        'Cover state and prop changes, parent re-renders, keys, and when memoization actually helps.',
    },
  ],
  behavioralQuestions: [
    {
      question:
        'Tell me about a time a maintainer asked you to change your pull request.',
      intention: 'Checks how you take feedback and collaborate.',
      answer:
        'Describe the situation briefly, what you changed and why, and what you learned about reviews.',
    },
    {
      question:
        'Describe a project where you had to learn a new tool quickly.',
      intention: 'Checks learning speed and resourcefulness.',
      answer:
        'Name the tool, how you broke the learning into steps, and the result you shipped.',
    },
  ],
  skillGaps: [
    { skill: 'System Design', severity: 'high' },
    { skill: 'Docker', severity: 'medium' },
    { skill: 'CI/CD', severity: 'medium' },
  ],
  preparationPlan: [
    {
      day: 1,
      focus: 'Docker basics',
      tasks: [
        'Containerize one of your projects',
        'Write a Dockerfile and a compose file',
      ],
    },
    {
      day: 2,
      focus: 'System design fundamentals',
      tasks: [
        'Study load balancing and caching',
        'Sketch the design of your bookmark app at scale',
      ],
    },
    {
      day: 3,
      focus: 'Mock interview',
      tasks: [
        'Answer the technical questions out loud',
        'Prepare two stories for the behavioral questions',
      ],
    },
  ],
}

export default sampleReport