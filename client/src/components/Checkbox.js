import { applyCSS, createTemplate, dataAttrSelector } from '../common/utils.js';

const html = /*html*/ `
  <input class="checkbox" type="checkbox" id="ck-complete-all" />
  <label for="ck-complete-all">Mark all as complete</label>
`;

const template = createTemplate(html);

const checkboxSelector = dataAttrSelector('component', 'checkbox');

const css = /*css*/ `
  ${checkboxSelector} {
    position: relative;
    flex-basis: 50%;
  }

  /* TODO: checkbox 별도의 컴포넌트로 분리 */
  ${checkboxSelector} .checkbox {
    display: none;
  }

  ${checkboxSelector} .checkbox + label {
    position: absolute; /* 부모 위치를 기준으로 */
    top: 50%;
    left: 15px;
    transform: translate3d(0, -50%, 0);
    display: inline-block;
    width: 90%;
    line-height: 2em;
    padding-left: 35px;
    cursor: pointer;
    user-select: none;
  }

  ${checkboxSelector} .checkbox + label:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate3d(0, -50%, 0);
    width: 20px;
    height: 20px;
    background-color: #fff;
    border: 1px solid #cfdadd;
  }

  ${checkboxSelector} .checkbox:checked + label:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 6px;
    transform: translate3d(0, -50%, 0);
    width: 10px;
    height: 10px;
    background-color: #23b7e5;
  }
`;

applyCSS(css);

const Checkbox = (props) => {
  const { currentTodos } = props;
  const newCheckbox = template.content.cloneNode(true);
  newCheckbox.querySelector('input').checked =
    currentTodos.length &&
    currentTodos.length ===
      currentTodos.filter((todo) => todo.completed).length;
  return newCheckbox;
};

export default Checkbox;
