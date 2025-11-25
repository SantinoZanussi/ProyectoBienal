document.addEventListener('DOMContentLoaded', () => {
  const contenedorFinalizados = document.querySelector('#finish');
  const contenedorEnProceso = document.querySelector('#in-progress');
  const seccionEnProceso = document.querySelector('#proyectos-en-proceso');
  const botones = document.querySelectorAll('.filter-btn');

  let proyectos = [];

  fetch('../data/projects.json')
    .then(response => response.json())
    .then(data => {
      proyectos = data;
      mostrarProyectos(5); // Por defecto: 5to año
      mostrarProyectosEnProceso(5);
    });

    function mostrarProyectos(anio) {
      contenedorFinalizados.innerHTML = '';
    
      const filtrados = proyectos.filter(p => p.anio === anio && p.finalizado);
    
      filtrados.forEach(proyecto => {
        const card = document.createElement('div');
        card.classList.add('project-card');
    
        card.innerHTML = `
          <a href="${proyecto.link}" class="image-wrapper">
            <img src="${proyecto.imagen}" alt="${proyecto.titulo}">
            <i class="fa-solid fa-right-to-bracket overlay-icon" style="color: rgba(255, 0, 0, 0.8);"></i>
          </a>
          <h3><strong>${proyecto.titulo}</strong></h3>
        `;
    
        contenedorFinalizados.appendChild(card);
      });
    }

    function mostrarProyectosEnProceso(anio) {
      contenedorEnProceso.innerHTML = '';
    
      const filtrados = proyectos.filter(p => p.anio === anio && !p.finalizado);

      if (filtrados.length === 0) {
        seccionEnProceso.style.display = 'none';
        return;
      }

      seccionEnProceso.style.display = 'block';
    
      filtrados.forEach(proyecto => {
        const card = document.createElement('div');
        card.classList.add('project-card');
        
        if (proyecto.link.length === 0) {
          card.innerHTML = `
            <a class="image-wrapper">
              <img src="${proyecto.imagen}" alt="${proyecto.titulo}">
              <i class="fa-solid fa-person-digging overlay-icon" style="color: rgba(255, 0, 0, 0.8);"></i>
            </a>
            <h3><strong>${proyecto.titulo}</strong></h3>
          `;
        } else {
          card.innerHTML = `
          <a href="${proyecto.link}" class="image-wrapper">
            <img src="${proyecto.imagen}" alt="${proyecto.titulo}">
            <i class="fa-solid fa-right-to-bracket overlay-icon" style="color: rgba(255, 0, 0, 0.8);"></i>
          </a>
          <h3><strong>${proyecto.titulo}</strong></h3>
        `;
        }
    
        contenedorEnProceso.appendChild(card);
      });
    }

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      botones.forEach(b => b.classList.remove('active'));
      boton.classList.add('active');
      const anio = parseInt(boton.dataset.anio);
      mostrarProyectos(anio);
      mostrarProyectosEnProceso(anio);
    });
  });
});