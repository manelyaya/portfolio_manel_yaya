// Attendre que le DOM soit complètement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', () => {
  console.log("Cursor script loaded"); // Log pour vérifier que le script est chargé

  // Sélection de l'élément HTML avec la classe 'circle'
  const circleElement = document.querySelector('.circle');
  
  // Si aucun élément .circle n'est trouvé, afficher un avertissement et arrêter le script
  if (!circleElement) {
    console.warn("⚠️ No .circle element found on this page!");
    return;
  }

  // Objets pour stocker la position actuelle et précédente de la souris
  const mouse = { x: 0, y: 0 };          // position de la souris actuelle
  const previousMouse = { x: 0, y: 0 };  // position précédente de la souris

  // Position actuelle du cercle animé
  const circle = { x: 0, y: 0 };

  // Variables pour l'animation
  let currentScale = 0;  // échelle actuelle du cercle (effet de stretch)
  let currentAngle = 0;  // angle actuel du cercle (rotation)
  const speed = 0.17;    // vitesse d'interpolation pour le suivi de la souris

  // Événement pour suivre les mouvements de la souris
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX; // coordonnée X de la souris
    mouse.y = e.clientY; // coordonnée Y de la souris
  });

  // Fonction principale d'animation appelée à chaque frame
  const tick = () => {
    // Interpolation pour faire suivre le cercle à la souris de façon fluide
    circle.x += (mouse.x - circle.x) * speed;
    circle.y += (mouse.y - circle.y) * speed;

    // Translation CSS pour déplacer le cercle
    const translate = `translate(${circle.x}px, ${circle.y}px)`;

    // Calcul de la différence de mouvement depuis la dernière frame
    const deltaX = mouse.x - previousMouse.x;
    const deltaY = mouse.y - previousMouse.y;

    // Mettre à jour les positions précédentes
    previousMouse.x = mouse.x;
    previousMouse.y = mouse.y;

    // Calcul de la "vitesse" du mouvement de la souris
    const velocity = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2) * 4, 150);

    // Déterminer l'échelle du cercle en fonction de la vitesse
    const scaleValue = (velocity / 150) * 0.5;

    // Lissage de l'échelle pour une transition plus naturelle
    currentScale += (scaleValue - currentScale) * speed;

    // Création de la transformation d'échelle (stretch horizontal et vertical)
    const scale = `scale(${1 + currentScale}, ${1 - currentScale})`;

    // Calcul de l'angle de rotation en degrés
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;

    // Appliquer la rotation seulement si la vitesse est supérieure à un seuil
    if (velocity > 20) currentAngle = angle;

    // Création de la transformation de rotation CSS
    const rotate = `rotate(${currentAngle}deg)`;

    // Appliquer toutes les transformations CSS au cercle
    circleElement.style.transform = `${translate} ${rotate} ${scale}`;

    // Appel récursif à la prochaine frame pour créer l'animation continue
    requestAnimationFrame(tick);
  };

  // Démarrer l'animation
  tick();
});
