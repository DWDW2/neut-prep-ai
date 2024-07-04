interface useCriticalResponseType{
    id: string
}

interface criticalTestType {
    _id: string;
    test:[{
        id: string;
        question: string;
        statement: string;
        options: string[];
        answer: string;
        explanation: string;
        table: string | null;
        questionType: string; // change to camelCase for consistency
    }],
    answers: string[];
    createdAt: string;
    updatedAt: string;
}

interface useCriticalUpdateResponseType{
    results: [
        {
            questionId: string;
            isCorrect: boolean;
        }
    ]
}

export type { useCriticalResponseType, criticalTestType, useCriticalUpdateResponseType };
