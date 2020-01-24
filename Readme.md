# Biotope, a toolchain for lasting design systems.
![shield build](https://img.shields.io/travis/biotope/biotope.svg?label=build)
![shield npm](https://img.shields.io/npm/v/biotope.svg)
Biotope helps you to build, distribute and adopt a library of web components with a consistent design and of high quality across all your websites and apps. With Biotope you can easily collaborate with your team to develop and maintain the user interface of all your digital experiences from a single location.

If you want to learn more about Biotope and how you can benefit from using this toolchain please visit [https://biotope.sh](https://biotope.sh)

## Quick Start
### Installation
First and foremost, you need to install biotope either as global package:
```bash
npm i biotope -g
```

After that you can use the biotope commandline tool to start a new biotope project.

### Setup your first project
Setting up your first biotope instance, you should just trust the cli tool to setup your project. Just run:
```
biotope create [project-name]
```
This command will ask you some questions and create a new [biotope-boilerplate](https://github.com/biotope/biotope-boilerplate) instance.  
After the tool is done, you can change directory to the newly generated biotope instance and run it:
```
cd [project-name]
npm start
```

### Developing your first component
After starting your project, if you've chosen the empty instance, you should see an empty overview page.  
Now to add your first component, just run
```
biotope generate
```
After asking you some questions, a new component will be created and ready to be developed.
After that, you can go into the newly generated files an change them at your will.