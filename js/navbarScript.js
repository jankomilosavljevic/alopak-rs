
const burgerBtn = document.getElementById("burgerBtn");
const navMenu = document.getElementById("navMenu");
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

burgerBtn.addEventListener("click", function () {
    burgerBtn.classList.toggle("active");
    navMenu.classList.toggle("active");

    if (!navMenu.classList.contains("active")) {
        closeAllDropdowns();
    }
});

dropdownToggles.forEach(function (toggle) {
    toggle.addEventListener("click", function (event) {
        if (window.innerWidth <= 1375) {
            event.preventDefault();

            const currentDropdown = toggle.closest(".has-dropdown");
            const isAlreadyOpen = currentDropdown.classList.contains("open");

            closeAllDropdowns();

            if (!isAlreadyOpen) {
                currentDropdown.classList.add("open");
            }
        }
    });
});

document.addEventListener("click", function (event) {
    if (window.innerWidth <= 1375) {
        const clickedInsideMenu = event.target.closest(".nav-menu");
        const clickedBurger = event.target.closest(".burger-btn");

        if (!clickedInsideMenu && !clickedBurger) {
            navMenu.classList.remove("active");
            burgerBtn.classList.remove("active");
            closeAllDropdowns();
        }
    }
});

window.addEventListener("resize", function () {
    if (window.innerWidth > 1375) {
        navMenu.classList.remove("active");
        burgerBtn.classList.remove("active");
        closeAllDropdowns();
    }
});

function closeAllDropdowns() {
    const openDropdowns = document.querySelectorAll(".has-dropdown.open");

    openDropdowns.forEach(function (dropdown) {
        dropdown.classList.remove("open");
    });
}