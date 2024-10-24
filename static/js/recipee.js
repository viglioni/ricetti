import "./enhanced-js.js"

export const formatPage = () => {
  const content = document.getElementById("content")

  content && content.classList.add("content-background")

  const isMulti = document.getElementsByClassName("multirecipee").toArray()

  if (isMulti.isEmpty()) {
    return null
  }
  content.style.gridTemplateAreas = ["header", "multirecipees"]
  content.classList.remove("content")

  document
    .getElementsByClassName("outline-2")
    .toArray()
    .forEach(el => el.classList.add("content"))
}
