"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import enContent from "../data/content.en.json";
import teContent from "../data/content.te.json";

type Language = "en" | "te";
type ContentType = typeof enContent;

interface LanguageContextType {
    lang: Language;
    content: ContentType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const searchParams = useSearchParams();
    const [lang, setLang] = useState<Language>("te"); // Default to Telugu
    const [content, setContent] = useState<ContentType>(teContent);

    useEffect(() => {
        const queryLang = searchParams?.get("lang");
        if (queryLang === "en") {
            setLang("en");
            setContent(enContent);
        } else {
            setLang("te");
            setContent(teContent);
        }
    }, [searchParams]);

    return (
        <LanguageContext.Provider value={{ lang, content }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
