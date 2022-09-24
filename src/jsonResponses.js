const users = {};

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  return respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Message: Name and age are both required,',
  };

  if (!body.age || !body.name) {
    responseJSON.id = 'addMissingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let status = 204;

  if (!users[body.name]) {
    status = 201;
    users[body.name] = {};
  }

  users[body.name].age = body.age;
  users[body.name].name = body.name;

  if (status === 201) {
    responseJSON.message = 'User succesfully created.';
    return respondJSON(request, response, 201, responseJSON);
  }

  return respondJSONMeta(request, response, 204);
};

module.exports = {
  getUsers,
  getUsersMeta,
  addUser,
  notFound,
  notFoundMeta,
};
