import { Link } from 'react-router-dom'
import logo from '../assets/img/logo/Logo.png'
import '../styles/auth-layout.css'

function AuthLayout({ title, subtitle, children, footerText, footerLinkText, footerTo }) {
  return (
    <main className="auth-layout">
      <section className="auth-layout__panel" aria-labelledby="auth-title">
        <Link className="auth-layout__brand" to="/home" aria-label="Chill home">
          <img src={logo} alt="Chill" />
        </Link>

        <div className="auth-layout__heading">
          <h1 id="auth-title">{title}</h1>
          <p>{subtitle}</p>
        </div>

        {children}

        <p className="auth-layout__footer">
          {footerText} <Link to={footerTo}>{footerLinkText}</Link>
        </p>
      </section>
    </main>
  )
}

export default AuthLayout
