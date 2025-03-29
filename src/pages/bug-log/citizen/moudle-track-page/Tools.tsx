/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable react/react-in-jsx-scope */
import { Link, useLocation } from 'react-router-dom'
import { Image } from '@/components/image'
import { useEffect, useState } from 'react'
import { useAppContext } from '@/context'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { grievanceAPI } from '@/lib'
import toast from 'react-hot-toast'
import { usePostMutation } from '@/hooks/useCustomQuery'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FormSubmitSuccess from '../citizen-complaint-form/user-inputs/FormSubmitSuccess'

export default function Tools() {
  const { currentLanguage } = useAppContext()
  const [currentToolset, setCurrentToolSet] = useState(null)
  const query = new URLSearchParams(useLocation().search)
  const type = query.get('type')
  const [userDetails, setUserDetails] = useState(null)
  const postMutation = usePostMutation({})

  const toolSet = {} // This should be populated with the actual toolset data

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.post(
          'https://jharkhandegovernance.com/auth/api/property/details/get-owner-details'
        )
        const data = await response.data
        setUserDetails(data)
      } catch (error) {
        console.error('Error fetching user details:', error)
      }
    }

    fetchUserDetails()
  }, [])

  useEffect(() => {
    setCurrentToolSet(type ? toolSet[type] : null)
    updateSearchTypeOptions(type)
  }, [type, toolSet])

  const [searchInput, setSearchInput] = useState('')
  const [filteredTools, setFilteredTools] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [searchType, setSearchType] = useState('default_type')
  const [showPopup, setShowPopup] = useState(false)
  const [showDeatils, setShowDetails] = useState(false)
  const [selectedTool, setSelectedTool] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [resData, setResData] = useState()
  const [showCom, setShowCom] = useState(false)
  const [safNo, setSafNo] = useState('') // To store SAF number
  const [moduleName, setModuleName] = useState('')
  const [data, setData] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [loadingState, setLoadingState] = useState(false)
  const [responseData, setResponseData] = useState({})

  const handleSearchTypeChange = (newType: string) => {
    setSearchType(newType)
    setModuleName(newType) // Save the selected type in state
  }

  type SearchType =
    | 'MOBILE_NUMBER'
    | 'HOLDING_NUMBER'
    | 'SAF_NUMBER'
    | 'CONSUMER_NUMBER'
    | 'APPLICATION_NUMBER'
    | 'LICENSE_NUMBER'

  useEffect(() => {
    setFilteredTools([])
    setShowResults(false)
  }, [searchType])

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      alert('Please enter a valid search query.')
      return
    }

    const filterByMap: Record<SearchType, string> = {
      MOBILE_NUMBER: 'mobileNo',
      HOLDING_NUMBER: 'holdingNo',
      SAF_NUMBER: 'safNo',
      CONSUMER_NUMBER: 'consumerNo',
      APPLICATION_NUMBER: 'applicationNo',
      LICENSE_NUMBER: 'licenseNo',
      BOOKING_NUMBER: 'bookingNo',
    }

    setLoading(true)

    try {
      const apiEndpoint =
        getApiEndpoint(type) ||
        'https://jharkhandegovernance.com/auth/api/property/details/get-owner-details'

      const response = await axios.post(apiEndpoint, {
        filterBy: filterByMap[searchType as SearchType],
        filterValue: searchInput,
      })

      if (response.status === 200 && response.data?.data) {
        setFilteredTools(response.data.data)
        setShowResults(true)
        toast.success('Data Search successful!')
        setSearchInput('') // Reset input field after successful search
      } else {
        toast.error('No results found.')
        setFilteredTools([])
        setShowResults(false)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to fetch owner details. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleFetchDetails = async (tool) => {
    setSelectedTool(tool)
    setShowDetails(true)
  }

  const handleProceed = (tool) => {
    setSelectedTool(tool)
    setShowPopup(true)
  }


  const getApiEndpoint = (type) => {
    const apiEndpoints = {
      property:
        'https://jharkhandegovernance.com/auth/api/property/details/get-owner-details',
      water: 'https://jharkhandegovernance.com/auth/api/water/consumer/get-owner-details',
      trade_License:
        'https://jharkhandegovernance.com/auth/api/trade/application-search/get-owner-details',
      septic_Tank_Cleaning: 'https://jharkhandegovernance.com/auth/api/septic-tanker/serchSepticTankerInfo',
      pet_Registration:
        'https://jharkhandegovernance.com/auth/api/pet/application/searh-pet-details',
      water_Tanker_Booking:
        'https://jharkhandegovernance.com/auth/api/water-tanker/searchWaterTankerInfo',
      lodge_And_Banquet_Registration:
        'https://jharkhandegovernance.com/auth/api/lodge/details',
      solid_Waste_User_Charge:
        'https://jharkhandegovernance.com/auth/api/swm/consumerDetalsInformation',
      Rig_Machine_Registration:
        'https://jharkhandegovernance.com/auth/api/rig/application/searh-application',
    }

    return apiEndpoints[type]
  }

  const updateSearchTypeOptions = (type) => {
    // switch (type) {
    //   case "property":
    //     setSearchType("HOLDING_NUMBER");
    //     break;
    //   case "water":
    //     setSearchType("CONSUMER_NUMBER");
    //     break;
    //   case "trade_License":
    //     setSearchType("LICENSE_NUMBER");
    //     break;
    //   default:
    //     setSearchType("MOBILE_NUMBER");
    //     break;
    // }
  }

  const schema = yup.object().shape({
    description: yup.string().required('Description is required'),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      formData.append('citizenName', selectedTool?.owner_name || '')
      formData.append('email', '')
      formData.append('mobileNo', selectedTool?.mobile_no || '')
      formData.append('complaintTitle', '')
      formData.append('complaintDescription', data.description || '')
      formData.append('moduleName', moduleName)
      formData.append('ulbName', selectedTool?.ulb_name || '')
      formData.append('ulbId', '66f3fdb76609dc9d192199d1')
      formData.append('customAddress', '')
      formData.append('complaintTypeId', '')
      formData.append('imageUrl', undefined)
      formData.append('isTransactionIssue', 'false')
      formData.append('transactionNo', '')
      formData.append('isCitizen', '1')
      formData.append('wardNo', '')
      formData.append('area', '')
      formData.append('latitude', '')
      formData.append('longitude', '')
      formData.append('holdingNo', selectedTool?.holding_no || '')
      formData.append('safNo', selectedTool?.saf_no || '')
      formData.append('grievanceLocation', '')

      const res = await postMutation.mutateAsync({
        api: grievanceAPI.createComplaintApplicationDirect,
        data: formData,
      })

      if (res.data?.success) {
        toast.success(res?.data?.message || 'Grievance created successfully')
        setResData(res?.data?.data)
        setSuccess(true)
        reset({ description: '' })
        setShowPopup(false)
      } else {
        toast.error(res?.data?.message || 'Grievance not created successfully')
      }
    } catch (error) {
      console.error('Error in onSubmit:', error)
      toast.error('An error occurred while processing the grievance')
    }
  }

  useEffect(() => {
    setSearchInput('')
  }, [searchType])

  if (success) {
    return (
      <FormSubmitSuccess
        currentLanguage={currentLanguage}
        formResponse={resData}
      />
    )
  }

  const renderAdditionalFields = () => {
    if (type === 'property') {
      return (
        <>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Holding Number
            </label>
            <input
              type='text'
              value={selectedTool?.holding_no || ''}
              className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-amber-500'
              disabled
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              SAF Number
            </label>
            <input
              type='text'
              value={selectedTool?.saf_no || ''}
              className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-amber-500'
              disabled
            />
          </div>
        </>
      )
    } else if (type === 'water') {
      return (
        <>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Consumer Number
            </label>
            <input
              type='text'
              value={selectedTool?.consumer_no || ''}
              className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-amber-500'
              disabled
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Application Number
            </label>
            <input
              type='text'
              value={selectedTool?.application_no || ''}
              className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-amber-500'
              disabled
            />
          </div>
        </>
      )
    } else if (type === 'trade_License') {
      return (
        <>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              License Number
            </label>
            <input
              type='text'
              value={selectedTool?.license_no || ''}
              className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-amber-500'
              disabled
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Application Number
            </label>
            <input
              type='text'
              value={selectedTool?.application_no || ''}
              className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-amber-500'
              disabled
            />
          </div>
        </>
      )
    } else if (type === 'Rig_Machine_Registration') {
      return (
        <>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Application number
            </label>
            <input
              type='text'
              value={selectedTool?.application_no || ''}
              className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-amber-500'
              disabled
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              {currentLanguage?.MOBILE_NO}
            </label>
            <input
              type='text'
              value={selectedTool?.application_no || ''}
              className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-amber-500'
              disabled
            />
          </div>
        </>
      )
    } 
    else if (type === 'pet_Registration') {
      return (
        <>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Application number
            </label>
            <input
              type='text'
              value={selectedTool?.application_no || ''}
              className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-amber-500'
              disabled
            />
          </div>
        </>
      )
    }
    else if (type === 'water_Tanker_Booking') {
      return (
        <>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Booking number
            </label>
            <input
              type='text'
              value={selectedTool?.booking_no || ''}
              className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-amber-500'
              disabled
            />
          </div>
        </>
      )
    }
    else if (type === 'septic_Tank_Cleaning') {
      return (
        <>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Booking number
            </label>
            <input
              type='text'
              value={selectedTool?.booking_no || ''}
              className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-amber-500'
              disabled
            />
          </div>
        </>
      )
    }
    return null
  }

  // console.log(loading, 'loading=====>')

  return (
    <div>
      <div className='bg-gray-100 '>
        <div className='mx-auto max-w-7xl rounded-lg bg-white  md:p-8'>
          <div className='flex justify-between'>
            <h1 className='mb-4 text-lg font-bold uppercase text-blue-800 md:mb-6 md:text-xl'>
              TRACK YOUR {type ? type.replace(/_/g, ' ') : ''} DETAILS
            </h1>
          </div>

          <div className='mt-1 border-b border-[#99B37C]'></div>

          <div className='mt-4'>
            <div className='mb-4 flex items-center gap-2'>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className='rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-amber-500'
              >
                {type === 'property' && (
                  <>
                    <option value=''>Select</option>

                    <option value='SAF_NUMBER'>SAF Number</option>
                    <option value='HOLDING_NUMBER'>Holding Number</option>
                  </>
                )}
                {type === 'water' && (
                  <>
                    <option value=''>Select</option>

                    <option value='CONSUMER_NUMBER'>Consumer Number</option>
                    <option value='APPLICATION_NUMBER'>
                      Application Number
                    </option>
                  </>
                )}
                {type === 'trade_License' && (
                  <>
                    <option value=''>Select</option>

                    <option value='LICENSE_NUMBER'>License Number</option>
                    <option value='APPLICATION_NUMBER'>
                      Application Number
                    </option>
                  </>
                )}
                {type === 'Rig_Machine_Registration' && (
                  <>
                    <option value=''>Select</option>

                    {/* <option value='MOBILE_NUMBER'>Mobile Number</option> */}
                    <option value='APPLICATION_NUMBER'>
                      Application Number
                    </option>
                  </>
                )}
                {type === 'solid_Waste_User_Charge' && (
                  <>
                    <option value=''>Select</option>

                    <option value='CONSUMER_NUMBER'>Consumer Number</option>
                  </>
                )}
                {type === 'pet_Registration' && (
                  <>
                    {/* <option value='HOLDING_NUMBER'>Holding Number</option> */}
                    \<option value=''>Select</option>
                    <option value='APPLICATION_NUMBER'>
                      Application Number
                    </option>
                  </>
                )}
                 {type === 'water_Tanker_Booking' && (
                  <>
                    {/* <option value='HOLDING_NUMBER'>Holding Number</option> */}
                    \<option value=''>Select</option>
                    <option value='BOOKING_NUMBER'>
                      Booking Number
                    </option>
                  </>
                )}
                 {type === 'septic_Tank_Cleaning' && (
                  <>
                    {/* <option value='HOLDING_NUMBER'>Holding Number</option> */}
                    \<option value=''>Select</option>
                    <option value='BOOKING_NUMBER'>
                      Booking Number
                    </option>
                  </>
                )}
              </select>

              <input
                type='text'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch()
                  }
                }}
                placeholder={`Enter your ${searchType.replace(/_/g, ' ').toLowerCase()}`}
                className='w-full rounded-lg border px-4 py-2 uppercase focus:outline-none focus:ring focus:ring-amber-500'
              />
              <button
                type='button'
                onClick={handleSearch}
                disabled={loading === true}
                className={`px-4 py-2 ${loading === true ? 'bg-gray-500' : 'bg-amber-500 hover:bg-amber-600'}  rounded-lg font-semibold text-white transition`}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>

            {showResults &&
              (filteredTools.length > 0 ? (
                <div className='overflow-x-auto'>
                  <table className='mt-16 w-full table-auto border-collapse px-8'>
                    <thead className='bg-gray-100'>
                      <tr>
                        <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-gray-700'>
                          {currentLanguage?.GRIEVANCE_NO}
                        </th>
                        <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-gray-700'>
                          {currentLanguage?.USER_NAME || 'User Name'}
                        </th>
                        <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-gray-700'>
                          {currentLanguage?.MOBILE_NO || 'Mobile Number'}
                        </th>
                        <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-gray-700'>
                          {currentLanguage?.ADDR_AT || 'Address'}
                        </th>
                        <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-gray-700'>
                          {currentLanguage?.STATUS || 'Status'}
                        </th>
                        <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-gray-700'>
                          {currentLanguage?.VIEW}
                        </th>
                        <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-gray-700'>
                          {currentLanguage?.ACTION || 'Action'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-white'>
                      {Array.isArray(filteredTools) &&
                      filteredTools.length > 0 ? (
                        filteredTools.map((tool, index) => (
                          <tr
                            key={tool.id || index}
                            className='transition-all duration-200 ease-in-out hover:bg-gray-50 hover:shadow-md'
                          >
                            <td className='px-6 py-4 text-sm text-gray-700'>
                              {tool.consumer_id || index + 1}
                            </td>
                            <td className='px-6 py-4 text-sm text-gray-700'>
                              {tool.owner_name &&
                              tool.applicant_name &&
                              applicant_name
                                ? `${tool.owner_name} | ${tool.applicant_name} | ${tool.applicant_name}`
                                : tool.owner_name ||
                                  tool.applicant_name ||
                                  tool.applicant_name ||
                                  'N/A'}
                            </td>
                            <td className='px-6 py-4 text-sm text-gray-700'>
                              {tool.mobile_no || 'N/A'}
                            </td>
                            <td className='px-6 py-4 text-sm text-gray-700'>
                              {tool.prop_address && tool.address
                                ? `${tool.prop_address} | ${tool.address}`
                                : tool.prop_address || tool.address || 'N/A'}
                            </td>
                            <td className='px-6 py-4 text-sm text-gray-700'>
                              {tool.status === 'Active' ? (
                                <span className='inline-flex items-center rounded-full bg-green-500 px-4 py-2 text-xs font-medium capitalize text-white shadow-md'>
                                  {currentLanguage?.A}
                                </span>
                              ) : (
                                <span className='inline-flex items-center rounded-full bg-red-500 px-4 py-2 text-xs font-medium capitalize text-white shadow-md'>
                                  {currentLanguage?.IA}
                                </span>
                              )}
                            </td>

                            <td className='px-6 py-4'>
                              <button
                                className='transform rounded-lg bg-gray-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-700'
                                onClick={() => handleFetchDetails(tool)} // Pass the current 'tool' from the list
                              >
                                {loadingState ? (
                                  <span className='animate-pulse'>
                                    Loading...
                                  </span>
                                ) : (
                                  currentLanguage?.VIEW
                                )}
                              </button>
                            </td>

                            <td className='px-6 py-4'>
                              <button
                                className='transform rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700'
                                onClick={() => handleProceed(tool)}
                              >
                                Proceed As Grievance
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan='7'
                            className='px-6 py-4 text-center text-sm text-gray-700'
                          >
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className='text-base font-semibold text-gray-600 md:text-lg'>
                  {currentLanguage?.NO_DATA_FOUND || 'No Data Found'}
                </div>
              ))}
          </div>
        </div>
      </div>

      {showPopup && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg'>
            <h2 className='mb-4 text-xl font-bold'>Proceed with Grievance</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* User Details Section */}
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700'>
                  Owner name
                  </label>
                  <input
                    type='text'
                    value={`${selectedTool?.owner_name || ''} ${selectedTool?.applicant_name || ''}`}
                    className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-amber-500'
                    disabled
                  />
                </div>

                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700'>
                    {currentLanguage?.MOBILE_NO}
                  </label>
                  <input
                    type='text'
                    value={selectedTool?.mobile_no || ''}
                    className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-amber-500'
                    disabled
                  />
                </div>

                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Address
                  </label>
                  <input
                    type='text'
                    value={`${selectedTool?.prop_address || ''} ${selectedTool?.address || ''}`}
                    className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-amber-500'
                    disabled
                  />
                </div>

                {/* New Fields Section */}
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700'>
                    ULB Name
                  </label>
                  <input
                    type='text'
                    value={selectedTool?.ulb_name || ''}
                    className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-amber-500'
                    disabled
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Khata Number:
                  </label>
                  <input
                    type='text'
                    value={selectedTool?.khata_no || ''}
                    className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-amber-500'
                    disabled
                  />
                </div>

                {/* <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700'>
                    ULB ID
                  </label>
                  <input
                    type='text'
                    value={selectedTool?.ulb_id || ''}
                    className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-amber-500'
                    disabled
                  />
                </div> */}

                {renderAdditionalFields()}
              </div>

              {/* Description Input */}
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700'>
                  Description
                </label>
                <textarea
                  {...register('description', { required: true })}
                  className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-amber-500'
                  placeholder='Enter your description here'
                />
                {errors.description && (
                  <p className='mt-1 text-sm text-red-500'>
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Buttons Section */}
              <div className='flex justify-end space-x-2'>
                <button
                  type='button'
                  onClick={() => setShowPopup(false)}
                  className='rounded-lg bg-gray-300 px-4 py-2 font-semibold text-gray-800 transition hover:bg-gray-400'
                >
                  No
                </button>

                <button
                  type='submit'
                  className='rounded-lg bg-amber-500 px-4 py-2 font-semibold text-white transition hover:bg-amber-600'
                >
                  Proceed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

{showDeatils && (
  <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
    <div className='w-full max-w-3xl rounded-2xl bg-white p-8 shadow-xl'>
      <h2 className='mb-6 text-2xl font-bold text-gray-800'>View Details</h2>
      <form>
        {/* User Details Section */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div>
            <label className='block text-sm font-semibold text-gray-700'>User Name</label>
            <input
              type='text'
              value={`${selectedTool?.owner_name || ''} ${selectedTool?.applicant_name || ''}`}
              className='w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-amber-500'
              disabled
            />
          </div>

          <div>
            <label className='block text-sm font-semibold text-gray-700'>{currentLanguage?.MOBILE_NO}</label>
            <input
              type='text'
              value={selectedTool?.mobile_no || ''}
              className='w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-amber-500'
              disabled
            />
          </div>

          <div>
            <label className='block text-sm font-semibold text-gray-700'>Address</label>
            <input
              type='text'
              value={`${selectedTool?.prop_address || ''} ${selectedTool?.address || ''}`}
              className='w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-amber-500'
              disabled
            />
          </div>

          <div>
            <label className='block text-sm font-semibold text-gray-700'>ULB Name</label>
            <input
              type='text'
              value={selectedTool?.ulb_name || ''}
              className='w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-amber-500'
              disabled
            />
          </div>

          <div>
            <label className='block text-sm font-semibold text-gray-700'>ULB ID</label>
            <input
              type='text'
              value={selectedTool?.ulb_id || ''}
              className='w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-amber-500'
              disabled
            />
          </div>
        </div>

        {renderAdditionalFields()}

        {/* Buttons Section */}
        <div className='mt-6 flex justify-end space-x-4'>
          <button
            type='button'
            onClick={() => setShowDetails(false)}
            className='rounded-lg bg-gray-300 px-5 py-2 font-semibold text-gray-800 transition hover:bg-gray-400'
          >
            Close
          </button>
        </div>
      </form>
    </div>
  </div>
)
}

    </div>
  )
}
