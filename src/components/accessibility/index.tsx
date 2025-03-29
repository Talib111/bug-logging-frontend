import { TypeOutline } from "lucide-react"
import ThemeSwitch from '@/components/theme-switch'
import { useEffect } from "react";
import { CardTitle } from "../ui/card";

// Extend window object to include google and googleTranslateElementInit
declare global {
    interface Window {
        google: any;
        googleTranslateElementInit: () => void;
    }
}

export default function index() {

    const accessibilityOptions = [
        { id: 1, title: 'Theme', icon: <ThemeSwitch /> },
        // { id: 1, title: 'Language', icon: <TypeOutline /> },
    ]

    // Function to initialize Google Translate element
    const googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "en",
                    includedLanguages: "en,hi,mr",
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
            <div className="grid grid-cols-4  relative">
                {/* <CardTitle className="absolute">| Change Language</CardTitle> */}
                {/* <div id="google_translate_element" className="absolute top-8 left-0 bg-purple-50 p-2 rounded border" style={{ zIndex: 2000 }} ></div> */}

              {/* <CardTitle className="col-span-4 mt-26 mb-4">| Other Options</CardTitle>   */}
                {accessibilityOptions?.map((item: any) => (
                    <div className="mb-2" key={item?.id}>
                        <div className="w-16 h-16 rounded-lg overflow-hidden border p-2 flex justify-center items-center">
                            {item?.icon}
                        </div>
                        <div className="font-semibold ">{item?.title}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

