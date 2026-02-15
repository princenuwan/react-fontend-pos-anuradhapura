// import { Link, Route, Routes } from "react-router-dom";

import AdminDashboard from "./pages/AdminPage"

export default function App(){
  return(
    <div className="w-full h-screen bg-red-500 flex flex-col items-center">
      <AdminDashboard />

      {/* <div className="bg-red-300 w-full h-16 flex items-center justify-center gap-4">
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/product">Product</Link>
          <Link to="/wedding">WeddingPlace</Link>
          <Link to="/weather">Weather-App</Link>
      </div> */}

      {/* <div className="w-full h-full flex flex-col justify-center items-center">
        <Routes>
          <Route path="/wedding" element={<WeddingPlace/>} />
          <Route path="/weather" element={<WeatherApp/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/dashboard" element={<AdminDashboard/>} />
          <Route path="/product" element={<CreateProduct/>} />
        </Routes>
      </div> */}

    </div>
  )
}
