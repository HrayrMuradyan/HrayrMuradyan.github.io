document.addEventListener('DOMContentLoaded', function () {
    const menuItem = document.querySelector('li:has(.sub-menu)');
    const subMenu = menuItem.querySelector('.sub-menu');
    const workLink = menuItem.querySelector('.work-link');
  
    menuItem.addEventListener('click', function (e) {
      e.stopPropagation();
      subMenu.classList.toggle('show');
      menuItem.classList.toggle('active');
      workLink.classList.toggle('active');
    });
  
    // Close submenu and remove active styles when clicking outside
    document.addEventListener('click', function () {
      subMenu.classList.remove('show');
      menuItem.classList.remove('active');
      workLink.classList.remove('active');
    });
  });