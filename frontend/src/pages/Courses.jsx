import React from 'react'
import './CSS/Courses.css'

const Courses = () => {
  return (
    <div className='courses'>
         <div className="courses-title"> 
         <h2>The Courses Offered By Us</h2>
         </div>
         
         <div className="courses-list">
          <button>Jee</button>
          <button>GATE</button>
          <button>UPSC</button>
          <button>RAILWAYS</button>
          <button>Banking</button>
         </div>
         
         <div className="courses-bat">
         <h2> New batches Starts Soon !!! Enroll Now For Best Results and Have Bright Future </h2>
         <p>For Further Details contact @ksrietcpexams.co.in || contact Ph No : 6666444523</p>
         </div>

        </div>
  )
}

export default Courses