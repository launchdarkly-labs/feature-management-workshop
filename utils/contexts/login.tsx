import { useLDClient } from "launchdarkly-react-client-sdk";
import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { setCookie, getCookie } from "cookies-next";
import { LD_CONTEXT_COOKIE_KEY } from "../constants";
import { STARTER_PERSONAS } from "../StarterUserPersonas";
import { Persona } from "../typescriptTypesInterfaceLogin";
import type { LoginContextProviderInterface } from "@/utils/typescriptTypesInterfaceLogin";
import { LDContext } from "launchdarkly-js-client-sdk";
import { getDeviceForContext, getLocation, getHashEmail, getExistingAudienceKey } from "../utils";
import { StarterAnonymousContext } from "../StarterAnonymousContext";

const startingUserObject = {
    personaname: "",
    personatier: "",
    personaimage: "",
    personaemail: "",
    personarole: "",
};

const LoginContext = createContext<LoginContextProviderInterface>({
    userObject: startingUserObject,
    isLoggedIn: false,
    async updateAudienceContext() {},
    async updateUserContext() {},
    async loginUser() {},
    async logoutUser() {},
    allUsers: [],
    appMultiContext: {},
});

export default LoginContext;

export const LoginProvider = ({ children }: { children: any }) => {
    const client = useLDClient();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userObject, setUserObject] = useState<Persona>(startingUserObject as Persona);
    const [appMultiContext, setAppMultiContext] = useState({
        ...client?.getContext(),
    });
    const [allUsers, setAllUsers] = useState<Persona[]>(STARTER_PERSONAS);

    console.log("appMultiContext", appMultiContext);
    const loginUser = async (email: string): Promise<void> => {
        //need to keep this here in order to pull getcookie and get same audience key as you initialized it
        const ldContextCookieKey: string | undefined = getCookie(LD_CONTEXT_COOKIE_KEY);
        const existingAudienceKey: string =
            ldContextCookieKey && JSON.parse(ldContextCookieKey)?.audience?.key;

        if (Object.keys(userObject).length > 0) {
            setAllUsers((prevObj) => [
                ...prevObj.filter(
                    (persona) => persona.personaemail !== (userObject as Persona).personaemail
                ),
                userObject as Persona,
            ]);
        }

        const context: LDContext | undefined = await client?.getContext();

        const foundPersona: Persona =
            allUsers.find((persona) => persona.personaemail.includes(email)) || STARTER_PERSONAS[0];

        await setUserObject(foundPersona);
        context.user.name = foundPersona?.personaname;
        context.user.email = foundPersona?.personaemail;
        context.user.anonymous = false;
        context.user.key = getHashEmail(email);
        context.user.role = foundPersona?.personarole;
        context.user.tier = foundPersona?.personatier;
        context.audience.key = getExistingAudienceKey();
        context.location = getLocation();
        context.device = getDeviceForContext();

        setAppMultiContext(context);
        await client?.identify(context);
        console.log("loginUser", context);

        setCookie(LD_CONTEXT_COOKIE_KEY, context);
        setIsLoggedIn(true);
    };

    const updateAudienceContext = async (): Promise<void> => {
        const context = await client?.getContext();
        console.log("updateAudienceContext", context);
        context.audience.key = uuidv4().slice(0, 10);
        setAppMultiContext(context);
        setCookie(LD_CONTEXT_COOKIE_KEY, context);
        await client?.identify(context);
    };

    const updateUserContext = async (): Promise<void> => {
        const context = await client?.getContext();
        context.user.key = uuidv4();
        context.user.device = Math.random() < 0.5 ? "Mobile" : "Desktop";
        const osOptions =
            context.user.device === "Mobile" ? ["iOS", "Android"] : ["macOS", "Windows"];
        context.user.operating_system = osOptions[Math.floor(Math.random() * osOptions.length)];
        context.user.location = `America/${
            ["New_York", "Chicago", "Los_Angeles", "Denver"][Math.floor(Math.random() * 4)]
        }`;
        context.user.tier = ["Gold", "Silver", "Platinum", "Standard"][
            Math.floor(Math.random() * 3)
        ];
        context.user.anonymous = false;
        setAppMultiContext(context);
        setCookie(LD_CONTEXT_COOKIE_KEY, context);
        await client?.identify(context);
    };

    const logoutUser = async () => {
        setIsLoggedIn(false);
        setUserObject(startingUserObject);
        setAllUsers(STARTER_PERSONAS);
        const context = StarterAnonymousContext({ audienceKey: getExistingAudienceKey() });
        setAppMultiContext(context);
        await client?.identify(context);
        setCookie(LD_CONTEXT_COOKIE_KEY, context);
    };

    return (
        <LoginContext.Provider
            value={{
                userObject,
                isLoggedIn,
                updateAudienceContext,
                updateUserContext,
                loginUser,
                logoutUser,
                allUsers,
                appMultiContext,
            }}
        >
            {children}
        </LoginContext.Provider>
    );
};
