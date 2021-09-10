const colors = [[225, 30, 30], [30, 225, 30], [30, 30, 225],
    [190, 60, 210], [220, 220, 90], [210, 120, 110], [150, 220, 225]]
const defaultSize = 512

function hsv2rgb(h, s, v) {
    s /= 100
    v /= 255
    let f = (n, k = (n + h / 60) % 6) => (v - v * s * Math.max(Math.min(k, 4 - k, 1), 0)) * 255;
    return [f(5), f(3), f(1)];
}

function generateImage(pixelCount = 'set', margin = 'set', h = 'set', s = 'set', v = 'set') {
    if (pixelCount === 'set')
        pixelCount = +document.querySelector("#count").value
    if (margin === 'set')
        margin = +document.querySelector("#margin").value
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

    if (h === 'set')
        h = +document.querySelector("#canal-h").value
    if (s === 'set')
        s = +document.querySelector("#canal-s").value
    if (v === 'set')
        v = +document.querySelector("#canal-v").value
    const difH = 40
    const difS = 10
    const difV = 30
    const firstColor = hsv2rgb(h, s, v)
    const secondColor = hsv2rgb(h >= 180 ? h - difH : h + difH, s >= 50 ? s - difS : s + difS, v >= 125 ? v - difV : v + difV)

    let image = []
    for (let i = 0; i < pixelCount; i++) {
        image.push([])
        for (let j = 0; j < pixelCount; j++)
            image[i].push(0)
    }
    for (let i = margin; i < pixelCount - margin; i++)
        for (let j = margin; j < (pixelCount + 1) / 2; j++)
            image[i][j] = image[i][pixelCount - j - 1] = Math.trunc((Math.random() * 2))

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
