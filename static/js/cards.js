import "./enhanced-js.js"

const rndThreeOptions = (opt1, opt2, opt3) => {
  const rand = Math.random() * 9

  if (rand < 3) return opt1
  if (rand < 6) return opt2

  return opt3
}

const rotateCard = card => {
  const angle = Math.floor((Math.random() * 60 - 30) / 2)
  card.style.transform = `rotate(${angle}deg)`
}

const alignCard = card => {
  card.style.placeSelf = rndThreeOptions("baseline", "normal", "end")
}

const addTopTape = card => {
  const tape = document.createElement("div")
  tape.classList.add("top-tape")
  card.appendChild(tape)
}

const add2CornerTapes = card => {
  const tape = document.createElement("div")
  tape.classList.add("tape-section")

  const p = document.createElement("p")

  p.innerHTML = card.innerHTML
  card.innerHTML = null

  card.appendChild(tape)
  card.append(p)
}

const add4CornerTapes = card => {
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
  rndThreeOptions(
    () => addTopTape(card),
    () => add4CornerTapes(card),
    () => add2CornerTapes(card),
  )()
}

const getCards = () => document.getElementsByClassName("card").toArray()

const addColor = (data, card) => {
  const props = data[card.innerHTML]

  if (props.includes("meal")) {
    card.classList.add("blue")
    return
  }

  if (props.includes("dessert")) {
    card.classList.add("pink")
    return
  }

  card.classList.add("green")
}

const addIconToCard = (card, imgPath) => {
  const icon = document.createElement("div")
  icon.classList.add("card-icon")
  const img = document.createElement("img")
  img.src = imgPath
  icon.appendChild(img)

  card.appendChild(icon)
}

const addIcon = (data, card) => {
  const props = data[card.innerHTML]

  if (props.includes("italianfood")) {
    addIconToCard(card, "/static/pics/pisa.svg")
  }
}

export const makeCards = () => {
  const data = JSON.parse(document.getElementById("data").innerHTML)

  getCards().forEach(card => {
    addColor(data, card)
    addIcon(data, card)
    card.classList.add("paper")
    addTape(card)
    rotateCard(card)
    alignCard(card)
  })
}
