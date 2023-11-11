import React  from 'react';
import cloudy from './About-img.png' 

const About = () => {
  
  return (
    <div>
      <div className='container mx-auto bg-'>
        <img src={cloudy} style={{width:'60%',marginLeft:'20%'}} alt=''></img>
        <div className="container mt-5">
          <p style={{fontSize:'120%',fontFamily:'fantasy'}}>This is a Web Application where you can store your notes , edit your notes and delete your notes. You will be the complete owner of your notes and no one else can access your notes. Enjoy this application by storing your important notes.</p>
        </div>
      </div>
    </div>
  );
};

export default About
