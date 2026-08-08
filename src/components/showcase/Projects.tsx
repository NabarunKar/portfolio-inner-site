import React from 'react';
import { Navigate } from 'react-router-dom';

export interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = (props) => {
    // Projects now directly opens the main project catalog.
    // Music and Art sections are temporarily shelved. The code is preserved for future expansion when additional projects are ready.
    return (
        <>
            <Navigate to="/projects/software" replace />

            {/*
            Previous category selection UI preserved for future expansion.

            <div className="site-page-content">
                <h1>Projects</h1>
                <h3>& Hobbies</h3>
                <br />
                <p>
                    Click on one of the areas below to check out some of my favorite
                    projects I've done in that field.
                </p>
                <br />
                <div style={styles.projectLinksContainer}>
                    <ProjectBox
                        icon={software}
                        iconStyle={styles.computerIcon}
                        title="Software"
                        subtitle="PROJECTS"
                        route="software"
                    />
                    
                    // Music and Art sections are temporarily shelved. The code is preserved for future expansion when additional projects are ready.
                    
                    <ProjectBox
                        icon={music}
                        iconStyle={styles.musicIcon}
                        title="Music"
                        subtitle="VENTURES"
                        route="music"
                    />
                    <ProjectBox
                        icon={art}
                        iconStyle={styles.artIcon}
                        title="Art"
                        subtitle="ENDEAVORS"
                        route="art"
                    />
                </div>
            </div>
            */}
        </>
    );
};

export default Projects;
