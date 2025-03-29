# Rules Informatory

### Roles
1. State Gro
2. Stage Ivr/Calling/Entry
3. Ulb Gro (Every ulb will have its ulb gro with attached ulb id)
4. Ulb Ivr/Calling/Entry


### Rules
1. Complaint having ulb defined will go to ulb gro
2. complaint having others in ulb will go to state gro



### CREATION OF USERS
1. SUPERADMIIN/State-Admin - superadmin can create 
                    State Admin
                    State Gro
                    Ulb Admin
                    Stage Ivr/Calling/Entry

2. ULB ADMIN - Ulb admin can create
                    can create all excluding (above four and superadmin)


### COMPLAINT FLOW
1. State-Gro - All complaints having ulb as others will go to state gro

2. Ulb-Gro - All complaints having ulb defined will go to that ulb gro


### Workflow Action Options
1. State Gro - 
                Can Reject
                Can Resolve
                Can Send to any ulb(internaly others ulb will be changed to selected ulb)
                permission conditions : (wf_currentWorkflowId===null,complaintApplication?.ulbId === ULB_OTHERS)

2. Ulb Gro - 
                can reject
                can resolve
                can send to any descending workflow 


3. Worflow members - 
                can reject
                can resolve
                can send to any descending workflow
                can send to current workflow members


### Complaint Workflow Control status
1. wf_status
            wf_status = 0 (newly generated complaint)
            wf_status = 1 (resolved)
            wf_status = 2 (reject)
            wf_status = 3 (reopened)
            wf_status = 4 (closed by citizen)
