const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const concat = require("gulp-concat");

/*
    -- TOP LEVEL FUNCTIONS --
    gulp.task - Define tasks
    gulp.src - Point to files to use
    gulp.dest - Point to folder to output
    gulp.watch - Watch files and folders for changes
*/

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
    .src("src/images/*")
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

//Runs all tasks (default).
gulp.task(
  "default",
  gulp.parallel(["startmessage", "copyhtml", "imagemin", "sass", "optimizeJS"])
);

//Watches
gulp.task("watch", function() {
  gulp.watch("src/scripts/*.js", gulp.series("optimizeJS"));
  gulp.watch("src/images/*", gulp.series("imagemin"));
  gulp.watch("src/scss/*.scss", gulp.series("sass"));
  gulp.watch("src/*html", gulp.series("copyhtml"));
});
