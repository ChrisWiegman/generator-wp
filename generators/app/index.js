const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
  /**
   * Let's users know to pick a valid generator.
   *
   */
  notify() {
    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('Invoke a valid sub-generator to get started!'));
    this.log('Available Generators:');
    this.log(chalk.green(
        // eslint-disable-next-line max-len
        '\tyo wp:core - A basic WordPress install for testing products/code/etc.\n',
        '\tyo wp:plugin - A general purpose WordPress plugin\n',
    ));
  }
};
