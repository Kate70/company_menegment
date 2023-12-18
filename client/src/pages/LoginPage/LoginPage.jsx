import React from 'react'
import styles from './LoginPage.module.css';
import  { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../reduxHelper/features/auth/authSlice';


const LoginPage = () => {
    const [email, setUseremail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status } = useSelector((state) => state.auth)

    useEffect(() => {
        if (status) prompt(status)
        //if (isAuth) navigate('/')
    }, [status]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        

     dispatch(loginUser({ email,
         password}));
     setPassword('')
         setUseremail('')
            
    }

  return (
   <section>
            <div className={styles.form_box}>
                <div className={styles.form_value}>
                    <form onSubmit={e=>e.preventDefault()}>
                        <h2>Autorization</h2>
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
                      
                                        
                     
                        <button type='submit'
                        onClick={handleSubmit}
                        >Sign in</button>
                        <div className={styles.register}>
                            <p>Don't have a account&gt; </p>
                        </div>
                        <div className={styles.register}>
                        <Link to='/singup'>Registration</Link>
                        </div>
                       
                        {/* <div className={register}>
                            <p> already have a account</p> </div> */}
                    </form>
                </div>
            </div>
        </section>
  )
  
}

export default LoginPage
