import MyLanguage from '@/pages/grievance/citizen/citizen-complaint-form/user-inputs/language';
import { useState } from 'react';

export default function LanguageContext() {
  const [currentLanguage, setcurrentLanguage] = useState<string>(MyLanguage('english'));
  const [languageKey, setlanguageKey] = useState<string>('english');
  return {
    currentLanguage: currentLanguage,
    setcurrentLanguage: setcurrentLanguage,
    languageKey: languageKey,
    setlanguageKey: setlanguageKey
  };
}
