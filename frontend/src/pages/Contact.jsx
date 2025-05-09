import  { useState } from 'react';
import Navbar from '../components/Navbar';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedinIn } from 'react-icons/fa';

const Contact = () => {
  const [isGridLayout, setIsGridLayout] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle logout via Navbar
  const handleLogout = () => {
    // This function will be called when the user logs out from Navbar
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <>
      <Navbar 
        isGridLayout={isGridLayout} 
        setIsGridLayout={setIsGridLayout} 
        onLogout={handleLogout}
      />
      
      <div className="contact-container px-[100px] py-[40px]">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        
        <div className="contact-content flex flex-col md:flex-row gap-10">
          <div className="contact-form-container md:w-2/3">
            {isSubmitted ? (
              <div className="success-message bg-[#00AEEF]/10 border border-[#00AEEF] p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold text-[#00AEEF] mb-2">Message Sent Successfully!</h3>
                <p>Thank you for contacting us. We will get back to you as soon as possible.</p>
                <button 
                  onClick={() => setIsSubmitted(false)} 
                  className="btnBlue mt-4"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="mb-4">
                  <label className="block mb-2">Your Name</label>
                  <div className="inputBox !mb-0">
                    <input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />
                  </div>
                  {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                </div>
                
                <div className="mb-4">
                  <label className="block mb-2">Your Email</label>
                  <div className="inputBox !mb-0">
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>
                  {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                </div>
                
                <div className="mb-4">
                  <label className="block mb-2">Subject</label>
                  <div className="inputBox !mb-0">
                    <input 
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter subject"
                    />
                  </div>
                  {formErrors.subject && <p className="text-red-500 text-sm mt-1">{formErrors.subject}</p>}
                </div>
                
                <div className="mb-6">
                  <label className="block mb-2">Message</label>
                  <div className="inputBox !mb-0">
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter your message"
                      className="w-full h-32 bg-transparent border-none outline-none p-[10px] text-white resize-none"
                    ></textarea>
                  </div>
                  {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
                </div>
                
                <button 
                  type="submit" 
                  className="btnBlue w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
          
          <div className="contact-sidebar md:w-1/3">
            <div className="contact-info bg-[#141414] p-6 rounded-lg shadow-lg shadow-black/50 mb-6">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              
              <div className="info-item flex items-start gap-3 mb-4">
                <div className="icon-container mt-1">
                  <FaEnvelope className="text-[#00AEEF]" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-gray-400">gyawat.magar@gmail.com</p>
                </div>
              </div>
              
              <div className="info-item flex items-start gap-3 mb-4">
                <div className="icon-container mt-1">
                  <FaPhone className="text-[#00AEEF]" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-gray-400">+358 46 954 0630</p>
                </div>
              </div>
              
              <div className="info-item flex items-start gap-3">
                <div className="icon-container mt-1">
                  <FaMapMarkerAlt className="text-[#00AEEF]" />
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-gray-400">Finland</p>
                </div>
              </div>
            </div>
            
            <div className="social-links bg-[#141414] p-6 rounded-lg shadow-lg shadow-black/50">
              <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
              
              <div className="social-icons flex justify-around">
                <a href="https://github.com/Firoz-Thapa" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                  <div className="social-icon bg-[#1A1919] hover:bg-[#00AEEF] transition-colors p-3 rounded-full">
                    <FaGithub size={24} />
                  </div>
                </a>
                
                <a href="https://www.linkedin.com/in/firoz-thapa-b3b886320" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                  <div className="social-icon bg-[#1A1919] hover:bg-[#00AEEF] transition-colors p-3 rounded-full">
                    <FaLinkedinIn size={24} />
                  </div>
                </a>
              </div>
              
              <div className="mt-6">
                <p className="text-gray-400 text-sm">
                  Follow us on social media to stay updated with the latest news and features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;