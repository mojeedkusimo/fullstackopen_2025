import { useState } from 'react'

const Headings = ({title}) => <h1>{title}</h1>

const handleClick = (setCount, count) => setCount(count + 1)

const Button = ({text, onClick}) => <button onClick={handleClick}>{text}</button>

const Stats = ({text, count}) => <p>{text} {count}</p>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Headings title={"Give feedback"} />
      <Button text={"Good"} onClick={() => handleClick(setGood,good)}/>
      <Button text={"Neutral"} />
      <Button text={"Bad"} />
      <Headings title={"Statistics"} />
      <Stats text={"Good: "} count={good}/>
      <Stats text={"Neutral: "} count={neutral} />
      <Stats text={"Bad: "} count={bad}/>
    </div>
  )
}

export default App