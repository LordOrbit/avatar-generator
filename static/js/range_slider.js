const sliders = document.querySelectorAll(".range-slider")

const characters = {"canal-h": "°", "canal-s": "%", "canal-v": "%", "count": "x", "margin": "x"}
const mult = {"canal-h" : 1, "canal-s": 1, "canal-v": 0.3922, "count": 1, "margin": 1}

function sliderBehaviour(slider) {
    const span = slider.querySelector(".range-slider__value")
    const canal = slider.querySelector(".range-slider__range")
    span.innerHTML = Math.trunc(canal.value * mult[canal.name]) + characters[canal.name]
    if (canal.name === "count"){
        const parent = slider.parentElement
        const tags = parent.querySelectorAll(".margin_slider")
        marginSpan = tags[1]
        marginCanal = tags[0]
        marginCanal.max = Math.trunc((canal.value - 1) / 2)
        marginCanal.value = Math.min(marginCanal.value, marginCanal.max)
        marginSpan.innerHTML = marginCanal.value + characters[marginCanal.name]
        console.log(marginSpan)
        console.log(marginCanal)
    }
}

for (const slider of sliders) {
    sliderBehaviour(slider)
    slider.addEventListener("oninput", () => sliderBehaviour(slider))
}
