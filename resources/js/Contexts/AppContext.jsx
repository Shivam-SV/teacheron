import { createContext, useState } from "react";
import toastFlasher from "../Helpers/appHelper";

const GlobalPropsContext = createContext();

function GlobalProps({children, appProps}){
    const [props, setProps] = useState(appProps);

    // triggering if any message is in the flash message
    toastFlasher(appProps?.flash)


    return (
        <GlobalPropsContext.Provider value={{props, setProps}} >
            {children}
        </GlobalPropsContext.Provider>
    )
}

export {GlobalPropsContext, GlobalProps}
