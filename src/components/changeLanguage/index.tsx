
import { useEffect } from "react";

// Extend window object to include google and googleTranslateElementInit
declare global {
    interface Window {
        google: any;
        googleTranslateElementInit: () => void;
    }
}

export default function index() {



    // Function to initialize Google Translate element
    const googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "en",
                    includedLanguages: "en,hi,mai",
                    autoDisplay: false, // Disable automatic popup
                },
                "google_translate_element" // The ID of the div where the widget will be rendered
            );
        }
    };

    // Load Google Translate script
    useEffect(() => {

        const addScript = document.createElement("script");
        addScript.src =
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(addScript);

        // Make sure the function is globally available
        window.googleTranslateElementInit = googleTranslateElementInit;

        // Clean up when component unmounts
        return () => {
            document.body.removeChild(addScript);
        };
    }, []);

    return (
        <div>
            <div id="google_translate_element" className="" style={{ zIndex: 2000 }} ></div>
        </div>
    )
}

