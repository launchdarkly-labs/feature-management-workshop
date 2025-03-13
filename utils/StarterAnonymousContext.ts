import { v4 as uuidv4 } from "uuid";
import { getDeviceForContext, getLocation } from "./utils";
import { LDContextInterface } from "@/utils/typescriptTypesInterfaceLogin";

export const StarterAnonymousContext = ({
    audienceKey,
}: {
    audienceKey: string;
}): LDContextInterface => {
    return {
        kind: "multi",
        user: {
            anonymous: true,
            key: uuidv4().slice(0, 10),
        },
        device: getDeviceForContext(),
        location: getLocation(),

        audience: {
            key: audienceKey,
        },
    };
};

