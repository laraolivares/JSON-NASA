const btnSearch = document.getElementById('btnBuscar');

btnSearch.addEventListener('click', function() {
    const searchBar = document.getElementById('inputBuscar').value; 
    const searchInfo = searchBar.trim().toLowerCase();
    console.log(searchInfo); 
    
    fetch('https://images-api.nasa.gov/search?q=' + searchInfo)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('contenedor');
            container.innerHTML = ''; 

            if (data.collection.items.length > 0) {
                // Filtro de titulos por el valor de la searcbar
                const filteredItems = data.collection.items.filter(item => 
                    item.data.length > 0 && 
                    item.data[0].title.toLowerCase().includes(searchInfo)
                );

                
                if (filteredItems.length > 0) {
                    // Creación de los elementos necesarios por cada item 
                    filteredItems.forEach(item => {
                        const containerDiv = document.createElement('div');
                        containerDiv.className = "card";

                        const itemDiv = document.createElement('div');
                        itemDiv.className = "card-body";

                        const titleItem = document.createElement('h5');
                        titleItem.textContent = item.data[0].title; 
                        titleItem.className = "card-title";

                        const titleDiv = document.createElement('div');
                        titleDiv.className = "titleDiv";
                        titleDiv.appendChild(titleItem);

                        const imgItem = document.createElement('img');
                        imgItem.src = item.links[0].href;
                        imgItem.className = "card-img-top";
                        imgItem.alt = titleItem.textContent; 

                        const descriptionItem = document.createElement('div'); 
                        descriptionItem.textContent = item.data[0].description 
                        descriptionItem.className = "card-text"; 

                        const dateItem = document.createElement('p');
                        dateItem.textContent = item.data[0].date_created;
                        dateItem.className = "date";

                        itemDiv.appendChild(imgItem);
                        itemDiv.appendChild(titleDiv);
                        itemDiv.appendChild(descriptionItem);
                        itemDiv.appendChild(dateItem);
                        containerDiv.appendChild(itemDiv);
                        container.appendChild(containerDiv); 
                    });
                } else {
                    const noResults = document.createElement('div');
                    noResults.textContent = 'No se encontraron resultados';
                    container.appendChild(noResults); // Mensaje si no hay resulatios
                }
            } else {
                const noResults = document.createElement('div');
                noResults.textContent = 'No se encontraron resultados';
                container.appendChild(noResults); 
            }
        })
        .catch(error => console.error('Fetch error:', error)); // Catch errors
});
