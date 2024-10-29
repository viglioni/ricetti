import { makeCards } from "./js/cards.js"
import { formatPage } from "./js/recipee.js"
import { smoothScrolling } from "./js/smooth-scrolling.js"
import { showOrHideBtn } from "./js/up-button.js"

/////////////////////////////////
// Running after DOM is loaded //
/////////////////////////////////

document.addEventListener("DOMContentLoaded", _e => {
  smoothScrolling()
  makeCards()
  formatPage()
})

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  showOrHideBtn()
}
