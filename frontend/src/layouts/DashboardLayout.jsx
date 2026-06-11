import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 bg-slate-100 min-h-screen">
        <Navbar />

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

export default DashboardLayout;
