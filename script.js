const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("show");
});

const links = navLinks.querySelectorAll("a");

links.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("show");
    });
});

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    formMessage.textContent = "Thank you for contacting PixelForge Studio!";
    contactForm.reset();
});
