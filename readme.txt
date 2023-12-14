Hello! This readme includes instructions for getting the site running locally, as well as a general description of how things work/their limitations.
To run locally:
- After cloning, create a file called '.env', and past the following line in it:
MONGO_URL="mongodb+srv://khammen:khammen@cluster474.ogg29o3.mongodb.net/474"
    - This was our workaround for accessing the database without a working login
    - On that note, the file getfromDB.js would use the user's ID after login to get their information. For now it just always pulls user Jonathon
    - I believe Daniel has working login on the branch login-theme, though I have not confirmed that myself. 
- After creating the .env, you may need some npm installs. [dotenv, d3, bootstrap, mongodb] are the key ones, I believe. 
- run 'node server.js' to start it up


General Notes:
- Graphs update when adding items, but not on edit or delete. Edits and deletes will show upon something being added or page refresh
- Hover over pie charts to see the value/percent breakdown
- Click the login button on the login page to pull data from our mock user, or just add your own. 