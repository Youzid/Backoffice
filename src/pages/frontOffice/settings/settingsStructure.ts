import ManageUsers from "./sections/ManageUsers";
import PermissionsSettings from "./sections/PermissionsSettings";
import ReviewsSettings from "./sections/ReviewsSettings";

export const settingsStructure = [

    {
      title:"permissions",
      requiredActions: 'U',
      requiredPermissions: 'canChangePermission',
      component:PermissionsSettings
    },
    {
      title:"manageReviews",
      requiredActions: 'U',
      requiredPermissions: 'canChangePermission',
      component:ReviewsSettings
    },
    {
      title:"manageUsers",
      requiredActions: 'U',
      requiredPermissions: 'canChangePermission',
      component:ManageUsers
    },
  ];