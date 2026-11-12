import QuestionCard from './QuestionCard'

export default function QuestionSection({ title, questions }) {
  return (
    <section>
      <div className='content-header'>
        <h2>{title}</h2>

        <span className='content-header__count'>
          {questions.length} questions
        </span>
      </div>

      <div className='q-list'>
        {questions.map((question, index) => (
          <QuestionCard
            key={index}
            item={question}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}