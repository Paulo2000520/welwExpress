import {
   validarNomeVendedor,
   validarEmailVendedor,
   validarPasswordVendedor,
} from '../validacao/cadastrarUsuario.js';

const url = 'http://localhost:3000/api/v1/welwExpress/registro';

document.querySelector('.submit').addEventListener('click', async (e) => {
   e.preventDefault();

   if (
      !validarNomeVendedor() ||
      !validarEmailVendedor() ||
      !validarPasswordVendedor()
   ) {
      return;
   } else {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
         const response = await fetch(url, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
         });

         const data = await response.json();

         localStorage.setItem('token', data.token);

         alert(`${data}` || 'Usário cadastrado com sucesso.');
      } catch (error) {
         console.log(error);
         localStorage.removeItem('token');
      }
   }
});
