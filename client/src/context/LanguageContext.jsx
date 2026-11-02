import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguageState] = useState(() => {
        return localStorage.getItem('cropcycle_lang') || 'en';
    });

    const setLanguage = (lang) => {
        if (translations[lang]) {
            setLanguageState(lang);
            localStorage.setItem('cropcycle_lang', lang);
        }
    };

    const t = translations[language] || translations.en;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages: translations }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
};
