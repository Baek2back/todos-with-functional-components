import { applyCSS, createTemplate, dataAttrSelector } from '../common/utils.js';
import eventCreators from '../model/eventCreators.js';

const html = /*html*/ `
  <ul class="nav">
    <li id="all">All</li>
    <li id="active">Active</li>
    <li id="completed">Completed</li>
  </ul>
`;

const filtersSelector = dataAttrSelector('component', 'filters');

const css = /*css*/ `
  ${filtersSelector} .nav {
    display: flex;
    margin: 15px;
    list-style: none;
  }

  ${filtersSelector} .nav > li {
    padding: 4px 10px;
    border-radius: 4px;
    cursor: pointer;
  }

  ${filtersSelector} .nav > li.active {
    color: #fff;
    background-color: #23b7e5;
  }
`;

applyCSS(css);

const template = createTemplate(html);

const Filters = (targetElement, { currentFilter }, dispatch) => {
  const newFilters = targetElement.cloneNode(true);

  if (!newFilters.children.length)
    newFilters.appendChild(template.content.cloneNode(true));

  [...newFilters.querySelectorAll('li')].forEach((li) => {
    li.textContent === currentFilter
      ? li.classList.add('active')
      : li.classList.remove('active');
  });

  newFilters.addEventListener('click', (e) => {
    if (!e.target.matches(`${filtersSelector} li`)) return;
    dispatch(eventCreators.changeFilter(e.target.textContent));
  });

  return newFilters;
};

export default Filters;
