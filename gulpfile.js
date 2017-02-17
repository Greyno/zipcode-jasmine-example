var path = require('path');
var gulp = require("gulp");
var del = require("del");
var eslint = require("gulp-eslint");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var cleanCss = require("gulp-clean-css");
var KarmaServer = require("karma").Server;

var outputDirectory = "public/";
var stylesPattern = "client/**/*.css";
var javaScriptPattern = ["client/**/*.js", "!client/**/*.spec.js"];

gulp.task("clean", function () {
    var cleanPattern = outputDirectory + "**/*.*";

    return del([cleanPattern]);
});

gulp.task("lint", function () {
    return gulp.src(javaScriptPattern)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("test", ["lint"], function (callbackFunction) {
    var karmaConfig = {
        configFile: path.join(__dirname, "/karma.conf.js"),
        browsers: ["PhantomJS"],
        reporters: ["coverage"],
        singleRun: true
    };

    new KarmaServer(karmaConfig, callbackFunction).start();
});

gulp.task("html", ["clean"], function () {
    var htmlPattern = "client/**/*.html";

    return gulp.src(htmlPattern)
        .pipe(gulp.dest(outputDirectory));
});

gulp.task("scripts", ["clean"], function () {
    var scriptsOutputDirectory = outputDirectory + "js/";

    return gulp.src(javaScriptPattern)
        .pipe(concat("example-app.js"))
        .pipe(gulp.dest(scriptsOutputDirectory))
        .pipe(uglify())
        .pipe(rename({ extname: ".min.js" }))
        .pipe(gulp.dest(scriptsOutputDirectory));
});

gulp.task("styles", ["clean"], function () {
    var stylesOutputDirectory = outputDirectory + "css/";

    return gulp.src(stylesPattern)
        .pipe(concat("example-app.css"))
        .pipe(gulp.dest(stylesOutputDirectory))
        .pipe(cleanCss())
        .pipe(rename({ extname: ".min.css" }))
        .pipe(gulp.dest(stylesOutputDirectory));
});

gulp.task("build", ["html", "styles", "scripts"], function () {
});

gulp.task("default", ["test", "build"], function () {

});
