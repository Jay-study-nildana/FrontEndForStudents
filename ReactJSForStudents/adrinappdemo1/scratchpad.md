# TODO APP 2

A simple todo app.

1. Shows usage of Redux
1. Shows consuming a simple api endpoint from another server
1. CRUD operation
1. Shows a simple list

I took the reference project, updated the libraries and made some of my own improvements.

# Note

1. I strongly recommend you dont try to run the app as it is. start with
   ```
       npx create-react-app todoapp
   ```
1. Then, add the dev dependencies and the regular dependencies separately. Commands are available below.
1. The server is available in the [ReferenceProject](ReferenceProject). You need to run that to make this app work. The app is the client and there is the server that acting as an API.
1. Check the default README at [OldREADME.md](OldREADME.md)
1. If you get 'CORS Error', it usually means, you are not running the companion server. Remember to run both the app and the server.

# Primary Source

I took this project from another project tutorial called 'Building Modern Projects with React'.

Look at folder [ReferenceProject](ReferenceProject) for the original files.

# Packages

Use the following commands to add all neccessary packages. Dont try to run the project as it is. Create your own project. React JS depends on so many libraries that they suddenly stop working. Better to start with a brand new project, add required packages and add the files individually, one file at a time.

```

npm install react-redux redux redux-devtools-extension redux-persist redux-thunk reselect styled-components

npm install @babel/cli @babel/core @babel/plugin-transform-runtime @babel/preset-env @babel/preset-react @babel/register --save-dev

npm install babel-loader chai css-loader fetch-mock mocha node-fetch react-hot-loader sinon style-loader webpack webpack-cli webpack-dev-server --save-dev

```

# References

1. [Building Modern Projects with React](https://www.linkedin.com/learning-login/share?account=116831794&forceAccount=false&redirect=https%3A%2F%2Fwww.linkedin.com%2Flearning%2Fbuilding-modern-projects-with-react%3Ftrk%3Dshare_ent_url%26shareId%3DxAosk67ISVmYUGe4OIl3BQ%253D%253D)
1. https://www.geeksforgeeks.org/difference-between-dependencies-devdependencies-and-peerdependencies
1. https://reactjs.org/docs/create-a-new-react-app.html
1. https://create-react-app.dev/docs/adding-typescript/

# Hire Me

I work as a full time freelance software developer and coding tutor. Hire me at [UpWork](https://www.upwork.com/fl/vijayasimhabr) or [Fiverr](https://www.fiverr.com/jay_codeguy).

# important note

This code is provided as is without any warranties. It's primarily meant for my own personal use, and to make it easy for me share code with my students. Feel free to use this code as it pleases you.

I can be reached through my website - [Jay's Developer Profile](https://jay-study-nildana.github.io/developerprofile)
