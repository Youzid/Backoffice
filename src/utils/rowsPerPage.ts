export const rowsPerPage = 10;
export const begin = (currentPage:number, rowsPerPage:number) => {
    let begin = 0;
    if (currentPage > 1) {
      begin = rowsPerPage * (currentPage - 1);
    }
    return begin;
  };