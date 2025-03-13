import { useLDClient, LDContext } from "launchdarkly-react-client-sdk";
import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { setCookie } from "cookies-next";
import { LD_CONTEXT_COOKIE_KEY } from "../constants";
import { STARTER_PERSONAS } from "../StarterUserPersonas";
import { Persona } from "../typescriptTypesInterfaceLogin";
import type { LoginContextProviderInterface, LDContextInterface } from "@/utils/typescriptTypesInterfaceLogin";
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
    async updateRandomizedUserContext() {},
    async loginUser() {},
    async logoutUser() {},
    allUsers: [],
    appMultiContext: {},
});

export default LoginContext;

export const LoginProvider = ({ children }: { children: any }) => {
    const ldClient = useLDClient();
    const starterLDContext:LDContextInterface = MultiKindLDContext({isAnonymous:true})
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userObject, setUserObject] = useState<Persona>(startingUserObject);
    const [appMultiContext, setAppMultiContext] = useState<LDContextInterface>(starterLDContext);
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
        const existingContext = appMultiContext;

        const newContext = MultiKindLDContext({
          audienceKey: uuidv4().slice(0, 10),
          userEmail: existingContext.user.email,
          userName: existingContext.user.name,
          isAnonymous: existingContext.user.anonymous,
          userKey: existingContext.user.key,
          userRole: existingContext.user.role,
          userTier: existingContext.user.tier,
          newDevice: existingContext.device,
          newLocation: existingContext.location,
      });
        console.log("updateAudienceContext", newContext);
  
        setAppMultiContext(newContext);
        setCookie(LD_CONTEXT_COOKIE_KEY, newContext);
        await ldClient?.identify(newContext);
    };

    const updateRandomizedUserContext = async (): Promise<void> => {
        const context = await ldClient?.getContext();
        const existingContext = appMultiContext;

        const newContext = MultiKindLDContext({
          audienceKey: getExistingAudienceKey(),
          userEmail: existingContext.user.email,
          userName: existingContext.user.name,
          isAnonymous: false,
          userKey: uuidv4().slice(0, 10),
          userRole: existingContext.user.role,
          userTier: existingContext.user.tier,
          newDevice: getDeviceForContext(),
          newLocation: getLocation(),
      });

        context.user.key = uuidv4();
        context.user.device = Math.random() < 0.5 ? "Mobile" : "Desktop"; //TODO: create randomized function
        const osOptions =
            context.user.device === "Mobile" ? ["iOS", "Android"] : ["macOS", "Windows"]; //TODO: create randomized function
        context.user.operating_system = osOptions[Math.floor(Math.random() * osOptions.length)];//TODO: create randomized function
        context.user.location = `America/${
            ["New_York", "Chicago", "Los_Angeles", "Denver"][Math.floor(Math.random() * 4)]//TODO: create randomized function
        }`;
        context.user.tier = ["Gold", "Silver", "Platinum", "Standard"][
            Math.floor(Math.random() * 3)
        ];//TODO: create randomized function
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
                updateRandomizedUserContext,
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

