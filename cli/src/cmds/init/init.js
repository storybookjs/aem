const existingProject = require('./questions/existingProject');

module.exports = async args => {
    const answers = await existingProject(args);
}