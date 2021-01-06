export default {
  render() {
    return `${this.html()}
            ${this.css()}`;
  },

  html() {
    return /*html*/ `
    <footer>
      <div class="complete-all">
        <input class="checkbox" type="checkbox" id="ck-complete-all" />
        <label for="ck-complete-all">Mark all as complete</label>
      </div>
      <div class="clear-completed">
        <button class="btn">Clear completed (<span class="completed-todos">0</span>)</button>
        <strong class="active-todos">0</strong> items left
      </div>
    </footer>
    `;
  },

  css() {
    return /*html*/ `
    <style>
      footer {
        display: flex;
        justify-content: space-between;
        margin: 20px 0;
      }
      .complete-all, .clear-completed {
        position: relative;
        flex-basis: 50%;
      }

      .clear-completed {
        text-align: right;
        padding-right: 15px;
      }

      .btn {
        padding: 1px 5px;
        font-size: .8em;
        line-height: 1.5;
        border-radius: 3px;
        outline: none;
        color: #333;
        background-color: #fff;
        border-color: #ccc;
        cursor: pointer;
      }

      .btn:hover {
        color: #333;
        background-color: #e6e6e6;
        border-color: #adadad;
      }
    </style>
    `;
  }
};
