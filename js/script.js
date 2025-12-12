// script.js optimisé
// Nous avons supprimé les boucles while (blocage artificiel) et le tableau inutile (gaspillage mémoire).

(function(){
  // On utilise 'DOMContentLoaded' qui est plus rapide que 'load' pour l'interactivité
  document.addEventListener('DOMContentLoaded', function(){
    const imgs = document.querySelectorAll('.card img');

    // On utilise l'IntersectionObserver pour un effet d'apparition fluide (optionnel mais performant)
    // Ou simplement, on ajoute la classe immédiatement car le CSS gère la transition.
    imgs.forEach(img => {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', () => img.classList.add('loaded'));
      }
    });

    console.log("Script interactif chargé sans blocage !");
  });
})();
