///////////////
// Up button //
///////////////

export const showOrHideBtn = () => {
  const btn = document.getElementById("upBtn")

  if (!btn) return

  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    btn.classList.add("shown")
    btn.classList.remove("hidden")
    return
  }
  btn.classList.remove("shown")
  btn.classList.add("hidden")
}

const up = () => {
  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

export const addUpButton = () => {
  const btn = document.createElement("BUTTON")
  btn.innerHTML = `<i class="fa-solid fa-chevron-up fa-xl"></i>`
  btn.addEventListener("click", up)
  btn.id = "upBtn"
  btn.classList.add("hidden")
  document.body.appendChild(btn)
}
