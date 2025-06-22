import * as E from "fp-ts/Either"
import { flow, pipe } from "fp-ts/function"
import * as A from "fp-ts/Array"
import * as O from "fp-ts/Option"
import {
  getElementById,
  getInnerHTML,
  incorrectPage,
  log,
  parseJSON,
  querySelectorAll,
} from "./document-utils"

interface CardData {
  [key: string]: string[]
}

const rndThreeOptions = <T>(opt1: T, opt2: T, opt3: T): T => {
  const rand = Math.random() * 9

  if (rand < 3) return opt1
  if (rand < 6) return opt2

  return opt3
}

const rotateCard = (card: HTMLElement): void => {
  const angle = Math.floor((Math.random() * 60 - 30) / 2)
  card.style.transform = `rotate(${angle}deg)`
}

const alignCard = (card: HTMLElement): void => {
  card.style.placeSelf = rndThreeOptions("baseline", "normal", "end")
}

const addTopTape = (card: HTMLElement): void => {
  const tape = document.createElement("div")
  tape.classList.add("top-tape")
  card.appendChild(tape)
}

const add2CornerTapes = (card: HTMLElement): void => {
  const tape = document.createElement("div")
  tape.classList.add("tape-section")

  const p = document.createElement("p")

  p.innerHTML = card.innerHTML
  card.innerHTML = ""

  card.appendChild(tape)
  card.append(p)
}

const add4CornerTapes = (card: HTMLElement): void => {
  const [tape1, tape2] = pipe(
    A.replicate(2, null),
    A.map(() => document.createElement("div")),
    A.map(tape => {
      tape.classList.add("tape-section")
      return tape
    }),
  )

  const p = document.createElement("p")

  p.innerHTML = card.innerHTML
  card.innerHTML = ""

  card.appendChild(tape1)
  card.append(p)
  card.appendChild(tape2)
}

const addTape = (card: HTMLElement): void => {
  rndThreeOptions(
    () => addTopTape(card),
    () => add4CornerTapes(card),
    () => add2CornerTapes(card),
  )()
}

const getCards = (): HTMLElement[] => {
  return querySelectorAll(".card")
}

const addColor = (data: CardData, card: HTMLElement): void => {
  const props = data[card.innerHTML.trim()]

  if (props?.includes("meal")) {
    card.classList.add("blue")
    return
  }

  if (props?.includes("dessert")) {
    card.classList.add("pink")
    return
  }

  card.classList.add("green")
}

const addIconToCard = (card: HTMLElement, imgPath: string): void => {
  const icon = document.createElement("div")
  icon.classList.add("card-icon")
  const img = document.createElement("img")
  img.src = imgPath
  icon.appendChild(img)

  card.appendChild(icon)
}

const addIcon = (data: CardData, card: HTMLElement): void => {
  const props = data[card.innerHTML.trim()]

  if (props?.includes("italianfood")) {
    addIconToCard(card, "/static/pics/pisa.svg")
  }
}

const normalizeJSONContent = (str: string): string => str.trim().replace(/\n\s*/g, " ")

export const makeHomePageCards = (): void => {
  if (incorrectPage("ricetti-home-page")) return

  const data: CardData = pipe(
    getElementById("data"),
    O.chain(getInnerHTML),
    O.map(normalizeJSONContent),

    O.chain(flow(parseJSON, log, O.fromEither)),
    O.getOrElse(() => ({})),
  )

  pipe(
    getCards(),
    A.map(card => {
      addColor(data, card)
      addIcon(data, card)
      card.classList.add("paper")
      addTape(card)
      rotateCard(card)
      alignCard(card)
      return card
    }),
  )
}
