import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import TaskManager from "@/components/pages/TaskManager";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white font-body">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TaskManager />} />
            <Route path="category/:categoryId" element={<TaskManager />} />
            <Route path="priority/:priority" element={<TaskManager />} />
            <Route path="status/:status" element={<TaskManager />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;