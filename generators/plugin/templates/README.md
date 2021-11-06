# <%= pluginName %>

<%= description %>

## Setup Development Environment

Before starting your workstation will need the following:

* [Docker](https://www.docker.com/)
* [Lando](https://lando.dev/)

1. Clone the repository

`git@github.com:<your org>/<%= pluginDash %>.git`

2. Start Lando

```bash
cd <%= pluginDash %>
make start
```

When finished, Lando will give you the local URL of your site. You can finish the WordPress setup there.

WordPress Credentials:

__URL:__ _https://<%= pluginDash %>.lndo.site/wp-admin_

__Admin User:__ _admin_

__Admin Password:__ _password_

You can open the site in your default browser with

```bash
make open-site
```

If you would like to access the database directly, I recommend [TablePlus](https://tableplus.com). If it, or any other app that can support MySQL links, is installed use the following command to open your database directly in the app:

```bash
make open-db
```

*Note: The "open" commands were developed on Mac and may not work on another OS. You can edit the `Makefile` to adjust the appropriate commands for your operating system.*

## Using Xdebug

Xdebug 3 released a [number of changes](https://xdebug.org/docs/upgrade_guide) that affect the way Xdebug works. Namely, it no longer listens on every request and requires a "trigger" to enable the connection. Use one of the following plugins to enable the trigger on your machine:


* [Xdebug Helper for Firefox](https://addons.mozilla.org/en-GB/firefox/addon/xdebug-helper-for-firefox/) ([source](https://github.com/BrianGilbert/xdebug-helper-for-firefox)).
* [Xdebug Helper for Chrome](https://chrome.google.com/extensions/detail/eadndfjplgieldjbigjakmdgkmoaaaoc) ([source](https://github.com/mac-cain13/xdebug-helper-for-chrome)).
* [XDebugToggle for Safari](https://apps.apple.com/app/safari-xdebug-toggle/id1437227804?mt=12) ([source](https://github.com/kampfq/SafariXDebugToggle)).


## Build and Testing

The only current build asset is the .pot file for internationalization. Build it with the following:

```bash
make build
```

Note, assets will also build during the install phase.

The project uses the [Brain Monkey](https://brain-wp.github.io/BrainMonkey/) library for unit testing. Once setup run the following for unit tests:

```bash
make test-phpunit
```

We also use [PHP_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer) with [WordPress Coding Standards](https://github.com/WordPress/WordPress-Coding-Standards) and [JSHint](http://jshint.com/) with [WordPress' JS Standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/javascript/#installing-and-running-jshint). Linting will automagically be setup for you if you use [Visual Studio Code](https://code.visualstudio.com/). If you want to run it manually use the following:

```bash
make test-lint
```

or, to run an individual lint (php or javascript), use one of the following:

```bash
make test-lint-php
```

```bash
make test-lint-javascript
```

You can run all testing (all lints and unit tests) together with the following:

```bash
make test
```

Screw something up? You can reset your environment with the following. It will stop the environment and cleanup and the build files as well as anything downloaded.

```bash
make reset
```

## Preparing for release

To generate a .zip that can be uploaded through any normal WordPress plugin installation workflow, simply run the following:

```bash
make release
```
