/* MODUL 6 – Kritik und Ausblick (Datenformat: siehe modul1.js) */
window.KURS_MODULE = window.KURS_MODULE || {};
window.KURS_MODULE[6] = {
  id: 6,
  titel: "Kritik und Ausblick: Urteile begründen",
  kurz: "Eine Geldpolitik für 21 Länder, Anleihekäufe, das PSPP-Urteil – und deine eigene Beurteilung",
  minuten: 10,
  quizFragen: 6,

  lernziele: [
    "Ich kann erklären, warum eine einheitliche Geldpolitik für 21 unterschiedliche Länder ein Problem sein kann.",
    "Ich kann Pro- und Contra-Argumente zu den Anleihekäufen der EZB nennen.",
    "Ich kann das PSPP-Urteil des Bundesverfassungsgerichts einordnen und eine begründete Beurteilung formulieren."
  ],

  abschnitte: [
    {
      id: "a1",
      titel: "Eine Geldpolitik für 21 Länder",
      inhalt: [
        { typ: "text", text: "Im Euroraum gibt es **einen** Leitzins für **21** Volkswirtschaften. Doch die Länder sind verschieden: In einem Land läuft die Wirtschaft heiß, im anderen schwächelt sie; die Inflation und die Staatsverschuldung unterscheiden sich. Dieses Problem heißt **„One size fits all“**." },
        { typ: "beispiel", titel: "Zwei Länder, ein Zins", text: "Land A hat hohe Inflation und eine boomende Wirtschaft – es bräuchte höhere Zinsen. Land B hat schwache Konjunktur und hohe Arbeitslosigkeit – es bräuchte niedrigere Zinsen. Die EZB entscheidet aber für den **Durchschnitt** des Euroraums. Für beide ist der Zins nicht ideal." },
        { typ: "merke", begriff: "„One size fits all“-Problem", text: "Ein einheitlicher Leitzins passt nicht zu den unterschiedlichen Konjunktur- und Inflationslagen aller Mitgliedstaaten." },
        { typ: "text", text: "Hinzu kommt: Die Geldpolitik ist gemeinsam, die **Fiskalpolitik** (Steuern, Staatsausgaben) bleibt national. Das macht den Euroraum anfällig. In der Staatsschuldenkrise 2012 sagte EZB-Präsident Draghi, die EZB werde im Rahmen ihres Mandats „whatever it takes“ tun, um den Euro zu erhalten. Die Zinsen für Krisenländer sanken, ohne dass die EZB Anleihen kaufen musste." },
        { typ: "hinweis", text: "Als Lösung diskutiert wird u. a. eine stärkere gemeinsame Fiskalpolitik („Fiskalunion“). Darüber sind sich die Euro-Länder nicht einig." },
        { typ: "check", frage: {
            id: "m6-c1", typ: "single",
            frage: "Worin besteht das „One size fits all“-Problem?",
            optionen: ["Ein einheitlicher Leitzins passt nicht zu den unterschiedlichen Lagen aller Euro-Länder", "Alle Euro-Länder haben dieselbe Inflation", "Die EZB entscheidet für jedes Land separat", "Banken dürfen nur einen Zins verlangen"],
            richtig: 0,
            erklaerung: "Der Leitzins gilt für den gesamten Euroraum, obwohl die Länder sehr unterschiedlich dastehen."
        } }
      ]
    },
    {
      id: "a2",
      titel: "Anleihekäufe: Pro und Contra",
      inhalt: [
        { typ: "text", text: "Wie in Modul 5 gesehen, hat die EZB seit 2015 in großem Umfang Anleihen gekauft. Das ist eine der am heftigsten diskutierten Entscheidungen. Hier die wichtigsten Argumente:" },
        { typ: "tabelle", titel: "Anleihekaufprogramme der EZB", kopf: ["Pro", "Contra"], zeilen: [
            ["Verhindern Deflation: Die Inflation lag lange unter dem Ziel.", "Verdeckte Staatsfinanzierung: Staaten finanzieren sich billig und haben weniger Druck zum Sparen."],
            ["Stabilisieren den Euro und verhindern, dass Länder in der Krise aus dem Markt gedrängt werden.", "Niedrige Zinsen halten wenig produktive („Zombie“-)Unternehmen am Leben."],
            ["Senken Kreditzinsen und stützen Konjunktur und Beschäftigung.", "Vermögenspreise (Aktien, Immobilien) steigen – Verteilungswirkung zugunsten von Vermögenden."],
            ["Geldpolitik blieb handlungsfähig, als die Zinsen schon bei null lagen.", "Der Ausstieg ist schwierig; Abhängigkeit der Märkte von der EZB."]
        ] },
        { typ: "text", text: "**Verteilungswirkungen:** Niedrige Zinsen helfen Schuldnern (z. B. Hauskäufern, Staaten), belasten aber Sparer mit klassischen Sparanlagen. Steigende Vermögenspreise nützen denen, die Immobilien oder Aktien besitzen." },
        { typ: "check", frage: {
            id: "m6-c2", typ: "multiple",
            frage: "Welche Aussagen sind Kritikpunkte an den Anleihekäufen?",
            optionen: ["Sie könnten Staaten zu billig finanzieren und den Reformdruck senken", "Sie können Preise von Vermögenswerten antreiben", "Sie senken die Inflation sofort auf 0 %", "Sie können „Zombie“-Unternehmen am Leben halten"],
            richtig: [0, 1, 3],
            erklaerung: "Die Kritik betrifft Staatsfinanzierung, Vermögenspreise und Fehlallokation. Ziel der Käufe war es, die Inflation anzuheben, nicht zu senken."
        } }
      ]
    },
    {
      id: "a3",
      titel: "Das PSPP-Urteil und deine Beurteilung",
      inhalt: [
        { typ: "text", text: "Die Anleihekäufe der EZB (PSPP, Teil des APP) beschäftigten auch Gerichte. Das ist ein Lehrstück über die **Grenze zwischen Geld- und Fiskalpolitik**:" },
        { typ: "liste", items: [
            "**11.12.2018 – Europäischer Gerichtshof (EuGH):** Das PSPP verstößt nicht gegen EU-Recht und überschreitet das Mandat der EZB nicht; es falle in den Bereich der Geldpolitik.",
            "**5.5.2020 – Bundesverfassungsgericht (BVerfG):** Das Gericht beanstandet, dass die Verhältnismäßigkeit des Programms von der EZB nicht ausreichend geprüft wurde. Der EuGH habe seine Kompetenzen überschritten, indem er dies nicht beanstandete. Der Bundesbank wurde zunächst untersagt, weiter teilzunehmen, wenn die EZB keine Verhältnismäßigkeitsprüfung nachreicht. Bundesregierung und Bundestag müssten darauf hinwirken.",
            "**Folge:** Die EZB lieferte Unterlagen zur Abwägung; der Bundestag sah die Anforderungen später als erfüllt an. Die Bundesbank konnte weiter an den Käufen teilnehmen." // PRÜFEN: Ablauf nach dem Urteil (Dokumente des EZB-Rats, Bundestagsbeschluss 2020) gegen BVerfG/Bundesbank-Quellen abgleichen
        ] },
        { typ: "merke", begriff: "Verhältnismäßigkeit (im Kontext der Geldpolitik)", text: "Eine Maßnahme muss geeignet und erforderlich sein und ihre Nebenwirkungen (z. B. auf Sparer, Staaten, Banken) dürfen nicht außer Verhältnis zum geldpolitischen Ziel stehen. Das BVerfG verlangte, dass die EZB dies nachvollziehbar abwägt." },
        { typ: "hinweis", text: "Das Urteil ist ein Beispiel dafür, dass eine unabhängige EZB nicht „über dem Recht“ steht: Sie bewegt sich in einem rechtlichen Rahmen und muss ihre Entscheidungen begründen. Gleichzeitig zeigt es Spannungen zwischen nationalem Verfassungsrecht und EU-Recht." },
        { typ: "aufgabe", titel: "Urteilsaufgabe",
          text: "Die EZB hat von 2015 bis 2022 massiv Staatsanleihen gekauft. **Beurteile**, ob diese Politik insgesamt gerechtfertigt war. Wäge Pro und Contra ab und komme zu einem begründeten Urteil.",
          loesung: "**Pro:** Die Inflation lag lange unter dem Ziel; die Zinsen waren schon bei null, daher waren Anleihekäufe ein Mittel, um Deflation zu verhindern, Kredite zu verbilligen und die Konjunktur zu stützen. In der Euro-Krise stabilisierten sie die Märkte.\n**Contra:** Risiko verdeckter Staatsfinanzierung (Art. 123 AEUV), geringerer Reformdruck, Stützung von „Zombie“-Unternehmen, steigende Vermögenspreise, Belastung der Sparer; schwerer Ausstieg.\n**Urteil (Beispiel):** Als Notfallmaßnahme war das Programm in der Krise und bei Deflationsgefahr gut begründbar, weil Preisstabilität das vorrangige Mandat ist. Je länger das Programm lief und je weniger die Deflationsgefahr bestand, desto stärker wogen die Nebenwirkungen. Daher war es zu Beginn eher gerechtfertigt, später kritischer zu sehen; wichtig sind klare Begrenzung, Begründung (Verhältnismäßigkeit) und ein glaubwürdiger Ausstieg.\n*Hinweis: Auch ein anderes Urteil ist möglich, wenn es begründet ist und die Argumente abwägt.*" },
        { typ: "check", frage: {
            id: "m6-c3", typ: "single",
            frage: "Was beanstandete das Bundesverfassungsgericht im Urteil vom 5. Mai 2020 vor allem?",
            optionen: ["Die EZB habe die Verhältnismäßigkeit der Anleihekäufe nicht ausreichend geprüft", "Die EZB dürfe nie Anleihen kaufen", "Der Euro sei verfassungswidrig", "Die Bundesbank müsse sofort alle Anleihen verkaufen"],
            richtig: 0,
            erklaerung: "Das BVerfG sah die Verhältnismäßigkeitsprüfung als unzureichend an und forderte Nachbesserung."
        } }
      ]
    }
  ],

  fazit: "Ein Leitzins für 21 Länder passt nie für alle gleich – das „One size fits all“-Problem. Die Anleihekäufe der EZB werden kontrovers beurteilt: Sie verhinderten Deflation und stabilisierten den Euro, bergen aber Risiken (verdeckte Staatsfinanzierung, Vermögenspreise, Verteilungswirkungen). Das PSPP-Urteil des Bundesverfassungsgerichts (5.5.2020) zeigt, dass auch eine unabhängige EZB ihre Entscheidungen auf Verhältnismäßigkeit prüfen und begründen muss. Gute Urteile in der Geldpolitik wägen Ziele, Nebenwirkungen und Betroffene ab. Das ist deine Aufgabe auch beim Besuch bei der Bundesbank.",

  quellen: [
    { titel: "Bundesverfassungsgericht: Pressemitteilung Nr. 32/2020 vom 5. Mai 2020 zum PSPP-Urteil", url: "https://www.bundesverfassungsgericht.de/SharedDocs/Pressemitteilungen/DE/2020/bvg20-032.html" },
    { titel: "Gerichtshof der Europäischen Union: Pressemitteilung Nr. 192/18 vom 11. Dezember 2018 (Weiss u. a.)", url: "https://curia.europa.eu/jcms/upload/docs/application/pdf/2018-12/cp180192de.pdf" },
    { titel: "AEUV Art. 123 – Verbot monetärer Staatsfinanzierung (EUR-Lex)", url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:12016E123" }
  ],

  pool: [
    { id: "m6-01", typ: "single", afb: 1, thema: "a1",
      frage: "Wofür steht „One size fits all“ in der Geldpolitik?",
      optionen: ["Ein Leitzins gilt für alle Euro-Länder, obwohl ihre Lage unterschiedlich ist", "Jedes Land hat einen eigenen Leitzins", "Es gibt nur eine Bank im Euroraum", "Der Euro hat nur eine Banknote"],
      richtig: 0,
      erklaerung: "Der Leitzins ist für den gesamten Euroraum einheitlich." },
    { id: "m6-02", typ: "single", afb: 2, thema: "a1",
      frage: "Land A hat eine boomende Wirtschaft und hohe Inflation, Land B eine Rezession. Die EZB senkt die Zinsen. Was ist wahrscheinlich?",
      optionen: ["Für Land B passt die Senkung, für Land A heizt sie die Wirtschaft zusätzlich an", "Beide Länder profitieren gleich", "Für Land A passt die Senkung, Land B verliert", "Es ändert sich nichts"],
      richtig: 0,
      erklaerung: "Das ist das One-size-fits-all-Problem: der Durchschnitt passt nicht auf alle." },
    { id: "m6-03", typ: "single", afb: 3, thema: "a1",
      frage: "Welcher Vorschlag könnte das „One size fits all“-Problem abmildern?",
      optionen: ["Stärkere Abstimmung oder Zusammenarbeit der nationalen Wirtschafts- und Fiskalpolitik", "Jede Bank legt ihren Leitzins selbst fest", "Abschaffung der Inflation", "Abschaffung der Banken"],
      richtig: 0,
      erklaerung: "Eine gemeinsame oder besser abgestimmte Fiskalpolitik kann Unterschiede ausgleichen, ist aber politisch umstritten." },

    { id: "m6-04", typ: "zuordnung", afb: 1, thema: "a2",
      frage: "Ordne die Argumente zu.",
      paare: [["Pro Anleihekäufe", "Sie verhindern Deflation und senken Kreditzinsen."], ["Contra Anleihekäufe", "Sie können Staaten zu billig finanzieren und Vermögenspreise treiben."]],
      erklaerung: "Pro: Deflationsgefahr, Konjunktur; Contra: Staatsfinanzierung, Vermögenspreise." },
    { id: "m6-05", typ: "multiple", afb: 2, thema: "a2",
      frage: "Wer profitiert eher von niedrigen Zinsen und hohen Vermögenspreisen?",
      optionen: ["Kreditnehmer", "Besitzer von Immobilien und Aktien", "Sparer mit klassischen Sparkonten", "Menschen ohne Vermögen"],
      richtig: [0, 1],
      erklaerung: "Schuldner und Vermögensbesitzer profitieren eher; Sparer und Menschen ohne Vermögen eher nicht." },
    { id: "m6-06", typ: "single", afb: 3, thema: "a2",
      frage: "Welche Aussage ist ein ausgewogenes Urteil zu Anleihekäufen?",
      optionen: ["Sie waren in Krisen und bei Deflationsgefahr gut begründbar, bergen aber Risiken, die mit der Dauer zunehmen", "Sie sind immer gut", "Sie sind immer schlecht", "Man kann sie gar nicht beurteilen"],
      richtig: 0,
      erklaerung: "Ein gutes Urteil wägt Nutzen und Nebenwirkungen ab und berücksichtigt Zeit und Umstände." },

    { id: "m6-07", typ: "single", afb: 1, thema: "a3",
      frage: "Wann entschied das Bundesverfassungsgericht zum PSPP-Anleihekaufprogramm der EZB?",
      optionen: ["5. Mai 2020", "11. Dezember 2018", "1. Januar 2002", "12. Juli 2012"],
      richtig: 0,
      erklaerung: "Das Urteil des BVerfG erging am 5. Mai 2020; der EuGH hatte am 11. Dezember 2018 entschieden." },
    { id: "m6-08", typ: "single", afb: 2, thema: "a3",
      frage: "Was beanstandete das BVerfG am PSPP?",
      optionen: ["Die Verhältnismäßigkeit wurde nicht ausreichend geprüft", "Das Programm war zu klein", "Die EZB hatte keine Befugnis zur Geldpolitik", "Die Anleihen waren zu teuer"],
      richtig: 0,
      erklaerung: "Das Gericht verlangte eine nachvollziehbare Abwägung von Nutzen und Nebenwirkungen." },
    { id: "m6-09", typ: "single", afb: 3, thema: "a3",
      frage: "Welche Schlussfolgerung zieht man aus dem PSPP-Urteil für die Unabhängigkeit der EZB?",
      optionen: ["Unabhängigkeit heißt nicht rechtsfrei: Die EZB muss ihre Entscheidungen begründen und innerhalb ihres Mandats bleiben", "Die EZB muss sich dem Parlament unterordnen", "Die EZB muss ihr Mandat aufgeben", "Die EZB darf nie wieder Anleihen kaufen"],
      richtig: 0,
      erklaerung: "Unabhängigkeit wird durch Mandat, Recht und Rechenschaftspflicht begrenzt." }
  ]
};
