const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const submitButton = document.getElementById("submitButton");
const projectDialog = document.getElementById("project-dialog");
const projectDialogTitle = document.getElementById("projectDialogTitle");
const projectDialogType = document.getElementById("projectDialogType");
const projectDialogDescription = document.getElementById("projectDialogDescription");
const projectDialogFocus = document.getElementById("projectDialogFocus");
const projectDialogClose = document.querySelector(".project-dialog-close");
const projectCards = document.querySelectorAll("[data-project]");
let lastFocusedProjectCard = null;

const projectDetails = {
    brewhaus: {
        title: "BrewHaus Caf\u00e9",
        type: "Business Website",
        description: "A modern website concept for a local caf\u00e9, designed to showcase its menu, location, opening hours and brand identity in a simple, polished layout.",
        focus: "Clear navigation, menu presentation, brand identity and contact information."
    },
    fitspace: {
        title: "FitSpace",
        type: "Landing Page",
        description: "A focused landing-page concept for a fitness business designed to introduce its services, highlight membership benefits and encourage visitors to make an enquiry.",
        focus: "Strong call-to-action, service presentation, clear messaging and simple user journey."
    },
    bloom: {
        title: "Bloom & Co.",
        type: "Website Redesign",
        description: "A website redesign concept for a small lifestyle brand, improving an outdated layout with clearer information, stronger visual hierarchy and better usability.",
        focus: "Cleaner layout, improved usability, stronger visual hierarchy and refreshed branding."
    }
};
const successMessage = "Thanks for reaching out! Your enquiry has been received. PixelForge Studio will get back to you within 1–2 business days to discuss your website requirements.";
const failureMessage = "Something went wrong. Please try again or contact us by email.";

function closeMenu() {
    navLinks.classList.remove("show");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

function openMenu() {
    navLinks.classList.add("show");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.contains("show");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    const links = navLinks.querySelectorAll("a");

    links.forEach(function (link) {
        link.addEventListener("click", function () {
            closeMenu();
        });
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && navLinks.classList.contains("show")) {
            closeMenu();
            menuToggle.focus();
        }
    });
}

function openProjectDialog(projectKey, trigger) {
    const project = projectDetails[projectKey];

    if (!project || !projectDialog) {
        return;
    }

    lastFocusedProjectCard = trigger;
    projectDialogTitle.textContent = project.title;
    projectDialogType.textContent = "Project Type: " + project.type;
    projectDialogDescription.textContent = project.description;
    projectDialogFocus.textContent = project.focus;
    document.body.classList.add("modal-open");

    if (typeof projectDialog.showModal === "function") {
        projectDialog.showModal();
    } else {
        projectDialog.setAttribute("open", "");
    }

    if (projectDialogClose) {
        projectDialogClose.focus();
    }
}

function closeProjectDialog() {
    if (!projectDialog || !projectDialog.open) {
        return;
    }

    if (typeof projectDialog.close === "function") {
        projectDialog.close();
    } else {
        projectDialog.removeAttribute("open");
        document.body.classList.remove("modal-open");

        if (lastFocusedProjectCard) {
            lastFocusedProjectCard.focus();
        }
    }
}

if (projectDialog && projectCards.length) {
    projectCards.forEach(function (card) {
        card.addEventListener("click", function (event) {
            event.preventDefault();
            openProjectDialog(card.dataset.project, card);
        });
    });

    if (projectDialogClose) {
        projectDialogClose.addEventListener("click", closeProjectDialog);
    }

    projectDialog.addEventListener("click", function (event) {
        if (event.target === projectDialog) {
            closeProjectDialog();
        }
    });

    projectDialog.addEventListener("close", function () {
        document.body.classList.remove("modal-open");

        if (lastFocusedProjectCard) {
            lastFocusedProjectCard.focus();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && projectDialog.open) {
            closeProjectDialog();
        }
    });
}

function showFieldError(field, message) {
    const formRow = field.closest(".form-row");
    const errorElement = document.getElementById(field.getAttribute("aria-describedby"));

    formRow.classList.add("has-error");
    field.setAttribute("aria-invalid", "true");
    errorElement.textContent = message;
}

function clearFieldError(field) {
    const formRow = field.closest(".form-row");
    const errorElement = document.getElementById(field.getAttribute("aria-describedby"));

    formRow.classList.remove("has-error");
    field.removeAttribute("aria-invalid");
    errorElement.textContent = "";
}

function validateContactForm() {
    const name = contactForm.querySelector("#name");
    const email = contactForm.querySelector("#email");
    const message = contactForm.querySelector("#message");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    [name, email, message].forEach(clearFieldError);

    if (!name.value.trim()) {
        showFieldError(name, "Please enter your name.");
        isValid = false;
    }

    if (!email.value.trim()) {
        showFieldError(email, "Please enter your email address.");
        isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
        showFieldError(email, "Please enter a valid email address.");
        isValid = false;
    }

    if (!message.value.trim()) {
        showFieldError(message, "Please enter your message.");
        isValid = false;
    }

    if (!isValid) {
        const firstInvalidField = contactForm.querySelector("[aria-invalid='true']");

        if (firstInvalidField) {
            firstInvalidField.focus();
        }
    }

    return isValid;
}

function setFormState(state, message) {
    formMessage.classList.toggle("error", state === "error");
    formMessage.textContent = message;

    if (state === "submitting") {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
    } else {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
    }
}

if (contactForm && formMessage && submitButton) {
    contactForm.addEventListener("input", function (event) {
        if (event.target.matches("input, textarea")) {
            clearFieldError(event.target);
            formMessage.textContent = "";
            formMessage.classList.remove("error");
        }
    });

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (submitButton.disabled) {
            return;
        }

        if (!validateContactForm()) {
            setFormState("error", "Please fix the highlighted fields before sending.");
            return;
        }

        setFormState("submitting", "Sending your message...");

        const endpoint = contactForm.getAttribute("action");

        if (endpoint) {
            fetch(endpoint, {
                method: contactForm.method || "POST",
                body: new FormData(contactForm),
                headers: {
                    Accept: "application/json"
                }
            })
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error("Form submission failed.");
                    }

                    setFormState("success", successMessage);
                    contactForm.reset();
                })
                .catch(function () {
                    setFormState("error", failureMessage);
                });

            return;
        }

        window.setTimeout(function () {
            setFormState("success", successMessage);
            contactForm.reset();
        }, 700);
    });
}
