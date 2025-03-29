import React, { useState, useEffect } from 'react';
import { FaComments, FaUser, FaRobot } from 'react-icons/fa';
import { grievanceAPI } from '@/lib';
import { usePostMutation } from '@/hooks/useCustomQuery';
import toast from 'react-hot-toast';
type ComplaintData = {
  [key: string]: string;
};
const ChatBot = ({ status }: { status: boolean }) => {
  const [isOpen, setIsOpen] = useState(status || false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [complaintData, setComplaintData] = useState<ComplaintData>({});
  const [chatStarted, setChatStarted] = useState(false);
  const [startTracking, setStartTracking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ulbData, setUlbData] = useState<any[]>([]);
  const postMutation = usePostMutation({});
  const [showModal, setShowModal] = useState(false); 
  const [complaintRefNo, setComplaintRefNo] = useState(''); 

  const questions = [
    "Select ULB",
    "Please describe your complaint.",
    "Give More Information",
    "Grievance Location",
    "Grievance Type",
    "Is issue related to financial transaction?",
    "What is your complaint title?",
    "Full Name",
    "Mobile No.",
    "Email"
  ];

  useEffect(() => {
    const fetchUlbData = async () => {
      try {
        const response = await fetch('https://aadrikainfomedia.com/grievance-api/v1/ulb-direct/get-all-ulb-d?page=1&limit=10000');
        const data = await response.json();
        if (data && data?.data) {
          setUlbData(data?.data);
        }
      } catch (error) {
        console.error('Error fetching ULB data:', error);
      }
    };

    fetchUlbData();
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);

    if (isOpen) {
      setChatHistory([]);
      setComplaintData({});
      setCurrentQuestionIndex(0);
      setMessage('');
      setChatStarted(false);
      setStartTracking(false);
    }
  };
  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setMessage(event.target.value);
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value; 
    const selectedOption = ulbData.find(ulb => ulb._id === selectedValue); 
    if (selectedOption) {
      setMessage(selectedOption.ulbName); 
      setComplaintData(prevData => ({
        ...prevData,
        'Select ULB': selectedOption.ulbName, 
        'Select ULB Id': selectedOption._id 
      }));
      setChatHistory(prevHistory => [
        ...prevHistory,
        // `User selected ULB: ${selectedOption.ulbName} (ID: ${selectedOption._id})`
      ]);
    }
  };
  

  const handleSendMessage = () => {
    if (message.trim()) {
      const question = questions[currentQuestionIndex];
      setChatHistory((prev) => [
        ...prev,
        `ChatBot: ${question}`,
        `User: ${message}`
      ]);
      const updatedComplaintData = { ...complaintData, [question]: message };
      setComplaintData(updatedComplaintData);
      setMessage('');
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          setCurrentQuestionIndex(questions.length);
        }
      }, 1000);
    } else {
      alert("Please provide an answer.");
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex === 0 && !message) {
      alert("Please select a ULB before proceeding.");
      return;
    }
    if (currentQuestionIndex === 1 && !message.trim()) {
      alert("Please describe your complaint.");
      return;
    }
    if (currentQuestionIndex === questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  const handleGoBackToQuestions = () => {
    setCurrentQuestionIndex(0);
  };
  const handleConfirmSubmission = async () => {
    try {
      const formData = new FormData();
      formData.append('isCitizen', '1');
      formData.append('citizenName', complaintData['Full Name'] || '');
      formData.append('email', complaintData['Email'] || '');
      formData.append('mobileNo', complaintData['Mobile No.'] || '');
      formData.append('complaintTitle', complaintData['What is your complaint title?'] || '');
      formData.append('complaintDescription', complaintData['Please describe your complaint.'] || '');
      formData.append('moduleName', complaintData['Give More Information'] || '');
      // formData.append('ulbName', complaintData['Select ULB'] || '');
      // formData.append('ulbId', complaintData['Select ULB'] || '');
      formData.append('ulbName', complaintData['Select ULB'] || ''); 
    formData.append('ulbId', complaintData['Select ULB Id'] || '');
      formData.append('isTransactionIssue', complaintData['Is issue related to financial transaction?'] || 'false');
      formData.append('grievanceLocation', complaintData['Grievance Location'] || '');
      formData.append('problemTypeId', complaintData['Give More Information'] || '');
      formData.append('wardNo', complaintData['Give More Information'] || '');
      formData.append('area', complaintData['Give More Information'] || '');
      formData.append('latitude', complaintData['Give More Information'] || '');
      formData.append('longitude', complaintData['Give More Information'] || '');
      formData.append('holdingNo', complaintData['Give More Information'] || '');
      formData.append('safNo', complaintData['Give More Information'] || '');
      formData.append('consumerNo', complaintData['Give More Information'] || '');
      const url = grievanceAPI.createComplaintApplicationDirect;
      const res = await postMutation.mutateAsync({
        api: url,
        data: formData,
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message)
        setComplaintRefNo(res?.data?.data?.complaintRefNo); 
      setShowModal(true);
        setIsOpen(false);
        setChatHistory([]);
        setComplaintData({});
        setCurrentQuestionIndex(0);
        setMessage('');
        setChatStarted(false);
        setStartTracking(false);
      } else {
        alert('There was an error submitting your complaint.');
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred while submitting your complaint.");
    }
  };

  const [trackingNumber, setTrackingNumber] = useState('');
  const startChat = () => {
    setChatStarted(true);
    setCurrentQuestionIndex(0);
  };

  const startTrack = () => {
    setStartTracking(true);
  };
  const handleSubmitTracking = () => {
    console.log("Tracking Number Submitted: ", trackingNumber);
    if (trackingNumber) {
      // Proceed with tracking (e.g., fetch request, etc.)
    } else {
      alert("Please enter a valid tracking number.");
    }
  };

  return (
    <div style={{ zIndex: 10000 }}>
    {/* Floating Chat Icon */}
    <button
      onClick={toggleChat}
      className="relative bg-gradient-to-r from-emerald-500 to-green-400 p-4 rounded-full shadow-lg cursor-pointer transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 z-50"
    >
      <FaComments className="text-white text-2xl" />
    </button>
  
    {/* Chat Window */}
    {isOpen && (
      <div
        style={{ zIndex: 10000 }}
        className="fixed bottom-28 right-10 w-full max-w-md bg-white shadow-2xl rounded-2xl border-2 border-emerald-500 transition-all transform ease-in-out duration-300 overflow-y-auto"
      >
        <div className="chat-header flex justify-between items-center p-4 bg-gradient-to-r from-emerald-500 to-green-400">
          <div className="w-8"></div>
          <h3 className="font-bold text-xl text-white">Grievance Chatbot</h3>
          <button
            className="text-white hover:text-emerald-100 transition-colors"
            onClick={toggleChat}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
  
        {/* Chat History */}
  
  <div className="chat-history overflow-y-auto flex-1 h-64 mb-4 border-b border-emerald-100 p-4 space-y-4">
  {chatHistory.map((msg, index) => (
    <div
      key={index}
      className={`flex items-start space-x-3 ${msg.startsWith('ChatBot') ? 'justify-start' : 'justify-end'}`}
    >
      {msg.startsWith('ChatBot') ? (
        <>
          <FaRobot className="text-emerald-500 mt-1" />
          <p className="bg-emerald-100 text-emerald-800 rounded-lg py-2 px-4 max-w-[80%]">{msg}</p>
        </>
      ) : (
        <>
          <p className="bg-gray-100 text-gray-800 rounded-lg py-2 px-4 max-w-[80%]">{msg}</p>
          <FaUser className="text-gray-500 mt-1" />
        </>
      )}
    </div>
  ))}
</div>

{/* Greeting Message for Tracking */}
{!chatStarted && startTracking && (
  <div className="p-4 space-y-4">
    <h1 className="text-xl font-semibold text-emerald-700">Enter your Tracking Number</h1>
    <div className="space-y-4">
      <input
        type="text"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)} 
        placeholder="Tracking Number"
        className="w-full border border-emerald-300 p-3 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <div className="flex justify-center mt-4">
        <button onClick={handleSubmitTracking}
          className="w-full max-w-md bg-gradient-to-r from-emerald-500 to-green-400 text-white py-3 rounded-md hover:from-emerald-600 hover:to-green-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500" >
          Submit Tracking Number
        </button>
      </div>
    </div>
  </div>
)}
        {/* Start Chat Button (Greeting Message) */}
        {!chatStarted ? (
          <div className="p-4 bg-emerald-50">
            <div className="flex items-center space-x-3 mb-4">
              <FaRobot className="text-emerald-500 text-xl" />
              <p className="text-emerald-700 font-semibold">Welcome to the Grievance Chatbot. Ready to start?</p>
            </div>
            <div className="flex px-1">
              <button
                onClick={startChat}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-400 text-white py-3 rounded-md hover:from-emerald-600 hover:to-green-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Register Grievance
              </button>
              <button
                onClick={startTrack}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-400 text-white py-3 mx-1 rounded-md hover:from-emerald-600 hover:to-green-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Track Grievance 
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {/* Chat Flow */}
            {currentQuestionIndex === 0 ? (
             <div>
             <p className="text-emerald-700 font-semibold mb-2">{questions[currentQuestionIndex]}</p>
             <select  value={message}  onChange={handleSelectChange} className="w-full border border-emerald-300 p-3 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500" >
               {ulbData.map((ulb) => (
                 <option key={ulb._id} value={ulb._id}>
                   {ulb.ulbName}
                 </option>
               ))}
             </select>
           </div>
           
            ) : currentQuestionIndex === 1 ? (
              <div>
                <p className="text-emerald-700 font-semibold mb-2">{questions[currentQuestionIndex]}</p>
                <textarea
                  value={message}
                  onChange={handleMessageChange as any}
                  placeholder="Describe your grievance in detail..."
                  className="w-full border border-emerald-300 p-3 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none h-32"
                />
              </div>
            ) : currentQuestionIndex === questions.length ? (
              <div className="p-4 space-y-4">
                <h3 className="text-2xl font-semibold text-emerald-700 mb-4">Review Your Complaint</h3>
                <div className="bg-emerald-50 p-4 rounded-md shadow-md">
                  <table className="w-full table-auto text-left">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-sm font-semibold text-emerald-700">Field</th>
                        <th className="px-4 py-2 text-sm font-semibold text-emerald-700">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(complaintData).map((key, index) => (
                        <tr key={index} className="border-b border-emerald-200">
                          <td className="px-4 py-2 text-sm font-medium text-gray-700">{key}</td>
                          <td className="px-4 py-2 text-sm text-gray-800">{complaintData[key]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleConfirmSubmission}
                    className="w-full max-w-md bg-gradient-to-r from-emerald-500 to-green-400 text-white py-3 rounded-md hover:from-emerald-600 hover:to-green-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    Submit Complaint
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-emerald-700 font-semibold mb-2">{questions[currentQuestionIndex]}</p>
                <input
                  type="text"  value={message}  onChange={handleMessageChange}  className="w-full border border-emerald-300 p-3 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"  />
              </div>
            )}
            <div className="flex justify-between items-center">
              <button
                onClick={handleSkip}
                className="bg-emerald-100 text-emerald-700 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                Skip
              </button>
              <button
                onClick={handleSendMessage}
                className="bg-emerald-500 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500" >
                {isLoading ? 'Loading...' : 'Next'}
              </button>
            </div>
          </div>
        )}
      </div>
    )}
{showModal && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-xl font-semibold text-emerald-700 mb-4">Complaint Submitted Successfully</h2>
      <p className="text-gray-800 mb-4">Your complaint has been submitted. Below is your complaint reference number:</p>
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          value={complaintRefNo}
          readOnly
          className="border border-emerald-300 p-2 rounded-md text-gray-700"
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(complaintRefNo);
            toast.success('Complaint Reference Number copied to clipboard!'); }} 
            className="bg-emerald-500 text-white p-2 rounded-md hover:bg-emerald-600 focus:outline-none">
          Copy
        </button>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => setShowModal(false)}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
  </div>
  );
};
export default ChatBot;
