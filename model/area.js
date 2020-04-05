const bookshelf = require('./base')();

var Area = bookshelf.Model.extend({
    tableName: 'mv_area',
    movie: function () {
        return this.belongsToMany(require('./movie'));
    }
});

module.exports = Area;