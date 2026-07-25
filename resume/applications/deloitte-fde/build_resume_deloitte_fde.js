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

function contactLine(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 0 },
    children: [new TextRun({ text, font: FONT, size: SMALL_SIZE })]
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
        "Backend and integration engineer with 3+ years building API-driven systems and working directly with enterprise clients. Uses AI tools like Claude Code and prompt engineering as a normal part of day-to-day work. Strong in Python, AWS serverless, and Terraform. Cut production downtime 20%, held 95% integration accuracy, and delivered across 130+ client environments.",
        { before: 50, after: 0 }
      ),

      sectionHeader("CORE SKILLS"),
      plain("Languages & Engineering:  Python  |  JavaScript  |  SQL  |  REST API design  |  OAuth 2.0 / SSO", { before: 50, after: 0 }),
      plain("AI & LLM Tooling:  Claude Code  |  Prompt Engineering  |  LLM integration  |  AI telephony (Twilio, VAPI)"),
      plain("Cloud & Data:  AWS (Lambda, API Gateway, DynamoDB, S3, Cognito, IAM, SNS)  |  ETL & data pipelines  |  PostgreSQL / RDS  |  Serverless"),
      plain("IaC & DevOps:  Terraform  |  GitHub Actions CI/CD  |  OIDC  |  Docker  |  Git / GitHub"),

      sectionHeader("PROFESSIONAL EXPERIENCE"),

      ...jobHeader("CFive AI", "Melbourne, Australia", "Technical Engineer (Contract)", "Mar 2026 – Present"),
      companyBlurb("AI telephony startup building an intelligent voice receptionist platform for SMBs, integrating Twilio, VAPI, and CRM APIs."),
      bullet("Leading the migration of CFive's platform to AWS, scoping the target cloud architecture and moving core services off the existing system"),
      bullet("Worked closely with a small team on an early-stage product, diagnosing and fixing production failures in an AI telephony system (Twilio, VAPI, CRM APIs) across 24 live client environments"),
      bullet("Wrote and tuned the prompts behind an AI voice receptionist, improving response accuracy and cutting down mishandled calls across client deployments"),

      ...jobHeader("MOSAIC (Monash Students for AI with Communities)", "Melbourne, Australia", "Cloud Engineer (Volunteer)", "Apr 2025 – Present"),
      companyBlurb("Student-run organisation at Monash University building AI-powered tools for community impact."),
      bullet("Deployed a serverless chat API using AWS API Gateway, Lambda, and DynamoDB (with TTL and GSI), provisioned end-to-end via CloudFormation with scoped IAM roles"),
      bullet("Created an interactive Mapbox GL map with real-time GeoJSON injection, parsing CSV data into country-level markers with hover and click interaction"),

      ...jobHeader("Darwinbox", "Jakarta, Indonesia", "Senior Integration Engineer / Integration Engineer", "Feb 2021 – Jul 2024"),
      companyBlurb("Enterprise HR and payroll SaaS platform serving 700+ companies across Southeast Asia, with deep integrations across banking, retail, and manufacturing sectors."),
      bullet("Designed and delivered REST API and ETL integrations using Python and R for enterprise clients across banking, automotive, retail, and sustainability sectors"),
      bullet("Cut integration-related system downtime by 20% and achieved 95% integration accuracy through rigorous API testing and systematic debugging"),
      bullet("Built payroll and HR data pipelines across Singapore, Malaysia, Philippines, and Indonesia, replacing manual processes with scheduled REST API connectors"),
      bullet("Delivered end-to-end implementations for 130+ clients, cutting timelines from 90 to 45 days through reusable templates and automated configuration"),
      bullet("Led technical enablement workshops for client engineering teams, increasing platform adoption by 75% and reducing tier-1 support volume"),

      sectionHeader("PROJECTS"),

      projectHeader("ShieldWalk – Women’s Safety Navigation App", "Vue 3  |  AWS Lambda (x15)  |  API Gateway  |  PostgreSQL RDS  |  Terraform  |  GitHub Actions  |  Groq / Llama 3.3 70B  |  Capacitor (Android)"),
      bullet("Designed a self-registering Terraform IaC system using fileset-based auto-discovery, provisioning 15 Lambda functions, API Gateway routes, and CloudWatch log groups via a single for_each block with fail-fast validation at plan time"),
      bullet("Established a GitOps CI/CD pipeline with OIDC authentication, per-developer ephemeral AWS environments via Terraform workspaces, and automatic teardown on PR merge"),
      bullet("Developed real-time off-route deviation detection with automatic return-path calculation, turn-by-turn push notifications, and arrival detection that chains into a post-walk reflection flow to adaptively learn user comfort preferences"),

      projectHeader("BirdTag – Serverless Media Tagging Platform", "github.com/coded-by-aditya/birdtag-aws  |  AWS Lambda  |  API Gateway  |  DynamoDB  |  S3  |  SNS  |  Cognito"),
      bullet("Developed a serverless media tagging system with event-driven SNS email alerts, a REST API layer with optimised DynamoDB access patterns, and user authentication via Amazon Cognito"),
      bullet("Designed REST API endpoints (search, update, delete) and optimised DynamoDB access patterns for fast metadata retrieval and updates"),
      bullet("Stored and served media files via S3 with pre-signed URLs, keeping Lambda functions stateless and file handling out of the API layer"),

      sectionHeader("EDUCATION"),
      ...educationEntry("Monash University", "Melbourne, Australia", "Master of Information Technology  |  WAM: 82%", "Expected 2026"),
      ...educationEntry("Manipal Institute of Technology", "Manipal, India", "Bachelor of Technology – Information Technology", "2021"),
    ]
  }]
});

const outPath = path.join(__dirname, "resume_deloitte_fde.docx");
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outPath, buffer);
  console.log("Done: " + outPath);
}).catch(console.error);
