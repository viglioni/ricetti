import * as O from "fp-ts/Option"
import * as A from "fp-ts/Array"
import { pipe } from "fp-ts/lib/function"
import {
  createAndAppendBelow,
  getChildren,
  getInnerHTML,
  log,
  querySelectorAll,
} from "./document-utils"

const addDots = (row: HTMLElement) =>
  pipe(
    row,
    el => el.firstChild as HTMLElement,
    createAndAppendBelow("span", {
      innerHTML: " . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ",
      style: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        flex: "1",
      },
    }),
  )

export const leadingDots = () => {
  console.log(pipe("#text-ingredientes tbody tr", querySelectorAll, A.map(addDots)))
}
