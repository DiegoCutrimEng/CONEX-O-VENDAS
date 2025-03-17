// Arrays para armazenar os dados
let produtos = [];
let clientes = [];
let vendas = [];

// Adicionar Produto
function addProduto() {
    let nome = document.getElementById("produtoNome").value;
    let preco = parseFloat(document.getElementById("produtoPreco").value);
    let estoque = parseInt(document.getElementById("produtoEstoque").value);
    
    if (nome && preco && estoque) {
        let id = produtos.length + 1;
        produtos.push({ id, nome, preco, estoque });
        listarProdutos();
    }
}

// Listar Produtos
function listarProdutos() {
    let lista = document.getElementById("listaProdutos");
    lista.innerHTML = produtos.map(p => `ID: ${p.id} - ${p.nome} - R$ ${p.preco} - Estoque: ${p.estoque}`).join("<br>");
}

// Adicionar Cliente
function addCliente() {
    let nome = document.getElementById("clienteNome").value;
    let telefone = document.getElementById("clienteTelefone").value;
    
    if (nome && telefone) {
        let id = clientes.length + 1;
        clientes.push({ id, nome, telefone });
        listarClientes();
    }
}

// Listar Clientes
function listarClientes() {
    let lista = document.getElementById("listaClientes");
    lista.innerHTML = clientes.map(c => `ID: ${c.id} - ${c.nome} - Telefone: ${c.telefone}`).join("<br>");
}

// Realizar Venda
function realizarVenda() {
    let clienteId = parseInt(document.getElementById("vendaClienteId").value);
    let produtoId = parseInt(document.getElementById("vendaProdutoId").value);
    let quantidade = parseInt(document.getElementById("vendaQuantidade").value);

    let cliente = clientes.find(c => c.id === clienteId);
    let produto = produtos.find(p => p.id === produtoId);

    if (!cliente) {
        alert("Cliente não encontrado!");
        return;
    }

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (produto.estoque < quantidade) {
        alert("Estoque insuficiente!");
        return;
    }

    // Atualizar estoque
    produto.estoque -= quantidade;
    
    // Registrar venda
    let vendaId = vendas.length + 1;
    let valorTotal = quantidade * produto.preco;
    vendas.push({ id: vendaId, cliente: cliente.nome, produto: produto.nome, quantidade, total: valorTotal });

    // Atualizar listas
    listarProdutos();
    listarVendas();
}

// Listar Vendas
function listarVendas() {
    let lista = document.getElementById("listaVendas");
    lista.innerHTML = vendas.map(v => `Cliente: ${v.cliente} - Produto: ${v.produto} - Quantidade: ${v.quantidade} - Total: R$ ${v.total}`).join("<br>");
}

// Exibir Estoque Atual
function exibirEstoque() {
    let lista = document.getElementById("relatorios");
    lista.innerHTML = produtos.map(p => `${p.nome} - Estoque: ${p.estoque}`).join("<br>");
}

// Exibir Total de Vendas
function totalVendas() {
    let total = vendas.reduce((soma, v) => soma + v.total, 0);
    let lista = document.getElementById("relatorios");
    lista.innerHTML = `Total de Vendas: R$ ${total.toFixed(2)}`;
}
