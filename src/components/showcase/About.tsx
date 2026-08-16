import React from 'react';
// import me from '../../assets/pictures/workingAtComputer.jpg';
import meNow from '../../assets/pictures/currentme.png';
import { Link } from 'react-router-dom';
import ResumeDownload from './ResumeDownload';

export interface AboutProps {}

const About: React.FC<AboutProps> = (props) => {
    return (
        // add on resize listener
        <div className="site-page-content">
            {/* <img src={me} style={styles.topImage} alt="" /> */}
            <h1 style={{ marginLeft: -16 }}>Welcome</h1>
            <h3>I'm Nabarun Kar</h3>
            <br />
            <div className="text-block">
                <p>
                    I’m Nabarun Kar, a Software Engineer focused on AI/ML and backend systems. I recently graduated with a Master's degree in Computer Science from Texas A&M University (2024–2026) after completing my B.Tech in Computer Science at St. Thomas’ College of Engineering and Technology.
                </p>
                <br />
                <p>
                    Thanks for taking the time to explore my portfolio. This OS-style experience is my way of combining software engineering with creative technology. If you’d like to connect, feel free to use the contact form or email me at{' '}
                    <Link to="/contact">the contact form</Link> or email me at{' '}
                    <a href="mailto:nabarunkar01@gmail.com">
                        nabarunkar01@gmail.com
                    </a>
                </p>
            </div>
            <ResumeDownload />
            <div className="text-block">
                <h3>About Me</h3>
                <br />
                <div className="about-flow">
                    <img
                        className="about-portrait"
                        src={meNow}
                        style={styles.image}
                        alt=""
                    />
                    <p>
                        I enjoy building products that are reliable, scalable, and genuinely useful. And also deploying them! Over the past few years I’ve worked across full-stack development, backend services, and applied AI, and I’m especially interested in turning prototypes into production-ready systems. I believe I have learnt a lot from deploying these projects, almost as much as from the actual development itself.
                    </p>
                    <br />
                    <p>
                        Professionally, I’ve worked in roles ranging from
                        application engineering to applied AI. Most recently, I’ve
                        contributed to projects involving backend services, data
                        pipelines, and AI-powered features, learning how to balance
                        performance, maintainability, and product needs.
                    </p>
                    <br />
                    <p>
                        My experience includes working as an AI Engineering Intern
                        at Texas Capital Bank, a Data Engineer at
                        Accenture, and a Graduate Engineer Intern at LTIMindtree.
                        I have been incredbily fortunate to work with some really smart people during these stints, and I have learned a lot from them.
                    </p>
                </div>
                <br />
                <br />
                <h3>My Hobbies</h3>
                <br />
                <p>
                    Beyond work, I’m interested in films and music. I’m also passionate about
                    AI/ML,
                    cloud infrastructure, backend systems, and creative
                    technology. I enjoy exploring projects that
                    mix engineering with design and one of my hobbies—whether that’s
                    experimentation with interactive UI, tooling, or
                    side projects that start as simple ideas and grow
                    into full applications.
                </p>
                <br />
                <p>
                    I’m happiest when I’m building something end-to-end:
                    defining the problem, designing the system,
                    implementing it, and polishing the experience.
                </p>
                <br />
                <br />
                <p>
                    Thanks for reading! I hope you enjoy exploring the rest of
                    my portfolio and the projects inside it.
                </p>
                <br />
                <p>
                    If you’d like to chat about full-time roles
                    or any sort of collaboration, you can reach me through the{' '}
                    <Link to="/contact">contact page</Link> or email me at{' '}
                    <a href="mailto:nabarunkar01@gmail.com">
                        nabarunkar01@gmail.com
                    </a>
                </p>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    contentHeader: {
        marginBottom: 16,
        fontSize: 48,
    },
    image: {
        height: 'auto',
        width: '100%',
    },
    topImage: {
        height: 'auto',
        width: '100%',
        marginBottom: 32,
    },
    verticalImage: {
        alignSelf: 'center',
        // width: '80%',
        marginLeft: 32,
        flex: 0.8,

        alignItems: 'center',
        // marginBottom: 32,
        textAlign: 'center',
        flexDirection: 'column',
    },
};

export default About;
