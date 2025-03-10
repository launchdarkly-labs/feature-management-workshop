import * as React from "react";
import { useContext } from "react";
import { AvatarImage, Avatar } from "../avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import LoginContext from "@/utils/contexts/login";
import { Button } from "@/components/ui/button";
import { QuickLoginDialog } from "@/components/ui/quicklogindialog";
import { capitalizeFirstLetter } from "@/utils/utils";
import { NAV_ELEMENTS_VARIANT } from "@/utils/constants";
import { LoginComponent } from "@/components/ui/logincomponent";

const NavbarLogin = () => {
  const { isLoggedIn, userObject, logoutUser } = useContext(LoginContext);
  return (
    <Popover id="navbar-login">
      <PopoverTrigger>
        <Avatar className="shadow-xl">
          <AvatarImage src={userObject?.personaimage} className="" />
        </Avatar>
      </PopoverTrigger>

      <PopoverContent className={`  ${!isLoggedIn ? "p-0" : ""}`}>
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
                  {capitalizeFirstLetter(userObject?.personatier)}{" "}
                  Tier
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

        {!isLoggedIn && <LoginComponent />}
      </PopoverContent>
    </Popover>
  );
};

export default NavbarLogin;
