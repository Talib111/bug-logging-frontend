import { useContext, createContext, useMemo } from 'react';
import TitleContext from './titleContext';
import AuthContext from './AuthContext';
import LanguageContext from './LanguageContext';

type CONTEXT_TYPE = ReturnType<typeof TitleContext> &
  ReturnType<typeof AuthContext> & ReturnType<typeof LanguageContext>;

export const AppContext = createContext({} as CONTEXT_TYPE);
export function useAppContext() {
  return useContext(AppContext);
}

export default function AppProvider({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const titleContext = TitleContext();
  const authContext = AuthContext();
  const languageContext = LanguageContext();
  const contextValue = useMemo(
    () => ({ ...titleContext, ...authContext, ...languageContext }),
    [titleContext, authContext]
  );
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
