/* MODUL 4 – Die EZB als Institution (Datenformat: siehe modul1.js) */
window.KURS_MODULE = window.KURS_MODULE || {};
window.KURS_MODULE[4] = {
  id: 4,
  titel: "Die EZB als Institution",
  kurz: "Organe, Mandat nach Art. 127 AEUV, Unabhängigkeit und Rechenschaft",
  minuten: 9,
  quizFragen: 6,

  lernziele: [
    "Ich kann EZB-Rat, Direktorium und Erweiterten Rat unterscheiden und ihre Aufgaben nennen.",
    "Ich kann das Mandat der EZB (Art. 127 AEUV) mit Haupt- und Nebenziel erklären.",
    "Ich kann begründen, warum die EZB unabhängig ist und warum sie dem Staat kein Geld direkt leihen darf."
  ],

  abschnitte: [
    {
      id: "a1",
      titel: "Wer entscheidet? Die Organe der EZB",
      inhalt: [
        { typ: "text", text: "Die Entscheidungen der EZB trifft kein Einzelner, sondern ein Gremium. Zwei Begriffe solltest du auseinanderhalten:" },
        { typ: "merke", begriff: "Eurosystem", text: "Die EZB und die nationalen Zentralbanken der Länder mit dem Euro (derzeit 21). Es führt die gemeinsame Geldpolitik durch." },
        { typ: "merke", begriff: "ESZB (Europäisches System der Zentralbanken)", text: "Die EZB und die nationalen Zentralbanken aller EU-Mitgliedstaaten, also auch der Länder ohne Euro." },
        { typ: "svg", titel: "Abb. 1: Wer entscheidet in der EZB?",
          alt: "Der EZB-Rat besteht aus dem Direktorium mit sechs Mitgliedern und den Präsidenten der nationalen Zentralbanken der Euro-Länder. Er beschließt die Geldpolitik. Das Direktorium führt die laufenden Geschäfte. Der Erweiterte Rat ist ein beratendes Gremium.",
          svg: `<svg viewBox="0 0 700 300" role="img" aria-label="Organe der EZB: EZB-Rat, Direktorium, Erweiterter Rat">
  <defs><marker id="pf4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="pf"/></marker></defs>
  <rect x="20" y="20" width="270" height="110" rx="10" class="bx-a"/>
  <text x="155" y="48" class="t-b t-c">Direktorium (6)</text>
  <text x="155" y="72" class="t-s t-c">Präsident/in, Vizepräsident/in</text>
  <text x="155" y="90" class="t-s t-c">und vier weitere Mitglieder</text>
  <text x="155" y="112" class="t-s t-c">führt die laufenden Geschäfte</text>
  <rect x="410" y="20" width="270" height="110" rx="10" class="bx-a"/>
  <text x="545" y="48" class="t-b t-c">Präsidenten der nationalen</text>
  <text x="545" y="68" class="t-b t-c">Zentralbanken (21)</text>
  <text x="545" y="94" class="t-s t-c">der Euro-Länder,</text>
  <text x="545" y="112" class="t-s t-c">in Deutschland: Bundesbank</text>
  <path d="M155 134 L155 160 L300 170" class="arr" style="marker-end:url(#pf4)"/>
  <path d="M545 134 L545 160 L400 170" class="arr" style="marker-end:url(#pf4)"/>
  <rect x="200" y="170" width="300" height="70" rx="10" class="bx-c"/>
  <text x="350" y="198" class="t-b t-c">EZB-Rat (27 Mitglieder)</text>
  <text x="350" y="220" class="t-s t-c">beschließt Leitzinsen und Geldpolitik</text>
  <rect x="200" y="256" width="300" height="38" rx="8" class="bx-b"/>
  <text x="350" y="280" class="t-s t-c">Erweiterter Rat: berät nur, keine Geldpolitik</text>
</svg>` },
        { typ: "liste", items: [
            "**EZB-Rat:** oberstes Beschlussorgan der Geldpolitik. Mitglieder: die sechs Direktoriumsmitglieder und die 21 Präsidenten der nationalen Zentralbanken der Euro-Länder. Er tagt regelmäßig, wichtige Zinsentscheidungen verkündet die EZB-Präsidentin auf einer Pressekonferenz.",
            "**Direktorium:** sechs Personen (Präsident/in, Vizepräsident/in, vier weitere Mitglieder), von den Staats- und Regierungschefs der Euro-Länder ernannt. Es führt die laufenden Geschäfte und bereitet die Sitzungen des EZB-Rats vor.",
            "**Erweiterter Rat:** berät, trifft aber keine geldpolitischen Entscheidungen."
        ] },
        { typ: "hinweis", text: "Jedes Mitglied des EZB-Rats entscheidet für den **gesamten Euroraum** – nicht als Vertreter seines Landes. Das soll verhindern, dass nationale Interessen die Geldpolitik dominieren." },
        { typ: "check", frage: {
            id: "m4-c1", typ: "single",
            frage: "Wer beschließt die Leitzinsen im Euroraum?",
            optionen: ["Das Direktorium allein", "Der EZB-Rat", "Der Erweiterte Rat", "Die Europäische Kommission"],
            richtig: 1,
            erklaerung: "Der EZB-Rat – Direktorium plus Präsidenten der nationalen Zentralbanken – beschließt die Geldpolitik."
        } }
      ]
    },
    {
      id: "a2",
      titel: "Das Mandat: Preisstabilität zuerst",
      inhalt: [
        { typ: "text", text: "Was soll die EZB überhaupt tun? Das steht im **Vertrag über die Arbeitsweise der Europäischen Union (AEUV)**. Nach Art. 127 gilt:" },
        { typ: "liste", items: [
            "**Vorrangiges Ziel:** Preisstabilität gewährleisten.",
            "**Nachrangiges Ziel:** Soweit das Ziel der Preisstabilität nicht beeinträchtigt wird, unterstützt die EZB die allgemeine Wirtschaftspolitik in der EU (z. B. Wachstum und Beschäftigung)."
        ] },
        { typ: "merke", begriff: "Mandat der EZB", text: "Ihr gesetzlicher Auftrag nach Art. 127 AEUV: In erster Linie Preisstabilität, nachrangig Unterstützung der allgemeinen Wirtschaftspolitik." },
        { typ: "text", text: "Damit unterscheidet sich die EZB von manchen anderen Zentralbanken, die ausdrücklich mehrere gleichrangige Ziele haben. Die EZB hat **eine klare Rangfolge**. Konkretisiert ist das Ziel durch das 2-%-Inflationsziel (Modul 3). Weitere Aufgaben der EZB sind u. a. Bankenaufsicht über große Banken, die Ausgabe von Banknoten und die Sicherung reibungsloser Zahlungssysteme." },
        { typ: "beispiel", titel: "Zielkonflikt", text: "Die Inflation ist zu hoch, die Konjunktur aber schwach. Die EZB müsste die Zinsen erhöhen, was die Wirtschaft zusätzlich bremst. Weil Preisstabilität vorrangig ist, darf sie das – auch wenn Wachstum und Beschäftigung leiden. Genau solche Konflikte werden in Modul 6 diskutiert." },
        { typ: "check", frage: {
            id: "m4-c2", typ: "single",
            frage: "Welche Aussage zum Mandat der EZB ist richtig?",
            optionen: ["Wachstum und Preisstabilität sind gleichrangig.", "Vorrangig ist die Preisstabilität; die Wirtschaftspolitik wird nur unterstützt, soweit sie dadurch nicht gefährdet ist.", "Das vorrangige Ziel ist die Senkung der Arbeitslosigkeit.", "Die EZB hat keinen gesetzlichen Auftrag."],
            richtig: 1,
            erklaerung: "Art. 127 AEUV legt eine klare Rangfolge fest: zuerst Preisstabilität."
        } }
      ]
    },
    {
      id: "a3",
      titel: "Unabhängigkeit und Verbot der Staatsfinanzierung",
      inhalt: [
        { typ: "text", text: "Die EZB darf von **niemandem Weisungen** annehmen – weder von der EU noch von Regierungen (Art. 130 AEUV). Das nennt man Unabhängigkeit. Sie hat drei Seiten:" },
        { typ: "tabelle", kopf: ["Form", "Bedeutung"], zeilen: [
            ["Institutionell", "Keine Weisungen von Regierungen oder EU-Organen"],
            ["Personell", "Lange Amtszeiten der Direktoriumsmitglieder (acht Jahre, ohne Wiederwahl): Sie müssen nicht um ihre Wiederernennung fürchten"],
            ["Finanziell", "Eigene Einnahmen; die EZB darf Staaten keine Kredite geben (Art. 123 AEUV)"]
        ] },
        { typ: "merke", begriff: "Verbot der monetären Staatsfinanzierung (Art. 123 AEUV)", text: "Die EZB und die nationalen Zentralbanken dürfen Staaten weder Kredite gewähren noch ihnen unmittelbar Schuldtitel (Staatsanleihen) abkaufen. Verboten ist die direkte Finanzierung des Staates mit neu geschaffenem Geld („Notenpresse“)." },
        { typ: "text", text: "**Warum diese Unabhängigkeit?** Politiker denken in Wahlperioden und haben einen Anreiz, Ausgaben kurzfristig über die Notenpresse zu finanzieren. Das führt zu Inflation. Historische Erfahrungen mit hoher Inflation haben deshalb dazu geführt, dass die Bundesbank unabhängig war – und dieses Vorbild wurde auf die EZB übertragen. Studien zeigen im Allgemeinen, dass Länder mit unabhängigen Zentralbanken eine niedrigere Inflation haben." },
        { typ: "text", text: "**Aber keine Macht ohne Kontrolle:** Wer unabhängig ist, muss rechenschaftspflichtig sein. Die EZB erklärt ihre Entscheidungen auf Pressekonferenzen, veröffentlicht Berichte und die Präsidentin muss dem Europäischen Parlament regelmäßig Rede und Antwort stehen. Der Rahmen (Mandat) kann nur durch Änderung der EU-Verträge verändert werden." },
        { typ: "check", frage: {
            id: "m4-c3", typ: "richtigfalsch",
            aussage: "Art. 123 AEUV verbietet es der EZB, am Anleihenmarkt Staatsanleihen zu kaufen.",
            richtig: false,
            begruendungen: ["Richtig, denn jeder Kauf von Staatsanleihen ist verboten.", "Falsch, denn verboten ist nur der unmittelbare Erwerb von den Staaten selbst (Primärmarkt); Käufe am Markt (Sekundärmarkt) sind nicht von vornherein verboten.", "Falsch, denn Art. 123 AEUV gibt es nicht mehr."],
            richtigeBegruendung: 1,
            erklaerung: "Art. 123 AEUV untersagt den unmittelbaren Erwerb. Ob Käufe am Sekundärmarkt dennoch zu einer verbotenen Staatsfinanzierung führen, ist umstritten (Modul 6)."
        } }
      ]
    }
  ],

  fazit: "Das Eurosystem besteht aus der EZB und den 21 nationalen Zentralbanken der Euro-Länder; über die Geldpolitik entscheidet der EZB-Rat, das Direktorium führt die laufenden Geschäfte. Nach Art. 127 AEUV ist Preisstabilität das vorrangige Ziel, die Unterstützung der Wirtschaftspolitik nachrangig. Die EZB ist institutionell, personell und finanziell unabhängig, darf Staaten kein Geld direkt zur Verfügung stellen (Art. 123 AEUV) und ist rechenschaftspflichtig. Im nächsten Modul geht es darum, welche Mittel sie hat, um ihr Ziel zu erreichen.",

  quellen: [
    { titel: "AEUV Art. 127 – Ziele und Aufgaben des ESZB (EUR-Lex)", url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:12016E127" },
    { titel: "AEUV Art. 123 – Verbot monetärer Staatsfinanzierung (EUR-Lex)", url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:12016E123" },
    { titel: "AEUV Art. 130 – Unabhängigkeit (EUR-Lex)", url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:12016E130" },
    { titel: "Deutsche Bundesbank: Organisation im Europäischen System der Zentralbanken", url: "https://www.bundesbank.de/de/bundesbank/eurosystem/organisation/organisation-im-europaeischen-system-der-zentralbanken-604320" }
  ],

  pool: [
    { id: "m4-01", typ: "zuordnung", afb: 1, thema: "a1",
      frage: "Ordne die Gremien ihrer Aufgabe zu.",
      paare: [["EZB-Rat", "Beschließt Leitzinsen und Geldpolitik"], ["Direktorium", "Führt die laufenden Geschäfte der EZB"], ["Erweiterter Rat", "Berät, trifft aber keine geldpolitischen Entscheidungen"]],
      erklaerung: "Die Entscheidungen zur Geldpolitik trifft der EZB-Rat." },
    { id: "m4-02", typ: "single", afb: 1, thema: "a1",
      frage: "Woraus besteht der EZB-Rat?",
      optionen: ["Aus dem Direktorium und den Präsidenten der nationalen Zentralbanken der Euro-Länder", "Aus den Finanzministern der Euro-Länder", "Aus Vertretern der Europäischen Kommission", "Aus den Regierungschefs der EU"],
      richtig: 0,
      erklaerung: "Direktorium (6) plus Präsidenten der nationalen Zentralbanken der Euro-Länder (21)." },
    { id: "m4-03", typ: "single", afb: 2, thema: "a1",
      frage: "Was unterscheidet das Eurosystem vom ESZB?",
      optionen: ["Das Eurosystem umfasst nur die Zentralbanken der Euro-Länder, das ESZB die aller EU-Staaten", "Das ESZB umfasst nur die EZB", "Das Eurosystem umfasst auch die USA", "Es gibt keinen Unterschied"],
      richtig: 0,
      erklaerung: "ESZB = EZB + nationale Zentralbanken aller EU-Staaten; Eurosystem = EZB + nationale Zentralbanken der Euro-Länder." },

    { id: "m4-04", typ: "lueckentext", afb: 1, thema: "a2",
      frage: "Vervollständige den Satz zum Mandat der EZB.",
      text: "Das vorrangige Ziel der EZB ist die {1}. Soweit dieses Ziel nicht beeinträchtigt wird, unterstützt sie die {2} der EU.",
      luecken: [ { optionen: ["Preisstabilität", "Vollbeschäftigung", "Staatsverschuldung"], richtig: 0 }, { optionen: ["allgemeine Wirtschaftspolitik", "Steuerpolitik", "Außenpolitik"], richtig: 0 } ],
      erklaerung: "So steht es in Art. 127 AEUV." },
    { id: "m4-05", typ: "single", afb: 2, thema: "a2",
      frage: "Die Inflation ist hoch, die Wirtschaft schwächelt. Wie richtet sich die EZB laut Mandat aus?",
      optionen: ["Sie gibt der Preisstabilität Vorrang, auch wenn dies das Wachstum belastet", "Sie gibt dem Wachstum Vorrang", "Sie wartet auf Weisungen der Regierungen", "Sie entscheidet per Los"],
      richtig: 0,
      erklaerung: "Preisstabilität hat Vorrang; die Wirtschaftspolitik wird nur unterstützt, soweit dies das Ziel nicht gefährdet." },
    { id: "m4-06", typ: "single", afb: 3, thema: "a2",
      frage: "Beurteile: Ist die klare Rangfolge „Preisstabilität zuerst“ sinnvoll?",
      optionen: ["Ja, denn ein klares Hauptziel macht die EZB berechenbar und schützt das Vertrauen in den Euro; es kann aber zu Zielkonflikten mit Beschäftigung führen", "Nein, denn Preisstabilität ist unwichtig", "Ja, denn Zielkonflikte gibt es nie", "Nein, denn eine Rangfolge verbietet jede Unterstützung der Wirtschaft"],
      richtig: 0,
      erklaerung: "Ein klares Mandat schafft Verlässlichkeit; der Preis sind mögliche Zielkonflikte." },

    { id: "m4-07", typ: "multiple", afb: 1, thema: "a3",
      frage: "Welche Formen der Unabhängigkeit gibt es?",
      optionen: ["Institutionelle Unabhängigkeit", "Personelle Unabhängigkeit", "Finanzielle Unabhängigkeit", "Parteipolitische Abhängigkeit"],
      richtig: [0, 1, 2],
      erklaerung: "Institutionell (keine Weisungen), personell (lange Amtszeiten), finanziell (keine Staatsfinanzierung)." },
    { id: "m4-08", typ: "single", afb: 2, thema: "a3",
      frage: "Warum soll die EZB dem Staat kein Geld direkt zur Verfügung stellen (Art. 123 AEUV)?",
      optionen: ["Weil sonst die Gefahr besteht, dass Staatsausgaben über die Notenpresse finanziert werden und die Inflation steigt", "Weil Staaten kein Geld brauchen", "Weil Banken keine Kredite vergeben dürfen", "Weil die EZB selbst kein Geld hat"],
      richtig: 0,
      erklaerung: "Direkte Staatsfinanzierung schafft den Anreiz, Geld zu drucken – mit Inflation als Folge." },
    { id: "m4-09", typ: "single", afb: 3, thema: "a3",
      frage: "Kritiker sagen: „Eine unabhängige EZB ist undemokratisch.“ Welche Antwort ist am überzeugendsten?",
      optionen: ["Die Unabhängigkeit ist demokratisch legitimiert, denn sie beruht auf den EU-Verträgen; die EZB ist zudem rechenschaftspflichtig und ihr Mandat ist klar begrenzt", "Die EZB ist nicht an Gesetze gebunden", "Die EZB kann alles allein entscheiden", "Demokratie spielt bei Zentralbanken keine Rolle"],
      richtig: 0,
      erklaerung: "Die Unabhängigkeit wurde vertraglich festgelegt und mit Rechenschaftspflichten verbunden." }
  ]
};
