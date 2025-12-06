# Proba-IT-2025
  
## How to connect to MongoDB
Log into MongoDB Atlas and copy the connection string for your cluster. Make sure to add your ip address to the whitelist of the cluster.
After that, create the ```.env``` file inside the backend directory.
Inside ```.env``` add the following line: ```ATALS_URI='your_connection_string'```.

## backend/.env file config
For the forgot password bonus implementation, you need to add the following fields in the .env file from backend
```
SMTP_HOST=smtp.your_email_service.com (example for gmail: smtp.gmail.com or yahoo smtp.ymail.com)
SMTP_USER=your_email@service.com
SMTP_PASS=your_pass_generated_from_your_service (for more info, look into SMTP PASS)
FRONTEND_URL=http://your_frontend_ip_address:your_port
```

## How to install dependecies
Both frontend and backend have their own dependencies. You need to run ```npm install``` in your terminal from both ```/backend``` and ```/frontend``` prior to trying to start them.

## How to start the backend
From your terminal, make sure you first navigate to ```root/backend```. Then run the following command ```nodemon server``` . Nodemon makes it so the backend refreshes with every CTRL+S.

## How to start the frontend
Similar to backend, navigate to ```root/frontend```. Then run ```npm run dev```

## How to bind frontend to the backend
Inside the frontend .jsx components, the urls that make the http requests to the backend look like this: ``` URL=`${import.meta.env.VITE_API_URL}/` ``` followed by the rest of the route. I used this instead of hardcoding ```localhost:port```
so that I can change it in one place and it would take effect globally and because I wanted to share the app with other users over the internet and I used ```npm run dev -- --host 0.0.0.0``` to make the app listen to my local ip,
which I port-forwarded and used a DNS. Long-story short, if you want to use the app 
and you don't want to go through the trouble of setting port-forward, use the normal command from [earlier](#how-to-start-the-frontend) . Still, you will need to specify the beginning of the URL in another file: inside /frontend directory, create
the ```.env``` file and then write the following: ```VITE_API_URL=http://``` followed by your backend address, which in your case, locally, it would be ```localhost``` and the port you have opened your backend on.

Completed tasks

Pages:
- Home
- Best grills
- Register
- Login
- Profile
- Forgot Password
- Reset Password

Responsiveness:
- The app has desktop, medium-sized devices and mobile versions
  
Functionalities:
- User who haven't logged see the home, login and register buttons in the navbar
- Users who have logged in see the home, profile and logout buttons in the navbar
- Only logged users can make posts and edit / delete their own posts
- Only logged users can "Give mici" to others' posts (though with no limit).
- Registering with a success redirects to login page
- Logging in with succes redirects to home page
- Used basic localStorage to remember a user
- Used bcrypt to hash passwords in the database and keep users' passwords secure
- Users can use the search bar to look for grills
- The page with all grills has 2 lists of grills: "Grills for pimps" and "THE BEST GRILLS"

Bonuses: 
- only users with admin role can edit/delete any post
- users can upload images
- forgot password
- give mici button, but no limit :(

Short description of the code:
### Pages
Frontend - Each page was defined as a Route inside the App.jsx

Backend - I made users.js and grills.js files where I wrote all the routes for the backend and created user.model and grill.model schemas for the database
```
const grillSchema = new Schema({
    Titlu: { type: String, required: true },
    Descriere: { type: String, required: true },
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    Rating:{ type: Number, required: false, default: 0 },
    Image: { type: String, required: true },
},  {
    timestamps: true,
})
```
```
const userSchema = new Schema({
    Nume: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    Prenume: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    Parola: {
        type: String,
        required: true,
        unique: false,
    },
    Telefon: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    Rol: {
        type: String,
        required: true,
        unique: false,
        trim: true
    }
},  {
    timestamps: true,
})
```
### Login and Register
Simple forms styled using Bootstrap. onSubmit function sends a POST operation to the backend with the information the user introduced if other conditions are met, like confirming password or filling every field

### Profile Page
- Rectangle with the logged in user information
- 'Post Grill' button
- I am using React's state and setState to refresh the page whenever the user makes a new post. 
- To create a post, I render the create-grill.component.jsx on a modal, which is mainly another form that works just like the login and the register.
- The posts are cards that once clicked on show a modal with the information about the post and, if it's the case, show the 'Delete/Edit post'. 
- The edit post renders the edit-grill.component.jsx on a modal and works like login and register.
- The delete button asks the user if it's okay to proceed and it just sends a DELETE operation to the backend at ```/grills/delete/:id``` with the selected grill's ```id``` from the database.

### Best Grills Page
- Displays the full username (used componentDidMount() to save the username in this.state in order to display it)
- Search bar
- Similar functionality when a user clicks on the grill, a modal with grill information appears and, if the user is logged, he can see the "Give mici" button (if it's not his post) and the "Edit/Delete post" buttons if it's their post.

### Edit Post
- Users can choose not to edit anything or edit what they want, including Title, Description and change the picture
