import { useEffect, useState } from 'react';
import styles from './profile.module.scss';
import * as usersAPI from '../../utilities/users-api';
//import footer when pushed
//import components for page
//edit component and show component needs to toggleable 
//State needed to see what mode the user is in edit mode or read mode

export default function Profile({ user, setUser }) {
//console.log(user)
  const [profile, setProfile] = useState(null);

useEffect( () => {
    async function fetchUserProfile() {
        const userProfile = await usersAPI.getUserProfile();
        setProfile(userProfile)
        console.log(profile, userProfile)
    }
    fetchUserProfile();
}, [])
  return (
    <main className={styles.profile}>
      <div>
       <h1>Profile Page</h1>
       {/* profile photo component */}
       {/* show component that shows user info */}
       {/* edit component so they can update info  */}
       {/* edit button */}
       {/* cancel and save button */}
      </div>
    </main>
  )};
  