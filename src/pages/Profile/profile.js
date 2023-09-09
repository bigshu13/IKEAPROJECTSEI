import { useEffect, useState } from 'react';
import styles from './profile.module.scss';
import Logo from '../../components/Logo/Logo';
import * as usersAPI from '../../utilities/users-api';
//import footer when pushed

export default function Profile({ user, setUser }) {

  const [showProfile, setShowProfile] = useState(true);

useEffect( () => {
    async function fetchUsers() {
        const showProfile = await usersAPI.getUser();
        setShowProfile(showProfile)
    }
    fetchUsers();
}, [])
  return (
    <main className={styles.profile}>
      <div>
        <Logo />
       
      </div>
    </main>
  )};