const { z } = require('zod')

const questionSchema = z.object({
  question: z.string().describe('An interview question that could be asked'),
  intention: z.string().describe('What the interviewer wants to learn by asking it'),
  answer: z.string().describe('How to answer: the key points to cover and the approach to take'),
})


const SECTION_KEYS = [
  'contact',
  'education',
  'experience',
  'projects',
  'skills',
  'achievements',
]

const analysisSchema = z.object({
  jdMatch: z.object({
    matched: z.number().int().min(0).describe(
      'How many key requirements of the job description the candidate meets'
    ),
    total: z.number().int().min(1).describe(
      'How many key requirements the job description has in total'
    ),
  }),

  sectionScores: z
    .array(
      z.object({
        section: z.enum(SECTION_KEYS),
        score: z.number().min(0).max(100),
      })
    )
    .describe('One score per resume section'),

  keywords: z.object({
    found: z.array(z.string()).describe(
      'Important job description keywords that appear in the candidate profile'
    ),
    missing: z.array(z.string()).describe(
      'Important job description keywords that do not appear in the candidate profile'
    ),
  }),

  insights: z
    .array(
      z.object({
        type: z.enum(['strength', 'gap', 'tip']),
        text: z.string().describe('One short sentence'),
      })
    )
    .describe('Short insights about the match'),

  suggestions: z
    .array(
      z.object({
        type: z.enum(['keywords', 'impact', 'content', 'format']),
        title: z.string().describe('Short action title, 2 to 5 words'),
        description: z.string().describe(
          'One or two sentences explaining what to change'
        ),
      })
    )
    .describe('Concrete improvements to the resume'),
})


const interviewReportSchema = z.object({
  title: z.string().describe('Short job title taken from the job description, e.g. Senior Frontend Engineer'),
  matchScore: z.number().min(0).max(100).describe('How well the candidate matches the job, from 0 to 100'),
  analysis: analysisSchema,
  technicalQuestions: z.array(questionSchema).min(1).describe('Technical questions with intention and how to answer'),
  behavioralQuestions: z.array(questionSchema).min(1).describe('Behavioral questions with intention and how to answer'),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe('A skill the candidate is lacking for this job'),
        severity: z.enum(['low', 'medium', 'high']).describe('How much this gap can hurt the candidate chances'),
      }),
    )
    .describe('Skill gaps in the candidate profile'),
  preparationPlan: z
    .array(
      z.object({
        day: z.number().int().min(1).describe('Day number, starting from 1'),
        focus: z.string().describe('Main focus of the day, e.g. system design or mock interviews'),
        tasks: z.array(z.string()).min(1).describe('Concrete tasks for the day'),
      }),
    )
    .describe('Day by day preparation plan'),
})

const resumeHtmlSchema = z.object({
  html: z.string().min(50).describe('A complete standalone HTML document of the resume'),
})

module.exports = { interviewReportSchema, resumeHtmlSchema }