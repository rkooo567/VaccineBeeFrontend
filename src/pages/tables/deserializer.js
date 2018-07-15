const demandingQuestionsDeserializer = (data) => {
    const deserializedDemandingQuestions = [];
    let rowId = 1;

    data.forEach(data => {
        deserializedDemandingQuestion = {
            id: rowId,
            description: data.query,
            demand: data.timesAsked, 
        };
        console.log(deserializedDemandingQuestion.demand)
        deserializedDemandingQuestion.urgentMark = deserializedDemandingQuestion.demand >= 10
        deserializedDemandingQuestions.push(deserializedDemandingQuestion);
        rowId += 1;
    });
    return deserializedDemandingQuestions
};

const getArticlesAnsweringQuestionDeserializer = (data) => {
    const deserializedDemandingQuestions = [];
    let rowId = 1;
    let upvotes = 123;
    data.forEach(data => {
        deserializedDemandingQuestion = {
            id: rowId,
            snippet: data.snippet,
            upvotes,
            link: data.link
        };
        deserializedDemandingQuestions.push(deserializedDemandingQuestion);
        rowId += 1;
        upvotes -= 7;
    });
    return deserializedDemandingQuestions
};

module.exports = {
    demandingQuestionsDeserializer,
    getArticlesAnsweringQuestionDeserializer
};