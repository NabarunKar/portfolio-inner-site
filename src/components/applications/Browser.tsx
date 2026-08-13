import React, {
    useCallback,
    useRef,
    useState,
    useEffect,
} from 'react';
import Colors from '../../constants/colors';
import browserBack from '../../assets/icons/browserBack.png';
import browserForward from '../../assets/icons/browserForward.png';
import browserRefresh from '../../assets/icons/browserRefresh.png';
import browserHome from '../../assets/icons/browserHome.png';
import Window from '../os/Window';

export interface BrowserAppProps extends WindowAppProps {}

const HOME_URL = 'https://nabarunk.vercel.app/';

type ToolbarButtonProps = {
    icon: string;
    label: string;
    onClick: () => void;
    disabled?: boolean;
};

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
    icon,
    label,
    onClick,
    disabled,
}) => (
    <button
        type="button"
        title={label}
        aria-label={label}
        disabled={disabled}
        onClick={onClick}
        style={Object.assign(
            {},
            styles.toolbarButton,
            disabled && styles.toolbarButtonDisabled
        )}
    >
        <span style={styles.toolbarButtonInner}>
            <img
                src={icon}
                alt=""
                aria-hidden="true"
                style={styles.toolbarButtonIcon}
            />
        </span>
    </button>
);

/**
 * Normalize a user-entered URL:
 *   - "nabarunkar.vercel.app"        -> "https://nabarunkar.vercel.app/"
 *   - "http://example.com"           -> unchanged
 *   - "about:blank"                  -> unchanged
 *   - "  https://x.com   "           -> trimmed
 *   - ""                             -> HOME_URL
 */
const normalizeUrl = (raw: string): string => {
    const trimmed = (raw || '').trim();
    if (!trimmed) return HOME_URL;
    if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed; // already has scheme
    return `https://${trimmed}`;
};

const Browser: React.FC<BrowserAppProps> = (props) => {
    // Resizable window dimensions, matching the Doom.tsx pattern.
    const [width, setWidth] = useState(900);
    const [height, setHeight] = useState(650);

    // Parent-side history stack. We never inspect the iframe's own history
    // because the target is cross-origin.
    const [history, setHistory] = useState<string[]>([HOME_URL]);
    const [historyIndex, setHistoryIndex] = useState<number>(0);

    // What the address bar input currently shows (may differ from the
    // committed URL while the user is typing).
    const [addressInput, setAddressInput] = useState<string>(HOME_URL);

    // Bumping this integer forces the iframe to remount, which is the
    // simplest cross-origin-safe way to reload the current URL.
    const [reloadNonce, setReloadNonce] = useState<number>(0);

    const currentUrl = history[historyIndex];

    // Keep the address bar in sync with programmatic navigations
    // (Home / Back / Forward).
    useEffect(() => {
        setAddressInput(currentUrl);
    }, [currentUrl]);

    const canGoBack = historyIndex > 0;
    const canGoForward = historyIndex < history.length - 1;

    const goTo = useCallback(
        (url: string) => {
            const next = normalizeUrl(url);
            setHistory((prevHistory) => {
                const truncated = prevHistory.slice(0, historyIndex + 1);
                // Avoid pushing a duplicate if the user re-submits the same URL
                if (truncated[truncated.length - 1] === next) {
                    return prevHistory;
                }
                return [...truncated, next];
            });
            // If the URL is the same as the current one, keep the index; otherwise
            // advance to the newly-appended entry (which sits at historyIndex + 1
            // after truncation).
            if (history[historyIndex] !== next) {
                setHistoryIndex(historyIndex + 1);
            }
        },
        [historyIndex, history]
    );

    const goBack = useCallback(() => {
        if (!canGoBack) return;
        setHistoryIndex((i) => i - 1);
    }, [canGoBack]);

    const goForward = useCallback(() => {
        if (!canGoForward) return;
        setHistoryIndex((i) => i + 1);
    }, [canGoForward]);

    const refresh = useCallback(() => {
        setReloadNonce((n) => n + 1);
    }, []);

    const goHome = useCallback(() => {
        goTo(HOME_URL);
    }, [goTo]);

    const onAddressSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            // Critical: keep the toolbar from ever navigating the parent window.
            e.preventDefault();
            goTo(addressInput);
        },
        [addressInput, goTo]
    );

    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    return (
        <Window
            top={40}
            left={80}
            width={width}
            height={height}
            windowTitle={`Internet Explorer - ${currentUrl}`}
            windowBarIcon="browserIcon"
            bottomLeftText={'Done'}
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            onWidthChange={setWidth}
            onHeightChange={setHeight}
        >
            <div style={styles.appRoot}>
                {/* Win95-style browser toolbar */}
                <div style={styles.toolbar}>
                    <div style={styles.buttonGroup}>
                        <ToolbarButton
                            icon={browserBack}
                            label="Back"
                            onClick={goBack}
                            disabled={!canGoBack}
                        />
                        <div style={styles.buttonSpacer} />
                        <ToolbarButton
                            icon={browserForward}
                            label="Forward"
                            onClick={goForward}
                            disabled={!canGoForward}
                        />
                        <div style={styles.buttonSpacer} />
                        <ToolbarButton
                            icon={browserRefresh}
                            label="Refresh"
                            onClick={refresh}
                        />
                        <div style={styles.buttonSpacer} />
                        <ToolbarButton
                            icon={browserHome}
                            label="Home"
                            onClick={goHome}
                        />
                    </div>

                    <form
                        style={styles.addressForm}
                        onSubmit={onAddressSubmit}
                    >
                        <span style={styles.addressLabel}>Address:</span>
                        <div style={styles.addressBorderOuter}>
                            <div style={styles.addressBorderInner}>
                                <input
                                    style={styles.addressInput}
                                    value={addressInput}
                                    onChange={(e) =>
                                        setAddressInput(e.target.value)
                                    }
                                    onFocus={(e) => e.target.select()}
                                    spellCheck={false}
                                    aria-label="Address"
                                />
                            </div>
                        </div>
                        <div style={styles.goButtonWrapper}>
                            <button type="submit" style={styles.goButton}>
                                Go
                            </button>
                        </div>
                    </form>
                </div>

                {/* Cross-origin iframe. No sandbox — target is a trusted, publicly-hosted
                    static site and we want its scripts/fonts to work normally. */}
                <div style={styles.iframeInsetOuter}>
                    <div style={styles.iframeInsetInner}>
                        <iframe
                            key={`${currentUrl}::${reloadNonce}`}
                            ref={iframeRef}
                            src={currentUrl}
                            title="Internet Explorer content"
                            style={styles.iframe}
                        />
                    </div>
                </div>
            </div>
        </Window>
    );
};

const styles: StyleSheetCSS = {
    appRoot: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        minHeight: 0,
        backgroundColor: Colors.lightGray,
    },
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: '3px 4px',
        gap: 4,
        backgroundColor: Colors.lightGray,
        borderBottom: `1px solid ${Colors.darkGray}`,
        flexShrink: 0,
    },
    buttonGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonSpacer: {
        width: 2,
    },
    toolbarButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 22,
        padding: 0,
        border: `1px solid ${Colors.black}`,
        borderTopColor: Colors.white,
        borderLeftColor: Colors.white,
        backgroundColor: Colors.lightGray,
        cursor: 'pointer',
        boxSizing: 'border-box',
    },
    toolbarButtonDisabled: {
        cursor: 'not-allowed',
        opacity: 0.45,
    },
    toolbarButtonInner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        border: `1px solid ${Colors.darkGray}`,
        borderTopColor: Colors.lightGray,
        borderLeftColor: Colors.lightGray,
        boxSizing: 'border-box',
    },
    toolbarButtonIcon: {
        width: 16,
        height: 16,
        imageRendering: 'pixelated',
    },
    addressForm: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
    },
    addressLabel: {
        fontFamily: 'MSSerif',
        fontSize: 11,
        marginRight: 4,
        color: 'black',
    },
    addressBorderOuter: {
        flex: 1,
        border: `1px solid ${Colors.black}`,
        borderTopColor: Colors.darkGray,
        borderLeftColor: Colors.darkGray,
        backgroundColor: 'white',
    },
    addressBorderInner: {
        flex: 1,
        border: `1px solid ${Colors.white}`,
        borderTopColor: Colors.lightGray,
        borderLeftColor: Colors.lightGray,
        padding: '1px 4px',
        alignItems: 'center',
    },
    addressInput: {
        flex: 1,
        border: 'none',
        outline: 'none',
        fontFamily: 'MSSerif',
        fontSize: 11,
        width: '100%',
        backgroundColor: 'white',
        color: 'black',
        padding: 0,
        boxShadow: 'none',
    },
    goButtonWrapper: {
        marginLeft: 4,
    },
    goButton: {
        height: 22,
        minWidth: 32,
        padding: '0 7px',
        border: `1px solid ${Colors.black}`,
        borderTopColor: Colors.white,
        borderLeftColor: Colors.white,
        backgroundColor: Colors.lightGray,
        color: 'black',
        cursor: 'pointer',
        fontFamily: 'MSSerif',
        fontSize: 11,
        lineHeight: '18px',
        boxSizing: 'border-box',
    },
    iframeInsetOuter: {
        flex: 1,
        border: `1px solid ${Colors.black}`,
        borderTopColor: Colors.darkGray,
        borderLeftColor: Colors.darkGray,
        margin: 4,
        backgroundColor: 'white',
        minHeight: 0,
    },
    iframeInsetInner: {
        flex: 1,
        border: `1px solid ${Colors.white}`,
        borderTopColor: Colors.lightGray,
        borderLeftColor: Colors.lightGray,
        overflow: 'hidden',
        backgroundColor: 'white',
        minHeight: 0,
    },
    iframe: {
        border: 'none',
        width: '100%',
        height: '100%',
        display: 'block',
    },
};

export default Browser;
