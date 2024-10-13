<div id="app"></div>


    // Definimos la ruta donde consultaremos los recursos
    const API_URL = 'https://jsonplaceholder.typicode.com/';
    // Obtenemos el elemento DOM html donde arrojaremos la info
    const HTMLResponse = document.querySelector('#app');
    
    // Creamos la tabla y añadimos encabezados
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    
    const headers = ['Nombre', 'Email', 'Teléfono', 'Catch Phrase', 'Website'];
    
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    
    table.appendChild(headerRow);

    // Realizamos la consulta a la API
    fetch(`${API_URL}/users`)
        .then(response => response.json())
        .then((users) => {
            users.forEach((user) => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.company.catchPhrase}</td>
                    <td>${user.website}</td>
                `;
                
                table.appendChild(row);
            });
            
            // Al final, agregamos la tabla dentro del div obtenido
            HTMLResponse.appendChild(table);
        });

