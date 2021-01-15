const dataAttrSelector = (attr, component) => `[data-${attr}=${component}]`;

export const appSelector = dataAttrSelector('component', 'app');
export const buttonSelector = dataAttrSelector('component', 'button');
export const checkboxSelector = dataAttrSelector('component', 'checkbox');
export const counterSelector = dataAttrSelector('component', 'counter');
export const filtersSelector = dataAttrSelector('component', 'filters');
export const todoSelector = dataAttrSelector('component', 'todo');
export const todosSelector = dataAttrSelector('component', 'todos');
