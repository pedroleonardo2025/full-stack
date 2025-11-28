import { useEffect, useState } from "react";
import ConsultaService from "../../services/ConsultaService";
import FormConsulta from "./FormConsulta";
import TabelaConsultas from "./TabelaConsultas";
import ModalConfirmacao from "./ModalConfirmacao";

export default function GerenciarConsultas() {
  const [consultas, setConsultas] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [editando, setEditando] = useState(null);
  const [excluir, setExcluir] = useState(null);

  // Carregar consultas ao montar o componente
  useEffect(() => {
    const carregarConsultas = async () => {
      try {
        const data = await ConsultaService.getAll();
        setConsultas(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erro ao carregar consultas:", err);
        setConsultas([]);
      }
    };
    carregarConsultas();
  }, []);

  // Salvar ou atualizar consulta
  const salvar = async (consulta) => {
    try {
      if (editando) {
        await ConsultaService.update(editando.id, consulta);
      } else {
        await ConsultaService.save(consulta);
      }
      const data = await ConsultaService.getAll();
      setConsultas(data);
      setEditando(null);
    } catch (err) {
      console.error("Erro ao salvar consulta:", err);
    }
  };

  // Filtro de texto
  const filtrar = (texto) => {
    setFiltro(texto.toLowerCase());
  };

  // Aplicar filtro
  const consultasFiltradas = Array.isArray(consultas)
    ? consultas.filter((c) => {
        const nome = c.nome?.toLowerCase() || "";
        const medico = c.medico?.toLowerCase() || "";
        return nome.includes(filtro) || medico.includes(filtro);
      })
    : [];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100vw", padding: "1rem", background: "#f8f9fa", gap: "1rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Gerenciamento de Consultas</h2>

      <div style={{ display: "flex", flexDirection: "row", flex: 1, gap: "1rem" }}>
        {/* Formulário */}
        <div style={{ flex: "0 0 35%", background: "white", borderRadius: "0.5rem", padding: "1rem", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
          <FormConsulta onSalvar={salvar} consultaEdit={editando} />
        </div>

        {/* Tabela */}
        <div style={{ flex: "1", background: "white", borderRadius: "0.5rem", padding: "1rem", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
          <TabelaConsultas
            consultas={consultasFiltradas}
            onEditar={(c) => setEditando(c)}
            onExcluir={(c) => setExcluir(c)}
            onFiltrar={filtrar}
          />
        </div>
      </div>

      {/* Modal de confirmação */}
      <ModalConfirmacao
        show={!!excluir}
        onHide={() => setExcluir(null)}
        onConfirm={async () => {
          try {
            await ConsultaService.remove(excluir.id);
            const data = await ConsultaService.getAll();
            setConsultas(data);
            setExcluir(null);
          } catch (err) {
            console.error("Erro ao excluir consulta:", err);
          }
        }}
      />
    </div>
  );
}
