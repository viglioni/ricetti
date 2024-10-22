import { makeCards } from "./js/cards.js"
import { smoothScrolling } from "./js/smooth-scrolling.js"
import { addUpButton, showOrHideBtn } from "./js/up-button.js"

/////////////////////////////////
// Running after DOM is loaded //
/////////////////////////////////

document.addEventListener("DOMContentLoaded", _e => {
  smoothScrolling()
  addUpButton()
  makeCards()
})

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  showOrHideBtn()
}
