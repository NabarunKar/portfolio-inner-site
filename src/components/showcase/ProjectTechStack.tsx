import React from 'react';
import faceRecognitionIcon from '../../assets/icons/tech/face-recognition.svg';
import machineLearningIcon from '../../assets/icons/tech/machine-learning.svg';
import resnet50Icon from '../../assets/icons/tech/resnet50.svg';
import svdIcon from '../../assets/icons/tech/svd.svg';
import {
    siFastapi,
    siFfmpeg,
    siJavascript,
    siJsonwebtokens,
    siNextdotjs,
    siNumpy,
    siOpencv,
    siPostgresql,
    siPython,
    siReact,
    siTensorflow,
    siThemoviedatabase,
    siTypescript,
    siVite,
    siWebassembly,
} from 'simple-icons';

export interface ProjectTechStackProps {
    technologies: string[];
}

type SimpleIcon = {
    path: string;
    hex: string;
};

const CUSTOM_TECH_ICONS: { [key: string]: string } = {
    SVD: svdIcon,
    'Machine Learning': machineLearningIcon,
    ResNet50: resnet50Icon,
    face_recognition: faceRecognitionIcon,
};

const TECH_ICONS: { [key: string]: SimpleIcon } = {
    React: siReact,
    TypeScript: siTypescript,
    JavaScript: siJavascript,
    Vite: siVite,
    FFmpeg: siFfmpeg,
    WebAssembly: siWebassembly,
    'Next.js': siNextdotjs,
    PostgreSQL: siPostgresql,
    JWT: siJsonwebtokens,
    OpenCV: siOpencv,
    TensorFlow: siTensorflow,
    NumPy: siNumpy,
    FastAPI: siFastapi,
    Python: siPython,
    'TMDB API': siThemoviedatabase,
};

const TECH_MONOGRAMS: { [key: string]: string } = {
    SendGrid: 'SG',
    'ffmpeg.wasm': 'WASM',
};

const TECH_FOREGROUND_COLORS: { [key: string]: string } = {
    JavaScript: '#000000',
};

const ProjectTechStack: React.FC<ProjectTechStackProps> = ({ technologies }) => {
    return (
        <div style={styles.container} aria-label="Project technology stack">
            {technologies.map((technology) => {
                const customIcon = CUSTOM_TECH_ICONS[technology];
                const icon = TECH_ICONS[technology];
                const monogram = TECH_MONOGRAMS[technology] || technology[0];
                const foregroundColor = TECH_FOREGROUND_COLORS[technology];
                const badgeStyle = Object.assign(
                    {},
                    styles.badge,
                    customIcon
                        ? styles.neutralBadge
                        : icon
                        ? {
                              backgroundColor: `#${icon.hex}`,
                              color: foregroundColor || 'white',
                          }
                        : styles.neutralBadge
                );

                return (
                    <div key={technology} style={badgeStyle}>
                        <span style={styles.iconFrame}>
                            {customIcon ? (
                                <img
                                    src={customIcon}
                                    alt=""
                                    aria-hidden="true"
                                    style={styles.customIcon}
                                />
                            ) : icon ? (
                                <svg
                                    style={styles.icon}
                                    role="img"
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                >
                                    <path fill="currentColor" d={icon.path} />
                                </svg>
                            ) : (
                                <span style={styles.monogram}>{monogram}</span>
                            )}
                        </span>
                        <span>{technology}</span>
                    </div>
                );
            })}
        </div>
    );
};

const styles: StyleSheetCSS = {
    container: {
        flexWrap: 'wrap',
        gap: 7,
        alignItems: 'center',
        marginBottom: 2,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 4,
        color: 'white',
        fontSize: 13,
        lineHeight: 1.1,
        padding: '5px 8px',
        marginRight: 2,
        marginBottom: 7,
        whiteSpace: 'nowrap',
        boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.18)',
        letterSpacing: 0.1,
    },
    neutralBadge: {
        backgroundColor: '#2f3437',
        color: '#f4f4f4',
    },
    iconFrame: {
        width: 14,
        height: 14,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'currentColor',
        opacity: 0.95,
    },
    icon: {
        width: 13,
        height: 13,
    },
    customIcon: {
        width: 13,
        height: 13,
        objectFit: 'contain',
    },
    monogram: {
        fontSize: 9,
        fontWeight: 'bold',
        lineHeight: 1,
    },
};

export default ProjectTechStack;
