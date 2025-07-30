import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../table";
import { useFlags } from "launchdarkly-react-client-sdk";
import { CiMoneyCheck1 } from "react-icons/ci";
import BankDashboardAccountCard from "./BankDashboardAccountCard";
import { Button } from "@/components/ui/button";

type Transaction = {
    id: number;
    date: string;
    merchant: string;
    status: string;
    amount: number;
    accounttype: string;
    user: string;
};

// Generate dates within the last 14 days from today
function getRecentDate(daysAgo: number): string {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
}

// Fake data for checking account transactions, all within the last 2 weeks
const transactions: Transaction[] = [
    {
        id: 1,
        date: getRecentDate(0), // today
        merchant: "Amazon",
        status: "cleared",
        amount: 129.99,
        accounttype: "checking",
        user: "John Doe",
    },
    {
        id: 2,
        date: getRecentDate(1),
        merchant: "Starbucks",
        status: "cleared",
        amount: 5.75,
        accounttype: "checking",
        user: "John Doe",
    },
    {
        id: 3,
        date: getRecentDate(2),
        merchant: "Apple",
        status: "pending",
        amount: 999.0,
        accounttype: "checking",
        user: "John Doe",
    },
    {
        id: 4,
        date: getRecentDate(3),
        merchant: "Target",
        status: "cleared",
        amount: 54.23,
        accounttype: "checking",
        user: "John Doe",
    },
    {
        id: 5,
        date: getRecentDate(4),
        merchant: "Shell Gas",
        status: "cleared",
        amount: 42.11,
        accounttype: "checking",
        user: "John Doe",
    },
    {
        id: 6,
        date: getRecentDate(5),
        merchant: "Netflix",
        status: "cleared",
        amount: 15.49,
        accounttype: "checking",
        user: "John Doe",
    },
    {
        id: 7,
        date: getRecentDate(6),
        merchant: "Uber",
        status: "cleared",
        amount: 23.80,
        accounttype: "checking",
        user: "John Doe",
    },
    {
        id: 8,
        date: getRecentDate(7),
        merchant: "Whole Foods",
        status: "cleared",
        amount: 87.65,
        accounttype: "checking",
        user: "John Doe",
    },
    {
        id: 9,
        date: getRecentDate(8),
        merchant: "Spotify",
        status: "cleared",
        amount: 9.99,
        accounttype: "checking",
        user: "John Doe",
    },
    {
        id: 10,
        date: getRecentDate(9),
        merchant: "CVS Pharmacy",
        status: "cleared",
        amount: 32.50,
        accounttype: "checking",
        user: "John Doe",
    },
];

export function CheckingAccount() {
    const { financialDBMigration, togglebankDBGuardedRelease } = useFlags();

    return (
        <Sheet>
            <SheetTrigger className=" h-full w-full" >
                <BankDashboardAccountCard
                    cardIcon={<CiMoneyCheck1 className="text-blue-700 h-8 w-8" />}
                    cardTitle="Platinum Checking"
                    accountNumber="(***2982)"
                    cardSubtitle="No Fee Checking"
                    balanceLabel="Total Checking Balance"
                    balanceNumber="$83,758.52"
                />
            </SheetTrigger>
            <SheetContent className="w-full lg:w-1/2 overflow-auto" side="right">
                <SheetHeader>
                    <SheetTitle className="font-sohne text-2xl">
                        <div className="flex-col">
                            <div className="flex">Checking Account</div>
                            {financialDBMigration === "complete" || togglebankDBGuardedRelease ? (
                                <div className="flex text-center items-center justify-center my-6 bg-green-200 text-zinc-500 font-sohnebuch font-extralight text-base py-2">
                                    Retrieving data from DynamoDB
                                </div>
                            ) : (
                                <div className="flex text-center items-center justify-center my-6 bg-amber-200 font-sohnebuch font-extralight text-base py-2">
                                    Retrieving Data from RDS
                                </div>
                            )}
                        </div>
                    </SheetTitle>
                    <SheetDescription className="font-sohne">
                        Understand the Balance of Your Checking Accounts
                    </SheetDescription>
                </SheetHeader>

                <Table className="">
                    <TableCaption>
                        <Button
                            className="flex rounded-none bg-blue-700 text-lg font-sohnelight"
                            // No-op for fake data
                            onClick={() => {}}
                        >
                            Refresh Data
                        </Button>
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Merchant</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">{item.date}</TableCell>
                                <TableCell>{item.merchant}</TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell className="text-right">
                                    {item.amount.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                    })}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </SheetContent>
        </Sheet>
    );
}
