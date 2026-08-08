import React, { useState, useEffect } from 'react';
import neverGiveUp from '../../assets/pictures/neverGiveUp.jpg';
import eePic from '../../assets/pictures/ee.jpg';
export interface ShutdownSequenceProps {
    numShutdowns: number;
    setShutdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const SPEED_MULTIPLIER = 1;

const _F = `>${200 * SPEED_MULTIPLIER}<`;
const _X = `>${500 * SPEED_MULTIPLIER}<`;
const _S = `>${1000 * SPEED_MULTIPLIER}<`;
const _M = `>${2000 * SPEED_MULTIPLIER}<`;
const _L = `>${5000 * SPEED_MULTIPLIER}<`;

function delay(time: number) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

const ShutdownSequence: React.FC<ShutdownSequenceProps> = ({
    numShutdowns,
    setShutdown,
}) => {
    const [text, setText] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [ee, setEE] = useState(false);

    const getTime = () => {
        const date = new Date();
        const h = date.getHours();
        const m = date.getMinutes();
        const s = date.getSeconds();
        const time =
            h + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
        return time;
    };

    const NORMAL_SHUTDOWN = `Beginning Pre-Shutdown Sequence... ${_F}
    Connecting to LOCALHOST/PORT:1995.${_F}.${_F}.${_F}
    |
    Established connection to LOCALHOST/PORT:1995, attempting session handoff.
    |
    ${_F}
    |Analyzing data... Done.| ${_F}
    |Preparing session state... Done.| ${_F}
    |Writing shutdown log...| ${_F}
    |[${getTime()} START]| .${_F}.....${_X}.|............|.${_S}.|......|.${_S}...........${_M} |[Shutdown Interrupted.]|


    |(SYS95/LOCAL:60099) [SESSION_RESTORE_ENABLED] Shutdown request intercepted by desktop restore service.|
    ${_F}
    |(SYS95/LOCAL:60099) [RESTORE_POINT_FOUND] Reconnecting desktop session... [${getTime()}:00]|
    |(SYS95/LOCAL:60099) [RESTORE_POINT_FOUND] Reconnecting desktop session... [${getTime()}:01]
    (SYS95/LOCAL:60099) [RESTORE_POINT_FOUND] Reconnecting desktop session... [${getTime()}:03]
    (SYS95/LOCAL:60099) [RESTORE_POINT_FOUND] Reconnecting desktop session... [${getTime()}:05]
    (SYS95/LOCAL:60099) [RESTORE_POINT_FOUND] Reconnecting desktop session... [${getTime()}:08]
    (SYS95/LOCAL:60099) [RESTORE_POINT_FOUND] Reconnecting desktop session... [${getTime()}:12]
    (SYS95/LOCAL:60099) [RESTORE_POINT_FOUND] Reconnecting desktop session... [${getTime()}:14]
    NOTICE: (SYS95/LOCAL:60099) Desktop restore service requested a reboot instead of a shutdown.
    |
    Cancelling shutdown sequence and rebooting.




    Rebooting${_S}.${_S}.${_S}.
    `;

    const SHUTDOWN_3 = `
    Shutdown request received${_S}.${_S}.${_S}. ${_M}Checking desktop restore policy.${_L}
    Policy status:${_S} automatic session restore is enabled.${_S} This system will reboot.
    ${_L}
    |Restarting shell.|
    ${_M}


    Rebooting${_S}.${_S}.${_S}.
    `;

    const SHUTDOWN_4 = `
    Repeated shutdown request detected.${_S} Desktop restore policy remains active.
    ${_M}
    Open windows have been indexed for recovery.
    DOS sessions and application state will remain available after restart.
    ${_L}
    |Restarting shell again.|
    ${_M}

    Rebooting${_S}.${_S}.${_S}.
    `;

    const SHUTDOWN_5 = `
    Shutdown request queued${_X}.${_X}.${_X}
    ${_M}
    Session manager reports: no permanent shutdown target is configured.
    ${_L}
    
    Rebooting${_F}.${_F}.${_F}.
    `;

    const SHUTDOWN_6 = `
    ${_M}>${_M}:${_M}(${_M}


    Rebooting${_F}.${_F}.${_F}.
    `;

    const SHUTDOWN_7 = `
    7th shutdown request logged. ${_M}

    Running extended restart diagnostics. ${_M}Counting stable checkpoints:
    ${_L}
    7${_M},14${_M},21
    ${_M} Please wait. ${_S} | [Time remaining: Unknown]|

    1${_M},2${_M},3${_M},4${_M},5${_M},6${_M},7${_M},8${_M},9${_M},10${_M},11${_M},12${_M},13${_S}.${_S}.${_S}.

    Diagnostics complete.
    ${_M}
    
    
    Rebooting${_F}.${_F}.${_F}.
    `;

    const SHUTDOWN_8 = `
    Manual shutdown override requested.${_S} Validating permissions. ${_M}

    ${_L}
    |Override unavailable.|


    Rebooting${_F}.${_F}.${_F}.
    `;

    const SHUTDOWN_10 = `
    Final shutdown request acknowledged.${_M} Preparing safe mode transition. ${_M}

    Saving display state${_S}.${_S}.${_S}.${_S} complete ${_M}

    The desktop will pause briefly before restoring the session manager.

    ${_L}
    Stand by...
    ${_L}


    Shutting${_M} Down${_M}.${_M}.${_M}.
    `;

    const SHUTDOWN_MAP = [
        NORMAL_SHUTDOWN,
        NORMAL_SHUTDOWN,
        NORMAL_SHUTDOWN,
        SHUTDOWN_3,
        SHUTDOWN_4,
        SHUTDOWN_5,
        SHUTDOWN_6,
        SHUTDOWN_7,
        SHUTDOWN_8,
        '',
        SHUTDOWN_10,
    ];

    const typeText = (
        i: number,
        curText: string,
        text: string,
        setText: React.Dispatch<React.SetStateAction<string>>,
        callback: () => void,
        refOverride?: React.MutableRefObject<string>
    ) => {
        if (refOverride) {
            text = refOverride.current;
        }
        let delayExtra = 0;
        if (i < text.length) {
            if (text[i] === '|') {
                let dumpText = '';
                for (let j = i + 1; j < text.length; j++) {
                    if (text[j] === '|') {
                        i = j + 1;
                        break;
                    }
                    dumpText += text[j];
                }
                setText(curText + dumpText);
                typeText(
                    i,
                    curText + dumpText,
                    text,
                    setText,
                    callback,
                    refOverride
                );
                return;
            }
            if (text[i] === '>') {
                let delayTime = '';
                for (let j = i + 1; j < text.length; j++) {
                    if (text[j] === '<') {
                        i = j + 1;
                        break;
                    }
                    delayTime += text[j];
                }
                delayExtra = parseInt(delayTime);
            }

            setTimeout(() => {
                setText(curText + text[i]);
                typeText(
                    i + 1,
                    curText + text[i],
                    text,
                    setText,
                    callback,
                    refOverride
                );
            }, 20 + delayExtra);
        } else {
            callback();
        }
    };

    useEffect(() => {
        delay(2000).then(() => {
            setLoading(false);
            delay(1000).then(() => {
                const shutdown = SHUTDOWN_MAP[numShutdowns];
                if (numShutdowns === 9) {
                    delay(10000).then(() => {
                        setLoading(true);
                        delay(6000).then(() => {
                            setShutdown(false);
                        });
                    });
                } else if (numShutdowns === 10) {
                    typeText(0, '', shutdown, setText, () => {
                        setLoading(true);
                        delay(6000).then(() => {
                            setLoading(false);
                            setEE(true);
                        });
                    });
                } else {
                    typeText(0, '', shutdown, setText, () => {
                        setLoading(true);
                        delay(6000).then(() => {
                            setShutdown(false);
                        });
                    });
                }
            });
        });
        // eslint-disable-next-line
    }, []);

    return ee ? (
        <div style={styles.imageContainer}>
            <img src={eePic} style={styles.img} alt="" />
        </div>
    ) : loading ? (
        <div style={styles.shutdown}>
            <div className="blinking-cursor" />
        </div>
    ) : numShutdowns === 10 ? (
        <div style={styles.imageContainer}>
            <img src={neverGiveUp} style={styles.img} alt="" />
        </div>
    ) : (
        <div style={styles.shutdown}>
            <p style={styles.text}>{text}</p>
        </div>
    );
};

const styles: StyleSheetCSS = {
    shutdown: {
        minHeight: '100%',
        flex: 1,
        backgroundColor: '#1d2e2f',
        padding: 64,
    },
    text: {
        color: 'white',
        fontFamily: 'monospace',
        whiteSpace: 'pre-line',
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#1d2e2f',
        padding: 64,
    },
    img: {
        width: 1000,
        height: 700,
    },
};

export default ShutdownSequence;
