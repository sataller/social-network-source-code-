import React from "react";
import Preloader from "../components/common/Preloader/Preloader";

const withSuspense = (Component) => {
    return (
        <React.Suspense fallback={<Preloader/>}>
            <Component/> </React.Suspense>
    )
}

export default withSuspense