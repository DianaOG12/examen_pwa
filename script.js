document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
  
    fetch('https://jsonplaceholder.typicode.com/photos')//photos?_limit=16; es paracreamos un limite de fotos 
      .then(response => response.json())
      .then(data => {
        data.forEach(photo => {
          
          const anchor = document.createElement('a');//crea el elemento
          anchor.href = photo.url; 
          anchor.target = '_blank'; // Nos ayuda a abrir la imagen en otra pantalla 
          const img = document.createElement('img');
          img.src = photo.thumbnailUrl;
          img.alt = photo.title;
          img.loading = 'lazy'; 
          const title = document.createElement('p');
          title.textContent = photo.title;
  
          // se agrgea el titulo y la imagen al enlce
          anchor.appendChild(img);
          anchor.appendChild(title);
          gallery.appendChild(anchor);
        });
      })
      .catch(error => console.error('Error al cargar las imágenes:', error));
  });

