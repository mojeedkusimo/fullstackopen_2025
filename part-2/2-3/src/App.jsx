
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

const Total = ({course}) => {

  return (
    <p>
      <b>Total of {course.parts.reduce((initializer,part) => {
        return initializer + part.exercises
      },0)} exercises</b>
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
      <Total course={course}/>
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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      },
      {
        name: 'Reduce',
        exercises: 100,
        id: 5
      }
    ]
  }

  return <Course course={course} />
}

export default App