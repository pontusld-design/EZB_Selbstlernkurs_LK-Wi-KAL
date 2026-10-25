/* =====================================================================
   MODUL 1 – Einführung: Was macht eigentlich die EZB?
   =====================================================================
   DATENFORMAT (für Lehrkräfte – keine Programmierkenntnisse nötig)

   Bearbeite nur die Texte zwischen den Anführungszeichen "...". Achte darauf,
   dass Kommas, Klammern { } [ ] und Anführungszeichen erhalten bleiben.
   Innerhalb eines Textes sind erlaubt:
     **fett**      *kursiv*      [Linktext](https://...)     [Abschnitt](#/m/1/a2)
   Zeilenumbrüche im Text: mit \n.  Doppelte Anführungszeichen im Text vermeiden
   (nutze stattdessen „deutsche“ Anführungszeichen).

   AUFBAU
   id, titel, kurz, minuten   Kennung, Titel, Untertitel (Startseite), geplante Minuten
   lernziele: [ ... ]         Ich-kann-Sätze
   abschnitte: [ { id, titel, inhalt: [ BLOCK, BLOCK, ... ] }, ... ]
       Jeder Abschnitt ist zugleich ein „Unterthema“ für die Quiz-Auswertung.
       Die id (a1, a2, ...) darf nicht doppelt vorkommen und wird von den Fragen
       über das Feld thema: "a2" referenziert.
   BLOCK-Arten (feld typ):
     { typ:"text",     text:"..." }
     { typ:"liste",    items:["...","..."], geordnet:false }
     { typ:"merke",    begriff:"Fachbegriff", text:"Definition" }   → erscheint auch im Glossar
     { typ:"beispiel", titel:"...", text:"..." }
     { typ:"hinweis",  text:"..." }
     { typ:"tabelle",  titel:"...", kopf:["A","B"], zeilen:[["a1","b1"],["a2","b2"]] }
     { typ:"svg",      titel:"Abb. 1: ...", alt:"Textbeschreibung", svg:`<svg ...>...</svg>` }
     { typ:"check",    frage:{ FRAGE } }                            → „Check dich“ im Text
     { typ:"sim",      titel, intro, szenarien:[{titel,text,optionen:[{label,kette:[..],urteil:"gut|mittel|schlecht",kommentar}]}] }
   fazit: "..."           Zusammenfassung
   quellen: [ {titel, url} ]
   quizFragen: 6          (optional) Anzahl Fragen pro Modulquiz
   pool: [ FRAGE, ... ]   Fragenpool; pro Quiz werden zufällig quizFragen gezogen,
                          mindestens eine pro Unterthema.

   FRAGETYPEN (gemeinsame Felder: id, typ, afb (1|2|3), thema, frage, erklaerung)
   id muss im ganzen Kurs eindeutig sein (z. B. "m1-07").
   1) single       optionen:[...], richtig: 2            (Index der richtigen Option, Zählung ab 0)
   2) multiple     optionen:[...], richtig:[0,3]         (alle richtigen Indizes)
   3) zuordnung    paare:[["Begriff","Definition"], ...] (richtige Paare; Anzeige wird gemischt)
   4) reihenfolge  schritte:["1. Schritt","2. Schritt",...]  (in RICHTIGER Reihenfolge angeben)
   5) lueckentext  text:"Der {1} ist ... {2}.", luecken:[ {optionen:[...], richtig:0}, {...} ]
   6) richtigfalsch aussage:"...", richtig:true|false,
                   begruendungen:["...","...","..."], richtigeBegruendung:1
   ===================================================================== */
window.KURS_MODULE = window.KURS_MODULE || {};
window.KURS_MODULE[1] = {
  id: 1,
  titel: "Einführung: Was macht eigentlich die EZB?",
  kurz: "Warum Zinsen und Inflation dich betreffen – und was dich in diesem Kurs erwartet",
  minuten: 8,
  quizFragen: 6,

  lernziele: [
    "Ich kann erklären, warum Entscheidungen der EZB mich im Alltag betreffen (Zinsen, Preise, Euro).",
    "Ich kann EZB, Eurosystem und Deutsche Bundesbank voneinander abgrenzen.",
    "Ich kann die wichtigsten Stationen der europäischen Geldpolitik in die richtige Reihenfolge bringen."
  ],

  abschnitte: [
    /* ------------------------------------------------------------- */
    {
      id: "a1",
      titel: "Warum die EZB dich betrifft",
      inhalt: [
        { typ: "text", text: "Wenn die Europäische Zentralbank (EZB) über Zinsen entscheidet, steht das in den Nachrichten – aber was hat das mit dir zu tun? Mehr, als du denkst: Die EZB beeinflusst, **wie viel Zinsen du auf dein Erspartes bekommst**, **was ein Kredit für Auto, Wohnung oder Ausbildung kostet** und **wie stark die Preise im Supermarkt steigen**." },
        { typ: "beispiel", titel: "Dieselbe Entscheidung, zwei Perspektiven", text: "Die EZB senkt den Leitzins.\n**Familie A** spart auf ein Haus und bekommt weniger Zinsen auf dem Sparbuch – schlecht.\n**Familie B** hat einen Kredit und zahlt künftig weniger Zinsen – gut.\nGeldpolitik hat also immer Gewinner und Verlierer. Darüber wirst du in Modul 6 selbst urteilen." },
        { typ: "text", text: "Im Euroraum gilt eine gemeinsame Währung für derzeit **21 Länder** (Stand: Oktober 2026; Bulgarien ist am 1. Januar 2026 beigetreten). Eine einzige Zentralbank entscheidet für alle – das ist besonders, aber auch eine Herausforderung." },
        { typ: "merke", begriff: "Geldpolitik", text: "Alle Maßnahmen einer Zentralbank, mit denen sie die Geldmenge, das Zinsniveau und die Kreditvergabe beeinflusst, um ihre Ziele zu erreichen – vor allem stabile Preise." },
        { typ: "check", frage: {
            id: "m1-c1", typ: "single",
            frage: "Die EZB erhöht den Leitzins. Wer profitiert davon am ehesten?",
            optionen: ["Eine Familie mit einem Kredit, der alle paar Monate an die Marktzinsen angepasst wird", "Eine Person, die ihr Geld auf dem Tagesgeldkonto liegen hat", "Ein Unternehmen, das neue Kredite aufnehmen möchte", "Niemand – Leitzinsen haben keine Wirkung"],
            richtig: 1,
            erklaerung: "Sparer bekommen bei steigenden Zinsen tendenziell mehr Zinsen. Kreditnehmer zahlen mehr. Genau das macht Geldpolitik zu einem Verteilungsthema."
        } }
      ]
    },
    /* ------------------------------------------------------------- */
    {
      id: "a2",
      titel: "EZB, Eurosystem und Bundesbank",
      inhalt: [
        { typ: "text", text: "Die EZB sitzt in **Frankfurt am Main**. Sie arbeitet aber nicht allein: Gemeinsam mit den nationalen Zentralbanken der Euro-Länder bildet sie das **Eurosystem**. Die **Deutsche Bundesbank** ist die deutsche Zentralbank und Teil dieses Systems." },
        { typ: "merke", begriff: "Eurosystem", text: "Die EZB und die nationalen Zentralbanken der Länder, die den Euro eingeführt haben. Es ist für die gemeinsame Geldpolitik im Euroraum zuständig." },
        { typ: "svg", titel: "Abb. 1: Eurosystem – die EZB und die nationalen Zentralbanken",
          alt: "Oben die Europäische Zentralbank in Frankfurt. Daneben die nationalen Zentralbanken der Euro-Länder, darunter die Deutsche Bundesbank. Zusammen bilden sie das Eurosystem.",
          svg: `<svg viewBox="0 0 700 250" role="img" aria-label="Das Eurosystem besteht aus der EZB und den nationalen Zentralbanken">
  <rect x="10" y="10" width="680" height="230" rx="14" class="bx-a"/>
  <text x="350" y="38" class="t-b t-c">Eurosystem (Geldpolitik für den Euroraum)</text>
  <rect x="40" y="62" width="200" height="150" rx="10" class="bx-c"/>
  <text x="140" y="96" class="t-b t-c">EZB</text>
  <text x="140" y="122" class="t-s t-c">Frankfurt am Main</text>
  <text x="140" y="148" class="t-s t-c">gemeinsame Geldpolitik</text>
  <text x="140" y="170" class="t-s t-c">für alle Euro-Länder</text>
  <text x="270" y="142" class="t-b t-c" style="font-size:28px">+</text>
  <rect x="300" y="62" width="370" height="150" rx="10" class="bx-b"/>
  <text x="485" y="88" class="t-b t-c">Nationale Zentralbanken (21)</text>
  <rect x="320" y="104" width="150" height="46" rx="8" class="bx-c"/>
  <text x="395" y="133" class="t-c t-b">Bundesbank</text>
  <rect x="500" y="104" width="150" height="46" rx="8" class="bx-a"/>
  <text x="575" y="133" class="t-c">Banque de France</text>
  <rect x="320" y="160" width="150" height="40" rx="8" class="bx-a"/>
  <text x="395" y="186" class="t-c">Banca d’Italia</text>
  <rect x="500" y="160" width="150" height="40" rx="8" class="bx-a"/>
  <text x="575" y="186" class="t-c">… und weitere</text>
</svg>` },
        { typ: "text", text: "**Was macht die Bundesbank?** Sie wirkt an den geldpolitischen Entscheidungen mit: Ihr Präsident sitzt im EZB-Rat. Außerdem versorgt sie die Wirtschaft mit Bargeld, wickelt Zahlungen zwischen Banken ab, beaufsichtigt gemeinsam mit der BaFin Banken in Deutschland und beobachtet die Stabilität des Finanzsystems. Über Zinsen entscheidet sie nicht allein – das tut der EZB-Rat in Frankfurt." },
        { typ: "check", frage: {
            id: "m1-c2", typ: "richtigfalsch",
            aussage: "Die Deutsche Bundesbank legt die Leitzinsen für Deutschland selbstständig fest.",
            richtig: false,
            begruendungen: ["Richtig, denn jedes Land hat seine eigene Geldpolitik.", "Falsch, denn die Leitzinsen werden vom EZB-Rat für den gesamten Euroraum beschlossen.", "Falsch, denn die Bundesbank gibt es nicht mehr."],
            richtigeBegruendung: 1,
            erklaerung: "Seit der Euro-Einführung gibt es eine gemeinsame Geldpolitik. Die Bundesbank ist im EZB-Rat vertreten, entscheidet aber nicht allein."
        } }
      ]
    },
    /* ------------------------------------------------------------- */
    {
      id: "a3",
      titel: "Zeitstrahl und Fahrplan durch den Kurs",
      inhalt: [
        { typ: "text", text: "Die EZB ist noch jung. Bevor es sie gab, machte die **Bundesbank** mit der **D-Mark** Geldpolitik – und galt als Vorbild für stabile Preise. Daran orientierte sich die EZB bei ihrer Gründung. Hier die wichtigsten Stationen:" },
        { typ: "svg", titel: "Abb. 2: Wichtige Stationen der europäischen Geldpolitik",
          alt: "Zeitstrahl: 1992 Vertrag von Maastricht, 1998 Gründung der EZB, 1999 Euro als Buchgeld, 2002 Euro-Bargeld, 2008 Finanzkrise, 2012 Whatever it takes, 2022 Zinswende.",
          svg: `<svg viewBox="0 0 700 220" role="img" aria-label="Zeitstrahl der europäischen Geldpolitik von 1992 bis 2022">
  <line x1="30" y1="110" x2="670" y2="110" class="ln" style="stroke-width:3"/>
  <g class="t-c">
    <circle cx="60" cy="110" r="8" class="bx-a"/><text x="60" y="88" class="t-b t-s t-c">1992</text><text x="60" y="140" class="t-s t-c">Maastricht-</text><text x="60" y="156" class="t-s t-c">Vertrag</text>
    <circle cx="150" cy="110" r="8" class="bx-a"/><text x="150" y="88" class="t-b t-s t-c">1998</text><text x="150" y="140" class="t-s t-c">EZB wird</text><text x="150" y="156" class="t-s t-c">gegründet</text>
    <circle cx="240" cy="110" r="8" class="bx-b"/><text x="240" y="88" class="t-b t-s t-c">1999</text><text x="240" y="140" class="t-s t-c">Euro als</text><text x="240" y="156" class="t-s t-c">Buchgeld</text>
    <circle cx="330" cy="110" r="8" class="bx-b"/><text x="330" y="88" class="t-b t-s t-c">2002</text><text x="330" y="140" class="t-s t-c">Euro-</text><text x="330" y="156" class="t-s t-c">Bargeld</text>
    <circle cx="420" cy="110" r="8" class="bx-c"/><text x="420" y="88" class="t-b t-s t-c">2008</text><text x="420" y="140" class="t-s t-c">Finanz-</text><text x="420" y="156" class="t-s t-c">krise</text>
    <circle cx="530" cy="110" r="8" class="bx-c"/><text x="530" y="88" class="t-b t-s t-c">2012</text><text x="530" y="140" class="t-s t-c">„Whatever</text><text x="530" y="156" class="t-s t-c">it takes“</text>
    <circle cx="640" cy="110" r="8" class="bx-c"/><text x="640" y="88" class="t-b t-s t-c">2022</text><text x="640" y="140" class="t-s t-c">Zinswende</text><text x="640" y="156" class="t-s t-c">(Inflation)</text>
  </g>
</svg>` },
        { typ: "liste", items: [
            "**1992:** Im Vertrag von Maastricht beschließen die EU-Staaten die Währungsunion und legen Kriterien für den Beitritt fest (u. a. stabile Preise, begrenzte Staatsverschuldung).",
            "**1998/1999/2002:** Die EZB wird gegründet (1. Juni 1998). Der Euro wird 1999 als Buchgeld, 2002 als Bargeld eingeführt.",
            "**2008–2012:** Finanzkrise und Staatsschuldenkrise. 2012 verspricht EZB-Präsident Mario Draghi, den Euro zu retten („Whatever it takes“).",
            "**Ab 2014:** Die Leitzinsen sinken bis auf Null, zeitweise sogar in den negativen Bereich. Die EZB kauft in großem Umfang Anleihen.",
            "**2022:** Die Inflation steigt stark an; die EZB erhöht im Juli 2022 erstmals seit Jahren die Zinsen (Zinswende)."
        ] },
        { typ: "text", text: "**Dein Fahrplan durch den Kurs** – jedes Modul dauert nur wenige Minuten:" },
        { typ: "tabelle", kopf: ["Modul", "Leitfrage"], zeilen: [
            ["2 Geld und Geldschöpfung", "Was ist Geld, und wie entsteht es?"],
            ["3 Preisstabilität", "Was ist Inflation, und warum will die EZB 2 %?"],
            ["4 Die EZB als Institution", "Wer entscheidet in der EZB, und warum ist sie unabhängig?"],
            ["5 Instrumente und Wirkung", "Mit welchen Mitteln steuert die EZB – und wie kommt das bei uns an?"],
            ["6 Kritik und Ausblick", "Was wird an der EZB kritisiert, und wie beurteilst du das?"]
        ] },
        { typ: "hinweis", text: "Am Ende wartet ein kurzes Gesamtquiz und eine **Vorbereitung auf den Besuch bei der Bundesbank** mit Checkliste und Fragen, die du dort stellen kannst." },
        { typ: "check", frage: {
            id: "m1-c3", typ: "single",
            frage: "Welches Ereignis kam zuerst?",
            optionen: ["Einführung des Euro-Bargelds", "Gründung der EZB", "Zinswende 2022", "Finanzkrise 2008"],
            richtig: 1,
            erklaerung: "Die EZB wurde 1998 gegründet, das Euro-Bargeld kam 2002, die Finanzkrise 2008, die Zinswende 2022."
        } }
      ]
    }
  ],

  fazit: "Die EZB beeinflusst über Zinsen und Preise deinen Alltag – als Sparer, Kreditnehmer und Verbraucher. Sie sitzt in Frankfurt und bildet mit den nationalen Zentralbanken, darunter der Deutschen Bundesbank, das Eurosystem, das für 21 Länder eine gemeinsame Geldpolitik macht. Sie ist die Nachfolgerin der Bundesbank als Hüterin stabiler Preise. In den nächsten Modulen erfährst du, wie Geld entsteht, was Inflation bedeutet, wie die EZB organisiert ist, welche Instrumente sie nutzt und was an ihrer Politik kritisiert wird.",

  quellen: [
    { titel: "Deutsche Bundesbank: Organisation im Europäischen System der Zentralbanken", url: "https://www.bundesbank.de/de/bundesbank/eurosystem/organisation/organisation-im-europaeischen-system-der-zentralbanken-604320" },
    { titel: "Deutsche Bundesbank: Bulgarien führt den Euro ein", url: "https://www.bundesbank.de/de/aufgaben/themen/bulgarien-fuehrt-den-euro-ein-974352" },
    { titel: "EZB: Pressemitteilung zum Beitritt Bulgariens zum Euroraum (1. Januar 2026)", url: "https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.pr260101~c830245e42.de.html" }
  ],

  pool: [
    // ---- a1 Warum die EZB dich betrifft
    { id: "m1-01", typ: "multiple", afb: 1, thema: "a1",
      frage: "Wo spürst du Entscheidungen der EZB im Alltag? (Mehrere Antworten möglich)",
      optionen: ["Zinsen auf dem Sparbuch", "Kosten für einen Kredit", "Entwicklung der Preise", "Höhe der Mehrwertsteuer"],
      richtig: [0, 1, 2],
      erklaerung: "Die EZB wirkt über Zinsen und Preise. Die Mehrwertsteuer legt der Staat fest, nicht die EZB." },
    { id: "m1-02", typ: "single", afb: 2, thema: "a1",
      frage: "Die EZB senkt den Leitzins. Welche Folge ist am wahrscheinlichsten?",
      optionen: ["Kredite werden tendenziell günstiger, Sparzinsen sinken", "Kredite werden teurer, Sparzinsen steigen", "Es ändert sich nichts", "Die Preise sinken sofort"],
      richtig: 0,
      erklaerung: "Niedrigere Leitzinsen geben die Banken meist an Kunden weiter: Kredite werden günstiger, Sparen weniger attraktiv." },
    { id: "m1-03", typ: "single", afb: 3, thema: "a1",
      frage: "Beurteile: „Eine Zinsentscheidung der EZB ist für alle Menschen im Euroraum gleichermaßen vorteilhaft.“",
      optionen: ["Stimmt, denn alle nutzen dieselbe Währung.", "Stimmt nicht: Sparer und Kreditnehmer sind unterschiedlich betroffen, es gibt Gewinner und Verlierer.", "Stimmt, denn die EZB entscheidet immer neutral.", "Stimmt nicht, denn Zinsen betreffen nur Banken."],
      richtig: 1,
      erklaerung: "Zinsänderungen haben Verteilungswirkungen – zum Beispiel zwischen Sparern und Schuldnern." },

    // ---- a2 EZB, Eurosystem, Bundesbank
    { id: "m1-04", typ: "zuordnung", afb: 1, thema: "a2",
      frage: "Ordne zu.",
      paare: [["EZB", "Zentralbank des Euroraums mit Sitz in Frankfurt"], ["Eurosystem", "EZB und die nationalen Zentralbanken der Euro-Länder"], ["Deutsche Bundesbank", "Nationale Zentralbank Deutschlands, Teil des Eurosystems"]],
      erklaerung: "Das Eurosystem besteht aus der EZB und den nationalen Zentralbanken – dazu gehört die Bundesbank." },
    { id: "m1-05", typ: "multiple", afb: 2, thema: "a2",
      frage: "Welche Aufgaben hat die Deutsche Bundesbank? (Mehrere Antworten möglich)",
      optionen: ["Mitwirkung an den geldpolitischen Entscheidungen im EZB-Rat", "Versorgung der Wirtschaft mit Bargeld", "Festlegung der Einkommensteuer", "Mitwirkung an der Bankenaufsicht"],
      richtig: [0, 1, 3],
      erklaerung: "Die Steuerpolitik liegt beim Staat. Die Bundesbank wirkt an der Geldpolitik mit, versorgt die Wirtschaft mit Bargeld und beaufsichtigt Banken (gemeinsam mit der BaFin)." },
    { id: "m1-06", typ: "lueckentext", afb: 1, thema: "a2",
      frage: "Vervollständige den Satz.",
      text: "Die EZB hat ihren Sitz in {1}. Über die Leitzinsen entscheidet der {2}.",
      luecken: [ { optionen: ["Frankfurt am Main", "Brüssel", "Berlin"], richtig: 0 }, { optionen: ["EZB-Rat", "Bundestag", "Europäische Kommission"], richtig: 0 } ],
      erklaerung: "Die EZB sitzt in Frankfurt; der EZB-Rat beschließt die Leitzinsen." },

    // ---- a3 Zeitstrahl
    { id: "m1-07", typ: "reihenfolge", afb: 2, thema: "a3",
      frage: "Bringe die Ereignisse in die richtige zeitliche Reihenfolge.",
      schritte: ["Vertrag von Maastricht (1992)", "Gründung der EZB (1998)", "Euro-Bargeld wird eingeführt (2002)", "Finanzkrise (2008)", "Zinswende wegen hoher Inflation (2022)"],
      erklaerung: "Maastricht 1992 → EZB 1998 → Euro-Bargeld 2002 → Finanzkrise 2008 → Zinswende 2022." },
    { id: "m1-08", typ: "single", afb: 1, thema: "a3",
      frage: "Wessen Geldpolitik galt als Vorbild für die Gründung der EZB?",
      optionen: ["Der Deutschen Bundesbank mit der D-Mark", "Der amerikanischen Notenbank Fed", "Der Bank of England", "Der Weltbank"],
      richtig: 0,
      erklaerung: "Die Bundesbank stand für stabile Preise; daran orientierte sich das Mandat der EZB." },
    { id: "m1-09", typ: "single", afb: 3, thema: "a3",
      frage: "Warum war der Beitritt zur Währungsunion an Kriterien wie niedrige Inflation und begrenzte Staatsverschuldung geknüpft? Wähle die beste Begründung.",
      optionen: ["Damit die gemeinsame Währung stabil bleibt und kein Land die anderen mit hohen Schulden oder Inflation belastet", "Damit alle Länder dieselben Steuern haben", "Damit die EZB keine Zinsen mehr festlegen muss", "Damit der Euro schneller eingeführt werden kann"],
      richtig: 0,
      erklaerung: "Die Konvergenzkriterien sollten sicherstellen, dass nur Länder mit ausreichend stabilen Verhältnissen beitreten." }
  ]
};
