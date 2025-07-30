import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useFlags } from "launchdarkly-react-client-sdk";

import { CreditCard } from "lucide-react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../table";
import BankDashboardAccountCard from "./BankDashboardAccountCard";

// Helper to format date as MM/DD/YYYY
function formatDate(date: Date) {
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
}

// Generate dates within the last 2 weeks
const today = new Date();
const daysAgo = (n: number) => {
    const d = new Date(today);
    d.setDate(today.getDate() - n);
    return formatDate(d);
};

// Fake data for credit account transactions, all within the last 2 weeks
const creditTransactions = [
    {
        id: 1,
        date: daysAgo(1), // yesterday
        merchant: "Delta Airlines",
        status: "cleared",
        amount: 450.0,
        accounttype: "credit",
        user: "John Doe",
    },
    {
        id: 2,
        date: daysAgo(3),
        merchant: "Whole Foods",
        status: "cleared",
        amount: 123.45,
        accounttype: "credit",
        user: "John Doe",
    },
    {
        id: 3,
        date: daysAgo(5),
        merchant: "Netflix",
        status: "pending",
        amount: 19.99,
        accounttype: "credit",
        user: "John Doe",
    },
    {
        id: 4,
        date: daysAgo(8),
        merchant: "Apple Store",
        status: "cleared",
        amount: 999.0,
        accounttype: "credit",
        user: "John Doe",
    },
    {
        id: 5,
        date: daysAgo(13),
        merchant: "Shell Gas",
        status: "cleared",
        amount: 62.3,
        accounttype: "credit",
        user: "John Doe",
    },
];

export function CreditAccount() {
    const { financialDBMigration, togglebankDBGuardedRelease } = useFlags();

    return (
        <Sheet>
            <SheetTrigger className=" h-full  w-full">
                <BankDashboardAccountCard
                    cardIcon={<CreditCard className="text-blue-700 h-8 w-8" />}
                    cardTitle="GSF Platinum Credit"
                    accountNumber="(***4222)"
                    cardSubtitle="APR 13.875%"
                    balanceLabel="Total Credit Balance"
                    balanceNumber="$1,203.00"
                    bottomText="Next Due: March 15th, 2025"
                />
            </SheetTrigger>
            <SheetContent className="w-full lg:w-1/2 overflow-auto" side="right">
                <SheetHeader>
                    <SheetTitle className="font-sohne text-2xl">
                        <div className="flex-col">
                            <div className="flex">GSF Platinum Credit Account</div>
                            {financialDBMigration === "complete" || togglebankDBGuardedRelease ? (
                                <div className="flex text-center items-center justify-center my-6 bg-green-200 text-zinc-500 font-sohnebuch font-extralight text-base py-2">
                                    Retrieving data from DynamoDB
                                </div>
                            ) : (
                                <div className="flex text-center items-center justify-center my-6 bg-amber-200 font-sohnebuch font-extralight text-base py-2">
                                    Retrieving data from RDS
                                </div>
                            )}
                        </div>
                    </SheetTitle>
                    <SheetDescription className="font-sohne">
                        Transaction history for your GSF Platinum Credit Account
                    </SheetDescription>
                </SheetHeader>

                <Table className="">
                    <TableCaption>A list of your recent credit transactions.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Merchant</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {creditTransactions.map((invoice, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">{invoice.date}</TableCell>
                                <TableCell>{invoice.merchant}</TableCell>
                                <TableCell>{invoice.status}</TableCell>
                                <TableCell className="text-right">
                                    {invoice.amount.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                    })}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <SheetFooter>
                    {/* <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose> */}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
