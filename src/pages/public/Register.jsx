import AuthForm from '../../components/public/auth/AuthForm.jsx'
import AuthLayout from '../../components/public/auth/AuthLayout.jsx'
import { registerAuth } from '../../data/auth.js'

function Register() {
  return (
    <AuthLayout
      title={registerAuth.layout.title}
      subtitle={registerAuth.layout.subtitle}
    >
      <AuthForm
        fields={registerAuth.form.fields}
        buttonText={registerAuth.form.buttonText}
        footerText={registerAuth.form.footerText}
        footerLink={registerAuth.form.footerLink}
        compact={registerAuth.form.compact}
      />
    </AuthLayout>
  )
}

export default Register
