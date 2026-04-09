

// ── LOADER ──
window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.classList.add("fade-out");
        document.body.classList.remove("loading");
        document.documentElement.classList.remove("loading");
        setTimeout(() => { loader.style.display = "none"; }, 800);
    }, 600);
});

// ── MOBILE MENU ──
function toggleMenu() {
    const nav = document.getElementById("nav-links");
    nav.classList.toggle("active");
}

// Close menu on scroll
window.addEventListener("scroll", function () {
    document.getElementById("nav-links").classList.remove("active");
});

// Close menu when a nav link is clicked
document.querySelectorAll("#nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("nav-links").classList.remove("active");
    });
});

// ── NAVBAR HIDE/SHOW ON SCROLL ──
let lastScroll = 0;
const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class
    if (currentScroll > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    // Hide/show on direction
    if (currentScroll <= 80) {
        navbar.style.top = "0";
        lastScroll = currentScroll;
        return;
    }

    if (currentScroll > lastScroll + 5) {
        navbar.style.top = "-110px";
        document.getElementById("nav-links").classList.remove("active");
    } else if (currentScroll < lastScroll - 5) {
        navbar.style.top = "0";
    }

    lastScroll = currentScroll;
});

// ── COUNTDOWN ──
const eventDate = new Date("July 11, 2026 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
        return;
    }

    const days    = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = n => String(n).padStart(2, "0");

    setWithFlip("days",    pad(days));
    setWithFlip("hours",   pad(hours));
    setWithFlip("minutes", pad(minutes));
    setWithFlip("seconds", pad(seconds));
}

// Smooth number flip animation
function setWithFlip(id, value) {
    const el = document.getElementById(id);
    if (el && el.innerHTML !== value) {
        el.style.transform = "translateY(-4px)";
        el.style.opacity = "0.6";
        setTimeout(() => {
            el.innerHTML = value;
            el.style.transform = "translateY(0)";
            el.style.opacity = "1";
            el.style.transition = "transform 0.2s ease, opacity 0.2s ease";
        }, 150);
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ── SCROLL REVEAL ──
function revealOnScroll() {
    document.querySelectorAll(".reveal").forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 80) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll, { passive: true });
window.addEventListener("load", revealOnScroll);

// ── PROFILE FLIP CARDS ──
// Desktop: hover flips via CSS; click toggles a locked-flip state
// Mobile:  tap toggles flip (no hover)
document.querySelectorAll(".profile").forEach(profile => {
    profile.addEventListener("click", function (e) {
        if (this.querySelector(".static-card")) return;
        e.stopPropagation();
        this.classList.toggle("flip");
    });
});

// Close flipped cards when clicking outside
document.addEventListener("click", function (e) {
    if (!e.target.closest(".profile")) {
        document.querySelectorAll(".profile.flip").forEach(p => p.classList.remove("flip"));
    }
});

// ── GRAND LOGO CLICK ──
document.addEventListener("DOMContentLoaded", function () {
    const grandLogo = document.querySelector(".grand-logo");
    if (grandLogo) {
        grandLogo.addEventListener("click", function () {
            grandLogo.classList.toggle("active");
        });
    }
});

// ── SECRETARIAT TOGGLE ──
const toggleBtn = document.getElementById("secretariatToggle");
const sec2026   = document.getElementById("sec2026");
const sec2025   = document.getElementById("sec2025");
const secretariatSection = document.getElementById("secretariat");

toggleBtn.addEventListener("click", () => {
    secretariatSection.scrollIntoView({ behavior: "smooth", block: "start" });

    setTimeout(() => {
        const showing2026 = !sec2026.classList.contains("hidden");
        const current  = showing2026 ? sec2026 : sec2025;
        const next     = showing2026 ? sec2025 : sec2026;

        current.classList.add("fade-out");

        setTimeout(() => {
            current.classList.add("hidden");
            current.classList.remove("fade-out");

            next.classList.remove("hidden");
            next.classList.add("fade-in");

            toggleBtn.textContent = showing2026
                ? "View TBSUMUN 2026 Secretariat"
                : "View TBSUMUN 2025 Secretariat";

            setTimeout(() => { next.classList.remove("fade-in"); }, 400);
        }, 400);
    }, 500);
});

// ── COMMITTEE BLOCK CLICK LOCK ──
document.querySelectorAll(".committee-block").forEach(block => {
    block.addEventListener("click", function (e) {
        e.stopPropagation();
        this.classList.toggle("locked");
    });
});

// ── SMOOTH ANCHOR LINKS ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// ── GALLERY LIGHTBOX ──
(function () {
    const lightbox = document.createElement("div");
    lightbox.className = "gallery-lightbox";
    lightbox.innerHTML = `
        <button class="gallery-lightbox-close" aria-label="Close">&times;</button>
        <button class="gallery-lightbox-nav gallery-lightbox-prev" aria-label="Previous">&#8592;</button>
        <img src="" alt="Gallery photo">
        <button class="gallery-lightbox-nav gallery-lightbox-next" aria-label="Next">&#8594;</button>
    `;
    document.body.appendChild(lightbox);

    const lbImg   = lightbox.querySelector("img");
    const lbClose = lightbox.querySelector(".gallery-lightbox-close");
    const lbPrev  = lightbox.querySelector(".gallery-lightbox-prev");
    const lbNext  = lightbox.querySelector(".gallery-lightbox-next");

    let images = [];
    let current = 0;

    function getImages() {
        return [...document.querySelectorAll(".gallery-item img")]
            .filter(img => img.src && img.getAttribute("src") !== "");
    }

    function open(index) {
        images = getImages();
        if (!images.length) return;
        current = index;
        lbImg.src = images[current].src;
        lbImg.alt = images[current].alt;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function close() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
        setTimeout(() => { lbImg.src = ""; }, 300);
    }

    function navigate(dir) {
        images = getImages();
        current = (current + dir + images.length) % images.length;
        lbImg.style.opacity = "0";
        setTimeout(() => {
            lbImg.src = images[current].src;
            lbImg.alt = images[current].alt;
            lbImg.style.opacity = "1";
        }, 150);
        lbImg.style.transition = "opacity 0.15s ease";
    }

    document.querySelectorAll(".gallery-item").forEach((item) => {
        item.addEventListener("click", () => {
            const imgs = getImages();
            const img  = item.querySelector("img");
            const idx  = imgs.indexOf(img);
            if (idx !== -1) open(idx);
        });
    });

    lbClose.addEventListener("click", close);
    lbPrev.addEventListener("click",  () => navigate(-1));
    lbNext.addEventListener("click",  () => navigate(1));
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });

    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("active")) return;
        if (e.key === "Escape")     close();
        if (e.key === "ArrowLeft")  navigate(-1);
        if (e.key === "ArrowRight") navigate(1);
    });
})();

// ── SCROLL PROGRESS BAR ──
const progressBar = document.getElementById("scroll-progress");
if (progressBar) {
    window.addEventListener("scroll", () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        progressBar.style.width = (scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0) + "%";
    }, { passive: true });
}

// ── BACK TO TOP ──
const backToTop = document.getElementById("back-to-top");
if (backToTop) {
    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("visible", window.pageYOffset > 400);
    }, { passive: true });
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// ── MOBILE DRAWER ──
(function () {
    const toggleBtn  = document.getElementById("menuToggleBtn");
    const drawer     = document.getElementById("nav-drawer");
    const overlay    = document.getElementById("nav-overlay");
    const closeBtn   = document.getElementById("nav-drawer-close");

    if (!toggleBtn || !drawer || !overlay || !closeBtn) return;

    function open() {
        drawer.classList.add("open");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
        toggleBtn.setAttribute("aria-expanded", "true");
    }

    function close() {
        drawer.classList.remove("open");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
        toggleBtn.setAttribute("aria-expanded", "false");
    }

    toggleBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", close);

    document.querySelectorAll(".drawer-link, .drawer-register").forEach(link => {
        link.addEventListener("click", close);
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") close();
    });
})();

// ── DESKTOP DROPDOWN NAV ──
document.querySelectorAll(".nav-dropdown").forEach(dropdown => {
    // Click to toggle (touch-friendly) — desktop only
    dropdown.addEventListener("click", function (e) {
        if (window.innerWidth <= 1024) return; // skip on mobile, drawer handles nav
        // Only toggle if clicking the trigger itself, not a child link
        if (e.target.closest(".nav-dropdown-menu")) return;
        const isOpen = this.classList.contains("open");
        document.querySelectorAll(".nav-dropdown.open").forEach(d => d.classList.remove("open"));
        if (!isOpen) this.classList.add("open");
        e.stopPropagation();
    });
});

// Strip any open dropdowns when resizing to mobile
window.addEventListener("resize", () => {
    if (window.innerWidth <= 1024) {
        document.querySelectorAll(".nav-dropdown.open").forEach(d => d.classList.remove("open"));
    }
}, { passive: true });

// Close dropdowns when clicking outside
document.addEventListener("click", () => {
    document.querySelectorAll(".nav-dropdown.open").forEach(d => d.classList.remove("open"));
});

// ── ACTIVE NAV HIGHLIGHT ON SCROLL ──
(function () {
    const sections = [
        "principal", "muncoordinator", "about-tbsumun", "committees",
        "secretariat", "eb", "contact", "prizes", "itinerary",
        "venue", "materials", "gallery"
    ];
    const allNavLinks = document.querySelectorAll(
        "#nav-links a[href^='#'], .nav-dropdown-menu a[href^='#'], .drawer-link[href^='#']"
    );

    function updateActiveNav() {
        let current = "";
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const rect = el.getBoundingClientRect();
            if (rect.top <= 120 && rect.bottom > 120) current = id;
        });
        allNavLinks.forEach(link => {
            link.classList.toggle("nav-active", link.getAttribute("href") === "#" + current);
        });
    }

    window.addEventListener("scroll", updateActiveNav, { passive: true });
    window.addEventListener("load", updateActiveNav);
})();

// ── ITINERARY TABS ──
document.querySelectorAll(".itinerary-tab").forEach(tab => {
    tab.addEventListener("click", function () {
        document.querySelectorAll(".itinerary-tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".itinerary-panel").forEach(p => p.classList.remove("active"));
        this.classList.add("active");
        const panel = document.getElementById(this.getAttribute("data-day"));
        if (panel) panel.classList.add("active");
    });
});

// ── HERO PARTICLES ──
(function () {
    const canvas = document.getElementById("hero-particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, particles = [];
    const COUNT = 55;

    function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    function rand(a, b) { return Math.random() * (b - a) + a; }

    function mkParticle() {
        return {
            x: rand(0, W), y: rand(0, H),
            r: rand(0.6, 2.2),
            color: Math.random() > 0.4
                ? `rgba(198,167,94,${rand(0.08, 0.28)})`
                : `rgba(255,255,255,${rand(0.04, 0.14)})`,
            vx: rand(-0.18, 0.18), vy: rand(-0.28, -0.06),
            life: rand(0, 1), pulse: rand(0.004, 0.009)
        };
    }

    for (let i = 0; i < COUNT; i++) particles.push(mkParticle());

    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            p.life += p.pulse;
            if (p.life > 1) p.life = 0;
            const alpha = Math.sin(p.life * Math.PI);
            const base  = p.color.replace(/[\d.]+\)$/, "");
            const max   = parseFloat(p.color.match(/([\d.]+)\)$/)[1]);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = base + (max * alpha) + ")";
            ctx.fill();
            p.x += p.vx; p.y += p.vy;
            if (p.y < -5) { p.y = H + 5; p.x = rand(0, W); }
            if (p.x < -5) p.x = W + 5;
            if (p.x > W + 5) p.x = -5;
        });
        requestAnimationFrame(draw);
    }
    draw();
})();
