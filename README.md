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

Das letzte Ergebnis wird lokal im Browser unter `lastResult` gespeichert. Es
werden keine Server oder externen Bibliotheken benötigt.

## Projektdatei

- `index.html` – enthält Oberfläche, Styles und Trainingslogik.
