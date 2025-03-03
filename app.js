const listaAmigos = [];

function adicionarAmigo() {
    const input = document.getElementById("amigo");
    const nome = input.value.trim();

    if (nome === "") {
        alert("Por favor, insira um nome válido.");
        return;
    }

    if (listaAmigos.includes(nome)) {
        alert("Esse nome já foi adicionado.");
        return;
    }

    listaAmigos.push(nome);
    atualizarLista();
    input.value = "";
    input.focus();
}

function atualizarLista() {
    const ul = document.getElementById("listaAmigos");
    ul.innerHTML = "";

    listaAmigos.forEach(nome => {
        const li = document.createElement("li");
        li.textContent = nome;
        ul.appendChild(li);
    });
}

function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert("É necessário pelo menos dois nomes para realizar o sorteio.");
        return;
    }

    let sorteio = [...listaAmigos]; // Copia a lista original
    let embaralhado = [];

    while (sorteio.length > 0) {
        const indice = Math.floor(Math.random() * sorteio.length);
        embaralhado.push(sorteio.splice(indice, 1)[0]);
    }

    // Garante que ninguém tire a si mesmo
    for (let i = 0; i < listaAmigos.length; i++) {
        if (listaAmigos[i] === embaralhado[i]) {
            return sortearAmigo(); // Refaz o sorteio caso alguém tire a si mesmo
        }
    }

    // Exibir resultado
    const resultadoUl = document.getElementById("resultado");
    resultadoUl.innerHTML = "";

    for (let i = 0; i < listaAmigos.length; i++) {
        const li = document.createElement("li");
        li.textContent = `${listaAmigos[i]} -> ${embaralhado[i]}`;
        resultadoUl.appendChild(li);
    }
}

function sortearUmAmigo() {
    if (listaAmigos.length === 0) {
        alert("Adicione pelo menos um participante para sortear.");
        return;
    }

    // Sorteia um índice aleatório da lista
    const indiceSorteado = Math.floor(Math.random() * listaAmigos.length);
    const amigoSorteado = listaAmigos[indiceSorteado];

    // Exibe o resultado
    const resultadoUl = document.getElementById("resultado");
    resultadoUl.innerHTML = ""; // Limpa resultados anteriores

    const li = document.createElement("li");
    li.textContent = `Amigo sorteado: ${amigoSorteado}`;
    resultadoUl.appendChild(li);
}

function reiniciarSorteio() {
    // Limpa a lista de resultados
    const resultadoUl = document.getElementById("resultado");
    resultadoUl.innerHTML = "";

    // Limpa a lista de participantes
    listaAmigos.length = 0; // Remove todos os itens da lista

    // Atualiza a exibição da lista de participantes
    atualizarLista();
}