# common problems

Here, I document some common issues I ran into while learning React JS.

# Upgrading package.json with latest versions

You can always update the package versions in package.json file. This way, you will use newer versions. Most of the time, the project will run if you dont change anything because that is what the developer, or in my case, coding tutor was using when he last tested the project on his computer.

I usually recommend doing both.

1. Run project without changing anything.
1. Run project after updating the version numbers, just to see how much errors you get and if you can fix those errors and make the project run anyway. I usually go to https://www.npmjs.com/, to find the latest version of the libraries used.

# dependency issues.

You will frequently run into errors like this, especially if you are planning to updated the package versions to the highest level.

```

    PS C:\gitrepos\bootstrapexpert\ReactJSForStudents\material-kit-react> npm install
    npm ERR! code ERESOLVE
    npm ERR! ERESOLVE unable to resolve dependency tree
    npm ERR!
    npm ERR! While resolving: material-kit-2-react@2.0.0
    npm ERR! Found: react@17.0.2
    npm ERR! node_modules/react
    npm ERR!   react@"17.0.2" from the root project
    npm ERR!
    npm ERR! Could not resolve dependency:
    npm ERR! peer react@"^18.0.0" from @testing-library/react@13.0.0
    npm ERR! node_modules/@testing-library/react
    npm ERR!   @testing-library/react@"13.0.0" from the root project
    npm ERR!
    npm ERR! Fix the upstream dependency conflict, or retry
    npm ERR! this command with --force, or --legacy-peer-deps
    npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
    npm ERR!
    npm ERR! See C:\Users\vijay\AppData\Local\npm-cache\eresolve-report.txt for a full report.

    npm ERR! A complete log of this run can be found in:
    npm ERR!     C:\Users\vijay\AppData\Local\npm-cache\_logs\2022-04-08T04_19_33_551Z-debug-0.log

```

So, the thing about react js (and almost all javascript libraries) is that they are all dependent on specific version to work with each other.

For example, here, I am using a library called @testing-library/react@"13.0.0.

This library needs react@"^18.0.0". But, I am currently using react@"17.0.2".

So, I have two options, one of them will usually work.

1. Change the testing library version that works with react 17.x.x
2. Change the react library that works with testing library 13.x.x

Usually, it's a good idea to change the testing library, because, react is the main library. Other libraries should be dependent on the version of react you are using.

# vulnerabilities warning

You will probably see something like this.

"6 moderate severity vulnerabilities"

```

    PS C:\gitrepos\bootstrapexpert\ReactJSForStudents\material-kit-react> npm install
    npm WARN deprecated source-map-resolve@0.6.0: See https://github.com/lydell/source-map-resolve#deprecated
    npm WARN deprecated svgo@1.3.2: This SVGO version is no longer supported. Upgrade to v2.x.x.

    added 1531 packages, and audited 1532 packages in 2m

    198 packages are looking for funding
    run `npm fund` for details

    6 moderate severity vulnerabilities

    To address all issues (including breaking changes), run:
    npm audit fix --force

    Run `npm audit` for details.

```

So, you can safely ignore this. Dont' worry. Let your company or project manager worry about it. \

# Prop type forbidden

Another common problem.

```

ERROR


    src\examples\Breadcrumbs\index.js
    Line 64:3:  Prop type "object" is forbidden  react/forbid-prop-types

```

More details here.

https://github.com/yannickcr/eslint-plugin-react/issues/2079

for some reason, for me, the issue, went away after running the project again with 'npm start'.

# .eslintrc errors

You will get plenty of eslint errors, if you are using eslint, in your project.

look at the following.

1. https://stackoverflow.com/questions/37826449/expected-linebreaks-to-be-lf-but-found-crlf-linebreak-style
1. https://stackoverflow.com/questions/66285268/how-to-get-rid-of-delete-prettier-prettier-errors-in-a-vue-js-project

For me, the following piece of code helped.

```

    "prettier/prettier": [
      "error",
      {
        "endOfLine": "off",
        "linebreak-style": 0
      }
    ],

```

eslint errors are more about enforcing coding standards, than actual code errors. The app will usually keep running even with all these errors. Just close the pop up and move on.

Or, restart the app. Usually the errors seem to go away.

# Remove Prettier

Sometimes, just to get out of the annoying errors and warnings and popups from Prettier, I just remove the entire prettier rule block

```

    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto",
        "linebreak-style": 0
      }
    ],

```

Just removed this entire rule man.

# Routes not updating

You need to restart the app.

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
