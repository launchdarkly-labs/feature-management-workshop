import { LDSingleKindContext, LDMultiKindContext } from "@launchdarkly/node-server-sdk";

export type LoginUserFunctionType = (email: string) => Promise<void>;
export interface Persona {
    personaname: string;
    personatier: string;
    personaimage: string;
    personaemail: string;
    personarole: string;
}

export interface LoginContextProviderInterface {
    userObject: Persona;
    isLoggedIn: boolean;
    updateAudienceContext: () => Promise<void>;
    updateUserContext: () => Promise<void>;
    loginUser: LoginUserFunctionType;
    logoutUser: () => Promise<void>;
    allUsers: Persona[];
    appMultiContext: {};
}

export interface LDContextInterface {
    audience?: {
        key: string;
    };
    device: {
        key: string;
        name: string;

        operating_system: string;
        platform: string;
    };
    kind: string;
    location: {
        country: string;
        key: string;
        name: string;
        timeZone: string;
    };
    key: string;
    user: {
        anonymous?: boolean;
        key: string;
    };

}
