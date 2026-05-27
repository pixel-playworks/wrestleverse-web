/*
  Close the mobile menu when a link is clicked, this code is needed because the default HTML details element will not close when a link is clicked
  
*/
document
  .querySelectorAll<HTMLDetailsElement>(".mobile-menu")
  .forEach((menu) => {
    menu.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("a")) {
        menu.open = false;
      }
    });
  });

export { };