import { useLocation } from "react-router-dom";
import LocationsTable from "./LocationsTable";
import { useAppDispatch } from "../../../store/store";
import { useEffect } from "react";
import { handleLocationCreation, handleStepChange } from "../../../store/features/BackOfficeSlice";

const Locations = () => {
    const { pathname } = useLocation();
    const locationType = pathname.split("/")[2];

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(handleStepChange(1));
        dispatch(handleLocationCreation(null));
        // eslint-disable-next-line
    }, []);

    return (
        <div className='animate-slowfade '>
            <LocationsTable locationType={locationType} />
        </div>
    );
};

export default Locations;