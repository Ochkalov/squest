export const createElement = (template) => {
    const outer = document.createElement(`div`);
    outer.innerHTML = template;
    return outer;
};

const main = document.getElementById(`main`);

export const changeView = (view) => {
    main.innerHTML = ``;
    main.appendChild(view.element);
};