const submit = document.querySelector('.outline');

function validarEmail() {
   const email = document.querySelector('.email').value;
   const emailError = document.querySelector('.error-email');

   if (!email) {
      emailError.style.display = 'block';
      emailError.innerHTML = 'Insira o teu email, por favor!';
      return false;
   } else {
      emailError.style.display = 'none';
      return true;
   }
}

function validarPassword() {
   const password = document.querySelector('.password').value;
   const passwordError = document.querySelector('.error-password');

   if (!password) {
      passwordError.style.display = 'block';
      passwordError.innerHTML = 'Insira a tua palavra-passe, por favor!';
      return false;
   } else {
      passwordError.style.display = 'none';
      return true;
   }
}

submit.addEventListener('click', () => {
   validarEmail();
   validarPassword();
});
