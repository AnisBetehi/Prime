# Prime
### [**Prime**](https://primme.netlify.app) is social platform where users can posts their thoughts, discuss their interests and passions.


## How to run the app
1. Download the code or clone the repository
```
  $ git clone https://github.com/AnisBetehi/Prime.git
```
2. Cd into the app folder

3. Install all dependencies using [npm](https://www.npmjs.com/) by running either of these commands
```
  npm i
```
```
  npm install
```

4. After the installation is complete, you can run the command `npm start` to start the app on [https://localhost:5000](https://localhost:5000)

# What the app looks like

[![2022-02-25-4.png](https://i.postimg.cc/jjBSF8Bx/2022-02-25-4.png)](https://postimg.cc/DWdhWc2H)


# Features

- Email Authentication (Sign up, Sign in, Sign out).
  - when you first open the app, you will be greeted by a login page, you can either sign in or sign up if you haven't.

  - once you create an account you will be able to use the app.

- Posting (includes images) and deleting posts.
  - posts are saved in the backend and can be seen by everyone.

  - posts cannot be empty unless you include an image.

  - each post has a timestamp.

- Liking / unliking posts, commenting and deleting comments.

  - each like and comment have a timestamp.
  
  - you can only delete your own comments by pressing the delete button next to it.

  - you can like posts by pressing the thumbs up button and unlike them by pressing it again.

- Upadting your profile information (profile picture, website, about me).
  
  - you can go into your profile and click on the pen icon to update your profile information.

  - in your profile you can see all the posts you have posted.

- Seeing other users's profiles and their posts.

  - licking on a user's name or profile picture takes you to their profile 
and you will be able to see their information and their posts.

- Messaging other users.

  - each user has a unique chatbox with every user on the app that is saved in the database.

  - you can message users by going into their profile and pressing the message icon, then you can find all your messages in the messages tab.

- Live reloading when new posts, comments and likes are added / removed.



## Dependencies
- [React router](https://reactrouter.com/)
- [Redux toolkit](https://redux-toolkit.js.org/)
- [Firebase](https://firebase.google.com/)
- [Styled components](https://styled-components.com/)
- [Momentjs](https://momentjs.com/)

