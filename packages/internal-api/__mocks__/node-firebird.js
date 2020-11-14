const Firebird = jest.requireActual("node-firebird");

let db = {};

Firebird.setMockDb = input => {
  db = { ...input };
};

Firebird.attach = (options, cb) => {
  cb(null, db);
};

module.exports = Firebird;
