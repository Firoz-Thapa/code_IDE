import  { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import codeImg from "../images/code.png";
import { Link } from 'react-router-dom';

const About = () => {
  const [isGridLayout, setIsGridLayout] = useState(false);
  const [isLightMode] = useState(() => {
    // Initialize theme based on localStorage or default to dark
    return localStorage.getItem("theme") === "light";
  });

  // Handle logout via Navbar
  const handleLogout = () => {
    // This function will be called when the user logs out from Navbar
  };
  
  useEffect(() => {
    // Apply the theme to the document body (if needed)
    if (isLightMode) {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    } else {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    }
  }, [isLightMode]);

  return (
    <>
      <Navbar 
        isGridLayout={isGridLayout} 
        setIsGridLayout={setIsGridLayout} 
        onLogout={handleLogout}
      />
      
      <div className="about-container px-[100px] py-[40px]">
        <h1 className="text-4xl font-bold mb-8">About Code IDE</h1>
        
        <div className="about-content flex flex-col md:flex-row gap-10">
          <div className="about-text md:w-2/3">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="mb-4">
                Code IDE is designed to provide developers with a simple, intuitive, and powerful 
                environment for writing, testing, and sharing HTML, CSS, and JavaScript code. Our 
                platform allows you to create and save your projects, making it easy to continue 
                your work from anywhere.
              </p>
              <p>
                Whether you are a beginner learning web development or an experienced programmer 
                looking for a quick way to test ideas, Code IDE is built for you.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Real-time code preview with automatic updates</li>
                <li>Support for HTML, CSS, and JavaScript development</li>
                <li>User accounts to save and organize your projects</li>
                <li>Light and dark themes for comfortable coding</li>
                <li>Responsive interface that works on desktop and mobile devices</li>
                <li>Grid and list views for managing your projects</li>
                <li>Simple project sharing (coming soon)</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Get Started Today</h2>
              <p className="mb-4">
                Ready to start coding? Create a new project from the <Link to="/" className="text-[#00AEEF] hover:underline">home page</Link> or 
                explore some of our example projects to see what is possible.
              </p>
              <p>
                If you have any questions or feedback, please donot hesitate to 
                <Link to="/contact" className="text-[#00AEEF] hover:underline"> contact us</Link>.
              </p>
            </section>
          </div>
          
          <div className="about-sidebar md:w-1/3">
            <div className="bg-[#141414] p-6 rounded-lg shadow-lg shadow-black/50">
              <img src={codeImg} alt="Code IDE Logo" className="w-24 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-center mb-3">Code IDE</h3>
              <p className="text-center text-gray-400 mb-4">
                Version 1.0.0
              </p>
              <div className="stats grid grid-cols-2 gap-4 mb-6">
                <div className="stat text-center">
                  <div className="stat-value text-2xl text-[#00AEEF]">HTML5</div>
                  <div className="stat-label text-gray-400">Frontend</div>
                </div>
                <div className="stat text-center">
                  <div className="stat-value text-2xl text-[#00AEEF]">CSS3</div>
                  <div className="stat-label text-gray-400">Styling</div>
                </div>
                <div className="stat text-center">
                  <div className="stat-value text-2xl text-[#00AEEF]">JS</div>
                  <div className="stat-label text-gray-400">Logic</div>
                </div>
                <div className="stat text-center">
                  <div className="stat-value text-2xl text-[#00AEEF]">React</div>
                  <div className="stat-label text-gray-400">Framework</div>
                </div>
              </div>
              <Link 
                to="/" 
                className="btnBlue w-full text-center block py-2 hover:bg-[#0086b3] transition-colors"
              >
                Start Coding
              </Link>
            </div>

            <div className="bg-[#141414] p-6 rounded-lg shadow-lg shadow-black/50 mt-6">
              <h3 className="text-xl font-semibold mb-3">Technologies Used</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#00AEEF] rounded-full"></span>
                  <span>React for UI components</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#00AEEF] rounded-full"></span>
                  <span>Express.js backend</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#00AEEF] rounded-full"></span>
                  <span>MongoDB for database</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#00AEEF] rounded-full"></span>
                  <span>Monaco Editor for code editing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#00AEEF] rounded-full"></span>
                  <span>JWT for authentication</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;