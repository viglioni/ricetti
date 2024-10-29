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

export const up = () => {
  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}
