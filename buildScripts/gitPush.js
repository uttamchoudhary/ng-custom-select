let gulp = require("gulp"),
    version = require("./../projects/ng-select/package.json").version,
    git = require("gulp-git"),
    chalk = require("chalk"),
    lastTag = require("git-tags"),
    push = require("gulp-git-push");

gulp.task("default", function() {

    lastTag.latest(function(err, commit) {

        gulp.src(["./../projects/ng-select/package.json", "./../dist/"])
            .pipe(git.add())
            .pipe(git.commit(`updated package json to ${version}`))
            .pipe(push({
                repository: "origin",
                refspec: "HEAD"
            }));

        console.log(chalk.green("[INFO]: Pushed updated versions of package managers"));
    });
});