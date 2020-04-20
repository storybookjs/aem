const extractArrays = (content,arraysArray,config) => {
    arraysArray.map((key,index) => {
        const value = content[key][index];
        if (typeof value === 'object' && !Array.isArray(value)) {
            let items = [];
            if (config.hasOwnProperty(key)) {
                if (Array.isArray(config[key])) {
                    items = config[key];
                } else if (typeof config[key] === 'number') {
                    items = Array.from(Array(config[key]).keys());
                }
            } 
            
            content[key] = items.map((item,itemIndex) => extractSchemaByType(value,config[key][itemIndex]));
        }
    });

    return content;
};

const extractObjects = (content,objectsArray,config) => {
    objectsArray.map((key,index) => (
        content[key] = config.hasOwnProperty(key) ? config[key] 
            : content[key].hasOwnProperty('defaultValue') 
                ? content[key]['defaultValue'] : ''
    ));

    return content;
};

const extractStrings = (content,stringsArray,config) => {
    stringsArray.map((key,index) => (
        content[key] = config.hasOwnProperty(key) ? config[key] : content[key]
    ));

    return content;
}

const extractKeysOfTypes = (content) => {
    const stringsArray = Object.keys(content).filter(key => typeof content[key] === 'string');
    const arraysArray = Object.keys(content).filter(key => Array.isArray(content[key]) );
    const objectsArray = Object.keys(content).filter(key => (
        typeof content[key] === 'object' && !Array.isArray(content[key])
    ));

    return { arraysArray, stringsArray, objectsArray };
};

const extractSchemaByType = (content,config) => {
    const { arraysArray, objectsArray, stringsArray } = extractKeysOfTypes(content);

    return {
        ...content,
        ...arraysArray.length && extractArrays(content,arraysArray,config),
        ...objectsArray.length && extractObjects(content,objectsArray,config),
        ...stringsArray.length && extractStrings(content,stringsArray,config),
    };
};

export const contentFromSchema = (schema, config = {}, knobify = false) => {
    if (!schema) {
        console.error('No Schema provided, cannot create content');
        return {};
    }

    return extractSchemaByType({ ...schema }, config);
};

export const selectOption = (options,selected) => selected 
    ? options[selected]
    : options[~~(options.length * Math.random())];