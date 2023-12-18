 import React from 'react'
 import Navbar from './Navbar.jsx'
 import styles from './layout.module.css';
 
 const Layout = ({children}) => {
   return (
    <div className={styles.container}>
       <Navbar/>
        {children}
      
     </div>
   )
 }
 
 export default Layout
 