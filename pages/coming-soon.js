import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../components/UserRegister-Login/style.module.css';

const ComingSoon = () => {
    const [hover, setHover] = useState(false);
    return (
        <div
            style={{
                backgroundImage: 'url("/assets/error_404.png")',
                height: '100vh',
                position: 'relative',
                width: '100%',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Error Image (Reusing container for positioning, but removing specific 404 image if irrelevant, or keeping layout) */}
            {/* Removing the 404 text image and replacing with text for coming soon, or keeping structure */}
            <div
                style={{
                    // backgroundImage: 'url("/error404.png")', // Removed 404 specific image
                    height: '100dvh',
                    width: '75vw',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundSize: 'contain',
                    mixBlendMode: 'color-dodge',
                }}
            >
                <p
                    className={styles.dont_loss}
                    style={{ fontSize: '3rem', textAlign: 'center', color: '#fff', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}
                >
                    UNDER CONSTRUCTION...
                </p>
            </div>


            {/* Return Home Button */}
            <Link
                href="/"
                className={styles.homepage_btn}
                style={{
                    backgroundImage: 'url("/assets/register_button_bac.png")',
                    width: '346px',
                    height: '77px',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundClip: 'border-box',
                    backgroundPosition: 'center',
                    zIndex: '1',
                    position: 'absolute',
                    bottom: 'clamp(50px, 10vh, 100px)',
                    textAlign: 'center',
                    transition: 'all ease 0.2s',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: '28px',
                    color: 'white',
                    filter: hover
                        ? 'drop-shadow(0px -3.623px 3.623px #f2e279)'
                        : 'drop-shadow(0px 0px 0px #ffffff)',
                    transform: hover ? 'scale(0.97)' : 'scale(1)',
                    textDecoration: 'none',
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                Home Page
            </Link>

            <style jsx global>{`
                @import url('https://fonts.cdnfonts.com/css/sf-ironsides');
            `}</style>
        </div>
    );
};

export default ComingSoon;
