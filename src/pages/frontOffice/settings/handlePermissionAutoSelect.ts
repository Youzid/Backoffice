interface Permissions {
    [key: string]: string | null;
}
export const handlePermissionAutoSelect = (action: string, checked: boolean,permissions:Permissions) => {
    const updatedPermissions = permissions ;        
    switch (action) {
        case "read":
            for (const permission in updatedPermissions) {
                if (checked && !updatedPermissions[permission]?.includes("R")) {
                updatedPermissions[permission] = (updatedPermissions[permission] || "") + "R";
                } else if (!checked && updatedPermissions[permission]?.includes("R")) {
                    updatedPermissions[permission] = "";
                }
            }
            break;
        case "create":
            for (const permission in updatedPermissions) {
                if (checked && !updatedPermissions[permission]?.includes("C")) {
                    if (checked && !updatedPermissions[permission]?.includes("R")) {
                        updatedPermissions[permission] = (updatedPermissions[permission] || "") + "CR"; // R is required  to C
                    } else {
                        updatedPermissions[permission] = (updatedPermissions[permission] || "") + "C";
                    }

                } else if (!checked && updatedPermissions[permission]?.includes("C")) {
                    if(updatedPermissions[permission]?.includes("U")) {
                        updatedPermissions[permission] = updatedPermissions[permission]?.replace("U", "") || null; // removing C require removing U

                    }
                    if(updatedPermissions[permission]?.includes("D")) {
                        updatedPermissions[permission] = updatedPermissions[permission]?.replace("D", "") || null; // removing C require removing D

                    }
                    updatedPermissions[permission] = updatedPermissions[permission]?.replace("C", "") || null;
                }
            }
            break;

        case "update":
            for (const permission in updatedPermissions) {
                if (checked && !updatedPermissions[permission]?.includes("U")) {
                    if (checked && !updatedPermissions[permission]?.includes("R")) {
                        updatedPermissions[permission] = (updatedPermissions[permission] || "") + "R"; // R is required  to U
                    } if (checked && !updatedPermissions[permission]?.includes("C")) {
                        updatedPermissions[permission] = (updatedPermissions[permission] || "") + "C"; // C is required  to U
                    }
                    updatedPermissions[permission] = (updatedPermissions[permission] || "") + "U";
                } else if (!checked && updatedPermissions[permission]?.includes("U")) {
                    updatedPermissions[permission] = updatedPermissions[permission]?.replace("U", "") || null;
                }
            }
            break;

        case "delete":
            for (const permission in updatedPermissions) {
                if (checked && !updatedPermissions[permission]?.includes("D")) {
                    if (checked && !updatedPermissions[permission]?.includes("R")) {
                        updatedPermissions[permission] = (updatedPermissions[permission] || "") + "R"; // R is required  to D
                    } if (checked && !updatedPermissions[permission]?.includes("C")) {
                        updatedPermissions[permission] = (updatedPermissions[permission] || "") + "C"; // C  is required  to D
                    }
                    updatedPermissions[permission] = (updatedPermissions[permission] || "") + "D";
                } else if (!checked && updatedPermissions[permission]?.includes("D")) {
                    updatedPermissions[permission] = updatedPermissions[permission]?.replace("D", "") || null;
                }
            }
            break;
    }
    return updatedPermissions;
};