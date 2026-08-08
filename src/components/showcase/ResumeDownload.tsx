import React from 'react';
import printer from '../../assets/resume/printer.gif';
import Resume from '../../assets/resume/resume_NabarunKar.pdf';

export interface ResumeDownloadProps {
    altText?: string;
}

const ResumeDownload: React.FC<ResumeDownloadProps> = ({ altText }) => {
    // This app can be embedded in an iframe (outer shell on a different origin/port).
    // Some browsers treat a relative URL opened via target="_blank" from within an iframe
    // as relative to the parent/top-level origin. Use an absolute URL anchored to the
    // iframe's own origin to ensure the PDF opens correctly.
    const resumeHref = new URL(Resume, window.location.href).toString();

    return (
        <div style={styles.resumeContainer}>
            <img style={styles.resumePrinter} alt="" src={printer} />
            <div style={styles.resumeContainerText}>
                <h3>{altText ? altText : 'Looking for my resume?'}</h3>
                <a rel="noreferrer" target="_blank" href={resumeHref}>
                    <p>Click here to download it!</p>
                </a>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    resumeContainer: {
        backgroundColor: 'white',
        padding: 12,
        boxSizing: 'border-box',
        border: '2px solid black',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        width: '100%',
        alignItems: 'center',
    },
    resumeContainerText: {
        flexDirection: 'column',
    },
    resumePrinter: {
        width: 56,
        height: 48,
        paddingRight: 24,
    },
};

export default ResumeDownload;
