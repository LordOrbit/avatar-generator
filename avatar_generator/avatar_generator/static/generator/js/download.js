function download_img (el) {
    const canvas = document.querySelector("#image")
    const file_name = `image_${Math.trunc(Math.random() * 10000000)}.png`
    el.parentElement.download = file_name
    el.parentElement.href = canvas.toDataURL("image/png")
}

button = document.querySelector("#download")
button.addEventListener("click", () => download_img(button))
