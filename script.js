/* ============================================================
   SCRIPT.JS — Pavneet Dhanoa Portfolio
   Handles:
     1. Navbar scroll effect (transparent → dark)
     2. Hero entrance animation on page load
     3. Scroll-triggered fade-up animations (IntersectionObserver)
     4. Mobile hamburger menu toggle
     5. Active nav link highlighting on scroll
============================================================ */


/* ============================================================
   1. NAVBAR SCROLL EFFECT
   Adds the .scrolled class when user scrolls past 50px.
   CSS then gives the navbar a dark background.
============================================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ============================================================
   2. HERO ENTRANCE ANIMATION
   After a short delay, adds .visible to the hero content.
   CSS transitions then smoothly animate it in.
============================================================ */
const heroContent = document.getElementById('heroContent');

// Short timeout gives the browser time to paint before animating
setTimeout(() => {
  if (heroContent) {
    heroContent.classList.add('visible');
  }
}, 150);


/* ============================================================
   3. SCROLL-TRIGGERED FADE-UP ANIMATIONS
   Any element with class="fade-up" will animate in when it
   enters the viewport. IntersectionObserver is more efficient
   than listening to the scroll event directly.
============================================================ */
const fadeElements = document.querySelectorAll('.fade-up');

// Options: trigger when element is 10% visible
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px' // fires slightly before the element fully enters
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      // Stop watching once it's visible — no need to re-animate
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Attach observer to every element that has the fade-up class
fadeElements.forEach(el => fadeObserver.observe(el));


/* ============================================================
   4. MOBILE HAMBURGER MENU
   Toggles the .open class on the nav-links list.
   CSS then shows/hides the menu.
============================================================ */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close the menu when any nav link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}


/* ============================================================
   5. ACTIVE NAV LINK ON SCROLL
   Highlights the correct nav link as the user scrolls
   through each section.
============================================================ */
const sections    = document.querySelectorAll('section[id]');
const navLinkEls  = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  // Get current scroll position with a small offset for the fixed navbar
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      // Remove active from all links
      navLinkEls.forEach(link => link.classList.remove('active'));

      // Add active to the matching link
      const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}

// Listen for scroll to update active link
window.addEventListener('scroll', updateActiveLink, { passive: true });

// Run once on load so the correct link is highlighted immediately
updateActiveLink();


/* ============================================================
   6. PROJECT DETAILS MODAL
   Open project details with gallery and GitHub link.
============================================================ */
const projectData = {
  'house-price': {
    title: 'House Price Predictor',
    description: 'Regression-based model to predict home prices with feature engineering, cross-validation, and performance metrics.',
    insight: 'Visualizations show model accuracy, predicted vs. actual values, feature importance, and residual analysis, typical outputs for production-ready ML pipelines.',
    github: 'https://github.com/PavneetDhanoa/HousePricePredictor.git',
    images: [
      'images/house-price-predictor-1.png',
      'images/house-price-predictor-2.png'
    ]
  },
  'expense-tracker': {
    title: 'Expense Tracker',
    description: 'Python script/tool for tracking spending, categories, and charting trends across time.',
    insight: 'Charts show expense distribution by category, monthly spending trends, and summary visualizations for optimized budgeting.',
    github: 'https://github.com/PavneetDhanoa/Expense-Tracker.git',
    images: [
      'images/expense-tracker-1.png',
      'images/expense-tracker-2.png'
    ]
  },
  'financial-tool': {
    title: 'Financial Analytics Tool',
    description: 'Automated data cleaning and analytics pipeline for finance datasets with interactive output reports.',
    insight: 'Cache and output screenshots show data quality checks, key metrics, and graphical trend analysis produced by the tool.',
    github: 'https://github.com/PavneetDhanoa/python-finance-analysis.git',
    images: [
      'images/financial-tool-1.png.PNG',
      'images/financial-tool-2.png'
    ]
  },
  'portfolio-website': {
    title: 'Portfolio Website',
    description: 'Minimal, modern website with smooth transitions and responsive sections.',
    insight: '',
    github: 'https://github.com/PavneetDhanoa/PavneetDhanoa.git',
    images: []
  },
  'personal-readme': {
    title: 'Personal README',
    description: 'GitHub profile README with introduction, skills, and projects.',
    insight: '',
    github: 'https://github.com/PavneetDhanoa/PavneetDhanoa.git',
    images: []
  }
};

const modal = document.getElementById('projectModal');
const modalTitle = document.querySelector('.project-modal-title');
const modalDescription = document.querySelector('.project-modal-description');
const modalInsight = document.getElementById('projectModalInsight');
const modalGallery = document.getElementById('projectModalGallery');
const modalGitHub = document.getElementById('projectModalGitHub');
const closeButtons = [
  document.getElementById('projectModalClose'),
  document.getElementById('projectModalCloseBtn')
];

function openProjectModal(key) {
  const project = projectData[key];
  if (!project || !modal) return;

  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalInsight.textContent = project.insight;
  modalGitHub.href = project.github;

  modalGallery.innerHTML = '';

  if (project.images && project.images.length > 0) {
    project.images.forEach((src, index) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `${project.title} image ${index + 1}`;
      modalGallery.appendChild(img);
    });
    modalGallery.style.display = 'grid';
    document.querySelector('.project-modal-subtitle').style.display = 'block';
  } else {
    modalGallery.style.display = 'none';
    document.querySelector('.project-modal-subtitle').style.display = 'none';
  }

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function closeProjectModal() {
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.project-details-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const projectKey = btn.dataset.project;
    openProjectModal(projectKey);
  });
});

closeButtons.forEach(btn => {
  if (!btn) return;
  btn.addEventListener('click', closeProjectModal);
});

if (modal) {
  modal.addEventListener('click', event => {
    if (event.target.getAttribute('data-close') === 'true') {
      closeProjectModal();
    }
  });
}

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeProjectModal();
  }
});

