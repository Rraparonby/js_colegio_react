import {FooterComp} from "@/lib/base/application/component/FooterComp";
import {HeaderComp} from "@/lib/base/application/component/HeaderComp";

import {AlertComp} from "@/lib/base/application/component/AlertComp";

function HomeView() {
    return (
        <>  
            {<HeaderComp />}          

            <h1>Home</h1>

            {<FooterComp />}

            {<AlertComp tipo_mensaje="info" mensaje="Testttt"/>}
        </>
    );
}
  
export {HomeView}