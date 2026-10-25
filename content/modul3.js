/* MODUL 3 – Preisstabilität: Inflation und Deflation (Datenformat: siehe modul1.js) */
window.KURS_MODULE = window.KURS_MODULE || {};
window.KURS_MODULE[3] = {
  id: 3,
  titel: "Preisstabilität: Inflation und das 2-%-Ziel",
  kurz: "Was Inflation ist, wie man sie misst, wen sie trifft und warum die EZB 2 % anpeilt",
  minuten: 9,
  quizFragen: 6,

  lernziele: [
    "Ich kann erklären, wie die Inflationsrate gemessen wird (Warenkorb, HVPI).",
    "Ich kann Ursachen und Folgen von Inflation nennen und Gewinner und Verlierer benennen.",
    "Ich kann begründen, warum die EZB eine Inflationsrate von 2 % anstrebt und nicht 0 %."
  ],

  abschnitte: [
    {
      id: "a1",
      titel: "Inflation messen",
      inhalt: [
        { typ: "merke", begriff: "Inflation", text: "Ein anhaltender Anstieg des allgemeinen Preisniveaus. Die Kaufkraft des Geldes sinkt: Für einen Euro bekommst du weniger als vorher." },
        { typ: "merke", begriff: "Deflation", text: "Ein anhaltender Rückgang des allgemeinen Preisniveaus. Klingt gut, ist aber gefährlich (siehe Abschnitt 3)." },
        { typ: "text", text: "Gemessen wird Inflation mit einem **Warenkorb**: Statistiker erfassen die Preise vieler typischer Güter und Dienstleistungen (Lebensmittel, Miete, Energie, Reisen …), gewichten sie danach, wie viel Haushalte dafür ausgeben, und vergleichen den Wert mit dem Vorjahr. In der Eurozone verwendet man dafür den **Harmonisierten Verbraucherpreisindex (HVPI)**, den Eurostat berechnet. So sind die Zahlen der Euro-Länder vergleichbar." },
        { typ: "merke", begriff: "HVPI", text: "Harmonisierter Verbraucherpreisindex: einheitlich berechneter Preisindex der EU-Länder. Die EZB misst ihr Inflationsziel am HVPI des Euroraums." },
        { typ: "svg", titel: "Abb. 1: Inflationsrate im Euroraum (HVPI, Jahresdurchschnitt) und aktueller Wert",
          alt: "Säulendiagramm: 2019 1,2 Prozent, 2020 0,3, 2021 2,6, 2022 8,4, 2023 5,4, 2024 2,4, September 2026 3,8 Prozent. Eine Linie markiert das Ziel von 2 Prozent.",
          svg: `<svg viewBox="0 0 700 270" role="img" aria-label="Inflationsrate im Euroraum 2019 bis 2024 und September 2026">
  <line x1="50" y1="200" x2="680" y2="200" class="ln"/>
  <line x1="50" y1="172" x2="680" y2="172" class="ln" style="stroke-dasharray:6 5;stroke:var(--svg-b)"/>
  <text x="52" y="164" class="t-s" style="fill:var(--svg-b)">Ziel: 2 %</text>
  <g class="t-c">
    <rect x="70" y="183" width="60" height="17" class="bx-a"/><text x="100" y="176" class="t-s t-c">1,2</text><text x="100" y="220" class="t-s t-c">2019</text>
    <rect x="165" y="196" width="60" height="4" class="bx-a"/><text x="195" y="189" class="t-s t-c">0,3</text><text x="195" y="220" class="t-s t-c">2020</text>
    <rect x="260" y="164" width="60" height="36" class="bx-a"/><text x="290" y="157" class="t-s t-c">2,6</text><text x="290" y="220" class="t-s t-c">2021</text>
    <rect x="355" y="82" width="60" height="118" class="bx-c"/><text x="385" y="75" class="t-s t-c t-b">8,4</text><text x="385" y="220" class="t-s t-c">2022</text>
    <rect x="450" y="124" width="60" height="76" class="bx-c"/><text x="480" y="117" class="t-s t-c">5,4</text><text x="480" y="220" class="t-s t-c">2023</text>
    <rect x="545" y="166" width="60" height="34" class="bx-a"/><text x="575" y="159" class="t-s t-c">2,4</text><text x="575" y="220" class="t-s t-c">2024</text>
    <rect x="640" y="147" width="40" height="53" class="bx-b"/><text x="660" y="140" class="t-s t-c t-b">3,8</text><text x="660" y="220" class="t-s t-c">Sep 2026</text>
  </g>
  <text x="50" y="250" class="t-s">Quelle: Eurostat (HVPI Euroraum, Jahresdurchschnittsraten; letzter Balken: Monatswert, Stand: Oktober 2026)</text>
</svg>` },
        { typ: "check", frage: {
            id: "m3-c1", typ: "single",
            frage: "Was misst der HVPI?",
            optionen: ["Die Entwicklung der Preise eines typischen Warenkorbs im Vergleich zum Vorjahr", "Die Höhe der Löhne in der Eurozone", "Die Menge des umlaufenden Geldes", "Die Staatsverschuldung"],
            richtig: 0,
            erklaerung: "Der HVPI zeigt, wie sich die Verbraucherpreise entwickeln. Seine Veränderung ist die Inflationsrate."
        } }
      ]
    },
    {
      id: "a2",
      titel: "Ursachen und Folgen von Inflation",
      inhalt: [
        { typ: "text", text: "Warum steigen Preise? Typische Ursachen:" },
        { typ: "liste", items: [
            "**Nachfrageinduziert:** Die Nachfrage steigt stärker als das Angebot (z. B. Konjunkturboom) – Verkäufer können höhere Preise verlangen.",
            "**Angebotsinduziert (Kostendruck):** Produktion wird teurer, etwa durch Energiepreise oder Lieferengpässe. Unternehmen geben die Kosten weiter.",
            "**Geldmengeninduziert:** Wächst die Geldmenge dauerhaft viel stärker als die Produktion, steigen langfristig die Preise.",
            "**Erwartungen:** Wer höhere Preise erwartet, fordert höhere Löhne bzw. erhöht Preise – eine Lohn-Preis-Spirale kann entstehen."
        ] },
        { typ: "beispiel", titel: "Aktuelles Beispiel", text: "Im September 2026 lag die Inflationsrate im Euroraum bei **3,8 %** (Eurostat, Stand: Oktober 2026) – deutlich über dem Ziel. Hauptgrund waren stark gestiegene Energiepreise. Der Höchststand der jüngeren Zeit lag im Oktober 2022 bei 10,6 %." },
        { typ: "text", text: "**Folgen:** Inflation trifft nicht alle gleich." },
        { typ: "tabelle", kopf: ["Eher Verlierer", "Eher Gewinner"], zeilen: [
            ["Sparer mit niedrig verzinstem Geld (Kaufkraft sinkt)", "Schuldner mit festem Zins (Schuld verliert real an Wert)"],
            ["Empfänger fester Einkommen und Renten, die nicht angepasst werden", "Besitzer von Sachwerten (z. B. Immobilien), deren Preise mitsteigen"],
            ["Haushalte mit geringem Einkommen (hoher Anteil an Lebensmitteln und Energie)", "Der Staat mit hohen Schulden, wenn er sie mit Inflation „entwertet“"]
        ] },
        { typ: "hinweis", text: "Inflation macht Planung schwerer: Unternehmen und Haushalte wissen nicht mehr, was Preise morgen bedeuten. Deshalb strebt die EZB stabile Preise an." },
        { typ: "check", frage: {
            id: "m3-c2", typ: "single",
            frage: "Die Energiepreise steigen stark, Unternehmen geben die höheren Kosten weiter. Welche Ursache liegt vor?",
            optionen: ["Nachfrageinduzierte Inflation", "Angebotsinduzierte Inflation (Kostendruck)", "Geldmengeninduzierte Inflation", "Deflation"],
            richtig: 1,
            erklaerung: "Steigende Produktionskosten, die an die Verbraucher weitergegeben werden, nennt man angebotsinduzierte oder Kostendruck-Inflation."
        } }
      ]
    },
    {
      id: "a3",
      titel: "Warum 2 %? Das Inflationsziel der EZB",
      inhalt: [
        { typ: "text", text: "Dein Bauchgefühl sagt vielleicht: „Am besten wäre 0 % Inflation.“ Die EZB sieht das anders. Ihr Ziel lautet seit der Strategieüberprüfung 2021 **2 % mittelfristig**. Das Ziel ist **symmetrisch**: Eine Abweichung nach oben ist genauso unerwünscht wie nach unten. 2025 hat der EZB-Rat die Strategie überprüft und an diesem Ziel festgehalten." },
        { typ: "merke", begriff: "Symmetrisches Inflationsziel", text: "Die EZB strebt mittelfristig 2 % Inflation an. Abweichungen nach oben und nach unten gelten als gleichermaßen unerwünscht." },
        { typ: "text", text: "**Gründe für 2 % statt 0 %:**" },
        { typ: "liste", items: [
            "**Sicherheitsabstand zur Deflation:** Bei einem Ziel von 0 % würde die Inflation schnell ins Negative rutschen.",
            "**Messfehler:** Neue oder bessere Produkte (z. B. Smartphones) lassen Preisindizes tendenziell etwas zu hoch ausfallen.",
            "**Spielraum für Anpassungen:** Löhne sinken selten nominal. Mit leichter Inflation können sich Preise und Löhne zwischen Branchen anpassen."
        ] },
        { typ: "text", text: "**Warum ist Deflation gefährlich?** Fallen die Preise, schieben Haushalte Käufe auf („morgen ist es billiger“). Die Nachfrage sinkt, Unternehmen verdienen weniger, entlassen Beschäftigte, die Preise fallen weiter – eine **Deflationsspirale**. Zudem wird die Last von Schulden real größer." },
        { typ: "check", frage: {
            id: "m3-c3", typ: "richtigfalsch",
            aussage: "Das Inflationsziel der EZB von 2 % ist symmetrisch – auch eine zu niedrige Inflation gilt als Abweichung.",
            richtig: true,
            begruendungen: ["Richtig, denn auch Preisrückgänge können wirtschaftlich schädlich sein.", "Falsch, denn nur zu hohe Inflation ist ein Problem.", "Falsch, denn die EZB hat kein konkretes Inflationsziel."],
            richtigeBegruendung: 0,
            erklaerung: "Symmetrie heißt: Abweichungen nach oben und nach unten sind gleichermaßen unerwünscht – wegen der Gefahr einer Deflationsspirale."
        } }
      ]
    }
  ],

  fazit: "Inflation ist ein anhaltender Anstieg des Preisniveaus und wird mit dem HVPI gemessen, einem Warenkorb-Index. Ursachen sind Nachfrage, Kosten, Geldmenge und Erwartungen; Gewinner sind eher Schuldner und Sachwertbesitzer, Verlierer eher Sparer und Menschen mit geringem Einkommen. Die EZB strebt mittelfristig symmetrisch 2 % an – nicht 0 %, um einen Sicherheitsabstand zur gefährlichen Deflation zu haben. Wer die Preise stabil halten soll, braucht eine Institution mit klarem Auftrag: darum geht es in Modul 4.",

  quellen: [
    { titel: "Eurostat: Inflation im Euroraum (HVPI, Euro-Indikatoren)", url: "https://ec.europa.eu/eurostat/web/hicp" }, // PRÜFEN: Jahreswerte 2019–2024 gegen Eurostat-Datenbank (prc_hicp_aind) abgleichen; Septemberwert 3,8 % laut Eurostat-Schnellschätzung/Meldung vom 16.10.2026
    { titel: "EZB: Die Strategie der EZB (Inflationsziel von 2 %)", url: "https://www.ecb.europa.eu/mopo/strategy/html/index.de.html" },
    { titel: "EZB: Pressemitteilung vom 30. Juni 2025 – EZB-Rat aktualisiert die geldpolitische Strategie", url: "https://www.ecb.europa.eu/press/pr/date/2025/html/ecb.pr250630~aabf988af8.en.html" }
  ],

  pool: [
    { id: "m3-01", typ: "single", afb: 1, thema: "a1",
      frage: "Was bedeutet Inflation?",
      optionen: ["Ein anhaltender Anstieg des allgemeinen Preisniveaus", "Der Anstieg eines einzelnen Preises", "Ein Rückgang der Zinsen", "Ein Anstieg der Arbeitslosigkeit"],
      richtig: 0,
      erklaerung: "Inflation ist ein anhaltender, allgemeiner Preisanstieg und senkt die Kaufkraft." },
    { id: "m3-02", typ: "lueckentext", afb: 1, thema: "a1",
      frage: "Vervollständige den Satz.",
      text: "Die Inflation wird mit einem {1} gemessen. In der Eurozone verwendet man den {2}.",
      luecken: [ { optionen: ["Warenkorb", "Zinskorridor", "Bankenindex"], richtig: 0 }, { optionen: ["Harmonisierten Verbraucherpreisindex (HVPI)", "DAX", "Leitzins"], richtig: 0 } ],
      erklaerung: "Ein Warenkorb typischer Güter bildet die Verbraucherpreise ab; der HVPI macht die Länder vergleichbar." },
    { id: "m3-03", typ: "single", afb: 2, thema: "a1",
      frage: "Ein Warenkorb kostete letztes Jahr 500 €, jetzt 520 €. Wie hoch ist die Inflationsrate?",
      optionen: ["2 %", "4 %", "20 %", "0,4 %"],
      richtig: 1,
      erklaerung: "Anstieg: 20 € von 500 € = 4 %." },

    { id: "m3-04", typ: "zuordnung", afb: 1, thema: "a2",
      frage: "Ordne die Inflationsursache dem Beispiel zu.",
      paare: [["Nachfrageinduziert", "Im Konjunkturboom kaufen alle mehr, das Angebot kommt nicht hinterher."], ["Angebotsinduziert", "Energie wird teurer, Unternehmen geben die höheren Kosten weiter."], ["Erwartungen", "Alle rechnen mit steigenden Preisen und fordern höhere Löhne."]],
      erklaerung: "Die drei Ursachen unterscheiden sich darin, wo der Preisdruck entsteht." },
    { id: "m3-05", typ: "multiple", afb: 2, thema: "a2",
      frage: "Wer verliert bei unerwartet hoher Inflation eher? (Mehrere Antworten möglich)",
      optionen: ["Sparer mit niedrig verzinstem Guthaben", "Schuldner mit festem Zinssatz", "Menschen mit festem, nicht angepasstem Einkommen", "Besitzer von Immobilien, deren Preise mitsteigen"],
      richtig: [0, 2],
      erklaerung: "Sparer und Empfänger fester Einkommen verlieren Kaufkraft. Schuldner und Sachwertbesitzer profitieren eher." },
    { id: "m3-06", typ: "single", afb: 3, thema: "a2",
      frage: "Die Inflation ist wegen hoher Energiepreise gestiegen. Beurteile: Wie gut kann die EZB diese Ursache mit höheren Zinsen bekämpfen?",
      optionen: ["Direkt und vollständig, denn Zinsen senken die Energiepreise sofort.", "Nur begrenzt: Zinsen dämpfen die Nachfrage und Zweitrundeneffekte, ändern aber nichts am Energieangebot.", "Gar nicht, denn Zentralbanken haben keinen Einfluss auf Preise.", "Vollständig, weil Energie dann nicht mehr importiert wird."],
      richtig: 1,
      erklaerung: "Höhere Zinsen bremsen Nachfrage und verhindern Lohn-Preis-Spiralen, lösen aber die Angebotsknappheit nicht. Deshalb ist die Abwägung schwierig." },

    { id: "m3-07", typ: "single", afb: 1, thema: "a3",
      frage: "Welches Inflationsziel verfolgt die EZB?",
      optionen: ["0 % jederzeit", "2 % mittelfristig, symmetrisch", "5 % für mehr Wachstum", "Unter 1 %"],
      richtig: 1,
      erklaerung: "Die EZB strebt mittelfristig 2 % an; Abweichungen in beide Richtungen sind unerwünscht." },
    { id: "m3-08", typ: "multiple", afb: 2, thema: "a3",
      frage: "Welche Gründe sprechen für ein Inflationsziel von 2 % statt 0 %?",
      optionen: ["Sicherheitsabstand zur Deflation", "Preisindizes überzeichnen die Teuerung tendenziell leicht (Messfehler)", "Nominallöhne sinken selten, leichte Inflation erleichtert Anpassungen", "Die Staatsverschuldung soll steigen"],
      richtig: [0, 1, 2],
      erklaerung: "Die Staatsverschuldung ist kein Grund für das Ziel. Die ersten drei Gründe nennt die Geldpolitik üblicherweise." },
    { id: "m3-09", typ: "reihenfolge", afb: 2, thema: "a3",
      frage: "Bringe die Deflationsspirale in die richtige Reihenfolge.",
      schritte: ["Die Preise sinken", "Haushalte schieben Käufe auf, weil es später billiger wird", "Die Nachfrage geht zurück", "Unternehmen verdienen weniger und entlassen Beschäftigte", "Die Preise sinken weiter"],
      erklaerung: "Erwartete sinkende Preise führen zu Kaufzurückhaltung, Absatzrückgang, Entlassungen und weiter sinkenden Preisen." },
    { id: "m3-10", typ: "single", afb: 3, thema: "a3",
      frage: "Eine Mitschülerin sagt: „0 % Inflation wäre ideal, dann kostet alles immer gleich viel.“ Welche Antwort überzeugt am meisten?",
      optionen: ["Stimmt, 0 % ist in jedem Fall das beste Ziel.", "Bei 0 % droht schnell Deflation; die Gefahr der Deflationsspirale ist größer als die Kosten leichter Inflation.", "Stimmt nicht, denn Inflation ist grundsätzlich gut.", "Stimmt nicht, denn die Inflation hat keine Auswirkungen."],
      richtig: 1,
      erklaerung: "Ein Sicherheitsabstand zur Deflation ist ein zentrales Argument für 2 %." }
  ]
};
