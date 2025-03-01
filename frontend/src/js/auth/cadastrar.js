import '../validacao/cadastroVendedor.js';

const url = 'http://localhost:3000/api/v1/welwExpress/registro-vendedor';

document.querySelector('.submit').addEventListener('click', async (e) => {
   e.preventDefault();

   const formData = new FormData();

   formData.append('name', document.getElementById('name').value);
   formData.append('email', document.getElementById('email').value);
   formData.append('password', document.getElementById('password').value);
   formData.append('alvara', document.getElementById('alvara').files[0]);

   try {
      const response = await fetch(url, {
         method: 'POST',
         body: formData,
      });

      if (response.ok) {
         alert('Cadastro feito com secesso!');
      }
   } catch (error) {
      console.log(error);
   }
});
