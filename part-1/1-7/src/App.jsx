import { useState } from 'react'


const Headings = ({title}) => <h1>{title}</h1>

const handleClick = (setCount, count) => setCount(count + 1)

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Stats = ({text, data}) => <p>{text} {data}</p>


const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = good === 0 ? 0: (good / total) * 100;
  
  return (
    <div>
      <Headings title={"Give feedback"} />
      <Button text={"Good"} onClick={() => handleClick(setGood,good)}/>
      <Button text={"Neutral"} onClick={() => handleClick(setNeutral,neutral)}/>
      <Button text={"Bad"} onClick={() => handleClick(setBad,bad)}/>
      <Headings title={"Statistics"} />
      <Stats text={"Good: "} data={good}/>
      <Stats text={"Neutral: "} data={neutral} />
      <Stats text={"Bad: "} data={bad}/>
      <Stats text={"All: "} data={total}/>
      <Stats text={"Average: "} data={average}/>
      <Stats text={"Positive: "} data={`${positive} %`}/>
    </div>
  )
}

export default App