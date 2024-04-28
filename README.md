# Recipe Scocial App with User Authentication
This project is a Recipe Manager web application that allows users to create, post, and save recipes. The application is built using the Prisma, Express.ts, React.ts, Node.ts, typescript and utilizes user authentication for secure access. The frontend is developed with React.ts and styled using Tailwind CSS, providing a responsive and user-friendly interface.

## Features

- User Authentication: The app includes a user authentication system that allows users to sign up and log in securely. Passwords are encrypted using bcrypt to ensure data privacy

- Create and Post Recipes: Users can create and post their own recipes, providing details such as recipe name, ingredients, cooking time, and an image URL.

- Save Recipes: Logged-in users can save recipes to their profile for future reference. Saved recipes are associated with the user's account.

- View Recipes: The app features a home page where users can view a collection of recipes created by various users. Each recipe includes its details and an option to save the recipe if the user is logged in.

- Saved Recipes Page: A separate page allows users to view their saved recipes, displaying the recipe details they've chosen to save

- Owner Recipes Page: A separate page allows users to view their own recipes.

- Tailwind CSS: The application is designed using the Tailwind CSS framework.
 
## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies for frontend

```bash
  cd frontend & npm install
```

Install dependencies for backend

```bash
  cd backend & npm install
```

Start the backend server

```bash
  npm start
```

Start the frontend server

```bash
  npm run dev
```

- Access the app in your web browser at `http://localhost:5173`	

### Note:

- Before running the project, make sure to create a `.env` file in the backend directory with necessary environment variables (e.g., `DB_URL`, `SECRET_KEY`) for the Postgres connection and user authentication.
