var gulp = require("gulp"),
  concat = require("gulp-concat"),
  autoprefixer = require("gulp-autoprefixer"),
  sass = require("gulp-sass")(require("sass")),
  uglify = require("gulp-uglify"),
  notify = require("gulp-notify"),
  htmlminify = require("gulp-html-minify");
// imagemin = require("gulp-imagemin"),
(rollup = require("gulp-better-rollup")),
  (babel = require("rollup-plugin-babel")),
  (resolve = require("rollup-plugin-node-resolve")),
  (commonjs = require("rollup-plugin-commonjs")),
  // (deleteSync = require("del")),
  (rtlcss = require("gulp-rtlcss")),
  (rename = require("gulp-rename")),
  (browsersync = require("browser-sync")),
  (fileinclude = require("gulp-file-include")),
  (sourcemaps = require("gulp-sourcemaps"));
 


// Paths
var nameTheme = ".";
(inputDir = nameTheme + "/src/"),
  (outputDir = nameTheme + "/builds/"),
  (paths = {
    html: inputDir + "*.html",
    css: inputDir + "*.css",
    sass: inputDir + "assets/scss/*.scss",
    js: inputDir + "assets/js/*.js",
    fonts: inputDir + "assets/fonts/**",
    images: inputDir + "assets/images/**/*.{JPG,jpg,png,gif,svg}",
  });

// cleaning the dist directory
function clean(done) {
  deleteSync(outputDir);
  done();
}

// Html Task
gulp.task("html", function () {
  return gulp
    .src([paths.html])
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )

    .pipe(gulp.dest(outputDir));
});

// Sass Task
gulp.task("sass", () => {
  return gulp
    .src(paths.sass)
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer("last 2 versions"))
    .pipe(concat("app.css"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(outputDir + "assets/css/"))
    .pipe(notify("Sass Task Done"));
});

// Fonts Task
gulp.task("fonts", () => {
  return gulp.src(paths.fonts).pipe(gulp.dest(outputDir + "assets/fonts/"));
});

// Images Task
gulp.task("images", () => {
  return gulp.src(paths.images).pipe(gulp.dest(outputDir + "assets/images/"));
});

// Scripts Task
gulp.task("scripts", () => {
  // .src(paths.js)
  // .pipe(concat("app.js"))
  // .pipe(rename({ suffix: ".min" }))
  // .pipe(gulp.dest(outputDir + "assets/js/"));

  return gulp
    .src(paths.js)
    .pipe(concat("app.js"))
    .pipe(rollup({ plugins: [babel(), resolve(), commonjs()] }, "umd"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(outputDir + "assets/js/"))
    .pipe(notify("Script Task Done"));
});
// live browser loading
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: outputDir,
      routes: {
        "assets/": outputDir,
      },
    },
  });
  done();
}

function reloadBrowserSync(done) {
  browsersync.reload();
  done();
}

// watch all changes
function watchFiles() {
  gulp.watch(paths.html, gulp.series("html", reloadBrowserSync));
  gulp.watch(paths.sass, gulp.series("sass", reloadBrowserSync));
  gulp.watch(paths.js, gulp.series("scripts", reloadBrowserSync));
  gulp.watch(paths.fonts, gulp.series("fonts", reloadBrowserSync));
  gulp.watch(paths.images, gulp.series("images", reloadBrowserSync));
}

// watch all changes
gulp.task("watch", gulp.parallel(watchFiles, browserSync));

gulp.task(
  "build",
  gulp.series("html", "sass", "scripts", "fonts", "images", "watch")
);
