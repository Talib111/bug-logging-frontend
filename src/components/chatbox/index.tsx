// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable react/react-in-jsx-scope */
import { FaList } from "react-icons/fa";
import React, { useState, useEffect, useRef } from 'react';
import { FaComments, FaPaperclip } from 'react-icons/fa';
import { useForm, FormProvider, useFormContext, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

import { grievanceAPI } from "@/lib"
import toast from "react-hot-toast"
import { useAppContext } from "@/context"
import { usePostMutation } from '@/hooks/useCustomQuery';

type MessageType = {
  sender: 'user' | 'bot';
  content: string | JSX.Element; // Allow JSX.Element
  options?: string[];
};

type UserData = {
  comments: any;
  resolutionType: any;
  mobileNo: any;
  fullName: any;
  title: any;
  isFinancialTransaction: any;
  grievanceType: any;
  location: any;
  additionalInfo: any;
  complaint: any;
  ulb: any;
  ulbName: any;
  name?: string;
  email?: string;
  document?: any;
  selectedOption?: string;
  moduleName:any;
  module:any;
  customAddress:any;
  tempNo:any;
  tempNoLabel:any;
  fixedNoLabel:any;
  fixedNo:any;
  isTransactionIssue:any;
  transactionNo:any;
  problemTypeId:any;
  wardNo:any;
  area:any;
  latitude:any;
  longitude:any;
  holdingNo:any;
  safNo:any;
  consumerNo:any;
  grievanceLocation:any;
  hasDocuments:string;

};

const schema = yup.object().shape({
  msgBox: yup.string().required(" ")
});

// TextField component
const TextField = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean; helperText?: string; fullWidth?: boolean }>(
  ({ error, helperText, fullWidth, className, ...props }, ref) => {
    return (
      <div className={fullWidth ? 'w-full' : ''}>
        <input
          ref={ref}
          className={`p-2 border rounded-md border-gray-300 ${fullWidth ? 'w-full' : ''} ${className}`}
          {...props}
        />
        {helperText && (
          <p className={`mt-1 text-sm text-gray-500`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

// RHFTextField component
const RHFTextField: React.FC<{ name: string; [key: string]: unknown }> = ({ name, ...other }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
};

// Button component
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' }> = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  ...props 
}) => {
  const baseClasses = 'px-4 py-2 rounded-md transition-colors duration-200';
  const variantClasses = {
    primary: 'bg-emerald-500 text-white hover:bg-emerald-600',
    ghost: 'bg-transparent text-emerald-500 hover:bg-emerald-100',
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

  const ChatBot: React.FC<{ status?: boolean }> = ({ status = false }) => {
  const [isOpen, setIsOpen] = useState(status);
  const [chatHistory, setChatHistory] = useState<MessageType[]>([]);
  const [userData, setUserData] = useState<Partial<UserData>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [reset, setReset] = useState(true)
  const chatEndRef = useRef<HTMLDivElement>(null);
    const [showModal, setShowModal] = useState(false); 
    const [complaintRefNo, setComplaintRefNo] = useState(''); 
    
    // const [editingResponseIndex, setEditingResponseIndex] = useState(null);
    // const [editedMessages, setEditedMessages] = useState([]);
    const [complaintData, setcomplaintData] = useState<any>()
    // const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isTrackingGrievance, setIsTrackingGrievance] = useState(false);
    const [refNumber, setRefNumber] = useState<string>('');
    // const [isInputDisabled, setIsInputDisabled] = useState(false);

    const [showSlider, setShowSlider] = useState(false);
const [sliderOptions, setSliderOptions] = useState<string[]>([]);
const [sliderTitle, setSliderTitle] = useState("");
// const [isUlbSelected, setIsUlbSelected] = useState(false);
// const [isGrievanceType, setIsGrievanceType] = useState(false);
    
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      msgBox: '',
    },
  })

  useEffect(() => {
    if (isOpen && chatHistory.length === 0) {
      addBotMessage("Hello! How can I assist you today? Please select any one option. Type 'exit' any time to end the chat.", ["File a complaint", "Track Grievance"]);

    }
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setChatHistory([]);
      setUserData({});
      setCurrentStep(0);
      setIsTrackingGrievance(false);
    }
  };


  const addBotMessage = (content: string | JSX.Element, options?: string[]) => {
    setChatHistory(prev => [...prev, { sender: 'bot', content, options }]);
  }; 
  const addUserMessage = (content: string) => {
    setChatHistory(prev => [...prev, { sender: 'user', content }]);
  };
  const handleOptionClick = (option: string) => {
    addUserMessage(option);
    processUserInput(option);
  };
  const [ulbData, setUlbData] = useState([])
  const [grievanceTypeOptions, setGrievanceTypeOptions] = useState<any>([])
  const ulbOptionsFunction=async()=>{
    // api for ULB
    const response = await axios.get(`https://aadrikainfomedia.com/grievance-api/v1/ulb-direct/get-all-ulb-d?page=1&limit=10000`)
    // api for grivance problem 
    const response1 = await axios.get(`https://aadrikainfomedia.com/grievance-api/v1/problem-direct/get-all-problem?page=1&limit=10000`)
    setUlbData(response?.data?.data) 
    setGrievanceTypeOptions(response1?.data?.data?.docs)
  }

useEffect(() => {
  ulbOptionsFunction()
}, [])

const handlereset=()=>{
  // console.log("hi reset")
  setReset(false)
}

const SliderDrawer = ({ options, title, onSelect, onClose }:any) => {
  console.log("title",title)
  // console.log("options",options)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-end z-50">
      {/* <div className="bg-white w-full max-h-60 rounded-t-lg rounded-b-lg transform transition-transform duration-300 ease-in-out"> */}
      <div
    className={`bg-white  ${
      currentStep === 5 ? " w-60 max-h-40 mb-48" : " w-full max-h-60"
    } rounded-t-lg rounded-b-lg transform transition-transform duration-300 ease-in-out`}
  >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {title !== 'Select Grievance Type' ?

         <div className="p-4 overflow-y-auto" style={{height:"350px"}}>
          {options?.map((option:any, index:any) => (
            <div
              key={index}
              onClick={() => onSelect(option)}
              className="p-2 hover:bg-gray-100 cursor-pointer rounded-md"
            >
              {option}
            </div>
          ))}
        </div> 
        :
         <div className="p-4 overflow-y-auto" 
         
         style={{height:"350px"}}>
          
          {options?.map((option:any, index:any) => (
            <div
              key={index}
              onClick={() => {onSelect(option);
                setcomplaintData(option)
                // setIsUlbSelected(true)
                
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer rounded-md"
            >
              {option?.label}
            </div>
          ))}
        </div> 
        }
        {/* <div className="p-4 overflow-y-auto" style={{height:"350px"}}>
          {options?.map((option, index) => (
            <div
              key={index}
              onClick={() => onSelect(option)}
              className="p-2 hover:bg-gray-100 cursor-pointer rounded-md"
            >
              {option}
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

  const questions = [
    "Select ULB",               
    "Please describe your complaint.", 
    // "Give More Information",      
    "Grievance Location",         
    "Grievance Type",            
    // "Is issue related to financial transaction?", 
    // "What is your complaint title?", 
    "Full Name",                 
    "Mobile No.",                 
    "Email",                     
    "Please submit the Grievance related documents?",   
  ];
  const abc=false;
  
  // if(currentStep===7)

  const processUserInput = (input: string) => {
    if (input.toLowerCase() === 'exit') {
      addBotMessage("Thank you for using our chatbot. The chat has ended.");
      setTimeout(() => {
        toggleChat();
      }, 2000);
      return;
    }

    if (isTrackingGrievance) {
      setRefNumber(input); // Set the refNumber to trigger the useEffect
      return;
    }
    
    switch (currentStep) {
      case 0:
        if (input === "Track Grievance") {
          setIsTrackingGrievance(true);
          addBotMessage("Please enter your grievance reference number:");
          setUserData({});
          return;
        }
        addBotMessage(
          <div className="flex items-center">
            <span>{questions[0]}</span>
            <button
              onClick={() => {
                setSliderOptions(ulbData.map((ulb: any) => ulb.ulbName));
                setSliderTitle("Select ULB");
                setShowSlider(true);
              }}
              className="ml-2 text-emerald-500 hover:text-emerald-600"
            >
              <FaList className="inline-block" />
            </button>
          </div>
        );
        setCurrentStep(1);
        setIsTyping(false);
        break;
  
        case 1:
          // console.log(reset)
          if(reset){
            
          const selectedUlb:any = ulbData.find((ulb: any) => ulb.ulbName === input); 
          
          // console.log(selectedUlb)
          if (selectedUlb) {
           
            setUserData((prev) => ({                         
              ...prev,
              ulb: selectedUlb._id,  
              ulbName: selectedUlb.ulbName,  
            }));             
          }
          
          addBotMessage(questions[1]); // Please describe your complaint
          setCurrentStep(2);
          setIsTyping(false)
        }else{
          // console.log("first")
          addBotMessage("Hello! How can I assist you today? Please select any one option. Type 'exit' any time to end the chat.", ["File a complaint", "Track Grievance"]);
          setCurrentStep(0);
          setReset(true)
          setIsTyping(false)
        }
        
          break;
      // case 2:
      //   console.log(reset)
      //   setUserData(prev => ({ ...prev, complaint: input }));
      //   addBotMessage(questions[2]); // Give More Information
      //   setCurrentStep(3);
      //   setIsTyping(false)
      //   break;
      case 2:
        console.log(reset)
        setUserData(prev => ({ ...prev, complaint: input }));
        addBotMessage(questions[2]); // Grievance Location
        setCurrentStep(3);
        setIsTyping(false)
        break;
          
        case 3:
  // Update user data with the input
  setUserData((prev) => ({ ...prev, location: input }));

  // Map grievanceTypeOptions to format options for the slider
  const formattedOptions:any = grievanceTypeOptions?.map((dept:any) => ({
    value: dept, // Full object reference
    label: `${dept.problem}`, // Human-readable label
  }));

  console.log("Grievance Type Options:", formattedOptions);

  addBotMessage(
    <div className="flex items-center">
      <span>{questions[3]}</span>
      <button
        onClick={() => {
          // Ensure the formatted options are correctly set for the slider
          setSliderOptions(formattedOptions); // Pass formatted options
          setSliderTitle("Select Grievance Type");
          setShowSlider(true); // Display the slider
        }}
        className="ml-2 text-emerald-500 hover:text-emerald-600"
      >
        <FaList className="inline-block" />
      </button>
    </div>
  );

  // Update the current step and other states
  setCurrentStep(4);
  setReset(true);
  setIsTyping(false);
  break;

      case 4:
        console.log(reset)
        if(reset){
        setUserData(prev => ({ ...prev, grievanceType: input }));
        addBotMessage(questions[4]);
        setCurrentStep(5);
  
      }else{
        addBotMessage("Hello! How can I assist you today? Please select any one option. Type 'exit' any time to end the chat.", ["File a complaint", "Track Grievance"]);
        setCurrentStep(0);
        setReset(true)
      }
      setIsTyping(false)
        break;
      // case 6:
      //   console.log(reset)
      //   setUserData(prev => ({ ...prev, title: input }));
      //   addBotMessage(questions[6]);// Full Name
      //   setCurrentStep(7);
      //   setIsTyping(false)
      //   break;
      case 5:
        setUserData(prev => ({ ...prev, fullName: input }));
        addBotMessage(questions[5]); // Mobile No.
        setCurrentStep(6);
        setIsTyping(false)
        break;
      case 6:
        setUserData(prev => ({ ...prev, mobileNo: input }));
        addBotMessage(questions[6]); // Email
        setCurrentStep(7);
        setIsTyping(false)
        break;
      case 7:
        // setUserData(prev => ({ ...prev, email: input }));
        setUserData(prev => ({ ...prev, email: input }));
        addBotMessage(questions[7]); // Have you submitted any related documents?
        setCurrentStep(8);
        setIsTyping(false)
        break;
      // case 10:
      //   setUserData(prev => ({ ...prev, hasDocuments: input }));
      //   addBotMessage(questions[10]); // Preferred resolution type
      //   setCurrentStep(11);
      //   break;
      // case 9:
      //   setUserData(prev => ({ ...prev, resolutionType: input }));
      //   addBotMessage(questions[9]); // Would you like to provide any additional comments?
      //   setCurrentStep(10); 
      //   setIsTyping(false)       
      //   break;
      
      case 8:
        
        setUserData(prev => ({ ...prev, hasDocuments: input }));
        // console.log("helloooooooo")
        console.log(userData)
        
        // console.log(input)
        // console.log(userData.hasDocuments)
        // addBotMessage("Thank you for your input. Your complaint has been filed with the following details:", [
          addBotMessage("Please Review The complaint and Click on Submit Button", [
          `ULB 12345: ${userData.ulbName }`,
          `Complaint: ${userData.complaint}`,
          // `Additional Info: ${userData.additionalInfo}`,
          `Location: ${userData.location ? userData.location:"N/A"}`,
          `Grievance Type: ${userData.grievanceType ? userData.grievanceType:"N/A"}`,
          // `Financial Transaction: ${userData.isFinancialTransaction}`,
          // `complaint Description : ${userData.title}`,
          `Full Name: ${userData.fullName ? userData.fullName:"N/A"}`,
          `Mobile No.: ${userData.mobileNo ? userData.mobileNo:"N/A"}`,
          `Email: ${userData.email ? userData.email:"N/A"}`,
          `Documents: ${input
            ? "Document Added": "N/A"}`,
        ]);
      
        
       setCurrentStep(0);  // Reset steps after completion
        break;
      default:
        break;
    }
  };
  console.log(userData)
  // console.log(userData?.isFinancialTransaction)
  // console.log(userData?.comments)
    const postMutation = usePostMutation({})
  const { isAuthenticated } = useAppContext()
  

  const onSubmitChat = async()=>{
    // console.log(" 507  userData",userData)
    // console.log(" 508  userData",userData?.title)
    setIsTyping(false)
    try {
      const formData = new FormData()
      formData.append('citizenName', userData?.fullName || '')
      formData.append('email', userData?.email || '')
      formData.append('mobileNo', userData?.mobileNo || '')
      formData.append('complaintTitle', userData?.title || '')
      formData.append('complaintDescription', userData?.complaint)
      formData.append('moduleName', userData?.moduleName || '')
      formData.append('ulbName', userData?.ulbName || '')
      if (userData?.module) {
        formData.append('moduleId', userData?.module)
      }
      formData.append('ulbId', userData?.ulb || '')
      formData.append('customAddress', userData?.customAddress || '')
      // formData.append('complaintTypeId', complaintTypesFor != undefined ? complaintTypesFor : '')
      // console.log(userData)
      // formData.append('complaintTypeId', userData?.grievanceType || '')
      // console.log(userData)
      formData.append('imageUrl', userData?.document )
      if (userData?.tempNo !== '' && userData?.tempNo !== undefined) {
        formData.append('tempNo', userData?.tempNo)
      }
      if (userData?.fixedNo !== '' && userData?.fixedNo !== undefined) {
        formData.append('fixedNo', userData?.fixedNo)
      }
      if (userData?.tempNoLabel !== '' && userData?.tempNoLabel !== undefined) {
        formData.append('tempNoLabel', userData?.tempNoLabel)
      }
      if (userData?.fixedNoLabel !== '' && userData?.fixedNoLabel !== undefined) {
        formData.append('fixedNoLabel', userData?.fixedNoLabel)
      }
      formData.append('isTransactionIssue', userData?.isTransactionIssue || false)
      formData.append('transactionNo', userData?.transactionNo)
      formData.append('isCitizen', '1')
      // // ADDED FIELDS
      // console.log("option?.label===============",complaintData?.value)
      // console.log("option?.label===============",complaintData?.value?._id)
      if (complaintData?.value !== '' && complaintData?.value !== undefined) {
        formData.append('problemTypeId', complaintData?.value?._id)
      }
      // formData.append('grievanceType', userData?.grievanceType || '')
      formData.append('wardNo', userData?.wardNo || '')
      formData.append('area', userData?.area || '')
      formData.append('latitude', userData?.latitude || '')
      formData.append('longitude', userData?.longitude || '')
      formData.append('holdingNo', userData?.holdingNo || '')
      formData.append('safNo', userData?.safNo || '')
      formData.append('consumerNo', userData?.consumerNo || '')
      formData.append('grievanceLocation', userData?.grievanceLocation || '')
      let url = ''
      if (isAuthenticated) {
        url = grievanceAPI.createComplaintApplication
      } else {
        url = grievanceAPI.createComplaintApplicationDirect
      }
      const res = await postMutation.mutateAsync({
        api: url,
        data: formData,
      })
      if (res.data?.success) {
        toast.success(res?.data?.message)
        setComplaintRefNo(res?.data?.data?.complaintRefNo); 
      setShowModal(true);

        setIsOpen(false);  // Close the chatbot
        setChatHistory([]);
        setUserData({});
        setCurrentStep(0); 
      } else {
        toast.error('Grievance not created successfully')
      }

    } catch (error) {
      console.log(error)
    }    
  }

  const onSubmit = (data: { msgBox: string }) => {
    // console.log("line 811",data)
    addUserMessage(data.msgBox);
    processUserInput(data.msgBox);
    methods.reset();
  };

  // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setUserData(prev => ({ ...prev, document: file }));
  //     addUserMessage(`Uploaded: ${file.name}`);
  //     processUserInput("Document uploaded");
  //   }
  // };


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = [
        'image/jpeg',  
        'image/png',   
        'image/gif',   
        'image/webp',   
        'image/bmp',    
        'image/tiff',    
        'application/pdf' 
      ];
  
      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload a valid image (JPG, PNG, GIF, WebP, BMP, TIFF) or a PDF file.")
        // addUserMessage("Invalid file type. Please upload a valid image (JPG, PNG, GIF, WebP, BMP, TIFF) or a PDF file.");
        return; 
      }
      setUserData(prev => ({ ...prev, document: file }));
      // addUserMessage(`Uploaded: ${file.name}`);
      processUserInput("Document uploaded");
      toast.success("Document Added.")
    }
  };

  const submitSkip = (data:any)=>{
    if(data === 10){
      // console.log("handle the skip 646")
  setCurrentStep(0)
    }
  
  }
  const handleGrievanceTracking = async (refNumber: string) => {
    setIsTyping(true);
    
    try {
      console.log("Reference ", refNumber);
      addUserMessage(refNumber);
      
      const response = await axios.get(`https://aadrikainfomedia.com/grievance-api/v1/complaint-application-direct/get-complaint-application/${refNumber}`);
      
      methods.reset();
      
      if (response.data.success) {
        const complaint = response.data.data;
        const formattedDate = new Date(complaint.createdAt).toLocaleDateString('en-GB'); // Format as dd/mm/yyyy
        const formattedDateString = formattedDate.replace(/\//g, '-'); // Replace '/' with '-'
        
        // console.log("Complaint---", complaint);
        
        addBotMessage(`Here is the status of your grievance (Ref No: ${refNumber}):`);
        addBotMessage(`Registered on: ${formattedDateString}`);
        // console.log("newwwwwwwwww", complaint.wf_status)
        // Dynamically determine the status based on wf_status
        let statusMessage = '';
        switch (complaint.wf_status) {
          case 0:
            statusMessage = 'Pending';
            break;
          case 1:
            statusMessage = 'Resolved';
            break;
          case 2:
            statusMessage = 'Rejected';
            break;
          case 3:
            statusMessage = 'Pending(re-opened)';
            break;
          case 4:
            statusMessage = 'Closed';
            break;
          default:
            statusMessage = 'Unknown Status';
            break;
        }
        
        addBotMessage(`Status:  ${statusMessage}`);
        addBotMessage(`Details: ${complaint.complaintDescription}`);
        
      } else {
        addBotMessage("No grievance found with the provided reference number.");
        console.log(refNumber);
      }
    } catch (error) {
      addBotMessage("An error occurred while fetching the grievance details.");
    } finally {
      setIsTrackingGrievance(false);
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (refNumber) {
      handleGrievanceTracking(refNumber);
    }
  }, [refNumber]);


  return (
    <div className="fixed bottom-4 right-4 z-50 ">
      <Button
        onClick={toggleChat}
        className="bg-gradient-to-r from-emerald-500 to-green-400 p-4 rounded-full shadow-lg"
      >
        <FaComments className="text-white text-2xl"/>
      </Button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:w-96 w-[22rem] bg-white shadow-2xl rounded-2xl border-2 border-emerald-500 overflow-hidden ">
          <div className="chat-header flex justify-between items-center p-4 bg-gradient-to-r from-emerald-500 to-green-400">
            <h3 className="font-bold text-xl text-white">Chatbot</h3>
            <Button variant="ghost" onClick={toggleChat}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>

 

          {showSlider && (
  <SliderDrawer
    options={sliderOptions}
    title={sliderTitle}
    onSelect={(option:any) => {
      if (sliderTitle === "Select ULB") {
   
        addUserMessage(option);
        processUserInput(option);
        setShowSlider(false);
      }else if(sliderTitle === 'Select Yes/No'){
        addUserMessage(option);
        processUserInput(option);
        setShowSlider(false);
      } else {
        // When sliderTitle is not "Select ULB"
        addUserMessage(option?.label);
        processUserInput(option?.label);
        setShowSlider(false);
      }
    }}
    onClose={() => setShowSlider(false)}
  />
)}
         
  <div className="chat-messages p-4 h-96 overflow-y-auto">
  {chatHistory.map((message, index) => (
    <div
      key={index}
      className={`mb-4 ${message.sender === "user" ? "text-right" : "text-left "}`} 
    >
      <div
        className={`inline-block p-2 rounded-lg ${
          
          message.sender === "user"
            ? "bg-emerald-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        {message.content} {/* This can now be a string or JSX.Element */}
      </div>

      {/* Options Handling for Bot Messages */}
      {message.options && (
        <div className="mt-2 flex flex-wrap justify-start gap-2 max-h-40 overflow-y-auto">
          {message.options.map((option, optionIndex) => (
            <Button
              key={optionIndex}
              onClick={() => handleOptionClick(option)}
              className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              disabled = {currentStep === 0 && userData?.ulb?.length > 0 && userData?.grievanceTypeOptions?.length > 0 }
            >
              {option}
            </Button>
          ))}
        </div>
      )}
    </div>
  ))}
  <div ref={chatEndRef} />
</div>

<FormProvider {...methods}>
  <form
    onSubmit={(e) => {
      e.preventDefault();
      if (isTrackingGrievance) {
        handleGrievanceTracking(methods.getValues("msgBox"));
      } else {
        methods.handleSubmit(onSubmit)();
      }
    }}
    className="chat-input p-4 border-t border-gray-200 flex items-center"

  >
    
    {/* <RHFTextField
      name="msgBox"
      placeholder={isTrackingGrievance ? "Enter grievance reference number..." : "Type a message..."}
      className="flex-grow mr-2"
      onChange={(e:any) => {
        methods.setValue("msgBox", e.target.value);
        setIsTyping(e.target.value.trim().length > 0);
      }}
      readOnly={currentStep === 5}
    /> */}

{currentStep === 6 ? (
  <RHFTextField
    name="msgBox"
    placeholder={isTrackingGrievance ? "Enter grievance reference number..." : "Type a message..."}
    className="flex-grow mr-2"
    type="tel"
    inputMode="numeric" // Suggests numeric keypad on mobile devices
  pattern="^[0-9]{10}$"
   
    onChange={(e: any) => {
      methods.setValue("msgBox", e.target.value);
      setIsTyping(e.target.value.trim().length > 0);
    }}
   
  />
) : currentStep === 7 ? (
  <RHFTextField
    name="msgBox"
    placeholder={isTrackingGrievance ? "Enter grievance reference number..." : "Type a message..."}
    className="flex-grow mr-2"
    type="email"
    onChange={(e: any) => {
      methods.setValue("msgBox", e.target.value);
      setIsTyping(e.target.value.trim().length > 0);
    }}
  
  />
) : (
  <RHFTextField
  name="msgBox"
  placeholder={isTrackingGrievance ? "Enter grievance reference number..." : "Type a message..."}
  className="flex-grow mr-2"
  onChange={(e: any) => {
    methods.setValue("msgBox", e.target.value);
    setIsTyping(e.target.value.trim().length > 0);
  }}
  readOnly={currentStep === 8 ||(currentStep === 0 && !isTrackingGrievance) }
/>

)}


{/* {currentStep === 9  && (
  <>
    <label htmlFor="file-upload" className="cursor-pointer">
      <FaPaperclip className="text-emerald-500 text-xl mx-2" />
    </label>
    <input
      id="file-upload"
      type="file"
      className="hidden"
      onChange={handleFileUpload}
      accept="image/jpeg, image/png, image/gif, image/webp, image/bmp, image/tiff, application/pdf"
    />
  </>
)} */}


{currentStep === 8  && (
  <>
    <label htmlFor="file-upload" className="cursor-pointer">
      <FaPaperclip className="text-emerald-500 text-xl mx-2" />
    </label>
    <input
      id="file-upload"
      type="file"
      className="hidden"
      onChange={handleFileUpload}
      accept="image/jpeg, image/png, image/gif, image/webp, image/bmp, image/tiff, application/pdf"
    />
  </>
)}


    
{currentStep === 0 && userData?.ulb?.length > 0 ? (
  <Button variant="primary" onClick={onSubmitChat} className="bg-emerald-500 text-white mx-1">
    Submit
  </Button>
) : (currentStep === 4 || currentStep === 1) && isTyping ? (
  <Button onClick={handlereset} className="bg-emerald-500 text-white mx-1">
    Send
  </Button>
) : isTyping ? (
  <Button type="submit" className="bg-emerald-500 text-white mx-1">
    Send
  </Button>
) : null}

    {/* <Button
      className="bg-red-500 text-white mx-2 px-2 py-1 rounded-md hover:bg-red-600"
      onClick={() => {
        methods.setValue("msgBox", ""); // Clear the input value for the skipped question
        setIsTyping(false); // Reset typing state
        processUserInput(""); // Skip and proceed to next step
      }}
    >
      Skip
    </Button> */}
 {!(currentStep === 0 || currentStep === 1 || currentStep === 2) && (
  <Button
    className="bg-red-500 text-white mx-2 px-2 py-1 rounded-md hover:bg-red-600"
    onClick={() => {
      methods.setValue("msgBox", ""); // Clear the input value for the skipped question
      methods.clearErrors("msgBox"); // Clear the validation error for the msgBox field
      setIsTyping(false); // Reset typing state
      processUserInput(""); // Skip and proceed to the next step
      methods.trigger("msgBox"); // Manually trigger validation to ensure the error is cleared
      // setCurrentStep(0);
      submitSkip(currentStep)
    }}
  >
    Skip
  </Button>
)}
  </form>

</FormProvider>
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