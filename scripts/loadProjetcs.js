document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.querySelector('.projects-container');
  const botones = document.querySelectorAll('.filter-btn');

  let proyectos = [];

  fetch('../data/proyectos.json')
    .then(response => response.json())
    .then(data => {
      proyectos = data;
      mostrarProyectos(3); // Por defecto: 3er año
    });

    function mostrarProyectos(anio) {
      contenedor.innerHTML = '';
    
      const filtrados = proyectos.filter(p => p.anio === anio);
    
      filtrados.forEach(proyecto => {
        const card = document.createElement('div');
        card.classList.add('project-card');
    
        card.innerHTML = `
          <a href="${proyecto.link}" class="image-wrapper">
            <img src="${proyecto.imagen}" alt="${proyecto.titulo}">
            <i class="fa-solid fa-right-to-bracket overlay-icon"></i>
          </a>
          <h3><strong>${proyecto.titulo}</strong></h3>
        `;
    
        contenedor.appendChild(card);
      });
    }

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      botones.forEach(b => b.classList.remove('active'));
      boton.classList.add('active');
      const anio = parseInt(boton.dataset.anio);
      mostrarProyectos(anio);
    });
  });
});