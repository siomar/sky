import create from "./create.js";
class Poster extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: "open"
    });
    const poster = create("div", {
      class: ""
    });
  }
}
customElements.define("poster", Poster);