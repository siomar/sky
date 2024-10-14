import "./components/poster";
import "./components/banner";
import create from "./components/create";

import api from "./services/api";

function main() {
  const keywords = {
    news: 191509,
    recommendations: 270308,
    dc: 253375,
    marvel: 180547,
  };

  const getPoster = (image) => `https://image.tmdb.org/t/p/w500${image}`;

  async function getFilms(query) {
    return api.get("/discover/movie", { query });
  }

  async function getBanners() {
    return api.get("/movie/now_playing", {});
  }

  function renderPosters(id, list = []) {
    const element = document.getElementById(id);

    if (!list) {
      throw new Error("Listagem não encontrada");
    }

    list.forEach((item) => {
      const el = document.createElement("poster-ui");
      el.setAttribute("image", getPoster(item.poster_path));
      el.setAttribute("name", item.original_title);

      element.append(el);
    });
  }

  function renderBanner(list = []) {
    const element = document.getElementById("banners");

    if (!list) {
      throw new Error("Listagem não encontrada");
    }

    list.forEach((item) => {
      const el = document.createElement("banner-ui");
      el.setAttribute("image", getPoster(item.backdrop_path));
      el.setAttribute("name", item.original_title);

      element.append(el);
    });
  }

  async function requests() {
    try {
      const banners = await getBanners();

      renderBanner(banners.results.slice(0, 5));

      const [news, recommendations, dc, marvel] = await Promise.all([
        getFilms({ with_keywords: keywords["news"] }),
        getFilms({ with_keywords: keywords["recommendations"] }),
        getFilms({ with_keywords: keywords["dc"] }),
        getFilms({ with_keywords: keywords["marvel"] }),
      ]);

      renderPosters("news", news.results.slice(0, 15));
      renderPosters("recommendations", recommendations.results.slice(0, 15));
      renderPosters("dc", dc.results.slice(0, 15));
      renderPosters("marvel", marvel.results.slice(0, 15));
    } catch (error) {
      throw new Error("Error: " + error);
    }
  }

  function init() {
    const width = window.innerWidth;
    if (width > 600) {
      const detailsElements = document.querySelectorAll("details");
      detailsElements.forEach((detail) => {
        detail.setAttribute("open", "");
      });
    }

    const detailsElements = document.querySelectorAll(".tabs .nav-item");
    detailsElements.forEach((tab) => {
      tab.addEventListener("click", (event) => {
        event.preventDefault();
        detailsElements.forEach((nav) => nav.classList.remove("active"));
        tab.classList.add("active");
      });
    });

    requests().then(() => {
      const elements = document.querySelectorAll("#banners .banners-figure");
      const navigate = document.querySelector(".navigate");

      elements.forEach((_, i) => {
        navigate.appendChild(
          create("div", { class: `indicator ${i === 0 ? "active" : ""}` })
        );
      });

      const indicators = document.querySelectorAll(".navigate .indicator");
      indicators.forEach((el, i) => {
        el.addEventListener("click", () => {
          indicators.forEach((indicator) =>
            indicator.classList.remove("active")
          );
          elements[i].scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
          });
          el.classList.add("active");
        });
      });
    });
  }

  init();
}

main();
