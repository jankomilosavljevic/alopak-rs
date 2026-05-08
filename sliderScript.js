const sliderTrack = document.getElementById("sliderTrack");
const dots = document.querySelectorAll(".slider-dot");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
const totalSlides = dots.length;

function updateSlider() {
    sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach(function (dot) {
        dot.classList.remove("active");
    });

    dots[currentIndex].classList.add("active");
}

nextBtn.addEventListener("click", function () {
    currentIndex++;

    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    updateSlider();
});

prevBtn.addEventListener("click", function () {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    }

    updateSlider();
});

dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
        currentIndex = Number(dot.dataset.index);
        updateSlider();
    });
});