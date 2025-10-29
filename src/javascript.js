function animateFrom(elem, direction) {
    direction = direction || 1;
    var x = 0,
        y = direction * 100;
    if(elem.classList.contains("gs_reveal_fromLeft")) {
      x = -100;
      y = 0;
    } else if (elem.classList.contains("gs_reveal_fromRight")) {
      x = 100;
      y = 0;
    }
    elem.style.transform = "translate(" + x + "px, " + y + "px)";
    elem.style.opacity = "0";
    gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
      duration: 1.25, 
      x: 0,
      y: 0, 
      autoAlpha: 1, 
      ease: "expo", 
      overwrite: "auto"
    });
  }
  
  function hide(elem) {
    gsap.set(elem, {autoAlpha: 0});
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
      hide(elem); // assure that the element is hidden when scrolled into view
      
      ScrollTrigger.create({
        trigger: elem,
        // markers: true,
        onEnter: function() { animateFrom(elem) }, 
        onEnterBack: function() { animateFrom(elem, -1) },
        onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
      });
    });
  });




  function gsapInit() {
    if (typeof gsap === "undefined") return;
  
    gsap.registerPlugin(ScrollTrigger);
  
    // animate any element with .gs_reveal class
    gsap.utils.toArray(".gs_reveal").forEach(elem => {
      gsap.set(elem, { autoAlpha: 0 }); // start hidden
  
      ScrollTrigger.create({
        trigger: elem,
        start: "top 90%",  // when element is 90% from top
        onEnter: () => gsap.to(elem, { y: 0, autoAlpha: 1, duration: 1, ease: "expo.out" }),
        onEnterBack: () => gsap.to(elem, { y: 0, autoAlpha: 1, duration: 1, ease: "expo.out" }),
        markers: true // optional: for debugging
      });
    });
  }
  

  const fancyPantsSplit = new SplitText(".fancyPants", { type: "chars, lines" });


const fancyPantsAni = gsap.timeline()

.from(fancyPantsSplit.chars, {
		duration: 1,
		yPercent: 105,
		stagger: { each: 0.05, from: "start" }
	})

.to(fancyPantsSplit.chars, {
	
		duration: 1,
		yPercent: -105,
		stagger: { each: 0.05, from: "end" }
	})


document
	.querySelector(".fancyPants")
	.addEventListener("pointerdown", () => fancyPantsAni.restart());

  console.clear();

