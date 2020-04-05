const bookshelf = require('./base')();

var Performer = bookshelf.Model.extend({
    tableName: 'mv_performer',
    movie: function () {
        return this.belongsToMany(require('./movie'));
    }
});

module.exports = Performer;