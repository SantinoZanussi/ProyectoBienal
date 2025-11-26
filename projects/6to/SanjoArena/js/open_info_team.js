document.addEventListener("DOMContentLoaded", function() {
    const enlace = document.querySelector(".linkRed[href='integrante1']");
    const modal = document.getElementById("integrante1");
    const cerrar = modal.querySelector(".cerrar");
    
    /* INTEGRANTE 1 */

    enlace.addEventListener("click", e => {
        e.preventDefault();
        modal.style.display = "block";
    });

    cerrar.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", e => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});