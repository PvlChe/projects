1. Einführung
    Die Readme - Datei soll dazu dienen, erfahrenen Programmierern das Aufsetzen des
    Projektes zu vereinfachen. Da das Projekt mit Datenbanken arbeitet, einem Web-Server
    und einem Framework, müssen alle Komponenten idealerweise übereinstimmen.

    Folgende Tools werden gebraucht und sollten für dem aufsetzen schon installiert sein:
    - node.js (npm)
    - und außerdem, um mit dem git arbeiten zu können: https://git-scm.com/downloads
      (Keine Pflicht)

2. Installation
    Zur Installation wird nichts anderes benötigt, als die Projektdatei selbst
    (wenn die Tools denn schon vorhanden sind). Nun braucht man ein Terminal, 
    um in den 2 Projektpfaden den Befehl "npm install" auszuführen, um dort alle
    fehlenden Pakete zu installieren:
    - "Backend" -> "restAPI"
    - "Frontend" -> "projektFrontend"
    

    Notes für den Developer:
    Datensätze der Mongodb werden Beim Atlas mongoDB Service gespeichert, daher muss keine lokale MongoDB Instanz gestartet werden.
    Bilder und Videos werden vom Backend bei Amazon AWS S3 gespeichert.

    Zurzeit läuft das deployte Backend bei Heroku, falls dieses weiterhin benutzt werden soll muss das Backend auch nicht gestartet werden.
    Wenn man ein Lokales Backend benutzen will, z.b. um Änderung am Backend zu testen, dann sollte man im Pfad
    'Frontend/projektFrontend/api/api.js' den localAPI Switch auf 'true' setzen und dann muss auch ein lokales Backend
    gestartet werden (Siehe Schritt 3).

3. Ausführen mit lokalen Backend
    
    Um nun die Seite zu starten. Muss man sich erstmal mit der Ordnerstruktur
    vertraut machen:
    - Backend -> für die Logik
    - Frontend -> für die Webseite
    
    Damit man das Projekt starten kann, müsste man erst einmal in den "Backend" Ordner
    wechseln, dann in den Ordner "restAPI". Dort führen wir den Befehl "npm start" aus
    -> "Backend" -> "restAPI" -> npm start (Kommentar: Das Backend kann nicht vom Beuth Uni Netz gestartet werden,
    wegen Firewall kann nicht mit dem Atlas MongoDB Service kommuniziert werden).

    Als nächstes wechselt man in den "Frontend" Ordner und von dort aus in den
    "projektFrontend" Ordner.
    In der Datei 'Frontend/projektFrontend/api/api.js' den localAPI Switch auf 'true' setzen, falls noch nicht geschehen.
    Nun brauchen wir den Befehl "npm run dev" um das Frontend zu starten.
    -> "Frontend" -> "projektFrontend" -> npm run dev
    
    Die Seite wird gestartet und kann nun benutzt werden.

4. Ausführen mit deployten Backend

    Backend muss hier nicht gestartet werden
    Im der Datei 'Frontend/projektFrontend/api/api.js' den localAPI Switch auf 'false' setzen.
    Im Ordner 'Frontend/projektFrontend' den Befehl npm run dev ausführen. Fertig

Folgende Links stehen zur Verfügung:
- Link zur Webseite: https://meducate-app.herokuapp.com
# projects
