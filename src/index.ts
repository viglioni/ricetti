import { makeHomePageCards } from "./card"
import {
  addBackButton,
  addUpButton,
  showOrHideBtn,
} from "./components/general-components"
import { optimizeRecipeLayout } from "./recipee"
import { smoothScrolling } from "./smooth-scrolling"

import "./styles/ricetti.scss"

////////////////////
// Function calls //
////////////////////

// Global functions
addUpButton()
smoothScrolling()

// Page related functions
makeHomePageCards()
addBackButton()
optimizeRecipeLayout()

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  showOrHideBtn()
}

// Run on load and resize
window.addEventListener("resize", optimizeRecipeLayout)
