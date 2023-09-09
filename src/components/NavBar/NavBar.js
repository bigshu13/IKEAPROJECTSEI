import { Link } from "react-router-dom";
import styles from './NavBar.module.scss'
import Logo from "../Logo/Logo";

export default function NavBar({ AboutUs, Shop, Jobs }) {

    return (

        <main className={styles.NavBar}>
            <div>
                <Logo />
                <Link to='/HomeScreen' className='aboutBtn'>About Us</Link>
                <Link to='/shop' className='shopBtn'>Shop</Link>
                <Link to='/HomeScreen' className='jobsBtn'>Jobs</Link>
            </div>
        </main>
    )
}
