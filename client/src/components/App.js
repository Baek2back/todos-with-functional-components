import { applyCSS, createTemplate, dataAttrSelector } from '../common/utils.js';

const html = /*html*/ `
  <header>
    <h1 class="title">Todos</h1>
    <div class="ver">with Functional Components</div>
  </header>
  <main>
    <input class="input-todo" placeholder="What needs tobe done?" autofocus />
    <section data-component="filters"></section>
    <section data-component="todos"></section>
  </main>
  <footer>
    <div class="complete-all">
      <input class="checkbox" type="checkbox" id="ck-complete-all" />
      <label for="ck-complete-all">Mark all as complete</label>
    </div>
    <div class="clear-completed">
      <button class="btn">Clear completed (<span class="complete-todos">0</span>)</button>
      <section data-component="counter"></section> items left
    </div>
  </footer>
`;

const appSelector = dataAttrSelector('component', 'app');

const css = /*css*/ `
  ${appSelector} {
    max-width: 750px;
    min-width: 450px;
    margin: 0 auto;
    padding: 15px;
  }

  ${appSelector} .title {
    /* margin: 10px 0; */
    font-size: 4.5em;
    font-weight: 100;
    text-align: center;
    color: #23b7e5;
  }

  ${appSelector} .ver {
    font-weight: 100;
    text-align: center;
    color: #23b7e5;
    margin-bottom: 30px;
  }

  ${appSelector} .input-todo {
    display: block;
    width: 100%;
    height: 45px;
    padding: 10px 16px;
    font-size: 18px;
    line-height: 1.3333333;
    color: #555;
    border: 1px solid #ccc;
    border-color: #e7ecee;
    border-radius: 6px;
    outline: none;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  }

  ${appSelector} .input-todo:focus {
    border-color: #23b7e5;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(102, 175, 233, 0.6);
  }

  ${appSelector} .input-todo::-webkit-input-placeholder {
    color: #999;
  }

  ${appSelector} footer {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
  }
  
  ${appSelector} .complete-all,
  ${appSelector} .clear-completed {
    position: relative;
    flex-basis: 50%;
  }

  /* TODO: checkbox 별도의 컴포넌트로 분리 */
  ${appSelector} .checkbox {
    display: none;
  }
  
  ${appSelector} .checkbox + label {
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
  
  ${appSelector} .checkbox + label:before {
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
  
  ${appSelector} .checkbox:checked + label:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 6px;
    transform: translate3d(0, -50%, 0);
    width: 10px;
    height: 10px;
    background-color: #23b7e5;
  }
  
  ${appSelector} .clear-completed {
    text-align: right;
    padding-right: 15px;
  }
  
  ${appSelector} .btn {
    padding: 1px 5px;
    font-size: 0.8em;
    line-height: 1.5;
    border-radius: 3px;
    outline: none;
    color: #333;
    background-color: #fff;
    border-color: #ccc;
    cursor: pointer;
  }
  
  ${appSelector} .btn:hover {
    color: #333;
    background-color: #e6e6e6;
    border-color: #adadad;
  }
`;

applyCSS(css);

const template = createTemplate(html);

const App = (targetElement) => {
  const newApp = targetElement.cloneNode();
  newApp.appendChild(template.content.cloneNode(true));
  return newApp;
};

export default App;
