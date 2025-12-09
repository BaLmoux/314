/* Script optimisé : juste la gestion de l'affichage des images */
document.addEventListener("DOMContentLoaded", function() {
  const imgs = document.querySelectorAll('.card img');
  
  imgs.forEach(img => {
      // Si l'image est déjà chargée (grâce au cache), on l'affiche tout de suite
      if (img.complete) {
          img.classList.add('loaded');
      } else {
          // Sinon, on attend qu'elle finisse de charger pour l'afficher
          img.addEventListener('load', () => img.classList.add('loaded'));
      }
  });
});
