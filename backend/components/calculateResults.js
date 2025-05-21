const calculateResults = (survey) => {
    const counts = {};

    for(const option of survey.options){
        // handle cases where option mot a string
        const cleanOption = typeof option === 'string' ? option.trim() : String(option);  
        counts[cleanOption] = 0;
    }

    for(const response of survey.responses){
        const selectedOption = typeof response.option === "string" ? response.option.trim() : String(response.option);

        if(counts[selectedOption] !== undefined){
            counts[selectedOption]++;
        }
    }

    return counts;
}

module.exports = calculateResults