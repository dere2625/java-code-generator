var Generator = require('yeoman-generator');
module.exports = class extends Generator {
    
    async prompts() {
        this.answers = await this.prompt([
            {
                type: 'input',
                name: 'templatePath',
                message: 'Where is your template file?',
            }
        ]);
    }  


    readAndGenerateFiles(){
        
        var temp = JSON.parse(JSON.stringify(this.fs.readJSON(
            this.answers.templatePath
        )));
        
        var templateFile  = temp.properties;

        templateFile.forEach(element => {
            this.fs.copyTpl(
                this.templatePath('./Java/Init'),
                this.destinationPath(element.projectLocation+'/'
                                    +temp.appName+'/'+ 
                                    element.projectName+'.java'),
                {
                    'projectName' : element.projectName,
                    'projectType' : element.projectType,
                    'appName' : temp.appName
                }
            );
        });;

        
    }
}