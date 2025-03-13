
const Header = ({course}) => {
  return (
    <h1>
      {course}
    </h1>
  )
}

const Part = ({course,exercises}) => {
  return (
    <p>
      {course} {exercises}
    </p>
  )
}

const Course = ({course}) => {
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

const Total = ({exercises1,exercises2,exercises3}) => {

  return (
    <p>
      Number of exercises {exercises1 + exercises2 + exercises3}
    </p>
  )
}


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

  return (
    <div>
      <Header course={course.name} />
      <Course course={course}/>
      <Total 
        exercises1={course.parts[0].exercises}
        exercises2={course.parts[1].exercises}
        exercises3={course.parts[2].exercises}
      />
    </div>
  )
}
export default App