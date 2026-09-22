import { createIconLink, createImage, defineElement, resolveSiteUrl } from "./utils.js";

class ProjectGallery extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered) return;
    this.dataset.rendered = "true";

    const projectName = this.getAttribute("project") || "Project";
    const imagePaths = (this.getAttribute("images") || "")
      .split(",")
      .map((path) => path.trim())
      .filter(Boolean);
    const view = document.createElement("main");
    const stage = document.createElement("div");
    const artwork = document.createElement("div");
    const gallery = document.createElement("div");
    view.className = "project-view";
    stage.className = "project-view__stage";
    artwork.className = "project-view__artwork";
    gallery.className = "project-gallery";
    gallery.setAttribute("aria-label", `${projectName} project images`);

    imagePaths.forEach((src, index) => {
      gallery.append(
        createImage({
          src,
          alt: `${projectName} project — image ${index + 1} of ${imagePaths.length}`,
          lazy: index > 0,
        })
      );
    });

    artwork.append(
      createIconLink({
        href: this.getAttribute("close") || "index.html",
        icon: "icons/close-icon.svg",
        label: "Close project",
        className: "project-view__close",
      }),
      gallery
    );

    const liveUrl = this.getAttribute("live");
    if (liveUrl) {
      const liveLink = document.createElement("a");
      liveLink.className = "project-live-link";
      liveLink.href = resolveSiteUrl(liveUrl);
      liveLink.target = "_blank";
      liveLink.rel = "noopener noreferrer";
      liveLink.textContent = "See live";
      stage.append(liveLink);
    }

    stage.append(artwork);
    view.append(
      createIconLink({
        href: this.getAttribute("previous"),
        icon: "icons/previous-icon.svg",
        label: "Previous project",
        className: "project-view__control project-view__control--previous",
      }),
      stage,
      createIconLink({
        href: this.getAttribute("next"),
        icon: "icons/next-icon.svg",
        label: "Next project",
        className: "project-view__control project-view__control--next",
      })
    );

    this.append(view);
  }
}

defineElement("project-gallery", ProjectGallery);
