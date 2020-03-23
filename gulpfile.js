const gulp = require("gulp");
const fileinclude = require("gulp-file-include");
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");

//Logs a starting message.
gulp.task("startmessage", async () => {
  return console.log("Gulp is running...");
});

//Includes HTML and exports them to a distribution folder.
gulp.task("exportHTML", async () => {
  gulp
    .src(["src/*.html"])
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    .pipe(gulp.dest("dist"));
});

//Optimizes images files and copies them to a distribution folder.
gulp.task("imagemin", () =>
  gulp
    .src("src/images/**")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"))
);

//Compiles Sass into a distribution folder.
gulp.task("sass", async () => {
  gulp
    .src("src/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
});

//Optimizes all JavaScipt files.
gulp.task("optimizeJS", async () => {
  gulp
    .src("src/scripts/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/scripts"));
});

//Watches
gulp.task("watch", function() {
  gulp.watch("src/scripts/*.js", gulp.series("optimizeJS"));
  gulp.watch("src/images/*", gulp.series("imagemin"));
  gulp.watch("src/scss/**/*.scss", gulp.series("sass"));
  gulp.watch("src/*html", gulp.series("exportHTML"));
});

//Runs all tasks (default).
gulp.task(
  "default",
  gulp.parallel([
    "startmessage",
    "exportHTML",
    "imagemin",
    "sass",
    "optimizeJS"
  ])
);
