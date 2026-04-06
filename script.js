/* ══════════════════════════════════════
   TBSUMUN 2026 — Enhanced JavaScript
══════════════════════════════════════ */

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
    profile.addEventListener("click", function () {
        if (this.querySelector(".static-card")) return;
        this.classList.toggle("flip");
    });
});

// Close locked cards when clicking outside
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
    block.addEventListener("click", function () {
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
