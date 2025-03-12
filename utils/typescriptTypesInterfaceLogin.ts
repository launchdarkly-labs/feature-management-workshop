export type LoginUserFunctionType = (email: string) => Promise<void>;
export interface Persona {
    personaname: string;
    personatier: string;
    personaimage: string;
    personaemail: string;
    personarole: string;
    personalaunchclubstatus: string;
    personaEnrolledInLaunchClub: boolean;
}

export interface LoginContextInterface {
    userObject: Persona;
    isLoggedIn: boolean;
    kind: string;
    key: string;
    updateAudienceContext: () => Promise<void>;
    loginUser: LoginUserFunctionType;
    logoutUser: () => Promise<void>;
    allUsers: Persona[];
    audience?: {
        key:string
    }
}
