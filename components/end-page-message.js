import { defineElement } from "./utils.js";

class EndPageMessage extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered) return;
    this.dataset.rendered = "true";

    const message = document.createElement("p");
    message.className = "end-page-message";
    message.textContent = "That’s a wrap! Thank you for taking a look at my work :)";
    this.append(message);
  }
}

defineElement("end-page-message", EndPageMessage);
