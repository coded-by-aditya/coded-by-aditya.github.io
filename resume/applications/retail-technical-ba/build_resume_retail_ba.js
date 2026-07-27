const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  LevelFormat, TabStopType, TabStopPosition, BorderStyle, ExternalHyperlink
} = require("/Users/aditya/.nvm/versions/node/v24.14.0/lib/node_modules/docx");
const fs = require("fs");
const path = require("path");

const FONT = "Calibri";
const NAME_SIZE = 32;
const SECTION_SIZE = 22;
const BODY_SIZE = 20;
const SMALL_SIZE = 19;
const LINK_COLOR = "0563C1";

function name(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 60 },
    children: [new TextRun({ text, font: FONT, size: NAME_SIZE, bold: true })]
  });
}

function link(url, label) {
  return new ExternalHyperlink({
    link: url,
    children: [new TextRun({ text: label, font: FONT, size: SMALL_SIZE, color: LINK_COLOR, underline: {} })]
  });
}

function sectionHeader(text) {
  return new Paragraph({
    spacing: { before: 140, after: 50 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "000000", space: 2 } },
    children: [new TextRun({ text, font: FONT, size: SECTION_SIZE, bold: true })]
  });
}

function jobHeader(company, location, title, dates) {
  return [
    new Paragraph({
      spacing: { before: 100, after: 0 },
      tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
      children: [
        new TextRun({ text: company, font: FONT, size: BODY_SIZE, bold: true }),
        new TextRun({ text: `  –  ${location}`, font: FONT, size: BODY_SIZE }),
        new TextRun({ text: "\t", font: FONT, size: BODY_SIZE }),
        new TextRun({ text: dates, font: FONT, size: BODY_SIZE, italics: true }),
      ]
    }),
    new Paragraph({
      spacing: { before: 0, after: 0 },
      children: [
        new TextRun({ text: title, font: FONT, size: BODY_SIZE, italics: true }),
      ]
    })
  ];
}

function companyBlurb(text) {
  return new Paragraph({
    spacing: { before: 0, after: 0 },
    children: [new TextRun({ text, font: FONT, size: SMALL_SIZE, italics: true })]
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 30, after: 0 },
    children: [new TextRun({ text, font: FONT, size: BODY_SIZE })]
  });
}

function projectHeader(title, tech) {
  return new Paragraph({
    spacing: { before: 100, after: 0 },
    children: [
      new TextRun({ text: title, font: FONT, size: BODY_SIZE, bold: true }),
      new TextRun({ text: `  |  ${tech}`, font: FONT, size: SMALL_SIZE, italics: true }),
    ]
  });
}

function plain(text, spacing) {
  return new Paragraph({
    spacing: spacing || { before: 50, after: 0 },
    children: [new TextRun({ text, font: FONT, size: BODY_SIZE })]
  });
}

function educationEntry(school, location, degree, year) {
  return [
    new Paragraph({
      spacing: { before: 80, after: 0 },
      tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
      children: [
        new TextRun({ text: school, font: FONT, size: BODY_SIZE, bold: true }),
        new TextRun({ text: `  –  ${location}`, font: FONT, size: BODY_SIZE }),
        new TextRun({ text: "\t", font: FONT, size: BODY_SIZE }),
        new TextRun({ text: year, font: FONT, size: BODY_SIZE, italics: true }),
      ]
    }),
    new Paragraph({
      spacing: { before: 0, after: 0 },
      children: [new TextRun({ text: degree, font: FONT, size: BODY_SIZE, italics: true })]
    })
  ];
}

const doc = new Document({
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0,
        format: LevelFormat.BULLET,
        text: "•",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 360, hanging: 180 } } }
      }]
    }]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
      }
    },
    children: [
      name("ADITYA MEHROTRA"),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 0 },
        children: [
          new TextRun({ text: "Melbourne, Australia  |  +61 478 916 329  |  mehrotra.aditya16@outlook.com  |  ", font: FONT, size: SMALL_SIZE }),
          link("https://www.linkedin.com/in/aditya-mehrotra-mit", "LinkedIn"),
          new TextRun({ text: "  |  ", font: FONT, size: SMALL_SIZE }),
          link("https://github.com/coded-by-aditya", "GitHub"),
        ]
      }),

      sectionHeader("PROFESSIONAL SUMMARY"),
      plain(
        "Integration and data engineer with 3+ years working between business stakeholders and technical delivery teams. Led requirements discovery, data mapping and end-to-end delivery for enterprise clients across banking, retail and manufacturing. Practical SQL, ETL and Power BI, backed by hands-on engineering across AWS and API integration. Full working rights in Australia on a 485 post-study visa, no sponsorship required.",
        { before: 50, after: 0 }
      ),

      sectionHeader("CORE SKILLS"),
      plain("Analysis & Delivery:  Requirements elicitation  |  Discovery & stakeholder workshops  |  Data mapping & business rules  |  Data flow documentation  |  Agile delivery  |  Jira / Confluence", { before: 50, after: 0 }),
      plain("Data & Reporting:  SQL  |  Power BI  |  ETL & data pipelines  |  PostgreSQL  |  DynamoDB  |  Data validation & quality checks"),
      plain("Technical:  Python  |  REST API design  |  OAuth 2.0 / SSO  |  AWS (Lambda, API Gateway, S3, IAM)  |  Terraform  |  Postman  |  Git / GitHub"),

      sectionHeader("PROFESSIONAL EXPERIENCE"),

      ...jobHeader("CFive AI", "Melbourne, Australia", "Cloud Integration Engineer", "Mar 2026 – Present"),
      companyBlurb("AI telephony startup building an intelligent voice receptionist platform for SMBs, integrating Twilio, VAPI, and CRM APIs."),
      bullet("Leading the migration of CFive's platform to AWS, scoping the target architecture and mapping how data moves between telephony, CRM, and the core application"),
      bullet("Gathered requirements from client-facing staff and turned them into call-handling workflows covering after-hours cover, missed-call capture, and escalation"),
      bullet("Diagnosed and resolved production failures across Twilio, VAPI, and CRM integrations in live client environments"),

      ...jobHeader("MOSAIC (Monash Students for AI with Communities)", "Melbourne, Australia", "Cloud Engineer (Volunteer)", "Apr 2025 – Present"),
      companyBlurb("Student-run organisation at Monash University building AI-powered tools for community impact."),
      bullet("Deployed a serverless chat API using AWS API Gateway, Lambda, and DynamoDB (TTL and GSI), provisioned via CloudFormation with scoped IAM roles"),
      bullet("Built an interactive Mapbox GL map, parsing CSV data into country-level markers with hover and click interaction"),

      ...jobHeader("Darwinbox", "Jakarta, Indonesia", "Senior Integration Engineer / Integration Engineer", "Feb 2021 – Jul 2024"),
      companyBlurb("Enterprise HR and payroll SaaS platform serving 700+ companies across Southeast Asia, with deep integrations into banking, retail, and manufacturing clients."),
      bullet("Ran discovery and requirements sessions with client HR, payroll, and IT teams, producing the field-level data mappings, business rules, and data flow documentation that engineering built from"),
      bullet("Delivered end-to-end implementations for enterprise clients, cutting typical delivery from 90 days to 45 through reusable requirement templates and automated configuration"),
      bullet("Built and automated a Power BI dashboard covering 130+ clients for the Customer Success team, replacing a manual reporting build that took two days with an automated refresh that runs in about 15 minutes"),
      bullet("Designed and delivered REST API and ETL integrations in Python and R, automating payroll and HR data pipelines across Singapore, Malaysia, the Philippines, and Indonesia"),
      bullet("Cut integration-related downtime by 20% and held 95% integration accuracy through structured testing, data validation, and systematic debugging"),
      bullet("Led technical enablement workshops for client engineering and operations teams, lifting platform adoption by 75% and reducing tier-1 support volume"),

      sectionHeader("PROJECTS"),

      projectHeader("ShieldWalk – Women’s Safety Navigation App", "Monash FIT5120  |  Vue 3  |  AWS Lambda (x15)  |  API Gateway  |  PostgreSQL RDS  |  Terraform  |  GitHub Actions"),
      bullet("Designed a self-registering Terraform IaC system provisioning 15 Lambda functions, API Gateway routes, and CloudWatch log groups from a single configuration block with fail-fast validation at plan time"),
      bullet("Built real-time off-route deviation detection with turn-by-turn push notifications and arrival detection that chains into a post-walk reflection flow"),

      projectHeader("BirdTag – Serverless Media Tagging Platform", "github.com/coded-by-aditya/birdtag-aws  |  AWS Lambda  |  API Gateway  |  DynamoDB  |  S3  |  SNS  |  Cognito"),
      bullet("Designed REST API endpoints (search, update, delete) and optimised DynamoDB access patterns for fast metadata retrieval and updates"),
      bullet("Built event-driven SNS email alerts and S3 pre-signed URL delivery, keeping Lambda functions stateless and file handling out of the API layer"),

      sectionHeader("EDUCATION"),
      ...educationEntry("Monash University", "Melbourne, Australia", "Master of Information Technology  |  WAM: 82%  |  GPA: 3.68/4", "2026"),
      ...educationEntry("Manipal Institute of Technology", "Manipal, India", "Bachelor of Technology – Information Technology", "2021"),
    ]
  }]
});

const outPath = path.join(__dirname, "resume_retail_ba.docx");
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outPath, buffer);
  console.log("Done: " + outPath);
}).catch(console.error);
