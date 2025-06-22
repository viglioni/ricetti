export const smoothScrolling = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (this: HTMLAnchorElement, e: Event) {
      e.preventDefault()

      const href = this.getAttribute("href")
      const targetElement = href && document.querySelector(href)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })
}
