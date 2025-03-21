
const Header = ({ course }) => {
  return (
    <h1>
      {course}
    </h1>
  )
}


const Part = ({ course, exercises }) => {
  return (
    <p>
      {course} {exercises}
    </p>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      {course.parts.map(part =>
        (<Part key={part.id} course={part.name} exercises={part.exercises} />)
      )}
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App