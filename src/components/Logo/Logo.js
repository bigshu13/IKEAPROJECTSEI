//import styles from the module.scss
import styles from './Logo.module.scss'


//export function to have Project title
export default function Logo() {
    return (
        <div className="animate__animated animate__tada animate__slow">
        <div className={styles.Logo}>
            <div>Ikea</div>
        </div>
        </div>
    );
}
