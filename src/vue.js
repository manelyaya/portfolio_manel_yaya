document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------
  // GSAP helper
  // ---------------------------
  function gsapInit() {
    if (typeof gsap === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".gs_reveal").forEach(elem => {
      gsap.set(elem, { autoAlpha: 0 }); // start hidden

      ScrollTrigger.create({
        trigger: elem,
        start: "top 90%",
        onEnter: () => gsap.to(elem, { y: 0, autoAlpha: 1, duration: 1, ease: "expo.out" }),
        onEnterBack: () => gsap.to(elem, { y: 0, autoAlpha: 1, duration: 1, ease: "expo.out" }),
      });
    });
  }

 // ---------------------------
// Main Vue app (slider + projects)
// ---------------------------
const vueApp = document.querySelector('#vue-app');
if (vueApp) {
  const app = Vue.createApp({
    data() {
      return {
        profile: null,
        projects: [],
        currentSlide: 0
      };
    },
    computed: {
      currentProject() {
        return this.projects[this.currentSlide] || {};
      }
    },
    methods: {
      goToSlide(index) {
        this.currentSlide = index; // update text + slider
      },
      handleHashChange() {
        const hash = window.location.hash;
        const index = parseInt(hash.replace('#slide-', '')) - 1;
        if (!isNaN(index) && index >= 0 && index < this.projects.length) {
          this.currentSlide = index;
        }
      }
    },
    mounted() {
  fetch('./src/projects.json')
    .then(res => res.json())
    .then(data => {
      this.profile = data.profile;
      this.projects = data.projects;

      this.$nextTick(() => {
        const slider = this.$el.querySelector('.slider');
        if (slider) slider.scrollLeft = 0; // reset slider to first image
        this.currentSlide = 0;             // reset text to first project
        gsapInit();                        // run GSAP
      });

      this.handleHashChange(); // optional: for hash navigation
    })
    .catch(error => console.error('Erreur chargement JSON :', error));

  window.addEventListener('hashchange', this.handleHashChange);
}

  });

  app.mount('#vue-app');
}


  // ---------------------------
  // Projects page app
  // ---------------------------
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
              gsapInit(); // GSAP for projects section
            });
          })
          .catch(error => console.error('Erreur chargement JSON (projets) :', error));
      }
    });

    projectApp.mount('#vue-projects');
  }

  // ---------------------------
  // Dark/Light Mode toggle
  // ---------------------------
  const vueMode = document.querySelector('#app');
  if (vueMode) {
    const { createApp } = Vue;

    createApp({
      data() {
        return { isDarkMode: false };
      },
      methods: {
        toggleDarkMode() {
          this.isDarkMode = !this.isDarkMode;
          document.body.classList.toggle('dark-mode', this.isDarkMode);
        }
      }
    }).mount('#app');
  }

  // ---------------------------
  // Profile section app
  // ---------------------------
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
              gsapInit(); // GSAP for profile section
            });
          })
          .catch(err => console.error('Erreur chargement profil :', err));
      }
    });

    profileApp.mount('#vue-profile');
  }
});

const vueLogiciels = Vue.createApp({
  data() {
    return { logiciels: [] };
  },
  mounted() {
    fetch('./src/projects.json')
      .then(res => res.json())
      .then(data => {
        this.logiciels = data.logiciels;
      });
  }
});

vueLogiciels.mount('#vue-logiciels');
