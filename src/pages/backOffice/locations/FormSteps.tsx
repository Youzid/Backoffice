import FormSlider from './FormSlider';
import { useAppSelector } from '../../../store/store';
import { useLocation } from 'react-router-dom';
import BackArrowButton from '../../../components/buttons/BackArrowButton';
import CreateLocationForm from './Forms/CreateLocationForm';
import endpoints from '../../../api/endpoints';
import FormStepPoints from '../../../components/common/FormStepPoints';
import ImagesLocationForm from './Forms/ImagesLocationForm';
import { ILocationDetailsResponseBody } from '../../../data/response/ILocationDetailsResponseBody';
import useHttpRequest from '../../../utils/useHttpRequest';

const FormSteps = () => {
    const formStep = useAppSelector((state) => state.backOffice.formStep);
    const location = useLocation();
    const locationType = location.pathname.split("/")[2].split("-")[0];
    const locationId: string = location?.state?.id;

    const { data: locationToUpdate, manualRequest: refetch } = useHttpRequest<ILocationDetailsResponseBody>({
        endpoint: endpoints.LOCATIONS_GET_DETAILS_BY_ID_ENDPOINT + locationId,
        method: 'GET',
        skip: !locationId,
    });
    return (
        <div className=' relative  animate-slowfade'>
            <BackArrowButton path={`/admin/${locationType}`} />
            <div className='px-40'>
                <FormStepPoints formStep={formStep} disable={!locationToUpdate} />
            </div>
            <FormSlider formStep={formStep} targetStep={1} Child={() => <CreateLocationForm refetch={refetch} locationType={locationType} locationToUpdate={locationToUpdate} />} />
            <FormSlider formStep={formStep} targetStep={2} Child={() => <ImagesLocationForm refetch={refetch} locationToUpdate={locationToUpdate} />} />
        </div>
    );
};

export default FormSteps;