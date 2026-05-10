const slider = document.querySelector(".slider");
const sliderTrack = document.getElementById("sliderTrack");
const dots = document.querySelectorAll(".slider-dot");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const sliderPanel = document.getElementById("sliderPanel");
const sliderCategory = document.getElementById("sliderCategory");
const sliderTitle = document.getElementById("sliderTitle");
const sliderText = document.getElementById("sliderText");
const sliderLink = document.getElementById("sliderLink");

const slideContent = [
    {
        category: "SPOJNICE",
        title: "Žičane spojnice",
        text: "Praktične spojnice za brzo i čvrsto povezivanje traka bez komplikovanog procesa montaže.",
        link: "zicane-spojnice.html",
        button: "Pogledaj proizvod"
    },
    {
        category: "SPOJNICE",
        title: "Metalne spojnice",
        text: "Kvalitetne spojnice za sigurno zatvaranje PP i PET traka, namenjene stabilnom pakovanju robe.",
        link: "spojnice.html",
        button: "Pogledaj spojnice"
    },
    {
        category: "PP TRAKE",
        title: "PP trake",
        text: "Ekonomično rešenje za svakodnevno pakovanje lakše i srednje teške robe.",
        link: "pp-trake.html",
        button: "Pogledaj PP trake"
    },
    {
        category: "PET TRAKE",
        title: "PET trake",
        text: "Snažne i izdržljive trake za teže terete, paletizovanu robu i zahtevnije uslove transporta.",
        link: "pet-trake.html",
        button: "Pogledaj PET trake"
    },
    {
        category: "MAŠINE I ALATI",
        title: "Baterijski alat",
        text: "Praktičan baterijski alat za brzo i efikasno vezivanje PP i PET trakom.",
        link: "baterijski-alat.html",
        button: "Pogledaj proizvod"
    },
    {
        category: "RUČNI ALATI",
        title: "Ručni alati",
        text: "Alati za zatezanje, sečenje i zatvaranje traka, pogodni za svakodnevnu upotrebu u pakovanju.",
        link: "rucni-alati.html",
        button: "Pogledaj alate"
    }
];

let originalSlides = sliderTrack
    ? Array.from(sliderTrack.querySelectorAll(".slider-item"))
    : [];

const totalSlides = originalSlides.length;

let currentIndex = 1;
let isTransitioning = false;
let isDragging = false;

if (sliderTrack && totalSlides > 0) {
    const firstClone = originalSlides[0].cloneNode(true);
    const lastClone = originalSlides[totalSlides - 1].cloneNode(true);

    firstClone.classList.add("slider-clone");
    lastClone.classList.add("slider-clone");

    sliderTrack.appendChild(firstClone);
    sliderTrack.insertBefore(lastClone, originalSlides[0]);

    sliderTrack.style.transition = "none";
    sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

    requestAnimationFrame(function () {
        sliderTrack.style.transition = "transform 0.6s ease";
    });
}

function getRealIndex() {
    if (currentIndex === 0) {
        return totalSlides - 1;
    }

    if (currentIndex === totalSlides + 1) {
        return 0;
    }

    return currentIndex - 1;
}

function updateDots() {
    const realIndex = getRealIndex();

    dots.forEach(function (dot) {
        dot.classList.remove("active");
    });

    if (dots[realIndex]) {
        dots[realIndex].classList.add("active");
    }
}

function updatePanel() {
    const realIndex = getRealIndex();
    const content = slideContent[realIndex];

    if (!content || !sliderPanel) return;

    sliderPanel.classList.add("is-changing");

    setTimeout(function () {
        sliderCategory.textContent = content.category;
        sliderTitle.textContent = content.title;
        sliderText.textContent = content.text;
        sliderLink.href = content.link;
        sliderLink.textContent = content.button;

        sliderPanel.classList.remove("is-changing");
    }, 120);
}

function moveSlider(withTransition = true) {
    if (!sliderTrack) return;

    sliderTrack.style.transition = withTransition ? "transform 0.6s ease" : "none";
    sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

    updateDots();
    updatePanel();

    if (withTransition) {
        isTransitioning = true;
    } else {
        isTransitioning = false;
    }
}

function jumpWithoutAnimation() {
    if (!sliderTrack) return;

    sliderTrack.style.transition = "none";
    sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

    sliderTrack.offsetHeight;

    sliderTrack.style.transition = "transform 0.6s ease";
}

function goToNextSlide() {
    if (isTransitioning) return;

    currentIndex++;
    moveSlider(true);
}

function goToPrevSlide() {
    if (isTransitioning) return;

    currentIndex--;
    moveSlider(true);
}

if (nextBtn) {
    nextBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        goToNextSlide();
    });
}

if (prevBtn) {
    prevBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        goToPrevSlide();
    });
}

dots.forEach(function (dot) {
    dot.addEventListener("click", function (event) {
        event.stopPropagation();

        if (isTransitioning) return;

        const targetRealIndex = Number(dot.dataset.index);
        const currentRealIndex = getRealIndex();

        if (targetRealIndex === currentRealIndex) {
            return;
        }

        if (currentRealIndex === 0 && targetRealIndex === totalSlides - 1) {
            currentIndex = 0;
        } else if (currentRealIndex === totalSlides - 1 && targetRealIndex === 0) {
            currentIndex = totalSlides + 1;
        } else {
            currentIndex = targetRealIndex + 1;
        }

        moveSlider(true);
    });
});

if (sliderTrack) {
    sliderTrack.addEventListener("transitionend", function () {
        if (currentIndex === 0) {
            currentIndex = totalSlides;
            jumpWithoutAnimation();
        }

        if (currentIndex === totalSlides + 1) {
            currentIndex = 1;
            jumpWithoutAnimation();
        }

        isTransitioning = false;
    });
}

/* TOUCH / SWIPE ZA TELEFON */

let touchStartX = 0;
let touchStartY = 0;
let touchCurrentX = 0;

if (slider && sliderTrack) {
    slider.addEventListener("touchstart", function (event) {
        const touchedControl = event.target.closest(
            ".slider-btn, .slider-dot, .slider-panel-btn"
        );

        if (touchedControl) {
            isDragging = false;
            return;
        }

        if (isTransitioning) return;

        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
        touchCurrentX = touchStartX;
        isDragging = true;

        sliderTrack.style.transition = "none";
    }, { passive: true });

    slider.addEventListener("touchmove", function (event) {
        if (!isDragging) return;

        touchCurrentX = event.touches[0].clientX;

        const touchCurrentY = event.touches[0].clientY;
        const diffX = touchCurrentX - touchStartX;
        const diffY = touchCurrentY - touchStartY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            event.preventDefault();

            sliderTrack.style.transform = `translateX(calc(-${currentIndex * 100}% + ${diffX}px))`;
        }
    }, { passive: false });

    slider.addEventListener("touchend", function () {
        if (!isDragging) return;

        isDragging = false;

        const diffX = touchCurrentX - touchStartX;
        const swipeLimit = 50;

        if (diffX < -swipeLimit) {
            goToNextSlide();
        } else if (diffX > swipeLimit) {
            goToPrevSlide();
        } else {
            moveSlider(false);
        }
    });

    slider.addEventListener("touchcancel", function () {
        isDragging = false;
        moveSlider(false);
    });
}

updateDots();
updatePanel();