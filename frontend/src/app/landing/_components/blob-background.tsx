export default function BlobBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

      {/* MAIN BLOB */}
      <div className="absolute top-[10vh] left-[50%] -translate-x-1/2 w-162.5 h-162.5 bg-blue-600 opacity-40 blur-3xl blob-shape" />

      {/* SECOND BLOB */}
      <div className="absolute top-[60vh] left-[20%] w-125 h-125 bg-indigo-500 opacity-30 blur-3xl blob-shape" />

      {/* THIRD BLOB */}
      <div className="absolute top-[120vh] right-[10%] w-112.5 h-112.5 bg-purple-600 opacity-30 blur-3xl blob-shape" />

    </div>
  )
}