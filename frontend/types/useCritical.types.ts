export interface useCriticalResponseType{
    id: number,
    question: string,
    statement: string,
    options: string[],
    answer: string,
    explanation: string,
    table?: string,
    "question type": string
}