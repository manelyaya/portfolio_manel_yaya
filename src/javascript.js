// ===============================
// 🌸 ANIMATION GSAP AU SCROLL
// ===============================

// Fonction qui anime les éléments lorsqu’ils apparaissent à l’écran
function animateFrom(elem, direction = 1) {
  let x = 0;
  let y = direction * 100;

  // Si l’élément vient de la gauche
  if (elem.classList.contains("gs_reveal_fromLeft")) {
    x = -100;
    y = 0;
  } 
  // Si l’élément vient de la droite
  else if (elem.classList.contains("gs_reveal_fromRight")) {
    x = 100;
    y = 0;
  }

  // Position de départ (hors écran)
  elem.style.transform = `translate(${x}px, ${y}px)`;
  elem.style.opacity = "0";

  // Animation vers la position normale
  gsap.fromTo(
    elem,
    { x: x, y: y, autoAlpha: 0 },
    {
      duration: 1.25,
      x: 0,
      y: 0,
      autoAlpha: 1,
      ease: "expo",
      overwrite: "auto",
    }
  );
}

// Fonction pour cacher un élément (alpha = 0)
function hide(elem) {
  gsap.set(elem, { autoAlpha: 0 });
}

// Quand la page est complètement chargée
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // Sélection de tous les éléments à révéler
  gsap.utils.toArray(".gs_reveal").forEach(function (elem) {
    hide(elem); // cacher avant de scroller dessus

    ScrollTrigger.create({
      trigger: elem,
      onEnter: function () {
        animateFrom(elem);
      },
      onEnterBack: function () {
        animateFrom(elem, -1);
      },
      onLeave: function () {
        hide(elem);
      },
    });
  });
});

// ===============================
// ✨ ANIMATION DE TEXTE (SplitText)
// ===============================

// Découpe le texte en caractères individuels
const fancyPantsSplit = new SplitText(".fancyPants", { type: "chars, lines" });

// Crée une timeline GSAP pour animer les lettres
const fancyPantsAni = gsap.timeline()
  // Animation d’apparition (les lettres montent)
  .from(fancyPantsSplit.chars, {
    duration: 1,
    yPercent: 105,
    stagger: { each: 0.05, from: "start" },
  })
  // Animation de sortie (les lettres redescendent)
  .to(fancyPantsSplit.chars, {
    duration: 1,
    yPercent: -105,
    stagger: { each: 0.05, from: "end" },
  });

// Relance l’animation quand on clique sur le texte
document.querySelector(".fancyPants")?.addEventListener("pointerdown", () => {
  fancyPantsAni.restart();
});

// Nettoyage de la console (facultatif)
console.clear();
