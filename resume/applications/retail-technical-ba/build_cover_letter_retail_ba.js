const {
  Document, Packer, Paragraph, TextRun, AlignmentType, ExternalHyperlink
} = require("/Users/aditya/.nvm/versions/node/v24.14.0/lib/node_modules/docx");
const fs = require("fs");
const path = require("path");

const FONT = "Calibri";
const NAME_SIZE = 28;
const BODY_SIZE = 21;
const SMALL_SIZE = 19;
const LINK_COLOR = "0563C1";

function para(runs, spacing, alignment) {
  return new Paragraph({
    alignment: alignment || AlignmentType.LEFT,
    spacing: spacing || { before: 0, after: 160 },
    children: runs
  });
}
function t(text, opts) { return new TextRun(Object.assign({ text, font: FONT, size: BODY_SIZE }, opts || {})); }
function link(url, label) {
  return new ExternalHyperlink({
    link: url,
    children: [new TextRun({ text: label, font: FONT, size: SMALL_SIZE, color: LINK_COLOR, underline: {} })]
  });
}

const doc = new Document({
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: [
      para([t("Aditya Mehrotra", { size: NAME_SIZE, bold: true })], { before: 0, after: 40 }),
      para([
        t("Melbourne, Australia  |  +61 478 916 329  |  mehrotra.aditya16@outlook.com  |  ", { size: SMALL_SIZE }),
        link("https://www.linkedin.com/in/aditya-mehrotra-mit", "LinkedIn"),
        t("  |  ", { size: SMALL_SIZE }),
        link("https://github.com/coded-by-aditya", "GitHub"),
      ], { before: 0, after: 220 }),

      para([t("28 July 2026")], { before: 0, after: 220 }),

      para([t("Re: Technical Business Analyst, Data & AI (Melbourne)", { bold: true })], { before: 0, after: 220 }),

      para([t("Hi Kyla,")]),

      para([t("I'd like to put myself forward for the Technical Business Analyst role in the Data, AI & Loyalty division.")]),

      para([t("My title has been “integration engineer” rather than “business analyst”, but the work has been the same shape: sit with business stakeholders, work out what they actually need, then turn it into something a technical team can build. At Darwinbox I ran discovery with client HR, payroll and IT teams and wrote the field-level data mappings, business rules and data flows our engineers built from. That was enterprise work in banking, retail and manufacturing, and I got typical delivery down from 90 days to 45 by turning the parts we kept repeating into reusable templates.")]),

      para([t("The Power BI line in your ad is the one I'd point to first. Our Customer Success team was rebuilding client reports by hand across a book of more than 130 clients, roughly two days of work each time. I built and automated a dashboard that replaced it, and the same reporting now takes about 15 minutes. Most of that job went on sitting with the people who actually read the report and working out which numbers changed what they did on Monday morning. The dashboard itself was the easy half.")]),

      para([t("On the technical side I write SQL, and I've built ETL pipelines in Python moving payroll and HR data across Singapore, Malaysia, the Philippines and Indonesia. I'm comfortable in a room with data engineers and architects because I've been one, and I'm currently at CFive AI as a Cloud Integration Engineer leading their move onto AWS. I haven't used Snowflake or DBT before, so that's a gap I'd be closing early, though SQL and data modelling are day-to-day work for me.")]),

      para([t("One practical note: I have full working rights in Australia on a 485 post-study visa, three years, no sponsorship required. I'm Melbourne based and fine with three days in the office.")]),

      para([t("Happy to have a confidential conversation whenever suits you.")]),

      para([t("Thanks,")], { before: 0, after: 40 }),
      para([t("Aditya Mehrotra")], { before: 0, after: 0 }),
    ]
  }]
});

const outPath = path.join(__dirname, "cover_letter_retail_ba.docx");
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outPath, buffer);
  console.log("Done: " + outPath);
}).catch(console.error);
