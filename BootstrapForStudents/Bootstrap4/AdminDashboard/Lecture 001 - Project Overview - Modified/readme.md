# Admin Dashboard

I have taken the original Admin Dashboard project by George Lomidze and have made my own modifications and upgrades.

This was the second project I remixed. 

If you are a new student, start with the other project, [PhotoX](PhotoX). It is much simpler, has more comments, and also more useful for everyday scenarios.

Also check [Deployments.md](Deployments.md)

# Note To Students

1. Bootstrap is one of those things that is commonly used. That means, you will find a lot of ready to use code on the internet. You can also buy or download ready to use themes.
1. The important thing to remember, from my own experience of learning bootstrap, is that, it will probably takes years to write bootstrap code without using existing code samples. 
1. So, my advice is to use existing code, try and understand the different CSS and bootstrap code used, and then, keep remixing and learn. 
1. It will happen slowly, so, be patient.

# Original Code

Available in the folder [GeorgeLomidzeOriginal](../GeorgeLomidzeOriginal/).

# Font Awesome - Using it Locally

It is possible to serve fonts directly from the font awesome servers. That comes with limitations. Better to use it locally.

1. The /css/all.css file contains the core styling plus all of the icon styles that you’ll need when using Font Awesome. The /webfonts folder contains all of the typeface files that the above CSS references and depends on.

1. Copy the entire /webfonts folder and the /css/all.css into your project’s static assets directory (or where ever you prefer to keep front end assets or vendor stuff).

1. Add a reference to the copied /css/all.css file into the <head> of each template or page that you want to use Font Awesome on.

```
    <head>
    <link href="/your-path-to-fontawesome/css/all.css" rel="stylesheet"> <!--load all styles -->
    </head>
    <body>
    <i class="fas fa-user"></i> <!-- uses solid style -->
    <i class="far fa-user"></i> <!-- uses regular style -->
    <i class="fal fa-user"></i> <!-- uses light style -->
    <!--brand icon-->
    <i class="fab fa-github-square"></i> <!-- uses brands style -->
    </body>

```

# References

1. https://fontawesome.com/how-to-use/on-the-web/setup/hosting-font-awesome-yourself

# Hire Me

I work as a full time freelance software developer and coding tutor. Hire me at [UpWork](https://www.upwork.com/fl/vijayasimhabr) or [Fiverr](https://www.fiverr.com/jay_codeguy). 

# References

1. https://getbootstrap.com/docs/4.6/getting-started/introduction/
2. 1. https://learning.oreilly.com/videos/bootstrap-4-create - Bootstrap 4: Create Four Real World Projects By George Lomidze
3. https://github.com/PacktPublishing/Bootstrap-4---Create-4-Real-World-Projects

# important note 

This code is provided as is without any warranties. It's primarily meant for my own personal use, and to make it easy for me share code with my students. Feel free to use this code as it pleases you.

I can be reached through my website - [Jay's Developer Profile](https://jay-study-nildana.github.io/developerprofile)