import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import NavBar from './components/NavBar';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/Loader';
import OfflineIndicator from './components/OfflineIndicator';
import ScrollToTop from './components/ScrollToTop';
import ScrollReset from './components/ScrollReset';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import ScrollProgress from './components/ScrollProgress';
import Home from './pages/Home';
import { config } from './config';
import { ThemeProvider } from './contexts/ThemeContext';
import useMouseGlow from './hooks/useMouseGlow';
import TargetCursor from './components/TargetCursor';
import ClickSpark from './components/ClickSpark';

// Lazy load pages for better performance
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
  useMouseGlow();
  return (
    <div className='bg-slate-300/20 h-full'>
        <Router basename={config.basename}>
            <ThemeProvider>
                <ErrorBoundary>
                    <TargetCursor hideDefaultCursor cursorColor="#fff" />
                    <a href="#main-content" className="skip-link">Skip to content</a>
                    <ScrollProgress />
                    <NavBar />
                    <OfflineIndicator />
                    <ScrollToTop />
                    <ScrollReset />
                    <ClickSpark sparkColor="#fff" sparkCount={8} sparkRadius={20} duration={500}>
                    <main id="main-content" tabIndex={-1}>
                    <PageTransition>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/about' element={
                                <Suspense fallback={<Loader />}>
                                    <About />
                                </Suspense>
                            } />
                            <Route path='/projects' element={
                                <Suspense fallback={<Loader />}>
                                    <Projects />
                                </Suspense>
                            } />
                            <Route path='/contact' element={
                                <Suspense fallback={<Loader />}>
                                    <Contact />
                                </Suspense>
                            } />
                            <Route path='*' element={
                                <Suspense fallback={<Loader />}>
                                    <NotFound />
                                </Suspense>
                            } />
                        </Routes>
                    </PageTransition>
                    </main>
                    </ClickSpark>
                    <Footer />
                </ErrorBoundary>
            </ThemeProvider>
        </Router>
    </div>
  )
}

export default App
