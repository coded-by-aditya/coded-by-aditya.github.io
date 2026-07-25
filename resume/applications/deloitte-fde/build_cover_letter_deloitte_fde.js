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

      para([t("29 June 2026")], { before: 0, after: 220 }),

      para([t("Re: Forward Deployed Engineer (Req 41226), Deloitte Technology & Transformation", { bold: true })], { before: 0, after: 220 }),

      para([t("Dear Hiring Team,")]),

      para([t("I'm applying for the Forward Deployed Engineer role (Req 41226) in Melbourne. It caught my eye because most of my work so far has looked a lot like the job you're describing: building real software while sitting close to the people who actually use it, and increasingly doing that with AI tools in the loop.")]),

      para([t("I spent three and a half years at Darwinbox as an integration engineer, working directly with enterprise clients in banking, automotive, and retail. I built REST API and ETL integrations, set up payroll data pipelines across four countries, and ran end-to-end delivery for more than 130 clients. Along the way I cut integration downtime by about 20%, kept integration accuracy at 95%, and got a typical delivery down from 90 days to 45. A lot of that job was sitting between the engineers I was building with and the business owners paying for the result, and I ended up running enablement workshops that pushed platform adoption up 75%. I liked that part of the work more than I expected to.")]),

      para([t("Right now I'm contracting at CFive AI, a small AI telephony startup, and the pace there is closer to what you describe: work out what's broken, build something that works, get it live. I'm now leading the move of their platform onto AWS, after spending my first months there fixing production issues across Twilio and VAPI integrations and tuning the prompts behind the AI voice receptionist itself. I use tools like Claude Code daily, mainly because they help me get through real problems faster.")]),

      para([t("My own projects run on the same stack your team does. ShieldWalk is built on a Terraform setup that spins up 15 Lambda functions from a single configuration block, with a CI/CD pipeline that uses OIDC and short-lived environments for each developer. BirdTag is a fully serverless AWS app with a REST API over DynamoDB, S3 pre-signed URLs, and Cognito for authentication.")]),

      para([t("One practical note: I'm currently applying for my 485 post-study visa, which gives three years of full working rights with no sponsorship required. I'm also happy to travel to client sites.")]),

      para([t("I'd be glad to talk further about where I'd be useful on the team. Thanks for your time.")]),

      para([t("Sincerely,")], { before: 0, after: 40 }),
      para([t("Aditya Mehrotra")], { before: 0, after: 0 }),
    ]
  }]
});

const outPath = path.join(__dirname, "cover_letter_deloitte_fde.docx");
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outPath, buffer);
  console.log("Done: " + outPath);
}).catch(console.error);
