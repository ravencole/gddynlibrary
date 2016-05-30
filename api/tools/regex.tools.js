const regExTools = () => {

    const caseInsensitive = (pattern) => {
        return new RegExp(`^${pattern}$`, 'i');
    };

    const partialCaseInsensitive = (pattern) => {
        return new RegExp(`${pattern}`, 'i');
    }

    return {
        caseInsensitive,
        partialCaseInsensitive
    };
};

module.exports = regExTools;

