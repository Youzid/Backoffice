import { useTranslation } from 'react-i18next';
import { ReactComponent as DeleteIcon } from '../../assets/CRUD/delete.svg';
import { ReactComponent as ArrowIcon } from '../../assets/next.svg';
import { ReactComponent as UserIcon } from '../../assets/user2.svg';
import { useState} from 'react';
import DeleteAlertModal from '../modals/DeleteAlertModal';
import { useAppSelector } from '../../store/store';
import endpoints from '../../api/endpoints';
import RenderStarIcons from './RenderStarIcons';
import { begin, rowsPerPage } from '../../utils/rowsPerPage';
import Pagination from '../common/Pagination';
import EmptyData from './EmptyData';
import { IReviewResponseBody } from '../../data/response/IReviewResponseBody';
import useHttpRequest from '../../utils/useHttpRequest';

interface IReviews {
  ListType: string;
  isLocationImage?: boolean;
  hideEmptyUi?:boolean
}
const Reviews = ({ ListType,  isLocationImage }: IReviews) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<Array<number>>([]);
  const [deleteReviewId, setDeleteReviewId] = useState<string | null>();
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, isError, data: reviewsList, pageCount, manualRequest: refetch } = useHttpRequest<IReviewResponseBody[]>({
    endpoint: endpoints.LOCATIONS_REVIEW_GET_LIST_ENDPOINT,
    method: 'GET',
    params: {listType:ListType, begin: begin(currentPage, rowsPerPage), count: rowsPerPage },
  }
  );
  const isAdmin = useAppSelector(state => state.auth.userType === "admin");

  const hanldeExpand = (index: number) => {
    if (expanded?.includes(index)) {
      setExpanded(expanded.filter(item => item !== index));
    } else {
      setExpanded([...expanded, index]);
    }
  };

  return (
    <div className="w-full flex flex-col items-centers">
      <div className="px-8 w-full">
      {(!isLoading) && (reviewsList && reviewsList?.length > 0) ?
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8  gap-y-10 pt-7">
              {reviewsList?.map((review, i) => (
                <div
                  className="space-y-4 relative bg-white shadow-lg shadow-black/5 p-6"
                  key={i}
                >
                  {isLocationImage && (
                    <div className="flex  items-center gap-4 pb-4 font-semibold text-sm">
                      <h1>{review?.locationName}</h1>
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-8">
                    <div className="flex items-center gap-2">
                      <UserIcon className='w-11 h-11 rounded-full'/>
                      <div className="text-[12px]">
                        <h1 className="font-semibold capitalize">{review?.userName}</h1>
                        <h1>{review?.date?.split('T')[0]}</h1>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <RenderStarIcons starCount={review?.rating} />
                      {review?.rating}
                    </div>
                  </div>
                  <div
                    className={`duration-150 max-lg:text-[11px] ${
                      expanded?.includes(i) ? 'max-h-68 lg:max-h-64' : 'max-h-[160px] lg:max-h-[70px] overflow-hidden'
                    }`}
                  >
                    {review?.comment}
                  </div>
                  {review.comment?.length > 250 && (
                    <button
                      onClick={() => hanldeExpand(i)}
                      className="group max-lg:text-sm text-left  font-semibold flex items-center gap-4 -translate-y-3"
                    >
                      <h1 className="w-fit">{expanded?.includes(i) ? t('showLess') : t('showMore')}</h1>
                      <ArrowIcon
                        className={`w-[8px] duration-75 ${
                          expanded?.includes(i)
                            ? ' -rotate-90 group-hover:-translate-y-1'
                            : 'rotate-90 group-hover:translate-y-1'
                        }`}
                      />
                    </button>
                  )}
                  {(isAdmin )  && (
                    <DeleteIcon
                      onClick={() => setDeleteReviewId(review.id)}
                      className="text-primaryRed w-6 h-6 hover:bg-primaryRed hover:text-white duration-200 p-1 rounded cursor-pointer absolute end-4 bottom-3"
                    />
                  )}
                </div>
              ))}
            </div>
          :
          <EmptyData isError={isError} title="reviews" isLoading={isLoading} dataLength={reviewsList?.length || 0} />
        }
      </div>
      {rowsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(pageCount / rowsPerPage)}
          onChange={(page: number) => setCurrentPage(page)}
        />
      )}
      {deleteReviewId && (
        <DeleteAlertModal
          id={deleteReviewId}
          title="LOCATIONS_REVIEW"
          refetch={refetch}
          onClose={() => setDeleteReviewId(null)}
        />
      )}
    </div>
  );
};

export default Reviews;
