// ALOPAK – navigacija: burger, harmonika dropdown (mobilni), aria stanja
document.addEventListener("DOMContentLoaded", function () {

    const burgerBtn = document.getElementById("burgerBtn");
    const navMenu = document.getElementById("navMenu");
    const MOBILE_BREAKPOINT = 980;

    if (!burgerBtn || !navMenu) return;

    function isMobile() {
        return window.innerWidth <= MOBILE_BREAKPOINT;
    }

    function closeAllDropdowns(except) {
        document.querySelectorAll(".has-dropdown.open").forEach(function (dropdown) {
            if (!except || !dropdown.contains(except)) {
                dropdown.classList.remove("open");
                const toggle = dropdown.querySelector(":scope > a");
                if (toggle) toggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    function closeMenu() {
        navMenu.classList.remove("active");
        burgerBtn.classList.remove("active");
        burgerBtn.setAttribute("aria-expanded", "false");
        closeAllDropdowns();
    }

    /* BURGER */
    burgerBtn.addEventListener("click", function () {
        const opening = !navMenu.classList.contains("active");

        navMenu.classList.toggle("active", opening);
        burgerBtn.classList.toggle("active", opening);
        burgerBtn.setAttribute("aria-expanded", opening ? "true" : "false");

        if (!opening) closeAllDropdowns();
    });

    /* DROPDOWN – na mobilnom klik otvara harmoniku umesto linka */
    document.querySelectorAll(".has-dropdown > a").forEach(function (toggle) {
        toggle.addEventListener("click", function (event) {
            if (!isMobile()) return;

            event.preventDefault();

            const parent = toggle.closest(".has-dropdown");
            const isOpen = parent.classList.contains("open");

            closeAllDropdowns(parent);
            parent.classList.toggle("open", !isOpen);
            toggle.setAttribute("aria-expanded", String(!isOpen));
        });
    });

    /* KLIK VAN MENIJA */
    document.addEventListener("click", function (event) {
        if (!isMobile()) return;

        if (!event.target.closest(".nav-menu") &&
            !event.target.closest(".burger-btn")) {
            closeMenu();
        }
    });

    /* ESCAPE zatvara meni */
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    /* RESIZE RESET */
    window.addEventListener("resize", function () {
        if (!isMobile()) closeMenu();
    });
});
