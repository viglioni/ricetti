import * as O from "fp-ts/Option"
import { pipe } from "fp-ts/lib/function"
import {
  addClass,
  getElementById,
  incorrectPage,
  querySelectorAll,
  removeClass,
} from "../document-utils"

export const marinada = () => {
  if (incorrectPage("marinadas")) return null

  // change content styling
  pipe("content", getElementById, O.map(addClass("marinadas-content")))
}
