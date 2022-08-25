(() => {
  function bind(nodes, event, handler) {
    Array.from(nodes).forEach((node) => {
      node.addEventListener(event, handler);
    });
  }

  function makeTabs(node) {
    let selected = node.querySelector(".section__tab_active").dataset.id;
    const tabs = node.querySelectorAll(".section__tab");
    const list = Array.from(tabs).map((node) => node.dataset.id);
    const select = node.querySelector(".section__select");

    select.addEventListener("input", () => {
      selectTab(select.value);
    });

    bind(tabs, "click", (event) => {
      const newId = event.target.dataset.id;
      selectTab(newId);
    });

    bind(tabs, "keydown", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
        return;
      }

      let index = list.indexOf(selected);
      if (event.which === 37) {
        // left
        --index;
      } else if (event.which === 39) {
        // right
        ++index;
      } else if (event.which === 36) {
        // home
        index = 0;
      } else if (event.which === 35) {
        // end
        index = list.length - 1;
      } else {
        return;
      }

      if (index >= list.length) {
        index = 0;
      } else if (index < 0) {
        index = list.length - 1;
      }

      selectTab(list[index]);
      event.preventDefault();
    });
  }

  function makeMenu(node) {
    let expanded = false;
    const links = document.querySelector(".header__links");

    node.addEventListener("click", () => {
      expanded = !expanded;
      node.setAttribute("aria-expanded", expanded ? "true" : "false");
      node.querySelector(".header__menu-text").textContent = expanded
        ? "Закрыть меню"
        : "Открыть меню";
      links.classList.toggle("header__links_opened", expanded);
      links.classList.add("header__links-toggled");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    Array.from(document.querySelectorAll(".main__devices")).forEach(makeTabs);
    Array.from(document.querySelectorAll(".header__menu")).forEach(makeMenu);
  });
})();
