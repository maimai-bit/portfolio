import { createImage, defineElement, resolveSiteUrl } from "./utils.js";

class ProjectCard extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered) return;
    this.dataset.rendered = "true";

    const href = this.getAttribute("href");
    const projectName = this.getAttribute("title") || "Project";
    const description = this.getAttribute("description") || "";
    const variant = this.getAttribute("variant") || "picture";
    const frame =
      this.getAttribute("frame") ||
      (variant === "computer"
        ? "images/computer-frame.svg"
        : "images/picture-frame.svg");

    const article = document.createElement("article");
    article.className = `project-card project-card--${variant}`;

    const visual = document.createElement("div");
    visual.className = "project-frame";
    const visualContent = href ? document.createElement("a") : document.createElement("div");
    if (href) {
      visualContent.href = resolveSiteUrl(href);
      visualContent.setAttribute("aria-label", `View ${projectName}`);
    }

    const frameImage = createImage({
      src: frame,
      alt: "",
      className: "project-frame__base",
    });
    frameImage.setAttribute("aria-hidden", "true");

    visualContent.append(
      frameImage,
      createImage({
        src: this.getAttribute("image"),
        alt: this.getAttribute("alt") || projectName,
        className: "project-frame__image",
      })
    );
    visual.append(visualContent);

    const title = document.createElement("h2");
    title.className = "project-title";
    if (href) {
      const link = document.createElement("a");
      link.href = resolveSiteUrl(href);
      link.textContent = projectName;
      title.append(link);
    } else {
      title.textContent = projectName;
    }

    const details = document.createElement("p");
    details.className = "project-description";
    details.textContent = description;

    article.append(visual, title, details);
    this.append(article);
  }
}

defineElement("project-card", ProjectCard);
