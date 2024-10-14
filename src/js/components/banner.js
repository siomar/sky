import create from "./create";

class Banner extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });

    const img_param = this.getAttribute("image");
    const name_param = this.getAttribute("name");

    const style = document.createElement("style");

    style.textContent = ` 
        .banners {
          width: 100%;
          margin-top: 20px;
          margin-bottom: 20px;

          overflow-y: hidden;
          overflow-x: scroll;
        }
        .banners-image {
          border-radius: 4px;
          box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.38);
        }
        .banners-figure {
          margin:0px;
           cursor: pointer;
        }
        .banners-figure::first-child {
          margin-left: calc(100vw / 12);
        }
        .banners-figcaption {
          display: none;
        }
        @media only screen and (max-width: 768px) {
           .banners-image {
             width: calc(90vw - 32px);
           }
        }
    `;

    const figure = create("figure", {
      class: "banners-figure",
      tabIndex: 0,
      ariaLabel: name_param,
    });
    const img = create("img", {
      class: "banners-image",
      alt: name_param,
      src: img_param,
      loading: "lazy",
    });
    const figcaption = create("figcaption", { class: "banners-figcaption" });

    figcaption.textContent = name_param;
    figure.appendChild(img);
    figure.appendChild(figcaption);

    this.classList.add("banners-figure");
    this.shadowRoot.append(figure, style);
  }
}

customElements.define("banner-ui", Banner);
