import React from "react";

const BankDashboardAccountCard = ({
    cardIcon,
    balanceNumber,
    balanceLabel,
    accountNumber,
    cardTitle,
    cardSubtitle,
    bottomText = "",
}: {
    cardIcon: any;
    balanceNumber: string;
    balanceLabel: string;
    accountNumber: string;
    cardTitle: string;
    cardSubtitle: string;
    bottomText?: string;
}) => {
    return (
        <div className="h-full flex flex-col p-2 text-base font-sohnelight items-start justify-between">
            <div className="flex flex-col space-y-4">

                <div className="bg-blue-300/30 rounded-full flex w-10 h-10 items-center justify-center">
                    {cardIcon}
                </div>

                <div className="text-zinc-500 flex flex-col items-start">
                    <p className="text-base  font-sohne">{cardTitle} <span>{accountNumber}</span></p>
                    <p className="sm:text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-base">
                        {cardSubtitle}
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-start space-y-2">
                <p className="text-zinc-500 sm:text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-base">
                    {balanceLabel}:{" "}
                </p>
                <p className="text-3xl font-bold">{balanceNumber}</p>
            </div>

            <p className="text-bankdarkblue text-xs">{bottomText}</p>
        </div>
    );
};

export default BankDashboardAccountCard;
