import React, { useEffect, useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { userData } from '../../Redux/Action'
import { Audio } from 'react-loader-spinner'

function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({})
    const [data, setData] = useState()
    

    const email = form.email




    const updateForm = (e, key) => {
        setForm({ ...form, [key]: e.target.value })
    }

    // console.log(form)

    useEffect(() => {
        document.querySelector('.login').classList.add('active')
    }, [])

    const signin = () => {

        if (!form.email || !form.password) {
            alert('email or password missing')
        }

        else {
            setLoading(true)
            axios.post('https://dead-gray-foal-robe.cyclic.app/users/login', form)
            .then(res => done(res))
            .catch(err => console.log('err', err))
        }
    }

    const done = (res) => {
        
        let msg = res.data.message

        if (msg === 'Password is invalid') {
            setLoading(false)
            alert('Invalid password')
        }
        else if (msg === "User doesn't exist.") {
            setLoading(false)
            alert("User doesn't exist.")
        }
        else {
            axios.get(`https://dead-gray-foal-robe.cyclic.app/users/user/${email}`)
                .then(res => setData(res.data))
                .catch(err => console.log(err.message))  
            }
        }
        useEffect(() => {
            dispatch(userData(data))
            if(data) {
                navigate('/home')
            }
    },[data])
    
    


    return (
        <div className='page'>
        {
            loading ?  <Audio color='white' className='icon' />
                :
            <div className="main">
                <div className='head'>
                    <div className="login">
                        <p className='txt' >Login</p>
                    </div>
                    <div className="signin" onClick={() => navigate('/register')}>
                        <p className='txt' >Register</p>
                    </div>
                </div>
                <div className="form">
                    <div className="inputbox">
                        <label htmlFor="" className='label'>Email Address</label>
                        <input type="text" className='input' onChange={(e) => updateForm(e, 'email')} autoComplete='off' />
                    </div>
                    <div className="inputbox">
                        <label htmlFor="" className='label' >Password</label>
                        <input type="password" className='input' onChange={(e) => updateForm(e, 'password')} autoComplete='off'/>
                    </div>
                    <button className='btn' onClick={signin}>Login</button>
                   
                </div>

            </div>
        }
        </div>
        )
}

export default Login