import { useState } from 'react'


const Headings = ({title}) => <h1>{title}</h1>

const handleClick = (setCount, count) => setCount(count + 1)

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Stats = ({text, data}) => <p>{text} {data}</p>

const Statistics = (props) => {
  return (
    <div>
      <Stats text={"Good: "} data={props.good}/>
      <Stats text={"Neutral: "} data={props.neutral} />
      <Stats text={"Bad: "} data={props.bad}/>
      <Stats text={"All: "} data={props.total}/>
      <Stats text={"Average: "} data={props.average}/>
      <Stats text={"Positive: "} data={`${props.positive} %`}/>
    </div>
  )
}


const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad;
  const average =  (good - bad) === 0 ? 0: (good - bad) / total;
  const positive = good === 0 ? 0: (good / total) * 100;
  
  return (
    <div>
      <Headings title={"Give feedback"} />
      <Button text={"Good"} onClick={() => handleClick(setGood,good)}/>
      <Button text={"Neutral"} onClick={() => handleClick(setNeutral,neutral)}/>
      <Button text={"Bad"} onClick={() => handleClick(setBad,bad)}/>
      <Headings title={"Statistics"} />
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  )
}

export default App