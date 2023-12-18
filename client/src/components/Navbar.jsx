import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, logout } from '../reduxHelper/features/auth/authSlice';
import styles from './Navbar.module.css';
//import { checkIsAuth } from '../reduxHelper/features/auth/authSlice';

const Navbar = () => {
    const isAuth = useSelector(checkIsAuth)
   // const isAuth =true
    //const { token } = useSelector((state) => state.auth)
    console.log(isAuth);;
    const dispatch = useDispatch()
    const activeStyles = {
        color: 'white',
    }
    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        prompt('Log out')
    }
  return (
    <div className={styles.container}>
        <span></span>
        {
            isAuth && (
                <ul>
                <li>
                <NavLink className={styles.navlink} to={'/'}
                                href='/'
                              
                                style={({ isActive }) =>
                                    isActive ? activeStyles : undefined
                                }>
                      Main
                 </NavLink>
                </li>
                <li>
                <NavLink className={styles.navlink} to={'/companies'}
                                href='/'
                              
                                style={({ isActive }) =>
                                    isActive ? activeStyles : undefined
                                }>
                   My companies
                 </NavLink>
                </li>
                <li>
                <NavLink className={styles.navlink} to={'/new'}
                                href='/'
                              
                                style={({ isActive }) =>
                                    isActive ? activeStyles : undefined
                                }>
                  create company
                 </NavLink>
                </li>
                <li>
                <NavLink className={styles.navlink} to={'/profile'}
                                href='/'
                              
                                style={({ isActive }) =>
                                    isActive ? activeStyles : undefined
                                }>
    profile
                 </NavLink>
                </li>
            </ul>
            )
        }
     
        <div className={styles.login_btn}>
            {
                isAuth? (<button  onClick={logoutHandler}>Sing out</button>):(<Link to={'/singup'}>Sing up</Link>)
            } 
    </div>
    </div>
  )
}

export default Navbar
