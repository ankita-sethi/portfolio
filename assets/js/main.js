// ===== main.js (Final Clean + Commented Version) =====
// All logic for theme toggle, animations, modals, smooth scroll, and EmailJS integration.

// Everything wrapped inside DOMContentLoaded to ensure all HTML elements are loaded first.
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggleBtn = document.getElementById("theme-toggle");
  const icon = toggleBtn.querySelector("i");

  // =====================================================
  // 🌙 THEME TOGGLE (Light/Dark Mode)
  // =====================================================
  // Saves user’s theme in localStorage and updates icon accordingly.
  const savedTheme = localStorage.getItem("theme") || "light";
  body.setAttribute("data-theme", savedTheme);
  icon.className = savedTheme === "dark" ? "bx bx-sun" : "bx bx-moon";

  toggleBtn.addEventListener("click", () => {
    const current = body.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    body.setAttribute("data-theme", next);
    icon.className = next === "dark" ? "bx bx-sun" : "bx bx-moon";
    localStorage.setItem("theme", next);
  });

  // =====================================================
  // ⌨️ TYPING ANIMATION (Hero Section)
  // =====================================================
  // Displays dynamic roles like "Data Engineer", typing letter by letter with erase effect.
  const typingEl = document.getElementById("typing");
  const roles = [
    "Data Engineer ",
    "Machine Learning Researcher ",
    "AI Accessibility Innovator ",
  ];

  let currentRole = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const text = roles[currentRole];
    typingEl.textContent = isDeleting
      ? text.substring(0, charIndex--)
      : text.substring(0, charIndex++);

    // Pause before deleting
    if (!isDeleting && charIndex === text.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
    // Switch to next role once deleted
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentRole = (currentRole + 1) % roles.length;
    }

    setTimeout(typeEffect, isDeleting ? 60 : 100);
  }
  setTimeout(typeEffect, 400);

  // =====================================================
  // 🪄 FADE-IN ANIMATION (IntersectionObserver)
  // =====================================================
  // Adds .visible class when a section scrolls into view.
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      }),
    { threshold: 0.2 } // only triggers when 20% of the section is visible
  );

  document.querySelectorAll(".section").forEach((section) => {
    observer.observe(section);
  });

  // =====================================================
  // 🧭 NAVBAR BEHAVIOR (Scroll Shadow + Active Highlight)
  // =====================================================
  const nav = document.querySelector("nav");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll(".section");

  // Adds shadow to navbar once you scroll
  window.addEventListener("scroll", () => {
    nav.classList.toggle("shadow", window.scrollY > 20);
  });

  // Highlights current section in navbar while scrolling
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((sec) => {
      if (scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach((link) =>
      link.classList.toggle(
        "active",
        link.getAttribute("href").includes(current)
      )
    );
  });

  // =====================================================
  // 🕊️ SMOOTH SCROLL for internal navigation links
  // =====================================================
  document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelector(link.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
    });
  });

  // =====================================================
  // ⬇️ SCROLL DOWN BUTTON (Between Sections)
  // =====================================================
  // Scrolls from hero → about (or next section)
  const scrollBtn = document.querySelector(".scroll-down");
  if (scrollBtn) {
    scrollBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const nextSection = document.querySelector("#about");
      if (nextSection) nextSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Fade out the hero scroll arrow when scrolling down
  window.addEventListener("scroll", () => {
    const hero = document.querySelector("#home");
    if (!hero) return;
    const heroHeight = hero.offsetHeight;
    scrollBtn.style.opacity = window.scrollY > heroHeight * 0.3 ? "0" : "1";
    scrollBtn.style.pointerEvents =
      window.scrollY > heroHeight * 0.3 ? "none" : "auto";
  });

  // =====================================================
  // 📅 FOOTER YEAR (Dynamic)
  // =====================================================
  document.getElementById("year").textContent = new Date().getFullYear();

  // =====================================================
  // 🧩 PROJECT MODAL LOGIC
  // =====================================================
  // Displays detailed info when "View Details" is clicked.

  const projectData = {
    hallu: {
      title: "Multi-Agent Approach for Detecting Hallucination in LLMs",
      description:
        "Built HalluControl, a multi-agent framework that detects and quantifies hallucinations using concept inference and NER. Improved factual reliability by 18%.",
      skills: "Python, NER, Hugging Face, Transformers",
      link: "https://github.com/ankita-sethi/hallucination_detection",
    },
    energy: {
      title: "Smart Energy Assistant for Smart Homes",
      description:
        "Developed ARIMA + GPT-4 forecasting system to detect energy anomalies and improve efficiency.",
      skills: "Python, ARIMA, GPT-4, Feature Engineering",
      link: "https://github.com/ankita-sethi/smartenergy-assistant",
    },
    happiness: {
      title: "Global Happiness and Sustainability Analytics",
      description:
        "Interactive D3.js dashboard analyzing global happiness vs. renewable energy data.",
      skills: "React.js, D3.js, GCP, Node.js",
      link: "https://github.com/ankita-sethi/564-visualization-project",
    },
    reddit: {
      title: "Reddit Community Behavioral and Trend Analysis",
      description:
        "Used BERT + LSTM to analyze sentiment and engagement trends in political subreddits.",
      skills: "Python, NLP, LSTM, ML Ops",
    },
    object: {
      title: "Object Recognition for Assisting the Visually Impaired",
      description:
        "Created CNN-based assistant that provides audio feedback for detected objects.",
      skills: "Python, OpenCV, TensorFlow, Audio Feedback",
    },
    security: {
      title: "Security Vulnerability Analysis in PyPI Packages",
      description:
        "Scanned PyPI codebases for unsafe eval and subprocess usage using Bandit static analysis.",
      skills: "Python, Bandit, Security Scanning",
    },
  };

  const projectModal = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalLink = document.getElementById("modal-link");
  const modalClose = projectModal.querySelector(".modal-close");

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => {
      const key = card.dataset.project?.trim();
      const data = projectData[key];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalDescription.innerHTML = `
        <p>${data.description}</p>
        <p class="skills-line"><strong>Skills:</strong> ${data.skills}</p>
      `;
      modalLink.style.display = data.link ? "inline-flex" : "none";
      if (data.link) modalLink.href = data.link;
      projectModal.style.display = "flex";
    });
  });

  modalClose.addEventListener(
    "click",
    () => (projectModal.style.display = "none")
  );
  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) projectModal.style.display = "none";
  });
});

// =====================================================
// 🧠 EXPERIENCE MODAL LOGIC (Outside DOMContentLoaded)
// =====================================================
// Uses the same modal layout to show detailed experience info.
const experienceData = {
  gemini: {
    title:
      "Graduate Research Assistant – Accessibility Systems (Gemini 2.5 + NVDA)",
    description: `
      <p>Integrated Gemini 2.5 with NVDA screen reader to create multimodal web comprehension for blind users.</p>
      <p>Optimized Gemini API latency by 22% via context caching and structured content segmentation.</p>
    `,
  },
  accessibility: {
    title:
      "Graduate Research Assistant – LLM-Based Accessibility (Gemini 1.5 + LangChain + Django)",
    description: `
      <p>Developed full-stack NVDA–Gemini accessibility system with Django + LangChain.</p>
      <p>Used Chrome extension to gather webpage elements, sent to Gemini API for descriptive speech generation.</p>
      <p><em>Private repo available upon request.</em></p>
    `,
  },
  ta: {
    title: "Graduate Teaching Assistant – Data Structures & Ethics",
    description: `
      <p>Assisted in Java and algorithmic labs for 80+ students.</p>
      <p>Improved student performance by 17% through weekly reviews and live debugging sessions.</p>
    `,
  },
  accenture: {
    title: "Data Engineer – Accenture",
    description: `
      <p>Built ETL pipelines in Talend + Snowflake and Python–SQL chatbot for ticket automation.</p>
      <p>Reduced manual query load by 30%, earning Wall of Fame recognition for innovation.</p>
    `,
  },
};

// Elements
const expModal = document.getElementById("experience-modal");
const expTitle = document.getElementById("exp-modal-title");
const expDescription = document.getElementById("exp-modal-description");
const expClose = expModal.querySelector(".modal-close");

// Opens modal when experience card is clicked
document.querySelectorAll(".exp-card").forEach((card) => {
  card.addEventListener("click", () => {
    const key = card.dataset.exp;
    const data = experienceData[key];
    if (!data) return;
    expTitle.textContent = data.title;
    expDescription.innerHTML = data.description;
    expModal.style.display = "flex";
  });
});

// Close modal on button click or outside click
expClose.addEventListener("click", () => (expModal.style.display = "none"));
expModal.addEventListener("click", (e) => {
  if (e.target === expModal) expModal.style.display = "none";
});

// =====================================================
// 💌 EMAILJS INTEGRATION (Contact Form)
// =====================================================
// Sends messages directly from your site using EmailJS service.
emailjs.init("o1VKivQQcXMCQJucU"); // your EmailJS public key

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    emailjs.sendForm("service_ankita21", "template_knzg5ex", this).then(
      () => {
        alert("✅ Message sent successfully! I'll get back to you soon.");
        this.reset();
      },
      (error) => {
        console.error("Error:", error);
        alert("❌ Something went wrong. Please try again later.");
      }
    );
  });
