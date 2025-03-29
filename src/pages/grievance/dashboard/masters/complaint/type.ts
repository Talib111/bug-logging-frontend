import { I_LIST_TYPE } from '@/types/listType'
export type I_COMPLAINT_TYPE = {
  _id: string;
  titleName: string;
  moduleId: string;
 
  description: string;
  modules: {
    _id: string;
    moduleName: string;
    status: number;
    createdAt: string;
    updatedAt: string;
  }
  status: number;
  createdAt: string;
  updatedAt: string;
}

export type I_COMPLAINT_TYPE_VIEW = {
  success: boolean;
  data: I_COMPLAINT_TYPE;
}

export type I_COMPLAINT_TYPE_LIST = I_LIST_TYPE<I_COMPLAINT_TYPE>
