import { I_LIST_TYPE } from '@/types/listType'
export type I_WORK_FLOW_MASTER_TYPE = {
  _id: string
  ulbId: string
  moduleId: string
  workFlowName: string
  parentId: string
  levelSerial: string
  status: number
  createdAt: string
  updatedAt: string
  ulb: { ulbName: string }
  module: { moduleName: string }

}

export type I_WORK_FLOW_MASTER_TYPE_VIEW = {
  success: boolean
  data: I_WORK_FLOW_MASTER_TYPE
}

export type I_WORK_FLOW_MASTER_TYPE_LIST = I_LIST_TYPE<I_WORK_FLOW_MASTER_TYPE>


// workflow user mapped by Id

export type I_WORK_FLOW_USER_MAP_TYPE = {
  _id: string
  userId: string
  UserName: string
  workflowRoleName: string
  workflowRoleId: string
  status: number
  createdAt: string
  updatedAt: string

  WorkFlow: {
    _id: string
    workFlowName: string
    ulbId: string
    moduleId: string
    parentId: string,
    levelSerial: number,
    status: number,
    createdAt: string,
    updatedAt: string
  }
}

export type I_WORK_FLOW_USER_MAP_TYPE_VIEW = {
  success: boolean
  data: I_WORK_FLOW_USER_MAP_TYPE
}

export type I_WORK_FLOW_USER_MAP_TYPE_LIST = I_LIST_TYPE<I_WORK_FLOW_USER_MAP_TYPE>