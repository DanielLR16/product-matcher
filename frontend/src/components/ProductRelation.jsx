import { useState, useEffect } from "react";

export default function  ProductRelation() {
  const [clients, setClients] = useState([]);
  const [clientSelect, setClientSelect] = useState("");
  const [productsClient, setProductsClient] = useState([]);
  const [productSelect, setProductSelect] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState(null);

    // Cargar clientes al inicio
    useEffect(() => {
    fetch("http://localhost/backend/api/get_clients.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
            console.error("Backend error:", data.message);
        } else {
            setClients(data); 
        } 
      })
      .catch((err) => console.error("Error fetching clients:", err));
  }, []);

    // Cargar productos del cliente seleccionado
  useEffect(() => {
    if (!clientSelect) return;
    fetch(`http://localhost/backend/api/get_client_products.php?client_id=${clientSelect}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
            console.error("Backend error:", data.message);
        } else {
            setProductsClient(data); 
        } 
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [clientSelect]);


    useEffect(() => {
        setSearch("");
        setResults([]);
    }, [clientSelect, productSelect]);

  // Simular búsqueda
  const handleSearch = async () => {
    if (!search.trim() || search.length < 3) return;
    try {
      const res = await fetch(
        `http://localhost/backend/api/search_products.php?query=${encodeURIComponent(search)}&exclude_client=${clientSelect}`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Error en la búsqueda:", err);
    }
  };

  // Crear relación
  const handleCreateRelation = async (targetProductId) => {
    try {
      const res = await fetch("http://localhost/backend/api/add_relation.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_a: productSelect,
          product_b: targetProductId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "Relación creada correctamente ✅" });
      } else {
        setMessage({ type: "error", text: "Error al crear relación: " + data.error });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error al crear relación: " + err.error });
    }

    setTimeout(() => setMessage(null), 5000);
  };

  return (
    <div className="flex flex-col items-start p-4 pb-10 gap-6 w-full max-w-[1319px] bg-white shadow-md rounded-lg">
      <h2 className="font-montserrat font-semibold text-[25px] leading-[120%] text-[#7058FF]">
        Relacionar Productos
      </h2>

      {/* Selectores cliente y producto */}
      <div className="flex w-full gap-4">
        {/* Cliente */}
        <div className="flex-1 flex flex-col">
          <span className="mb-1 font-semibold text-gray-700">Selecciona Cliente</span>
          <select
            value={clientSelect}
            onChange={(e) => setClientSelect(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Elige un cliente --</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        

        {/* Producto del cliente */}
        <div className="flex-1 flex flex-col">
          <span className="mb-1 font-semibold text-gray-700">Selecciona Producto</span>
          <select
            value={!clientSelect ? "" : productSelect}
            onChange={(e) => setProductSelect(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={!clientSelect}
          >
            <option value="">-- Elige un producto --</option>
            {productsClient.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Input búsqueda */}
      <div className="flex w-full gap-2">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Buscar
        </button>
      </div>
      {message && (
        <div
            className={`w-full p-3 mb-4 rounded-md text-white ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
        >
            {message.text}
        </div>
        )}
      {/* Resultados */}
      {clientSelect && results.length > 0 && (
        <table className="w-full border-collapse border border-gray-200 rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-center">Producto</th>
              <th className="border border-gray-200 px-4 py-2 text-center">Cliente</th>
              <th className="border border-gray-200 px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id}>
                <td className="border border-gray-200 px-4 py-2">{r.name}</td>
                <td className="border border-gray-200 px-4 py-2">{r.client_name}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <button
                    onClick={() => handleCreateRelation(r.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Crear Relación
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}