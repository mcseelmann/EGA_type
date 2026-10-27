# Zehnfinger-Training Deutsch

Eine kleine, eigenständige Web-App zum Üben des Zehnfingersystems auf einer
deutschen QWERTZ-Tastatur. Die Übungen enthalten deutsche Wörter und Sätze
für die Niveaus A1 bis B2.

## Starten

Die Anwendung benötigt weder Installation noch Build-Schritt:

1. `index.html` in einem aktuellen Webbrowser öffnen.
2. Niveau und Übungsart auswählen.
3. Auf **Start** klicken und den angezeigten Text abtippen.

## Funktionen

- Wort- und Satzübungen auf den Niveaus A1, A2, B1 und B2
- Anzeige der Fingerstellung und Hervorhebung der nächsten Taste
- Einstellung für die Umschalt-Taste bei Großbuchstaben
- Anzeige von Tippgeschwindigkeit und Genauigkeit nach einer Übung
- Optionale englische Übersetzung nach Abschluss einer Übung

Das letzte Ergebnis wird lokal im Browser unter `lastResult` gespeichert. Es
werden keine Server oder externen Bibliotheken benötigt.

## Projektdateien

- `index.html` – HTML-Oberfläche und Einbindung der weiteren Dateien.
- `styles.css` – Darstellung und Tastaturfarben.
- `app.js` – Trainingslogik und Tastatur-Anzeige.
- `data/A1.js`, `data/A2.js`, `data/B1.js`, `data/B2.js` – Wörter und Beispielsätze, getrennt nach Niveau.
- `data/en/A1.js`, `data/en/A2.js`, `data/en/B1.js`, `data/en/B2.js` – englische Übersetzungen der Wörter und Sätze.

Die Inhalte eines Niveaus können direkt in der passenden Datei unter `data/`
ergänzt werden. Beim Hinzufügen eines neuen Niveaus müssen außerdem eine
entsprechende Datendatei und eine Auswahloption in `index.html` hinzugefügt
werden. Die App bleibt ohne Build-Schritt nutzbar und kann weiterhin direkt
über `index.html` im Browser gestartet werden.

Die Wort- und Satzbeispiele sind eigene, am Gemeinsamen Europäischen
Referenzrahmen (GER) orientierte Übungsinhalte. Sie sind keine offiziellen
Goethe-Institut-Wortlisten und keine Garantie für eine offizielle
Niveaueinstufung.

Die englischen Übersetzungen sind eigene Lernhilfen. Nach Abschluss einer
Übung erscheint die Schaltfläche **Übersetzung anzeigen**. Darüber lässt sich
die Übersetzung ein- und wieder ausblenden.
