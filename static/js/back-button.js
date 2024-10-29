const back = () => {
  location.href = "/"
}

export const addBackButton = () => {
  const content = document.getElementById("content")

  if (!content) return null

  const btn = document.createElement("BUTTON")
  btn.addEventListener("click", back)
  btn.id = "back-btn"
  btn.title = "voltar"

  const img = document.createElement("img")
  img.src = "./static/pics/back.svg"

  content.appendChild(btn)
  btn.appendChild(img)
}
