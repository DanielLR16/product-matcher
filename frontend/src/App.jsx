import './App.css'
import Header from "./components/Header";
import SideBar from "./components/Sidebar";
import Footer from "./components/Footer"
import AddProductForm from "./components/AddProductForm"
import ProductRelation from "./components/ProductRelation"

function App() {

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-5 flex-1">
          <AddProductForm />
          <ProductRelation />
          <Footer />
        </main>
      </div>
    </div>
  )
}

export default App
