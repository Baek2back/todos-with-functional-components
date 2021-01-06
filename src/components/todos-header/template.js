export default {
  render() {
    return `${this.html()}
            ${this.css()}`;
  },

  html() {
    return /*html*/ `
    <h1 class="title">Todos</h1>
    <div class="ver">with Web Components</div>
    `;
  },

  css() {
    return /*html*/ `
    <style>
      .title {
        font-size: 4.5em;
        font-weight: 100;
        text-align: center;
        color: #23b7e5;
      }
      .ver {
        font-weight: 100;
        text-align: center;
        color: #23b7e5;
        margin-bottom: 30px;
      }
    </style>
    `;
  }
};
