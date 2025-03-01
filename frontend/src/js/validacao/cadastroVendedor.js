//secção para atribuir valor as variaveis, por intermédio dos dados proveniente dos input
const nomeVendedor = document.querySelector('.name-vendedor');
const emailVendedor = document.querySelector('.email-vendedor');
const passwordVendedor = document.querySelector('.password-vendedor');
const alvaraComercial = document.querySelector('.alvara-comercial');

//secção para mostrar erros
const erroNomeVendedor = document.querySelector('.error-name-vendedor');
const erroEmailVendedor = document.querySelector('.error-email-vendedor');
const erroPasswordVendedor = document.querySelector('.error-password-vendedor');
const erroAlvaraComercial = document.querySelector('.error-alvara-comercial');

//secção para o botão Enviar
const submit = document.querySelector('.outline');

//secção para as lógicas de negócios (lógica de programação (funções))
export function validarNomeVendedor() {
   if (!nomeVendedor.value) {
      erroNomeVendedor.style.display = 'block';
      erroNomeVendedor.textContent = 'Insira o nome, por favor!';
      return false;
   } else {
      erroNomeVendedor.style.display = 'none';
      return true;
   }
}

function validarAlvaraComercial() {
   if (!alvaraComercial.value) {
      erroAlvaraComercial.style.display = 'block';
      erroAlvaraComercial.textContent = 'Insira o alvará comercial, por favor!';
      return false;
   } else {
      erroAlvaraComercial.style.display = 'none';
      return true;
   }
}

export function validarEmailVendedor() {
   if (!emailVendedor.value) {
      erroEmailVendedor.style.display = 'block';
      erroEmailVendedor.textContent = 'Insira o seu email, por favor!';
      return false;
   } else {
      erroEmailVendedor.style.display = 'none';
      return true;
   }
}

export function validarPasswordVendedor() {
   if (!passwordVendedor.value) {
      erroPasswordVendedor.style.display = 'block';
      erroPasswordVendedor.textContent = 'Insira a palavra-passe, por favor!';
      return false;
   } else {
      erroPasswordVendedor.style.display = 'none';
      return true;
   }
}

submit.addEventListener('click', (e) => {
   e.preventDefault();

   validarNomeVendedor();
   validarEmailVendedor();
   validarPasswordVendedor();
   validarAlvaraComercial();
});
