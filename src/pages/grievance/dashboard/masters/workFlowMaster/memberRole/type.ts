import { I_LIST_TYPE } from '@/types/listType'
export type I_Member_Role_TYPE = {
  _id: string
  roleName: string
  moduleId: string
 
  description: string
  modules: {
    _id: string,
    moduleName: string,
    status: number,
    createdAt: string,
    updatedAt: string,
  }
  status: number
  createdAt: string
  updatedAt: string
}

export type I_Member_Role_TYPE_VIEW = {
  success: boolean
  data: I_Member_Role_TYPE
}

export type I_Member_Role_TYPE_LIST = I_LIST_TYPE<I_Member_Role_TYPE>
