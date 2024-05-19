import React from 'react';
import { ReactComponent as ArrowIcon } from '../../assets/arrow.svg';
import { useLocation } from 'react-router-dom';
import i18n from '../../utils/i18n';

type Props = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onChange }) => {

  const { pathname } = useLocation();
  const isArabic = i18n.language ==="ar";

  const renderPageButtons = () => {
    if (totalPages <= 1) {
      return null;
    }

    const displayRange = 5;
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    let start = Math.max(currentPage - Math.floor(displayRange / 2), 1);
    const end = Math.min(start + displayRange - 1, totalPages);

    if (end - start + 1 < displayRange) {
      start = Math.max(end - displayRange + 1, 1);
    }

    return (
      <>
        {start > 1 && (
          <span className="w-14 h-8 flex flex-col items-center justify-center text-gray-400">...</span>
        )}
        {pages.slice(start - 1, end).map((page) => (
          <button
            key={page}
            className={`w-8 h-8 flex flex-col items-center justify-center border duration-150 mx-1 rounded ${currentPage === page ? 'bg-primaryColor border-primaryColor text-white shadow-md scale-95 brightness-110 cursor-default' : 'bg-lightPrimary border-lightPrimary text-gray-500 scale-105'
              }`}
            onClick={() => onChange(page)}
          >
            {page}
          </button>
        ))}
        {end < totalPages && (
          <span className="w-14 h-8 flex flex-col items-center justify-center text-gray-400">...</span>
        )}
      </>
    );
  };

  const isBegin = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className={`flex justify-center py-2 ${pathname === '/clients' && 'hidden'}`}>
        {totalPages > 0 &&
      <nav className="inline-flex bg-transparent rounded-xl">
        <button
        disabled={!isBegin}
        className={`mx-2 w-6 h-8 rounded-l flex flex-col  ${isArabic ? "rotate-180":"rotate-0" } items-center justify-center border bg-primaryColor border-primaryColor ${isBegin ? `rounded-l-md bg-primaryColor` : `opacity-40`
      }`}
      onClick={() => onChange(currentPage - 1)}
      >
          <ArrowIcon className={`text-white w-3 h-3`} />
        </button>
        {renderPageButtons()}
        <button
        disabled={!hasNext}
        className={`mx-2 w-6 h-8 rounded-r  flex ${isArabic ? "rotate-180":"rotate-0" }  flex-col items-center justify-center border bg-primaryColor border-primaryColor ${hasNext ? `rounded-r-md bg-primaryColor` : `opacity-40`
      }`}
      onClick={() => onChange(currentPage + 1)}
      >
          <ArrowIcon className="text-white rotate-180  w-3 h-3" />
        </button>
      </nav>
        }
    </div>
  );
};

export default Pagination;