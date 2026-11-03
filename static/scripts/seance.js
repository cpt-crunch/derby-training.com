(() => {
  const storageKey = "derby-training-workout-v1";
  const status = document.getElementById("workout-status") || document.getElementById("exercise-add-status");
  let canSave = true;
  let workout = [];
  let pickerExercises = null;

  const announce = (message) => {
    if (status) status.textContent = message;
  };

  const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const readWorkout = () => {
    let stored;
    try {
      stored = window.localStorage.getItem(storageKey);
    } catch (error) {
      canSave = false;
      announce("La sauvegarde locale est indisponible dans ce navigateur.");
      return [];
    }

    if (stored === null) return [];

    try {
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) throw new Error("Invalid workout data");
      const isValid = parsed.every((item) =>
        item &&
        typeof item.id === "string" &&
        typeof item.title === "string" &&
        typeof item.url === "string" &&
        item.url.startsWith("/") &&
        !item.url.startsWith("//") &&
        Number.isInteger(item.duration) &&
        item.duration >= 1 &&
        item.duration <= 480 &&
        Array.isArray(item.tags) &&
        item.tags.every((tag) => typeof tag === "string") &&
        typeof item.summary === "string"
      );
      if (!isValid) throw new Error("Invalid workout data");
      return parsed;
    } catch (error) {
      canSave = false;
      announce("La seance enregistree est illisible. Elle n'a pas ete modifiee.");
      return [];
    }
  };

  const saveWorkout = () => {
    if (!canSave) return false;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(workout));
      return true;
    } catch (error) {
      announce("Impossible d'enregistrer la seance dans ce navigateur.");
      return false;
    }
  };

  const totalDuration = () => workout.reduce((total, item) => total + item.duration, 0);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainder = minutes % 60;
    if (!hours) return `${remainder} min`;
    return remainder ? `${hours} h ${remainder} min` : `${hours} h`;
  };

  const renderWorkout = () => {
    const list = document.getElementById("workout-list");
    if (!list) return;

    const total = totalDuration();
    const totalElement = document.getElementById("workout-total");
    const countElement = document.getElementById("workout-count");
    const emptyElement = document.getElementById("workout-empty");
    const clearButton = document.getElementById("clear-workout");
    const printButton = document.getElementById("print-workout");

    totalElement.textContent = formatDuration(total);
    countElement.textContent = `${workout.length} exercice${workout.length === 1 ? "" : "s"}`;
    emptyElement.hidden = workout.length > 0;
    clearButton.disabled = workout.length === 0;
    printButton.disabled = workout.length === 0;
    list.replaceChildren();

    workout.forEach((item, index) => {
      const row = document.createElement("li");
      row.className = "workout-item";

      const content = document.createElement("div");
      content.className = "workout-item-content";
      const details = document.createElement("div");
      const link = document.createElement("a");
      link.className = "workout-item-title";
      link.href = item.url;
      link.textContent = item.title;
      details.append(link);

      if (item.summary) {
        const summary = document.createElement("p");
        summary.className = "workout-item-summary";
        summary.textContent = item.summary;
        details.append(summary);
      }

      if (item.tags.length) {
        const tags = document.createElement("p");
        tags.className = "workout-item-tags";
        tags.textContent = item.tags.join(" · ");
        details.append(tags);
      }
      content.append(details);

      const durationLabel = document.createElement("label");
      durationLabel.className = "workout-item-duration-label";
      durationLabel.textContent = "Duree (min)";
      const durationInput = document.createElement("input");
      durationInput.className = "workout-item-duration";
      durationInput.type = "number";
      durationInput.min = "1";
      durationInput.max = "480";
      durationInput.step = "1";
      durationInput.value = String(item.duration);
      durationInput.setAttribute("aria-label", `Duree pour ${item.title}, en minutes`);
      durationLabel.append(durationInput);
      content.append(durationLabel);
      row.append(content);

      const actions = document.createElement("div");
      actions.className = "workout-item-actions";

      const moveUp = document.createElement("button");
      moveUp.className = "workout-item-button";
      moveUp.type = "button";
      moveUp.textContent = "Monter";
      moveUp.setAttribute("aria-label", `Monter ${item.title} dans la seance`);
      moveUp.disabled = index === 0;
      moveUp.addEventListener("click", () => moveItem(index, -1));

      const moveDown = document.createElement("button");
      moveDown.className = "workout-item-button";
      moveDown.type = "button";
      moveDown.textContent = "Descendre";
      moveDown.setAttribute("aria-label", `Descendre ${item.title} dans la seance`);
      moveDown.disabled = index === workout.length - 1;
      moveDown.addEventListener("click", () => moveItem(index, 1));

      const remove = document.createElement("button");
      remove.className = "workout-item-button";
      remove.type = "button";
      remove.textContent = "Retirer";
      remove.setAttribute("aria-label", `Retirer ${item.title} de la seance`);
      remove.addEventListener("click", () => {
        workout.splice(index, 1);
        const saved = saveWorkout();
        renderWorkout();
        announce(saved ? "Exercice retire de la seance." : "Exercice retire, mais la sauvegarde a echoue.");
      });

      durationInput.addEventListener("change", () => {
        const duration = Number.parseInt(durationInput.value, 10);
        if (!Number.isInteger(duration) || duration < 1 || duration > 480) {
          durationInput.value = String(workout[index].duration);
          announce("La duree doit etre comprise entre 1 et 480 minutes.");
          return;
        }
        workout[index].duration = duration;
        const saved = saveWorkout();
        renderWorkout();
        announce(saved ? "Duree de la seance mise a jour." : "Duree modifiee, mais la sauvegarde a echoue.");
      });

      actions.append(moveUp, moveDown, remove);
      row.append(actions);
      list.append(row);
    });
  };

  const moveItem = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= workout.length) return;
    [workout[index], workout[target]] = [workout[target], workout[index]];
    const saved = saveWorkout();
    renderWorkout();
    announce(saved ? "Ordre de la seance mis a jour." : "Ordre modifie, mais la sauvegarde a echoue.");
  };

  const exerciseFromElement = (element) => ({
    id: createId(),
    title: element.dataset.title || "",
    url: element.dataset.url || "",
    summary: element.dataset.summary || "",
    tags: (element.dataset.tags || "").split("|").filter(Boolean),
    duration: Number.parseInt(element.dataset.duration || "10", 10)
  });

  const addExercise = (exercise) => {
    if (!exercise.title || !exercise.url || !Number.isInteger(exercise.duration) || exercise.duration < 1) {
      announce("Cet exercice ne peut pas etre ajoute : ses informations sont incompletes.");
      return false;
    }
    workout.push(exercise);
    const saved = saveWorkout();
    renderWorkout();
    announce(saved
      ? `${exercise.title} ajoute a la seance (${totalDuration()} min au total).`
      : `${exercise.title} ajoute, mais la sauvegarde a echoue.`);
    return true;
  };

  const normalize = (value) => value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr");

  const initializePicker = () => {
    const search = document.getElementById("exercise-picker-search");
    const select = document.getElementById("exercise-picker");
    const addButton = document.getElementById("add-picked-exercise");
    if (!search || !select || !addButton) return;

    const placeholder = select.options[0].cloneNode(true);
    const options = Array.from(select.options).slice(1);
    pickerExercises = options.map(exerciseFromElement);

    search.addEventListener("input", () => {
      const query = normalize(search.value.trim());
      const matching = options.filter((option) => normalize(option.dataset.search || "").includes(query));
      select.replaceChildren(placeholder.cloneNode(true), ...matching);
    });

    addButton.addEventListener("click", () => {
      const selected = select.selectedOptions[0];
      if (!selected || !selected.value) {
        announce("Choisissez un exercice a ajouter.");
        return;
      }
      if (addExercise(exerciseFromElement(selected))) {
        select.value = "";
      }
    });
  };

  const shuffle = (items) => {
    const result = items.slice();
    for (let index = result.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
    }
    return result;
  };

  const generateWorkout = (target) => {
    const exercises = pickerExercises
      ? pickerExercises
      : Array.from(document.querySelectorAll(".exercise-add-button")).map(exerciseFromElement);

    if (!exercises.length) {
      announce("Aucun exercice disponible pour generer une seance.");
      return;
    }
    if (exercises.some((exercise) =>
      !exercise.title ||
      !exercise.url ||
      !Number.isInteger(exercise.duration) ||
      exercise.duration < 1 ||
      exercise.duration > 480
    )) {
      announce("Un exercice a une duree ou des informations invalides. Verifiez ses donnees avant de generer la seance.");
      return;
    }
    if (workout.length && !window.confirm("Remplacer la seance actuelle par un entrainement aleatoire ?")) return;

    const generated = [];
    let remaining = target;
    let pool = shuffle(exercises);

    while (remaining > 0) {
      if (remaining < 5 && generated.length) {
        generated[generated.length - 1].duration += remaining;
        remaining = 0;
        break;
      }
      if (!pool.length) pool = shuffle(exercises);

      const exercise = { ...pool.pop(), id: createId() };
      const duration = Math.min(exercise.duration, remaining);
      generated.push({ ...exercise, duration });
      remaining -= duration;
    }

    workout = generated;
    const saved = saveWorkout();
    renderWorkout();
    announce(saved
      ? `Seance aleatoire generee : ${target} minutes.`
      : `Seance generee (${target} minutes), mais la sauvegarde a echoue.`);
  };

  const generatorForm = document.getElementById("workout-generator-form");
  if (generatorForm) {
    generatorForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const target = document.getElementById("workout-target").valueAsNumber;
      if (!Number.isInteger(target) || target < 15 || target > 480) {
        announce("Choisissez une duree comprise entre 15 et 480 minutes.");
        return;
      }
      generateWorkout(target);
    });
  }

  const clearButton = document.getElementById("clear-workout");
  if (clearButton) {
    clearButton.addEventListener("click", () => {
      if (!window.confirm("Vider completement cette seance ?")) return;
      workout = [];
      const saved = saveWorkout();
      renderWorkout();
      announce(saved ? "Seance videe." : "Seance videe, mais la sauvegarde a echoue.");
    });
  }

  const printButton = document.getElementById("print-workout");
  if (printButton) printButton.addEventListener("click", () => window.print());

  document.querySelectorAll(".exercise-add-button").forEach((button) => {
    button.addEventListener("click", () => {
      const exercise = exerciseFromElement(button);
      if (addExercise(exercise)) {
        button.textContent = "Ajouté — ajouter encore";
        button.classList.add("is-added");
      }
    });
  });

  window.addEventListener("storage", (event) => {
    if (event.key !== storageKey) return;
    workout = readWorkout();
    renderWorkout();
    announce("Seance mise a jour dans un autre onglet.");
  });

  workout = readWorkout();
  renderWorkout();
  initializePicker();
})();
