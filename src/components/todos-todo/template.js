export default {
  render() {
    return `${this.html()}
            ${this.css()}`;
  },
  html() {
    return /*html*/ `
    <li id="1" class="todo-item">
      <input id="ck-1" class="checkbox" type="checkbox" />
      <label for="ck-1">HTML</label>
      <i class="remove-todo far fa-times-circle"></i>
    </li>
    `;
  },
  css() {
    return /*html*/ `
    <style>
      .todo-item {
        position: relative;
        height: 50px;
        padding: 10px 15px;
        margin-bottom: -1px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-color: #e7ecee;
        list-style: none;
      }

      .todo-item:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }

      .todo-item:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }

      .checkbox {
        display: none;
      }

      .checkbox + label {
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

      .checkbox + label:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate3d(0, -50%, 0);
        width: 20px;
        height: 20px;
        background-color: #fff;
        border: 1px solid #cfdadd;
      }

      .checkbox:checked + label:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 6px;
        transform: translate3d(0, -50%, 0);
        width: 10px;
        height: 10px;
        background-color: #23b7e5;
      }

      /* .remove-todo button */
      .remove-todo {
        display: none;
        position: absolute;
        top: 50%;
        right: 10px;
        cursor: pointer;
        transform: translate3d(0, -50%, 0);
      }

      /* todo-item이 호버 상태이면 삭제 버튼을 활성화 */
      .todo-item:hover > .remove-todo {
        display: block;
      }
    </style>
    `;
  }
};
