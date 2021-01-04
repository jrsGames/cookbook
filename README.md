# Version 2.2

# --ENGLISH--
With this code you can run a cookbook application that allows you to create a digital cookbook, add your recipes, view them, edit them, upload and download a cookbook!

## Instructions
### Before starting for the first time
####	Download and install the latest Node.js LTS version on https://nodejs.org/en/ (Windows 7: https://nodejs.org/download/release/v13.14.0/, node-v13.14.0-x64.msi).
####	... and Git on https://gitforwindows.org/.
####	Copy the folders "Bilder", "cookbook" and "Kochbuecher" to your PC or to an external device.
####	Keep "Bilder" and "cookbook" on the same directory level.
####	Rightclick on the cookbook folder and select "Git Bash Here".
####	Type "npm i serve" and hit Enter.
### Starting the application
####	Rightclick on the cookbook folder and select "Git Bash Here".
####	Type "serve -s build" and hit Enter.
####	Open http://localhost:5000 on your favorite browser.
### Terminating the application
####	Type CTRL + C inside the window where you started the application and confirm with Enter. It is necessary to confirm a second time, that time by "y" and Enter.
### Applying an update of the application
####	Get the updated version on https://drive.google.com/drive/folders/1aus_MuewgVnI1NY6T6xgESdo5RGcye1b?usp=sharing.
####	Replace your local files and folders with their updated versions, usually the build folder and Readme.md inside the cookbook folder.
### Adding new pictures for recipes
####	Add the picture(s) to the Bilder folder.
####	If no terminal is open, rightclick on the cookbook folder and select "Git Bash Here".
####	If the application is running, stop it.
####	Type "npm i" and hit Enter.
####	Type "npm run build" and hit Enter.
####	Remove the automatically generated node_modules folder inside the cookbook folder to free space (> 300MB).
####	Restart the application.

# --DEUTSCH--
Mit diesem Code kannst du ein Kochbuch-Programm ausführen. Damit kannst du ein digitales Kochbuch erstellen, deine Rezepte hinzufuegen, sie ansehen, bearbeiten, ein Kochbuch hochladen und herunterladen!

## Anleitung
### Vor dem ersten Start
####	Node.js herunterladen und installieren (neueste LTS-Version): https://nodejs.org/en/ (Windows 7: https://nodejs.org/download/release/v13.14.0/, node-v13.14.0-x64.msi).
####	Ebenso Git: https://gitforwindows.org/.
####	Die Ordner "Bilder", "cookbook" und "Kochbuecher" auf deinen PC oder auf ein externes Speichermedium kopieren.
####	Die Ordner "Bilder" und "cookbook" müssen im selben Ordner liegen.
####	Auf den cookbook Ordner rechtsklicken und "Git Bash Here" auswählen.
####	"npm i serve" eintippen und mit Enter bestätigen.
### Zum Starten der Anwendung
####	Auf den cookbook Ordner rechtsklicken und "Git Bash Here" auswählen.
####	"serve -s build" eintippen und mit Enter bestätigen.
####	http://localhost:5000 im Browser deiner Wahl aufrufen.
### Zum Beenden der Anwendung
####	STRG + C in das Fenster eintippen, mit dem die Anwendung gestartet wurde und mit Enter bestätigen. Wird nach einer weiteren Bestätigung gefragt, mit "y" oder "j" und Eingabe beantworten.
### Zum Updaten der Anwendung
####	Neue Version von https://drive.google.com/drive/folders/1aus_MuewgVnI1NY6T6xgESdo5RGcye1b?usp=sharing herunterladen.
####	Lokale Dateien und Ordner durch deren neuen Versionen ersetzen, idR betrifft das die Readme.md und den build Ordner im cookbook Ordner.
### Um neue Bilder für Rezepte hinzuzufügen
####	Das Bild / die Bilder in den Bilder Ordner einfügen.
####	Ist kein Terminal offen, auf den cookbook Ordner rechtsklicken und "Git Bash Here" auswählen.
####	Die Anwendung beenden, falls sie läuft.
####	"npm i" eintippen und mit Enter bestätigen.
####	"npm run build" eintippen und mit Enter bestätigen.
####	Den automatisch erstellen Ordner node_modules innerhalb cookbook löschen, um Platz zu sparen (> 300MB).
####	Die Anwendung neu starten.
