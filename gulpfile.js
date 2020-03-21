const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
var fileinclude = require("gulp-file-include");

//Logs a starting message.
gulp.task("startmessage", async () => {
  return console.log("Gulp is running...");
});

//Copies ALL HTML files.
gulp.task("copyhtml", async () => {
  gulp.src("src/*.html").pipe(gulp.dest("dist"));
});

//Optimizes images files.
gulp.task("imagemin", () =>
  gulp
    .src("src/images/**")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"))
);

//Compiles Sass.
gulp.task("sass", async () => {
  gulp
    .src("src/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
});

//Concatinates and optimizes all JavaScipt files.
gulp.task("optimizeJS", async () => {
  gulp
    .src("src/scripts/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/scripts"));
});

//Includes html files.
gulp.task("fileinclude", async () => {
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

//Watches
gulp.task("watch", function() {
  gulp.watch("src/scripts/*.js", gulp.series("optimizeJS"));
  gulp.watch("src/images/*", gulp.series("imagemin"));
  gulp.watch("src/scss/**/*.scss", gulp.series("sass"));
  gulp.watch("src/*html", gulp.series("fileinclude"));
});

//Runs all tasks (default).
gulp.task(
  "default",
  gulp.parallel([
    "startmessage",
    "fileinclude",
    "copyhtml",
    "imagemin",
    "sass",
    "optimizeJS"
  ])
);
