import checkJson from "@/components/animation-files/check.json";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

function useCheckAnimation({ title }: any) {
    const [isAnimate, setisAnimate] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setisAnimate(false)
        }, 1600);

    }, [])

    return (
        <>
            {isAnimate && <div style={{ zIndex: 1001 }} className="w-full h-full fixed top-0 left-0 bg-white z-50 flex justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                    <Lottie className="w-24" animationData={checkJson} loop={true} />
                    <div className="font-semibold">{title}</div>
                </div>
            </div>}
        </>
    )
}

export default useCheckAnimation