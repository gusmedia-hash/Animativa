/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Iniciativas from "./pages/Iniciativas";
import Voluntarios from "./pages/Voluntarios";
import Projetos from "./pages/Projetos";
import Eventos from "./pages/Eventos";
import ProjetoDetalhes from "./pages/ProjetoDetalhes";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/iniciativas" element={<Layout><Iniciativas /></Layout>} />
        <Route path="/voluntarios" element={<Layout><Voluntarios /></Layout>} />
        <Route path="/projetos" element={<Layout><Projetos /></Layout>} />
        <Route path="/projetos/:id" element={<Layout><ProjetoDetalhes /></Layout>} />
        <Route path="/eventos" element={<Layout><Eventos /></Layout>} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
