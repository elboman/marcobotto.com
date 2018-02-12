---
title: The Hitchhiker's guide to the modern front end development workflow
slug: the-hitchhikers-guide-to-the-modern-front-end-development-workflow
date: 2016-06-12T00:00:00Z
published: true
---

Since I started developing in JavaScript years ago lots of things have changed. Node.js and the `npm` manager unlocked Front End developers tools for building application _that simply weren't possible before_: command line tools for javascript code, awesome IDEs, building and bundling tools, linting and testing tools, and many more.

If you look for any information regarding Angular, React, Ember or almost any other framework, **you'll find guides and tutorials written in ES6/ES2015+**, talks about the **latest bundler** with tree-shaking features, **JavaScript supersets** as TypeScript and so on.

There's nothing wrong with this, and I'm happier than ever developing web applications in 2016. **But it's not obvious for the new-comers**, and even less for anyone who has developed in JavaScript before, but haven't touched it in the past few years.

I was recently asked by a friend to help him getting started with Angular. His problem was about routing/state management, but as soon as we dove into his code I realised what **he really needed help with was a proper way to tackle a project using today's tools** (and also some help with `ui-router`).

Before starting I'd like to point out that there are probably many other better ways, tools and combinations that might suit your needs, and depending on the project some things shown here might not be for you at all. Furthermore, if any of you have any improvements or correction, please do share, as it might help everyone, especially me.

---

## Node/Npm, ES2015, wtf?

Before diving into the specifics and see the workflow step by step, I feel like we need to clarify a couple of concepts otherwise it would be very difficult to follow. You already know what Node and ES2015 are you can skip this part.

### Node.js & npm

You probably have already heard about Node.js unless you have been living under a rock the last years. **Node.js is a runtime environment** built on top of **Google's V8 JavaScript Engine**, and it's use to build server side web application written in JavaScript. JavaScript paired with Node.js works pretty similar to how Python or Ruby work regarding the fact that the user can write and run arbitrary code from the command line.

What should be of your interest is the fact that this lets you use a series of tools (run via the terminal as command lines) built to greatly improve the developing experience and unlocking a whole new level of awesomeness in the JavaScript world. This new workflow include **task runners** for **linting, transpiling and bundling** code, **CSS preprocessing**, running automated tasks, and many many more things.

Since Node.js unlocked JavaScript outside browsers, it needed a way to let users share code, packed into useful reusable modules. Introducing Npm, the Node.js package manager.

Npm works pretty much like any other package manager (`apt-get`, `pip` and so on): it lets you install modules globally on the machine or locally to a project. It is **the standard way** (not the only one though) to share code in the huge JavaScript community, and any library you may think of (back end and front end) is distributed through npm. In fact, since the JavaScript community is so big and there are some many projects, npm is [the largest module repository ever](http://www.modulecounts.com/).

### ES2015

It is just a pseudonym that refers to the latest (approved) version of the JavaScript language, **also called ES6**. This version of the language introduces many improvements and some new features, but **it's just JavaScript, not a new syntax or language like TypeScript or CoffeScript**.

Some of the newer features are _arrow functions_, `let` and `const` variable definitions, _template strings_, _modules_ and many more.
Since there's a lot cover about ES2015, I suggest you have a lot at this [comprehensive overview of the features](https://github.com/lukehoban/es6features) before you continue any further.

## Why do I need all this?

Writing JavaScript applications these days can be very tough, furthermore if you want to work for any company or startup that build web applications, you are going to encounter and use these tools every day, and often are pre-requisites to even get the job in the first place.

Long gone are the days where you connect through FTP to your Wordpress setup and start editing some `index.php` or some `main.js` filled with _jQuery_ and other libraries.

What we are aiming with this workflow for is a local (and remote) reproducible environment in which you are able to organise your project, add steps to your developing pipeline and automate your deployment process.

## The workflow

Here is what my workflow looks like these days. As you may notice it doesn't specify any framework for building applications, as these tools will be helpful even if you don't use any.

Software:

* Source control: Git
* Remote repository: GitHub / GitLab / BitBucket
* IDE: Atom / VSCode / SublimeText

JavaScript tools:

* Module bundler: Webpack / Rollup / RequireJS
* JavaScript Transpiler: Babel / Typescript
* CSS Preprocessors: SASS / LESS
* Code linting: ESLint
* Testing: Ava / Mocha / Tape

I strongly believe the order is important, since many things won't be easy to learn if you don't have some basis to work on.

Besides the softwares, each of the tools are installed in your project via `npm` as explained earlier. Since many of them provide standalone CLI and `npm` itself is a CLI the terminal will be your best friend (if it isn't already). You cannot avoid it.

**This isn't an in-depth guide to these tools** as it would be an enormous writing, this post aims to help new (JavaScript front end) **developers feel a bit less lost in the extremely vast reality of front end development**. Each of the tools and software is worth a thousand posts and I cannot possibly thorough explaining them, so I try to explain how they fit in the workflow, and why I think you should learn/use them to be a better developer.

### Source control: Git

As the name suggests, source controlling means having the **ability to manage changes of your code over time**, through useful operations such as creating alternative copies (_branches_) on which you can work on without touching the other copies, reverting the code to previous states (_commits_) whenever needed and other goodies.

Rather than the typical workflow where you just save files in a folder, source control gives you granular access to your project's code (_repository_) at certain points in its development, allowing for more detailed editing.

Git is an open source project [started by Linus Torvald](http://techcrunch.com/2012/04/19/an-interview-with-millenium-technology-prize-finalist-linus-torvalds/) to manage the revisions of the Linux source code. It's a very powerful tool, and unlike many people think, **it's not necessarily used to develop in team**. You may want to use Git even if you are developing locally all by yourself.

It would be pointless to dive deep in how Git works in general and some of the Git commands, so I suggest you take a look a [this guide](http://rogerdudler.github.io/git-guide/) the start familiarise with it. On the other hand what I want to stress is that Git is just a tool, **it doesn't dictate on how** you should take advantage of its functionalities to organise your developing process, that's up to you (and your team). I recently read an [interesting piece by Vincent Driessen](http://nvie.com/posts/a-successful-git-branching-model/) on a great branching model and I'm following it with some tweaks based on the size and nature of the project.

Since you will be using Git a lot and you will face situations where it will make your life a lot easier, I suggest you don't spend **too much time** on the topic now, as long as you understand the basics. You will learn the juicy stuff when you will need them and once you're confident with everything else.

### Remote repository: GitHub / GitLab / BitBucket

GitHub is a hosting service for Git repositories. It lets you **host a copy of your repository online** and provides **powerful collaboration tools** between you and your team or you and the open source community. So Git isn't GitHub, and if you still have any doubt you can [learn a bit more on differences here](https://jahya.net/blog/git-vs-github/).

GitHub is the _de facto_ service used by the open source community, and that's why it got so much traction, since offers free unlimited public repositories. Many companies rely on GitHub for private repositories too.

Some of the features include a **nice UI to navigate your code**, the ability to **clone other user's public projects** and start working on them under your account. It also works as a **social network for developers**.

Since front end development relies heavily on open source projects and GitHub is the _plaza_ where everything happens, on the long run I suggest you start exploring it, as there is much more to it than what it may seem at a first glance. Often companies request to see your GitHub account to valuate your eligibility for a particular position.

I have been contributing to the open source community filing pull requests for various projects in the last months. Since than got to talk with awesome people that work on awesome projects, and being able to help them has been such a great experience so far.

### IDE: Atom / VSCode / SublimeText

Integrated Development Environments are softwares that help the user with the development of a software program. They look like a more powerful text editor.

Some of the common features are:

* Syntax highlighting
* Project tree navigator
* Code linting tools
* Auto code completion
* many more

Since the IDE is where the developer spends most of his/her time, the choice of which IDE to use is very personal, and if you search online it looks pretty much like a softer version of the [pc/console master race](https://en.wikipedia.org/wiki/PC_Master_Race).

For me the important thing to understand here is that these programs are meant to facilitate, improve and speed up the developer experience and you shouldn't tie yourself emotionally to one or another for any reason. I personally tried many IDEs, and lately set on [Atom](https://atom.io/) (for JavaScript/JSX) and [VSCode](https://code.visualstudio.com/) for TypeScript.

As they all are pretty powerful and eventually provide the same functionalities (more or less) it's a plain matter of personal taste.

### Module bundler

Module bundlers take care of wrapping all your code (and all its dependency) together and **produce a single bundled file** to be deployed. You can also apply **additional transformations to your code**, such a transpilation, minification, prefixing, programatic changes and so on.

Here is where ES6/TypeScript gets transpiled to JavaScript and often where SASS / Less is compiled to CSS.

These are very powerful tools and as such tend to be complicated. **Getting to know even one very well takes time**, so don't worry if you don't get everything the first time.

Choosing which one to use is also a difficult task, each one has its ups and downs and they are not perfect by far. I've been working with [Webpack](https://webpack.github.io/) for the past year and I love it. It has everything _I need_. Maybe it's not for you. I suggest you take a deep look at what each one can do before you decide, but also take in consideration how steep is the relative learning curve.

### JavaScript Transpiler: Babel / Typescript

As already said before, transpiling code is necessary if you consider to use ES6, TypeScript, CoffeScript or any other language meant for the front end. Since these languages cannot be understood and ran by the browsers, **you need to transform them to standard ES5**.

Since ES6 is an approved version of the JavaScript language, it's the only one that is getting support by the modern browsers. By the time of this writing, every major [browser supports 90%+ of ES6](https://kangax.github.io/compat-table/es6/) syntax in their latest/beta version. They point is, contrary to languages like TypeScript / CoffeScript, **eventually ES6** (and the new version to come each year) **will be fully supported** and you will be able to skip the transpiling step.

In practice, what you want to do is to add a step in the module bundler by tying up the transpiler. [Babel](https://babeljs.io/) is de-facto solution for ES6 transpilation by [Sebastian McKenzie](https://twitter.com/sebmck), and it even supports the JSX syntax used in React.
For me this is where most magic happens. This tool is so great that every JavaScript Engineer in Facebook use it. **You really gotta thank this guy**.

### CSS Preprocessors: SASS / LESS

CSS is a very primitive. Not as much in terms of styling / events possibility, but rather related to the developer experience: stuff like variables, operations, functions, inheritance. If you have worked on any medium-to-big project, you know that **maintaining the code base is rather difficult**, you often find yourself with dead code (styles that are not used anywhere, but you cannot/won't delete in fear of breaking something or because you simply don't know it's not even used), a ton of styles repetition and so on. [People came up](http://rscss.io/) with [strong guidelines](http://primercss.io/) on how to [write CSS smartly](https://github.com/airbnb/css), and I suggest you have a look at them, but **they are simply not enough**.

CSS Preprocessors are scripting languages that extend CSS and get compiled to the CSS syntax. The concept is very similar to what is TypeScript/CoffeScript to JavaScript.

Some of the common features you will find are: _reusable variables_, ability to _nest your definitions_, code splitting with `@import`, _mixins_, _inheritance_, _operations_ and many more.

Luckily SASS/LESS syntax is very similar to the standard one, so when you write code it feels like writing normal CSS with superpowers. I think you really need to dive in, to finally have the _a-ha_ moment and realise you will never go back.

### Code linting: ESLint

Code linters are tools that programatically read your code and **spot possible errors** (bugs) as well as check for **code style consistency**.

The term _lint_ comes for a Linux software that reads your `C` code and statically find bugs before compiling. Since than every software that does a similar job has been label as a _linter_.

Too often bugs are related to simple typos, like forgetting a semicolon or a colon, writing conditional statements that can't be reached or stuff like that. In addition, when you work in team, having a way to enforce style consistency is vital for the longevity of the project.

Code linting is one of the best tools in terms of fatigue/benefits ratio. You just have to turn on the tool and that's it! Warnings and errors will start to pop-up, and trust me, you are going to **save tons of hours in debugging** your code.

Since **every modern IDE has a linter** in form of plugin or even bundled in, there isn't much to say about it to get started, just follow some guide on how to activate it in your IDE.

I personally use [ESLint](https://github.com/eslint/eslint) in the form of the [linter-eslint](https://atom.io/packages/linter-eslint) package for Atom. What I love about ESLint is the ability to specify linting rules on a project/folder basis by dropping a `.eslintrc` file in the folder with some JSON inside.

When I started using it I often felt a strange feeling of hate/love, the main reason being I didn't want to really learn using the tool and just left the default options (rules). Since then the latest versions of _ESLint_ don't have rules by-default, and this enforces you to choose which one to use. [And there are a ton](http://eslint.org/docs/rules/).

Some [companies](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) and people even released what they think is the best set of rules that fit their needs. My advise is to start from one of those and tweak it to your style. This way you may find new best practices you weren't aware of before.

### Testing: Ava / Mocha / Tape

I find testing one of the most difficult topic to talk about, probably because I'm not a great tester myself. **Testing requires discipline and time**, but more than anything, **requires experience**. The experience to understand what is important to test, and as you go on and learn the way up, the experience to write testable code.

By testing I don't mean opening up your browser, dropping in a .js file and _see if it works_, maybe by checking some console statements. Those are for debugging. **Testing is the practise to write specific code** that runs your source code and **checks that everything works as expected**, by making assertions.

In front end development there are two types of tests: _unit tests_ and _integration tests_.

**Unit test focus on testing small portions of your code**. You have written a function that makes some calculations based on some input. Are you sure the function performs as you expect with any given input? just test it!

**Integration test focus on the interaction of the user with the application**. Given a user input (mouse click, keyboard pressed), does the application behave as expected? Does it show what it's supposed to show?

They are two fundamentally different things, the first one being more abstract, easier to write and to run, the second one being more practical, verbose and complex to run in an automated way.

There are lots of tools/framework/suits to run your tests in automated way. Lately I'm running my unit tests with [ava](https://github.com/avajs/ava) and I like it so far.

This is certainly the most advanced topic, so I suggest you feel confident about the rest before starting to dive in, or you will feel overwhelmed in no time.

---

Getting started with modern front end development can be tough, everything changes so fast a lot people complain about the so-called [javascript fatigue](https://medium.com/@ericclemmons/javascript-fatigue-48d4011b6fc4#.a9myuq8dk). For me this is what drives me to be a better developer every day.

I really hope this blog post can be helpful for anyone that find him/herself in a position to face this environment for the first time.

I'd really like you to share your experiences and workflow so we can help each other and build a greater community.
