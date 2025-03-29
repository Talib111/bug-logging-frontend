// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable react/react-in-jsx-scope */
import { Link, useLocation } from "react-router-dom";
import { Image } from "@/components/image";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context";
import axios from "axios";
import { useForm } from "react-hook-form";
import { grievanceAPI } from "@/lib";
import toast from "react-hot-toast";
import { usePostMutation } from "@/hooks/useCustomQuery";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const apiEndpoints = {
  property: "http://172.18.1.108:8000/api/property/details/get-owner-details",
  water: "http://172.18.1.108:8000/api/water/consumer/get-owner-details",
  trade_License: "http://172.18.1.108:8000/api/trade/application-search/get-owner-details",
  septic_Tank_Cleaning: "http://172.18.1.108:8000/api/septic/details",
  pet_Registration: "http://172.18.1.108:8000/api/pet/details",
  water_Tanker_Booking: "http://172.18.1.108:8000/api/water/tanker",
  advertisement_Tax: "http://172.18.1.108:8000/api/advertisement/tax",
  lodge_And_Banquet_Registration: "http://172.18.1.108:8000/api/lodge/details",
  solid_Waste_User_Charge: "http://172.18.1.108:8000/api/solidwaste/details",
  marriage_Registration: "http://172.18.1.108:8000/api/marriage/details",
  public_Transport_City_Bus: "http://172.18.1.108:8000/api/transport/details",
  parking_Management: "http://172.18.1.108:8000/api/parking/details",
  Rig_Machine_Registration: "http://172.18.1.108:8000/api/rig/details",
  hrms_And_Payroll: "http://172.18.1.108:8000/api/hrms/details",
};

export default function Tools() {
  const { currentLanguage } = useAppContext();
  const [currentToolset, setCurrentToolSet] = useState(null);
  const query = new URLSearchParams(useLocation().search);
  const type = query.get("type");
  const [userDetails, setUserDetails] = useState(null);
  const postMutation = usePostMutation({});
  const [searchInput, setSearchInput] = useState("");
  const [filteredTools, setFilteredTools] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [searchType, setSearchType] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [loading,  setLoading] = useState(false);
  const [address, setAddress] = useState(selectedTool?.prop_address || "");

  const toolSet = {}; // This should be populated with the actual toolset data
  useEffect(() => {
    if (type && apiEndpoints[type]) {
      fetchUserDetails(type);
    }
  }, [type]);

  const fetchUserDetails = async (selectedType) => {
    setLoading(true);
    try {
      const response = await axios.get(apiEndpoints[selectedType]);
      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = async (tool) => {
    setSelectedTool(tool);
    setShowPopup(true);
    
    if (type && apiEndpoints[type]) {
      setLoading(true);
      try {
        const response = await axios.get(apiEndpoints[type]);
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearch = async () => {
    if (!searchInput.trim()) {
        alert("Please enter a valid search query.");
        return;
    }

    const filterByMap = {
        MOBILE_NUMBER: "mobileNo",
        HOLDING_NUMBER: "holdingNo",
        SAF_NUMBER: "safNo",
        CONSUMER_NUMBER: "consumerNo",
        APPLICATION_NUMBER: "applicationNo",
        LICENSE_NUMBER: "licenseNo",
    };

    setLoading(true);
    try {
        const response = await axios.post(apiEndpoints[type], {
            filterBy: filterByMap[searchType],
            filterValue: searchInput,
        });

        const results = response.data.data || [];
        setFilteredTools(results);
        setShowResults(true);

        if (results.length > 0) {
            toast.success("Fetched successfully.!");
        } else {
            toast.info("No results found for the given query.");
        }
    } catch (error) {
        // console.error("Error fetching data:", error);
        toast.error("No data found for the given  reference number..");
    } finally {
        setLoading(false);
    }
};


  const updateSearchTypeOptions = (selectedType) => {
    const typeToSearch = {
      property: "HOLDING_NUMBER",
      water: "CONSUMER_NUMBER",
      trade_License: "LICENSE_NUMBER",
    };
    setSearchType(typeToSearch[selectedType] || "MOBILE_NUMBER");
  };

  useEffect(() => {
    updateSearchTypeOptions(type);
  }, [type]);

   const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

  type SearchType =
    | "MOBILE_NUMBER"
    | "HOLDING_NUMBER"
    | "SAF_NUMBER"
    | "CONSUMER_NUMBER"
    | "APPLICATION_NUMBER"
    | "LICENSE_NUMBER";

    
  
  const schema = yup.object().shape({
    description: yup.string().required("Description is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(selectedTool,"selectedTool=====>")

  const onSubmit = async (data:any) => {
    try {
        const formData = new FormData();
        formData.append('citizenName', selectedTool?.owner_name || selectedTool?.applicant_name || '');
        formData.append('email', '');
        formData.append('mobileNo', selectedTool?.mobile_no || '');
        formData.append('complaintTitle', '');
        formData.append('complaintDescription', data.description || '');
        formData.append('moduleName', '');
        formData.append('ulbName', selectedTool?.ulb_name || '');
        formData.append('ulbId', '66f3fdb76609dc9d192199d1');
        formData.append('customAddress', '');
        formData.append('complaintTypeId', '');
        formData.append('imageUrl', undefined);
        formData.append('isTransactionIssue', 'false');
        formData.append('transactionNo', '');
        formData.append('isCitizen', '1');
        formData.append('wardNo', '');
        formData.append('area', '');
        formData.append('latitude', '');
        formData.append('longitude', '');
        formData.append('holdingNo', '');
        formData.append('safNo', '');
        formData.append('consumerNo', '');
        formData.append('grievanceLocation', '');

        const res = await postMutation.mutateAsync({
            api: grievanceAPI.createComplaintApplicationDirect,
            data: formData
        });

        if (res.data?.success) {
            toast.success(res?.data?.message || 'Grievance created successfully');
            setFormResponse(res?.data?.data);
            setFormStep(5);
        } else {
            toast.error(res?.data?.message || 'Grievance not created successfully');
        }

        reset({ description: '' });
        setShowPopup(false);
    } catch (error) {
        console.error('Error in onSubmit:', error);
        toast.error('An error occurred while processing the grievance');
    }
};


  const renderAdditionalFields = () => {
    if (type === "property") {
      return (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Holding Number
            </label>
            <input
              type="text"
              value={selectedTool?.holding_no || ""}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-amber-500"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              SAF Number
            </label>
            <input
              type="text"
              value={selectedTool?.saf_no || ""}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-amber-500"
              disabled
            />
          </div>
        </>
      );
    } else if (type === "water") {
      return (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Consumer Number
            </label>
            <input
              type="text"
              value={selectedTool?.consumer_no || ""}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-amber-500"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Application Number
            </label>
            <input
              type="text"
              value={selectedTool?.application_no || ""}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-amber-500"
              disabled
            />
          </div>
        </>
      );
    }
    else if (type === "trade_License") {
      return (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              License Number
            </label>
            <input
              type="text"
              value={selectedTool?.license_no || ""}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-amber-500"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Application Number
            </label>
            <input
              type="text"
              value={selectedTool?.application_no || ""}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-amber-500"
              disabled
            />
          </div>
        </>
      );
    }
    else if (type === "solid_Waste_User_Charge") {
      return (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              License Number
            </label>
            <input
              type="text"
              value={selectedTool?.license_no || ""}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-amber-500"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Application Number
            </label>
            <input
              type="text"
              value={selectedTool?.application_no || ""}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-amber-500"
              disabled
            />
          </div>
        </>
      );
    }
    return null;
  };

  console.log(loading,"loading=====>")

  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto bg-white rounded-lg p-4 md:p-8">
          <div className="flex justify-between">
            <h1 className="text-lg md:text-xl font-bold text-blue-800 mb-4 md:mb-6 uppercase">
              TRACK YOUR {type ? type.replace(/_/g, " ") : ""} DETAILS
            </h1>
          </div>

          <div className="border-b mt-1 border-[#99B37C]"></div>

          <div className="mt-4">
            <div className="flex items-center gap-2 mb-4">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-amber-500"
              >
                {type === "property" && (
                  <>
                    <option value="HOLDING_NUMBER">Holding Number</option>
                    <option value="SAF_NUMBER">SAF Number</option>
                  </>
                )}
                {type === "solid_Waste_User_Charge" && (
                  <>
                    <option value="CONSUMER_NUMBER">Consumer Number</option>
                    <option value="HOLDING_NUMBER">Holding Number</option>
                  </>
                )}
                {type === "water" && (
                  <>
                    <option value="CONSUMER_NUMBER">Consumer Number</option>
                    <option value="APPLICATION_NUMBER">Application Number</option>
                  </>
                )}
                {type === "trade_License" && (
                  <>
                    <option value="LICENSE_NUMBER">License Number</option>
                    <option value="APPLICATION_NUMBER">Application Number</option>
                  </>
                )}
              </select>

              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={`Enter your ${searchType
                  .replace(/_/g, " ")
                  .toLowerCase()}`}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-amber-500 uppercase"
              />

            

              <button
                type="button"
                onClick={handleSearch}
                disabled={loading === true}
                className={`px-4 py-2 ${loading === true ? "bg-gray-500": "bg-amber-500 hover:bg-amber-600"}  text-white font-semibold rounded-lg transition`}
              >{loading ? "Loading..." : "Search"}
                {/* Search */}
              </button>
            </div>

            {showResults &&
              (filteredTools.length > 0 ? (              
                <div className="overflow-x-auto">
                 <table className='w-full table-auto border-collapse border border-gray-200'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='border border-gray-300 px-6 py-3 text-left'>
              {'Grievance No.'}
            </th>
            <th className='border border-gray-300 px-6 py-3 text-left'>
              {currentLanguage?.USER_NAME || 'User Name'}
            </th>
            <th className='border border-gray-300 px-6 py-3 text-left'>
              {currentLanguage?.MOBILE_NUMBER || 'Mobile Number'}
            </th>
            <th className='border border-gray-300 px-6 py-3 text-left'>
              {currentLanguage?.ADDRESS || 'Address'}
            </th>
            <th className='border border-gray-300 px-6 py-3 text-left'>
              {currentLanguage?.STATUS || 'Status'}
            </th>
            <th className='border border-gray-300 px-6 py-3 text-left'>
              {'Action'}
            </th>
            <th className='border border-gray-300 px-6 py-3 text-left'>
              {'View'}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTools.map((tool, index) => (
            <tr
              key={tool.id || index}
              className='hover:bg-gray-50 transition-all duration-300 ease-in-out'
            >
              <td className='border border-gray-300 px-6 py-4 text-sm text-gray-700'>
                {tool.consumer_id || index + 1}
              </td>
              <td className='border border-gray-300 px-6 py-4 text-sm text-gray-700'>
                {tool.owner_name && tool.applicant_name
                  ? `${tool.owner_name} | ${tool.applicant_name}`
                  : tool.owner_name || tool.applicant_name || 'N/A'}
              </td>
              <td className='border border-gray-300 px-6 py-4 text-sm text-gray-700'>
                {tool.mobile_no || 'N/A'}
              </td>
              <td className='border border-gray-300 px-6 py-4 text-sm text-gray-700'>
                {tool.prop_address || 'N/A'}
              </td>
              <td className='border border-gray-300 px-6 py-4 text-sm text-gray-700'>
                {tool.status === 'Active' ? 'Active' : 'Deactive'}
              </td>
              <td className='border border-gray-300 px-6 py-4'>
                <button
                  className='rounded-lg bg-blue-500 px-5 py-2 text-sm font-semibold text-white transition transform hover:bg-blue-600 hover:scale-105'
                  onClick={() => handleProceed(tool)}
                >
                  Proceed At Grievance
                </button>
              </td>
              <td className='border border-gray-300 px-6 py-4'>
                <button
                  className='rounded-lg bg-gray-500 px-5 py-2 text-sm font-semibold text-white transition transform hover:bg-gray-600 hover:scale-105'
                  onClick={() => handleView(tool)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
                </table>
                </div>
              ) : (
                <div className="text-base md:text-lg font-semibold text-gray-600">
                  {/* {currentLanguage?.NO_DATA_FOUND || "No Data Found"} */}
                </div>
              ))}

              
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
            <h2 className="text-xl font-bold mb-4">Proceed with Grievance</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* User Details Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    User Name
                  </label>
                  <input
                    type="text"
                    value={selectedTool?.owner_name || selectedTool?.applicant_name ||""}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-amber-500"
                    disabled
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    value={selectedTool?.mobile_no || ""}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-amber-500"
                    disabled
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                type="text"
                value={address}
                onChange={handleAddressChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-amber-500"
                placeholder="Enter Address"
            />
                </div>

                {/* New Fields Section */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    ULB Name
                  </label>
                  <input
                    type="text"
                    value={selectedTool?.ulb_name || ""}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-amber-500"
                    disabled
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    ULB ID
                  </label>
                  <input
                    type="text"
                    value="66f3fdb76609dc9d192199d1"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-amber-500"
                    disabled
                  />
                </div>

                {renderAdditionalFields()}
              </div>

              {/* Description Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  {...register("description", { required: true })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-amber-500"
                  placeholder="Enter your description here"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Buttons Section */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
                >
                  No
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition"
                >
                  Proceed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}