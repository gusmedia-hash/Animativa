import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  Users, 
  Sparkles, 
  Calendar, 
  Settings, 
  Search, 
  Plus, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Trash2,
  Filter,
  ArrowUpRight,
  Briefcase,
  X
} from "lucide-react";
import { Link } from "react-router-dom";

type Tab = "dashboard" | "iniciativas" | "voluntarios" | "projetos" | "eventos" | "configuracoes";

interface EditModalProps {
  title: string;
  onClose: () => void;
  onSave: () => void;
  children: React.ReactNode;
}

const EditModal = ({ title, onClose, onSave, children }: EditModalProps) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
  >
    <motion.div 
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      className="bg-[#121212] border border-white/10 w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl"
    >
      <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
        <h3 className="text-xl font-black uppercase tracking-tighter">{title}</h3>
        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <XCircle className="w-6 h-6 text-white/40 hover:text-white" />
        </button>
      </div>
      <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
        {children}
      </div>
      <div className="p-8 border-t border-white/5 bg-white/[0.02] flex justify-end gap-4">
        <button onClick={onClose} className="px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">Cancelar</button>
        <button onClick={onSave} className="px-8 py-4 bg-brand-orange rounded-2xl text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-brand-orange/20">Confirmar</button>
      </div>
    </motion.div>
  </motion.div>
);

const FormField = ({ label, children }: { label: string, children: React.ReactNode }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">{label}</label>
    {children}
  </div>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-brand-orange transition-all" />
);

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select {...props} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-brand-orange transition-all appearance-none" />
);

const TextArea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...props} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-brand-orange transition-all min-h-[120px] resize-none" />
);

export default function Admin() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState<{ type: Tab, data: any, isNew?: boolean } | null>(null);

  // Initial Data States
  const [iniciativas, setIniciativas] = useState([
    { name: "Vozes da Periferia", cat: "Cultura", status: "Ativo", date: "12/03/2026" },
    { name: "Sementes do Amanhã", cat: "Educação", status: "Ativo", date: "10/03/2026" },
    { name: "Eco-Ação", cat: "Meio Ambiente", status: "Pendente", date: "15/03/2026" },
    { name: "Saúde em Movimento", cat: "Saúde", status: "Ativo", date: "08/03/2026" },
    { name: "Tecnologia Social", cat: "Educação", status: "Ativo", date: "05/03/2026" },
    { name: "Arte Solidária", cat: "Cultura", status: "Ativo", date: "01/03/2026" },
    { name: "Recicla Já", cat: "Meio Ambiente", status: "Ativo", date: "25/02/2026" },
    { name: "Sorriso de Criança", cat: "Saúde", status: "Ativo", date: "20/02/2026" },
  ]);

  const [voluntarios, setVoluntarios] = useState([
    { name: "Ana Clara", skills: ["Design", "Social Media"], availability: "Finais de Semana", status: "Ativo" },
    { name: "Ricardo Souza", skills: ["TI", "Gestão"], availability: "Noite", status: "Ativo" },
    { name: "Mariana Lima", skills: ["Educação", "Artes"], availability: "Manhã", status: "Pendente" },
  ]);

  const [projetos, setProjetos] = useState([
    { title: "Re-Verde Urbano", initiative: "Eco-Vida", progress: 75, status: "Em andamento" },
    { title: "EducaTech", initiative: "TechSocial", progress: 40, status: "Em andamento" },
    { title: "Cozinha Solidária", initiative: "Bairro Vivo", progress: 100, status: "Concluído" },
    { title: "Arte na Praça", initiative: "Cultura Livre", progress: 30, status: "Em andamento" },
    { title: "Código para Todos", initiative: "TechSocial", progress: 60, status: "Em andamento" },
    { title: "Horta Comunitária", initiative: "Eco-Vida", progress: 90, status: "Em andamento" },
    { title: "Música no Parque", initiative: "Cultura Viva", progress: 100, status: "Concluído" },
    { title: "Saúde Itinerante", initiative: "Saúde Já", progress: 20, status: "Em andamento" },
    { title: "Tecnologia Social", initiative: "InovaSocial", progress: 50, status: "Em andamento" },
    { title: "Esporte para Vida", initiative: "AtivaMente", progress: 85, status: "Em andamento" },
    { title: "Alfabetização Já", initiative: "EducaMais", progress: 45, status: "Em andamento" },
    { title: "Oceano Limpo", initiative: "Eco-Vida", progress: 15, status: "Em andamento" },
    { title: "Teatro na Escola", initiative: "Cultura Viva", progress: 70, status: "Em andamento" },
    { title: "Inclusão Digital", initiative: "TechSocial", progress: 95, status: "Em andamento" },
    { title: "Sustentabilidade Rural", initiative: "Eco-Vida", progress: 10, status: "Em andamento" },
  ]);

  const [eventos, setEventos] = useState([
    { title: "Workshop: Design de Impacto", date: "15 Abr", type: "Online", location: "Zoom" },
    { title: "Encontro Regional Sul", date: "22 Abr", type: "Presencial", location: "Curitiba, PR" },
    { title: "Webinar: Captação de Recursos", date: "05 Mai", type: "Online", location: "YouTube" },
    { title: "Hackathon Social 2026", date: "12 Mai", type: "Presencial", location: "São Paulo, SP" },
  ]);

  // Custom Fields States
  const [projectCategories, setProjectCategories] = useState(["Cultura", "Educação", "Meio Ambiente", "Saúde", "Inovação", "Esporte", "Tecnologia", "Social"]);
  const [volunteerSkills, setVolunteerSkills] = useState(["Design", "Social Media", "TI", "Gestão", "Educação", "Artes", "Cozinha", "Ensino", "Saúde", "Direito", "Marketing", "Eventos"]);
  const [impactTypes, setImpactTypes] = useState(["Social", "Ambiental", "Educacional", "Cultural", "Econômico"]);

  const [managingConfig, setManagingConfig] = useState<{ id: string, label: string, items: string[] } | null>(null);

  const sidebarLinks = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "iniciativas", label: "Iniciativas", icon: Sparkles },
    { id: "voluntarios", label: "Voluntários", icon: Users },
    { id: "projetos", label: "Projetos", icon: Briefcase },
    { id: "eventos", label: "Eventos", icon: Calendar },
    { id: "configuracoes", label: "Configurações", icon: Settings },
  ];

  const stats = [
    { label: "Novas Iniciativas", value: "12", trend: "+20%", color: "brand-orange" },
    { label: "Voluntários Ativos", value: "1,240", trend: "+5%", color: "brand-blue" },
    { label: "Eventos este mês", value: "8", trend: "0%", color: "white" },
    { label: "Impacto Estimado", value: "45k", trend: "+12%", color: "brand-orange" },
  ];

  const onSaveConfig = () => {
    if (!managingConfig) return;
    if (managingConfig.id === "categories") setProjectCategories(managingConfig.items);
    if (managingConfig.id === "skills") setVolunteerSkills(managingConfig.items);
    if (managingConfig.id === "impact") setImpactTypes(managingConfig.items);
    setManagingConfig(null);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-brand-purple/20 backdrop-blur-3xl p-8 flex flex-col sticky top-0 h-screen">
        <div className="mb-12">
          <Link to="/" className="text-2xl font-black text-white lowercase tracking-tighter flex items-baseline">
            an
            <span className="relative inline-flex flex-col items-center">
              <span className="absolute -top-[0.2em] w-[0.18em] h-[0.18em] rounded-full bg-brand-orange" />
              ı
            </span>
            mat
            <span className="relative inline-flex flex-col items-center">
              <span className="absolute -top-[0.2em] w-[0.18em] h-[0.18em] rounded-full bg-brand-blue" />
              ı
            </span>
            va
          </Link>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mt-2">Painel Admin</p>
        </div>

        <nav className="flex-1 space-y-2">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id as Tab)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === link.id 
                  ? "bg-white text-brand-purple shadow-xl" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/5">
          <div className="flex items-center gap-4 px-4">
            <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange font-black">
              G
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest">Gus Admin</p>
              <p className="text-[10px] text-white/40">Super Usuário</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">
              {sidebarLinks.find(l => l.id === activeTab)?.label}
            </h1>
            <p className="text-white/40 text-sm">Bem-vindo de volta ao centro de comando.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="text" 
                placeholder="Pesquisar..." 
                className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-brand-orange transition-all w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "dashboard" && (
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
                {/* Stats Column */}
                <div className="xl:col-span-4 grid grid-cols-2 gap-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] relative overflow-hidden group">
                      <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}/10 blur-2xl -mr-12 -mt-12 group-hover:bg-${stat.color}/20 transition-all`} />
                      <p className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-2">{stat.label}</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-black tracking-tighter">{stat.value}</p>
                        <span className="text-[8px] font-black text-green-500">{stat.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="xl:col-span-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white/5 border border-white/10 rounded-[3.5rem] p-10">
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-xl font-black uppercase tracking-tighter">Solicitações Pendentes</h2>
                      <button className="text-[10px] font-black uppercase tracking-widest text-brand-orange hover:text-white transition-colors">Ver Todas</button>
                    </div>
                    <div className="space-y-6">
                      {[
                        { name: "Eco-Vida", type: "Iniciativa", date: "Há 2h", status: "Pendente" },
                        { name: "João Silva", type: "Voluntário", date: "Há 5h", status: "Pendente" },
                        { name: "Arte Livre", type: "Iniciativa", date: "Há 12h", status: "Pendente" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-brand-purple flex items-center justify-center">
                              {item.type === "Iniciativa" ? <Sparkles className="w-5 h-5 text-brand-orange" /> : <Users className="w-5 h-5 text-brand-blue" />}
                            </div>
                            <div>
                              <p className="text-sm font-black uppercase tracking-tighter">{item.name}</p>
                              <p className="text-[10px] text-white/40 uppercase tracking-widest">{item.type} • {item.date}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-green-500/20 rounded-lg transition-colors text-green-500">
                              <CheckCircle2 className="w-5 h-5" />
                            </button>
                            <button className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-500">
                              <XCircle className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-[3.5rem] p-10">
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-xl font-black uppercase tracking-tighter">Próximos Eventos</h2>
                      <button className="text-[10px] font-black uppercase tracking-widest text-brand-blue hover:text-white transition-colors">Gerenciar Agenda</button>
                    </div>
                    <div className="space-y-6">
                      {[
                        { title: "Hackathon Social", date: "28 Mar", time: "14:00", attendees: 45 },
                        { title: "Workshop CNV", date: "02 Abr", time: "19:00", attendees: 120 },
                        { title: "Encontro de Líderes", date: "05 Abr", time: "10:00", attendees: 15 },
                      ].map((event, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex flex-col items-center justify-center text-center">
                              <span className="text-[10px] font-black text-brand-orange leading-none">{event.date.split(' ')[0]}</span>
                              <span className="text-[8px] font-black uppercase text-white/40">{event.date.split(' ')[1]}</span>
                            </div>
                            <div>
                              <p className="text-sm font-black uppercase tracking-tighter">{event.title}</p>
                              <p className="text-[10px] text-white/40 uppercase tracking-widest">{event.time} • {event.attendees} Inscritos</p>
                            </div>
                          </div>
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <ArrowUpRight className="w-5 h-5 text-white/40" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "iniciativas" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-black uppercase tracking-tighter">Gestão de Iniciativas</h2>
                  <button 
                    onClick={() => setEditingItem({ type: "iniciativas", data: { name: "", cat: "Educação", status: "Pendente", date: new Date().toLocaleDateString() }, isNew: true })}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-orange text-white rounded-xl font-black uppercase tracking-widest text-[10px]"
                  >
                    <Plus className="w-4 h-4" />
                    Nova Iniciativa
                  </button>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/[0.02]">
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40">Iniciativa</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40">Categoria</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40">Status</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40">Data</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {iniciativas.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-lg bg-brand-purple/40 border border-white/10" />
                              <span className="text-sm font-black uppercase tracking-tighter">{item.name}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full border border-white/10">{item.cat}</span>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Ativo' ? 'bg-green-500' : 'bg-brand-orange'}`} />
                              <span className="text-[10px] font-black uppercase tracking-widest">{item.status}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-[10px] font-black text-white/40">{item.date}</td>
                          <td className="px-8 py-6">
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => setEditingItem({ type: "iniciativas", data: item })}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors"><MoreVertical className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "voluntarios" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-black uppercase tracking-tighter">Gestão de Voluntários</h2>
                  <div className="flex gap-4">
                    <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">Exportar CSV</button>
                    <button 
                      onClick={() => setEditingItem({ type: "voluntarios", data: { name: "", skills: [], availability: "Manhã", status: "Pendente" }, isNew: true })}
                      className="flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-xl font-black uppercase tracking-widest text-[10px]"
                    >
                      <Plus className="w-4 h-4" />
                      Novo Voluntário
                    </button>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/[0.02]">
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40">Nome</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40">Habilidades</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40">Disponibilidade</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40">Status</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {voluntarios.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue font-black text-xs">
                                {item.name.charAt(0)}
                              </div>
                              <span className="text-sm font-black uppercase tracking-tighter">{item.name}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex gap-2">
                              {item.skills.map(skill => (
                                <span key={skill} className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-white/5 rounded-full border border-white/5">{skill}</span>
                              ))}
                            </div>
                          </td>
                          <td className="px-8 py-6 text-[10px] font-black text-white/40 uppercase tracking-widest">{item.availability}</td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Ativo' ? 'bg-green-500' : 'bg-brand-orange'}`} />
                              <span className="text-[10px] font-black uppercase tracking-widest">{item.status}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => setEditingItem({ type: "voluntarios", data: item })}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors"><MoreVertical className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "projetos" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-black uppercase tracking-tighter">Gestão de Projetos</h2>
                  <button 
                    onClick={() => setEditingItem({ type: "projetos", data: { title: "", initiative: "", progress: 0, status: "Em andamento" }, isNew: true })}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-purple border border-white/10 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Novo Projeto
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {projetos.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).map((project, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] group">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-xl font-black uppercase tracking-tighter mb-1">{project.title}</h3>
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Iniciativa: {project.initiative}</p>
                        </div>
                        <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${project.status === 'Concluído' ? 'border-green-500/20 text-green-500 bg-green-500/10' : 'border-brand-blue/20 text-brand-blue bg-brand-blue/10'}`}>
                          {project.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-8">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                          <span className="text-white/40">Progresso</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-orange transition-all duration-500" style={{ width: `${project.progress}%` }} />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => setEditingItem({ type: "projetos", data: project })}
                          className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-brand-purple transition-all"
                        >
                          Editar Campos
                        </button>
                        <button className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white hover:text-brand-purple transition-all"><ArrowUpRight className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "eventos" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-black uppercase tracking-tighter">Agenda de Eventos</h2>
                  <button 
                    onClick={() => setEditingItem({ type: "eventos", data: { title: "", date: "", type: "Online", location: "" }, isNew: true })}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-xl font-black uppercase tracking-widest text-[10px]"
                  >
                    <Plus className="w-4 h-4" />
                    Agendar Evento
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {eventos.filter(e => e.title.toLowerCase().includes(searchTerm.toLowerCase())).map((event, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] group hover:border-brand-blue transition-all">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-brand-blue/20 flex items-center justify-center text-brand-blue">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-white/20" />
                        </button>
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-tighter mb-2">{event.title}</h3>
                      <p className="text-xs font-black uppercase tracking-widest text-brand-orange mb-6">{event.date}</p>
                      
                      <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-3 text-white/40">
                          <div className={`w-2 h-2 rounded-full ${event.type === 'Online' ? 'bg-blue-400' : 'bg-green-400'}`} />
                          <span className="text-[10px] font-black uppercase tracking-widest">{event.type}</span>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20">{event.location}</p>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => setEditingItem({ type: "eventos", data: event })}
                          className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-brand-purple transition-all"
                        >
                          Editar
                        </button>
                        <button className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 hover:bg-red-500 transition-all hover:text-white"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "configuracoes" && (
              <div className="max-w-2xl space-y-12">
                <section className="space-y-6">
                  <h2 className="text-xl font-black uppercase tracking-tighter">Campos Personalizados</h2>
                  <div className="space-y-4">
                    {[
                      { id: "categories", label: "Categorias de Projetos", items: projectCategories },
                      { id: "skills", label: "Habilidades de Voluntários", items: volunteerSkills },
                      { id: "impact", label: "Tipos de Impacto", items: impactTypes },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl">
                        <div>
                          <p className="text-sm font-black uppercase tracking-tighter">{item.label}</p>
                          <p className="text-[10px] text-white/40 uppercase tracking-widest">{item.items.length} opções configuradas</p>
                        </div>
                        <button 
                          onClick={() => setManagingConfig({ id: item.id, label: item.label, items: [...item.items] })}
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-brand-purple transition-all"
                        >
                          Gerenciar
                        </button>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-6">
                  <h2 className="text-xl font-black uppercase tracking-tighter">Segurança & Acesso</h2>
                  <div className="p-8 bg-brand-orange/10 border border-brand-orange/20 rounded-[2.5rem]">
                    <h3 className="text-sm font-black uppercase tracking-tighter text-brand-orange mb-2">Modo de Manutenção</h3>
                    <p className="text-xs text-white/60 mb-6 leading-relaxed">Ao ativar este modo, apenas administradores poderão acessar a plataforma pública. Útil para atualizações críticas.</p>
                    <button className="px-8 py-3 bg-brand-orange text-white rounded-xl font-black uppercase tracking-widest text-[10px]">Ativar Modo</button>
                  </div>
                </section>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Edit Modals */}
      <AnimatePresence>
        {editingItem && (
          <EditModal 
            title={editingItem.isNew ? `Novo ${editingItem.type.slice(0, -1)}` : `Editar ${editingItem.type.slice(0, -1)}`} 
            onClose={() => setEditingItem(null)}
            onSave={() => {
              if (editingItem.isNew) {
                if (editingItem.type === "iniciativas") setIniciativas([...iniciativas, editingItem.data]);
                if (editingItem.type === "voluntarios") setVoluntarios([...voluntarios, editingItem.data]);
                if (editingItem.type === "projetos") setProjetos([...projetos, editingItem.data]);
                if (editingItem.type === "eventos") setEventos([...eventos, editingItem.data]);
              } else {
                // Basic update logic (matching by name/title for now)
                if (editingItem.type === "iniciativas") setIniciativas(iniciativas.map(i => i.name === editingItem.data.name ? editingItem.data : i));
                if (editingItem.type === "voluntarios") setVoluntarios(voluntarios.map(v => v.name === editingItem.data.name ? editingItem.data : v));
                if (editingItem.type === "projetos") setProjetos(projetos.map(p => p.title === editingItem.data.title ? editingItem.data : p));
                if (editingItem.type === "eventos") setEventos(eventos.map(e => e.title === editingItem.data.title ? editingItem.data : e));
              }
              setEditingItem(null);
            }}
          >
            <div className="space-y-6">
              {editingItem.type === "iniciativas" && (
                <>
                  <FormField label="Nome da Iniciativa">
                    <Input 
                      defaultValue={editingItem.data.name} 
                      onChange={(e) => {
                        const newData = { ...editingItem.data, name: e.target.value };
                        setEditingItem({ ...editingItem, data: newData });
                      }}
                    />
                  </FormField>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Categoria">
                      <Select 
                        defaultValue={editingItem.data.cat}
                        onChange={(e) => {
                          const newData = { ...editingItem.data, cat: e.target.value };
                          setEditingItem({ ...editingItem, data: newData });
                        }}
                      >
                        <option value="">Selecione...</option>
                        {projectCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </Select>
                    </FormField>
                    <FormField label="Status">
                      <Select 
                        defaultValue={editingItem.data.status}
                        onChange={(e) => {
                          const newData = { ...editingItem.data, status: e.target.value };
                          setEditingItem({ ...editingItem, data: newData });
                        }}
                      >
                        <option>Ativo</option>
                        <option>Pendente</option>
                        <option>Inativo</option>
                      </Select>
                    </FormField>
                  </div>
                  <FormField label="Descrição da Iniciativa">
                    <TextArea placeholder="Descreva o propósito e impacto da iniciativa..." />
                  </FormField>
                  <FormField label="Website / Link">
                    <Input placeholder="https://..." />
                  </FormField>
                </>
              )}

              {editingItem.type === "voluntarios" && (
                <>
                  <FormField label="Nome Completo">
                    <Input 
                      defaultValue={editingItem.data.name}
                      onChange={(e) => {
                        const newData = { ...editingItem.data, name: e.target.value };
                        setEditingItem({ ...editingItem, data: newData });
                      }}
                    />
                  </FormField>
                  <FormField label="Habilidades (separadas por vírgula)">
                    <Input 
                      defaultValue={editingItem.data.skills.join(", ")}
                      onChange={(e) => {
                        const newData = { ...editingItem.data, skills: e.target.value.split(",").map(s => s.trim()) };
                        setEditingItem({ ...editingItem, data: newData });
                      }}
                    />
                  </FormField>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Disponibilidade">
                      <Select 
                        defaultValue={editingItem.data.availability}
                        onChange={(e) => {
                          const newData = { ...editingItem.data, availability: e.target.value };
                          setEditingItem({ ...editingItem, data: newData });
                        }}
                      >
                        <option>Manhã</option>
                        <option>Tarde</option>
                        <option>Noite</option>
                        <option>Finais de Semana</option>
                      </Select>
                    </FormField>
                    <FormField label="Status">
                      <Select 
                        defaultValue={editingItem.data.status}
                        onChange={(e) => {
                          const newData = { ...editingItem.data, status: e.target.value };
                          setEditingItem({ ...editingItem, data: newData });
                        }}
                      >
                        <option>Ativo</option>
                        <option>Pendente</option>
                        <option>Inativo</option>
                      </Select>
                    </FormField>
                  </div>
                  <FormField label="Mini Bio">
                    <TextArea placeholder="Breve resumo do voluntário..." />
                  </FormField>
                </>
              )}

              {editingItem.type === "projetos" && (
                <>
                  <FormField label="Título do Projeto">
                    <Input 
                      defaultValue={editingItem.data.title}
                      onChange={(e) => {
                        const newData = { ...editingItem.data, title: e.target.value };
                        setEditingItem({ ...editingItem, data: newData });
                      }}
                    />
                  </FormField>
                  <FormField label="Iniciativa Responsável">
                    <Select 
                      defaultValue={editingItem.data.initiative}
                      onChange={(e) => {
                        const newData = { ...editingItem.data, initiative: e.target.value };
                        setEditingItem({ ...editingItem, data: newData });
                      }}
                    >
                      <option value="">Selecione...</option>
                      {iniciativas.map(ini => (
                        <option key={ini.name} value={ini.name}>{ini.name}</option>
                      ))}
                    </Select>
                  </FormField>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Tipo de Impacto">
                      <Select>
                        <option value="">Selecione...</option>
                        {impactTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </Select>
                    </FormField>
                    <FormField label="Status">
                      <Select 
                        defaultValue={editingItem.data.status}
                        onChange={(e) => {
                          const newData = { ...editingItem.data, status: e.target.value };
                          setEditingItem({ ...editingItem, data: newData });
                        }}
                      >
                        <option>Em andamento</option>
                        <option>Concluído</option>
                        <option>Pausado</option>
                      </Select>
                    </FormField>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <FormField label="Progresso (%)">
                      <Input 
                        type="number" 
                        defaultValue={editingItem.data.progress} 
                        min="0" 
                        max="100" 
                        onChange={(e) => {
                          const newData = { ...editingItem.data, progress: parseInt(e.target.value) || 0 };
                          setEditingItem({ ...editingItem, data: newData });
                        }}
                      />
                    </FormField>
                  </div>
                  <FormField label="Descrição do Projeto">
                    <TextArea placeholder="Detalhes sobre o que está sendo realizado..." />
                  </FormField>
                </>
              )}

              {editingItem.type === "eventos" && (
                <>
                  <FormField label="Título do Evento">
                    <Input 
                      defaultValue={editingItem.data.title}
                      onChange={(e) => {
                        const newData = { ...editingItem.data, title: e.target.value };
                        setEditingItem({ ...editingItem, data: newData });
                      }}
                    />
                  </FormField>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Data">
                      <Input 
                        type="text" 
                        defaultValue={editingItem.data.date}
                        placeholder="Ex: 15 Abr"
                        onChange={(e) => {
                          const newData = { ...editingItem.data, date: e.target.value };
                          setEditingItem({ ...editingItem, data: newData });
                        }}
                      />
                    </FormField>
                    <FormField label="Horário">
                      <Input type="time" />
                    </FormField>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Tipo">
                      <Select 
                        defaultValue={editingItem.data.type}
                        onChange={(e) => {
                          const newData = { ...editingItem.data, type: e.target.value };
                          setEditingItem({ ...editingItem, data: newData });
                        }}
                      >
                        <option>Presencial</option>
                        <option>Online</option>
                        <option>Híbrido</option>
                      </Select>
                    </FormField>
                    <FormField label="Local / Link">
                      <Input 
                        defaultValue={editingItem.data.location}
                        onChange={(e) => {
                          const newData = { ...editingItem.data, location: e.target.value };
                          setEditingItem({ ...editingItem, data: newData });
                        }}
                      />
                    </FormField>
                  </div>
                  <FormField label="Descrição do Evento">
                    <TextArea placeholder="O que acontecerá neste evento?" />
                  </FormField>
                </>
              )}
            </div>
          </EditModal>
        )}
      </AnimatePresence>

      {/* Config Management Modal */}
      <AnimatePresence>
        {managingConfig && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setManagingConfig(null)} 
              className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="p-10 space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tighter">{managingConfig.label}</h2>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Gerenciar opções disponíveis</p>
                  </div>
                  <button onClick={() => setManagingConfig(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Adicionar novo item..."
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-brand-purple transition-all"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const val = e.currentTarget.value.trim();
                          if (val && !managingConfig.items.includes(val)) {
                            setManagingConfig({ ...managingConfig, items: [...managingConfig.items, val] });
                            e.currentTarget.value = "";
                          }
                        }
                      }}
                    />
                    <p className="text-[10px] text-white/20 mt-2 px-2">Pressione Enter para adicionar</p>
                  </div>

                  <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                    {managingConfig.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-white/10 transition-all">
                        <span className="text-sm font-medium">{item}</span>
                        <button
                          onClick={() => setManagingConfig({ ...managingConfig, items: managingConfig.items.filter((_, i) => i !== idx) })}
                          className="p-2 text-white/20 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => setManagingConfig(null)} 
                    className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={onSaveConfig} 
                    className="flex-1 px-6 py-4 bg-brand-purple rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-purple/80 transition-all shadow-lg shadow-brand-purple/20"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
