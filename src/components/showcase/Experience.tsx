import React from 'react';
import ResumeDownload from './ResumeDownload';

export interface ExperienceProps {}

const Experience: React.FC<ExperienceProps> = (props) => {
    return (
        <div className="site-page-content">
            <ResumeDownload />
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>Texas Capital Bank</h1>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href={'https://www.texascapitalbank.com/'}
                        >
                            <h4>Dallas, TX</h4>
                        </a>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>Artificial Intelligence Engineering Intern</h3>
                        <b>
                            <p>Jun 2025 – Aug 2025</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    
                </p>
                <br />
                <ul>
                    <li>
                        <p>
                            Built an end-to-end document-based RAG application
                            using AWS Bedrock, reducing manual document lookup
                            time by over 70%.
                        </p>
                    </li>
                    <li>
                        <p>
                            Designed and deployed secure REST APIs for uploading
                            documents up to 50MB to AWS S3.
                        </p>
                    </li>
                    <li>
                        <p>
                            Developed a production-ready backend using Python
                            and FastAPI supporting concurrent users.
                        </p>
                    </li>
                    <li>
                        <p>
                            Automated PDF-to-CSV invoice extraction workflows
                            using Camelot, Tabula, PDFPlumber, and AWS Glue.
                        </p>
                    </li>
                    <li>
                        <p>
                            Implemented guardrails for LLM applications to
                            enforce enterprise standards.
                        </p>
                    </li>
                    <li>
                        <p>
                            Built Grafana dashboards to visualize latency and
                            performance metrics.
                        </p>
                    </li>
                </ul>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>Accenture</h1>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={'https://www.accenture.com/'}
                        >
                            <h4>Kolkata, India</h4>
                        </a>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>Data Engineer</h3>
                        <b>
                            <p>Sep 2023 – Jul 2024</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    
                </p>
                <br />
                <ul>
                    <li>
                        <p>
                            Used Kubernetes and Docker for container
                            orchestration and lifecycle management.
                        </p>
                    </li>
                    <li>
                        <p>
                            Performed troubleshooting, load balancing, and
                            server maintenance.
                        </p>
                    </li>
                    <li>
                        <p>
                            Automated cluster startup and configuration changes
                            using Python.
                        </p>
                    </li>
                </ul>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>LTIMindtree</h1>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={'https://www.ltimindtree.com/'}
                        >
                            <h4>Kolkata, India</h4>
                        </a>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>Graduate Engineer Intern</h3>
                        <b>
                            <p>Mar 2023 – May 2023</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    
                </p>
                <br />
                <ul>
                    <li>
                        <p>
                            Built a vendor warehousing application using Spring
                            Boot and microservices.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
    },
    skillRow: {
        flex: 1,
        justifyContent: 'space-between',
    },
    skillName: {
        minWidth: 56,
    },
    skill: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
    },
    progressBar: {
        flex: 1,
        background: 'red',
        marginLeft: 8,
        height: 8,
    },
    hoverLogo: {
        height: 32,
        marginBottom: 16,
    },
    headerContainer: {
        alignItems: 'flex-end',
        width: '100%',
        justifyContent: 'center',
    },
    hoverText: {
        marginBottom: 8,
    },
    indent: {
        marginLeft: 24,
    },
    headerRow: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};

export default Experience;
