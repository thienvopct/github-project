import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { Octokit } from "octokit";

// Load environment variables from .env
dotenv.config();

// GitHub Personal Access Token (Classic)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  throw new Error("GitHub token is missing. Please set it in the .env file.");
}

// GitHub username or organization name
const OWNER = "pcae";
// GitHub repository name
const REPO = "hr4c-target-frontend";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const issueConfigPath = path.resolve(__dirname, "issue-config.json");
const issueConfig = JSON.parse(fs.readFileSync(issueConfigPath, "utf-8"));

const octokit = new Octokit({ auth: GITHUB_TOKEN });

/**
* Creates a GitHub issue in the specified repository.
*
* @async
* @param {Object} issue - Issue details.
* @param {string} issue.path - Component path for the issue.
* @param {string} issue.title - Issue title template.
* @param {Array<string>} issue.labels - Labels for the issue.
* @param {string} issue.bodyTemplate - Path to the issue body template file.
* @returns {Promise<void>} - Resolves on success, logs error on failure.
*/
async function createIssue(issue) {
  const {
    path: componentPath,
    title,
    labels,
    bodyTemplate,
  } = issue;

  const issueTitle = title.replace("{componentPath}", componentPath);

  const markdownPath = path.resolve(__dirname, bodyTemplate);
  const issueBodyTemplate = fs.readFileSync(markdownPath, "utf-8");
  const issueBody = issueBodyTemplate;

  try {
    await octokit.request('POST /repos/{owner}/{repo}/issues', {
      owner: OWNER,
      repo: REPO,
      title: issueTitle,
      body: issueBody,
      labels,
    });

    console.log(`${componentPath} \n Create success!`);
  } catch (error) {
    console.log(`${componentPath} \n Create failed!. Message: ${error.response.data.message}`);
  }
}

async function createIssues() {
  for (const issue of issueConfig.issues) {
    await createIssue(issue);
  }
}

createIssues();
