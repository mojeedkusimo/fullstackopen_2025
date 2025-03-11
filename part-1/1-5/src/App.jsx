const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = (props) => {
    return (
      <h1>
        {props.course}
      </h1>
    )
  }

  const Part = (props) => {
    return (
      <p>
        {props.course} {props.exercises}
      </p>
    )
  }

  const Course = () => {
    return (
      <>
        <Part
          course={course.parts[0].name}
          exercises={course.parts[0].exercises}
        />
        <Part
          course={course.parts[1].name}
          exercises={course.parts[1].exercises}
        />
        <Part
          course={course.parts[2].name}
          exercises={course.parts[2].exercises}
        />
      </>
    )
  }

  const Total = (props) => {

    return (
      <p>
        Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}
      </p>
    )
  }


  return (
    <div>
      <Header course={course.name} />
      <Course />
      <Total 
        exercises1={course.parts[0].exercises}
        exercises2={course.parts[1].exercises}
        exercises3={course.parts[2].exercises}
      />
    </div>
  )
}
export default App