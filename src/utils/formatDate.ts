import { t } from "i18next";

// added to return a formated day with hours and minutes
export const formatDate = (date:string) => {
    return date.split('T')[0] + ` ${t("at")} ` + date.split('T')[1].split(':').slice(0, 2).join(':');
  };
  
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
