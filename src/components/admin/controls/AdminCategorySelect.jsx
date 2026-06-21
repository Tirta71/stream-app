function AdminCategorySelect({ options, selectedGroup, onChange }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-white">
      Kategori Movie
      <select
        className="min-h-12 w-full rounded-lg border border-white/15 bg-[#202326] px-4 text-sm font-medium text-white outline-none transition-[border-color,box-shadow] duration-150 focus:border-white/50 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.08)] max-[640px]:text-xs"
        value={selectedGroup}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default AdminCategorySelect
