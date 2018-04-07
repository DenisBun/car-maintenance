export const headers = {
  'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
  'Content-Type': 'application/json; charset=utf-8'
};

export const HOST = 'http://localhost:3001/';

export const parseBody = body => JSON.stringify(body);