import { ElementType, useEffect, useState } from "react";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { v4 as uuidv4 } from "uuid";
import { setCookie } from "cookies-next";
import { LD_CONTEXT_COOKIE_KEY } from "@/utils/constants";
import { isAndroid, isIOS, isBrowser, isMobile, isMacOs, isWindows } from "react-device-detect";
import { LDContextInterface } from "@/utils/typescriptTypesInterfaceLogin";
import { SyncLoader } from "react-spinners";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [LDProviderComponent, setLDProviderComponent] = useState<ElementType>();

    useEffect(() => {
        const initializeLDProvider = async () => {
            const context: LDContextInterface = {
                kind: "multi",
                user: {
                    anonymous: true,
                    key: uuidv4().slice(0, 10),
                },
                device: {
                    key: getDevice(),
                    name: getDevice(),
                    operating_system: getOperatingSystem(),
                    platform: getDevice(),
                },
                location: {
                    key: timeZone,
                    city: city,
                    timeZone: timeZone,
                    continent: continent,
                },
                audience: {
                    key: uuidv4().slice(0, 10),
                },
            };

            setCookie(LD_CONTEXT_COOKIE_KEY, context);

            const FetchedProvider = await asyncWithLDProvider({
                clientSideID: process.env.NEXT_PUBLIC_LD_CLIENT_KEY || "",
                reactOptions: {
                    useCamelCaseFlagKeys: false,
                },
                options: {
                    application: {
                        id: "togglebank",
                    },
                    eventCapacity: 500,
                    privateAttributes: ["email", "name"],
                },
                context: context,
            });

            setLDProviderComponent(() => FetchedProvider);
        };

        initializeLDProvider();
    }, []);

    if (!LDProviderComponent) {
        return <LoadingComponent />;
    }

    return <LDProviderComponent>{children}</LDProviderComponent>;
};

export default ContextProvider;


const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const continent = timeZone.split("/")[0];
const city = timeZone.split("/")[timeZone.split("/").length - 1].replace("_", " ");

const getOperatingSystem = () => {
    if (isAndroid) return "Android";
    if (isIOS) return "iOS";
    if (isWindows) return "Windows";
    if (isMacOs) return "macOS";
    return "";
};

const getDevice = () => {
    if (isMobile) return "Mobile";
    if (isBrowser) return "Desktop";
    return "";
};

const LoadingComponent = () => {
    return (
        <div className="w-[100vw] h-[100vh] flex items-center justify-center">
            <div className="flex flex-col gap-y-8 items-center px-4">
                <h1 className="text-4xl text-center">Loading LaunchDarkly...</h1>
                <SyncLoader className="" size={30} margin={20} speedMultiplier={0.8} color={"#405BFF"} />
            </div>
        </div>
    );
};
