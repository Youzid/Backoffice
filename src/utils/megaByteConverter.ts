import './i18n';
import { t } from "i18next";

export const  megaByteConverter =(bytes:number) => {
  const megabytes = bytes / (1024 * 1024);
  return megabytes.toFixed(2) +" "+t("MB"); 
};