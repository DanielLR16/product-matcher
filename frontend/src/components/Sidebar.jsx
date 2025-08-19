export default function SideBar() {
    return (
    <aside className="h-screen w-16 bg-white flex flex-col items-center pt-2 border-r border-gray-300">
      <div className="mb-2">
        <img src="/icons/logo.svg" alt="Logo" className="w-15 h-15" />
      </div>
      <nav className="flex flex-col space-y-6">
        <a href="#" className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <img src="/icons/home.svg" alt="Home" className="w-6 h-6" />
        </a>
        <a href="#" className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <img src="/icons/shopping.svg" alt="Compras" className="w-6 h-6" />
        </a>
        <a href="#" className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <img src="/icons/search_side.svg" alt="Busqueda" className="w-6 h-6" />
        </a>
        <a href="#" className="p-2 rounded-lg bg-indigo-100">
          <img src="/icons/task.svg"  alt="Tareas" className="w-6 h-6 text-indigo-600" />
        </a>
        <a href="#" className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <img src="/icons/file.svg" alt="Descargas" className="w-6 h-6" />
        </a>
      </nav>
    </aside>
    );
}