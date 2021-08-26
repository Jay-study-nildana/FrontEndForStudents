# Navigation Notes

For navigation without reloading, you must use, Link

```
        <Nav className="mr-auto">
          <p className="pt-3 px-3 "><Link to="/">{stringThings.Home}</Link></p>
          <p className="pt-3 px-3"><Link to="/">{stringThings.Home}</Link></p>
          <p className="pt-3 px-3"><Link to="/">{stringThings.Home}</Link></p>
        </Nav>

```

Don't use like this. This will reload the entire page. It's better to change page without reloading the entire page.

```
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Link</Nav.Link>
    </Nav>
```

# Hire Me

I work as a full time freelance software developer and coding tutor. Hire me at [UpWork](https://www.upwork.com/fl/vijayasimhabr) or [Fiverr](https://www.fiverr.com/jay_codeguy).

# important note

This code is provided as is without any warranties. It's primarily meant for my own personal use, and to make it easy for me share code with my students. Feel free to use this code as it pleases you.

I can be reached through my website - [Jay's Developer Profile](https://jay-study-nildana.github.io/developerprofile)
