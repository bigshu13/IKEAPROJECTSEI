import React, { useEffect, useState } from 'react';
import PexelsContent from '../../components/Pexels/PexelsContent';
import './HomeScreen.module.scss';

export default function HomeScreen({ user, setUser, pexelsData, setPexelsData }) {
  console.log(user)

  return (
    <div className="home-screen">
      <h1>What's Your Style?</h1>
      <div className="pexels-content">
        {/* <PexelsContent pexelsData={pexelsData} setPexelsData={setPexelsData} /> */}
      </div>
    </div>
  );
}

//==== NEEDED COMPONENTS FOR HOME SCREEN ====//
/*
    Logo
    USER PORTAL COMPONENT
    FOOTER COMPONENT
    NavBar

    - PICTURES & VIDEOS from Pexel's API
    
    */
