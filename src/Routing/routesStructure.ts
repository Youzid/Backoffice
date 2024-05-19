import BOLayout from "../components/layouts/BOLayout";
import Login from "../pages/frontOffice/login/Login";
import NotFound404 from "../pages/redirections/NotFound404";
import NotAuthorized from "../pages/redirections/NotAuthorized";
import Clients from "../pages/backOffice/clients/Clients";
import NewPassword from "../pages/frontOffice/login/forms/NewPassword";
import Settings from "../pages/frontOffice/settings/Settings";
import Locations from "../pages/backOffice/locations/Locations";
import FormSteps from "../pages/backOffice/locations/FormSteps";
import EditProfilePage from "../pages/backOffice/profile/EditProfilePage";
import AccountConfirmation from "../pages/frontOffice/login/AccountConfirmation";

interface Route {
  path: string;
  component: React.ComponentType;
  parent?: string;
  requiredUserType?: ('admin')[] 
  requiredActions?: string[];
  requiredPermissions?: string[];
}

interface ParentRoute {
  path: string;
  component?: React.ComponentType;
}

export const routes: Route[] = [
  {
    path: '',
    component: Login,
  },
  {
    path: '/password-recovery/:token',
    component: NewPassword,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '*',
    component: NotFound404,
  },
  {
    path: '/not-authorized',
    component: NotAuthorized,
  },
  {
    path: '/password-recovery/:token',
    component: NewPassword,
  },
  {
    path: '/account-confirmation/:token',
    component: AccountConfirmation,
  },

  // ---------------------- BACK OFFICE ROUTES -------------------
  {
    parent: '/admin',
    component: Clients,
    path: 'clients',
    requiredUserType:["admin"]
  },
  {
    parent: '/admin',
    component: Locations,
    path: 'touristic',
    requiredUserType:["admin"]
  },
  {
    parent: '/admin',
    component: Locations,
    path: 'services',
    requiredUserType:["admin"]
  },
  {
    parent: '/admin',
    path: 'touristic-form',
    component: FormSteps,
    requiredUserType:["admin"]
  },
  {
    parent: '/admin',
    path: 'profile',
    component: EditProfilePage,
    requiredUserType:["admin"]
  },
  {
    parent: '/admin',
    path: 'services-form',
    component: FormSteps,
    requiredUserType:["admin"]
  },
  {
    component: Settings,
    parent:"/admin",
    path: 'settings',
    requiredUserType:["admin"]
  },
];

export const ParentRoutes: ParentRoute[] = [

  {
    path: '/admin',
    component: BOLayout,
  },
];
