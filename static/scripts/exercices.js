(() => {
  const searchInput = document.getElementById("exercise-search");
  const cards = Array.from(document.querySelectorAll(".exercise-card"));
  const filters = Array.from(document.querySelectorAll(".exercise-filter"));
  const resultCount = document.getElementById("exercise-results");
  const emptyMessage = document.getElementById("exercise-empty");

  if (!searchInput || !cards.length || !resultCount || !emptyMessage) {
    return;
  }

  const normalize = (value) => value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr");
  let activeFilter = "";

  const updateResults = () => {
    const query = normalize(searchInput.value.trim());
    let visibleCount = 0;

    cards.forEach((card) => {
      const tags = (card.dataset.tags || "").split("|").map(normalize);
      const matchesQuery = normalize(card.dataset.search || "").includes(query);
      const matchesFilter = !activeFilter || tags.includes(activeFilter);
      card.hidden = !matchesQuery || !matchesFilter;
      if (!card.hidden) visibleCount += 1;
    });

    resultCount.textContent = `${visibleCount} exercice${visibleCount === 1 ? "" : "s"}`;
    emptyMessage.hidden = visibleCount > 0;
  };

  searchInput.addEventListener("input", updateResults);

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = normalize(button.dataset.filter || "");
      filters.forEach((filter) => {
        const isActive = filter === button;
        filter.classList.toggle("is-active", isActive);
        filter.setAttribute("aria-pressed", String(isActive));
      });
      updateResults();
    });
  });
})();
