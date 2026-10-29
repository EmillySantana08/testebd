const URL = "https://xgmrdqpqngvbzumghloo.supabase.co";

const KEY = "sb_publishable_ty4jnDSxGc6WaqxgsFUQuQ_-Vk-SV5d";


// SALVAR PRODUTO

async function salvar() {

    const nome = document.getElementById("nome").value;
    const preco = document.getElementById("preco").value;
    const descricao = document.getElementById("descricao").value;

    if (nome === "") {
        alert("Digite o nome do produto!");
        return;
    }

    if (preco === "") {
        alert("Digite o preço do produto!");
        return;
    }

    const resposta = await fetch(
        URL + "/rest/v1/produtos",
        {
            method: "POST",

            headers: {
                "apikey": KEY,
                "Authorization": "Bearer " + KEY,
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nome: nome,
                preco: Number(preco),
                descricao: descricao
            })
        }
    );

    if (resposta.ok) {

        document.getElementById("mensagem").innerText =
            "Produto salvo!";

        document.getElementById("nome").value = "";
        document.getElementById("preco").value = "";
        document.getElementById("descricao").value = "";

        listarProdutos();

    } else {

        document.getElementById("mensagem").innerText =
            "Erro ao salvar.";

    }
}


// LISTAR PRODUTOS
async function listarProdutos() {

    const resposta = await fetch(
        URL + "/rest/v1/produtos?select=*",
        {
            method: "GET",

            headers: {
                "apikey": KEY,
                "Authorization": "Bearer " + KEY
            }
        }
    );

    const produtos = await resposta.json();

    const lista = document.getElementById("lista");

    lista.innerHTML = "";

    produtos.forEach(produto => {

        const item = document.createElement("li");

        item.innerText =
            produto.id + " - " + produto.nome + " " + produto.preco + " " + produto.descricao;

        lista.appendChild(item);

    });
}


// CARREGAR PRODUTOS AO ABRIR A PÁGINA
listarProdutos();
