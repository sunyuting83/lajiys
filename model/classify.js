const bookshelf = require('./base')();

var Classify = bookshelf.Model.extend({
    tableName: 'mv_classify',
    movie: function () {
        return this.hasMany(require('./movie'));
    }
});

module.exports = Classify;