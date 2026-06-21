function AdminPageHeader({ title, description }) {
  return (
    <div className="max-w-3xl">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#3254ff] max-[640px]:mb-2 max-[640px]:text-xs">
        Admin Movies
      </p>
      <h1 className="text-4xl font-bold leading-tight text-white max-[640px]:text-2xl">{title}</h1>
      {description ? (
        <p className="mt-3 text-base leading-7 text-[#c1c2c4] max-[640px]:text-sm">{description}</p>
      ) : null}
    </div>
  )
}

export default AdminPageHeader
