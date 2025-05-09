document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.createElement("div");
    hamburger.classList.add("hamburger");
    document.querySelector("header").appendChild(hamburger);

    const menu = document.querySelector("header ul");
    const workLink = document.querySelector(".work-link");
    const subMenu = document.querySelector(".sub-menu");
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("close-btn");
    closeBtn.textContent = "×"; // Unicode close symbol
    menu.appendChild(closeBtn); // Add close button to the menu

    // Toggle main menu
    hamburger.addEventListener("click", function(e) {
        e.stopPropagation();
        menu.classList.toggle("show");
        hamburger.classList.toggle("rotate");
    });

    // Toggle sub-menu
    workLink.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        subMenu.classList.toggle("show");
    });

    // Close menu when clicking the close button
    closeBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        menu.classList.remove("show");
        hamburger.classList.remove("rotate");
        subMenu.classList.remove("show");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function(e) {
        if (menu.classList.contains("show")) {
            menu.classList.remove("show");
            hamburger.classList.remove("rotate");
            subMenu.classList.remove("show");
        }
    });

    // Prevent menu click from closing it
    menu.addEventListener("click", function(e) {
        e.stopPropagation();
    });
});