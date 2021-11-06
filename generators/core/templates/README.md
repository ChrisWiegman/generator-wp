# WordPress Development Site

A local site for testing WordPress products/code/etc.

## Setup Development Environment

Before starting your workstation will need the following:

- [Docker](https://www.docker.com/)
- [Lando](https://lando.dev/)

2. Start Lando

```bash
cd <%= appDash %>
make start
```

When finished, Lando will give you the local URL of your site. You can finish the WordPress setup there.

WordPress Credentials:

**URL:** _https://<%= appDash %>.lndo.site/wp-admin_

**Admin User:** _admin_

**Admin Password:** _password_

You can open the site in your default browser with

```bash
make open-site
```

If you would like to access the database directly, I recommend [TablePlus](https://tableplus.com). If it, or any other app that can support MySQL links, is installed use the following command to open your database directly in the app:

```bash
make open-db
```

_Note: The "open" commands were developed on Mac and may not work on another OS. You can edit the `Makefile` to adjust the appropriate commands for your operating system._

Screw something up? You can reset your environment with the following. It will stop the environment and cleanup and the build files as well as anything downloaded.

```bash
make reset
```
