run yarn install 
# Thrindle assessment App Setup Guide

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

## Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```


Replace <repository-url> with the URL of the public repository you want to clone.

## Install Dependencies

Use Yarn to install the project dependencies:

```bash
yarn install
```

This command will read the package.json file and install all the necessary packages.

## Configure Environment Variables

Copy the .env.example file to a new file named .env:

```bash
cp .env.example .env
```

## Run the Application

Start the Express.js application with the following command:

```bash
yarn run dev
```

Visit http://localhost:4000 in your web browser to see the running application.