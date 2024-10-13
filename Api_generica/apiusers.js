// Definimosla ruta donde consultaremos los recursos
const API_URL = 'https://jsonplaceholder.typicode.com/'
//obtenemos el elemento DOM html donde arrojaremos la info
const HTMLResponse = document.querySelector('#app');
//creamos el elementodonde arrojaremos la info
const ul = document.createElement('ul');

fetch(`${API_URL}/users`)
      .then(response => response.json())
      .then((users) =>{
        users.forEach((users) => {
            //creamos el elemento li para almacenar cada usuario en el ul
            let elem = document.createElement ("li") 
            elem.appendChild(
                document.createTextNode (`${users.name} , ${users.email} , ${users.phone} , ${users.company.catchPhrase} ${users.company.website}`)
            );
            //agregamos el elemento li y dentro del ul
            ul.appendChild(elem);
        });
            //al final, agregamos el ul dentro del div obtenido
            HTMLResponse.appendChild(ul);
        });