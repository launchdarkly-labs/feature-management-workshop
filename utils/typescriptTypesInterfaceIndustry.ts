export type WealthManagementGraphDataType = {
    month: string;
    balance: number;
};

export type TransactionType = {
    id: number;
    date: string;
    merchant: string;
    status: string;
    amount: number;
    accounttype: string;
    user: string;
};

export type ApiResponseType = {
    response: string;
    modelName: string;
    enabled: boolean;
};

export type AIModelType = {
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

export interface ChatbotMessageInterface {
    id: string;
    role: string | "assistant";
    content: string;
}
export interface ChatBotAIApiResponseInterface {
    error?: string;
    response: string;
    enabled: boolean;
    modelName: string;
}
