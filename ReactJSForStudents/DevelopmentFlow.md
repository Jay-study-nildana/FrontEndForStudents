# Development Flow.

Setting up React Project, and then getting the basic components in place is tricky. Hopefully, the steps will help you.

# Step One - New Project Setup

```

    npx create-react-app reactstudentappmar182022
    npm install react-redux redux redux-devtools-extension redux-persist reselect styled-components redux-thunk

```

```

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.11:3000

```

# Step Two - Workspace Setup

This one is optional. Have an example project, like one of mine, open along with the new project that you are coding. This way, you can look at the 'good, working' code if you make any mistakes. Also, makes it easy to copy paste.

Make the most of VS Code Split Window option.

Also, remember that React has an excellent, 'remote server' option. So, you can open the running app on your iPhone, iPad or Macbook or another computer when coding. This way, your main computer can be used for coding only.

Note : Remote server option might play havoc with network calls.

Also, remember to use workspaces which has two folders. One is the current folder you are coding. The second (or additional folders) folder is the reference project that you are looking at while learning. Dont forget to save the workspace.

# Step Three - actions.js

This is where you will put all your actions. As of now, this is where it all starts.

# Step Four - reducers.js

reducers act as a bridge between your store and actions. setup them up next.

# Step Five - store.js

This is the redux store. This acts as a bridge between your app (which needs the data) and the actual data sources, like API and so on.

# Step Six - index.js

At this stage, all the components are ready, and you plugged it into the main index.js. Remember, index.js is where the app starts loading all the stuff. Just like, index.html, in the old school web projects.

# Step Seven - App.js and coding begins

And, here we go. Start building your app.

This is where you will write you 'data obtaining' files. 

1. selectors.js 
1. thunks.js

Together, these two help you talk to your target data API server, and get the actual data you want to show in your app.

# Hire Me

I work as a full time freelance software developer and coding tutor. Hire me at [UpWork](https://www.upwork.com/fl/vijayasimhabr) or [Fiverr](https://www.fiverr.com/jay_codeguy). 

# Hobbies

I try to maintain a few hobbies.

1. Podcasting. You can listen to my [podcast here](https://stories.thechalakas.com/listen-to-podcast/).
1. Photography. You can see my photography on [Unsplash here](https://unsplash.com/@jay_neeruhaaku).
1. Digital Photorealism 3D Art and Arch Viz. You can see my work on this on [Adobe Behance](https://www.behance.net/vijayasimhabr).
1. Writing and Blogging. You can read my blogs. I have many medium Publications. [Read them here](https://medium.com/@vijayasimhabr).

# important note 

This code is provided as is without any warranties. It's primarily meant for my own personal use, and to make it easy for me share code with my students. Feel free to use this code as it pleases you.

I can be reached through my website - [Jay's Developer Profile](https://jay-study-nildana.github.io/developerprofile)
