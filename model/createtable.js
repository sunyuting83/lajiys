const dbConfig = require('./db_config')
    , knex = require('knex')(dbConfig)
    , Bookshelf = require('bookshelf')(knex)
    , fs = require('fs')
    , makeTopClass = require('./createTopClass')
    , makeClass = require('./createClass');
// Create a table
Bookshelf.knex.schema.createTable('mv_classify', function(table) {
    table.increments('id').unsigned().primary();
    table.integer('top_id').unsigned().references('mv_classify.id');
    table.string('c_name');
    table.string('other');
    table.comment('分类表');
  })
  .createTable('mv_movie', function(table) {
    table.increments('id').unsigned().primary();
    table.integer('cid').unsigned().references('mv_classify.id');
    table.string('title');
    table.string('entitle');
    table.string('other');
    table.timestamps();
    table.index('title', 'ix_mv_movie_title');
    table.index('entitle', 'ix_mv_movie_entitle');
    table.comment('电影表');
  })
  // ...and another
  .createTable('mv_area', function(table) {
    table.increments('id').primary();
    table.string('a_name', 100);
    table.integer('count').defaultTo(0);
    table.index('id', 'ix_mv_area_id');
    table.comment('area表');
  })
  // ...and another
  .createTable('mv_area_mv_movie', function(table) {
    table.increments('id');
    table.integer('mv_movie_id').unsigned().references('mv_movie.id');
    table.integer('mv_area_id').unsigned().references('mv_area.id');
    table.comment('area-movie联表');
  })
  // ...and another
  .createTable('mv_director', function(table) {
    table.increments('id').primary();
    table.string('d_name', 100);
    table.integer('count').defaultTo(0);
    table.index('id', 'ix_mv_director_id');
    table.comment('director表');
  })
  // ...and another
  .createTable('mv_director_mv_movie', function(table) {
    table.increments('id');
    table.integer('mv_movie_id').unsigned().references('mv_movie.id');
    table.integer('mv_director_id').unsigned().references('mv_director.id');
    table.comment('director-movie联表');
  })
  // ...and another
  .createTable('mv_performer', function(table) {
    table.increments('id').primary();
    table.string('p_name', 100);
    table.integer('count').defaultTo(0);
    table.index('id', 'ix_mv_performer_id');
    table.comment('performer表');
  })
  // ...and another
  .createTable('mv_movie_mv_performer', function(table) {
    table.increments('id');
    table.integer('mv_movie_id').unsigned().references('mv_movie.id');
    table.integer('mv_performer_id').unsigned().references('mv_performer.id');
    table.comment('performer-movie联表');
  })
  .then(async function() {
    console.log('table created');
    await makeTopClass();
  })
  .then(async function() {
    console.log('TopClass created');
    await makeClass();
  })
  .then(function() {
    console.log('SmallClass created');
    process.exit();
  })
  // Finally, add a .catch handler for the promise chain
  .catch(function(e) {
    console.error(e);
    fs.unlinkSync('./movie.sqlite');
    process.exit();
  });