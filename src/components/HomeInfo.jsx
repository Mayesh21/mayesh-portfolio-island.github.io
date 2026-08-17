import PropTypes from 'prop-types'
import { arrow } from '../assets/icons/'
import { Link } from 'react-router-dom';
import useTypingEffect from '../hooks/useTypingEffect';


const InfoBox = ({text, link, btnText}) => (
    <div className='info-box'>
        <p className='font-medium text-sm sm:text-xl text-center'>{text}</p>
        <Link to={link} className='neo-btn'>
            {btnText}
            <img src={arrow} className='w-4 h-4 object-contain' alt="arrow"/>
        </Link>
    </div>
);

InfoBox.propTypes = {
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    btnText: PropTypes.string.isRequired
};

const roles = [
    'Full Stack Engineer',
    'Backend Developer',
    'WordPress Expert',
    'AI/ML Practitioner',
    'Cloud & DevOps',
    'MSc AI @ Galway',
];

const HeroTyping = () => {
    const { displayText } = useTypingEffect(roles, 90, 50, 2000);

    return (
        <h1 className='text-lg sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
            Hi, I am <span className='font-semibold'>Mayesh</span> 👋
            <br />
            <span className='inline-block min-h-[1.5em]'>
                <span className='font-semibold'>{displayText}</span>
                <span className='animate-pulse ml-0.5 text-blue-200'>|</span>
            </span>
            <br />
            <span className='text-sm sm:text-base opacity-80'>from India</span>
        </h1>
    );
};

const renderContent = {
    1: <HeroTyping />,
    2: (
        <InfoBox
            text="A driven software engineer with a diverse skill set in web development, problem-solving, and continuous learning."
            link="/about"
            btnText="Learn More"
        />
    ),
    3: (
        <InfoBox
            text="Building diverse projects, from MERN apps to C# games, driven by continuous learning."
            link="/projects"
            btnText="Visit my Portfolio"
        />
    ),
    4: (
        <InfoBox
            text="Need a project done or looking for a dev? I'm just a few keystrokes away"
            link="/contact"
            btnText="Lets talk"
        />
    ),
}


const HomeInfo = ({currentStage}) => {
  return renderContent[currentStage] || null;
}

HomeInfo.propTypes = {
    currentStage: PropTypes.number
};

export default HomeInfo