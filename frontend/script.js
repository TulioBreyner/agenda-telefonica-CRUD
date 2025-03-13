document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "http://localhost:3000/contatos";
    const tabelaContatos = document.getElementById("contatos");
    const btnAddContato = document.getElementById("addContato");

    async function listarContatos() {
        try {
            const response = await fetch(API_URL);
            const contatos = await response.json();

            tabelaContatos.innerHTML = "";
            for (const chave in contatos) {
                const contato = contatos[chave];
                console.log(contato);
                addContatoNaTabela(contato);
            }
        } catch (error) {
            console.log("Erro ao carregar contatos:", error);
        }
    }
    
    function addContatoNaTabela(contato) {
        const linha = document.createElement("tr");
        console.log("Nome:", contato.Nome, "Telefone:", contato.Telefone, "Email:", contato.Email);

        linha.innerHTML = `
            <td>${contato.Nome}</td>
            <td>${contato.Telefone}</td>
            <td>${contato.Email}</td>
            <td class="actions">
                <button class="btnEditar" data-id="${contato.id}">EDITAR</button>
                <button class="btnDeletar" data-id="${contato.id}">APAGAR</button>
            </td>
        `;

        linha.querySelector(".btnEditar").addEventListener("click", () => editarContato(contato));

        linha.querySelector(".btnDeletar").addEventListener("click", () => deletarContato(contato.id, linha));

        tabelaContatos.appendChild(linha);
    }

    async function criarContato() {
        const nome = prompt("Nome:");
        const telefone = prompt("Telefone:");
        const email = prompt("Email:");

        if (!nome || !telefone || !email) return;

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, telefone, email })
            });

            if (response.ok) {
                alert("Contato adicionado com sucesso!");
                listarContatos();
            }
        } catch (error) {
            console.log("Erro ao criar contato:", error);
        }
    }

    async function editarContato(contato) {
        const nome = prompt("Novo Nome:", contato.Nome);
        const telefone = prompt("Novo Telefone:", contato.Telefone);
        const email = prompt("Novo Email:", contato.Email);

        if (!nome || !telefone || !email) return;

        try {
            const response = await fetch(`${API_URL}/${contato.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, telefone, email })
            });

            if (response.ok) {
                alert("Contato atualizado com sucesso!");
                listarContatos();
            }
        } catch (error) {
            console.log("Erro ao editar contato:", error);
        }
    }

    async function deletarContato(id, linha) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

            if (response.ok) {
                linha.remove();
                alert("Contato deletado com sucesso!");
            }
        } catch (error) {
            console.log("Erro ao apagar contato:", error);
        }
    }

    btnAddContato.addEventListener("click", criarContato);
    
    listarContatos();
});
