import { useLDClient } from "launchdarkly-react-client-sdk";
import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { setCookie } from "cookies-next";
import { LD_CONTEXT_COOKIE_KEY } from "../constants";
import { STARTER_PERSONAS } from "../StarterUserPersonas";
import { Persona } from "../typescriptTypesInterfaceLogin";
import type { LoginContextProviderInterface } from "@/utils/typescriptTypesInterfaceLogin";
import { getDeviceForContext, getLocation, getExistingAudienceKey } from "../utils";
import { MultiKindLDContext } from "../MultiKindLDContext";

const startingUserObject:Persona = {
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
    const ldClient = useLDClient();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userObject, setUserObject] = useState<Persona>(startingUserObject);
    const [appMultiContext, setAppMultiContext] = useState({
        ...ldClient?.getContext(),
    });
    const [allUsers, setAllUsers] = useState<Persona[]>(STARTER_PERSONAS);

    console.log("appMultiContext", appMultiContext);

    const loginUser = async (email: string): Promise<void> => {
        //TODO: what does this do
        if (Object.keys(userObject).length > 0) {
            setAllUsers((prevObj) => [
                ...getAllUsersLeft({ users: prevObj, userObject: userObject }),
                userObject as Persona,
            ]);
        }
       
        const chosenPersona = getChosenPersona({ allUsers: allUsers, chosenEmail: email });

        await setUserObject(chosenPersona);

        const newContext = MultiKindLDContext({
            audienceKey: getExistingAudienceKey(),
            userEmail: chosenPersona.personaemail,
            userName: chosenPersona.personaname,
            isAnonymous: false,
            userKey: uuidv4().slice(0, 10),
            userRole: chosenPersona.personarole,
            userTier: chosenPersona?.personatier,
            newDevice: getDeviceForContext(),
            newLocation: getLocation(),
        });

        setAppMultiContext(newContext);
        await ldClient?.identify(newContext);
        setCookie(LD_CONTEXT_COOKIE_KEY, newContext);
        setIsLoggedIn(true);
    };

    const updateAudienceContext = async (): Promise<void> => {
        const context = await ldClient?.getContext();
        console.log("updateAudienceContext", context);
        context.audience.key = uuidv4().slice(0, 10);
        setAppMultiContext(context);
        setCookie(LD_CONTEXT_COOKIE_KEY, context);
        await ldClient?.identify(context);
    };

    const updateUserContext = async (): Promise<void> => {
        const context = await ldClient?.getContext();
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
        await ldClient?.identify(context);
    };

    const logoutUser = async () => {
        setIsLoggedIn(false);
        setUserObject(startingUserObject);
        setAllUsers(STARTER_PERSONAS);
        const newContext = MultiKindLDContext({ audienceKey: getExistingAudienceKey(), isAnonymous: true });
        setAppMultiContext(newContext);
        await ldClient?.identify(newContext);
        setCookie(LD_CONTEXT_COOKIE_KEY, newContext);
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

const getAllUsersLeft = ({ users, userObject }: { users: Persona[]; userObject: Persona }) => {
    return users.filter((persona: Persona) => persona.personaemail !== userObject.personaemail);
};

const getChosenPersona = ({
  allUsers,
  chosenEmail,
}: {
  allUsers: Persona[];
  chosenEmail: string;
}): Persona => {
  return (
      allUsers.find((persona) => persona.personaemail.includes(chosenEmail)) ||
      STARTER_PERSONAS[0]
  );
};

