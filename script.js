
window.addEventListener("load",function(){
    document.getElementById("loader").classList.add("fade-out");
    setTimeout(()=>{document.getElementById("loader").style.display="none";},800);
});

function toggleMenu(){
    document.getElementById("nav-links").classList.toggle("active");
}

// Close menu when scrolling
window.addEventListener("scroll", function () {
    document.getElementById("nav-links").classList.remove("active");
});

const eventDate = new Date("July 11, 2026 00:00:00").getTime();
setInterval(function(){
    const now = new Date().getTime();
    const distance = eventDate - now;
    document.getElementById("days").innerHTML = Math.floor(distance/(1000*60*60*24));
    document.getElementById("hours").innerHTML = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
    document.getElementById("minutes").innerHTML = Math.floor((distance%(1000*60*60))/(1000*60));
    document.getElementById("seconds").innerHTML = Math.floor((distance%(1000*60))/1000);
},1000);



let lastScroll = 0;
const navbar = document.querySelector("nav");
const navLinks = document.getElementById("nav-links");

window.addEventListener("scroll", () => {
    let currentScroll = window.pageYOffset;

    
    if (currentScroll <= 50) {
        navbar.style.top = "0";
        return;
    }

    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.top = "-120px";
        navLinks.classList.remove("active");
    } else {
        // Scrolling up
        navbar.style.top = "0";
    }

    lastScroll = currentScroll;
});



window.addEventListener("scroll", function() {
    const nav = document.querySelector("nav");
    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});



function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
 



document.querySelectorAll(".profile").forEach(profile => {
    profile.addEventListener("click", function() {
        this.classList.toggle("flip");
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const grandLogo = document.querySelector(".grand-logo");

    if (grandLogo) {
        grandLogo.addEventListener("click", function () {
            grandLogo.classList.toggle("active");
        });
    }
});



   const toggleBtn = document.getElementById("secretariatToggle");
const sec2026 = document.getElementById("sec2026");
const sec2025 = document.getElementById("sec2025");
const section = document.getElementById("secretariat");

toggleBtn.addEventListener("click", () => {

    if (sec2026.classList.contains("hidden")) {
        sec2026.classList.remove("hidden");
        sec2025.classList.add("hidden");
        toggleBtn.textContent = "TBSUMUN 2025 Secretariat";
    } else {
        sec2026.classList.add("hidden");
        sec2025.classList.remove("hidden");
        toggleBtn.textContent = "TBSUMUN 2026 Secretariat";
    }

    // 🔹 Accurate Scroll Fix
    const navbar = document.querySelector("nav");
    const navbarHeight = navbar.offsetHeight;

    const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({
        top: sectionTop - navbarHeight - 10,
        behavior: "smooth"
    });

});

