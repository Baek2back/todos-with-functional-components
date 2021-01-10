const http = require('http');
let options = {
  host: '127.0.0.1',
  port: 8000,
  headers: { 'Content-Type': 'application/json' }
};

const request = (cb, params) => {
  const req = http.request(options, (res) => {
    let data = [];
    res
      .on('data', (chunk) => {
        data = [...data, chunk];
      })
      .on('end', () => {
        data = Buffer.concat(data).toString();
        console.log(options, data);
        cb();
      });
  });
  if (params) req.write(JSON.stringify(params));
  req.end();
};

const todos = (callback) => {
  const todos_post = (cb) => {
    options = { ...options, method: 'POST', path: '/todos' };
    request(cb, {
      id: 'wefnklwfnklwenlfknwklf',
      content: 'test',
      completed: 'false'
    });
  };

  const todos_get = (cb) => {
    options = { ...options, method: 'GET', path: '/todos' };
    request(cb);
  };

  const todos_delete = (cb) => {
    options = {
      ...options,
      method: 'DELETE',
      path: '/todos?id=wefnklwfnklwenlfknwklf'
    };
    request(cb);
  };

  todos_post(() => {
    todos_get(() => {
      todos_delete(callback);
    });
  });
};

todos(() => console.log('test completed!'));
