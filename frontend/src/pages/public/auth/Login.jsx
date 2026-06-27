import AuthForm from '../../../components/public/auth/AuthForm.jsx'
import AuthLayout from '../../../components/public/auth/AuthLayout.jsx'
import { loginAuth } from '../../../data/auth.js'
import useAuthForm from '../../../hooks/public/useAuthForm.js'

function Login() {
  const authForm = useAuthForm('login')

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
        {...authForm}
      />
    </AuthLayout>
  )
}

export default Login
