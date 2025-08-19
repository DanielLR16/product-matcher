import { useState, useEffect } from "react";

export default function AddProductForm() {
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [errorProduct, setErrorProduct] = useState(false);
  const [errorPrice, setErrorPrice] = useState(false);
 
  // Traer clientes desde la API al cargar el componente
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const productOk = product.trim() !== "";
    const priceOk = price.trim() !== "";

    setErrorProduct(!productOk);
    setErrorPrice(!priceOk);

    if (!productOk || !priceOk || !client) {
      setMessage("Por favor corrige los errores antes de enviar.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost/backend/api/add_product.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: parseInt(client),
          name: product,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Producto añadido correctamente ✅");
        setProduct("");
        setPrice(""); 
      } else {
        setMessage("Error al añadir el producto: " + data.error);
      }
    } catch (error) {
      console.error(error);
      setMessage("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col items-start p-4 pb-10 gap-6 w-full bg-white shadow-md rounded-lg"
      onSubmit={handleSubmit}
    >
    {/* Header del formulario */}
      <h2
        className="font-montserrat font-semibold text-[25px] leading-[120%] text-[#7058FF]"
      >
        Añadir Producto del Cliente
      </h2>
      {/* Selector de cliente */}
      <label className="flex flex-col w-full">
        <span className="mb-1 font-semibold text-gray-700">Selecciona Cliente</span>
        <select
          value={client}
          onChange={(e) => setClient(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">-- Elige un cliente --</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
            {c.name}
            </option>
           ))}
        </select>
      </label>

      {/* Inputs en la misma línea */}
      <div className="flex w-full gap-4">
        {/* Nombre del producto */}
        <div className="flex-1 flex flex-col">
          <span
            className={`mb-1 font-semibold ${
              errorProduct ? "text-red-500" : "text-gray-700"
            }`}
          >
            Nombre del producto
          </span>
          <input
            type="text"
            placeholder="Introduce el nombre del producto"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className={`border rounded-md p-2 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errorProduct ? "border-red-500" : "border-gray-300"
            } w-full`}
          />
          {errorProduct && (
            <div className="flex items-center gap-2 mt-1 text-red-500 text-sm">
              <img
                src="/icons/error.svg"
                alt="error"
                className="w-4 h-4"
              />
              <span>El nombre del producto es obligatorio</span>
            </div>
          )}
        </div>
        
         {/* Precio */}
        <div className="flex-1 flex flex-col relative">
          <span
            className={`mb-1 font-semibold ${
              errorPrice ? "text-red-500" : "text-gray-700"
            }`}
          >
            Precio
          </span>
          <input
            type="number"
            placeholder="0.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={`border rounded-md p-2 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errorPrice ? "border-red-500" : "border-gray-300"
            } w-full`}
          />
          {errorPrice && (
            <div className="flex items-center gap-2 mt-1 text-red-500 text-sm">
              <img
                src="/icons/error.svg"
                alt="error"
                className="w-4 h-4"
              />
              <span>El precio es obligatorio</span>
            </div>
          )}
        </div>
      </div>

      {/* Botón añadir producto */}
      <button
        type="submit"
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        {loading ? "Añadiendo..." : "Añadir Producto"}
      </button>
      {message && <p className="text-gray-600 mt-2">{message}</p>}
    </form>
  );
}
