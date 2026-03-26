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

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/iniciativas" element={<Iniciativas />} />
          <Route path="/voluntarios" element={<Voluntarios />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/projetos/:id" element={<ProjetoDetalhes />} />
          <Route path="/eventos" element={<Eventos />} />
        </Routes>
      </Layout>
    </Router>
  );
}
