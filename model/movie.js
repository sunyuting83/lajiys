const bookshelf = require('./base')();

var Movie = bookshelf.Model.extend({
  tableName: 'mv_movie',
  hasTimestamps: true,
  classify: function() {
    return this.belongsTo(require('./classify'));
  },
  performer: function() {
    return this.belongsToMany(require('./performer'));
  },
  area: function() {
    return this.belongsToMany(require('./area'));
  },
  director: function() {
    return this.belongsToMany(require('./director'));
  }
});

// 添加演员
Movie.prototype.aPerformer = function(d) {
  const Performer = require('./performer');
  return Performer.forge({
      'p_name': d
    })
    .fetch({
          require: false
      })
    .bind(this)
    .then(function(has) {
      if (has) {
        this.performer().attach(has.id); //追加到关联表
        return;
      } else {
        return Performer.forge({
            'p_name': d,
          }).save()
          .bind(this)
          .then(function(performer) {
            // console.log(this.id, performer.id);
            this.performer().attach(performer.id); //追加到关联表
            return;
          });
      }
    });
};
// 添加地区
Movie.prototype.aArea = function(d) {
  const Area = require('./area');
  return Area.forge({
      'a_name': d
    })
    .fetch({
          require: false
      })
    .bind(this)
    .then(function(has) {
      if (has) {
        this.area().attach(has.id); //追加到关联表
        return;
      } else {
        return Area.forge({
            'a_name': d,
          }).save()
          .bind(this)
          .then(function(area) {
            // console.log(this.id, writer.id);
            this.area().attach(area.id); //追加到关联表
            return;
          });
      }
    });
};
// 添加导演
Movie.prototype.aDirector = function(d) {
  const Director = require('./director');
  return Director.forge({
      'd_name': d
    })
    .fetch({
          require: false
      })
    .bind(this)
    .then(function(has) {
      if (has) {
        this.director().attach(has.id); //追加到关联表
        return;
      } else {
        return Director.forge({
            'd_name': d,
          }).save()
          .bind(this)
          .then(function(director) {
            // console.log(this.id, writer.id);
            this.director().attach(director.id); //追加到关联表
            return;
          });
      }
    });
};

module.exports = Movie;