var gulp = require("gulp"),
  pug = require("gulp-pug-3"),
  runSequence = require("gulp4-run-sequence");

gulp.task("pugToHtml", () => {
  return gulp
    .src("src/*.pug") // S'assurer que tous les fichiers .pug dans src sont capturés
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest("dest")); // Le résultat doit aller dans dest/
});

gulp.task("copy", () => {
  return gulp
    .src(
      [
        "src/styles/*.*", // Assurer que tous les fichiers CSS sont pris en compte
      ],
      {
        dot: true,
      }
    )
    .pipe(gulp.dest("dest")); // Les fichiers CSS seront également copiés dans dest/
});

gulp.task("build", (done) => {
  runSequence(
    "pugToHtml", // D'abord transformer Pug en HTML
    "copy", // Puis copier les fichiers CSS dans dest
    done
  );
});
