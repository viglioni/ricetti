const back = () => {
  location.href = "/"
}

export const addBackButton = () => {
  const btn = document.createElement("BUTTON")
  btn.addEventListener("click", back)
  btn.id = "back-btn"

  const img = document.createElement("img")
  img.src = "./static/pics/back.svg"

  const content = document.getElementById("content")
  content.appendChild(btn)
  btn.appendChild(img)
}
