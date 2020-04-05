const bookshelf = require('./base')();

var Director = bookshelf.Model.extend({
    tableName: 'mv_director',
    movie: function () {
        return this.belongsToMany(require('./movie'));
    }
});

module.exports = Director;