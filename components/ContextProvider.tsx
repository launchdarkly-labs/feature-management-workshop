import { useEffect, useState } from 'react';
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { v4 as uuidv4 } from "uuid";
import { setCookie } from "cookies-next";
import { LD_CONTEXT_COOKIE_KEY } from "@/utils/constants";
import { isAndroid, isIOS, isBrowser, isMobile, isMacOs, isWindows } from 'react-device-detect';
import { LDContextInterface } from '@/utils/typescriptTypesInterfaceLogin';

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [LDProvider, setLDProvider] = useState<any>(null);

  useEffect(() => {
    const initializeLDProvider = async () => {
      //TODO: fix this syntax
      const operatingSystem = isAndroid ? 'Android' : isIOS ? 'iOS' : isWindows ? 'Windows' : isMacOs ? 'macOS' : '';
      const device = isMobile ? 'Mobile' : isBrowser ? 'Desktop' : '';

      const context:LDContextInterface = {
        kind: "multi",
        key: uuidv4().slice(0, 10),
        user: {
          anonymous: true,
          key: uuidv4().slice(0, 10),
        },
        device: {
          key: device,
          name: device,
          operating_system: operatingSystem,
          platform: device,
        },
        location: {
          key: Intl.DateTimeFormat().resolvedOptions().timeZone,
          name: Intl.DateTimeFormat().resolvedOptions().timeZone,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          country: "US",
        },
        audience: {
          key: uuidv4().slice(0, 10),
        }
      };

      setCookie(LD_CONTEXT_COOKIE_KEY, context);
      console.log(context);

      const Provider = await asyncWithLDProvider({
        clientSideID: process.env.NEXT_PUBLIC_LD_CLIENT_KEY || "",
        reactOptions: {
          useCamelCaseFlagKeys: false,
        },
        options: {
          application: {
            id: "togglebank",
          },
          eventCapacity: 500,
          privateAttributes: ['email', 'name']
        },
        context: context
      });

      setLDProvider(() => Provider);
    };

    initializeLDProvider();
  }, []);

  if (!LDProvider) {
    // Return a loading indicator or null
    return <div>Loading LaunchDarkly...</div>;
  }

  return <LDProvider>{children}</LDProvider>;
};

export default ContextProvider;