# React JS Hello World Project with https

![image info](RandomStuffGeneratorReactApp.png)

Note : If you are just starting with React JS, I would recommend, trying this link. [create-react-app, Hello World, 2022 edition](https://medium.com/projectwt/create-react-app-hello-world-2022-edition-f36275a0e7c4)

Note : Firefox might complain that there is a security risk. Dont get scared by this. you self created this certificate. So, obviously, browsers like Firefox will complain. Click on Advanced and accept the risk and continue.

# code sandbox

there is no code sandbox link for this, because, code sandbox already runs the projects in HTTPS. 

# https extra notes 

First, look at the 'start' command in package.json.

```
  "scripts": {
    "start": "set HTTPS=true&&set SSL_CRT_FILE=./.cert/cert.pem&&set SSL_KEY_FILE=./.cert/key.pem&&react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

That's how we force this project to run in HTTPS. To make this happen, we need to install certificates. 

Note : I did this on windows. So, these steps are windows specific. 

To get certificates, you have the following commands. 

1. install chocolatey
1. then, the actual certificate library, 'choco install mkcert'
1. the actual command to create the certificates.

```
    //create a certficate folder
    mkdir -p .cert
    //create the actual certificates in the folder 
    mkcert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem "localhost"
```

it's a lot of steps. if you did everything correctly, you will get this. 

```
    Compiled successfully!

    You can now view reactfbloginhelloworld in the browser.

    Local:            https://localhost:3000
    On Your Network:  https://192.168.29.208:3000

    Note that the development build is not optimized.
    To create a production build, use npm run build.
```

# about chocolatey and Powershell

Installing chocolatey on windows is not easy. You have to run a lot of commands in powershell, and you should do it in admin mode. 

```
    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

# Local host running 

1. Local:            https://localhost:3000
1. On Your Network:  https://192.168.29.208:3000

Note : When doing react JS, I would strongly recommending using two computers. One computer for coding. One computer for debugging over a network. Or, you can have two monitors.

# Setting Up Project and Running

```
    npm install
    npm start

```

1. npm install. Installs all neccessary node modules. 
1. npm start

# Notes - General

1. I have put comments and console logs (caveman debugging) all over the place. ensure you have console open when you are running the app. 

# References

1. https://medium.com/projectwt/create-react-app-hello-world-2022-edition-f36275a0e7c4
1. https://www.freecodecamp.org/news/how-to-set-up-https-locally-with-create-react-app/
1. https://medium.com/projectwt/react-js-localhost-with-https-using-mkcert-338927e94212

# Mac Related links

note: I am not able to get mkcert to work on Mac, no matter how much I try. 

1. https://github.com/FiloSottile/mkcert
2. https://brew.sh

# book a session with me

1. https://calendly.com/jaycodingtutor/30min

# hire and get to know me

find ways to hire me, follow me and stay in touch with me.

1. https://github.com/Jay-study-nildana
1. https://thechalakas.com
1. https://www.upwork.com/fl/vijayasimhabr
1. https://www.fiverr.com/jay_codeguy
1. https://www.codementor.io/@vijayasimhabr
1. https://stackoverflow.com/users/5338888/jay
