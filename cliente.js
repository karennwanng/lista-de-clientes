const URL_BASE = "https://crudcrud.com/api/155a40c08b6843eaa23fb516d5bec264/clientes";

const form = document.getElementById("form-cadastro");
const inputNome = document.getElementById("input-nome");
const inputEmail = document.getElementById("input-email");
const inputData = document.getElementById("input-data");
const listaClientes = document.getElementById("lista-clientes");
const feedback = document.getElementById("feedback");

async function buscarClientes(){
    const resposta = await fetch(URL_BASE);
    const clientes = await resposta.json();
    return clientes;
    
}

function renderizarLista(clientes){
    listaClientes.innerHTML = "";

    clientes.forEach(function(cliente) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${cliente.nome}</td>
        <td>${cliente.email}</td>
        <td>${cliente.data}</td>
        <td>
            <button class="btn-excluir" data-id="${cliente._id}">🗑️</button>
        </td>
        `;
        listaClientes.appendChild(tr);
        const btnExcluir = tr.querySelector(".btn-excluir");
        btnExcluir.addEventListener("click", function(){
            const id = btnExcluir.dataset.id;
            excluirCliente(id);
        });
    })
}

    async function cadastrarCliente(event){
        const nome = inputNome.value;
        const email = inputEmail.value;
        const data = inputData.value;
        try {
            const resposta = await fetch(URL_BASE,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({nome, email, data})
            })
            const clientes = await buscarClientes();
            renderizarLista(clientes);
            form.reset()
            feedback.innerHTML = "Cliente cadastrao com sucesso!";
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
        } 
}

    async function excluirCliente(id){
        try {
            await fetch(`${URL_BASE}/${id}`,{
                method: "DELETE"
            })
            const clientes = await buscarClientes();
            renderizarLista(clientes);
            feedback.innerHTML = "Cliente excluido com sucesso!"
        } catch (error) {
            console.error("Erro ao excluir cliente:", error)
        }
    }

    form.addEventListener("submit", function(event){
        event.preventDefault()
        cadastrarCliente()
    })

    buscarClientes().then(function(clientes){
        renderizarLista(clientes)
    })
