import AuthForm from '../components/auth/AuthForm.jsx'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import { loginAuth } from '../data/auth.js'

function Login() {
  return (
    <AuthLayout
      title={loginAuth.layout.title}
      subtitle={loginAuth.layout.subtitle}
    >
      <AuthForm
        fields={loginAuth.form.fields}
        buttonText={loginAuth.form.buttonText}
        footerText={loginAuth.form.footerText}
        footerLink={loginAuth.form.footerLink}
        forgotPassword={loginAuth.form.forgotPassword}
      />
    </AuthLayout>
  )
}

export default Login
