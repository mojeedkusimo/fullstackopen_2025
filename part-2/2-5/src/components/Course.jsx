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

export default Course