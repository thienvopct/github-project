# github-project

This repository contains a tool to automate the creation of GitHub issues based on a predefined configuration. It uses the GitHub API to create issues in a specified repository with details such as titles, labels, and body templates.

## Features

- Automatically creates GitHub issues based on a configuration file.
- Supports dynamic issue titles and body templates.
- Uses the GitHub API for seamless integration.

## Prerequisites

- Node.js (v18 or higher)
- A GitHub Personal Access Token (Classic) with the necessary permissions to create issues in the target repository.

## Setup

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd github-project
    ```
2. Install dependencies:
    ```sh 
    pnpm install
    ```
3. Create a `.env` file in the root directory and add your GitHub Personal Access Token:
    ```sh 
    GITHUB_TOKEN=your_github_token
    ```
4. Update the `issue-config.json` file with your desired issue configuration.

## Running the Project
To create GitHub issues, run the following command:

```sh 
pnpm run generate
```

This will read the configuration from `issue-config.json` and create issues in the specified GitHub repository.

## Notes
Ensure that the GitHub token has the necessary permissions to create issues in the target repository.
The `issue-body-template.md` file is used as the template for the issue body. Customize it as needed.
