import React from 'react'
import  { useState, useEffect } from 'react'
import styles from './SignupPage.module.css';
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../reduxHelper/features/auth/authSlice.js'

const SingupPage = () => {
    const [email, setUseremail] = useState('')
    const [password, setPassword] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [last_name, setLastName] = useState('')
    const [first_name, setFirstName] = useState('')
    const [nick_name, setNickName] = useState('')
    const [description, setDescription] = useState('')
    const [ position, setPosition] = useState('')
    const { status } = useSelector((state) => state.auth)

    const handleSubmit = async (e) => {
        e.preventDefault();
        //const isAuth = useSelector(checkIsAuth)
           

     dispatch(registerUser({ email,
         password, phone_number,last_name,first_name,nick_name, description, position }));
     setPassword('')
             setUseremail('')
             setPhoneNumber('')
             setLastName('')
             setFirstName('')
             setNickName('')
             setDescription('')
             setPosition('')
   
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()
   
    useEffect(() => {
        if (status) {
            prompt(status)
        }
        //if (isAuth) navigate('/')
    }, [status,  navigate]) 
  
    
  return (
     <div className={styles.formvalue}>
        <section>
            <div className={styles.form_box}>
                <div className={styles.form_value}>
                    <form action="">
                        <h2>Reristration</h2>
                        <div  className={styles.input_box}>
                        <ion-icon name="mail-outline" role="img" class="md hydrated"></ion-icon>
                        <input type='email'
                        value={email}
                        onChange={(e) => setUseremail(e.target.value)}/>
                        <label htmlFor=''>Email</label>

                        </div>
                        <div  className={styles.input_box}>
                        <ion-icon name="lock-closed-outline" role="img" class="md hydrated"></ion-icon>
                        <input type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                        <label htmlFor=''>Password</label>

                        </div>
                        <div  className={styles.input_box}>
                        <ion-icon name="lock-closed-outline" role="img" class="md hydrated"></ion-icon>
                        <input type='tel'
                        value={phone_number}
                        onChange={(e) => setPhoneNumber(e.target.value)}/>
                        <label htmlFor=''>phone number</label>
                          
                        </div>
                        <div  className={styles.input_box}>
                        <ion-icon name="mail-outline" role="img" class="md hydrated"></ion-icon>
                        <input type=''
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}/>
                        <label htmlFor=''>last name</label>
                        </div>
                        <div  className={styles.input_box}>
                        <ion-icon name="mail-outline" role="img" class="md hydrated"></ion-icon>
                        <input type='sting'
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}/>
                        <label htmlFor=''>first name</label>

                        </div>
                        <div  className={styles.input_box}>
                        <ion-icon name="mail-outline" role="img" class="md hydrated"></ion-icon>
                        <input type=''
                        value={nick_name}
                        onChange={(e) => setNickName(e.target.value)}/>
                        <label htmlFor=''>nickname</label>

                        </div>
                        <div  className={styles.input_box}>
                        <ion-icon name="mail-outline" role="img" class="md hydrated"></ion-icon>
                        <input type=''
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}/>
                        <label htmlFor=''>description</label>

                        </div>
                        <div  className={styles.input_box}>
                        <ion-icon name="mail-outline" role="img" class="md hydrated"></ion-icon>
                        <input type=''
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}/>
                        <label htmlFor=''>position</label>

                        </div>
                        <button type='submit' onClick={handleSubmit}>Register</button>
                        <div className={styles.register}>
                            <p>alreadu have a account&gt; </p>
                        </div>
                        <div className={styles.register}>
                        <Link to='/login'>Sign in</Link>
                        </div>
                        {/* <div className={register}>
                            <p> already have a account</p> </div> */}
                    </form>
                </div>
            </div>
        </section>
     
      
     
    
     
   </div>
  )
}

export default SingupPage
