const PageHeader = ({ title, children }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="flex gap-2">
        {children}
      </div>
    </div>
  )
}

export default PageHeader