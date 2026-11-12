import { Link } from 'react-router-dom'
import {
  Compass,
  FileText,
  MessageSquare,
  Search,
  Target,
} from 'lucide-react'

import Card from '../../../shared/components/ui/Card'
import ProgressBar from '../../../shared/components/ui/ProgressBar'
import ScoreRing from '../../../shared/components/ui/ScoreRing'

const MINI_SCORES = [
  { label: 'Experience', value: 88 },
  { label: 'Projects', value: 94 },
  { label: 'Skills', value: 90 },
]

const STEPS = [
  {
    title: 'Add your details',
    text: 'Upload your resume as a PDF, or write a short self description, and paste the job description.',
  },
  {
    title: 'AI compares them',
    text: 'Your profile is checked against the real requirements of the role, section by section.',
  },
  {
    title: 'Get your plan',
    text: 'See your score, the gaps to close, likely interview questions and a day by day plan.',
  },
]

const FEATURES = [
  {
    Icon: Target,
    title: 'Match score and sections',
    text: 'An overall score plus one for contact details, education, experience, projects, skills and achievements.',
  },
  {
    Icon: Search,
    title: 'Keyword gaps',
    text: 'See which important keywords from the job description you already use, and which are missing.',
  },
  {
    Icon: MessageSquare,
    title: 'Interview questions',
    text: 'Technical and behavioral questions for this exact role, with what the interviewer wants and how to answer.',
  },
  {
    Icon: Compass,
    title: 'Preparation roadmap',
    text: 'A day by day plan that spends your time on the skill gaps that matter most.',
  },
  {
    Icon: FileText,
    title: 'Tailored resume PDF',
    text: 'Download a resume rewritten for the role, using only facts from your own profile.',
  },
]

export default function Landing() {
  return (
    <main>
      <section className='landing-hero'>
        <div className='landing-hero__copy'>
          <h1>
            Know how your resume fits the job{' '}
            <span className='highlight'>before you apply</span>
          </h1>

          <p>
            Upload your resume and paste a job description. Get a match
            score, missing keywords, interview questions and a preparation plan.
          </p>

          <div className='landing-hero__actions'>
            <Link to='/analyze' className='button primary-button'>
              Analyze my resume
            </Link>

            <Link to='/sample' className='button ghost-button'>
              See a sample report
            </Link>
          </div>

          <small className='landing-hero__note'>
            Takes about 30 seconds.
          </small>
        </div>

        <Card title='Overall Match Score' className='landing-hero__card'>
          <div className='score-card__body'>
            <p className='score-card__value'>92%</p>
            <ScoreRing value={92} />
          </div>

          <ul className='mini-bars'>
            {MINI_SCORES.map(({ label, value }) => (
              <li key={label}>
                <span>{label}</span>
                <ProgressBar value={value} label={label} />
                <span>{value}%</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className='landing-section'>
        <h2>How it works</h2>

        <ol className='steps'>
          {STEPS.map((step, index) => (
            <li key={step.title}>
              <span className='step-number'>{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className='landing-section'>
        <h2>What you get</h2>

        <ul className='feature-grid'>
          {FEATURES.map(({ Icon, title, text }) => (
            <li key={title} className='feature'>
              <Icon size={24} />
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className='cta-band'>
        <h2>Ready to see your score?</h2>
        <p>
          Check a resume against a real job description now, or look at a
          sample report first.
        </p>

        <div className='landing-hero__actions cta-band__actions'>
          <Link to='/analyze' className='button primary-button'>
            Analyze my resume
          </Link>

          <Link to='/sample' className='button ghost-button'>
            See a sample report
          </Link>
        </div>
      </section>
    </main>
  )
}