const sliders = document.querySelectorAll(".range-slider")

const characters = {
    "canal-h": "°",
    "canal-s": "%",
    "canal-v": "%",
    "gradient-h": "°",
    "gradient-s": "%",
    "gradient-v": "%",
    "count": "x",
    "margin": "x",
    "fill": "%"
}
const mult = {
    "canal-h": 1,
    "canal-s": 1,
    "canal-v": 0.3922,
    "gradient-h": 1,
    "gradient-s": 1,
    "gradient-v": 0.3922,
    "count": 1,
    "margin": 1,
    "fill": 1
}

const stepSettings = {"fill": {"step": 10, "get": 2}}

function checkBoxBehaviour(checkBox) {
    const isDisabled = checkBox.checked
    document.querySelector("#canal-h").disabled = isDisabled
    document.querySelector("#canal-s").disabled = isDisabled
    document.querySelector("#canal-v").disabled = isDisabled
    document.querySelector("#gradient-h").disabled = isDisabled
    document.querySelector("#gradient-s").disabled = isDisabled
    document.querySelector("#gradient-v").disabled = isDisabled
}

function sliderBehaviour(slider) {
    const span = slider.querySelector(".range-slider__value")
    const canal = slider.querySelector(".range-slider__range")
    if (stepSettings.hasOwnProperty(canal.name)) {
        const step = stepSettings[canal.name]["step"]
        const get = stepSettings[canal.name]["get"]
        if (Math.abs(canal.value - Math.round(canal.value / step) * step) <= get)
            canal.value = Math.round(canal.value / step) * step
    }
    span.innerHTML = Math.trunc(canal.value * mult[canal.name]) + characters[canal.name]
    if (canal.name === "count") {
        const parent = slider.parentElement
        const tags = parent.querySelectorAll(".margin_slider")
        marginSpan = tags[1]
        marginCanal = tags[0]
        marginCanal.max = Math.min(Math.trunc((canal.value - 5) / 2), Math.trunc((canal.value - 1) / 3))
        marginCanal.value = Math.min(marginCanal.value, marginCanal.max)
        marginSpan.innerHTML = marginCanal.value + characters[marginCanal.name]
    }
}

for (const slider of sliders) {
    sliderBehaviour(slider)
    slider.addEventListener("input", () => sliderBehaviour(slider))
}

const checkBox = document.querySelector("#random")
checkBoxBehaviour(checkBox)
checkBox.addEventListener("input", () => checkBoxBehaviour(checkBox))