document.addEventListener('DOMContentLoaded', function () {
  const menuItem = document.querySelector('li:has(.sub-menu)');
  const subMenu = menuItem.querySelector('.sub-menu');
  const workLink = menuItem.querySelector('.work-link');
  const navLinks = document.querySelectorAll('header ul li a');

  menuItem.addEventListener('click', function (e) {
      e.stopPropagation();
      subMenu.classList.toggle('show');
      menuItem.classList.toggle('active');
      workLink.classList.toggle('active');
  });

  // Add click event to all nav links
  navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
          // Remove 'clicked' from all
          navLinks.forEach(l => l.classList.remove('clicked'));

          // Add 'clicked' to the clicked one
          this.classList.add('clicked');
      });
  });

  // Close submenu and remove active styles when clicking outside
  document.addEventListener('click', function () {
      subMenu.classList.remove('show');
      menuItem.classList.remove('active');
      workLink.classList.remove('active');
  });
});