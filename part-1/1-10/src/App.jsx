import { useState } from 'react'


const Headings = ({title}) => <h1>{title}</h1>

const handleClick = (setCount, count) => setCount(count + 1)

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Stats = ({text, data}) => <p>{text} {data}</p>

const ButtonGroup = (props) => {
  return (
    <div>
      <Button text={props.text1} onClick={props.onClick1}/>
      <Button text={props.text2} onClick={props.onClick2}/>
      <Button text={props.text3} onClick={props.onClick3}/>
    </div>
  )
}


const Statistics = (props) => {
  return (
    <div>
      <Stats text={props.text1} data={props.data1}/>
      <Stats text={props.text2} data={props.data2} />
      <Stats text={props.text3} data={props.data3}/>
      <Stats text={props.text4} data={props.data4}/>
      <Stats text={props.text5} data={props.data5}/>
      <Stats text={props.text6} data={props.data6}/>
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
      <ButtonGroup
        text1={"Good"} onClick1={() => handleClick(setGood,good)}
        text2={"Neutral"} onClick2={() => handleClick(setNeutral,neutral)}
        text3={"Bad"} onClick3={() => handleClick(setBad,bad)}
      />
      <Headings title={"Statistics"} />
      {
        good === 0 && neutral === 0 && bad === 0 ?
        <p>No feedback given</p>:
        <Statistics 
        text1={"Good: "} data1={good} 
        text2={"Neutral: "} data2={neutral} 
        text3={"Bad: "} data3={bad}
        text4={"All: "} data4={total}
        text5={"Average: "} data5={average}
        text6={"Positive: "} data6={`${positive} %`}
      />}
    </div>
  )
}

export default App