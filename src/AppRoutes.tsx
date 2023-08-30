import { Route, HashRouter, Routes } from "react-router-dom";

import { RequireAuth } from "./RequireAuth";
import { isValidToken } from "./service/service.token"

import { Login } from "./container/form/login";
import { Profile } from "./container/form/profile";
import { SideContainer } from "./container/sidebar/sidebar";
import { FlexCointainer } from "./container/template/flex";
import { GenericForm } from "./container/form/generic.form";
import { initialUser } from "./component/user/user.initial";
import { initialRole } from "./component/role/role.initial";
import { NotAllowed } from "./container/not.allowed";
import { AuthProvider } from "./component/auth/auth.provider";
import { initialOM } from "./component/om/om.initial";
import { Home } from "./container/form/home";
import { initialHost } from "./component/host/host.initial";

const ROLES = {
    'USER': "ROLE_USER",
    'ADMIN': "ROLE_ADMIN",
    'MODERATOR': "ROLE_MODERATOR"
}

export default function AppRoutes() {

    return (
        <HashRouter>
            <AuthProvider>
                <FlexCointainer element='all'>
                    {isValidToken() && <SideContainer />}
                    <FlexCointainer element='main'>
                        <Routes>
                            <Route path="*" element={<Login />}></Route>
                            <Route path="/" element={<Login />}></Route>
                            <Route path="/login" element={<Login />}></Route>
                            <Route path="/notAllowed" element={<NotAllowed />}></Route>
                            {/* <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}> */}
                                <Route path="/userEntity" element={<GenericForm key='userEntity' object={initialUser} url={'userEntity'} />}></Route>
                                <Route path="/role" element={<GenericForm key='role' object={initialRole} url={'role'} />}></Route>
                            {/* </Route> */}
                            <Route element={<RequireAuth allowedRoles={[ROLES.USER, ROLES.ADMIN, ROLES.MODERATOR]} />}>
                                <Route path="/home" element={<Home />}></Route>
                                <Route path="/profile" element={<Profile />}></Route>
                                <Route path="/om" element={<GenericForm key='om' object={initialOM} url={'om'} />}></Route>
                                <Route path="/host" element={<GenericForm key='host' object={initialHost} url={'host'} />}></Route>
                            </Route>
                        </Routes>
                    </FlexCointainer>
                </FlexCointainer>
            </AuthProvider>
        </HashRouter>
    )
}