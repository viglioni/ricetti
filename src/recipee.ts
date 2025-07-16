import * as A from "fp-ts/Array"
import { pipe } from "fp-ts/lib/function"

import { createAndAppendBelow, log, querySelectorAll } from "./document-utils"

const addDots = (row: HTMLElement) =>
  pipe(
    row,
    el => el.firstElementChild as HTMLElement,
    createAndAppendBelow("td", {
      classList: "ingredient-dots",
      innerHTML: " . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ",
      style: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        flex: "1",
      },
    }),
  )

export const leadingDots = () => {
  pipe("#text-ingredientes tbody tr", querySelectorAll, A.map(addDots))
}
