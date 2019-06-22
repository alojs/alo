import { el } from "redom";

class AComponent {
  el = el('form')
}









const obj = {
  a: el(new HTMLAnchorElement()),
  div: el('div'),
  h3: el('h3'),
  //component: el(AComponent),
  form: el('form'),
  others: el('untyped'),
  withClass: el('div.main')
}