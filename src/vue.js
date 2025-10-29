// Attendre que le DOM soit complètement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', () => {

 
  // Fonction d'initialisation GSAP
  
  function gsapInit() {
    // Vérifie que GSAP est chargé
    if (typeof gsap === "undefined") return;

    // Enregistre le plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Sélectionne tous les éléments avec la classe .gs_reveal
    gsap.utils.toArray(".gs_reveal").forEach(elem => {
      // Commence avec les éléments invisibles
      gsap.set(elem, { autoAlpha: 0 });

      // Crée un ScrollTrigger pour chaque élément
      ScrollTrigger.create({
        trigger: elem, // élément déclencheur
        start: "top 90%", // déclenche l'animation quand le top de l'élément atteint 90% de la hauteur de la fenêtre
        onEnter: () => gsap.to(elem, { y: 0, autoAlpha: 1, duration: 1, ease: "expo.out" }), // animation à l'entrée
        onEnterBack: () => gsap.to(elem, { y: 0, autoAlpha: 1, duration: 1, ease: "expo.out" }), // animation à l'entrée en scroll inverse
      });
    });
  }


  // Application principale Vue (slider)

  const vueApp = document.querySelector('#vue-app');
  if (vueApp) {
    const app = Vue.createApp({
      data() {
        return {
          profile: null,    // données du profil
          projects: [],     // liste des projets
          currentSlide: 0   // index du projet affiché
        };
      },
      computed: {
        // Projet actuellement sélectionné
        currentProject() {
          return this.projects[this.currentSlide] || {};
        }
      },
      methods: {
        // Changer de diapositive
        goToSlide(index) {
          this.currentSlide = index;
        },
        // Gérer le changement de hash dans l'URL
        handleHashChange() {
          const hash = window.location.hash;
          const index = parseInt(hash.replace('#slide-', '')) - 1;
          if (!isNaN(index) && index >= 0 && index < this.projects.length) {
            this.currentSlide = index;
          }
        }
      },
      mounted() {
        // Charger les données JSON
        fetch('./src/projects.json')
          .then(res => res.json())
          .then(data => {
            this.profile = data.profile;
            this.projects = data.projects;

            this.$nextTick(() => {
              const slider = this.$el.querySelector('.slider');
              if (slider) slider.scrollLeft = 0; // reset du slider à la première image
              this.currentSlide = 0;             // reset du texte au premier projet
              gsapInit();                        // lancer GSAP pour les animations
            });

            this.handleHashChange(); // gestion du hash pour navigation
          })
          .catch(error => console.error('Erreur chargement JSON :', error));

        // Écoute le changement du hash dans l'URL
        window.addEventListener('hashchange', this.handleHashChange);
      }
    });

    app.mount('#vue-app');
  }

 
  // Application Vue pour la page projets
 
  const vueProjects = document.querySelector('#vue-projects');
  if (vueProjects) {
    const projectApp = Vue.createApp({
      data() {
        return {
          profile: null,
          projects: []
        };
      },
      mounted() {
        fetch('./src/projects.json')
          .then(res => res.json())
          .then(data => {
            this.profile = data.profile;
            this.projects = data.projects;

            this.$nextTick(() => {
              gsapInit(); // animations GSAP pour la section projets
            });
          })
          .catch(error => console.error('Erreur chargement JSON (projets) :', error));
      }
    });

    projectApp.mount('#vue-projects');
  }


  // Toggle Dark/Light Mode

  const vueMode = document.querySelector('#app');
  if (vueMode) {
    const { createApp } = Vue;

    createApp({
      data() {
        return { isDarkMode: false }; // mode sombre activé ou non
      },
      mounted() {
        // Vérifie si le mode sombre était activé précédemment
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'true') {
          this.isDarkMode = true;
          document.body.classList.add('dark-mode');
        }
      },
      methods: {
        toggleDarkMode() {
          this.isDarkMode = !this.isDarkMode;
          document.body.classList.toggle('dark-mode', this.isDarkMode);
          localStorage.setItem('darkMode', this.isDarkMode); // sauvegarde la préférence
        }
      }
    }).mount('#app');
  }

 
  // Application Vue pour la section profil
  
  const vueProfile = document.querySelector('#vue-profile');
  if (vueProfile) {
    const profileApp = Vue.createApp({
      data() {
        return { profile: null };
      },
      mounted() {
        fetch('./src/projects.json')
          .then(res => res.json())
          .then(data => {
            this.profile = data.profile;

            this.$nextTick(() => {
              gsapInit(); // animations GSAP pour la section profil
            });
          })
          .catch(err => console.error('Erreur chargement profil :', err));
      }
    });

    profileApp.mount('#vue-profile');
  }
});

// ---------------------------
// Application Vue pour afficher la liste des logiciels
// ---------------------------
const vueLogiciels = Vue.createApp({
  data() {
    return { logiciels: [] };
  },
  mounted() {
    fetch('./src/projects.json')
      .then(res => res.json())
      .then(data => {
        this.logiciels = data.logiciels; // récupère la liste des logiciels
      });
  }
});

vueLogiciels.mount('#vue-logiciels');
