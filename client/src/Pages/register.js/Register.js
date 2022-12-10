import React, { useEffect, useState } from 'react'
import '../login/login.css'
import { useNavigate } from 'react-router-dom'
import { postImg } from '../../config/firebase'
import axios from 'axios'



function Register() {

    const navigate = useNavigate()
    const [form, setForm] = useState({})
    const [disable, setDisable] = useState(true)

    const handleImage = async (e) => {
        const source = e.target.files[0]
        try {
            const url = await postImg(source)
            setForm({ ...form, ['img'] : url})
        } catch (e) {
            console.log(e.message)
        }
    }

    const updateForm = (e, key) => {
        setForm({ ...form, [key] : e.target.value })
    }


    useEffect(() => {
       document.querySelector('.signin').classList.add('active')
    }, [])

    useEffect(() => {
        if(form.img != null) {
            setDisable(true)
        }
        else {
            setDisable(false)
        }
    }, [form])

    
    
    
    const signup = () => {
        if(!form.name  || !form.email || !form.password ) {
            alert('All fields are required') 
        }
        else {
            // console.log(form)
               axios.post('https://dead-gray-foal-robe.cyclic.app/users/register', form)
               .then(res => done(res))
               .catch(err => alert(err.data.message))
        }
    }

   

    const done = (res) => {
        alert(res.data.message)
        navigate('/login')
        setForm({ name: '', email: '', password:'' , img: ''})
    }


  return (
    <div className='page'>
    <div className="main">
        <div className='head'>
            <div className="login" onClick={() => navigate('/login')}>
                <p className='txt' >Login</p>
            </div>
            <div className="signin">
                <p className='txt' >Register</p>
            </div>
        </div>
        <div className="form">
            <div className="inputbox">
                <label htmlFor="" className='label'>Name</label>
                <input type="text" className='input' onChange={(e) => updateForm(e,'name')}  />
            </div>
            <div className="inputbox">
                <label htmlFor="" className='label'>Email Address</label>
                <input type="email" className='input' onChange={(e) => updateForm(e,'email')}  />
            </div>
            <div className="inputbox">
                <label htmlFor="" className='label' >Password</label>
                <input type="password" className='input' onChange={(e) => updateForm(e,'password')}  />
            </div>
            <div className="inputbox">
                <label htmlFor="" className='label' >Profile Picture</label>
                <input type='file' onChange={handleImage} className='file'  />
            </div>
            {
                disable ? 
                <button className='btn' id='btn'  onClick={signup}>Register</button>
                : 
                <button className='button'>Register</button>
            }
        </div>

    </div>
</div>
  )
}

export default Register