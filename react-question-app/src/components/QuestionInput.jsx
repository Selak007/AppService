import React, { useState } from 'react';

const QuestionInput = () => {
    const [question, setQuestion] = useState('');

    const handleInputChange = (event) => {
        setQuestion(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the question submission logic here
        console.log('Question submitted:', question);
        setQuestion('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={question}
                onChange={handleInputChange}
                placeholder="Ask your question..."
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default QuestionInput;