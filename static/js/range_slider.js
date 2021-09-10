const sliders = document.querySelectorAll(".range-slider")

var characters = {"canal-h": "°", "canal-s": "%", "canal-v": "%"}

function sliderBehaviour(slider) {
    const span = slider.querySelector(".range-slider__value")
    const canal = slider.querySelector(".range-slider__range")
    span.innerHTML = canal.value + characters[canal.name]
}

for (const slider of sliders) {
    sliderBehaviour(slider)
    slider.addEventListener("mousemove", () => sliderBehaviour(slider))
}