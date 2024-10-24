//////////////////////////
// Adding methods to JS //
//////////////////////////

Array.prototype.max = function () {
  return Math.max.apply(null, this)
}

Array.prototype.isEmpty = function () {
  return this.length == 0
}

HTMLCollection.prototype.toArray = function () {
  return Array.prototype.slice.call(this)
}

NodeList.prototype.toArray = function () {
  return Array.prototype.slice.call(this)
}

Number.prototype.round = function () {
  return Math.round(this)
}

String.prototype.capitalize = function () {
  const [head, ...tail] = this
  return head.toUpperCase() + tail.join("")
}

export const innerHTML = el => el.innerHTML
