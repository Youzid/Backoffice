import { useAppSelector } from '../store/store';
interface RouteGuardProps {
    requiredPermissions: string[] | undefined;
    requiredActions: string[] | undefined;
    requiredUserType: string[] | undefined;
}

const RouteProtection = ({
    requiredPermissions,
    requiredActions,
    requiredUserType,

}: RouteGuardProps) => {
    const { permissions, userType } = useAppSelector((state) => state.auth);

    const hasRequiredPermissions = () =>
        requiredPermissions !== undefined ? (requiredPermissions?.every(
            (requiredPermission) =>
                permissions && permissions[requiredPermission] !== null &&
                requiredActions?.every((action) =>
                    permissions[requiredPermission]?.includes(action)
                )
        )) : true
        ;
    const hasRequiredRole = () => requiredUserType !== undefined ? userType && requiredUserType?.includes(userType) : true;

    return hasRequiredPermissions() && hasRequiredRole();
};

export default RouteProtection;
