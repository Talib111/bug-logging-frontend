export const authApi = {
  login: '/auth/login',
  // login: import.meta.env.VITE_LOGIN_URL || '/auth/login',
  citizenLogin: '/auth/login',
  googleAuth: '/auth/google-login',
  getUser: '/user/get-user',
} as const

export const grievanceAPI = {
  // ════════════════════════════║  API OF USERS MASTER ║═════════════════════════════════
  // createUser: '/user/create-user',
  createUser: '/user/create-user-with-image',
  getAllUser: '/user/get-all-user',
  getAllUserMasterList: '/user/get-all-user-mater-list',
  getAllUserByUlb: '/user/get-all-user-by-ulb',
  updateUser: '/user/update-profile',
  deleteUser: '/user/delete-user',
  getUserById: '/user/edit',
  updateUserStatus: '/user/update-user-status',
  



  // ════════════════════════════║  API OF ROLE MASTER ║═════════════════════════════════
  createRole: '/role/create-role',
  getAllRole: '/role/get-all-role',
  getAllRoleByPermission: 'role-d/get-role-by-admin',
  updateRole: '/role/update-role',
  deleteRole: '/role/delete-role',
  getRoleById: '/role/get-role-by-id',
  updateRoleStatus: '/role/update-role-status',

   // ════════════════════════════║  API OF PROJECT MASTER ║═════════════════════════════════
   createProject: '/project/create-project',
   getAllProject: '/project/get-all-project',
   updateProject: '/project/update-project',
   deleteProject: '/project/delete-project',
   getProjectById: '/project/get-project-by-id',
   updateProjectStatus: '/project/update-project-status',
   
  // ════════════════════════════║  API OF PROBLEM MASTER ║═════════════════════════════════
  createProblem: '/problem/create-problem',
  getAllProblem: '/problem/get-all-problem',
  getAllProblemDirect: '/problem-direct/get-all-problem',
  updateProblem: '/problem/update-problem',
  deleteProblem: '/problem/delete-problem',
  getProblemById: '/problem/get-problem-by-id',
  updateProblemStatus: '/problem/update-problem-status',
  // ════════════════════════════║  API OF Department MASTER ║═════════════════════════════════
  createDepartment: '/department/create-department',
  getAllDepartment: '/department/get-all-department',
  updateDepartment: '/department/update-department',
  deleteDepartment: '/department/delete-department',
  getDepartmentById: '/department/get-department-by-id',
  updateDepartmentStatus: '/department/update-department-status',

  // ════════════════════════════║  API OF COMPLAINT  MASTER ║═════════════════════════════════
  createComplaint: '/complaint/create-complaint',
  getAllComplaint: '/complaint/get-all-complaint',
  updateComplaint: '/complaint/update-complaint',
  deleteComplaint: '/complaint/delete-complaint',
  getComplaintById: '/complaint/get-complaint-by-id',
  updateComplaintStatus: '/complaint/update-complaint-status',
  getAllComplaintDirect: '/complaint-direct/get-all-complaint',
  getAllComplaintByIdDirect: '/complaint-direct/get-complaint-by-module-id',

  // ════════════════════════════║  API OF MODULE MASTER ║═════════════════════════════════
  createModule: '/module/create-module',
  getAllModule: '/module/get-all-module',
  getAllModuleDirect: '/module-direct/get-all-module-d',
  updateModule: '/module/update-module',
  deleteModule: '/module/delete-module',
  getModuleById: '/module/get-module-by-id',
  updateModuleStatus: '/module/update-module-status',

  // ════════════════════════════║  API OF ULB MASTER ║═════════════════════════════════
  createUlb: '/ulb/create-ulb',
  getAllUlb: '/ulb/get-all-ulb',
  getAllUlbDirect: '/ulb-direct/get-all-ulb-d',
  updateUlb: '/ulb/update-ulb',
  deleteUlb: '/ulb/delete-ulb',
  getUlbById: '/ulb/get-ulb-by-id',
  updateUlbStatus: '/ulb/update-ulb-status',

  // ════════════════════════════║  API OF PRIORITY MASTER ║═════════════════════════════════
  createPriority: '/priority/create-priority',
  getAllPriority: '/priority/get-all-priority',
  updatePriority: '/priority/update-priority',
  deletePriority: '/priority/delete-priority',
  getPriorityById: '/priority/get-priority-by-id',
  updatePriorityStatus: '/priority/update-priority-status',

  // ════════════════════════════║  API OF TARGET MASTER ║═════════════════════════════════
  createTarget: '/target/create-target-type',
  getAllTarget: '/target/get-all-target-type',
  updateTarget: '/target/update-target-type',
  deleteTarget: '/target/delete-target-type',
  getTargetById: '/target/get-target-type-by-id',
  updateTargetStatus: '/target/update-target-status',

  // ════════════════════════════║  API OF WORKFLOW ROLE MASTER ║═════════════════════════════════
  createWorkFlowRole: '/workflow-role/create-workflow-role',
  getAllWorkFlowRole: '/workflow-role/get-all-workflow-role',
  updateWorkFlowRole: '/workflow-role/update-workflow-role',
  deleteWorkFlowRole: '/workflow-role/delete-workflow-role',
  getWorkFlowRoleById: '/workflow-role/get-workflow-role-by-id',
  updateWorkFlowRoleStatus: '/workflow-role/update-workflow-role-status',

  // ════════════════════════════║  API OF WORKFLOW MASTER ║═════════════════════════════════
  createWorkFlow: '/workFlow/create-workFlow',
  getAllWorkFlow: '/workFlow/get-all-workFlow',
  getUlbSpecificWorkFlow: '/workFlow/get-ulb-specific-workFlow',
  updateWorkFlow: '/workFlow/update-workFlow',
  deleteWorkFlow: '/workFlow/delete-workFlow',
  getWorkFlowById: '/workFlow/get-workFlow-by-id',
  updateWorkFlowStatus: '/workFlow/update-workFlow-status',

  // ════════════════════════════║  API OF TABLE FORM MASTER ║═════════════════════════════════
  createTableForm: '/table-form/create-tableform',
  getAllTableForm: '/table-form/get-tableform-by-formtype',
  updateTableForm: '/table-form/update-tableform',
  deleteTableForm: '/table-form/delete-tableform',
  getTableFormById: '/table-form/get-formtype-by-id',
  updateTableFormStatus: '/table-form/update-tableform-status',

  // ════════════════════════════║  API OF WORKFLOW USER MAPPING MASTER ║═════════════════════════════════
  createWFUserMapping: '/workFlow-user-mapping/create-workFlow-user-map',
  getAllWFUserMapping: '/workFlow-user-mapping/get-workflow-user-map-by-id',
  getAllWFUserMappingToTransfer: '/workFlow-user-mapping/get-workflow-user-map-by-id-to-transfer',
  // updateWFUserMapping: '/workFlow-user-mapping/update-tableform',
  deleteWFUserMapping: '/workFlow-user-mapping/delete-workflow-user-map',
  getWFUserMappingById: '/workFlow-user-mapping/get-workflow-user-by-id',
  updateWFUserAndMemberMapping: '/workFlow-user-mapping/update-workflow-member-workflow-role-mapping',
  updateWFUserMappingStatus: '/workFlow-user-mapping/update-workflow-user-map-status',

  // ════════════════════════════║  API OF COMPLAINT SOURCE MASTER ║═════════════════════════════════
  createComplaintSource: '/complaint-source/create-complaint-source',
  getAllComplaintSource: '/complaint-source/get-all-complaint-source',
  updateComplaintSource: '/complaint-source/update-complaint-source',
  deleteComplaintSource: '/complaint-source/delete-complaint-source-by-id',
  getComplaintSourceById: '/complaint-source/get-complaint-source-by-id',
  updateComplaintSourceStatus: '/complaint-source/update-complaint-source-status',

  // ════════════════════════════║  API OF COMPLAINT TYPE MASTER ║═════════════════════════════════
  createComplaintType: '/complaint-type/create-complaint-type',
  getAllComplaintType: '/complaint-type/get-all-complaint-type',
  updateComplaintType: '/complaint-type/update-complaint-type',
  deleteComplaintType: '/complaint-type/delete-complaint-type-by-id',
  getComplaintTypeById: '/complaint-type/get-complaint-type-by-id',
  updateComplaintTypeStatus: '/complaint-type/update-complaint-type-status',

  // ════════════════════════════║  API OF LOCATION MASTER ║═════════════════════════════════
  createLocation: '/location/create-location',
  getAllLocation: '/location/get-all-location',
  updateLocation: '/location/update-location',
  deleteLocation: '/location/delete-complaint-by-id',
  getLocationById: '/location/get-location-by-id',
  updateLocationStatus: '/location/update-location-status',

  // ════════════════════════════║  API OF NOTIFICATION MASTER ║═════════════════════════════════
  createNotification: '/notifications/create-notification',
  getAllNotification: '/notifications/get-all-notification',
  updateNotification: '/notifications/update-notification',
  deleteNotification: '/notifications/delete-notification-by-id',
  getNotificationById: '/notifications/get-notification-by-id',
  updateNotificationStatus: '/notifications/update-notification-status',
  getUserNotification: '/notifications-direct/get-user-notification',
  getUserNotificationAuth: '/notifications/get-user-notification',

  // ════════════════════════════║  API OF COMPLAINT APPLICATIONS ║═════════════════════════════════
  updateReminder: '/complaint-application-direct/reminder-complaint',
  createComplaintApplication: '/complaint-application/create-complaint',
  createComplaintApplicationDirect: '/complaint-application-direct/create-complaint',
  updateComplaintApplication: '/complaint-application/update-complaint-by-id', // this is Post Method
  updateComplaintApplicationById: '/complaint-application/update-complaint-application', // this is put Method
  getComplaintDetailsByComplaintNo: '/complaint-application-direct/get-complaint-application',
  getComplaintDetails: '/complaint-application/get-all-complaint-applications',
  getComplaintDetailsById: '/complaint-application/get-complaint-application-by-id',
  getComplaintInbox: '/complaint-application/get-complaint-inbox',
  getComplaintOutbox: '/complaint-application/get-complaint-outbox',
  getComplaintSpecial: '/complaint-application/get-complaint-special',
  getComplaintHighlight: '/complaint-application/get-complaint-highlight',
  escalateAction: '/complaint-application/escalate-toggle',
  getAllComplaints: '/complaint-application/get-all-complaints',
  getCitizenComplaints: '/complaint-application/get-citizen-complaints',
  searchComplaint: '/complaint-application-direct/search-complaints',
  transferComplaintToUlb: '/complaint-application/transfer-complaint',
  transferComplaintToUlbSpecific: '/complaint-application/transfer-complaint-to-ulb',
  moveComplaintToMe: '/complaint-application/move-complaint-to-me',
  getAllCommentsByComplaintId: '/complaint-application/get-comments-by-complaint-id',
  openComment: '/complaint-application/open-comment',
  openCommentDirect: '/complaint-application-direct/open-comment',
  rejectComplaint: '/complaint-application/reject-complaint',
  closeComplaint: '/complaint-application-direct/close-complaint',
  resolveComplaint: '/complaint-application/resolved-complaint',
  reopenComplaint: '/complaint-application-direct/reopen-complaint',

  // ════════════════════════════║  API OF NLP CHATBOT ║═════════════════════════════════
  chatbot: '/chatbot/chat',

  // ════════════════════════════║  API OF COMPLAINT BRIEF  ║═════════════════════════════════
  getComplaintBrief: '/complaint-brief/get-all-complaint-brief',
  getComplaintBriefDirect: '/complaint-brief-direct/get-all-complaint-brief-direct',

  // ════════════════════════════║  API OF COMPLAINT BRIEF  ║═════════════════════════════════
  // postAuthGoogleLogin : '/api/v1/auth/google-login'
  postAuthGoogleLogin: '/auth-google/google-login',

  // ════════════════════════════║  API OF CHANGE PASSWORD  ║═════════════════════════════════
  changePassword: '/change-pass/change-password',

  // ════════════════════════════║  API OF FEEDBACK   ║═════════════════════════════════
  createCitizenFeedback: '/feedback/create-citizen-feedback',
  getCitizenFeedback: '/feedback/get-all-citizen-feedback',
  getAllCitizenFeedback: '/feedback-admin/get-all-citizen-feedback-status',
  updateCitizenFeedback: '/feedback-admin/update-feedback-status',

  // ════════════════════════════║  API OF   ║═════════════════════════════════
  citizenRegistration: '/auth/citizen-register',
  sendOtp: '/otp/send-otp',
  verifyEmailOtp: '/otp/verify-otp',
  verifyOtp: '/auth/verify-otp',
  forgetPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',

  // ════════════════════════════║  API OF PERMISSIONS  ║═════════════════════════════════
  checkWfModulePermission: '/workFlow-permission/check-workflow-module-permission',
  checkWfActions: '/workflow-permission/check-workflow-actions',
  checkGeneralActions: '/workflow-permission/check-general-actions',

  // ════════════════════════════║  API OF LOGS  ║═════════════════════════════════
  complaintApplicationLog: '/log/get-complaint-log',

  // ════════════════════════════║  API OF REPORTS  ║═════════════════════════════════
  complaintReport: '/complaint-application/complaint-report',

  complaintTimeDurationReport: '/complaint-application/time-duration-report',
  complaintWorkflowWiseReport: '/complaint-application/workflow-wise-report',
  complaintWorkflowWiseReportById: '/complaint-application/complaint-by-workflow-wf-id',

  // ════════════════════════════║  API OF CITIZEN DASHBOARD  ║═════════════════════════════════
  citizenDashboard: '/citizen-dashboard/get-citizen-dashboard',

  // ════════════════════════════║  API OF CITIZEN Tools Api  ║═════════════════════════════════
  citizenFindNewHolding: '/property/reports/oldHolding',
  // ════════════════════════════║  API OF CITIZEN Tools Api  ║═════════════════════════════════


} as const