var Generator = require('yeoman-generator');
module.exports = class extends Generator{
    constructor(args, opts){
        super(args, opts);
        this.option('babel');
    }

    method1(){

        this.log('Third one');
    }
};