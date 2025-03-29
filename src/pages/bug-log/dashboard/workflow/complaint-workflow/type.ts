import { I_LIST_TYPE } from '@/types/listType'
export type I_USERS_TYPE = {
  _id: string
  fullName: string
  mobile: string
  email: string
  password: string
  roleId: string
  role: string
  address: string
  img: any
  roles: {
    _id: string,
    role: string,
    status: number,
    createdAt: string,
    updatedAt: string,
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
