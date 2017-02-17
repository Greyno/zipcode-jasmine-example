module.exports = function (config) {
    config.set({
        browsers: ["PhantomJS", "Chrome"],
        frameworks: ["jasmine"],
        files: [
            { pattern: "bower_components/jquery/dist/jquery.min.js", watched: false },
            { pattern: "bower_components/angular/angular.min.js", watched: false },
            { pattern: "bower_components/angular-mocks/angular-mocks.js", watched: false },
            { pattern: "client/js/todo-app.js" },
            { pattern: "client/**/*.js" }
        ],
        preprocessors: {
            "client/**/!(*.spec).js": ["coverage"]
        },
        reporters: ["kjhtml", "coverage"],
        reportSlowerThan: 500,
        coverageReporter: {
            type: "html",
            dir: "coverage"
        }
    });
};
