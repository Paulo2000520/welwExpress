import { validarEmailVendedor } from './cadastroVendedor.js';

const nomeLoja = document.querySelector('.nome-loja');
const erroLoja = document.querySelector('.error-loja');
const submit = document.querySelector('.outline');

function validarNomeLoja() {
   if (!nomeLoja.value) {
      erroLoja.style.display = 'block';
      erroLoja.innerHTML = 'Insira o nome da Loja!';
      return false;
   } else {
      erroLoja.style.display = 'none';
      return true;
   }
}

submit.addEventListener('click', (e) => {
   e.preventDefault();

   validarNomeLoja();
   validarEmailVendedor();
   validarPassword();
});
