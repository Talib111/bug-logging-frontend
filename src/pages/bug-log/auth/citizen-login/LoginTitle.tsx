import { Image } from "@/components/image";
import { CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/context";

export default function LoginTitle() {
  const { currentLanguage } :any= useAppContext();

  return (

    <div className="flex flex-col">
        <Image
          src="/images/citizen.png"
          width={500}
          height={371}
          alt="Logo"
          className="p-10"
        />
        <CardTitle className="px-6 py-2 text-3xl flex items-center">{currentLanguage?.QUERY_SOLVING_HEADING}</CardTitle>
      </div>
  );
}
