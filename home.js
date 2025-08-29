document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------
  // FILTER + PROJECTS
  // ----------------------------
  const filterButtons = document.querySelectorAll(".filter-btn");
  const seeAllButton = document.querySelector(".filter-all-btn");
  const items = document.querySelectorAll(".list-item");

  // Helper to clear active state
  function clearActive() {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    seeAllButton.classList.remove("active");
  }

  // Show only items of a specific category
  function filterItems(category) {
    items.forEach(item => {
      item.style.display =
        item.dataset.category === category ? "flex" : "none";
    });
  }

  // Show all items
  function showAllItems() {
    items.forEach(item => {
      item.style.display = "flex";
    });
  }

  // Default: show first filter’s content
  if (filterButtons.length > 0) {
    const firstBtn = filterButtons[0];
    firstBtn.classList.add("active");
    filterItems(firstBtn.dataset.filter);
  }

  // Add event listener for each filter button
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      clearActive();
      btn.classList.add("active");
      filterItems(btn.dataset.filter);
    });
  });

  // SEE ALL button
  seeAllButton.addEventListener("click", () => {
    clearActive();
    seeAllButton.classList.add("active");
    showAllItems();
  });

  // ----------------------------
  // MODAL + SPINNER
  // ----------------------------
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".close");
  const loader = document.getElementById("modalLoader");

  // Attach click event to all "Take a Look" buttons
  document.querySelectorAll(".take-look-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const imgSrc = btn.getAttribute("data-image") || btn.closest(".list-item").querySelector("img").src;

      // Show modal immediately with loader
      modal.style.display = "block";
      loader.style.display = "block";
      modalImg.style.display = "none";

      // Load new image in background
      const tempImg = new Image();
      tempImg.src = imgSrc;

      tempImg.onload = () => {
        modalImg.src = imgSrc;
        loader.style.display = "none";
        modalImg.style.display = "block";
      };
    });
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.style.display = "none";
  });

  // ----------------------------
  // PAGE LOAD ANIMATIONS
  // ----------------------------
  const photo = document.querySelector(".about-photo img");
  const hello = document.querySelector(".about-hello");
  const desc = document.querySelector(".about-description");
  const portfolio = document.querySelector(".portfolio-header");
  const filters = document.querySelectorAll(".filters button");
  const projects = document.querySelectorAll(".projects .list-item");

  // Step 1: Show photo
  setTimeout(() => photo.classList.add("pop-image"), 200);

  // Step 2: Slide in hello + description
  setTimeout(() => hello.classList.add("slide-in"), 500);
  setTimeout(() => desc.classList.add("slide-in"), 800);

  // Step 3: Portfolio title
  setTimeout(() => portfolio.classList.add("slide-in"), 1100);

  // Step 4: Filters pop in (no sliding, just pop fast)
  filters.forEach((btn, i) => {
    setTimeout(() => btn.classList.add("pop-in"), 1400 + i * 150);
  });

  // Step 5: Projects slide in one by one
  projects.forEach((proj, i) => {
    setTimeout(() => proj.classList.add("slide-in"), 2000 + i * 250);
  });
});
