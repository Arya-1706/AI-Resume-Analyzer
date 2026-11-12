const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: [true, 'Question is required'] },
    intention: { type: String, required: [true, 'Intention is required'] },
    answer: { type: String, required: [true, 'Answer is required'] },
  },
  { _id: false },
)

const skillGapSchema = new mongoose.Schema(
  {
    skill: { type: String, required: [true, 'Skill is required'] },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: [true, 'Severity is required'],
    },
  },
  { _id: false },
)

const preparationPlanSchema = new mongoose.Schema({
  day: { type: Number, required: [true, 'Day is required'] },
  focus: { type: String, required: [true, 'Focus is required'] },
  tasks: [String],
})


const analysisSchema = new mongoose.Schema(
  {
    jdMatch: { matched: Number, total: Number },
    sectionScores: [
      { _id: false, section: String, score: Number },
    ],
    keywords: {
      found: [String],
      missing: [String],
    },
    insights: [
      { _id: false, type: { type: String }, text: String },
    ],
    suggestions: [
      {
        _id: false,
        type: { type: String },
        title: String,
        description: String,
      },
    ],
  },
  { _id: false },
)

const interviewReportSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    jobDescription: {
      type: String,
      required: [true, 'Job description is required'],
    },
    resume: String,
    selfDescription: String,
    matchScore: { type: Number, min: 0, max: 100 },
    analysis: analysisSchema,
    resumeFile: { name: String, size: Number },
    technicalQuestions: [questionSchema],
    behavioralQuestions: [questionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { timestamps: true },
)

interviewReportSchema.index({ user: 1, createdAt: -1 })

module.exports = mongoose.model('InterviewReport', interviewReportSchema)