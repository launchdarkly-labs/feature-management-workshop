export type WealthManagementGraphDataType = {
    month: string;
    balance: number;
};

export interface TransactionInterface {
    id: number;
    date: string;
    merchant: string;
    status: string;
    amount: number;
    accounttype: string;
    user: string;
};

export interface AIModelInterface {
    messages: [
        {
            content: string;
            role: "system" | "user";
        }
    ];
    model: {
        parameters: { temperature: number; maxTokens: number };
        name: string;
    };
    _ldMeta: {
        enabled: boolean;
        variationKey?: string;
        version?: number;
        versionKey?: string;
    };
};

export interface ChatBotMessageInterface {
    id: string;
    role: "assistant" | "user" | "loader";
    content: string;
}
export interface ChatBotAIApiResponseInterface {
    error?: string;
    response: string;
    enabled: boolean;
    modelName: string;
}
