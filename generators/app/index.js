const commonGenerator = require('../commonGenerator');

module.exports = class extends commonGenerator {
    constructor(args, opts) {
        super(args, opts);

        this.ignoreFiles = {
            babel: '.babelrc.ejs',
        };
    }

    async prompting() {
        this.answers = await this.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'Input project name: ',
                default: this.appname, // Default to current folder name
            },
            {
                type: 'confirm',
                name: 'babel',
                message: 'babel | Would you like to enable the babel feature?',
            },
            {
                type: 'confirm',
                name: 'scss',
                message: 'scss | Would you like to enable the scss feature?',
            },
            {
                type: 'confirm',
                name: 'react',
                message: 'react | Would you like to enable the react feature?',
            },
            {
                type: 'confirm',
                name: 'devServer',
                message:
                    'webpack-dev-server | Would you like to enable the dev server feature?',
            },
            {
                type: 'confirm',
                name: 'htmlWebpackPlugin',
                message:
                    'html-webpack-plugin | Would you like to enable the html webpack plugin feature?',
            },
        ]);
    }

    writing() {
        super.writing();
    }

    end() {
        super.end();
    }
};
