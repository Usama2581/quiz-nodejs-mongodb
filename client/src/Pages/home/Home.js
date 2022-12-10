import React from 'react'
import { useState, useEffect } from 'react'
import './home.css'
import axios from 'axios'
import { useSelector } from 'react-redux'


function Home() {
  
  let questions = [
    {
      title: 'Q1. The "function" and " var" are known as:',
      options: [
        'Keywords',
        'Data types',
        'Declaration statements',
        'Prototypes',
      ],
      answer: 'Declaration statements',
    },
    {
      title: 'Q2. Which type of JavaScript language is',
      options: [
        'Object-Oriented',
        'Object-Based',
        'Assembly-language',
        'High-level',
      ],
      answer: 'Object-Based',
    },
    {
      title: 'Q3. Which one of the following is a ternary operator:',
      options: [
        ':',
        '?',
        '-',
        '+',
      ],
      answer: ':',
    },
    {
      title: 'Q4. Which of the following number object function returns the value of the number?',
      options: [
        'toString()',
        'valueOf()',
        'toLocaleString()',
        'toPrecision()',
      ],
      answer: 'valueOf()',
    },
    {
      title: 'Q5. In the JavaScript, which one of the following is not considered as an error:',
      options: [
        'Syntax error',
        'Missing of semicolons',
        'Division by zero',
        'Missing of Bracket',
      ],
      answer: 'Division by zero',
    }
  ]

  let [questionNo, setQuestionNo] = useState(0)
  let [start, setStart] = useState(true)
  let [showQuestion, setShowQuestion] = useState(false)
  let [quizEnded, setQuizEnded] = useState(false)
  let [value, setValue] = useState([])
  let [score, setScore] = useState(0)
  let [currentQuestion, setCurrentQuestion] = useState(1)
  

  const image = useSelector(state => state.userReducer.user.img)
  const name = useSelector(state => state.userReducer.user.name)


  const next = () => {
    let selected = document.querySelector('input[name="radio"]:checked').value

    const tempValues = [...value]
    tempValues.push(selected)
    setValue(tempValues)

    if (questionNo < questions.length - 1) {
      setQuestionNo(questionNo + 1)
      setCurrentQuestion(currentQuestion + 1)
    }
    else {
      setShowQuestion(false)
      setQuizEnded(true)
    }

    let i = 0;
    while (i < questions.length) {
      if (selected === questions[i].answer) {
        setScore(score + 10)
        // alert('')
      }
      i++
    }
  }


  const startQuiz = () => {
    setShowQuestion(true)
    setStart(false)
  }


  const restartQuiz = () => {
    setShowQuestion(true)
    setQuizEnded(false)
    setQuestionNo(0)
    setValue("")
  }


  

  
  return (
    <div>
      <div className='parent'>
        <div>
          {
            start ? 
            <div className='child'>
              <img src={image} alt="" className='img' width='150'/>
        <p>Hello, {name}</p>
            <button onClick={startQuiz} className='start'>Start</button> 
            </div>
            : null
            
          }
          {
            showQuestion ? <div className='quiz'>
              <h3 className='question'>{questions[questionNo].title}</h3>
              <ul>
                {
                  questions[questionNo].options.map(item => {
                    return <li key={Math.random()} className='ans'>
                      <input type='radio' name='radio' value={item} className='radio' />{item}</li>
                  })
                }
              </ul>
              <div className='end'>
                <p>Question {currentQuestion} out of {questions.length} </p>
                <button onClick={next} className='next'>Next</button>
              </div>
            </div> : null
          }
          {
            quizEnded ? <div className='score'>
              <h2 className='heading2' >Your score is : {score}</h2>
              <div className='answer'>
                <div className="rightans">
                  <h3>Answers</h3>
                  <p>Declaration statements</p>
                  <p>Object-Based</p>
                  <p>:</p>
                  <p>valueOf()</p>
                  <p>Division by zero</p>
                </div>
                <div className="myans">
                  <h3>Your answers</h3>
                  {
                    value.map(item => {
                      return <p>{item}</p>
                    })
                  }
                </div>
              </div>
              <button onClick={restartQuiz} className='restart' >Restart</button>
            </div> : null
          }
        </div>
      </div>
    </div>
  )
}

export default Home