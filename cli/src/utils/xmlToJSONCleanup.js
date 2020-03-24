const xmlToJSONCleanup = json => {
    Object.keys(json).forEach(key => {
        // Remove all xmlns keys, they aren't allowed in the POST call
        if (key.includes('xmlns')) delete json[key];
        // Fix the styleIds so they work
        if (key === 'cq:styleIds') json[key] = json[key].replace(/\[|\]/g,'').split(',');
        // Recursively cleanup 
        if (typeof json[key] === 'object') xmlToJSONCleanup(json[key]);
    });
    
    return json;
};

module.exports = xmlToJSONCleanup;