import { I_LIST_TYPE } from '@/types/listType'
export type I_WORK_FLOW_ROLE_TYPE = {
  _id: string
  workFlowRoleName: string
  status: number
  createdAt: string
  updatedAt: string
}

export type I_WORK_FLOW_ROLE_TYPE_VIEW = {
  success: boolean
  data: I_WORK_FLOW_ROLE_TYPE
}

export type I_WORK_FLOW_ROLE_TYPE_LIST = I_LIST_TYPE<I_WORK_FLOW_ROLE_TYPE>
