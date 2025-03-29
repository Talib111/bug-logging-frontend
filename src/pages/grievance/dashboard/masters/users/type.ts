import { I_LIST_TYPE } from '@/types/listType'
export type I_USERS_TYPE = {
  _id: string
  fullName: string
  mobile: string
  email: string
  password: string
  roleId: string
  ulbId: string
  role: string
  address: string
  imageUrl: any
  fullImgUrl: any
  userUlbId:string
  ulbName:string
  ulb:string
  roles: {
    _id: string,
    role: string,
    status: number,
    createdAt: string,
    updatedAt: string,
    ulbId:string
  }
  status: number
  createdAt: string
  updatedAt: string
}

export type I_USERS_TYPE_VIEW = {
  success: boolean
  userDetails: I_USERS_TYPE
  
}



export type I_USERS_TYPE_LIST = I_LIST_TYPE<I_USERS_TYPE>
