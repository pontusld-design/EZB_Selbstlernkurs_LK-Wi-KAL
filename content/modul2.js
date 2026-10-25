/* MODUL 2 – Geld und Geldschöpfung (Datenformat: siehe Kommentar am Anfang von modul1.js) */
window.KURS_MODULE = window.KURS_MODULE || {};
window.KURS_MODULE[2] = {
  id: 2,
  titel: "Geld und Geldschöpfung",
  kurz: "Funktionen des Geldes, Bargeld und Buchgeld, wie Geld entsteht",
  minuten: 9,
  quizFragen: 6,

  lernziele: [
    "Ich kann die drei Funktionen des Geldes nennen und an Beispielen erklären.",
    "Ich kann Bargeld und Buchgeld unterscheiden und die Geldmengen M1, M2 und M3 grob einordnen.",
    "Ich kann erklären, wie Geschäftsbanken durch Kredite Buchgeld schaffen und welche Rolle die Zentralbank dabei hat."
  ],

  abschnitte: [
    {
      id: "a1",
      titel: "Funktionen des Geldes",
      inhalt: [
        { typ: "text", text: "Stell dir vor, du müsstest Schuhe gegen Brot tauschen: Du brauchst jemanden, der Schuhe will **und** Brot anbietet. Geld löst dieses Problem. Es erfüllt drei Funktionen:" },
        { typ: "merke", begriff: "Tauschmittel", text: "Geld wird im Austausch gegen Güter und Dienstleistungen allgemein akzeptiert." },
        { typ: "merke", begriff: "Recheneinheit", text: "Alle Güter werden in derselben Einheit (Euro) bewertet; Preise machen Werte vergleichbar." },
        { typ: "merke", begriff: "Wertaufbewahrungsmittel", text: "Kaufkraft kann gespeichert und später genutzt werden – das klappt umso besser, je stabiler der Wert des Geldes ist." },
        { typ: "hinweis", text: "Bei hoher Inflation leidet vor allem die Wertaufbewahrung: Für denselben Geldbetrag bekommst du später weniger. Mehr dazu in Modul 3." },
        { typ: "check", frage: {
            id: "m2-c1", typ: "single",
            frage: "Eine Schülerin spart sechs Monate lang jeden Monat 50 € für ein Smartphone. Welche Geldfunktion steht im Vordergrund?",
            optionen: ["Tauschmittel", "Recheneinheit", "Wertaufbewahrungsmittel", "Zahlungsversprechen"],
            richtig: 2,
            erklaerung: "Sie überträgt Kaufkraft in die Zukunft – das ist die Wertaufbewahrung."
        } }
      ]
    },
    {
      id: "a2",
      titel: "Bargeld, Buchgeld und Geldmenge",
      inhalt: [
        { typ: "text", text: "Geld gibt es in zwei Hauptformen. Den größten Teil der Geldmenge machen nicht Scheine und Münzen aus, sondern Guthaben auf Konten." },
        { typ: "merke", begriff: "Bargeld", text: "Banknoten und Münzen. Euro-Banknoten sind gesetzliches Zahlungsmittel; das Recht, ihre Ausgabe zu genehmigen, liegt bei der EZB (Art. 128 AEUV)." },
        { typ: "merke", begriff: "Buchgeld (Giralgeld)", text: "Guthaben auf Konten bei Banken, mit denen per Überweisung oder Karte bezahlt wird. Es ist kein gesetzliches Zahlungsmittel, wird aber freiwillig akzeptiert." },
        { typ: "text", text: "Um die Geldmenge zu messen, fasst das Eurosystem Geld nach seiner **Liquidität** zusammen – also danach, wie schnell man damit bezahlen kann:" },
        { typ: "svg", titel: "Abb. 1: Die Geldmengen M1, M2 und M3 sind ineinander geschachtelt",
          alt: "Drei ineinander liegende Rechtecke. Innen M1: Bargeldumlauf und täglich fällige Einlagen. Darum M2: zusätzlich Einlagen bis zwei Jahre Laufzeit oder drei Monate Kündigungsfrist. Außen M3: zusätzlich Repogeschäfte, Geldmarktfondsanteile und kurzfristige Schuldverschreibungen.",
          svg: `<svg viewBox="0 0 700 330" role="img" aria-label="Geldmengenaggregate M1, M2, M3 als geschachtelte Rechtecke">
  <rect x="10" y="10" width="680" height="310" rx="14" class="bx-c"/>
  <text x="26" y="36" class="t-b">M3 = M2 +</text>
  <text x="26" y="58" class="t-s">Repogeschäfte · Geldmarktfondsanteile · Schuldverschreibungen bis 2 Jahre</text>
  <rect x="40" y="80" width="620" height="222" rx="12" class="bx-b"/>
  <text x="56" y="106" class="t-b">M2 = M1 +</text>
  <text x="56" y="128" class="t-s">Einlagen mit Laufzeit bis 2 Jahre · Einlagen mit Kündigungsfrist bis 3 Monate</text>
  <rect x="70" y="150" width="560" height="130" rx="10" class="bx-a"/>
  <text x="86" y="176" class="t-b">M1 (eng gefasst)</text>
  <text x="86" y="204">Bargeldumlauf (außerhalb des Bankensystems)</text>
  <text x="86" y="230">+ täglich fällige Einlagen (z. B. Girokonto)</text>
  <text x="86" y="258" class="t-s">Höchste Liquidität: sofort als Zahlungsmittel nutzbar</text>
</svg>` },
        { typ: "merke", begriff: "Geldmenge M3", text: "Weit gefasstes Geldmengenaggregat des Eurosystems: M2 plus Repogeschäfte, Geldmarktfondsanteile und Schuldverschreibungen mit bis zu zwei Jahren Laufzeit. Es dient der EZB als wichtiger Indikator in der monetären Analyse." },
        { typ: "beispiel", titel: "Umbuchung", text: "Max legt 5.000 € vom Girokonto als Festgeld für 12 Monate an. **M1 sinkt** um 5.000 €, M2 und M3 bleiben unverändert – das Festgeld gehört zu M2." },
        { typ: "check", frage: {
            id: "m2-c2", typ: "single",
            frage: "Zu welchem Aggregat gehört der Bargeldumlauf?",
            optionen: ["Nur zu M3", "Zu M1 – und damit auch zu M2 und M3", "Nur zu M1", "Zu keinem"],
            richtig: 1,
            erklaerung: "Die Aggregate sind geschachtelt: Was in M1 steckt, steckt auch in M2 und M3."
        } }
      ]
    },
    {
      id: "a3",
      titel: "Wie Geld entsteht: Geldschöpfung",
      inhalt: [
        { typ: "text", text: "Wer schafft eigentlich das Geld? Es gibt zwei Ebenen: Die **Zentralbank** schafft Zentralbankgeld, die **Geschäftsbanken** schaffen Buchgeld." },
        { typ: "merke", begriff: "Zentralbankgeld (Geldbasis)", text: "Bargeldumlauf plus die Guthaben der Geschäftsbanken bei der Zentralbank. Nur Banken haben Konten bei der Zentralbank; sie wickeln damit Zahlungen untereinander ab." },
        { typ: "merke", begriff: "Geldschöpfung", text: "Zusätzliches Geld entsteht, wenn eine Bank ein Guthaben schafft und ihm eine Forderung gegenüberstellt – zum Beispiel bei einem Kredit." },
        { typ: "text", text: "**So schaffen Geschäftsbanken Buchgeld:** Nimmt eine Kundin einen Kredit über 10.000 € auf, schreibt die Bank den Betrag ihrem Girokonto gut. Dieses Guthaben ist **neues Buchgeld**. Die Bundesbank betont: Dafür müssen nicht erst Spareinlagen anderer Kunden eingesammelt worden sein. Zahlt die Kundin den Kredit zurück, verschwindet das Buchgeld wieder." },
        { typ: "svg", titel: "Abb. 2: Kreditvergabe verlängert die Bankbilanz (vereinfacht)",
          alt: "Bilanz einer Geschäftsbank nach Kreditvergabe: Aktiva enthält zusätzlich eine Kreditforderung von 10.000 Euro, Passiva zusätzlich die Sichteinlage der Kundin von 10.000 Euro. Die Bilanzsumme steigt um 10.000 Euro.",
          svg: `<svg viewBox="0 0 700 250" role="img" aria-label="Bilanzverlängerung einer Geschäftsbank bei Kreditvergabe">
  <text x="350" y="24" class="t-b t-c">Bilanz der Geschäftsbank nach der Kreditvergabe</text>
  <rect x="100" y="40" width="500" height="150" class="bx-b"/>
  <line x1="350" y1="40" x2="350" y2="190" class="ln"/>
  <text x="225" y="64" class="t-b t-c">Aktiva</text><text x="475" y="64" class="t-b t-c">Passiva</text>
  <text x="225" y="94" class="t-s t-c">bisherige Vermögenswerte</text>
  <text x="475" y="94" class="t-s t-c">bisheriges Kapital</text>
  <rect x="115" y="118" width="220" height="60" rx="6" class="bx-c"/>
  <text x="225" y="142" class="t-s t-c t-b">+ Forderung gegen die Kundin</text><text x="225" y="164" class="t-s t-c">10.000 € (Kredit)</text>
  <rect x="365" y="118" width="220" height="60" rx="6" class="bx-c"/>
  <text x="475" y="142" class="t-s t-c t-b">+ Guthaben der Kundin</text><text x="475" y="164" class="t-s t-c">10.000 € (neues Buchgeld)</text>
  <text x="350" y="222" class="t-s t-c">Die Bilanzsumme steigt um 10.000 € – und die Geldmenge ebenfalls.</text>
</svg>` },
        { typ: "text", text: "**Und die Zentralbank?** Überweist die Kundin das Geld an jemanden mit Konto bei einer anderen Bank, wird die Zahlung zwischen den Banken mit Zentralbankgeld abgewickelt. Banken können sich dieses Zentralbankgeld am Geldmarkt oder gegen Sicherheiten von der Zentralbank besorgen. Über die **Zinsen**, zu denen sie das tun, steuert die EZB den Geldkreislauf (mehr in Modul 5)." },
        { typ: "hinweis", text: "Banken sind trotzdem nicht unbegrenzt: Sie brauchen kreditwürdige Kunden, müssen Risiken tragen und Vorgaben der Bankenaufsicht (z. B. zum Eigenkapital) einhalten." },
        { typ: "check", frage: {
            id: "m2-c3", typ: "single",
            frage: "Was geschieht mit der Bilanzsumme der Bank, wenn sie einen Kredit vergibt und den Betrag gutschreibt?",
            optionen: ["Sie sinkt", "Sie steigt", "Sie bleibt gleich", "Sie hängt vom Zinssatz ab"],
            richtig: 1,
            erklaerung: "Forderung (Aktiva) und Guthaben (Passiva) wachsen gleichzeitig – die Bilanz verlängert sich."
        } }
      ]
    }
  ],

  fazit: "Geld ist Tauschmittel, Recheneinheit und Wertaufbewahrungsmittel. Es gibt Bargeld und – weit überwiegend – Buchgeld; die Geldmenge wird in den geschachtelten Aggregaten M1, M2 und M3 gemessen. Zentralbankgeld (Bargeld und Bankenguthaben bei der Zentralbank) schafft die Zentralbank, Buchgeld schaffen die Geschäftsbanken vor allem durch Kredite. Das Lehrbuch-Bild „erst sparen, dann Kredit“ stimmt so nicht. Die EZB steuert den Geldkreislauf vor allem über Zinsen. Im nächsten Modul geht es um ihr wichtigstes Ziel: stabile Preise.",

  quellen: [
    { titel: "EZB: Was ist Geld?", url: "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/what_is_money.de.html" },
    { titel: "Deutsche Bundesbank: Häufig gestellte Fragen zum Thema Geldschöpfung", url: "https://www.bundesbank.de/de/service/schule-und-bildung/unterrichtsmaterialien/faq-zum-thema-geldschoepfung" },
    { titel: "Deutsche Bundesbank, Monatsbericht April 2017: Die Rolle von Banken, Nichtbanken und Zentralbank im Geldschöpfungsprozess", url: "https://www.bundesbank.de/resource/blob/614448/c0acb63e33120467bbb3615c63dc7e1a/mL/2017-04-%20%20%20geldschoepfungsprozess-data.pdf" },
    { titel: "AEUV Art. 128 – Ausgabe von Euro-Banknoten (EUR-Lex)", url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:12016E128" }
  ],

  pool: [
    { id: "m2-01", typ: "single", afb: 1, thema: "a1",
      frage: "Welche Aufzählung nennt die drei Funktionen des Geldes?",
      optionen: ["Tauschmittel, Recheneinheit, Wertaufbewahrungsmittel", "Zahlungsmittel, Kreditmittel, Steuermittel", "Tauschmittel, Produktionsmittel, Wertaufbewahrungsmittel", "Recheneinheit, Preismittel, Sparmittel"],
      richtig: 0,
      erklaerung: "Tauschmittel, Recheneinheit und Wertaufbewahrungsmittel sind die drei Funktionen." },
    { id: "m2-02", typ: "zuordnung", afb: 2, thema: "a1",
      frage: "Ordne jede Situation der passenden Geldfunktion zu.",
      paare: [["Du kaufst an der Bäckerei ein Brötchen.", "Tauschmittel"], ["Im Supermarkt hängen Preisschilder in Euro an allen Produkten.", "Recheneinheit"], ["Du legst Geld für den Urlaub im nächsten Jahr zurück.", "Wertaufbewahrungsmittel"]],
      erklaerung: "Bezahlen = Tauschmittel; Preisschilder = Recheneinheit; Sparen = Wertaufbewahrung." },
    { id: "m2-03", typ: "richtigfalsch", afb: 3, thema: "a1",
      aussage: "Bei hoher Inflation erfüllt Geld die Funktion des Wertaufbewahrungsmittels schlechter.",
      richtig: true,
      begruendungen: ["Richtig, denn die Kaufkraft eines gleichen Geldbetrags sinkt im Zeitverlauf.", "Richtig, denn bei Inflation wird Geld nicht mehr als Tauschmittel akzeptiert.", "Falsch, denn der Nennwert bleibt gleich."],
      richtigeBegruendung: 0,
      erklaerung: "Der Nennwert bleibt gleich, aber man kann später weniger dafür kaufen." },

    { id: "m2-04", typ: "multiple", afb: 1, thema: "a2",
      frage: "Welche Bestandteile gehören zu M1?",
      optionen: ["Bargeldumlauf (außerhalb des Bankensystems)", "Täglich fällige Einlagen (z. B. Girokonto)", "Festgeld mit 18 Monaten Laufzeit", "Anteile an Geldmarktfonds"],
      richtig: [0, 1],
      erklaerung: "M1 = Bargeld + täglich fällige Einlagen. Festgeld gehört zu M2, Geldmarktfondsanteile zu M3." },
    { id: "m2-05", typ: "single", afb: 2, thema: "a2",
      frage: "Eine Kundin überweist 3.000 € von ihrem Girokonto auf ein Festgeldkonto (12 Monate Laufzeit). Wie verändern sich die Geldmengen?",
      optionen: ["M1 sinkt, M2 und M3 bleiben unverändert", "M1, M2 und M3 sinken", "M1 bleibt gleich, M2 steigt", "Keine Geldmenge verändert sich"],
      richtig: 0,
      erklaerung: "Das Girokonto gehört zu M1, das Festgeld zu M2. Das Geld wandert von M1 nach M2; M2 und M3 enthalten beides." },
    { id: "m2-06", typ: "richtigfalsch", afb: 1, thema: "a2",
      aussage: "Buchgeld ist im Euroraum gesetzliches Zahlungsmittel.",
      richtig: false,
      begruendungen: ["Richtig, denn Girokonten werden von der EZB garantiert.", "Falsch, denn Buchgeld wird freiwillig akzeptiert; gesetzliches Zahlungsmittel ist Bargeld.", "Falsch, denn Buchgeld ist kein Geld."],
      richtigeBegruendung: 1,
      erklaerung: "Buchgeld ist eine Forderung gegen die Bank und wird freiwillig akzeptiert. Dennoch ist es Geld und Teil von M1." },

    { id: "m2-07", typ: "single", afb: 1, thema: "a3",
      frage: "Wie entsteht bei einer Kreditvergabe neues Buchgeld?",
      optionen: ["Die Bank druckt Banknoten", "Die Bank schreibt den Kreditbetrag dem Konto der Kundin gut – die Bilanz verlängert sich", "Die Bank leitet Spareinlagen anderer Kunden um", "Die Zentralbank überweist den Betrag an die Kundin"],
      richtig: 1,
      erklaerung: "Die Gutschrift ist das neue Buchgeld; der Bank steht die Kreditforderung gegenüber." },
    { id: "m2-08", typ: "reihenfolge", afb: 2, thema: "a3",
      frage: "Bringe die Schritte einer Kreditvergabe in die richtige Reihenfolge.",
      schritte: ["Kundin beantragt einen Kredit, die Bank prüft die Kreditwürdigkeit", "Bank und Kundin schließen den Kreditvertrag", "Die Bank schreibt den Kreditbetrag dem Girokonto gut (neues Buchgeld)", "Die Kundin überweist den Betrag an einen Händler mit Konto bei einer anderen Bank", "Die Banken begleichen die Zahlung untereinander mit Zentralbankgeld"],
      erklaerung: "Erst Prüfung und Vertrag, dann Gutschrift (Geldschöpfung), danach Verwendung des Geldes und Abwicklung zwischen den Banken." },
    { id: "m2-09", typ: "single", afb: 3, thema: "a3",
      frage: "Beurteile: „Banken verleihen nur das Geld, das Sparer vorher eingezahlt haben.“",
      optionen: ["Trifft vollständig zu, Banken sind reine Vermittler.", "Trifft nicht zu: Kredite schaffen neues Buchgeld. Banken sind aber begrenzt, z. B. durch Kreditnachfrage, Risiko und Eigenkapitalvorschriften.", "Trifft nicht zu, denn Banken können unbegrenzt Kredite vergeben.", "Trifft zu, denn die Zentralbank verbietet Kredite ohne Einlagen."],
      richtig: 1,
      erklaerung: "Nach Darstellung der Bundesbank ist die Aussage so nicht richtig; trotzdem ist die Kreditvergabe nicht grenzenlos." }
  ]
};
