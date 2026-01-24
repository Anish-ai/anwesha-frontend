import Link from 'next/link'
import { useState } from 'react'
import styles from '../components/UserRegister-Login/style.module.css'

const MerchandisePage = () => {
  const [hover, setHover] = useState(false)

  return (
    <div
      style={{
        backgroundImage: 'url("/assets/error_404.png")',
        height: '100dvh',
        width: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* CONTENT WRAPPER */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '48px', // 🔥 spacing between text & button
          zIndex: 2,
        }}
      >
        {/* Main Message */}
        <h1
          className={styles.dont_loss}
          style={{
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: '1.2',
          }}
        >
          CURRENTLY WE ARE NOT ACCEPTING
          <br />
          MERCHANDISE ORDERS
          <br />
          <span style={{ fontSize: '0.8em', opacity: 0.8 }}>
            WE WILL COME SOON 🚀
          </span>
        </h1>

        {/* Home Button */}
        <Link
          href="/"
          className={styles.homepage_btn}
          style={{
            backgroundImage: 'url("/assets/register_button_bac.png")',
            width: '346px',
            height: '77px',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: '28px',
            textDecoration: 'none',
            filter: hover
              ? 'drop-shadow(0px -3.623px 3.623px #f2e279)'
              : 'none',
            transform: hover ? 'scale(0.97)' : 'scale(1)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Home Page
        </Link>
      </div>
    </div>
  )
}

export default MerchandisePage
