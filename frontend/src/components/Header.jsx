export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-3 bg-white shadow-sm">
      {/* Search bar */}
      <div className="flex items-center border rounded-lg overflow-hidden">
        <input
          type="text"
          placeholder="Write text..."
          className="px-4 py-2 outline-none text-sm"
        />
        <button className="flex items-center gap-1 px-3 py-2 bg-white border-l border-gray-300 text-indigo-600 font-medium hover:bg-indigo-50">
          <span>Search</span>
          <img src="/icons/search.svg" alt="Busqueda" className="w-4 h-4" />
        </button>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-6">
        {/* Filter toggle */}
        <button className="flex items-center gap-1 text-gray-600 hover:text-indigo-600 transition">
          <img src="/icons/filter.svg" alt="Filtro" className="w-5 h-5" />
          <span className="text-sm">On</span>
        </button>

        {/* Notifications */}
        <button className="relative text-gray-600 hover:text-indigo-600 transition">
          <img src="/icons/bell.svg" alt="Notificaciones" className="w-5 h-5" />
          <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            2
          </span>
        </button>

        {/* Language dropdown */}
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="font-medium">ESP</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>

        {/* User profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="/icons/profile.svg"
            alt="Perfil"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium">Steve Rogers</span>
            <span className="text-xs text-gray-500">Fnac / 30110</span>
          </div>
        </div>
      </div>
    </header>
  );
}
