const regExTools = () => {

    const caseInsensitive = (pattern) => {
        return new RegExp(`^${pattern}$`, 'i');
    };

    const partialCaseInsensitive = (pattern) => {
        return new RegExp(`${pattern}`, 'i');
    }

    return {
        caseInsensitive: caseInsensitive,
        partialCaseInsensitive: partialCaseInsensitive
    };
};

module.exports = regExTools;

