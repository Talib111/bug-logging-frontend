export default function index({ status }: any) {
    return (
        <div className="mx-4 p-4">
            <div className="flex items-center justify-between">
                {/* 1 */}
                <div className={`flex items-center ${(status == 8 || status == 7 || status == 6 || status == 5 || status == 4 || status == 3 || status == 2 || status == 1) ? 'text-white' : 'text-gray-400'}`}>
                    <div className={`flex justify-center items-center rounded-full transition duration-500 ease-in-out h-7 w-7 py-3 border-2 ${(status == 8 || status == 7 || status == 6 || status == 5 || status == 4 || status == 3 || status == 2 || status == 1) ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300'}`}>
                        <span>1</span>
                    </div>
                </div>
                <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${(status == 8 || status == 7 || status == 6 || status == 5 || status == 4 || status == 3 || status == 2 || status == 1) ? 'border-indigo-500' : 'border-gray-300'}`}></div>

                {/* 2 */}
                <div className={`flex items-center ${(status == 8 || status == 7 || status == 6 || status == 5 || status == 4 || status == 3 || status == 2) ? 'text-white' : 'text-gray-400'}`}>
                    <div className={`flex justify-center items-center rounded-full transition duration-500 ease-in-out h-7 w-7 py-3 border-2 ${(status == 8 || status == 7 || status == 6 || status == 5 || status == 4 || status == 3 || status == 2) ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300'}`}>
                        <span>2</span>
                    </div>
                </div>
                <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${(status == 8 || status == 7 || status == 6 || status == 5 || status == 4 || status == 3 || status == 2) ? 'border-indigo-500' : 'border-gray-300'}`}></div>
                {/* 3 */}
                <div className={`flex items-center ${(status == 8 || status == 7 || status == 6 || status == 5 || status == 4 || status == 3) ? 'text-white' : 'text-gray-400'}`}>
                    <div className={`flex justify-center items-center rounded-full transition duration-500 ease-in-out h-7 w-7 py-3 border-2 ${(status == 8 || status == 7 || status == 6 || status == 5 || status == 4 || status == 3) ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300'}`}>
                        <span>3</span>
                    </div>
                </div>
                {/* <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${(status == 8 || status == 7 || status == 6 || status == 5 || status == 4 || status == 3) ? 'border-indigo-500' : 'border-gray-300'}`}></div> */}
                {/* 4 */}
                {/* <div className={`flex items-center ${status == 8 || status == 7 || status == 6 || status == 5 || status == 4 ? 'text-white' : 'text-gray-400'}`}>
                    <div className={`flex justify-center items-center rounded-full transition duration-500 ease-in-out h-7 w-7 py-3 border-2 ${status == 8 || status == 7 || status == 6 || status == 5 || status == 4 ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300'}`}>
                        <span>4</span>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

