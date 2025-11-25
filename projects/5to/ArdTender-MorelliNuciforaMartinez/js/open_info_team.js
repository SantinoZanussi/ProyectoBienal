document.addEventListener("DOMContentLoaded", function() {
    const enlace = document.querySelector(".linkRed[href='integrante1']");
    const modal = document.getElementById("integrante1");
    const cerrar = modal.querySelector(".cerrar");
    
    const enlace2 = document.querySelector(".linkRed[href='integrante2']");
    const modal2 = document.getElementById("integrante2");
    const cerrar2 = modal2.querySelector(".cerrar");

    const enlace3 = document.querySelector(".linkRed[href='integrante3']");
    const modal3 = document.getElementById("integrante3");
    const cerrar3 = modal3.querySelector(".cerrar");

    /* INTEGRANTE 1 */

    enlace.addEventListener("click", e => {
        e.preventDefault();
        modal.style.display = "block";
    });

    cerrar.addEventListener("click", () => {
        modal.style.display = "none";
    });
    
    /* INTEGRANTE 2 */
    
    enlace2.addEventListener("click", e => {
        e.preventDefault();
        modal2.style.display = "block";
    });

    cerrar2.addEventListener("click", () => {
        modal2.style.display = "none";
    });

    /* INTEGRANTE 3 */

    enlace3.addEventListener("click", e => {
        e.preventDefault();
        modal3.style.display = "block";
    });

    cerrar3.addEventListener("click", () => {
        modal3.style.display = "none";
    });

    window.addEventListener("click", e => {
    if (e.target === modal) {
        modal.style.display = "none";
    } else if (e.target === modal2) {
        modal2.style.display = "none";
    } else if (e.target === modal3) {
        modal3.style.display = "none";
    }
    });
});