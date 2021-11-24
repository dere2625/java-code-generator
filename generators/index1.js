var Generator = require('yeoman-generator');
module.exports = class extends Generator{
    constructor(args, opts){
        super(args, opts);
        this.option('babel');
    }

    method1(){
        this.log('Welcome to Excellerent\'s Awesome code Generator for Java/Spring');
    }

    async prompts() {
        this.answers = await this.prompt([
            {
                type: 'list',
                name: 'projectType',
                choices: ['Java','Spring Boot','MicroService'],
                message: 'What type of project do you want to create?',
            },
            {
                type:'input',
                name: 'projectName',
                message: 'What will be your project name?',
                default: this.appname
            },
            {
                type: 'input',
                name:'projectLocation',
                message: 'Where do you want to put your project?',
                
            },
        ]);
        
    }

    write(){
        this.log('Your Selections:');
        this.log('Your Project Type: '+this.answers.projectType);
        this.log('Your Project Name: '+this.answers.projectName);
        this.log('Your Project Location: '+this.answers.projectLocation);
    }

    async confirmation(){
        this.confirmation = await this.prompt([
            {
                type: 'confirm',
                name: 'finalConfirmation',
                choices: ['Java','Spring Boot','MicroService'],
                message: 'Are the above selections and you want to proceed?',
                default: 'Y'  
            }

            
        ])
        
    }

    fillTemplates(){
        this.fs.copyTpl(
            this.templatePath('./Java/Init'),
            this.destinationPath(this.answers.projectLocation+'/'+this.answers.projectName+'/'+ this.answers.projectName+'.java'),
            {
                'projectName' : this.answers.projectName,
                'projectType' : this.answers.projectType 
            }
        );
    }
    

    
};