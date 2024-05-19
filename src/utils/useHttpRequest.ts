import { useEffect, useState } from 'react';
import { axiosInstance } from '../api/axios';
import toast from 'react-hot-toast';
import SubmitResponseHandler from '../components/common/SubmitResponseHandler';
import { t } from 'i18next';

interface ApiRequestParams {
  [key: string]: any;
}

// eslint-disable-next-line
interface UseHttpRequestProps<T> {
  endpoint: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  params?: ApiRequestParams;
  skip?: boolean; // used to add a condition  before making a auto fetch request
}

const useHttpRequest = <T>({ endpoint, method, params, skip }: UseHttpRequestProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pageCount, setPageCount] = useState<number>(0);
  const [data, setData] = useState<T>();
  const jsonParams = JSON.stringify(params);
  
  const callRequest = async (body?: any, id?: string,successMsg?:string,refetch?:any) => {
    setIsLoading(true);
    setIsError(false);

    try {
      let response;
      switch (method) {
        case 'GET':
          response = await axiosInstance.get(endpoint, { params });
          setPageCount(response?.data?.totalCount);
          break;
        case 'POST':
          response = await axiosInstance.post(`${endpoint}${id ? `${id}` : ''}`, body, { params });
          refetch && refetch();
          successMsg && toast.success(t(successMsg));
          break;
        case 'PATCH':
          response = await axiosInstance.patch(`${endpoint}${id ? `${id}` : ''}`, body, { params });
          refetch && refetch();
          successMsg && toast.success(t(successMsg));
          break;
        case 'DELETE':
          response = await axiosInstance.delete(`${endpoint}${id ? `${id}` : ''}`, { params });
          refetch && refetch();
          successMsg && toast.success(t(successMsg));
          break;
      }
      setData(response?.data?.response);
    } catch (err:any) {
      if (err.response && err.response.status !== 403) {
        toast.error(SubmitResponseHandler({ message: err?.response.data?.message, errorCodeStr: err?.response.data?.errorCodeStr }));
        setIsError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  //HANDLING AUTO REQUESTS
  useEffect(() => {
    if (method === "GET" && !skip) {
      callRequest();
    }
    // function can't be a dependency
    // eslint-disable-next-line
  }, [endpoint, method, jsonParams,skip]);

  //HANDLING MANUAL REQUESTS
  const manualRequest = (body?: any, id?: string,successMsg?:string,refetch?:()=>void) => {
    callRequest(body, id,successMsg,refetch);
  };

  return { isLoading, isError, data, manualRequest, pageCount };
};

export default useHttpRequest;
