import toggleBankVerticalLogo from "@/public/banking/toggleBank_logo_vertical.svg";
import toggleBankHorizontalLogo from "@/public/banking/toggleBank_logo_horizontal_black.svg";
import architectureIconCSNAV from "@/public/sidenav/architecture-icon.svg";
import architectureHoverCSNAV from "@/public/sidenav/card-demo-sidenav-architecture-hover.svg";
import architectureNoHoverCSNAV from "@/public/sidenav/card-demo-sidenav-architecture.svg";
import codeexamplesHoverCSNAV from "@/public/sidenav/card-demo-sidenav-codeexamples-hover.svg";
import codeexamplesNoHoverCSNAV from "@/public/sidenav/card-demo-sidenav-codeexamples.svg";
import curlyBrackets from "@/public/sidenav/curly-brackets.svg";
import { AIModelType } from "./typescriptTypesInterfaceIndustry";

export const ALERT_TYPES = {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
    INFO: "info",
};

export const PERSONA_TIER_STANARD = "Standard";
export const PERSONA_TIER_PLATINUM = "Platinum";
export const PERSONA_ROLE_BETA = "Beta";
export const PERSONA_ROLE_DEVELOPER = "Developer";
export const PERSONA_ROLE_USER = "User";
export const LAUNCH_CLUB_STANDARD = "standard";
export const LAUNCH_CLUB_PLATINUM = "platinum";
export const LD_CONTEXT_COOKIE_KEY = "ld-context";

export const BANK = "bank";

export const ANTHROPIC = "anthropic";
export const COHERE = "cohere";
export const META = "meta";

export const COMPANY_LOGOS = {
    bank: {
        vertical: toggleBankVerticalLogo,
        horizontal: toggleBankHorizontalLogo,
    },
};

export const DEFAULT_AI_MODEL: AIModelType = {
    messages: [
        {
            content:
                "As an AI bot for a travel airline LaunchAirways your purpose is to answer questions related to flights and traveling. Act as customer representative. Only answer queries related to traveling and airlines. Remove quotation in response. Limit response to 100 characters. Here is the user prompt: ${userInput}.",
            role: "system",
        },
    ],
    model: {
        parameters: { temperature: 0.5, maxTokens: 500 },
        name: "cohere.command-text-v14",
    },
    _ldMeta: {
        enabled: true,
        variationKey: "cohere-coral",
        version: 1,
        versionKey: "cohere-coral",
    },
};

export const CSNAV_ITEMS = [
    {
        hoverBackground: codeexamplesHoverCSNAV,
        noHoverBackground: codeexamplesNoHoverCSNAV,
        icon: curlyBrackets,
        type: "resource",
        link: "/examples",
        title: "Code Examples",
    },
    {
        icon: architectureIconCSNAV,
        hoverBackground: architectureHoverCSNAV,
        noHoverBackground: architectureNoHoverCSNAV,
        type: "resource",
        link: "/architecture",
        title: "Architecture",
    },
];

export const NAV_ELEMENTS_VARIANT = {
    bank: {
        navLinks: [
            {
                text: "Summary",
                href: "/bank",
            },
            { text: "Transfers", href: "/bank" },
            { text: "Deposits", href: "/bank" },
            { text: "External Accounts", href: "/bank" },
            { text: "Statements", href: "/bank" },
        ],
        navLinkColor: "gradient-bank",
        popoverMessage: "Thank you for banking with us, ",
        logoImg: COMPANY_LOGOS["bank"].horizontal,
    },
};
