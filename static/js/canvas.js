const imageMapSize = 11
const pixelSize = 46
const imageSize = pixelSize * imageMapSize
const colors = [[225, 30, 30], [30, 225, 30], [30, 30, 225],
    [190, 60, 210], [220, 220, 90], [210, 120, 110], [150, 220, 225]]

function rgb2hsv(r, g, b) {
    let v = Math.max(r, g, b), c = v - Math.min(r, g, b);
    let h = c && ((v === r) ? (g - b) / c : ((v === g) ? 2 + (b - r) / c : 4 + (r - g) / c));
    return [60 * (h < 0 ? h + 6 : h), v && c / v, v];
}

function hsv2rgb(h, s, v) {
    let f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
    return [f(5), f(3), f(1)];
}

function generateImage(imageSize, imageMapSize, h = 'set', s = 10, v = 30, color = 'random') {
    const canvas = document.querySelector('#image')
    const ctx = canvas.getContext("2d")
    canvas.height = imageSize
    canvas.width = imageSize

    if (color === 'random')
        color = colors[Math.trunc(Math.random() * colors.length)]
    color = rgb2hsv(color[0], color[1], color[2])
    if (h === 'set')
        h = +document.querySelector("#canal-h").value
    color[0] = h
    s /= 100
    const firstColor = hsv2rgb(color[0], color[1], color[2])
    const secondColor = hsv2rgb(color[1] >= 180 ? color[0] - h : color[0] + h, color[1] >= .5 ? color[1] - s : color[1] + s, color[2] >= 125 ? color[2] - v : color[2] + v)

    let image = []
    for (let i = 0; i < imageMapSize; i++) {
        image.push([])
        for (let j = 0; j < imageMapSize; j++)
            image[i].push(0)
    }
    for (let i = 0; i < imageMapSize; i++)
        for (let j = 0; j < (imageMapSize + 1) / 2; j++)
            image[i][j] = image[i][imageMapSize - j - 1] = Math.trunc((Math.random() * 2))

    ctx.lineWidth = 1
    for (let i = 0; i < imageSize; i++) {
        const offset = i / (imageSize - 1)
        const lineColor = [firstColor[0] * (1 - offset) + secondColor[0] * offset,
            firstColor[1] * (1 - offset) + secondColor[1] * offset,
            firstColor[2] * (1 - offset) + secondColor[2] * offset]
        for (let j = 0; j < imageMapSize; j++) {
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

window.addEventListener('load', () => generateImage(imageSize, imageMapSize))
button = document.querySelector('#generate')
button.addEventListener('click', () => generateImage(imageSize, imageMapSize))