export const getRedirect = (role: string) => {

  if (role == 'SUPER ADMIN') {
    return "/bug-log/dashboard/home";
  }
  return "/bug-log/dashboard/client-home"
};