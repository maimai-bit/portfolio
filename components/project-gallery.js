import { createIconLink, createImage, defineElement } from "./utils.js";

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
    const gallery = document.createElement("div");
    view.className = "project-view";
    stage.className = "project-view__stage";
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

    stage.append(
      createIconLink({
        href: this.getAttribute("close") || "index.html",
        icon: "icons/close-icon.svg",
        label: "Close project",
        className: "project-view__close",
      }),
      gallery
    );
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
