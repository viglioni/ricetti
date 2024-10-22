import "./enhanced-js.js"

const chooseColor = () => {
  const rand = Math.random() * 9

  if (rand < 3) return "blue"
  if (rand < 6) return "green"

  return "pink"
}

const rotateCard = card => {
  const angle = Math.floor((Math.random() * 60 - 30) / 2)
  card.style.transform = `rotate(${angle}deg)`
}

const addTopTape = card => {
  const tape = document.createElement("div")
  tape.classList.add("top-tape")
  card.appendChild(tape)
}

const addCornerTapes = card => {
  const [tape1, tape2] = Array(2)
    .fill(null)
    .map(_ => document.createElement("div"))
    .map(tape => tape.classList.add("tape-section") || tape)

  const p = document.createElement("p")

  p.innerHTML = card.innerHTML
  card.innerHTML = null

  card.appendChild(tape1)
  card.append(p)
  card.appendChild(tape2)
}

const addTape = card => {
  Math.random() < 0.5
    ? addTopTape(card)
    : addCornerTapes(card)
}

const getCards = () =>
  document.getElementsByClassName("card").toArray()

export const makeCards = () => {
  getCards().forEach(card => {
    card.classList.add("paper", chooseColor())
    addTape(card)
    rotateCard(card)
  })
}
