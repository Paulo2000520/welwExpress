import { validarEmail, validarPassword } from '../validacao/login.js';

const url = 'http://localhost:3000/api/v1/welwExpress/login';

document.querySelector('.submit').addEventListener('click', async (e) => {
   e.preventDefault();

   if (!validarEmail() || !validarPassword()) {
      return;
   } else {
      const email = document.querySelector('.email').value;
      const password = document.querySelector('.password').value;

      try {
         const response = await fetch(url, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
         });

         if (!response.ok) {
            const data = await response.json();

            alert(data || 'Erro ao fazer login.');
         } else {
            const data = await response.json();

            localStorage.setItem('token', data.token);

            alert('Login feito com sucesso.');
         }
      } catch (error) {
         console.log(error);
      }
   }
});
