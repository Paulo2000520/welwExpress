const nomeVendedor = document.querySelector('.name-vendedor');
const emailVendedor = document.querySelector('.email-vendedor');
const passwordVendedor = document.querySelector('.password-vendedor');

const erroNomeVendedor = document.querySelector('.error-name-vendedor');
const erroEmailVendedor = document.querySelector('.error-email-vendedor');
const erroPasswordVendedor = document.querySelector('.error-password-vendedor');

const submit = document.querySelector('.outline');

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
});
