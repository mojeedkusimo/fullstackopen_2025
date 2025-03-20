

const Curriculum = ({ title }) => {
  return (
    <h1>
      {title}
    </h1>
  )
}

const Header = ({ course }) => {
  return (
    <h2>
      {course}
    </h2>
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


const Courses = ({ courses }) => {
  return (
    <>
      {courses.map(course => 
        <Course key={course.id} course={course} />
      )}
    </>
  )
}




const App = () => {
  const title = 'Web development curriculum'
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
    <Curriculum title={title} />
    <Courses courses={courses} />
    </>
  )
}

export default App