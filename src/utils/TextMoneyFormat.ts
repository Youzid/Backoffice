// convert a simple text to money format
export const TextMoneyFormat = (value:number) => {
  return (value).toLocaleString("en-US")+" DZD";
};