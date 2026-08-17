import { Suspense, useRef, useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { Canvas } from '@react-three/fiber';
import Fox from '../models/Fox'
import ThreeDLoader from '../components/3DLoader';
import ErrorBoundary from '../components/ErrorBoundary';
import useAlert from '../hooks/useAlert';
import Alert from '../components/Alert';
import { getFoxPosition, getCameraSettings } from '../utils/screenUtils';
import { validateForm, sanitizeInput, RateLimiter } from '../utils/validation';
import { trackFormSubmission, trackPageView } from '../utils/analytics';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isloading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle');
  const [isSuccess, setIsSuccess] = useState(false);
  const { alert, showAlert, hideAlert } = useAlert();
  const rateLimiter = useRef(new RateLimiter());

  // Track page view on component mount
  useEffect(() => {
    trackPageView('contact');
  }, []);



  const handleFocus = () => {
    // Don't start walking on focus, only on typing
  };

  const handleBlur = () => {
    // Return to idle when losing focus
    setCurrentAnimation('idle');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Don't sanitize on every keystroke to preserve spaces and typing experience
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear any existing errors for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    
    // Start walking animation when user starts typing
    if (value.length > 0 && currentAnimation !== 'walk') {
      setCurrentAnimation('walk');
    } else if (value.length === 0 && currentAnimation === 'walk') {
      // Stop walking if all fields are empty
      const allFieldsEmpty = Object.values({ ...form, [name]: value }).every(val => val.length === 0);
      if (allFieldsEmpty) {
        setCurrentAnimation('idle');
      }
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Sanitize form data before validation and submission
    const sanitizedForm = {
      name: sanitizeInput(form.name),
      email: sanitizeInput(form.email),
      message: sanitizeInput(form.message)
    };
    
    // Validate form
    const validation = validateForm(sanitizedForm);
    if (!validation.isValid) {
      setErrors(validation.errors);
      showAlert({text: 'Please fix the errors in the form.', type: 'danger'});
      trackFormSubmission('contact', false, 'Validation failed');
      return;
    }

    // Check rate limiting
    const userIdentifier = form.email; // Use email as identifier
    if (!rateLimiter.current.isAllowed(userIdentifier)) {
      const remainingTime = rateLimiter.current.getRemainingTime(userIdentifier);
      showAlert({text: `Too many requests. Please wait ${Math.ceil(remainingTime / 1000)} seconds before trying again.`, type: 'danger'});
      trackFormSubmission('contact', false, 'Rate limited');
      return;
    }

    setIsLoading(true);
    setCurrentAnimation('hit');
    
    emailjs.send(import.meta.env.VITE_APP_EMAILJS_SERVICE_ID, import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID, {
      from_name: sanitizedForm.name,
      to_name: 'Mayesh',
      from_email: sanitizedForm.email,
      to_email: 'mayeshdani@gmail.com',
      message: sanitizedForm.message
    }, import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
  ).then(() => {
      setIsLoading(false);
      setIsSuccess(true);
      showAlert({text: 'Thank you. I will get back to you as soon as possible.', type: 'success'});
      trackFormSubmission('contact', true);
      setTimeout(() => {
        hideAlert();
        setCurrentAnimation('idle');
        setIsSuccess(false);
        setForm({
          name: '',
          email: '',
          message: ''
        });
        setErrors({});
      }, 3000);
    }).catch((error) => {
      setIsLoading(false);
      if (import.meta.env.DEV) console.error('EmailJS error:', error);
      setCurrentAnimation('idle');
      showAlert({text: "I didn't receive your message. Please try again later.", type: 'danger'});
      trackFormSubmission('contact', false, error.message);
    });
  }
  return (
    <section className='relative max-container'>
      {alert.show && <Alert {...alert} onClose={hideAlert} />}
      
      {/* Main Form and 3D Fox Section */}
      <div className='flex lg:flex-row flex-col lg:h-[100vh]'>
      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>Get in <span className='gradient-animate'>touch</span></h1>
          
          <div className='mt-5 flex flex-col gap-3 text-slate-500'>
            <p>
              I&apos;m always interested in hearing about new opportunities, interesting projects, or just want to say hello. Feel free to reach out!
            </p>
          </div>

        <form
          className={`w-full flex flex-col gap-7 mt-8 transition-all duration-500 ${isSuccess ? 'scale-105' : ''}`}
          onSubmit={handleSubmit}
          aria-label="Contact form"
          noValidate
        >

          <div className='form-group'>
            <label className='text-black-500 font-semibold flex items-center gap-2'>
              <svg className='w-4 h-4 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
              </svg>
              Name
            </label>
            <input
              type='text'
              name='name'
              id='name'
              className={`input ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
              placeholder='John Doe'
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
              aria-describedby={errors.name ? 'name-error' : undefined}
              aria-invalid={!!errors.name}
            />
            {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1 flex items-center gap-1" role="alert">
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden="true">
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              {errors.name}
            </p>}
          </div>
          <div className='form-group'>
            <label className='text-black-500 font-semibold flex items-center gap-2'>
              <svg className='w-4 h-4 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
              </svg>
              Email
          </label>
            <input
              type='email'
              name='email'
              id='email'
              className={`input ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
              placeholder='john@gmail.com'
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={!!errors.email}
            />
            {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1 flex items-center gap-1" role="alert">
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden="true">
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              {errors.email}
            </p>}
          </div>
          <div className='form-group'>
            <label className='text-black-500 font-semibold flex items-center gap-2'>
              <svg className='w-4 h-4 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
              </svg>
              Your Message
          </label>
            <textarea
              name='message'
              id='message'
              rows={4}
              className={`textarea ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
              placeholder='Let me know how I can help you!'
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
              aria-describedby={errors.message ? 'message-error' : undefined}
              aria-invalid={!!errors.message}
            />
            <div className='flex justify-between mt-1'>
              {errors.message ? (
                <p id="message-error" className="text-red-500 text-sm flex items-center gap-1" role="alert">
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden="true">
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                  {errors.message}
                </p>
              ) : <span />}
              <span className={`text-xs ${form.message.length > 900 ? 'text-red-500 font-medium' : form.message.length > 700 ? 'text-yellow-600' : 'text-gray-400'}`}>
                {form.message.length}/1000
              </span>
            </div>
          </div>
          <button
            type='submit'
            className='btn flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-200'
            disabled={isloading}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {isloading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
                </svg>
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
      <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px] relative'>
        <Canvas camera={getCameraSettings()}>
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={<ThreeDLoader />}>
            <ErrorBoundary>
              <Fox
                currentAnimation={currentAnimation}
                {...getFoxPosition()}
              />
            </ErrorBoundary>
          </Suspense>
        </Canvas>
      </div>
      </div>

      {/* Contact Information Cards - Desktop Only */}
      <div className='hidden lg:block mt-12'>
        <h3 className='text-xl font-semibold text-gray-900 mb-6 text-center'>Contact Information</h3>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
          <div className='contact-card bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300'>
            <div className='flex flex-col items-center text-center gap-3'>
              <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                </svg>
              </div>
              <div>
                <h3 className='font-semibold text-gray-900'>Email</h3>
                <p className='text-sm text-gray-600'>mayeshdani@gmail.com</p>
              </div>
            </div>
          </div>

          <div className='contact-card bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300'>
            <div className='flex flex-col items-center text-center gap-3'>
              <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
                <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
              </div>
              <div>
                <h3 className='font-semibold text-gray-900'>Location</h3>
                <p className='text-sm text-gray-600'>India</p>
              </div>
            </div>
          </div>

          <div className='contact-card bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300'>
            <div className='flex flex-col items-center text-center gap-3'>
              <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center'>
                <svg className='w-6 h-6 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <div>
                <h3 className='font-semibold text-gray-900'>Response Time</h3>
                <p className='text-sm text-gray-600'>Within 24 hours</p>
              </div>
            </div>
          </div>

          <div className='contact-card bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300'>
            <div className='flex flex-col items-center text-center gap-3'>
              <div className='w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center'>
                <svg className='w-6 h-6 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6' />
                </svg>
              </div>
              <div>
                <h3 className='font-semibold text-gray-900'>Availability</h3>
                <p className='text-sm text-gray-600'>Open to opportunities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className='mt-8 text-center'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>Connect with me</h3>
          <div className='flex justify-center gap-4'>
            <a
              href='https://github.com/Mayesh21'
              target='_blank'
              rel='noopener noreferrer'
              className='social-link bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 hover:scale-105'
            >
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/>
              </svg>
            </a>
            <a
              href='https://www.linkedin.com/in/mayesh-dani-9a37bb206/'
              target='_blank'
              rel='noopener noreferrer'
              className='social-link bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 hover:scale-105'
            >
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/>
              </svg>
            </a>
            <a
              href='mailto:mayeshdani@gmail.com'
              className='social-link bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors duration-200 hover:scale-105'
            >
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Contact Information Cards - Mobile Only */}
      <div className='lg:hidden mt-8'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>Contact Information</h3>
        <div className='grid grid-cols-1 gap-4'>
          <div className='contact-card bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                </svg>
              </div>
              <div>
                <h3 className='font-semibold text-gray-900'>Email</h3>
                <p className='text-sm text-gray-600'>mayeshdani@gmail.com</p>
              </div>
            </div>
          </div>

          <div className='contact-card bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center'>
                <svg className='w-5 h-5 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
              </div>
              <div>
                <h3 className='font-semibold text-gray-900'>Location</h3>
                <p className='text-sm text-gray-600'>India</p>
              </div>
            </div>
          </div>

          <div className='contact-card bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center'>
                <svg className='w-5 h-5 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <div>
                <h3 className='font-semibold text-gray-900'>Response Time</h3>
                <p className='text-sm text-gray-600'>Within 24 hours</p>
              </div>
            </div>
          </div>

          <div className='contact-card bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center'>
                <svg className='w-5 h-5 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6' />
                </svg>
              </div>
              <div>
                <h3 className='font-semibold text-gray-900'>Availability</h3>
                <p className='text-sm text-gray-600'>Open to opportunities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links - Mobile */}
        <div className='mt-6'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>Connect with me</h3>
          <div className='flex gap-4'>
            <a
              href='https://github.com/Mayesh21'
              target='_blank'
              rel='noopener noreferrer'
              className='social-link bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 hover:scale-105'
            >
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/>
              </svg>
            </a>
            <a
              href='https://www.linkedin.com/in/mayesh-dani-9a37bb206/'
              target='_blank'
              rel='noopener noreferrer'
              className='social-link bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 hover:scale-105'
            >
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/>
              </svg>
            </a>
            <a
              href='mailto:mayeshdani@gmail.com'
              className='social-link bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors duration-200 hover:scale-105'
            >
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact