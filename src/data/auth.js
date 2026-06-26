export const loginAuth = {
  layout: {
    title: 'Masuk',
    subtitle: 'Selamat datang kembali!',
  },
  form: {
    fields: [
      {
        label: 'Email',
        type: 'email',
        name: 'email',
        placeholder: 'Masukkan email',
        autoComplete: 'email',
      },
      {
        label: 'Kata Sandi',
        type: 'password',
        name: 'password',
        placeholder: 'Masukkan kata sandi',
        autoComplete: 'current-password',
      },
    ],
    buttonText: 'Masuk',
    footerText: 'Belum punya akun?',
    footerLink: {
      text: 'Daftar',
      to: '/register',
    },
    forgotPassword: {
      text: 'Lupa kata sandi?',
      to: '/login',
    },
  },
}

export const registerAuth = {
  layout: {
    title: 'Daftar',
    subtitle: 'Selamat datang!',
  },
  form: {
    fields: [
      {
        label: 'Nama',
        type: 'text',
        name: 'name',
        placeholder: 'Masukkan nama',
        autoComplete: 'name',
      },
      {
        label: 'Email',
        type: 'email',
        name: 'email',
        placeholder: 'Masukkan email',
        autoComplete: 'email',
      },
      {
        label: 'Kata Sandi',
        type: 'password',
        name: 'password',
        placeholder: 'Masukkan kata sandi',
        autoComplete: 'new-password',
      },
      {
        label: 'Konfirmasi Kata Sandi',
        type: 'password',
        name: 'confirmPassword',
        placeholder: 'Masukkan kata sandi',
        autoComplete: 'new-password',
      },
    ],
    buttonText: 'Daftar',
    footerText: 'Sudah punya akun?',
    footerLink: {
      text: 'Masuk',
      to: '/login',
    },
    compact: true,
  },
}
