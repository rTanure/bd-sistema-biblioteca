import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <h1>lAYOUT</h1>
      <main className="flex-1 p-4">
        <Outlet /> {/* Aqui entram as páginas */}
      </main>
    </div>
  );
}
