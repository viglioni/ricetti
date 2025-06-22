import * as O from "fp-ts/Option"
import * as A from "fp-ts/Array"
import { pipe } from "fp-ts/lib/function"
import { getElementById, querySelectorAll } from "../document-utils"

/**
 * Checks if a header element already exists in the document
 * @returns True if a header element exists, false otherwise
 */
const hasHeader = (): boolean => Boolean(document.getElementsByTagName("header").length)

/**
 * Creates and adds a header element to the document if one doesn't already exist
 * The header contains a link back to the index page
 */
export const createHeader = (): void => {
  if (hasHeader()) return

  const header: HTMLElement = document.createElement("header")
  header.classList.add("smallheader")
  const a: HTMLAnchorElement = document.createElement("a")
  a.href = "index.html"
  a.text = "Numismática"
  header.appendChild(a)
  document.body.prepend(header)
}

/**
 * Updates the postamble text in the document, changing "Created" to "Last update"
 */
export const updatePostamble = (): void => {
  const postamble: HTMLElement | null = document.getElementById("postamble")
  if (!postamble) return
  const text: string = postamble.children[1].innerHTML
  document.getElementById("postamble")!.children[1].innerHTML = text.replace(
    "Created",
    "Last update",
  )
}

/**
 * Shows or hides the "go to top" button based on the current scroll position
 * The button appears when the user scrolls down more than 500px
 */
export const showOrHideBtn = (): void => {
  const btn: HTMLElement | null = document.getElementById("upBtn")

  if (!btn) return

  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    btn.classList.add("shown")
    btn.classList.remove("hidden")
    return
  }
  btn.classList.remove("shown")
  btn.classList.add("hidden")
}

/**
 * Scrolls the document smoothly back to the top
 */
const up = (): void => {
  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

/**
 * Creates and adds an "up" button to the document that allows users to scroll back to the top
 * The button is initially hidden and appears when the user scrolls down
 */
export const addUpButton = (): void => {
  const btn: HTMLButtonElement = document.createElement("BUTTON") as HTMLButtonElement
  btn.innerHTML = `<i class="fa-solid fa-chevron-up fa-xl"></i>`
  btn.addEventListener("click", up)
  btn.id = "upBtn"
  btn.classList.add("hidden")
  document.body.appendChild(btn)
}

/**
 * Adds a class to the table of contents based on the first outline container's ID
 * @param toc - The table of contents element to add the class to
 * @returns A function that takes an outline container and returns it after adding the class
 */
const addClassToToc =
  (toc: HTMLElement) =>
  (outlineContainer: HTMLElement): HTMLElement => {
    toc.classList.add(`toc-${outlineContainer.id}`)

    return outlineContainer
  }

/**
 * Identifies the table of contents and adds a class to it based on the first outline container
 * This helps style the TOC appropriately for different page types
 */
export const identifyToc = (): void => {
  const toc = getElementById("table-of-contents")
  if (O.isNone(toc)) return

  pipe(
    "#content > div",
    querySelectorAll,
    A.filter(el => Boolean(el.id.match("outline-container"))),
    A.head,
    O.map(addClassToToc(toc.value)),
  )
}

/**
 * Creates and adds a back button to the content element that navigates to the home page
 * The button contains an image and has the title "voltar" (Portuguese for "back")
 */
export const addBackButton = () => {
  const back = () => {
    location.href = "/"
  }

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
