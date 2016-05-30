/* REGEX HELPER FUNCTIONS */

const regExTools = () => {

    /* EXACT CAST INSENSITIVE SEARCH */
    const caseInsensitive = (pattern) => {
        return new RegExp(`^${pattern}$`, 'i');
    };

    /* PARTIAL MATCH CASE INSENSITIVE SEARCH */
    const partialCaseInsensitive = (pattern) => {
        return new RegExp(`${pattern}`, 'i');
    }

    return {
        caseInsensitive,
        partialCaseInsensitive
    };
};

module.exports = regExTools;

