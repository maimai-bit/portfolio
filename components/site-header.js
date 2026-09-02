import { createImage, defineElement, resolveSiteUrl } from "./utils.js";

class SiteHeader extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered) return;
    this.dataset.rendered = "true";

    const header = document.createElement("header");
    const logo = document.createElement("a");
    logo.className = "site-logo";
    logo.href = resolveSiteUrl("index.html");
    logo.setAttribute("aria-label", "Maikelly Cardoso — home");
    logo.append(
      createImage({
        src: "images/Maikelly-Cardoso.svg",
        alt: "Maikelly Cardoso",
      })
    );

    header.append(logo, this.createNavigation());
    this.append(header);
  }

  createNavigation() {
    const activePage = this.getAttribute("active");
    const pages = [
      ["graphic", "index.html"],
      ["web", "web.html"],
      ["cv", "files/RESUME - CARDOSO MAIKELLY.pdf"],
      ["about", "about.html"],
    ];
    const navigation = document.createElement("nav");
    const list = document.createElement("ul");
    navigation.className = "menu";
    navigation.setAttribute("aria-label", "Main navigation");

    pages.forEach(([label, href]) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = resolveSiteUrl(href);
      link.textContent = label;

      if (activePage === label) {
        link.className = "active";
        link.setAttribute("aria-current", "page");
      }

      item.append(link);
      list.append(item);
    });

    navigation.append(list);
    return navigation;
  }
}

defineElement("site-header", SiteHeader);
