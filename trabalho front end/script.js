let postits = [];

function renderPostits() {
    const container = document.getElementById('postitsContainer');
    container.innerHTML = ''; 

    postits.forEach((postit, index) => {
        const postitElement = document.createElement('div');
        postitElement.classList.add('postit');

        // Cria a tag da imagem
        const imgTag = postit.imagem ? `<img src="${postit.imagem}" class="img-fluid mb-2" alt="Imagem do Pet" style="max-width: 100%; border-radius: 8px;">` : '';

        // Define a estrutura do post-it
        postitElement.innerHTML = `
            <h5 class="text-center mb-2">${postit.titulo}</h5>
            ${imgTag}
            <p class="mt-2">${postit.descricao}</p>
            <div class="d-flex justify-content-between mt-2">
                <button class="btn btn-warning btn-sm" onclick="editarPostit(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="excluirPostit(${index})">Excluir</button>
            </div>
        `;

        container.appendChild(postitElement);
    });
}
// Função para adicionar post-it
document.getElementById('postitForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar que a página recarregue ao enviar o formulário

    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const imagem = document.getElementById('imagem').files[0]; // Pega o arquivo de imagem

    if (!imagem) {
        alert("Por favor, selecione uma imagem!");
        return;
    }

    // Criação de URL para visualizar a imagem
    const imagemURL = URL.createObjectURL(imagem);

    // Criar um novo post-it e adicionar ao array
    const novoPostit = {
        titulo: titulo,
        descricao: descricao,
        imagem: imagemURL
    };

    postits.push(novoPostit);

    // Limpar o formulário
    document.getElementById('titulo').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('imagem').value = ''; // Limpar o campo de imagem
    
    // Renderizar novamente os post-its
    renderPostits();
});

// Função para editar um post-it
function editarPostit(index) {
    const postit = postits[index];

    // Preencher o formulário com os dados do post-it
    document.getElementById('titulo').value = postit.titulo;
    document.getElementById('descricao').value = postit.descricao;

    // Remover o post-it para atualização
    postits.splice(index, 1);

    // Atualizar a renderização
    renderPostits();
}

// Função para excluir um post-it
function excluirPostit(index) {
    postits.splice(index, 1); // Remover o post-it do array
    renderPostits(); // Atualizar a renderização
}