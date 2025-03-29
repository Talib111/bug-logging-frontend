import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from 'react-hot-toast'
import AllRoutes from './routes'

// Extend window object to include google and googleTranslateElementInit
// declare global {
//   interface Window {
//     google: any;
//     googleTranslateElementInit: () => void;
//   }
// }

export default function App() {

  // // Function to initialize Google Translate element
  // const googleTranslateElementInit = () => {
  //   if (window.google && window.google.translate) {
  //     new window.google.translate.TranslateElement(
  //       {
  //         pageLanguage: "en",
  //         autoDisplay: false, // Disable automatic popup
  //       },
  //       "google_translate_element" // The ID of the div where the widget will be rendered
  //     );
  //   }
  // };

  // // Load Google Translate script
  // useEffect(() => {
  //   const addScript = document.createElement("script");
  //   addScript.src =
  //     "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  //   document.body.appendChild(addScript);

  //   // Make sure the function is globally available
  //   window.googleTranslateElementInit = googleTranslateElementInit;

  //   // Clean up when component unmounts
  //   return () => {
  //     document.body.removeChild(addScript);
  //   };
  // }, []);
  return (
    <TooltipProvider>
        {/* <div id="google_translate_element" className=" absolute top-14 right-4 bg-purple-50 p-2 rounded"  style={{ zIndex: 1000 }} ></div> */}
      <Toaster position='top-center' reverseOrder={false} toastOptions={{}} />
      <AllRoutes />
    </TooltipProvider>
  )
}
