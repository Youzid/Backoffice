
export const compareDates = (dateStr1: string, dateStr2: string) => {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);

    if (date1 > date2) {
        return 1;
    } else if (date1 < date2) {
        return -1;
    } else {
        return 0;
    }
};

