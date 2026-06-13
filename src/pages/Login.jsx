import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import '../styles/login.css'

const googleIconUrl = 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg'

function Login() {
  return (
    <AuthLayout
      title="Masuk"
      subtitle="Selamat datang kembali!"
      footerText="Belum punya akun?"
      footerLinkText="Daftar"
      footerTo="/register"
    >
      <form className="login-form">
        <label className="login-form__field">
          <span>Username</span>
          <input type="text" placeholder="Masukkan username" autoComplete="username" />
        </label>

        <label className="login-form__field">
          <span>Kata Sandi</span>
          <span className="login-form__password">
            <input
              type="password"
              placeholder="Masukkan kata sandi"
              autoComplete="current-password"
            />
            <span aria-hidden="true" className="login-form__eye">
              <svg viewBox="0 0 24 24">
                <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
          </span>
        </label>

        <div className="login-form__meta">
          <p>
            Belum punya akun? <Link to="/register">Daftar</Link>
          </p>
          <Link to="/login">Lupa kata sandi?</Link>
        </div>

        <button type="button" className="login-form__submit">
          Masuk
        </button>

        <div className="login-form__divider">atau</div>

        <button type="button" className="login-form__google">
          <img src={googleIconUrl} alt="" aria-hidden="true" />
          Masuk dengan Google
        </button>
      </form>
    </AuthLayout>
  )
}

export default Login
