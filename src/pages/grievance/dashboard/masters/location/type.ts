import { I_LIST_TYPE } from '@/types/listType'
export type I_LOCATION_TYPE = {
  _id: string;
  latitude: string;
  longitude: string;
  ulbId: string;
  radius: string;
  ulb: {
    _id: string;
    ulbName: string;
    status: number;
    createdAt: string;
    updatedAt: string;
  }
  status: number;
  createdAt: string;
  updatedAt: string;
}

export type I_LOCATION_TYPE_VIEW = {
  success: boolean;
  data: I_LOCATION_TYPE;
}

export type I_LOCATION_TYPE_LIST = I_LIST_TYPE<I_LOCATION_TYPE>
