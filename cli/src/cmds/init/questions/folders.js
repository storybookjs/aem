const prompts = require('prompts');
const path = require('path');

const getDirectories = require('../../../utils/getDirectories');
const getChoicesFromDirectories = require('../../../utils/getChoicesFromDirectories');

const cwd = process.cwd();

module.exports = async (args, config) => {

    const uiAppsQuestions = [{
        type: 'select',
        name: 'uiApps',
        message: `Please select the ui.apps folder`,
        choices: getChoicesFromDirectories(config,''),
        format: res => `./${res}`
    }];

    const uiAppsAnswers = await prompts(uiAppsQuestions);

    config = { 
        ...config, 
        ...uiAppsAnswers,
        jcrRootPath: `${uiAppsAnswers.uiApps}/src/main/content/jcr_root/apps/`
    };

    // This is kinda brittle. need to make this more reliable
    const namespaces = getDirectories(path.resolve(cwd, config.projectRoot, config.relativeProjectRoot, config.jcrRootPath));
    const namespaceQuestion = [
        {
            type: 'select',
            name: 'namespace',
            message: 'What is the project namespace?',
            choices: () => {
                let options = [];

                namespaces.forEach( name => {
                    options.push({
                        title: name,
                        value: name
                    })
                });
                return options;
            },
            format: res => res
        },
    ]
    const namespaceAnswers = await prompts(namespaceQuestion);
    const namespace = namespaceAnswers.namespace; 
    
    config.namespace = namespace;

    const componentClientlibQuestions = [
        {
            type: 'select',
            name: 'componentPath',
            message: `Please select the components folder`,
            choices: getChoicesFromDirectories(config,`${config.jcrRootPath}${namespace}`),
            format: res => `${config.jcrRootPath}${namespace}/${res}`
        },
        {
            type: 'select',
            name: 'clientlibsPath',
            message: `Please select the clientlibs folder`,
            choices: getChoicesFromDirectories(config,`${config.jcrRootPath}${namespace}`),
            format: res => `${config.jcrRootPath}${namespace}/${res}`
        }
    ];

    const componentClientlibAnswers = await prompts(componentClientlibQuestions);
    config = {
        ...config,
        ...componentClientlibAnswers
    }

    return config;
}