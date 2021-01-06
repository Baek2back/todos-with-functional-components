export default {
  render() {
    return `${this.html()}
            ${this.css()}`;
  },

  html() {
    return /*html*/ `
    <todos-header></todos-header>
    <todos-input></todos-input>
    <todos-nav></todos-nav>
    <todos-todo-list></todos-todo-list>
    <todos-footer></todos-footer>
    `;
  },

  css() {
    return /*html*/ `
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
    />
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
    </style>
    `;
  }
};
