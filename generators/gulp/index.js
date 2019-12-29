const commonGenerator = require('../commonGenerator');

module.exports = class extends commonGenerator {
    constructor(args, opts) {
        super(args, opts);
    }

    async prompting() {
        this.answers = await this.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'Input project name: ',
                default: this.appname, // Default to current folder name
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
