const {src, dest, watch, series} = require('gulp');
const sass = require ('gulp-sass')(require('sass'));
const postcss = require ('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require ('browser-sync');

// SASS Task
function scssTask() {
  return src('app/scss/main.scss', {sourcemaps:true})
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest('dist', { sourcemaps: '.'}));
}

// Javascript task
function jsTask() {
  return src('app/js/java01.js', {sourcemaps:true})
    .pipe(terser())
    .pipe(dest('dist', { sourcemaps: '.'}));
}

// Broswersynch tasks
function browsersyncServer(cb) {
  browsersync.init({
    server: {
      baseDir: '.'
    }
  });
  cb();
}
function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask(){
  watch('*.html', browsersyncReload);
  watch(['app/scss/main.scss', 'app/js/java01.js'], series(scssTask, jsTask, browsersyncReload));
}

// Default Gulp Task
exports.default = series(
  scssTask,
  jsTask,
  browsersyncServer,
  watchTask
);

// Export Build Gulp Task
exports.build = series(scssTask, jsTask);