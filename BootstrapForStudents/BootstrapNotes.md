# Bootstrap Notes

Essential quick notes. Bootstrap is complex. There are lot of tips, so keep scrolling.

* Also read [DeveloperTips.md](DeveloperTips.md)
* Also read [DeveloperThoughts.md](DeveloperThoughts.md)
* Also read [References.md](References.md)
* Also read [BootstrapNotes.md](BootstrapNotes.md)
* Go back to [README.md](README.md)

# Option Click or Alt Click

Us this to select multiple lines and edit them at once.

# 12 is the number for a row

For example, a row has 12 units. Notice how, inside this row, the col-md, adds up to 12.

```
    <div class="row m-5">
    <div class="col-md-8 text-center">
        <i class="fas fa-camera fa-8x text-white m-4"></i>
        <h1 class="text-white mb-3">Creativity</h1>
        <p class="text-white">My head is like a dam of creativity. I bring that to the table and I also bring it to the balcony.</p>
    </div>
    <div class="col-md-2 text-center">
        <i class="fas fa-lightbulb fa-8x text-white m-4"></i>
        <h1 class="text-white mb-3">Lighting</h1>
        <p class="text-white">I love natural lighting. I also dont mind artificial lighting. A good lighting is good for the photos. no good lighting means no good photos. Get your lighting in place.</p>
    </div>
    <div class="col-md-2 text-center">
        <i class="fas fa-tree fa-8x text-white m-4"></i>
        <h1 class="text-white mb-3">Nature</h1>
        <p class="text-white">Save the trees. Save the planet. Accept climate change and act accordingly. Plant a tree today and take photos of that tree</p>
    </div>
    </div>
```

```
    <div class="container">
        <div class="row align-items-center">
        <div class="col-lg-9 text-center">
            <!-- <img src="images/vijayasimha-br-mK1LejgFkhM-unsplash.jpg" width="350" class="img-fluid camera-img"> -->
            <img src="images/vijayasimha-br-mK1LejgFkhM-unsplash.jpg" class="img-fluid">
        </div>
        <div class="col-lg-3 text-white text-lg-right text-center mission-text">
            <h1>We know what we do</h1>
            <p class="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet tempora itaque obcaecati voluptas? Perferendis voluptate accusantium eum sit deleniti harum, assumenda vitae! Cupiditate eos iusto ab rerum, voluptatum minima sed?</p>
        </div>
        </div>
    </div>
```

# media query breakpoints

xs = Extra small <576px
Max container width None (auto)

sm = Small ≥576px
Max container width 540px

md = Medium ≥768px
Max container width 720px

lg = Large ≥992px
Max container width 960px

xl = Extra large ≥1200px
Max container width 1140px

# Header 

We always start with a header. It contains.

1. Navbar
2. Background Image
3. Banner with some content

# background image stuff

background: url(images/vijayasimha-br-mLIJzTxTsLg-unsplash.jpg) no-repeat center center /cover;

# text related things

<div class="text-light text-right">
<h1 class="display-4">
<p class="lead">I have been uploading some of my photos to the unsplash website.</p>
<div class="text-light text-md-right text-center">