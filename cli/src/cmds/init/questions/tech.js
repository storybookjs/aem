const prompts = require('prompts');

module.exports = async (args,config) => {
    const questions = [
        {
            type: 'select',
            name: 'cssPreProcessor',
            message: `Please select your CSS pre-processor`,
            choices: [
                { title: 'None', value: 'css' },
                { title: 'LESS', value: 'less' },
                { title: 'SASS', value: 'sass' },
            ]
        },
        /*
        {
            type: 'select',
            name: 'jsFramework',
            message: `Please select your JS framework`,
            choices: [
                { title: 'None', value: 'react' },
                { title: 'React', value: 'react' },
                { title: 'Preact', value: 'preact' }
            ]
        }
        */
    ];

    return await prompts(questions);
}