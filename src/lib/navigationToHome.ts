export const getRedirect = (role: string) => {

    if(role=='Citizen user'){
      return "/bug-log/citizen-dashboard/home";
    }
    if(role=='State Admin'){
      return "/bug-log/dashboard/analytics-dashboard";
    }
    if(role != 'State Admin' && role != 'Citizen user'){
      return "/bug-log/dashboard/home";
    } 
    return "/bug-log"
   };