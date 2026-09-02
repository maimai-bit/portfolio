import "./project-card.js";
import { createImage, defineElement } from "./utils.js";

class ProjectCarousel extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered) return;
    this.dataset.rendered = "true";

    this.slides = Array.from(this.querySelectorAll(":scope > project-card"));
    if (!this.slides.length) return;

    this.currentIndex = 0;
    this.touchStartX = 0;
    this.tabIndex = 0;
    this.setAttribute("role", "region");
    this.setAttribute("aria-roledescription", "carousel");
    this.setAttribute("aria-label", this.getAttribute("label") || "Projects");

    const viewport = document.createElement("div");
    viewport.className = "carousel-viewport";
    viewport.append(...this.slides);

    this.previousButton = this.createButton(
      "previous",
      "icons/previous-icon.svg",
      "Previous project"
    );
    this.nextButton = this.createButton(
      "next",
      "icons/next-icon.svg",
      "Next project"
    );
    this.status = document.createElement("p");
    this.status.className = "sr-only";
    this.status.setAttribute("aria-live", "polite");

    this.replaceChildren(this.previousButton, viewport, this.nextButton, this.status);
    this.addEventListeners();
    this.showSlide(0, false);
  }

  createButton(direction, icon, label) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `carousel-control carousel-control--${direction}`;
    button.setAttribute("aria-label", label);
    button.append(createImage({ src: icon, alt: "" }));
    return button;
  }

  addEventListeners() {
    this.previousButton.addEventListener("click", () => this.showSlide(this.currentIndex - 1));
    this.nextButton.addEventListener("click", () => this.showSlide(this.currentIndex + 1));

    this.addEventListener("keydown", (event) => {
      const actions = {
        ArrowLeft: () => this.showSlide(this.currentIndex - 1),
        ArrowRight: () => this.showSlide(this.currentIndex + 1),
        Home: () => this.showSlide(0),
        End: () => this.showSlide(this.slides.length - 1),
      };

      if (!actions[event.key]) return;
      event.preventDefault();
      actions[event.key]();
    });

    this.addEventListener(
      "touchstart",
      (event) => {
        this.touchStartX = event.changedTouches[0].clientX;
      },
      { passive: true }
    );
    this.addEventListener(
      "touchend",
      (event) => {
        const distance = event.changedTouches[0].clientX - this.touchStartX;
        if (Math.abs(distance) < 45) return;
        this.showSlide(distance > 0 ? this.currentIndex - 1 : this.currentIndex + 1);
      },
      { passive: true }
    );
  }

  showSlide(index, announce = true) {
    this.currentIndex = (index + this.slides.length) % this.slides.length;

    this.slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === this.currentIndex;
      slide.hidden = !isActive;
      slide.toggleAttribute("inert", !isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    const currentName = this.slides[this.currentIndex].getAttribute("title") || "project";
    this.status.textContent = announce
      ? `${currentName}, project ${this.currentIndex + 1} of ${this.slides.length}`
      : "";
    this.previousButton.hidden = this.slides.length < 2;
    this.nextButton.hidden = this.slides.length < 2;
  }
}

defineElement("project-carousel", ProjectCarousel);
