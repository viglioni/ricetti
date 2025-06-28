import * as E from "fp-ts/Either"
import * as A from "fp-ts/Array"
import { flip, flow, pipe } from "fp-ts/lib/function"
import * as O from "fp-ts/Option"

type ToArray = <T>(a: ArrayLike<T>) => T[]
//  | (<T extends Element>(c: HTMLCollectionOf<T>) => T[])

export const toArray: ToArray = arrayLike => {
  if (arrayLike instanceof HTMLCollection) {
    return Array.prototype.slice.call(arrayLike)
  }
  return Array.from(arrayLike)
}

type ElementEventHandler = (event: Event) => void
type StringToString = (s: string) => string

export function isString(value: unknown): value is string {
  return typeof value === "string"
}

export function isElement(value: unknown): value is Element {
  return value !== null && value !== undefined && value instanceof Element
}

interface CreateElementProps {
  [key: `on${string}`]: ElementEventHandler
  [key: string]: any
  children?: (Node | string)[]
  classList?: string | string[]
  dataset?: Record<string, string | number | boolean | null | undefined>
  id?: string
  innerHTML?: string | null
  style?: Partial<CSSStyleDeclaration>
}

export const createElement = <T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  props?: CreateElementProps,
): HTMLElementTagNameMap[T] => {
  const element = document.createElement(tagName)

  if (!props) return element

  if (props.innerHTML) {
    element.innerHTML = props.innerHTML
  }

  // Handle dataset separately, outside the main loop
  if (props.dataset && props.dataset instanceof Object) {
    try {
      const datasetProps = props.dataset
      for (const key in datasetProps) {
        if (
          datasetProps[key] &&
          Object.prototype.hasOwnProperty.call(datasetProps, key)
        ) {
          element.dataset[key] = String(datasetProps[key])
        }
      }
    } catch (e) {
      console.error("Error setting dataset:", e)
    }
    // Remove dataset from props to avoid processing it again
    const { dataset, ...otherProps } = props
    props = otherProps
  }

  // Process other properties
  Object.entries(props).forEach(([key, value]) => {
    switch (true) {
      case key === "classList" && Array.isArray(value):
        value.forEach(cls => element.classList.add(cls))
        break

      case key === "style" && value instanceof Object:
        Object.assign(element.style, value)
        break

      case key.startsWith("on") && typeof value === "function":
        const eventName = key.substring(2).toLowerCase()
        element.addEventListener(eventName, value as ElementEventHandler)
        break
      case key === "dataset":
        break

      default:
        // Set other properties directly on the element (type, value, disabled, etc.)
        ;(element as any)[key] = value
        break
    }
  })

  return element
}

export const scrollSmoothlyTo = (element: HTMLElement | null): void => {
  if (element) element.scrollIntoView({ behavior: "smooth" })
}

/**
 * Creates a function that modifies the innerHTML of an HTML element.
 *
 * @example
 * // Set innerHTML directly
 * pipe(element, editInnerHTML("<strong>New content</strong>"))
 *
 * @example
 * // Transform existing innerHTML
 * pipe(element, editInnerHTML(html => html.toUpperCase()))
 */
type ContentOrFunction = string | StringToString
export const editInnerHTML =
  <T extends Element>(contentOrFunction: ContentOrFunction) =>
  (el: T): T => {
    if (isString(contentOrFunction)) {
      el.innerHTML = contentOrFunction
    } else {
      el.innerHTML = contentOrFunction(el.innerHTML)
    }
    return el
  }

export const editInnerHtmlByQuery = (query: string) => (content: ContentOrFunction) =>
  pipe(query, querySelector, O.map(editInnerHTML(content)))

type CreateAndAppend = <T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  props?: CreateElementProps,
) => <P extends HTMLElement>(referenceElement: P) => P

export const createAndAppendAsChild: CreateAndAppend =
  (tagName, props) => parentElement => {
    const element = createElement(tagName, props)
    parentElement.appendChild(element)
    return parentElement
  }

type MaybeCreateAndAppendAsChild = (c: boolean) => CreateAndAppend
export const maybeCreateAndAppendAsChild: MaybeCreateAndAppendAsChild =
  condition => (tagName, props) => parent =>
    condition ? createAndAppendAsChild(tagName, props)(parent) : parent

export const getChildren = (el: Element): Element[] => pipe(el.children, toArray)

type AppendElement = <T extends Element>(e: T | null) => <P extends Element>(p: P) => P
export const appendElement: AppendElement = element => parent => {
  if (element) parent.appendChild(element)
  return parent
}

type AppendToParent = <P extends Element>(p: P) => <T extends Element>(e: T) => P
export const appendToParent: AppendToParent = parent => element =>
  appendElement(element)(parent)

type AppendBelow = <NE extends HTMLElement>(
  newEl: NE,
) => <E extends HTMLElement>(el: E) => E
export const appendBellow: AppendBelow = newEl => el => {
  el.parentNode?.insertBefore(newEl, el.nextSibling)
  return el
}

export const createAndAppendBelow: CreateAndAppend = (tagName, props) =>
  pipe(createElement(tagName, props), appendBellow)

export const getElementsByTagName = <T extends keyof HTMLElementTagNameMap>(
  tagName: T,
): HTMLElementTagNameMap[T][] => {
  return toArray(document.getElementsByTagName(tagName))
}

export const getElementById = <T extends HTMLElement = HTMLElement>(
  id: string,
): O.Option<T> => {
  const queryable = id.replace(/#/, "")
  const doc = document.getElementById(queryable) as T | null
  return O.fromNullable(doc)
}

export const querySelector = <T extends HTMLElement = HTMLElement>(
  selector: string,
): O.Option<T> => O.fromNullable(document.querySelector(selector))

export const querySelectorAll = <T extends HTMLElement = HTMLElement>(
  selector: string,
): T[] => {
  return toArray(document.querySelectorAll(selector)) as T[]
}

export const getCheckboxByIdOrThrow = (id: string): HTMLInputElement => {
  const element = document.getElementById(id)

  if (!element) {
    throw new Error(`No element found with id: ${id}`)
  }

  if (!(element instanceof HTMLInputElement) || element.type !== "checkbox") {
    throw new Error(`Element with id '${id}' is not a checkbox input`)
  }

  return element
}

export const getCheckboxById = (id: string): HTMLInputElement | null => {
  const element = document.getElementById(id)

  if (!element) {
    return null
  }

  if (!(element instanceof HTMLInputElement) || element.type !== "checkbox") {
    return null
  }

  return element
}

export const switchCheckboxById = (id: string, state?: boolean): void => {
  const checkbox = getCheckboxById(id)

  if (!checkbox) return

  if (state === undefined) {
    checkbox.checked = !checkbox.checked
    return
  }

  checkbox.checked = state
}

/**
 * Returns an array of all values from an enum
 * Works with both numeric and string enums
 *
 * @param enumObject The enum to extract values from
 * @returns Array of enum values
 *
 * @example
 * enum Direction {
 *   Up = "UP",
 *   Down = "DOWN",
 *   Left = "LEFT",
 *   Right = "RIGHT"
 * }
 *
 * const values = getEnumValues(Direction);
 * // ["UP", "DOWN", "LEFT", "RIGHT"]
 */
export const getEnumValues = <T extends object>(enumObject: T): Array<T[keyof T]> => {
  // Gets only the values (not the reverse mappings that numeric enums create)
  return Object.keys(enumObject)
    .filter(key => isNaN(Number(key)))
    .map(key => enumObject[key as keyof T])
}

export const getEnumKey =
  <T extends object>(enumObj: T) =>
  (value: T[keyof T]): O.Option<keyof T> =>
    pipe(
      Object.keys(enumObj) as Array<keyof T>,
      A.filter(key => isNaN(Number(key)) && enumObj[key] === value),
      A.head,
    )

export const isCellEmpty = (str?: string): boolean =>
  Boolean(str && str.trim() !== "" && str !== "&nbsp;")

/**
 * Filters an array of strings to remove empty values or "&nbsp;", then joins with a separator
 * @param list - Array of strings to process
 * @param separator - String to use as separator when joining
 * @returns The filtered strings joined with the separator
 */
export const filterAndJoin = (list: any[], separator: string): string => {
  return list.filter(isCellEmpty).join(separator)
}

export const log = <T>(data: T): T => {
  console.log(data)
  return data
}

export const incorrectPage = (id: string): boolean => pipe(id, getElementById, O.isNone)

export const parseJSON = (obj: string): E.Either<string, object> => {
  try {
    const res: object = JSON.parse(obj)
    return E.right(res)
  } catch (e) {
    const msg: string = e instanceof Error ? e.message : "json parsing failed"
    return E.left(msg)
  }
}

export const getInnerHTML = <T extends HTMLElement = HTMLElement>(
  element: T,
): O.Option<string> => {
  return isCellEmpty(element.innerHTML) ? O.some(element.innerHTML) : O.none
}

export const removeClass =
  (className: string) =>
  (el: HTMLElement): HTMLElement => {
    el.classList.remove(className)
    return el
  }

export const addClass =
  (className: string) =>
  (el: HTMLElement): HTMLElement => {
    el.classList.add(className)
    return el
  }
