let chamados = [];

/* =========================
   CRIAR
========================= */
function criarChamado() {
  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const prioridade = document.getElementById("prioridade").value;

  if (!titulo) {
    alert("Digite um título");
    return;
  }

  const chamado = {
    id: Date.now(),
    titulo,
    descricao,
    prioridade,
    status: "Aberto"
  };

  chamados.push(chamado);

  salvarLocalStorage();
  renderizar();

  // limpar campos
  document.getElementById("titulo").value = "";
  document.getElementById("descricao").value = "";
}

/* =========================
   RENDERIZAR
========================= */
function renderizar() {
  const tabela = document.getElementById("tabela");
  const filtro = document.getElementById("filtro").value;
  const busca = document.getElementById("busca").value.toLowerCase();

  tabela.innerHTML = "";

  let lista = chamados;

  if (filtro !== "todos") {
    lista = lista.filter(c => c.status === filtro);
  }

  lista = lista.filter(c =>
    c.titulo.toLowerCase().includes(busca)
  );

  lista.forEach(c => {
    tabela.innerHTML += `
      <tr>
        <td>${c.id}</td>
        <td>${c.titulo}</td>
        <td>${c.prioridade}</td>
        <td class="${c.status === 'Aberto' ? 'status-aberto' : 'status-resolvido'}">
          ${c.status}
        </td>
        <td>
          <button onclick="mudarStatus(${c.id})">✔</button>
          <button class="excluir" onclick="deletar(${c.id})">✖</button>
        </td>
      </tr>
    `;
  });

  atualizarResumo();
}

/* =========================
   STATUS
========================= */
function mudarStatus(id) {
  const chamado = chamados.find(c => c.id === id);

  if (chamado.status === "Aberto") {
    chamado.status = "Resolvido";
  } else {
    chamado.status = "Aberto";
  }

  salvarLocalStorage();
  renderizar();
}

/* =========================
   DELETAR
========================= */
function deletar(id) {
  if (!confirm("Deseja excluir este chamado?")) return;

  chamados = chamados.filter(c => c.id !== id);

  salvarLocalStorage();
  renderizar();
}

/* =========================
   RESUMO
========================= */
function atualizarResumo() {
  document.getElementById("abertos").innerText =
    chamados.filter(c => c.status === "Aberto").length;

  document.getElementById("resolvidos").innerText =
    chamados.filter(c => c.status === "Resolvido").length;

  document.getElementById("total").innerText = chamados.length;
}

/* =========================
   LOCAL STORAGE
========================= */
function salvarLocalStorage() {
  localStorage.setItem("chamados", JSON.stringify(chamados));
}

function carregarLocalStorage() {
  const dados = localStorage.getItem("chamados");
  if (dados) chamados = JSON.parse(dados);
}

/* =========================
   INICIAR APP
========================= */

carregarLocalStorage();
renderizar();
