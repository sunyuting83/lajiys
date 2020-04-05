const path = require('path');

let db_config = {
  "client": "sqlite3",
  "connection": {
    "filename": path.join(__dirname, '../movie.sqlite')
  },
  "useNullAsDefault": true
};

module.exports = db_config;