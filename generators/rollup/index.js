const commonGenerator = require('../commonGenerator');

module.exports = class extends commonGenerator {
    constructor(args, opts) {
        super(args, opts);

        this.ignoreFiles = {
            typescript: 'tsconfig.json.ejs',
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
                name: 'typescript',
                message:
                    'typescript | Would you like to enable the typescript feature?',
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
