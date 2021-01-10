const mysql = require('mysql2');
const { conn } = require('./config.js');
/**
 * Todo 등록 기능
 * @param {*} method 메서드
 * @param {*} pathname URI
 * @param {*} params 입력 파라미터
 * @param {*} cb 콜백
 */
const register = (method, pathname, params, cb) => {
  const { key, id, content, completed } = params;
  let response = {
    key,
    errorcode: 0,
    errormessage: 'success'
  };

  if (!(id && content && completed)) {
    cb({ ...response, errorcode: 1, errormessage: 'Invalid Parameters' });
  }
  const connection = mysql.createConnection(conn);
  connection.connect();
  connection.query(
    `insert into todos(id, content, completed) values(?, ?, ?)`,
    [id, content, completed],
    (error) => {
      if (error) response = { ...response, errorcode: 1, errormessage: error };
      cb(response);
    }
  );
  connection.end();
};

/**
 * Todo 조회 기능
 * @param {*} method 메서드
 * @param {*} pathname URI
 * @param {*} params 입력 파라미터
 * @param {*} cb 콜백
 */
const inquiry = (method, pathname, params, cb) => {
  const { key } = params;
  let response = {
    key,
    errorcode: 0,
    errormessage: 'success'
  };
  const connection = mysql.createConnection(conn);
  connection.connect();
  connection.query(`select * from todos`, (error, results) => {
    if (error || !results.length) {
      response = {
        ...response,
        errorcode: 1,
        errormessage: error || 'no data'
      };
    } else {
      response = { ...response, results };
    }
    cb(response);
  });
  connection.end();
};

/**
 * Todo 삭제 기능
 * @param {*} method 메서드
 * @param {*} pathname URI
 * @param {*} params 입력 파라미터
 * @param {*} cb 콜백
 */
const unregister = (method, pathname, params, cb) => {
  const { key, id } = params;
  let response = {
    key,
    errorcode: 0,
    errormessage: 'success'
  };
  if (!id) {
    response = {
      ...response,
      errorcode: 1,
      errormessage: 'Invalid Parameters'
    };
    cb(response);
  }
  const connection = mysql.createConnection(conn);
  connection.connect();
  connection.query(`delete from todos where id = ?`, [id], (error) => {
    if (error) response = { ...response, errorcode: 1, errormessage: error };
    cb(response);
  });
  connection.end();
};

exports.onRequest = (res, method, pathname, params, cb) => {
  switch (method) {
    case 'POST':
      return register(method, pathname, params, (response) =>
        process.nextTick(cb, res, response)
      );
    case 'GET':
      return inquiry(method, pathname, params, (response) =>
        process.nextTick(cb, res, response)
      );
    case 'DELETE':
      return unregister(method, pathname, params, (response) =>
        process.nextTick(cb, res, response)
      );
    default:
      return process.nextTick(cb, res, null);
  }
};
