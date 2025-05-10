let projects = [];

fetch('../../metadata/projects.json')
  .then(response => response.json())
  .then(data => {
    projects = data;
    init();
  })
  .catch(error => console.error('Error loading projects:', error));

function init() {
  const filtersContainer = document.getElementById("keyword-filters");
  const projectsContainer = document.getElementById("projects-container");

  function renderFilters() {
    filtersContainer.innerHTML = "";

    const keywordCounts = {};
    projects.forEach(p => {
      p.keywords.forEach(k => {
        keywordCounts[k] = (keywordCounts[k] || 0) + 1;
      });
    });

    const sortedKeywords = Object.keys(keywordCounts).sort((a, b) => keywordCounts[b] - keywordCounts[a]);

    sortedKeywords.forEach(keyword => {
      const btn = document.createElement("button");
      btn.textContent = `${keyword} (${keywordCounts[keyword]})`;
      btn.className = "keyword-btn";
      btn.addEventListener("click", () => {
        btn.classList.toggle("active");
        renderProjects();
      });
      filtersContainer.appendChild(btn);
    });
  }

  function renderProjects() {
    const activeKeywords = Array.from(document.querySelectorAll(".keyword-btn.active"))
      .map(btn => btn.textContent.split(" (")[0]);

    const filteredProjects = activeKeywords.length
      ? projects.filter(p => activeKeywords.every(k => p.keywords.includes(k)))
      : projects;

    projectsContainer.innerHTML = "";

    filteredProjects.forEach(p => {
      const card = document.createElement("div");
      card.className = "project-card";

      const content = document.createElement("div");
      content.className = "project-content";
      content.innerHTML = `
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-keywords">
          ${p.keywords.map(keyword => `<button class="keyword-btn">${keyword}</button>`).join('')}
        </div>
        <div class="project-impact">Impact: ${p.impact}</div>
        <div class="project-links"><a href="${p.github}" target="_blank">GitHub ↗</a></div>
      `;

      const image = document.createElement("img");
      image.src = p.image;
      image.alt = p.title;
      image.className = "project-image";

      card.appendChild(content);
      card.appendChild(image);  // Image is placed on the right column
      projectsContainer.appendChild(card);
    });
  }

  renderFilters();
  renderProjects();
}