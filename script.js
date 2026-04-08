const themeSwitcher = document.querySelector(".theme-switcher");
const themeToggle = document.querySelector(".theme-toggle");
const themeButtons = document.querySelectorAll(".theme-color");
const languageToggle = document.querySelector(".language-toggle");
const servicesMarquee = document.querySelector(".services-marquee");
const servicesGrid = document.querySelector(".services-grid");
const projectModal = document.getElementById("project-modal");
const modalImage = document.getElementById("project-modal-image");
const modalKicker = document.getElementById("project-modal-kicker");
const modalTitle = document.getElementById("project-modal-title");
const modalDescription = document.getElementById("project-modal-description");
const modalTags = document.getElementById("project-modal-tags");
const modalClose = document.querySelector(".project-modal-close");
const savedTheme = localStorage.getItem("portfolio-theme") || "silver";
const savedLanguage = localStorage.getItem("portfolio-language") || "fr";

let currentLanguage = savedLanguage;
let revealInitialized = false;

const translations = {
    fr: {
        pageTitle: "MacNathan Portfolio",
        text: {
            ".top-tags span:nth-child(2)": "PORTFOLIO 2026",
            ".top-tags span:nth-child(3)": "MONETIQUE",
            ".left h1": "Bienvenue sur <br>mon portfolio <br>professionnel",
            ".desc": "Je présente ici mon parcours en monétique, mes expériences en stage et mes compétences entre services financiers, développement web et outils numériques.",
            ".live-line span": "MONETICIEN DISPONIBLE",
            ".buttons .btn:nth-child(1)": '<i class="fa-solid fa-credit-card"></i> PAIEMENT',
            ".buttons .btn:nth-child(2)": '<i class="fa-solid fa-user"></i> PROFIL',
            ".buttons .btn:nth-child(3)": '<i class="fa-solid fa-briefcase"></i> PROJETS',
            ".right-head span:first-child": "TABLEAU DE BORD",
            ".right-head .online": "EN LIGNE",
            ".core span": "MONETIQUE",
            ".stats div:first-child p": "Licence pro en monetique",
            ".stats div:last-child h4": "2 stages",
            ".stats div:last-child p": "Controle de gestion et dev informatique",
            ".ul-list li:nth-child(1) a": "Accueil",
            ".ul-list li:nth-child(2) a": "A propos",
            ".ul-list li:nth-child(3) a": "Projets",
            ".ul-list li:nth-child(4) a": "Expertise",
            ".ul-list li:nth-child(5) a": "Contact",
            ".home-p": '<span class="home-s"></span>Disponible pour opportunités professionnelles',
            ".info-home h1": "Salut, je suis MacNathan",
            ".info-home h3": "Moneticien en début de carrière",
            ".info-p p:nth-child(1)": "Profil forme en monétique avec environ trois années d'experience",
            ".info-p p:nth-child(2)": "sur des projets web, mobile et des missions de stage en entreprise.",
            ".info-p p:nth-child(3)": "J'ai obtenu ma licence professionnelle en monétique en 2025 apres plusieurs experiences de terrain et de developpement.",
            ".info-p2 p:nth-child(1)": '<i class="fa-solid fa-location-dot"></i> Habitant au Bénin',
            ".info-p2 p:nth-child(2)": '<i class="fa-solid fa-briefcase"></i> Disponible maintenant',
            ".btn-home1": '<i class="fa-solid fa-arrow-right"></i> Me contacter',
            ".btn-home2": '<i class="fa-solid fa-download"></i> Télécharger mon CV',
            ".followw": "Suivez-moi:",
            ".info-text p": "Monéticien",
            ".about h3": "A PROPOS",
            ".about-text p:nth-child(1)": "Je suis MacNathan Eutyche AGBO, formé en monétique et passionné par les solutions de paiement, les outils numériques et l'innovation fintech.",
            ".about-text p:nth-child(2)": "Ma licence professionnelle en monétique a été suivie à Golden Academy Africa à Cotonou entre 2022 et 2025, apres mon baccalaureat puis le BEPC.",
            ".about-text p:nth-child(3)": "Mon CV montre aussi un profil polyvalent: stage en contrôle de gestion au CHU-HOMEL, stage en développement informatique chez King Soft Technologie, expériences associatives et projets de développement web et mobile.",
            ".about-text p:nth-child(4)": "Aujourd'hui, je continue a développer mon profil autour de :",
            ".about-text p:nth-child(5)": "<span>#</span>La monétique, les solutions de paiement et les services financiers",
            ".about-text p:nth-child(6)": "<span>#</span>Le développement web et mobile sur des projets concrets",
            ".about-text p:nth-child(7)": "<span>#</span>L'usage des outils informatiques et de l'intelligence artificielle",
            ".project > p": "PROJETS",
            ".project h1": "Domaines d'intervention",
            ".info-pro p:nth-child(1)": "Mon parcours mélange formation en monétique, stages et réalisations techniques.",
            ".info-pro p:nth-child(2)": "Voici les experiences les plus pertinentes à mettre en avant dans ce portfolio.",
            ".project-card[data-project='gasid'] h3": "Developpeur front-end - Gasid ONG",
            ".project-card[data-project='gasid'] > p": "Creation de l'interface utilisateur d'un site web pour une organisation d'aide aux enfants avec integration responsive en HTML, CSS et JavaScript.",
            ".project-card[data-project='stellio'] h3": "Projet personnel full stack",
            ".project-card[data-project='stellio'] > p": "Conception et developpement complet d'une application mobile de localisation en temps reel des stations-service, avec logique metier, geolocalisation et tests.",
            ".project-card[data-project='event'] h3": "Projet collaboratif mobile front-end",
            ".project-card[data-project='event'] > p": "Participation au developpement front-end d'une application de reseautage evenementiel dans un cadre collaboratif depuis 2025.",
            ".project-card[data-project='admin-etudiant'] h3": "Portail Admin Etudiant OCR",
            ".project-card[data-project='admin-etudiant'] > p": "Application web de gestion de dossiers etudiants avec recherche, creation, edition, numerisation OCR des attestations scannees et synchronisation Firebase avec secours local.",
            ".project-card[data-project='gasid'] .preview-project": '<i class="fa-solid fa-eye"></i> Explorer',
            ".project-card[data-project='stellio'] .preview-project": '<i class="fa-solid fa-eye"></i> Explorer',
            ".project-card[data-project='event'] .preview-project": '<i class="fa-solid fa-eye"></i> Explorer',
            ".project-card[data-project='admin-etudiant'] .preview-project": '<i class="fa-solid fa-eye"></i> Explorer',
            ".project-card[data-project='gasid'] .btns a:last-child": '<i class="fas fa-external-link-alt"></i> Echanger',
            ".project-card[data-project='stellio'] .btns a:last-child": '<i class="fas fa-external-link-alt"></i> Echanger',
            ".project-card[data-project='event'] .btns a:last-child": '<i class="fas fa-external-link-alt"></i> Echanger',
            ".project-card[data-project='admin-etudiant'] .btns a:last-child": '<i class="fas fa-external-link-alt"></i> Echanger',
            "#service > p": "EXPERTISE",
            "#service h1": "Ce que je peux apporter",
            ".service-card:nth-child(1) h3": "Monetique et paiement",
            ".service-card:nth-child(1) p": "Notions de monetique et des solutions de paiement, avec une base academique recente et une volonte de progression continue.",
            ".service-card:nth-child(2) h3": "Finance et comptabilite",
            ".service-card:nth-child(2) p": "Base en finance et comptabilite, utile pour comprendre les flux, les controles et les besoins des organisations.",
            ".service-card:nth-child(3) h3": "Programmation web et mobile",
            ".service-card:nth-child(3) p": "Experience pratique sur plusieurs projets personnels, associatifs et collaboratifs en developpement front-end et full stack.",
            ".service-card:nth-child(4) h3": "Maitrise de l'outil informatique",
            ".service-card:nth-child(4) p": "Bonne aisance avec les outils numeriques et l'environnement informatique pour apprendre vite et etre operationnel.",
            ".service-card:nth-child(5) h3": "Intelligence artificielle",
            ".service-card:nth-child(5) p": "Utilisation des outils d'intelligence artificielle comme levier de productivite, de recherche et d'amelioration du travail.",
            ".service-card:nth-child(6) h3": "Langues et centres d'interet",
            ".service-card:nth-child(6) p": "Francais, anglais, ainsi qu'un profil personnel curieux et discipline nourri par la lecture, le sport, la photographie et les mangas.",
            ".section-title": "Contactez-moi",
            ".contact-info > p": "Je suis ouvert aux stages, opportunites, collaborations et echanges autour de la monetique, des paiements, de la finance et du developpement informatique.",
            ".contact-item:nth-child(3) span": "Bénin, Cotonou",
            ".contact-form .btn": "Envoyer le message"
        },
        placeholders: {
            "input[name='user_name']": "Votre Nom",
            "input[name='user_email']": "Votre Email",
            "textarea[name='message']": "Votre Message"
        },
        projectMeta: {
            gasid: {
                kicker: "Projet associatif",
                title: "Developpeur front-end - Gasid ONG",
                description: "Interface web responsive conçue pour une organisation d'aide aux enfants, avec une attention particulière portée à la clarté, à la lisibilité et à l'accessibilité.",
                tags: ["HTML", "CSS", "JavaScript", "Responsive"],
                image: "images/gasid.png"
            },
            stellio: {
                kicker: "Projet personnel",
                title: "Application de localisation de stations-service",
                description: "Projet full stack pensé pour faciliter la recherche de stations-service en temps réel avec logique métier, géolocalisation et vision produit orientée usage.",
                tags: ["Full stack", "Mobile", "Geolocalisation", "UX"],
                image: "images/stellio.jpg"
            },
            event: {
                kicker: "Projet collaboratif",
                title: "Application de reseautage evenementiel",
                description: "Participation au front-end d'une solution mobile collaborative centrée sur l'expérience événementielle, l'interaction et la fluidité des parcours utilisateurs.",
                tags: ["Mobile", "Front-end", "Collaboration", "UI"],
                image: "images/event.png"
            },
            "admin-etudiant": {
                kicker: "Projet de gestion documentaire",
                title: "Portail Admin Etudiant OCR",
                description: "Application React conÃ§ue pour gerer les dossiers etudiants, automatiser l'extraction d'informations depuis des attestations scannees via OCR, et securiser la persistance avec Firebase, validation de schema et stockage local de secours.",
                tags: ["React", "Firebase", "OCR", "Firestore", "Responsive"],
                image: "images/etu.png"
            }
        }
    },
    en: {
        pageTitle: "MacNathan Portfolio",
        text: {
            ".top-tags span:nth-child(2)": "PORTFOLIO 2026",
            ".top-tags span:nth-child(3)": "PAYMENTS",
            ".left h1": "Welcome to <br>my professional <br>portfolio",
            ".desc": "I present my background in electronic payments, my internship experience, and my skills across financial services, web development, and digital tools.",
            ".live-line span": "PAYMENTS SPECIALIST AVAILABLE",
            ".buttons .btn:nth-child(1)": '<i class="fa-solid fa-credit-card"></i> PAYMENTS',
            ".buttons .btn:nth-child(2)": '<i class="fa-solid fa-user"></i> PROFILE',
            ".buttons .btn:nth-child(3)": '<i class="fa-solid fa-briefcase"></i> PROJECTS',
            ".right-head span:first-child": "DASHBOARD",
            ".right-head .online": "ONLINE",
            ".core span": "PAYMENTS",
            ".stats div:first-child p": "Professional degree in payments",
            ".stats div:last-child h4": "2 internships",
            ".stats div:last-child p": "Management control and software development",
            ".ul-list li:nth-child(1) a": "Home",
            ".ul-list li:nth-child(2) a": "About",
            ".ul-list li:nth-child(3) a": "Projects",
            ".ul-list li:nth-child(4) a": "Expertise",
            ".ul-list li:nth-child(5) a": "Contact",
            ".home-p": '<span class="home-s"></span>Available for professional opportunities',
            ".info-home h1": "Hi, I'm MacNathan",
            ".info-home h3": "Early-career payments specialist",
            ".info-p p:nth-child(1)": "Profile trained in electronic payments with around three years of experience",
            ".info-p p:nth-child(2)": "across web and mobile projects as well as company internships.",
            ".info-p p:nth-child(3)": "I earned my professional degree in electronic payments in 2025 after several hands-on and development experiences.",
            ".info-p2 p:nth-child(1)": '<i class="fa-solid fa-location-dot"></i> Based in Benin',
            ".info-p2 p:nth-child(2)": '<i class="fa-solid fa-briefcase"></i> Available now',
            ".btn-home1": '<i class="fa-solid fa-arrow-right"></i> Contact me',
            ".btn-home2": '<i class="fa-solid fa-download"></i> Download my resume',
            ".followw": "Follow me:",
            ".info-text p": "Payments specialist",
            ".about h3": "ABOUT",
            ".about-text p:nth-child(1)": "I am MacNathan Eutyche AGBO, trained in electronic payments and passionate about payment solutions, digital tools, and fintech innovation.",
            ".about-text p:nth-child(2)": "I completed my professional degree in electronic payments at Golden Academy Africa in Cotonou between 2022 and 2025, after my high school diploma and BEPC.",
            ".about-text p:nth-child(3)": "My resume also reflects a versatile profile: an internship in management control at CHU-HOMEL, a software development internship at King Soft Technologie, community involvement, and web and mobile development projects.",
            ".about-text p:nth-child(4)": "Today, I continue to grow my profile around:",
            ".about-text p:nth-child(5)": "<span>#</span>Electronic payments, payment solutions, and financial services",
            ".about-text p:nth-child(6)": "<span>#</span>Web and mobile development on real-world projects",
            ".about-text p:nth-child(7)": "<span>#</span>The use of digital tools and artificial intelligence",
            ".project > p": "PROJECTS",
            ".project h1": "Areas of contribution",
            ".info-pro p:nth-child(1)": "My background combines payments training, internships, and technical achievements.",
            ".info-pro p:nth-child(2)": "Here are the most relevant experiences highlighted in this portfolio.",
            ".project-card[data-project='gasid'] h3": "Front-end developer - Gasid NGO",
            ".project-card[data-project='gasid'] > p": "Created the user interface of a website for an organization supporting children, with responsive integration in HTML, CSS, and JavaScript.",
            ".project-card[data-project='stellio'] h3": "Personal full-stack project",
            ".project-card[data-project='stellio'] > p": "Designed and fully developed a mobile application for real-time gas station location, with business logic, geolocation, and testing.",
            ".project-card[data-project='event'] h3": "Collaborative mobile front-end project",
            ".project-card[data-project='event'] > p": "Contributed to the front-end development of an event networking app in a collaborative setting since 2025.",
            ".project-card[data-project='admin-etudiant'] h3": "Student Admin OCR Portal",
            ".project-card[data-project='admin-etudiant'] > p": "Web app for student record management with search, creation, editing, OCR scanning of certificates, and Firebase synchronization with local fallback storage.",
            ".project-card[data-project='gasid'] .preview-project": '<i class="fa-solid fa-eye"></i> Explore',
            ".project-card[data-project='stellio'] .preview-project": '<i class="fa-solid fa-eye"></i> Explore',
            ".project-card[data-project='event'] .preview-project": '<i class="fa-solid fa-eye"></i> Explore',
            ".project-card[data-project='admin-etudiant'] .preview-project": '<i class="fa-solid fa-eye"></i> Explore',
            ".project-card[data-project='gasid'] .btns a:last-child": '<i class="fas fa-external-link-alt"></i> Discuss',
            ".project-card[data-project='stellio'] .btns a:last-child": '<i class="fas fa-external-link-alt"></i> Discuss',
            ".project-card[data-project='event'] .btns a:last-child": '<i class="fas fa-external-link-alt"></i> Discuss',
            ".project-card[data-project='admin-etudiant'] .btns a:last-child": '<i class="fas fa-external-link-alt"></i> Discuss',
            "#service > p": "EXPERTISE",
            "#service h1": "What I can bring",
            ".service-card:nth-child(1) h3": "Payments and transaction systems",
            ".service-card:nth-child(1) p": "Knowledge of electronic payments and payment solutions, supported by a recent academic foundation and a strong willingness to keep improving.",
            ".service-card:nth-child(2) h3": "Finance and accounting",
            ".service-card:nth-child(2) p": "Foundation in finance and accounting, useful for understanding flows, controls, and organizational needs.",
            ".service-card:nth-child(3) h3": "Web and mobile programming",
            ".service-card:nth-child(3) p": "Hands-on experience on several personal, community, and collaborative projects in front-end and full-stack development.",
            ".service-card:nth-child(4) h3": "Computer literacy",
            ".service-card:nth-child(4) p": "Strong ease with digital tools and computing environments, allowing me to learn quickly and become operational fast.",
            ".service-card:nth-child(5) h3": "Artificial intelligence",
            ".service-card:nth-child(5) p": "Using artificial intelligence tools as a lever for productivity, research, and work improvement.",
            ".service-card:nth-child(6) h3": "Languages and interests",
            ".service-card:nth-child(6) p": "French, English, and a curious, disciplined personal profile shaped by reading, sports, photography, and manga.",
            ".section-title": "Contact me",
            ".contact-info > p": "I am open to internships, opportunities, collaborations, and conversations around electronic payments, payment systems, finance, and software development.",
            ".contact-item:nth-child(3) span": "Benin, Cotonou",
            ".contact-form .btn": "Send message"
        },
        placeholders: {
            "input[name='user_name']": "Your Name",
            "input[name='user_email']": "Your Email",
            "textarea[name='message']": "Your Message"
        },
        projectMeta: {
            gasid: {
                kicker: "Community project",
                title: "Front-end developer - Gasid NGO",
                description: "Responsive website interface designed for a child-support organization, with a strong focus on clarity, readability, and accessible layouts.",
                tags: ["HTML", "CSS", "JavaScript", "Responsive"],
                image: "images/gasid.png"
            },
            stellio: {
                kicker: "Personal project",
                title: "Gas station location mobile app",
                description: "Full-stack project built to help users find gas stations in real time, combining product thinking, business logic, and geolocation features.",
                tags: ["Full stack", "Mobile", "Geolocation", "UX"],
                image: "images/stellio.jpg"
            },
            event: {
                kicker: "Collaborative project",
                title: "Event networking mobile app",
                description: "Front-end contribution to a collaborative mobile experience focused on event networking, user flow quality, and smooth interaction design.",
                tags: ["Mobile", "Front-end", "Collaboration", "UI"]
                ,
                image: "images/event.png"
            },
            "admin-etudiant": {
                kicker: "Document management project",
                title: "Student Admin OCR Portal",
                description: "React application built to manage student records, automate information extraction from scanned enrollment certificates through OCR, and keep data resilient with Firebase, schema validation, and local fallback storage.",
                tags: ["React", "Firebase", "OCR", "Firestore", "Responsive"],
                image: "images/etu.png"
            }
        }
    }
};

function applyTheme(theme) {
    if (theme === "default") {
        document.body.removeAttribute("data-theme");
    } else {
        document.body.setAttribute("data-theme", theme);
    }

    themeButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.theme === theme);
    });

    localStorage.setItem("portfolio-theme", theme);
}

function setContent(selector, content) {
    const element = document.querySelector(selector);
    if (!element) {
        return;
    }

    if (content.includes("<")) {
        element.innerHTML = content;
    } else {
        element.textContent = content;
    }
}

function applyLanguage(language) {
    const dictionary = translations[language] || translations.fr;
    currentLanguage = language;
    document.documentElement.lang = language;
    document.title = dictionary.pageTitle;

    Object.entries(dictionary.text).forEach(([selector, content]) => {
        setContent(selector, content);
    });

    Object.entries(dictionary.placeholders).forEach(([selector, content]) => {
        const field = document.querySelector(selector);
        if (field) {
            field.setAttribute("placeholder", content);
        }
    });

    if (languageToggle) {
        languageToggle.textContent = language.toUpperCase();
        languageToggle.setAttribute(
            "aria-label",
            language === "fr" ? "Changer la langue en anglais" : "Switch language to French"
        );
    }

    if (modalClose) {
        modalClose.setAttribute("aria-label", language === "fr" ? "Fermer" : "Close");
    }

    localStorage.setItem("portfolio-language", language);
    setupServicesMarquee();
}

function setupServicesMarquee() {
    if (!servicesGrid || !servicesMarquee) {
        return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    servicesGrid.querySelectorAll("[data-clone='true']").forEach(card => card.remove());

    if (prefersReducedMotion || window.innerWidth <= 900) {
        servicesGrid.style.animation = "none";
        servicesGrid.style.removeProperty("--marquee-offset");
        servicesGrid.style.removeProperty("--marquee-duration");
        return;
    }

    const originalCards = Array.from(servicesGrid.children);
    const gap = parseFloat(window.getComputedStyle(servicesGrid).columnGap || window.getComputedStyle(servicesGrid).gap || "0");
    const originalWidth = originalCards.reduce((sum, card) => sum + card.offsetWidth, 0) + gap * Math.max(originalCards.length - 1, 0);

    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.dataset.clone = "true";
        clone.setAttribute("aria-hidden", "true");
        servicesGrid.appendChild(clone);
    });

    servicesGrid.style.setProperty("--marquee-offset", `${originalWidth + gap}px`);
    servicesGrid.style.setProperty("--marquee-duration", `${Math.max(16, Math.round(originalWidth / 55))}s`);
    servicesGrid.style.animation = "";
}

function initScrollAnimations() {
    if (revealInitialized) {
        return;
    }

    revealInitialized = true;

    const revealTargets = document.querySelectorAll(`
        .home-p,
        .home-section,
        .home img,
        .about-info,
        .about-info2,
        .about-text p,
        .photo-container,
        .project-card,
        .services-marquee,
        .service-card,
        .contact-content,
        .contact-info,
        .contact-form,
        .section-title
    `);

    revealTargets.forEach((element, index) => {
        element.classList.add("is-reveal");
        element.style.transitionDelay = `${Math.min(index * 0.05, 0.25)}s`;
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealTargets.forEach(element => observer.observe(element));
}

function openProjectModal(projectId) {
    const meta = translations[currentLanguage].projectMeta[projectId];
    if (!meta || !projectModal) {
        return;
    }

    modalImage.src = meta.image;
    modalImage.alt = meta.title;
    modalKicker.textContent = meta.kicker;
    modalTitle.textContent = meta.title;
    modalDescription.textContent = meta.description;
    modalTags.innerHTML = "";

    meta.tags.forEach(tag => {
        const chip = document.createElement("span");
        chip.textContent = tag;
        modalTags.appendChild(chip);
    });

    projectModal.classList.add("open");
    projectModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeProjectModal() {
    if (!projectModal) {
        return;
    }

    projectModal.classList.remove("open");
    projectModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

applyTheme(savedTheme);
applyLanguage(savedLanguage);

if (languageToggle) {
    languageToggle.addEventListener("click", () => {
        const nextLanguage = document.documentElement.lang === "fr" ? "en" : "fr";
        applyLanguage(nextLanguage);
    });
}

if (themeToggle && themeSwitcher) {
    themeToggle.addEventListener("click", () => {
        themeSwitcher.classList.toggle("open");
    });

    document.addEventListener("click", event => {
        if (!themeSwitcher.contains(event.target)) {
            themeSwitcher.classList.remove("open");
        }
    });
}

themeButtons.forEach(button => {
    button.addEventListener("click", () => applyTheme(button.dataset.theme));
});

document.querySelectorAll(".preview-project").forEach(button => {
    button.addEventListener("click", event => {
        event.preventDefault();
        const card = button.closest(".project-card");
        if (card) {
            openProjectModal(card.dataset.project);
        }
    });
});

if (modalClose) {
    modalClose.addEventListener("click", closeProjectModal);
}

if (projectModal) {
    projectModal.addEventListener("click", event => {
        if (event.target.classList.contains("project-modal") || event.target.classList.contains("project-modal-backdrop")) {
            closeProjectModal();
        }
    });
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeProjectModal();
    }
});

window.addEventListener("load", () => {
    const animations = [
        { selector: ".top-tags", class: "from-top", delay: 0 },
        { selector: ".left h1", class: "from-left", delay: 0.2 },
        { selector: ".desc", class: "from-left", delay: 0.4 },
        { selector: ".live-line", class: "from-bottom", delay: 0.6 },
        { selector: ".buttons", class: "zoom-in", delay: 0.8 },
        { selector: ".site-link", class: "from-bottom", delay: 1 },
        { selector: ".right", class: "from-right", delay: 0.4 },
        { selector: ".stats", class: "from-bottom", delay: 1.1 }
    ];

    animations.forEach(item => {
        const element = document.querySelector(item.selector);
        if (element) {
            element.style.animationDelay = `${item.delay}s`;
            element.classList.add(item.class);
        }
    });

    setTimeout(() => {
        const intro = document.getElementById("intro");
        const site = document.getElementById("real-site");

        intro.classList.add("smooth-out");

        setTimeout(() => {
            intro.style.display = "none";
            site.style.display = "block";
            initScrollAnimations();
            setupServicesMarquee();
        }, 900);
    }, 1700);
});

window.addEventListener("resize", setupServicesMarquee);

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".ul-list li");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(item => {
        item.classList.remove("active");
        const link = item.querySelector("a");
        if (link && link.getAttribute("href") === `#${current}`) {
            item.classList.add("active");
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", event => {
        event.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: "smooth"
            });
        }
    });
});
