"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const htmlmin = require("gulp-htmlmin");
const webserver = require("gulp-webserver");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const pipeline = require("readable-stream").pipeline;

const browserify = require("browserify");
const source = require("vinyl-source-stream");
const babelify = require("babelify");
const concat = require("gulp-concat");

sass.compiler = require("node-sass");

gulp.task("default", watch);

gulp.task("sass", compileSass);

gulp.task("html", compileHTML);

gulp.task("webserver", webServer);

const paths = {
  styles: {
    src: "src/scss/**/*.scss",
    dest: "./public/css",
  },
  bootstrap: {
    css: "./node_modules/bootstrap/dist/css/bootstrap.min.css",
    js: "./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
  },
  scripts: {
    dest: "./public/js",
  },
};

function copyBootstrap() {
  return gulp
    .src([paths.bootstrap.css, paths.bootstrap.js])
    .pipe(
      gulp.dest((file) =>
        file.extname === ".css" ? paths.styles.dest : paths.scripts.dest
      )
    );
}

function copyAssets() {
  return gulp.src("./src/assets/**/*").pipe(gulp.dest("./public/assets"));
}

function compressJs() {
  return browserify({
    entries: ["./src/js/main.js"],
    debug: true,
  })
    .transform(
      babelify.configure({
        presets: ["@babel/preset-env"],
      })
    )
    .bundle()
    .pipe(source("main.js"))
    .pipe(gulp.dest("./public/js"));
}

function compileSass() {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./public/css"));
}

function compileHTML() {
  return gulp
    .src("./src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./public"));
}

function webServer() {
  return gulp.src("public").pipe(
    webserver({
      livereload: true,
      open: true,
      port: 8000,
    })
  );
}

function watch() {
  webServer();
  // copyAssets();
  copyBootstrap();
  gulp.watch(
    ["./src/**/*", "./src/*.html"],
    gulp.series(compileHTML, compressJs, compileSass)
  );
}
