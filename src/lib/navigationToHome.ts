export const getRedirect = (role: string) => {

    if(role=='Citizen user'){
      return "/grievance/citizen-dashboard/home";
    }
    if(role=='State Admin'){
      return "/grievance/dashboard/analytics-dashboard";
    }
    if(role != 'State Admin' && role != 'Citizen user'){
      return "/grievance/dashboard/home";
    } 
    return "/grievance"
   };