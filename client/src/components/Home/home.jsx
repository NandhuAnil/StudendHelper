import React, { useEffect, useState } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import './home.css';

import { FaInstagram,FaFacebookF } from "react-icons/fa";
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

import HomeImage from '../../assets/Images/illustration-grow-together.svg';
import SectionImage from '../../assets/Images/illustration-flowing-conversation.svg';
import Logo from '../../assets/Images/logo.png';


function Home({ onVerify }) {
  const [Backto,setBackto] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    Aos.init({duration: 2000});
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 50) {
        setBackto(true)
      } else {
        setBackto(false)
      }
    })
  }, [])

  const scrollup = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  
  return (
    <>
      {Backto && (
        <button onClick={scrollup} className='backscroll' data-aos="fade-up">^</button>
      )}
      <div className="navbar-home">
        <div className="navbar-links">
          <div className="navbar-links_logo">
            <img src={Logo} alt='logo' />
          </div>
        </div>
        <div className="navbar_container">
          <p><a href="#home">Home</a></p>
          <p><a href="#feature">feature</a></p>
          <p><a href="#benefit">Benefit</a></p>
          <p><a href="#get">Get-Start</a></p>
        </div>
        <div className="navbar-menu-home">
          {toggleMenu ? (
            <RiCloseLine color="#000" size={27} onClick={() => setToggleMenu(false)} />
          ) : (
            <RiMenu3Line color="#000" size={27} onClick={() => setToggleMenu(true)} />
          )}
          {toggleMenu && (
            <div className="navbar-menu_container-home scale-up-center">
              <div className="navbar-menu_container-links">
                <p><a href="#home">Home</a></p>
                <p><a href="#feature">feature</a></p>
                <p><a href="#benefit">Benefit</a></p>
                <p><a href="#get">Get-Start</a></p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="head" id="home">
        <div className="circle1"></div>
        <div className="circle2"></div>
        <div className="content">
          <h1 data-aos="fade-right"> Student Helper</h1>
          <p data-aos="fade-right">Your Academic Oasis 🎓 Unlock Your Potential with Student Helper – Your Ultimate Companion in the World of Engineering Education.</p>
          <div className="btn-btn" data-aos="fade-right">
            <button onClick={onVerify}>Get Started</button>
          </div>
        </div>
        <div className="image">
          <img src={HomeImage} alt="Banner" data-aos="fade-left"/>
        </div>
      </div>


      <div className="feature" id='feature'>
        <div className="circle3"></div>
        <div className="circle4"></div>
        <h1 data-aos="fade-up">Features</h1>
        <div className="grid-container">
          <div data-aos="fade-right" className="grid-items">
            <h2>📢 Instant Updates: </h2>
            <p>Stay ahead of the curve with real-time circulars and news directly from your organization's head.</p>
          </div>
          <div data-aos="fade-up" className="grid-items">
            <h2>📚 Subject Resources:</h2>
            <p> Dive deep into your studies with an extensive library of subject references.</p>
          </div>
          <div data-aos="fade-left" className="grid-items">
            <h2>📱 Responsive Design:</h2>
            <p>Experience seamless browsing across all your devices.  And Engage effortlessly with our intuitive and dynamic platform.</p>
          </div>
        </div>
      </div>


      <div className="benefit" id='benefit'>
        <h1>Benefits of Student Helper</h1>
        <div className="container" data-aos="fade-left">
          <div className="items">
            <ol>
              <li><b>Effortless Updates: </b> - Stay informed with instant updates and announcements from your organization's head, ensuring you never miss important information.</li>
              <li><b>Comprehensive Resources:</b> - Access a vast array of subject references, empowering you to deepen your understanding and excel in your studies.</li>
              <li><b>Streamlined Learning:</b> - Seamlessly navigate through course materials, enhancing your learning experience and maximizing your academic potential.</li>
              <li><b>Professional Edge:</b> - With our curated collection of resume templates, you can effortlessly craft polished resumes that stand out to potential employers, giving you a competitive advantage in the job market.</li>
            </ol>
          </div>
          <div className="banner" >
            <img src={SectionImage} alt="Banner" data-aos="fade-right"/>
          </div>
        </div>
      </div>


      <div className="getstart">
        <div className="getstart-grid" id="get" data-aos="fade-up">
          <div className="cta">
            <h1>Get-Started Now</h1>
            <p> Join us on this digital journey of knowledge exchange and academic empowerment!</p>
          </div>
          <div className="btn-btn">
            <button onClick={onVerify}>Get Started</button>
          </div>
        </div>
      </div>


      <footer>
        <div className="footer-content">
          <div className="links">
            <h1>Follow Us</h1>
            <i><FaInstagram/>  Instagram</i>
            <i><FaFacebookF/>  FaceBook</i>
          </div>
          <div className="form">
            <h1>Contact Us</h1>
            <div className="form-container">
              <form action="">
                <input type="text" name="name" placeholder="Enter the name" />
                <input type="email" name="email" placeholder="Enter the email" />
                <textarea name="message" rows="5" placeholder="Write Something.."></textarea>
                <button>Submit</button>
              </form>
            </div>
          </div>
        </div><hr/>
        <p>&copy; 2024 College Notes Sharing. All rights reserved.</p>
      </footer>
      
    </>
  );
}

export default Home

// function Navbar() {
//   const [toggleMenu, setToggleMenu] = useState(false);
  
//   return (
//       <div className="navbar-home">
//           <div className="navbar-links">
//               <div className="navbar-links_logo">
//                   <img src={Logo} alt='logo' />
//               </div>
//           </div>
//           <div className="navbar_container">
//               <p><a href="#home">Home</a></p>
//               <p><a href="#feature">Feature</a></p>
//               <p><a href="#benefit">Benefit</a></p>
//               <p><a href="#get">Get Started</a></p>
//           </div>
//           <div className="navbar-menu-home">
//               {toggleMenu ? (
//                   <RiCloseLine color="#000" size={27} onClick={() => setToggleMenu(false)} />
//               ) : (
//                   <RiMenu3Line color="#000" size={27} onClick={() => setToggleMenu(true)} />
//               )}
//               {toggleMenu && (
//                   <div className="navbar-menu_container-home scale-up-center">
//                       <div className="navbar-menu_container-links">
//                           <p><a href="#home">Home</a></p>
//                           <p><a href="#feature">Feature</a></p>
//                           <p><a href="#benefit">Benefit</a></p>
//                           <p><a href="#get">Get Started</a></p>
//                       </div>
//                   </div>
//               )}
//           </div>
//       </div>
//   );
// }

// function BackToTopButton({ show }) {
//   const scrollup = () => {
//       window.scrollTo({
//           top: 0,
//           behavior: "smooth"
//       })
//   }

//   return (
//       <>
//           {show && (
//               <button onClick={scrollup} className='backscroll' data-aos="fade-up">^</button>
//           )}
//       </>
//   );
// }

// function FeatureSection() {
//   return (
//       <div className="feature" id='feature'>
//         <div className="circle3"></div>
//         <div className="circle4"></div>
//         <h1 data-aos="fade-up">Features</h1>
//         <div className="grid-container">
//           <div data-aos="fade-right" className="grid-items">
//             <h2>📢 Instant Updates: </h2>
//             <p>Stay ahead of the curve with real-time circulars and news directly from your organization's head.</p>
//           </div>
//           <div data-aos="fade-up" className="grid-items">
//             <h2>📚 Subject Resources:</h2>
//             <p> Dive deep into your studies with an extensive library of subject references.</p>
//           </div>
//           <div data-aos="fade-left" className="grid-items">
//             <h2>📱 Responsive Design:</h2>
//             <p>Experience seamless browsing across all your devices.  And Engage effortlessly with our intuitive and dynamic platform.</p>
//           </div>
//         </div>
//       </div>
//   );
// }
// const home = {Component:<Home/>};
// const feature = {Component:<FeatureSection/>};
// function BenefitSection() {
//   return (
//       <div className="benefit" id='benefit'>
//         <h1>Benefits of Student Helper</h1>
//         <div className="container" data-aos="fade-left">
//           <div className="items">
//             <ol>
//               <li><b>Effortless Updates: </b> - Stay informed with instant updates and announcements from your organization's head, ensuring you never miss important information.</li>
//               <li><b>Comprehensive Resources:</b> - Access a vast array of subject references, empowering you to deepen your understanding and excel in your studies.</li>
//               <li><b>Streamlined Learning:</b> - Seamlessly navigate through course materials, enhancing your learning experience and maximizing your academic potential.</li>
//               <li><b>Professional Edge:</b> - With our curated collection of resume templates, you can effortlessly craft polished resumes that stand out to potential employers, giving you a competitive advantage in the job market.</li>
//             </ol>
//           </div>
//           <div className="banner" >
//             <img src={SectionImage} alt="Banner" data-aos="fade-right"/>
//           </div>
//         </div>
//       </div>
//   );
// }

// function GetStartedSection({ onVerify }) {
//   return (
//       <div className="getstart">
//         <div className="getstart">
//         <div className="getstart-grid" id="get" data-aos="fade-up">
//           <div className="cta">
//             <h1>Get-Started Now</h1>
//             <p> Join us on this digital journey of knowledge exchange and academic empowerment!</p>
//           </div>
//           <div className="btn-btn">
//             <button onClick={onVerify}>Get Started</button>
//           </div>
//         </div>
//       </div>
//       </div>
//   );
// }

// function Footer() {
//   return (
//     <footer>
//       <div className="footer-content">
//         <div className="links">
//           <h1>Follow Us</h1>
//           <i><FaInstagram/>  Instagram</i>
//           <i><FaFacebookF/>  FaceBook</i>
//         </div>
//         <div className="form">
//           <h1>Contact Us</h1>
//           <div className="form-container">
//             <form action="">
//               <input type="text" name="name" placeholder="Enter the name" />
//               <input type="email" name="email" placeholder="Enter the email" />
//               <textarea name="message" rows="5" placeholder="Write Something.."></textarea>
//               <button>Submit</button>
//             </form>
//           </div>
//         </div>
//       </div><hr/>
//       <p>&copy; 2024 College Notes Sharing. All rights reserved.</p>
//     </footer>
//   );
// }

// function Home({ onVerify }) {
//   const [showBackToTop, setShowBackToTop] = useState(false);

//   useEffect(() => {
//       Aos.init({ duration: 2000 });

//       const handleScroll = () => {
//         if (window.scrollY > 50) {
//             setShowBackToTop(true);
//         } else {
//             setShowBackToTop(false);
//         }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//         window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//       <>
//           <Navbar />
//           <BackToTopButton show={showBackToTop} />


//           {/* Home section */}
//           <div className="head" id="home">
//             <div className="circle1"></div>
//             <div className="circle2"></div>
//             <div className="content">
//               <h1 data-aos="fade-right">Student Helper</h1>
//               <p data-aos="fade-right">Your Academic Oasis 🎓 Unlock Your Potential with Student Helper – Your Ultimate Companion in the World of Engineering Education.</p>
//               <div className="btn-btn" data-aos="fade-right">
//                 <button onClick={onVerify}>Get Started</button>
//               </div>
//             </div>
//             <div className="image">
//               <img src={HomeImage} alt="Banner" data-aos="fade-left"/>
//             </div>
//           </div>

//           <FeatureSection />

//           <BenefitSection />

//           <GetStartedSection />

//           <Footer />
//       </>
//   );
// }

// export default Home;