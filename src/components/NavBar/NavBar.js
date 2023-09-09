import { Link } from "react-router-dom";
import styles from './NavBar.module.scss';

export default function NavBar({ AboutUs, Shop, Jobs }) {

    return (

        <main>
            <section className={styles.Links}>
                <ul>
                    <li><a href='/HomeScreen'>About Us</a></li>
                    <li><a href='/shop'>Shop</a></li>
                    <li><a href='/HomeScreen'>Jobs</a></li>
                </ul>

            </section>
        </main>
    )
}
