import { useRef, useState, useContext } from "react";
import { AvatarImage, Avatar } from "../avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import LoginContext from "@/utils/contexts/login";
import { Button } from "@/components/ui/button";
import { QuickLoginDialog } from "@/components/ui/quicklogindialog";
import { capitalizeFirstLetter } from "@/utils/utils";
import { NAV_ELEMENTS_VARIANT } from "@/utils/constants";
import { useIsMobile } from "@/components/hooks/use-mobile";
import { Sheet, SheetContent, SheetClose, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { COMPANY_LOGOS } from "@/utils/constants";

const NavBarLoginInterface = () => {
    const { isLoggedIn, userObject, logoutUser, loginUser } = useContext(LoginContext);

    const inputRef = useRef<HTMLInputElement>(null);
    const [defaultEmail, setDefaultEmail] = useState<string>("user@launchmail.io");

    function handleLogin(): void {
        if (!defaultEmail) return;

        loginUser("user@launchmail.io");
    }

    return (
        <>
            {isLoggedIn && (
                <>
                    <div className="mx-auto flex place-content-center w-full">
                        <img
                            src={userObject?.personaimage || "personas/ToggleAvatar.png"}
                            className="rounded-full h-48"
                        />
                    </div>
                    <div className="mx-auto text-center items-center align-center flex text-black font-sohnelight pt-4  text-xl align-center">
                        <p className="pt-4">
                            {NAV_ELEMENTS_VARIANT["bank"]?.popoverMessage}
                            {userObject?.personaname || userObject.personaname}, as a<br></br>
                            <span className="text-2xl">
                                {capitalizeFirstLetter(userObject?.personatier)} Tier
                            </span>
                            !
                        </p>
                    </div>
                    <div className="mx-auto text-center">
                        <Button
                            onClick={logoutUser}
                            className={`bg-loginComponentBlue text-white text-xl font-audimat items-center my-2 w-full rounded-none`}
                        >
                            Logout
                        </Button>
                        <QuickLoginDialog />
                    </div>
                </>
            )}

            {!isLoggedIn && (
                <div className="w-full  bg-white font-audimat shadow-2xl mx-auto text-black p-4 sm:p-8 h-full flex flex-col">
                    <div className=" mx-auto text-center mt-4 mb-8">
                        <img src={COMPANY_LOGOS["bank"].vertical.src} className=" mx-auto" />
                    </div>
                    <div className="w-full flex flex-col gap-y-4 mb-4">
                        <Input
                            placeholder="Email"
                            value={defaultEmail}
                            ref={inputRef}
                            required
                            className=" outline-none border-0 border-b-2 text-xl"
                            onChange={(e) => setDefaultEmail(e.target.value)}
                        />

                        <Button
                            onClick={() => handleLogin()}
                            className={` w-full mx-auto font-sohnelight rounded-none  text-lg bg-loginComponentBlue text-white`}
                        >
                            Login with SSO
                        </Button>
                        <QuickLoginDialog />
                    </div>
                    <div className="flex flex-row items-start sm:items-baseline
                     font-sohnelight font-extralight sm:flex-col text-xs justify-between gap-y-2">
                        <div className="">
                            <p>Forgot Password?</p>
                        </div>
                        <div>
                            <p className="text-right flex flex-col sm:flex-row ">
                                Don't have an account?{" "}
                                <a href="#" className=" ml-2 cursor-auto">
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const NavbarLogin = () => {
    const { isLoggedIn, userObject, logoutUser } = useContext(LoginContext);

    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <Sheet id="navbar-login">
                <SheetTrigger>
                    <Avatar className="shadow-xl">
                        <AvatarImage src={userObject?.personaimage} className="" />
                    </Avatar>
                </SheetTrigger>
                <SheetContent
                    data-sidebar="sidebar"
                    data-mobile="true"
                    className="w-full h-full bg-sidebar p-0 text-sidebar-foreground !border-0 [&>button]:hidden"
                    side={"right"}
                    id="sidebar-mobile"
                >
                    <div className="flex h-full w-full flex-col ">
                        <NavBarLoginInterface />
                        <SheetClose className="h-10 w-full bg-airlinedarkblue text-white">
                            Close
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <Popover id="navbar-login">
            <PopoverTrigger>
                <Avatar className="shadow-xl">
                    <AvatarImage src={userObject?.personaimage} className="" />
                </Avatar>
            </PopoverTrigger>

            <PopoverContent className={`  ${!isLoggedIn ? "p-0" : ""}`}>
                <NavBarLoginInterface />
            </PopoverContent>
        </Popover>
    );
};

export default NavbarLogin;
