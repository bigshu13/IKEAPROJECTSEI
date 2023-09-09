import styles from './UserPortal.module.scss'
import { useState,  useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUser } from '../../utilities/users-services'
//import Logo from '../../components/Logo/Logo' 

export default function UserPortal({ user, setUser, cart }) {
    const [userInfo, setUserInfo] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    console.log(user)
    // useEffect(() => {
    //     const fetchUserInfo = async () => {
    //         try {
    //             const userData = await getUser(user)
    //             setUserInfo(userData)
    //         } catch (error) {
    //             setErrorMessage('Could Not Find Account Information')
    //         }
    //     }
    //     fetchUserInfo()
    // },[user])
    
    return (
        <div className={styles.portalcontainer}>
            {user && user.isLoggedIn ? (
                <div className={styles.loggedin}>
                    <Link  to='/account' className='userlink'>Hey, {user.username}</Link>
                    <Link to='/favorites' className='favbtn'>likes</Link>
                    <Link to='/cart' className={styles.cartbtn}>{cart ? `cart(${cart.totalQty})` : 'cart(0)'}</Link>
                </div>
                
            ) : (
                <div className={styles.notloggedin}>
                <Link to='/guestSignUp' className='loginbtn'>Login/Signup</Link>
                <Link to='/cart' className={styles.cartbtn}>{cart ? `cart(${cart.totalQty})` : 'cart(0)'}</Link>
                </div>
            )}
        </div>
    )
}