import React from 'react';
import { Link } from 'react-router-dom';
import './styles/LandingPage.css'

const LandingPage = () => {
    return (
        <div className='LandingContainer'>
            <div className='LandingText'>
                <span>Hello friend! My name is Braian.</span><br />
                <span>Welcome to my individual proyect<br /> for Soy Henry Bootcamp. </span><br />
                <span>I hope you enjoy my project, <br />feel comfortable creating <br />your own dog Breeds and doing other things. </span><br/>
                <span>Let's begin!</span>
            </div>
            <div className='keyText'>
                <h3>Click the button to begin</h3>
            </div>
            <Link to='/home'>
                <button className='LandingBtn'><img src=''/>START</button>
            </Link>            
        </div>
    )
};


export default LandingPage;