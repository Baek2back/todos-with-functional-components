const http = require('http');
const url = require('url');
const querystring = require('querystring');

const todos = require('./todos.js');

/**
 * HTTP 헤더에 JSON 형식으로 응답
 * @param {*} res response 객체
 * @param {*} packet 결과 파라미터
 */
const response = (res, packet) => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(packet));
};

/**
 * 요청에 대해 모듈 별로 분기
 * @param {*} res response 객체
 * @param {*} method 메서드
 * @param {*} pathname URI
 * @param {*} params 입력 파라미터
 */
const onRequest = (res, method, pathname, params) => {
  switch (pathname) {
    case '/todos':
      todos.onRequest(res, method, pathname, params, response);
      break;
    default:
      res.writeHead(404);
      return res.end();
  }
};

/**
 * HTTP 프로토콜은 메서드 별로 입력 파라미터를 얻어 오는 방식이 다르다.
 * [POST, PUT] => data, end 이벤트를 통해 획득
 * [GET, DELETE] => url 모듈의 parse 기능을 통해 얻음(deprecated)
 */

http
  .createServer((req, res) => {
    const method = req.method;
    const uri = url.parse(req.url, true);
    const pathname = uri.pathname;

    let body = [];
    switch (method) {
      case 'POST':
      case 'PUT':
        req
          .on('data', (chunk) => {
            body = [...body, chunk];
          })
          .on('end', () => {
            body = Buffer.concat(body).toString();
            const params =
              req.headers['content-type'] === 'application/json'
                ? JSON.parse(body)
                : querystring.parse(body);
            onRequest(res, method, pathname, params);
          });
        break;
      default:
        onRequest(res, method, pathname, uri.query);
        break;
    }
  })
  .listen(8000);
