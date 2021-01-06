export default {
  render() {
    return `${this.html()}
            ${this.css()}`;
  },
  html() {
    return /*html*/ `
    <ul class="todos">
      <todos-todo></todos-todo>
    </ul>
    `;
  },
  css() {
    return /*html*/ `
    <style>
      .todos {
        margin-top: 20px;
      }
    </style>
    `;
  }
};
