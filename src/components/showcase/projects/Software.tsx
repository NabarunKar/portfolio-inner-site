import React from 'react';
// @ts-ignore
import crushedplay from '../../../assets/pictures/projects/software/crushedplay.mp4';
// @ts-ignore
import filmoid from '../../../assets/pictures/projects/software/filmoid.mp4';
import ResumeDownload from '../ResumeDownload';
import VideoAsset from '../../general/VideoAsset';
import ProjectTechStack from '../ProjectTechStack';

export interface SoftwareProjectsProps {}

const SoftwareProjects: React.FC<SoftwareProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Projects</h1>
            <br />
            <p>
                A collection of software projects spanning AI/ML, backend
                systems and full-stack applications. Each project has its respective icon on the desktop. For details, please open the respective application!
            </p>
            <br />
            <ResumeDownload />
            <br />
            <div className="text-block">
                <h2>Filmoid - Personalized Movie Recommendation Engine</h2>
                <br />
                <p>
                    A personalized movie recommendation platform combining
                    machine learning with modern web technologies. Built using an SVD model utilising
                    matrix factorization, a React frontend, and FastAPI backend
                    services. Integrates TMDB APIs for movie metadata and
                    provides tailored recommendations based on user
                    preferences.
                </p>
                <br />
                <div className="captioned-image">
                    <VideoAsset src={filmoid} />
                    <p style={styles.caption}>
                        <sub>
                            <b>Figure 1:</b> Filmoid demo
                        </sub>
                    </p>
                </div>
                <ProjectTechStack
                    technologies={[
                        'React',
                        'TypeScript',
                        'FastAPI',
                        'Python',
                        'SVD',
                        'TMDB API',
                        'Machine Learning',
                    ]}
                />
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/NabarunKar/filmoid"
                        >
                            <p>
                                <b>[GitHub]</b> - Filmoid
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="text-block">
                <h2>CrushedPlay</h2>
                <br />
                <p>
                    A watch party platform to synchronize playback, with real-time chat and direct browser-to-browser media sharing powered by WebSockets and WebRTC.
                </p>
                <br />
                <div className="captioned-image">
                    <VideoAsset src={crushedplay} />
                    <div style={styles.caption}>
                        <p>
                            <sub>
                                <b>Figure 2: </b> CrushedPlay demo media
                                (placeholder).
                            </sub>
                        </p>
                    </div>
                </div>
                <ProjectTechStack
                    technologies={[
                        'React',
                        'JavaScript',
                        'Vite',
                        'FFmpeg',
                        'WebAssembly',
                    ]}
                />
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/NabarunKar/CrushedPlay"
                        >
                            <p>
                                <b>[GitHub]</b> - CrushedPlay
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="text-block">
                <h2>Template Repository Application</h2>
                <br />
                <p>
                    A full-stack workflow management application built to
                    streamline the creation, approval, and delivery of templated
                    applications and letters. The platform enables users to
                    draft documents using predefined templates, submit them
                    through role-based approval workflows, and automatically
                    generate PDF outputs for customers.
                </p>
                <br />
                <p>
                    Built with Next.js and React, the application integrates
                    PostgreSQL for persistent data management and SendGrid for
                    automated email delivery. Authentication and authorization
                    are handled through token-based security, enabling
                    structured workflows between executors and approvers.
                </p>
                <br />
                <ProjectTechStack
                    technologies={[
                        'Next.js',
                        'React',
                        'JavaScript',
                        'PostgreSQL',
                        'SendGrid',
                        'JWT',
                    ]}
                />
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/Sounav201/Template-Repository-Application"
                        >
                            <p>
                                <b>[GitHub]</b> - Template Repository Application
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="text-block">
                <h2>Face Detection</h2>
                <br />
                <p>
                    A Python-based facial recognition attendance system that
                    uses webcam input to identify known faces and automatically
                    log attendance records. The application uses facial
                    encodings for recognition, OpenCV for real-time image
                    processing, and generates timestamped CSV attendance logs.
                </p>
                <br />
                <ProjectTechStack
                    technologies={[
                        'Python',
                        'OpenCV',
                        'face_recognition',
                        'NumPy',
                        'Machine Learning',
                    ]}
                />
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/NabarunKar/Face-Detection"
                        >
                            <p>
                                <b>[GitHub]</b> - Face Detection
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <ResumeDownload />
        </div>
    );
};

const styles: StyleSheetCSS = {
    video: {
        width: '100%',
        padding: 12,
    },
    caption: {
        width: '80%',
    },
};

export default SoftwareProjects;
