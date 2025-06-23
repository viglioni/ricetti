import * as O from "fp-ts/Option"
import { pipe } from "fp-ts/function"
import { querySelector } from "./document-utils"

export const optimizeRecipeLayout = (): void => {
  // const content = querySelector(".content")
  // const about = querySelector("#outline-container-sobre")
  // const ingredients = querySelector("#outline-container-ingredientes")
  // const preparation = querySelector("#outline-container-modo-de-preparo")
  // if (
  //   O.isNone(content) ||
  //   O.isNone(about) ||
  //   O.isNone(ingredients) ||
  //   O.isNone(preparation)
  // )
  //   return
  // const contentEl = content.value
  // const aboutEl = about.value
  // const ingredientsEl = ingredients.value
  // const prepEl = preparation.value
  // const measureHeight = (el: HTMLElement): number => {
  //   const originalHeight = el.style.height
  //   const originalPosition = el.style.position
  //   const originalVisibility = el.style.visibility
  //   el.style.height = "auto"
  //   el.style.position = "static"
  //   el.style.visibility = "visible"
  //   const height = el.scrollHeight
  //   el.style.height = originalHeight
  //   el.style.position = originalPosition
  //   el.style.visibility = originalVisibility
  //   return height
  // }
  // const aboutHeight = measureHeight(aboutEl)
  // const ingredientsHeight = measureHeight(ingredientsEl)
  // const prepHeight = measureHeight(prepEl)
  // contentEl.classList.remove("layout-1", "layout-2", "layout-3", "layout-4")
  // if (window.innerWidth < 700) {
  //   contentEl.classList.add("layout-3")
  // } else if (aboutHeight < 100 && Math.abs(ingredientsHeight - prepHeight) < 50) {
  //   contentEl.classList.add("layout-4")
  // } else if (aboutHeight + ingredientsHeight < prepHeight * 1.5) {
  //   contentEl.classList.add("layout-1")
  // } else if (ingredientsHeight + prepHeight < aboutHeight * 1.5) {
  //   contentEl.classList.add("layout-2")
  // } else {
  //   contentEl.classList.add("layout-3")
  // }
}
