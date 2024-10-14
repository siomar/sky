import create from "./create";

class Poster extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });

    const img_param = this.getAttribute("image");
    const name_param = this.getAttribute("name");

    const style = document.createElement("style");

    style.textContent = `
        .catalog-item {
            float: left;
        }
        .figure {
            width: 112px;
            margin:0;
            position: relative;

            @media only screen and (min-width: 768px) {
              width: 200px;
            }
        }
        .figure-image {
            width: 100%;
            height: 100%;
            border-radius: 4px;
            box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.58);
        }
        .figure-figcaption {
            display: none;
        }
        .figure-cart{
          position: absolute;
          top: 10px;
          right: 10px;
          width: 20px;
          height: 20px;
          border: 2px solid #fff;
          border-radius: 50%;
          background: rgba(0,0,0,0.3);
        }
    `;

    const poster = create("div", { class: "catalog-item" });
    const cart = create("div", {class:"figure-cart"});

    const img = create("img", {
      class: "figure-image",
      alt: name_param,
      src: img_param,
      loading: "lazy",
    });

    const figcaption = create("figcaption", { class: "figure-figcaption" });
    figcaption.textContent = name_param;
   

    const figure = create("figure", {
      class: "figure",
      tabIndex: 0,
      ariaLabel: name_param,
    },[img,figcaption,cart]);

    poster.appendChild(figure);

    this.classList.add("catalog-item");
    this.shadowRoot.append(poster, style);
  }
}

customElements.define("poster-ui", Poster);
