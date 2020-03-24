const error = require('../../utils/error');

module.exports = args => {
    const packageJSON = require(path.resolve(cwd, 'package.json'));

    if (Object.entries(packageJSON.data).length === 0) {
        error('No package.json file found. Please run this from the directory with the package.json file for your project', true);
    } else {
        
        let settings = packageJSON.get('@storybook/aem-cli');
        if (!settings) {
            error('No sb-aem settings preset. Please initialize your project by running `sb-aem init`.', true);
        } else {
            const questions = [
                name,
            ]
            console.log('settings',settings);
        }
    }
}