// Function to initialize all dynamic behaviors
window.initializeWebsite = function () {
  // Initialize Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Scroll Reveal Observer
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Re-attach observers to elements
  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });

  // Mobile Menu Toggle
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    // Remove old listeners if any (though difficult without reference)
    // Clone and replace to strip listeners? No, this function runs once on load.
    // Assuming clean DOM or first run.
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const button = item.querySelector("button");
    const answer = item.querySelector(".faq-answer");
    const iconWrapper = item.querySelector(".faq-icon-wrapper");

    if (button) {
      button.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("active")) {
            otherItem.classList.remove(
              "active",
              "ring-1",
              "ring-primary-200",
              "bg-primary-50",
            );
            const otherAnswer = otherItem.querySelector(".faq-answer");
            if (otherAnswer) otherAnswer.style.maxHeight = "0px";
            const otherIconWrapper =
              otherItem.querySelector(".faq-icon-wrapper");
            if (otherIconWrapper)
              otherIconWrapper.style.transform = "rotate(0deg)";
          }
        });

        if (isOpen) {
          item.classList.remove(
            "active",
            "ring-1",
            "ring-primary-200",
            "bg-primary-50",
          );
          if (answer) answer.style.maxHeight = "0px";
          if (iconWrapper) iconWrapper.style.transform = "rotate(0deg)";
        } else {
          item.classList.add(
            "active",
            "ring-1",
            "ring-primary-200",
            "bg-primary-50",
          );
          if (answer) answer.style.maxHeight = answer.scrollHeight + "px";
          if (iconWrapper) iconWrapper.style.transform = "rotate(180deg)";
        }
      });
    }
  });

  // Navbar Blur Effect
  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        navbar.classList.add("shadow-sm");
        navbar.classList.replace("bg-white/80", "bg-white/95");
      } else {
        navbar.classList.remove("shadow-sm");
        navbar.classList.replace("bg-white/95", "bg-white/80");
      }
    });
  }

  // Counter Animation
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute("data-target");
          const duration = 2000;
          const increment = target / (duration / 16);

          let current = 0;
          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.innerText = Math.ceil(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.innerText = target;
            }
          };
          updateCounter();
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 },
  );

  document.querySelectorAll(".counter").forEach((counter) => {
    counterObserver.observe(counter);
  });

  // GSAP
  if (window.ScrollTrigger) {
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const wrapper = document.querySelector(".services-pin-wrapper");
    const cards = gsap.utils.toArray(".service-card");

    if (wrapper && cards.length > 0) {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        gsap.set(cards, {
          y: (i) => (i === 0 ? 0 : "100%"),
          opacity: (i) => (i === 0 ? 1 : 0),
          scale: 1,
          zIndex: (i) => i + 1,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".services-pin-wrapper",
            start: "top top",
            end: "+=2000",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // Sequence 1: Card 2
        tl.to("#card-2", { y: "0%", duration: 1, ease: "none" }, 0)
          .to("#card-2", { opacity: 1, duration: 0.1, ease: "none" }, 0)
          .to("#card-1", { scale: 0.9, duration: 1, ease: "none" }, 0);

        // Sequence 2: Card 3
        tl.to("#card-3", { y: "0%", duration: 1, ease: "none" }, 1)
          .to("#card-3", { opacity: 1, duration: 0.1, ease: "none" }, 1)
          .to("#card-2", { scale: 0.9, duration: 1, ease: "none" }, 1);
      });

      mm.add("(max-width: 768px)", () => {
        gsap.set(cards, { clearProps: "all" });
        gsap.set(cards, { position: "relative", opacity: 1, scale: 1, y: 0 });
      });
    }

    const processSection = document.getElementById("process-section");
    if (processSection) {
      const tlProcess = gsap.timeline({
        scrollTrigger: {
          trigger: "#process-section",
          start: "top 80%",
          end: "bottom 70%", // Finished earlier so user doesn't have to scroll deep
          scrub: 2,
          toggleActions: "play none none reverse",
        },
      });

      tlProcess
        .to("#step-1", {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        })
        .to("#process-line-fill", { width: "50%", duration: 1, ease: "none" })
        .to(
          "#step-2",
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          "-=0.5",
        )
        .to("#process-line-fill", { width: "100%", duration: 1, ease: "none" })
        .to(
          "#step-3",
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          "-=0.5",
        );
    }
  }

  // Appointment form popup logic
  var form = document.getElementById("appointment-form");
  var popup = document.getElementById("appointment-success-popup");
  var closeBtn = document.getElementById("close-appointment-popup");
  if (form && popup && closeBtn) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      popup.classList.remove("hidden");
    });
    closeBtn.addEventListener("click", function () {
      popup.classList.add("hidden");
    });
  }
};
