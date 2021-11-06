# WordPress Project Generator

Generator-wp is a [Yeoman](http://yeoman.io) generator for generating a base WordPress project.

## Installation

To use this generator you will need [NodeJS](https://nodejs.org/en/) installed on your computer.

Once you have Node ready to go, you can install [Yeoman](http://yeoman.io) through npm:

```
$ npm install -g yo
```

To install generator-wp clone this repository, enter the directory, and link it to npm:

```
$ git clone git@github.com:ChrisWiegman/generator-wp.git && cd generator-wp
$ npm install
$ npm link
```

## Usage

In the desired project directory (where your project will go), initiate the generator:

```
$ yo wp:<project-type>
```

For each project type you get:

- Composer to manage server-side dependencies
- NPM to manage development dependencies
- i18n .pot file generation
- [PHPUnit](https://phpunit.de) for PHP unit testing
- A fully-fleshed out, name-spaced setup for WordPress development (if appropriate)
- A Lando configuration to get you actually working on code quickly

Current project types include the following:

### WordPress core

This sub-generator scaffolds out a WordPress installation for testing of products/code/etc. It is not designed to be a base for a plugin or other project.

```
$ cd [wordpress-directory]
$ yo wp:core
```

Note the core project does not come with testing tools nor does it generate a .pot file or other assets. It is solely a core install of WordPress for testing anything you might need to.

### Plugin

This sub-generator scaffolds out a standard WordPress plugin.

```
$ cd [my-plugin-dir]
$ yo wp:plugin
```

#### Notes

Before getting started you should create your repository on your platform of choice. Use the plugin slug for the repository name. For example, if your plugin were to appear in a WordPress installation in the folder `wp-my-super-plugin` than your repository should be called `wp-my-super-plugin`

For information on developing and using a generated plugin see the README.md file within after generating.

**More project types coming soon**
