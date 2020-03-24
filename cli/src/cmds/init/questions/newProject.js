const packageJSON = require('./packageJSON');

module.exports = async args => {
    console.log('new project setup')
    
    let answers = await packageJSON(args);

    return answers;
}