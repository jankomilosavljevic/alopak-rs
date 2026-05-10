(function () {
    const contactModal = document.getElementById("contactModal");

    if (!contactModal) return;

    const contactTriggers = document.querySelectorAll(
        "[data-contact-popup], .contact-btn, a[href*='kontakt']"
    );
    const closeButtons = contactModal.querySelectorAll("[data-contact-close]");
    const dialog = contactModal.querySelector(".contact-modal__dialog");
    let lastFocusedElement = null;

    function openContactModal(event) {
        if (event) {
            event.preventDefault();
        }

        lastFocusedElement = document.activeElement;

        contactModal.classList.add("is-open");
        contactModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("contact-popup-open");

        closeMobileMenu();

        if (dialog) {
            dialog.focus();
        }
    }

    function closeContactModal() {
        contactModal.classList.remove("is-open");
        contactModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("contact-popup-open");

        if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
            lastFocusedElement.focus();
        }
    }

    function closeMobileMenu() {
        const burgerBtn = document.getElementById("burgerBtn");
        const navMenu = document.getElementById("navMenu");
        const openDropdowns = document.querySelectorAll(".has-dropdown.open");

        if (burgerBtn) {
            burgerBtn.classList.remove("active");
        }

        if (navMenu) {
            navMenu.classList.remove("active");
        }

        openDropdowns.forEach(function (dropdown) {
            dropdown.classList.remove("open");
        });
    }

    contactTriggers.forEach(function (trigger) {
        trigger.addEventListener("click", openContactModal);
    });

    closeButtons.forEach(function (button) {
        button.addEventListener("click", closeContactModal);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && contactModal.classList.contains("is-open")) {
            closeContactModal();
        }
    });
})();
