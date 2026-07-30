(function () {
  "use strict";

  // Component URL attributes are resolved from the site root, so the same
  // elements work from both top-level and nested project pages.
  const siteRoot = new URL("../", document.currentScript.src);

  const resolveSiteUrl = (value) => {
    if (!value) return "";

    try {
      return new URL(value, siteRoot).href;
    } catch {
      return value;
    }
  };

  const createImage = ({ src, alt = "", className = "", lazy = false }) => {
    const image = document.createElement("img");
    image.src = resolveSiteUrl(src);
    image.alt = alt;
    image.className = className;
    image.decoding = "async";

    if (lazy) image.loading = "lazy";

    return image;
  };

  class SiteHeader extends HTMLElement {
    connectedCallback() {
      if (this.dataset.rendered) return;
      this.dataset.rendered = "true";

      const activePage = this.getAttribute("active");
      const previousProject = this.getAttribute("previous");
      const nextProject = this.getAttribute("next");
      const isProjectPage = Boolean(previousProject && nextProject);

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
      header.append(logo);

      const navigation = this.createNavigation(activePage);

      if (isProjectPage) {
        const controls = document.createElement("div");
        controls.className = "project-navigation";

        const pageControls = document.createElement("div");
        pageControls.className = "page-controls";
        pageControls.append(
          this.createIconLink(
            previousProject,
            "icons/previous-icon.svg",
            "Previous project"
          ),
          this.createIconLink(
            nextProject,
            "icons/next-icon.svg",
            "Next project"
          )
        );

        const closeControl = document.createElement("div");
        closeControl.className = "close-control";
        closeControl.append(
          this.createIconLink(
            "index.html",
            "icons/close-icon.svg",
            "Close project"
          )
        );

        controls.append(pageControls, navigation, closeControl);
        header.append(controls);
      } else {
        header.append(navigation);
      }

      this.append(header);
    }

    createNavigation(activePage) {
      const pages = [
        ["graphic", "index.html"],
        ["web", "web.html"],
        ["cv", "files/RESUME - CARDOSO MAIKELLY.pdf"],
        ["about", "about.html"],
      ];
      const nav = document.createElement("nav");
      const list = document.createElement("ul");
      nav.className = "menu";
      nav.setAttribute("aria-label", "Main navigation");

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

      nav.append(list);
      return nav;
    }

    createIconLink(href, icon, label) {
      const link = document.createElement("a");
      link.href = resolveSiteUrl(href);
      link.setAttribute("aria-label", label);
      link.append(createImage({ src: icon, alt: "" }));
      return link;
    }
  }

  class ProjectCard extends HTMLElement {
    connectedCallback() {
      if (this.dataset.rendered) return;
      this.dataset.rendered = "true";

      const href = resolveSiteUrl(this.getAttribute("href"));
      const title = this.getAttribute("title") || "View project";
      const variant = this.getAttribute("variant") || "picture";
      const frame =
        this.getAttribute("frame") ||
        (variant === "computer"
          ? "images/computer-frame.png"
          : "images/picture-frame.png");

      const article = document.createElement("article");
      article.className = `project-item project-item--${variant}`;

      const visual = document.createElement("div");
      visual.className = "project-frame";
      const visualLink = document.createElement("a");
      visualLink.href = href;
      visualLink.setAttribute("aria-label", title);

      const frameImage = createImage({
        src: frame,
        alt: "",
        className: "project-frame__base",
      });
      frameImage.setAttribute("aria-hidden", "true");

      const projectImage = createImage({
        src: this.getAttribute("image"),
        alt: this.getAttribute("alt") || title,
        className: "project-frame__image",
        lazy: true,
      });

      visualLink.append(frameImage, projectImage);
      visual.append(visualLink);

      const caption = document.createElement("p");
      caption.className = "project-title";
      const captionLink = document.createElement("a");
      captionLink.href = href;
      captionLink.textContent = title;
      caption.append(captionLink);

      article.append(visual, caption);
      this.append(article);
    }
  }

  class ProjectGallery extends HTMLElement {
    connectedCallback() {
      if (this.dataset.rendered) return;
      this.dataset.rendered = "true";

      const projectName = this.getAttribute("project") || "Project";
      const imagePaths = (this.getAttribute("images") || "")
        .split(",")
        .map((path) => path.trim())
        .filter(Boolean);
      const gallery = document.createElement("main");
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

      this.append(gallery);
    }
  }

  class EndPageMessage extends HTMLElement {
    connectedCallback() {
      if (this.dataset.rendered) return;
      this.dataset.rendered = "true";

      const container = document.createElement("div");
      const message = document.createElement("p");
      container.className = "end-page-message";
      message.textContent =
        "That's a wrap! Thank you for taking a look at my work, let's keep in touch.";
      container.append(message);
      this.append(container);
    }
  }

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      if (this.dataset.rendered) return;
      this.dataset.rendered = "true";

      const footer = document.createElement("footer");
      footer.innerHTML = `
        <div class="footer">
          <a class="signature" href="${resolveSiteUrl("index.html")}" aria-label="Home">
            <img src="${resolveSiteUrl("images/Maikelly-Cardoso.svg")}" alt="Maikelly Cardoso">
          </a>
          <div class="footer-right">
            <a class="email" href="mailto:maisdesigning@gmail.com">maisdesigning@gmail.com</a>
            <div class="social-icons">
              <a href="https://www.behance.net/1sugar99ice" aria-label="Behance">
                <img src="${resolveSiteUrl("icons/behace.svg")}" alt="">
              </a>
              <a href="https://www.linkedin.com/in/maidesignshere" aria-label="LinkedIn">
                <img src="${resolveSiteUrl("icons/linkedin.svg")}" alt="">
              </a>
            </div>
          </div>
        </div>
      `;
      this.append(footer);
    }
  }

  customElements.define("site-header", SiteHeader);
  customElements.define("project-card", ProjectCard);
  customElements.define("project-gallery", ProjectGallery);
  customElements.define("end-page-message", EndPageMessage);
  customElements.define("site-footer", SiteFooter);
})();
