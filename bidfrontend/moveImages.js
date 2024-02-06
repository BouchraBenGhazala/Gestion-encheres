const fs = require('fs');
const path = require('path');
const glob = require('glob');

const externalFolderPath = path.join(__dirname,'..','src','main','resources','static','images');

const destinationFolderPath = path.join(__dirname, 'src', 'images'); // Remplacez 'public/images' par le chemin du dossier de destination

// Assurez-vous que le dossier de destination existe
if (!fs.existsSync(destinationFolderPath)) {
  fs.mkdirSync(destinationFolderPath, { recursive: true });
}

// Utilisez glob pour récupérer tous les fichiers jpg dans le dossier externe
const jpgFiles = glob.sync(path.join(externalFolderPath, '*.jpg'));

// Déplacez chaque fichier jpg vers le dossier de destination
jpgFiles.forEach((filePath) => {
  const fileName = path.basename(filePath);
  const destinationPath = path.join(destinationFolderPath, fileName);
  fs.copyFileSync(filePath, destinationPath);
  console.log(`Fichier déplacé : ${fileName}`);
});

console.log('Opération terminée.');
