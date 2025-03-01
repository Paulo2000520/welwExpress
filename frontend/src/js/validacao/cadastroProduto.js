//secção para atribuir valor as variaveis, por intermédio dos dados proveniente dos input
const nomeProduto = document.querySelector('.nome-produto');
const precoProduto = document.querySelector('.preco-produto');
const qtyProduto = document.querySelector('.qty-produto');
const descricaoProduto = document.querySelector('.descricao-produto');
const categoriaProduto = document.querySelector('.categoria-produto');
const addImageProduro = document.querySelector('.add-image-produto');
const corProduto = document.querySelector('.cor-produto');


//secção para mostrar erros
const erroProduto = document.querySelector('.error-nome-produto');
const erroPreco = document.querySelector('.error-preco-produto');
const erroQty = document.querySelector('.error-qty-produto');
const erroDescricao = document.querySelector('.error-descricao-produto');
const erroCategoria = document.querySelector('.error-categoria-produto');
const erroAddImage = document.querySelector('.error-add-image-produto');
const erroCor = document.querySelector('.error-cor-produto');

//secção para o botão cadastrar (cadastramento de produto)
const submit = document.querySelector('.outline');


//secção para as lógicas de negócios (lógica de programação (funções))
function validarNomeProduto() {
    if (!nomeProduto.value) {
        erroProduto.style.display = 'block';
        erroProduto.textContent = 'Insira o nome do produto, por favor!';
        return false;
    } else {
        erroProduto.style.display = 'none';
        return true;
    }
}


function validarPrecoProduto() {
    if (!precoProduto.value) {
        erroPreco.style.display = 'block';
        erroPreco.textContent = 'Insira o preço do produto, por favor!.';
        return false;
    } else {
        erroPreco.style.display = 'none';
        return true;
    }
}


function validarCategoriaProduto() {
    if (!categoriaProduto.value) {
        erroCategoria.style.display = 'block';
        erroCategoria.textContent = 'Insira a categória do produto, por favor!.';
        return false;
    } else {
        erroCategoria.style.display = 'none';
        return true;
    }
}


function validarQuantidadeProduto() {
    if (!qtyProduto.value) {
        erroQty.style.display = 'block';
        erroQty.textContent = 'Insira a quantidade do produto, por favor!.';
        return false;
    } else {
        erroQty.style.display = 'none';
        return true;
    }
}


function validarImageProduto() {
    if (!addImageProduro.value) {
        erroAddImage.style.display = 'block';
        erroAddImage.textContent = 'Insira a imagem do produto, por favor!';
        return false;
    } else {
        erroAddImage.style.display = 'none';
        return true;
    }
}


function validadrCorProduto() {
    if (!corProduto.value) {
        erroCor.style.display = 'block';
        erroCor.textContent = ' Insira a cor do produto, por favor';
        return false;
    } else {
        erroCor.style.display = 'none';
        return true;
    }
}


function validarDescricaoProduto() {
    if (!descricaoProduto.value) {
        erroDescricao.style.display = 'block';
        erroDescricao.textContent = 'Insira a descrição do produto, por favor!.';
        return false;
    } else {
        erroDescricao.style.display = 'none';
        return true;
    }
}


submit.addEventListener('click', (e) => {
    e.preventDefault();

    validarNomeProduto();
    validarPrecoProduto();
    validarQuantidadeProduto();
    validarDescricaoProduto();
    validarCategoriaProduto();
    validarImageProduto();
    validadrCorProduto();
});