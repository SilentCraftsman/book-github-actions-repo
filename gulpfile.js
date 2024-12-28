var gulp = require("gulp"),
  pug = require("gulp-pug-3"),
  runSequence = require("gulp4-run-sequence"),
  fs = require("fs"),
  path = "src/images";

// Tâche pour compiler Pug en HTML
gulp.task("pugToHtml", () => {
  return gulp
    .src("src/*.pug") // Assurez-vous que index.pug est dans ce dossier
    .pipe(
      pug({
        pretty: true, // Génère un HTML bien formaté
      })
    )
    .pipe(gulp.dest("dest")); // Sauvegarde les fichiers générés dans dest/
});

// Tâche pour copier les fichiers statiques (styles, images, etc.) vers dest/
gulp.task("copy", () => {
  // Vérifie si le dossier src/images existe et s'il n'est pas vide
  if (fs.existsSync(path) && fs.readdirSync(path).length > 0) {
    return gulp
      .src(
        [
          "src/styles/*.*", // Ajouter ici les autres fichiers statiques à copier
          "src/images/*.*", // Exemple : copier des images si nécessaire
        ],
        {
          dot: true,
        }
      )
      .pipe(gulp.dest("dest")); // Sauvegarde dans le dossier dest/
  } else {
    console.log("Le dossier src/images est vide ou n'existe pas");
    return gulp.src("src/styles/*.*", { dot: true }).pipe(gulp.dest("dest")); // Copie seulement les styles si images est vide
  }
});

// Tâche principale pour construire le projet (compile Pug + copie les fichiers statiques)
gulp.task("build", (done) => {
  runSequence(
    ["pugToHtml"], // Compile Pug en HTML
    ["copy"], // Copie les fichiers statiques
    done
  );
});

// Tâche par défaut (optionnelle) pour lancer le processus de build
gulp.task("default", gulp.series("build"));
