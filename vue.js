document.addEventListener('DOMContentLoaded', () => {
    // Vérifie si on est sur la page d'accueil (carrousel)
    const vueApp = document.querySelector('#vue-app');
    const vueProjects = document.querySelector('#vue-projects');
    const vueMode = document.querySelector('#app');
  
    if (vueApp) {
      // === APP 1 : Carrousel sur la page d'accueil ===
      const app = Vue.createApp({
        data() {
          return {
            projects: [],
            currentSlide: 0,
          };
        },
        computed: {
          currentProject() {
            return this.projects[this.currentSlide] || {};
          }
        },
        methods: {
          handleHashChange() {
            const hash = window.location.hash;
            const index = parseInt(hash.replace('#slide-', '')) - 1;
            if (!isNaN(index) && index >= 0 && index < this.projects.length) {
              this.currentSlide = index;
            }
          }
        },
        mounted() {
          fetch('./projects.json')
            .then(res => res.json())
            .then(data => {
              this.projects = data;
              this.handleHashChange();
            })
            .catch(error => console.error('Erreur chargement JSON :', error));
  
          window.addEventListener('hashchange', this.handleHashChange);
        }
      });
  
      app.mount('#vue-app');
    }
  
    if (vueProjects) {
      // === APP 2 : Page projets ===
      const projectApp = Vue.createApp({
        data() {
          return {
            projects: []
          };
        },
        mounted() {
          fetch('./projects.json')
            .then(res => res.json())
            .then(data => {
              this.projects = data;
            })
            .catch(error => console.error('Erreur chargement JSON (projets) :', error));
        }
      });
  
      projectApp.mount('#vue-projects');
    }
  });


  if (app) {
  const { createApp } = Vue;
 
createApp({
  data() {
    return {
      isDarkMode: false
    };
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
 
      // Ajoute ou retire la classe sur le body
      document.body.classList.toggle('dark-mode', this.isDarkMode);
    }
  }
}).mount('#app');
  }