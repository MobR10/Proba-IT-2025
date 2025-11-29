# Proba-IT-2025
  
## How to connect to MongoDB
Log into MongoDB Atlas and copy the connection string for your cluster. After that, create the ```.env``` file inside the backend directory.
Inside ```.env``` add the following line: ```ATALS_URI='your_connection_string'```.

## How to install dependecies
Both frontend and backend have their own dependencies. You need to run ```npm install``` in your terminal from both ```/backend``` and ```/frontend``` prior to trying to start them.

## How to start the backend
From your terminal, make sure you first navigate to ```root/backend```. Then run the following command ```nodemon server``` . Nodemon makes it so the backend refreshes with every CTRL+S.

## How to start the frontend
Similar to backend, navigate to ```root/frontend```. Then run ```npm run dev``` 

