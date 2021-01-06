export default {
  render() {
    return `${this.html()}
            ${this.css()}`;
  },

  html() {
    return /*html*/ `
    <ul class="nav">
      <li id="all" class="active">All</li>
      <li id="active">active</li>
      <li id="completed">completed</li>
    </ul>
    `;
  },

  css() {
    return /*html*/ `
    <style>
      .nav {
        display: flex;
        margin: 15px;
        list-style: none;
      }
      .nav > li {
        padding: 4px 10px;
        border-radius: 4px;
        cursor: pointer;
      }
      .nav > li.active {
        color: #fff;
        background-color: #23b7e5;
      }
    </style>
    `;
  }
};
