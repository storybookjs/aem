const prompts = require('prompts');
const path = require('path');

const getChoicesFromDirectories = require('../../../utils/getChoicesFromDirectories');
const getAllFilesOfType = require('../../../utils/getAllFilesOfType');

const cwd = process.cwd();

module.exports = async (args, config) => {

    const getClientlibChoices = files => {
        const choices = [];
        files.forEach( file => {
            let title = path.relative(path.resolve(cwd, config.projectRoot, config.relativeProjectRoot, config.clientlibsPath),path.resolve(file));
            let filename = `./${path.relative(path.resolve(cwd, config.projectRoot, config.relativeProjectRoot),path.resolve(file))}`;
            choices.push({
                title: title,
                value: filename
            })
        });
        return choices;
    }

    const clientlibQuestions = [
        {
            type: 'multiselect',
            name: 'clientlibs',
            message: 'Please select clientlib(s) you will need globally',
            choices: getChoicesFromDirectories(config, config.clientlibsPath),
            format: values => {
                let formattedValues = [];
                values.forEach( value => {
                    formattedValues.push({ 
                        name: value,
                        path: `${config.clientlibsPath}/${value}`,
                        aemPath: `/etc.clientlibs/${config.namespace}/clientlibs/${value}`
                    });
                });
                return { clientlibs: formattedValues };
            }
        }
    ];

    const clientlibAnswers = await prompts(clientlibQuestions);

    /*
    const clientlibSpecifics = [];

    if (clientlibAnswers.clientlibs.clientlibs.length) {
        clientlibAnswers.clientlibs.clientlibs.forEach(clientlib => {

            const directory = path.resolve(cwd, config.projectRoot, config.relativeProjectRoot, clientlib.path);
            let cssFiles = getClientlibChoices(getAllFilesOfType({
                type: [ '.css', '.less', '.sass' ],
                directory: directory
            }));
            let jsFiles =  getClientlibChoices(getAllFilesOfType({
                type: [ '.js', '.jsx', '.ts', '.tsx' ],
                directory: directory
            }));

            if (cssFiles.length) {
                clientlibSpecifics.push({
                    type: 'select',
                    name: `${clientlib.name}|cssEntry`,
                    message: `Please select the main - ${config.cssPreProcessor.toUpperCase()} - file for the - ${clientlib.name} - clientlib:`,
                    choices: cssFiles
                });
            }

            if (jsFiles.length) {
                clientlibSpecifics.push({
                    type: 'select',
                    name: `${clientlib.name}|jsEntry`,
                    message: `Please select the main - JS -  file for the - ${clientlib.name} - clientlib:`,
                    choices: jsFiles
                });
            }
        });

        if (clientlibSpecifics.length) {
            const clientlibSpecificAnswers = await prompts(clientlibSpecifics);
            clientlibAnswers.clientlibs.clientlibs.forEach(clientlib => {
                clientlib.aemPath = `/etc.clientlibs/${config.namespace}/clientlibs/${clientlib.fullname}`;
                if ( clientlibSpecificAnswers.hasOwnProperty(`${clientlib.name}|cssEntry`) ) clientlib.cssEntry = clientlibSpecificAnswers[`${clientlib.name}|cssEntry`];
                if ( clientlibSpecificAnswers.hasOwnProperty(`${clientlib.name}|jsEntry`) ) clientlib.jsEntry = clientlibSpecificAnswers[`${clientlib.name}|jsEntry`];
            })
        }
    }
    */

    return { ...config, ...clientlibAnswers.clientlibs }
}