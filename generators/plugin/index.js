const Generator = require("yeoman-generator");
const TitleCase = require("title-case");
module.exports = class extends Generator {
  /**
   * Edit Generator options
   *
   * @since 1.0.0
   *
   * @param {*} args
   * @param {*} opts
   */
  constructor(args, opts) {
    // Disables npm install by default.
    super(args, opts, { customInstallTask: (preferredPm) => {} });
  }

  /**
   * Builds template Attributes
   *
   * @since 1.0.0
   *
   * @return {Object}
   */
  getTemplateAtts() {
    // eslint-disable-next-line max-len
    const longOrgPrefixLowercase = this.answers.longOrgPrefix.toLowerCase();
    const pluginUnderscore = this.appname
      .trim()
      .replace(/[ .-]/g, "_")
      .toLowerCase();
    const pluginDash = pluginUnderscore.replace(/_/g, "-");
    const pluginNoSpaces = pluginDash.replace(/-/g, "");
    const pluginConst =
      this.answers.longOrgPrefix.toUpperCase() +
      "_" +
      pluginUnderscore.toUpperCase();
    const packageName = this.answers.pluginName.trim().replace(/[ .-]/g, "_");

    return {
      pluginName:
        this.answers.pluginName.charAt(0).toUpperCase() +
        this.answers.pluginName.slice(1),
      longOrgPrefix: this.answers.longOrgPrefix,
      authorName: this.answers.authorName,
      authorEmail: this.answers.authorEmail,
      authorWebsite: this.answers.authorWebsite,
      packageName: packageName,
      projectHome: this.answers.projectHome,
      pluginDash: pluginDash,
      pluginConst: pluginConst,
      description: this.answers.description,
      pluginUnderscore: pluginUnderscore,
      orgPrefix: this.answers.orgPrefix,
      longOrgPrefixLowercase: longOrgPrefixLowercase,
      pluginNoSpaces: pluginNoSpaces,
      repoLocation: this.answers.repoLocation,
    };
  }

  /**
   * Supplies the prompts used for getting started.
   *
   * @since 1.0.0
   */
  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "pluginName",
        message: "The Plugin Name",
        // Default to current folder name
        default: TitleCase.titleCase(this.appname),
      },
      {
        type: "input",
        name: "longOrgPrefix",
        message: "The organization name to use as a prefix. Alpha only",
        default: "ACME_Plugin_Company",
      },
      {
        type: "input",
        name: "orgPrefix",
        message:
          "The abbreviated organization name to use as a prefix. Alpha only",
        default: "acme",
      },
      {
        type: "input",
        name: "description",
        message: "Plugin Description",
        default: "My awesome WordPress plugin",
      },
      {
        type: "input",
        name: "repoLocation",
        message: "GIT Repository",
      },
      {
        type: "input",
        name: "projectHome",
        message: "Project homepage",
        default: "https://wordpress.org",
      },
      {
        type: "input",
        name: "authorName",
        message: "Author name",
        default: "Awesome Plugin Dev",
      },
      {
        type: "input",
        name: "authorEmail",
        message: "Author email",
        default: "nota@realemail.no",
      },
      {
        type: "input",
        name: "authorWebsite",
        message: "Author homepage",
        default: "https://wordpress.org",
      },
    ]);
  }

  /**
   * Write out the plugin files.
   *
   * @since 1.0.0
   */
  writing() {
    const templateAtts = this.getTemplateAtts();

    // copy raw files to destination
    [
      "_.vscode/extensions.json",
      "_.vscode/settings.json",
      "_.github/workflows/testing.yml",
      "src/scripts/starter-script.js",
      "src/lib/.githold",
      "_.eslintrc.js",
      "_.prettierignore",
      "_.prettierrc.json",
      "phpunit.xml.dist",
      "_.zipignore",
    ].forEach((template) => {
      let destination = template;
      if (destination[0] == "_") {
        destination = destination.substring(1);
      }

      this.fs.copy(
        this.templatePath(template),
        this.destinationPath(destination)
      );
    });

    // process files requiring template vars
    [
      "_.vscode/launch.json",
      "uninstall.php",
      "tests/phpunit/bootstrap.php",
      "tests/phpunit/test-plugin-file.php",
      "package.json",
      "_.gitignore",
      "composer.json",
      "_.lando.yml",
      "Makefile",
      "README.md",
      "phpcs.xml",
    ].forEach((template) => {
      let destination = template;
      if (destination[0] == "_") {
        destination = destination.substring(1);
      }

      this.fs.copyTpl(
        this.templatePath(template),
        this.destinationPath(destination),
        templateAtts
      );

      this.fs.copyTpl(
        this.templatePath("index.php"),
        this.destinationPath(templateAtts.pluginDash + ".php"),
        templateAtts
      );
    });
  }
};
