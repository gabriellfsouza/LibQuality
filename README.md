# LibQuality

Welcome board of this quality measure tool for GitHub projects.

- To search any project, you need to inform its full name (ex: facebook/react)

[LibQuality](https://release.d3j50oizzyb9bf.amplifyapp.com/)

## Architecture and Technologies

This tool was designed using **AWS** technologies like **Amplify, DynamoDB, CloudFormation, Lambda, API Gateway, Cognito, CloudFront CDN and S3.**

![LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled.png](LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled.png)

AWS Based architecture

The application was built to on Amplify CLI (serverless based application builder), because it's purpose of build scalable cloud-powered web applications faster. Amplify deliver a environment that enable you to build, deploy and deliver web apps, integrate with CloudFormation for it's Infrastructure as Code capabilities.

API Gateway was used to manage all RESTFul requests and serves as a gateway calling the Lambda Function that process the request, calling the GitHub API and collecting data through a DynamoDB database.

The React frontend page is stored on a S3 bucket and served through CloudFront CDN.

All API requests needs to be authenticated by Cognito first and then can be called.

### Libraries

The following main libraries was used in this project

- react - frontend framework
- date-fns - date/time manipulation
- math-stats - mean and standard deviation calc
- uuidv4 - uuid generator
- jest - tests
- axios - rest api that call the GitHub APIs from backend
- express + aws_lambda_express - REST capabilities
- aws-sdk - AWS infrastructure tools access
- aws-amplify-react + aws-amplify - authentication, login interface, integrated REST calls

# Getting Started

You need to create a AWS account (this can be done using a 12 months free account).

[AWS Free Tier](https://aws.amazon.com/free/)

## Environment Setup

### NodeJS + NPM + Yarn

Install nodejs according to your own environment.

[Node.js](https://nodejs.org/en/)

Yarn is an optional tool and can be installed as a `npm` global package

```bash
npm install -g yarn
```

### AWS CLI and Amplify CLI configuration

You need to have AWS and Amplify CLIs configured before start, as the links below:

[AWS Command Line Interface](https://aws.amazon.com/cli/)

[Amplify Framework Documentation](https://docs.amplify.aws/start/getting-started/installation/q/integration/react)

### Configure AWS local credentials

- Create and download (for tests purpose you can create an admin account) or you can create a policy based on [https://docs.amplify.aws/cli/usage/iam](https://docs.amplify.aws/cli/usage/iam)
- Access the prompt

```bash
aws configure --profile [PROFILE_NAME]
AWS Access Key ID [None]: [YOUR_PROFILE_ID]
AWS Secret Access Key [None]: [YOUR_PROFILE_SECRET]
Default region name [None]: [OPTIONAL]
Default output format [None]: [OPTIONAL]
```

## Project Setup

### Project and dependences

```bash
git clone https://github.com/gabriellfsouza/LibQuality
cd LibQuality
yarn
```

### Amplify environment

```bash
amplify env add
Do you want to use an existing environment? (Y/n) N
Enter a name for the environment [YOUR_ENVIRONMENT NAME]
```

Choose your editor

![LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%201.png](LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%201.png)

```bash
Do you want to use an AWS profile? (Y/n) [Y]
[CHOOSE_YOUR_PROFILE]
```

Wait while provisioning project

```bash
amplify push
Are you sure you want to continue? (Y/n) [Y]
```

Wait while deploying the infrastructure/backend

```bash
yarn start
```

The following page will appear

![LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%202.png](LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%202.png)

To test the application run `yarn test`

### API - Swagger OpenAPI

The OpenAPI file is in the project base path named as `openapi.json`

# Publishing / Continuous Delivering

To publish and deliver your application ever when you merge your develop branch to release (for example) you can follow like below:

- Create a new environment that will represent your production or homologation
- Access aws console https://console.aws.amazon.com

![LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%203.png](LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%203.png)

![LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%204.png](LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%204.png)

![LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%205.png](LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%205.png)

![LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%206.png](LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%206.png)

![LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%207.png](LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%207.png)

![LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%208.png](LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%208.png)

![LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%209.png](LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%209.png)

![LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%2010.png](LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%2010.png)

![LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%2011.png](LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%2011.png)

![LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%2012.png](LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%2012.png)

![LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%2013.png](LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%2013.png)

![LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%2014.png](LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%2014.png)

![LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%2015.png](LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%2015.png)

Production

![LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%2016.png](LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%2016.png)

Notifications

![LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%2017.png](LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%2017.png)

![LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%2018.png](LibQuality%209994974101e341c9b9f9ae4aea1f6a6b/Untitled%2018.png)

Sample Application:

[LibQuality](https://release.d3j50oizzyb9bf.amplifyapp.com/)
