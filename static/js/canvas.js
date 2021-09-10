const colors = [[0, 88, 198, 0, 50, 0], [120, 88, 198, 0, 50, 0], [240, 88, 198, 0, 50, 0],
    [290, 71, 185, 0, 50, 0], [60, 59, 194, 0, 50, 0], [6, 48, 185, 0, 50, 0], [184, 33, 198, 0, 50, 0]]
const defaultSize = 512

function hsv2rgb(h, s, v) {
    s /= 100
    v /= 255
    let f = (n, k = (n + h / 60) % 6) => (v - v * s * Math.max(Math.min(k, 4 - k, 1), 0)) * 255;
    return [f(5), f(3), f(1)];
}

function generateImage(pixelCount = 'set', margin = 'set', h = 'set', s = 'set', v = 'set', fill = 'set', checkRandom = true) {
    if (pixelCount === 'set')
        pixelCount = +document.querySelector("#count").value
    if (margin === 'set')
        margin = +document.querySelector("#margin").value
    if (fill === 'set')
        fill = +document.querySelector("#fill").value
    fill /= 100
    const pixelSize = Math.trunc(Math.round(defaultSize / pixelCount))
    const imageSize = pixelSize * pixelCount

    const canvas = document.querySelector('#image')
    const ctx = canvas.getContext("2d")
    canvas.height = imageSize
    canvas.width = imageSize
    ctx.beginPath();
    ctx.rect(0, 0, imageSize, imageSize);
    ctx.fillStyle = "white";
    ctx.fill();

    const generateColor = document.querySelector("#random").checked && checkRandom
    if (generateColor) {
        let color = colors[Math.trunc(Math.random() * colors.length)]
        const sliders = document.querySelectorAll(".color")
        for (let i = 0; i < sliders.length; i++) {
            const slider = sliders[i]
            slider.querySelector("input").value = color[i]
            sliderBehaviour(slider)
        }
    }
    if (h === 'set')
        h = +document.querySelector("#canal-h").value
    if (s === 'set')
        s = +document.querySelector("#canal-s").value
    if (v === 'set')
        v = +document.querySelector("#canal-v").value
    const difH = +document.querySelector("#gradient-h").value
    const difS = +document.querySelector("#gradient-s").value
    const difV = +document.querySelector("#gradient-v").value
    const firstColor = hsv2rgb(h, s, v)
    const secondColor = hsv2rgb(h >= 180 ? h - difH : h + difH, s >= 50 ? s - difS : s + difS, v >= 128 ? v - difV : v + difV)


    let image = []
    for (let i = 0; i < pixelCount; i++) {
        image.push([])
        for (let j = 0; j < pixelCount; j++)
            image[i].push(0)
    }
    for (let i = margin; i < pixelCount - margin; i++)
        for (let j = margin; j < (pixelCount + 1) / 2; j++)
            if (Math.random() <= fill)
                image[i][j] = image[i][pixelCount - j - 1] = 1

    ctx.lineWidth = 1
    for (let i = 0; i < imageSize; i++) {
        const offset = i / (imageSize - 1)
        const lineColor = [firstColor[0] * (1 - offset) + secondColor[0] * offset,
            firstColor[1] * (1 - offset) + secondColor[1] * offset,
            firstColor[2] * (1 - offset) + secondColor[2] * offset]
        for (let j = 0; j < pixelCount; j++) {
            if (image[Math.trunc(i / pixelSize)][j]) {
                ctx.beginPath()
                ctx.strokeStyle = `rgb(${lineColor[0]},${lineColor[1]},${lineColor[2]})`
                ctx.moveTo(j * pixelSize, i)
                ctx.lineTo((j + 1) * pixelSize, i)
                ctx.stroke()
                ctx.closePath()
            }
        }
    }
}

window.addEventListener('load', () => generateImage())
button = document.querySelector('#generate')
button.addEventListener('click', () => generateImage())