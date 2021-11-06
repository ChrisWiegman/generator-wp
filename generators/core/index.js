const Generator = require('yeoman-generator');

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
    super(args, opts, {customInstallTask: (preferredPm) => { }});
  }

  /**
   * Write out the app files.
   *
   * @since 1.0.0
   */
  writing() {
    const appDash = this.appname
        .trim()
        .replace(/[ -]/g, '-')
        .toLowerCase();
    const appNoSpaces = appDash.replace(/-/g, '');

    const templateAtts = {
      appDash: appDash,
      appNoSpaces: appNoSpaces,
    };

    // process files requiring template vars
    [,
      'Makefile',
      '_.lando.yml',
      'README.md',
    ].forEach((template) => {
      let destination = template;
      if (destination[0] == '_') {
        destination = destination.substring(1);
      }

      this.fs.copyTpl(
          this.templatePath(template),
          this.destinationPath(destination),
          templateAtts,
      );
    });
  }
};
