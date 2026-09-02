export const siteRoot = new URL("../", import.meta.url);

export const resolveSiteUrl = (value) => {
  if (!value) return "";

  try {
    return new URL(value, siteRoot).href;
  } catch {
    return value;
  }
};

export const createImage = ({ src, alt = "", className = "", lazy = false }) => {
  const image = document.createElement("img");
  image.src = resolveSiteUrl(src);
  image.alt = alt;
  image.className = className;
  image.decoding = "async";

  if (lazy) image.loading = "lazy";

  return image;
};

export const createIconLink = ({ href, icon, label, className = "" }) => {
  const link = document.createElement("a");
  link.href = resolveSiteUrl(href);
  link.className = className;
  link.setAttribute("aria-label", label);
  link.append(createImage({ src: icon, alt: "" }));
  return link;
};

export const defineElement = (name, constructor) => {
  if (!customElements.get(name)) customElements.define(name, constructor);
};
