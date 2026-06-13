import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import '../styles/register.css'

const googleIconUrl = 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg'

function Register() {
  return (
    <AuthLayout
      title="Daftar"
      subtitle="Selamat datang!"
      footerText="Sudah punya akun?"
      footerLinkText="Masuk"
      footerTo="/login"
    >
      <form className="register-form">
        <label className="register-form__field">
          <span>Username</span>
          <input type="text" placeholder="Masukkan username" autoComplete="username" />
        </label>

        <label className="register-form__field">
          <span>Kata Sandi</span>
          <span className="register-form__password">
            <input
              type="password"
              placeholder="Masukkan kata sandi"
              autoComplete="new-password"
            />
            <span aria-hidden="true" className="register-form__eye">
              <svg viewBox="0 0 24 24">
                <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
          </span>
        </label>

        <label className="register-form__field">
          <span>Konfirmasi Kata Sandi</span>
          <span className="register-form__password">
            <input
              type="password"
              placeholder="Masukkan kata sandi"
              autoComplete="new-password"
            />
            <span aria-hidden="true" className="register-form__eye">
              <svg viewBox="0 0 24 24">
                <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
          </span>
        </label>

        <p className="register-form__meta">
          Sudah punya akun? <Link to="/login">Masuk</Link>
        </p>

        <button type="button" className="register-form__submit">
          Daftar
        </button>

        <div className="register-form__divider">atau</div>

        <button type="button" className="register-form__google">
          <img src={googleIconUrl} alt="" aria-hidden="true" />
          Daftar dengan Google
        </button>
      </form>
    </AuthLayout>
  )
}

export default Register
