const tokens = {};

module.exports.find = (key, done) => {
  if (tokens[key]) return done(null, tokens[key]);
  return done(new Error('Token Not Found'));
};

module.exports.findByUserIdAndClientId = (username, clientId, done) => {
  for (const token in tokens) {
    if (tokens[token].username === username && tokens[token].clientId === clientId) return done(null, token);
  }
  return done(new Error('Token Not Found'));
};

module.exports.save = (token, username, clientId, done) => {
  tokens[token] = { username, clientId };
  done();
};

module.exports.removeByUserIdAndClientId = (username, clientId, done) => {
  for (const token in tokens) {
      if (tokens[token].username === username && tokens[token].clientId === clientId) {
          delete tokens[token];
          return done(null);
      }
  }
  return done(new Error('Token Not Found'));
};