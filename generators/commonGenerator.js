/**
 * * Created by lee on 2019/7/12
 *
 * 与run loop相关的方法，需要在父类中显示调用，initializing、prompting、configuring、default、writing、conflicts、install、end
 * 例如：app/index.js中 end(){super.end()}
 *
 * 自定义方法符合class extends规则，例如_ignoreFile
 */

const Generator = require('yeoman-generator');
const yosay = require('yosay');
const { getAllFilesInDir } = require('../utils/fs');

class commonGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.ignoreFiles = {
            // typescript: 'tsconfig.json.ejs',
            // babel: '.babelrc.ejs',
        };
    }

    _ignoreFile(name) {
        let ignore = false;
        Object.keys(this.ignoreFiles).forEach(ignoreFile => {
            if (
                this.answers[ignoreFile] !== true &&
                name === this.ignoreFiles[ignoreFile]
            ) {
                ignore = true;
            }
        });
        return ignore;
    }

    writing() {
        // 递归处理文件
        this.log(this.answers);
        let templatesRoot = this.sourceRoot();
        let files = getAllFilesInDir(templatesRoot);

        // 去掉前缀
        files = files.map(file => file.replace(templatesRoot + '/', ''));

        files = files.filter(file => {
            return !this._ignoreFile(file);
        });

        this.log(this.destinationPath());
        files.forEach(file => {
            this.fs.copyTpl(
                this.templatePath(file),
                // webpack.config.js.ejs -> webpack.config.js
                this.destinationPath(
                    `${this.answers.projectName}/${file.replace('.ejs', '')}`
                ),
                {
                    projectName: this.answers.projectName,
                    devServer: this.answers.devServer,
                    babel: this.answers.babel,
                    scss: this.answers.scss,
                    htmlWebpackPlugin: this.answers.htmlWebpackPlugin,
                    react: this.answers.htmlWebpackPlugin,
                    typescript: this.answers.typescript,
                }
            );
        });
    }

    end() {
        this.log(
            yosay(`
========================
cd ${this.answers.projectName} && npm i
npm start
========================
        `)
        );
    }
}

module.exports = commonGenerator;
