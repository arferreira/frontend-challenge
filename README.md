### Challenge Overview:
You are tasked with building a simple authentication and authorization system using React with Next.js and TypeScript. The application should allow users to sign up, log in, and access a protected route only if authenticated. Additionally, users should have different levels of access based on their roles.

## Technical Requirements:
* Framework: Use React with Next.js.
* Language: Write the code in TypeScript.
* Authentication: Implement authentication using JWT (JSON Web Tokens).
* Authorization: Implement role-based access control (RBAC). Assume two roles: user and admin.
* Linting: Set up ESLint with a popular preset (e.g., Airbnb, Standard) to enforce code quality standards.
* Directory Structure: Organize your project structure following best practices.
* Styling: Use TailwindCSS and flowbite components (https://flowbite.com/docs/getting-started/introduction/).

* Nice to have: OAuth

## Tasks:
* Set up a Next.js project with TypeScript.
* Create a sign-up page where users can register with their email and password.
* Implement authentication logic using JWT. Upon successful registration or login, users should receive a JWT token.
* Create a login page where registered users can log in.
* Implement a protected route (/dashboard) accessible only to authenticated users.
* Implement role-based access control. Only users with the admin role should be able to access /dashboard.
* Ensure proper error handling and display appropriate error messages to users.
* Implement logout functionality.
* Write unit tests for critical components or functionalities.
* Set up ESLint with your preferred configuration preset and ensure all code adheres to linting rules.

## Bonus Tasks (Optional):
* Implement password hashing for secure storage.
* Add form validation using a library like Formik or React Hook Form.
* Implement refresh tokens for better session management.
* Enhance the UI/UX with animations or transitions.
* Dockerize the application for easy deployment.

## Repository Structure:
Create a project with the following structure:

/frontend-challenge
  |-- /pages
  |-- /components
  |-- /utils
  |-- /styles
  |-- /tests
  |-- README.md
  |-- .gitignore
  |-- package.json
  |-- next.config.js
  |-- tsconfig.json
  |-- .eslintrc.json

 
## Submission:
Fork this repository, complete the tasks, and submit a pull request with your solution. Ensure that your code is well-documented and follows best practices. Your project needs to deploy on Vercel, Ensure that your code is running there.

Feel free to reach out if you have any questions or need clarification on any aspect of the challenge. Good luck!
