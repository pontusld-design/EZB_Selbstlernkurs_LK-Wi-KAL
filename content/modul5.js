/* MODUL 5 – Instrumente und Wirkung der Geldpolitik (Datenformat: siehe modul1.js) */
window.KURS_MODULE = window.KURS_MODULE || {};
window.KURS_MODULE[5] = {
  id: 5,
  titel: "Instrumente und Wirkung der Geldpolitik",
  kurz: "Leitzinsen, Zinskorridor, Anleihekäufe – und wie das bei dir ankommt",
  minuten: 11,
  quizFragen: 6,

  lernziele: [
    "Ich kann die drei Leitzinsen der EZB nennen und den Zinskorridor erklären.",
    "Ich kann erklären, warum die EZB zusätzlich zu Zinsen Anleihekäufe und andere unkonventionelle Instrumente nutzte.",
    "Ich kann eine Wirkungskette von einer Zinsänderung bis zur Inflation beschreiben und weiß, dass die Wirkung verzögert eintritt."
  ],

  abschnitte: [
    {
      id: "a1",
      titel: "Leitzinsen und Zinskorridor",
      inhalt: [
        { typ: "text", text: "Das wichtigste Werkzeug der EZB sind die **Leitzinsen**. Das sind die Zinssätze, zu denen sich Geschäftsbanken bei der Zentralbank Geld leihen oder dort Geld anlegen. Sie bestimmen, wie teuer Geld für Banken ist – und damit mittelbar für dich." },
        { typ: "merke", begriff: "Hauptrefinanzierungssatz", text: "Zinssatz, zu dem Banken in den regelmäßigen (wöchentlichen) Offenmarktgeschäften Zentralbankgeld gegen Sicherheiten leihen können." },
        { typ: "merke", begriff: "Spitzenrefinanzierungssatz", text: "Zinssatz der Spitzenrefinanzierungsfazilität: Banken können sich bei Bedarf über Nacht Geld von der Zentralbank leihen (gegen Sicherheiten). Er bildet die Obergrenze des Zinskorridors." },
        { typ: "merke", begriff: "Einlagesatz (Einlagefazilität)", text: "Zinssatz, zu dem Banken überschüssiges Geld über Nacht bei der Zentralbank anlegen können. Er bildet die Untergrenze des Zinskorridors." },
        { typ: "svg", titel: "Abb. 1: Der Zinskorridor der EZB (Stand: Oktober 2026, gültig seit 16. September 2026)",
          alt: "Drei waagerechte Linien: oben der Spitzenrefinanzierungssatz 2,90 Prozent, in der Mitte der Hauptrefinanzierungssatz 2,65 Prozent, unten der Einlagesatz 2,50 Prozent. Zwischen oberer und unterer Linie bewegen sich die Geldmarktzinsen.",
          svg: `<svg viewBox="0 0 700 262" role="img" aria-label="Zinskorridor: Spitzenrefinanzierungssatz 2,90, Hauptrefinanzierungssatz 2,65, Einlagesatz 2,50 Prozent">
  <rect x="60" y="45" width="400" height="140" class="bx-a" style="fill-opacity:.5"/>
  <line x1="60" y1="45" x2="460" y2="45" class="ln" style="stroke:var(--svg-c);stroke-width:3"/>
  <line x1="60" y1="110" x2="460" y2="110" class="ln" style="stroke:var(--svg-a);stroke-width:3"/>
  <line x1="60" y1="185" x2="460" y2="185" class="ln" style="stroke:var(--svg-b);stroke-width:3"/>
  <text x="470" y="50" class="t-b">2,90 %</text><text x="470" y="68" class="t-s">Spitzenrefinanzierungssatz</text><text x="470" y="86" class="t-s">= Obergrenze (Geld über Nacht leihen)</text>
  <text x="470" y="115" class="t-b">2,65 %</text><text x="470" y="133" class="t-s">Hauptrefinanzierungssatz</text>
  <text x="470" y="190" class="t-b">2,50 %</text><text x="470" y="208" class="t-s">Einlagesatz</text><text x="470" y="226" class="t-s">= Untergrenze (Geld über Nacht anlegen)</text>
  <text x="260" y="152" class="t-s t-c t-b">Zinskorridor</text>
  <text x="60" y="248" class="t-s">Zwischen Ober- und Untergrenze bewegen sich die Geldmarktzinsen.</text>
</svg>` },
        { typ: "text", text: "**Warum ein Korridor?** Eine Bank, die Geld braucht, zahlt nie mehr als den Spitzenrefinanzierungssatz (sie leiht bei der Zentralbank). Eine Bank mit Überschuss bekommt nie weniger als den Einlagesatz. So bleiben die kurzfristigen Zinsen am Geldmarkt im Korridor. Ändert die EZB die Leitzinsen, verschiebt sich der gesamte Korridor." },
        { typ: "text", text: "**Weitere klassische Instrumente:**" },
        { typ: "liste", items: [
            "**Offenmarktgeschäfte:** Die EZB versorgt Banken regelmäßig mit Zentralbankgeld (z. B. wöchentlich), indem sie Kredite gegen Sicherheiten vergibt. Dafür gilt der Hauptrefinanzierungssatz.",
            "**Mindestreserve:** Banken müssen 1 % bestimmter Kundeneinlagen als Guthaben bei der Zentralbank halten (derzeit nicht verzinst, Stand: Oktober 2026).",
            "**Ständige Fazilitäten:** Einlagefazilität und Spitzenrefinanzierungsfazilität, die Banken jederzeit über Nacht nutzen können."
        ] },
        { typ: "check", frage: {
            id: "m5-c1", typ: "single",
            frage: "Eine Bank hat Überschussgeld und legt es bei der Zentralbank an. Welcher Zinssatz gilt?",
            optionen: ["Spitzenrefinanzierungssatz", "Hauptrefinanzierungssatz", "Einlagesatz", "Inflationsrate"],
            richtig: 2,
            erklaerung: "Geld, das Banken über Nacht bei der Zentralbank anlegen, wird zum Einlagesatz verzinst – er bildet die Untergrenze des Korridors."
        } }
      ]
    },
    {
      id: "a2",
      titel: "Unkonventionelle Maßnahmen: Anleihekäufe & Co.",
      inhalt: [
        { typ: "text", text: "Zwischen 2014 und 2022 lagen die Leitzinsen bei null oder sogar im negativen Bereich. Weiter senken ging nicht mehr – die Inflation blieb aber zu niedrig. Deshalb setzte die EZB **unkonventionelle Maßnahmen** ein:" },
        { typ: "merke", begriff: "Quantitative Lockerung (QE, Anleihekaufprogramme)", text: "Die Zentralbank kauft in großem Umfang Anleihen (z. B. Staatsanleihen) und stellt dafür neues Zentralbankgeld bereit. Das senkt die Renditen am Kapitalmarkt und soll Kredite günstiger machen. Die wichtigsten Programme: APP (ab 2015) und PEPP (ab 2020, Corona-Krise)." },
        { typ: "liste", items: [
            "**APP (Asset Purchase Programme):** Kauf von Staatsanleihen, Pfandbriefen und anderen Wertpapieren seit 2015.",
            "**PEPP (Pandemic Emergency Purchase Programme):** zusätzliches Notfallprogramm ab März 2020, um die Folgen der Corona-Pandemie abzufedern.",
            "**Langfristige Refinanzierungsgeschäfte:** besonders günstige, langlaufende Kredite an Banken, damit diese mehr Kredite an Unternehmen vergeben.",
            "**Forward Guidance:** Die EZB kündigt an, wie sie in Zukunft voraussichtlich handelt, um Erwartungen zu lenken.",
            "**TPI (Transmission Protection Instrument, seit 2022):** Instrument gegen ungerechtfertigte Marktturbulenzen, die die einheitliche Wirkung der Geldpolitik im Euroraum stören würden."
        ] },
        { typ: "text", text: "Seit der Zinswende 2022 hat die EZB die Anleihekäufe zurückgefahren: Die Wiederanlage fälliger Anleihen endete beim APP Mitte 2023 und beim PEPP Ende 2024, sodass die Bestände schrumpfen. Die Bilanzsumme des Eurosystems lag Ende 2025 bei rund 6,3 Billionen Euro." },
        { typ: "hinweis", text: "Unkonventionelle Maßnahmen sind **umstritten**: Kritiker sehen darin verdeckte Staatsfinanzierung (Art. 123 AEUV) und befürchten Blasen an den Märkten. Befürworter sagen, sie hätten Deflation verhindert und den Euro stabilisiert. Mehr dazu in Modul 6." },
        { typ: "check", frage: {
            id: "m5-c2", typ: "single",
            frage: "Warum griff die EZB zu Anleihekäufen?",
            optionen: ["Weil die Leitzinsen schon bei null lagen und die Inflation zu niedrig war", "Weil die Inflation zu hoch war", "Weil Banken kein Geld mehr hatten", "Weil der Staat sie dazu zwang"],
            richtig: 0,
            erklaerung: "Als die Zinsen kaum noch gesenkt werden konnten, sollten Anleihekäufe zusätzlich Kredite verbilligen und die Inflation anheben."
        } }
      ]
    },
    {
      id: "a3",
      titel: "Wie die Zinsentscheidung ankommt: Wirkungsketten",
      inhalt: [
        { typ: "text", text: "Wie wird aus einer Zinsentscheidung der EZB eine andere Inflationsrate? Der Weg heißt **Transmission**. Eine vereinfachte Kette bei einer Zinserhöhung (**restriktive Geldpolitik**):" },
        { typ: "svg", titel: "Abb. 2: Wirkungskette einer Zinserhöhung (vereinfachtes Modell)",
          alt: "Kette: EZB erhöht den Leitzins. Banken zahlen mehr für Zentralbankgeld. Kredite werden teurer, Sparen lohnt sich mehr. Konsum und Investitionen sinken. Die Nachfrage sinkt. Der Preisdruck lässt nach, die Inflation sinkt.",
          svg: `<svg viewBox="0 0 700 330" role="img" aria-label="Wirkungskette einer Leitzinserhöhung bis zur sinkenden Inflation">
  <defs><marker id="pf5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="pf"/></marker></defs>
  <rect x="200" y="8" width="300" height="38" rx="8" class="bx-c"/><text x="350" y="33" class="t-c t-b">EZB erhöht den Leitzins</text>
  <path d="M350 46 L350 66" class="arr" style="marker-end:url(#pf5)"/>
  <rect x="150" y="68" width="400" height="38" rx="8" class="bx-a"/><text x="350" y="93" class="t-c">Zentralbankgeld wird für Banken teurer</text>
  <path d="M350 106 L350 126" class="arr" style="marker-end:url(#pf5)"/>
  <rect x="100" y="128" width="500" height="38" rx="8" class="bx-a"/><text x="350" y="153" class="t-c">Kredite werden teurer, Sparen lohnt sich mehr</text>
  <path d="M350 166 L350 186" class="arr" style="marker-end:url(#pf5)"/>
  <rect x="100" y="188" width="500" height="38" rx="8" class="bx-a"/><text x="350" y="213" class="t-c">Haushalte und Unternehmen konsumieren und investieren weniger</text>
  <path d="M350 226 L350 246" class="arr" style="marker-end:url(#pf5)"/>
  <rect x="150" y="248" width="400" height="38" rx="8" class="bx-b"/><text x="350" y="273" class="t-c">Gesamtnachfrage sinkt, Preisdruck lässt nach</text>
  <text x="350" y="312" class="t-s t-c">Wirkung auf die Inflation erst nach Monaten bis Jahren</text>
</svg>` },
        { typ: "text", text: "Bei einer Zinssenkung (**expansive Geldpolitik**) läuft die Kette umgekehrt: Kredite werden günstiger, Konsum und Investitionen steigen, die Nachfrage nimmt zu und die Inflation steigt. Weitere Wege neben dem Zinskanal: **Kreditkanal** (Banken vergeben mehr oder weniger Kredite), **Vermögenspreiskanal** (Aktien- und Immobilienpreise reagieren), **Wechselkurskanal** (der Euro wird stärker oder schwächer) und **Erwartungskanal** (Haushalte und Unternehmen stellen sich auf neue Zinsen und Preise ein)." },
        { typ: "hinweis", text: "**Wirkungsverzögerung:** Zinsänderungen schlagen erst nach Monaten oder sogar Jahren voll auf die Wirtschaft durch. Die EZB muss deshalb vorausschauend entscheiden – und kann sich irren." },
        { typ: "sim", titel: "Du bist im EZB-Rat",
          intro: "Entscheide in drei Situationen, wie du den Leitzins anpassen würdest. Du bekommst jeweils die vereinfachte Wirkungskette.",
          szenarien: [
            { titel: "Situation 1: Boom und hohe Inflation", text: "Die Wirtschaft wächst stark, die Nachfrage ist hoch, die Inflation liegt bei 5 %. Banken vergeben bereitwillig Kredite.",
              optionen: [
                { label: "Leitzins erhöhen", urteil: "gut", kette: ["Kredite und Finanzierung werden teurer.", "Haushalte und Unternehmen halten sich bei Konsum und Investitionen zurück.", "Die Nachfrage lässt nach, der Preisdruck sinkt.", "Die Inflation sinkt mittelfristig Richtung 2 %."], kommentar: "Passt zum Mandat: Hohe Inflation wird mit einer Zinserhöhung bekämpft. Die Wirkung kommt verzögert." },
                { label: "Leitzins halten", urteil: "mittel", kette: ["Die Finanzierungsbedingungen bleiben günstig.", "Die Nachfrage bleibt hoch.", "Der Preisdruck hält an."], kommentar: "Abwarten ist riskant: Bleibt die Inflation lange hoch, können sich Preiserwartungen verfestigen." },
                { label: "Leitzins senken", urteil: "schlecht", kette: ["Kredite werden noch günstiger.", "Konsum und Investitionen steigen weiter.", "Die Nachfrage heizt sich weiter auf, die Inflation steigt noch mehr."], kommentar: "Das würde die Inflation weiter anheizen – gegen das Ziel der Preisstabilität." }
              ] },
            { titel: "Situation 2: Flaute und sehr niedrige Inflation", text: "Die Wirtschaft stagniert, die Arbeitslosigkeit steigt, die Inflation liegt bei 0,3 % – es droht Deflation.",
              optionen: [
                { label: "Leitzins erhöhen", urteil: "schlecht", kette: ["Kredite werden teurer.", "Die Nachfrage sinkt noch weiter.", "Das Preisniveau gerät noch stärker unter Druck – Deflationsgefahr steigt."], kommentar: "Das würde die Lage verschärfen." },
                { label: "Leitzins halten", urteil: "mittel", kette: ["Die Finanzierungsbedingungen ändern sich nicht.", "Die Nachfrage bleibt schwach.", "Die Inflation bleibt zu niedrig."], kommentar: "Reicht nicht, wenn die Inflation dauerhaft zu niedrig ist." },
                { label: "Leitzins senken", urteil: "gut", kette: ["Kredite werden günstiger.", "Konsum und Investitionen nehmen zu.", "Die Nachfrage steigt, der Preisdruck wächst.", "Die Inflation nähert sich 2 %."], kommentar: "Passt: Eine expansive Politik soll Deflation verhindern. Wenn der Spielraum erschöpft ist (Zins bei null), braucht es unkonventionelle Maßnahmen." }
              ] },
            { titel: "Situation 3: Hohe Inflation durch Energiepreise bei schwacher Konjunktur", text: "Die Inflation liegt bei 3,8 %, vor allem wegen teurer Energie. Die Wirtschaft wächst kaum. (Ähnlich wie im Herbst 2026.)",
              optionen: [
                { label: "Leitzins erhöhen", urteil: "mittel", kette: ["Kredite werden teurer, die Nachfrage sinkt.", "Zweitrundeneffekte (höhere Löhne und Preise) werden gedämpft.", "Aber: Die ohnehin schwache Wirtschaft wird zusätzlich gebremst, Arbeitsplätze sind gefährdet."], kommentar: "Ein echter Zielkonflikt: Preisstabilität ist vorrangig, aber die Energiepreise selbst lassen sich nicht wegzinsen." },
                { label: "Leitzins halten", urteil: "mittel", kette: ["Die Konjunktur wird nicht zusätzlich belastet.", "Das Risiko steigt, dass sich hohe Inflation in Löhnen und Preisen festsetzt."], kommentar: "Ebenfalls vertretbar, aber riskant. Zeigt: Es gibt keine einfache richtige Antwort." },
                { label: "Leitzins senken", urteil: "schlecht", kette: ["Kredite werden günstiger, die Nachfrage steigt.", "Die Inflation steigt weiter, das Vertrauen in die Preisstabilität leidet."], kommentar: "Bei hoher Inflation widerspricht eine Zinssenkung dem vorrangigen Ziel." }
              ] }
          ] },
        { typ: "check", frage: {
            id: "m5-c3", typ: "single",
            frage: "Die EZB erhöht den Leitzins. Was erwartest du kurzfristig?",
            optionen: ["Kredite werden tendenziell teurer", "Kredite werden tendenziell günstiger", "Die Inflation sinkt sofort", "Die Geldmenge steigt sofort"],
            richtig: 0,
            erklaerung: "Höhere Leitzinsen verteuern die Refinanzierung der Banken; das wird teilweise an Kreditnehmer weitergegeben. Auf die Inflation wirkt es erst mit Verzögerung."
        } }
      ]
    }
  ],

  fazit: "Die EZB steuert vor allem über die Leitzinsen: Einlagesatz (Untergrenze), Hauptrefinanzierungssatz und Spitzenrefinanzierungssatz (Obergrenze) bilden den Zinskorridor. Dazu kommen Offenmarktgeschäfte und die Mindestreserve. Als die Zinsen kaum noch sinken konnten, nutzte sie unkonventionelle Instrumente wie die Anleihekaufprogramme APP und PEPP, langfristige Kredite an Banken, Forward Guidance und das TPI. Zinsänderungen wirken über mehrere Kanäle und mit Verzögerung auf Kredite, Nachfrage und Preise. Ob und wie weit diese Politik angemessen ist, beurteilst du in Modul 6.",

  quellen: [
    { titel: "EZB: Key ECB interest rates (Leitzinsen, Stand Oktober 2026)", url: "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/key_ecb_interest_rates/html/index.en.html" },
    { titel: "EZB: Minimum reserves (Mindestreserven)", url: "https://www.ecb.europa.eu/mopo/implement/mr/html/index.en.html" },
    { titel: "EZB: Eurosystem balance sheet – Jahresabschlusskommentar 2025", url: "https://www.ecb.europa.eu/press/annual-reports-financial-statements/annual/balance/html/ecb.eurosystembalancesheet202606_commentary~9518cf1369.en.html" }, // PRÜFEN: Bilanzsumme ca. 6.281,8 Mrd. € Ende 2025; Aussagen zum Ende der Wiederanlage (APP Mitte 2023, PEPP Ende 2024) gegen EZB-Seiten abgleichen
    { titel: "EZB: Geldpolitische Instrumente", url: "https://www.ecb.europa.eu/mopo/implement/html/index.de.html" }
  ],

  pool: [
    { id: "m5-01", typ: "zuordnung", afb: 1, thema: "a1",
      frage: "Ordne die Leitzinsen ihrer Funktion zu.",
      paare: [["Einlagesatz", "Zins für Geld, das Banken über Nacht bei der Zentralbank anlegen (Untergrenze)"], ["Hauptrefinanzierungssatz", "Zins für die regelmäßigen Offenmarktkredite an Banken"], ["Spitzenrefinanzierungssatz", "Zins für Übernachtkredite an Banken (Obergrenze)"]],
      erklaerung: "Einlagesatz = Untergrenze, Spitzenrefinanzierungssatz = Obergrenze des Zinskorridors." },
    { id: "m5-02", typ: "single", afb: 1, thema: "a1",
      frage: "Wie hoch ist der Einlagesatz der EZB (Stand: Oktober 2026, gültig seit 16. September 2026)?",
      optionen: ["2,50 %", "0,00 %", "4,00 %", "1,00 %"],
      richtig: 0,
      erklaerung: "Einlagesatz 2,50 %, Hauptrefinanzierungssatz 2,65 %, Spitzenrefinanzierungssatz 2,90 %." },
    { id: "m5-03", typ: "single", afb: 2, thema: "a1",
      frage: "Warum liegen die kurzfristigen Geldmarktzinsen meist im Zinskorridor?",
      optionen: ["Weil keine Bank mehr als den Spitzenrefinanzierungssatz zahlt und keine weniger als den Einlagesatz bekommt", "Weil der Staat sie festlegt", "Weil die Inflation es vorgibt", "Weil Banken ihre Zinsen nicht verändern dürfen"],
      richtig: 0,
      erklaerung: "Die Ober- und Untergrenze bieten Banken Alternativen bei der Zentralbank." },
    { id: "m5-04", typ: "single", afb: 3, thema: "a1",
      frage: "Die EZB hebt alle drei Leitzinsen um 0,25 Prozentpunkte an. Welche Aussage ist die beste Einordnung?",
      optionen: ["Der gesamte Zinskorridor verschiebt sich nach oben; Refinanzierung wird für Banken teurer, was Kredite verteuern kann", "Nur Sparer sind betroffen", "Die Inflation sinkt sofort auf 2 %", "Nichts ändert sich, weil Leitzinsen keinen Einfluss haben"],
      richtig: 0,
      erklaerung: "Die Leitzinsen beeinflussen Refinanzierungskosten und darüber Kredit- und Sparzinsen." },

    { id: "m5-05", typ: "multiple", afb: 1, thema: "a2",
      frage: "Was gehört zu den unkonventionellen geldpolitischen Maßnahmen?",
      optionen: ["Anleihekaufprogramme (APP, PEPP)", "Forward Guidance", "Erhöhung der Mehrwertsteuer", "Langfristige Refinanzierungsgeschäfte"],
      richtig: [0, 1, 3],
      erklaerung: "Steuern sind Sache des Staates. Die anderen Maßnahmen sind unkonventionell." },
    { id: "m5-06", typ: "single", afb: 2, thema: "a2",
      frage: "Wozu dienten die Anleihekaufprogramme der EZB vor allem?",
      optionen: ["Zinsen am Kapitalmarkt zu senken, Kredite zu verbilligen und die Inflation anzuheben", "Die Inflation zu senken", "Staaten Kredite zu geben", "Die Bankenaufsicht zu verbessern"],
      richtig: 0,
      erklaerung: "QE sollte bei Leitzinsen nahe null die Finanzierungsbedingungen weiter lockern." },
    { id: "m5-07", typ: "single", afb: 3, thema: "a2",
      frage: "Kritiker sagen, Anleihekäufe könnten Staatsfinanzierung sein. Welches Argument spricht dagegen, dass dies verbotene monetäre Staatsfinanzierung ist?",
      optionen: ["Die EZB kauft nicht direkt vom Staat, sondern am Markt, und verfolgt geldpolitische Ziele", "Die EZB darf alles", "Staaten zahlen keine Zinsen", "Die Käufe sind geheim"],
      richtig: 0,
      erklaerung: "Verboten ist der unmittelbare Erwerb. Die EZB argumentiert, Käufe am Sekundärmarkt dienten der Geldpolitik; das bleibt umstritten." },

    { id: "m5-08", typ: "reihenfolge", afb: 2, thema: "a3",
      frage: "Bringe die Wirkungskette einer Zinserhöhung in die richtige Reihenfolge.",
      schritte: ["EZB erhöht den Leitzins", "Kredite werden für Haushalte und Unternehmen teurer", "Konsum und Investitionen gehen zurück", "Die Gesamtnachfrage sinkt", "Der Preisdruck lässt nach, die Inflation sinkt"],
      erklaerung: "Zins → Kreditkosten → Konsum/Investition → Nachfrage → Preise." },
    { id: "m5-09", typ: "single", afb: 1, thema: "a3",
      frage: "Welche Aussage zur Wirkung von Zinsänderungen stimmt?",
      optionen: ["Die Wirkung tritt verzögert ein, oft erst nach Monaten bis Jahren", "Sie wirkt am selben Tag auf die Inflation", "Sie wirkt nur auf Banken", "Sie wirkt nie"],
      richtig: 0,
      erklaerung: "Wirkungsverzögerungen machen Geldpolitik schwierig." },
    { id: "m5-10", typ: "single", afb: 3, thema: "a3",
      frage: "Die Inflation ist hoch, weil Energie teurer geworden ist, die Wirtschaft aber schwach. Welche Aussage beschreibt das Dilemma der EZB am besten?",
      optionen: ["Eine Zinserhöhung dämpft Zweitrundeneffekte, belastet aber die schwache Konjunktur; ein Verzicht lässt die Inflation hoch", "Es gibt keinen Zielkonflikt", "Zinsen lösen jedes Problem sofort", "Die EZB ist für Energiepreise zuständig"],
      richtig: 0,
      erklaerung: "Zielkonflikt zwischen Preisstabilität und Konjunktur – ohne einfache Lösung." }
  ]
};
