export type I_USERS_TYPE = {
  _id: string;
  grievanceReceived: number;
  grievanceResolved: number;
  grievancePending: number;
  grievanceReject: number;
}

export type I_USERS_TYPE_DETAILS = {
  success: boolean;
  data: I_USERS_TYPE;
}