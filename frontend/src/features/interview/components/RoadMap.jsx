function RoadMapDay({ day }) {
  return (
    <div className='roadmap-day'>
      <div className='roadmap-day__header'>
        <span className='roadmap-day__badge'>
          Day {day.day}
        </span>

        <h3 className='roadmap-day__focus'>
          {day.focus}
        </h3>
      </div>

      <ul className='roadmap-day__tasks'>
        {day.tasks.map((task, index) => (
          <li key={index}>
            <span className='roadmap-day__bullet' />
            {task}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function RoadMap({ plan }) {
  return (
    <section>
      <div className='content-header'>
        <h2>Preparation Road Map</h2>

        <span className='content-header__count'>
          {plan.length}-day plan
        </span>
      </div>

      <div className='roadmap-list'>
        {plan.map((day) => (
          <RoadMapDay key={day.day} day={day} />
        ))}
      </div>
    </section>
  )
}