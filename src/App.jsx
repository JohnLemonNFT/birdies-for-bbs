import { Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./lib/auth";
import { Login } from "./components/Login";
import CRM from "./crm/CRM";
import { PlayfulHome } from "./components/playful/PlayfulHome";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PlayfulHome />} />
        <Route path="/crm" element={<ProtectedRoute><CRM /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  );
}
