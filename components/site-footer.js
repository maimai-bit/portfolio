import { createImage, defineElement, resolveSiteUrl } from "./utils.js";

class SiteFooter extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered) return;
    this.dataset.rendered = "true";

    const footer = document.createElement("footer");
    const content = document.createElement("div");
    const signature = document.createElement("a");
    const contact = document.createElement("div");
    const email = document.createElement("a");
    const social = document.createElement("div");
    content.className = "footer";
    signature.className = "signature";
    signature.href = resolveSiteUrl("index.html");
    signature.setAttribute("aria-label", "Home");
    signature.append(
      createImage({ src: "images/Maikelly-Cardoso.svg", alt: "Maikelly Cardoso" })
    );
    contact.className = "footer-right";
    email.className = "email";
    email.href = "mailto:maisdesigning@gmail.com";
    email.textContent = "maisdesigning@gmail.com";
    social.className = "social-icons";

    [
      ["https://www.behance.net/1sugar99ice", "icons/behace.svg", "Behance"],
      ["https://www.linkedin.com/in/maidesignshere", "icons/linkedin.svg", "LinkedIn"],
    ].forEach(([href, icon, label]) => {
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("aria-label", label);
      link.append(createImage({ src: icon, alt: "" }));
      social.append(link);
    });

    contact.append(email, social);
    content.append(signature, contact);
    footer.append(content);
    this.append(footer);
  }
}

defineElement("site-footer", SiteFooter);
