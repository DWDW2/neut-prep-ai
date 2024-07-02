export type UseCriticalResponseType = {
    id: string;
    question: string;
    statement: string;
    options: string[];
    answer: string;
    explanation: string;
    table: string | null;
    questionType: string; // change to camelCase for consistency
}
