export interface useCriticalResponseType{
    id: string,
    question: string,
    statement: string,
    options: string[],
    answer: string,
    explanation?: string,
    table?: string,
    "question type"?: string
}