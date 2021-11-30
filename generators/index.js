var Generator = require('yeoman-generator');
module.exports = class extends Generator{
    constructor(args, opts){
        super(args, opts);
        this.option('babel');
    }

    method1(){
        this.log('Welcome to Excellerent\'s Awesome code Generator for Java/Spring');
    }

    async typePrompt(){
        this.typeAnswer  = await this.prompt([
            {
                type : 'list',
                name : 'projectType',
                choices : ['Java', 'Spring' , 'Microservices'],
                message : 'What type of project do you want to create?'
            }
        ])
    }

    async namePrompt(){
        this.nameAnswer = await this.prompt([
            {
                type :'input',
                name : 'projectName',
                message : 'What will be your project name?',
                default : this.appname
            }
        ])
    }

    async descriptionPrompt(){
        this.descriptionAnswer = await this.prompt([
            {
                type :'input',
                name : 'description',
                message : 'What will be your project Description?',
                default : this.appname
            }
        ])
    }

    async locationPrompt(){
        this.locationAnswer = await this.prompt([
            {
                type : 'input',
                name :'projectLocation',
                message : 'Where do you want to put your project?'   
            }
        ])
    }

    async templateLocation(){
        this.templateAnswer = await this.prompt([
            {
                type : 'input',
                name : 'templatePath',
                message : 'Where is your template file?'
            }
        ])
    }

    async validationRequest(){
        this.validationAnswer = await this.prompt([
            {
                type :'confirm',
                name : 'includeValidation',
                message : 'Do you want to include Bean validation?',
                default : 'Y'
            }
        ])
    }

    async dbmsChoice(){
        this.databaseChoice = await this.prompt([
            {
                type : 'list',
                name : 'dbmsChoice',
                choices : ['PostgreSQL','MongoDB','MS SQL'],
                message : 'What kind of DBMS do you want to choose?'
            }
        ])
    }

    async sessionChoice(){
        this.sessionStyleChoice = await this.prompt([
            {
                type : 'list',
                name : 'sessionChoice',
                choices : ['JWT (Stateless)','Http (Stateful)'],
                message : 'What type of Session Management do you want to use?'
            }
        ])
    }

    async authenticationChoice(){
        this.authenticationStyleChoice = await this.prompt([
            {
                type : 'list',
                name : 'authenticationChoice',
                choices : ['JWT (JSON Web Token)'],
                message : 'What type of Authentication do you want to use?',
                default : 'JWT'
            }
        ])
    }
    async packageName(){
        this.packageFolder = await this.prompt([
            {
                type : 'input',
                name : 'packageName',
                message : 'What will be your package name',
                default : 'com.example'
            }
        ])
    }

    async ormChoice(){
        this.ormSelection = await this.prompt([
            {
                type : 'list',
                name : 'ormSelection',
                choices : ['Hibernate'],
                message : 'What type of ORM tool do you want to use?',
                default : 'Hibernate'
            }
        ])
    }

    async documentationChoice(){
        this.documentationSelection = await this.prompt([
            {
                type : 'list',
                name : 'documentationSelection',
                choices : ['Swagger'],
                message : 'What type of API Documentation tool do you want to use?',
                default : 'Swagger'
            }
        ])
    }

    async versionChoice(){
        this.versionAnswer = await this.prompt([
            {
                type : 'input',
                name : 'version',
                message : 'What\'s you application version?',
                default : '1.0.0-SNAPSHOT'
            }
        ])
    }

    async apiPath(){
        this.apiPathAnswer = await this.prompt([
            {
                type : 'input',
                name : 'api',
                message : 'Please specify your API Path'
            }
        ])
    }

    async write(){
        this.log('Your Selections:');
        this.log('Your Project Type: '+this.typeAnswer.projectType);
        this.log('Your Project Name: '+this.nameAnswer.projectName);
        this.log('Your Project Location: '+this.locationAnswer.projectLocation);
        this.log('Your Template Location: '+ this.templateAnswer.templatePath);
    }

    async confirmation(){
        this.confirmationAnswer = await this.prompt([
            {
                type: 'confirm',
                name: 'finalConfirmation',
                message: 'Are the above selections correct and you want to proceed?',
                default: 'Y'  
            }  
        ])
        
    }
    

    readAndGenerateFiles(){
        
        
        var folderTemplate = JSON.parse(JSON.stringify(this.fs.readJSON('./templateStructure.json')));
        var subs = folderTemplate.filter((element) => element.templateType == this.typeAnswer.projectType)[0];
        var allSubs = subs.subFolders;
        
        var packages = this.packageFolder.packageName.split('.');
        var mainDirectory = this.locationAnswer.projectLocation+'/'+this.nameAnswer.projectName+'/src/main/java/'+packages[0]+'/'+packages[1];
        var packageDirectory = mainDirectory+'/'+this.nameAnswer.projectName;
        var pomDirectory = this.locationAnswer.projectLocation+'/'+this.nameAnswer.projectName+'/';

        allSubs.forEach(element => {
            this.fs.copy(
                this.templatePath('./Spring/init'),
                this.destinationPath(packageDirectory+'/'+element+'/'+element+'.java'),{
                    'projectName' : this.nameAnswer.projectName,
                    'className' : element,
                    'individualPackageName' : this.packageFolder.packageName+'.'+this.nameAnswer.projectName+'.'+element,
                }
            )
        });
        
        this.fs.copyTpl(
            this.templatePath('./Spring/init'),
            this.destinationPath(mainDirectory+'/'+this.nameAnswer.projectName+'/'+this.nameAnswer.projectName+'Application.java'),{
                
                'packageName' : this.packageFolder.packageName+'.'+this.nameAnswer.projectName,
                'controllerPackage' : this.packageFolder.packageName+'.'+this.nameAnswer.projectName + '.'+ 'controllers',
                'repositoryPackage' : this.packageFolder.packageName+'.'+this.nameAnswer.projectName + '.'+ 'repository',
                'servicePackage' : this.packageFolder.packageName+'.'+this.nameAnswer.projectName + '.'+ 'services',
                'modelPackage' : this.packageFolder.packageName+'.'+this.nameAnswer.projectName + '.'+ 'models',
                'appName' : this.nameAnswer.projectName
            }
        );

        this.fs.copyTpl(
            this.templatePath('./Spring/pom.xml'),
            this.destinationPath(pomDirectory+'/'+'pom.xml'),{
                
                'packageName' : this.packageFolder.packageName,
                'appName' : this.nameAnswer.projectName,
                'version' : this.versionAnswer.version,
                'description' : this.descriptionAnswer.description
            }
        )
    }

    
};