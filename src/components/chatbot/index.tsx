// import { CircleDot } from "lucide-react"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    ButtonLoading,
    FormProviders,
    RHFTextArea
} from '@/components/forms'
import { usePostMutation } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { useState } from "react"

const schema = yup.object().shape({
    message: yup.string().required('Message is required'),
})

export default function Index() {
    const postMutation = usePostMutation({})
    const [conversationHistory, setConversationHistory] = useState<any[]>([]);

    const methods = useForm<any>({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data: any) => {
        try {
            const userMessage = data.message;

            const res = await postMutation.mutateAsync({
                api: grievanceAPI.chatbot,
                data: { message: userMessage },
            })

            const chatbotResponse = res?.data?.answer;

            setConversationHistory(prev => [
                ...prev,
                { question: userMessage, answer: chatbotResponse }
            ]);

            methods.reset({ message: '' });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="overflow-auto h-[80%] px-4 py-2">
                {conversationHistory.map((item) => (
                    <div key={item?._id} className="mb-4">
                        <div className="text-gray-800 flex">
                            <strong>You  </strong><h1 className="font-semibold">:- {item?.question}</h1>
                        </div>
                       
                        <div className="text-gray-600 mt-2 flex items-center">
                            {/* <CircleDot className="inline mr-2" size={16} /> */}
                            {item?.answer}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid gap-4 py-4 absolute bottom-0 left-0 w-full px-2">
                <FormProviders
                    methods={methods}
                    onSubmit={methods?.handleSubmit(onSubmit)}
                >
                    <div>
                        <RHFTextArea
                            className='bg-background w-full rounded-md p-4 h-20 border'
                            name='message'
                            placeholder='Ask me anything?'
                        />
                    </div>

                    <div className='col-span-3'>
                        <ButtonLoading
                            isLoading={methods?.formState?.isSubmitting}
                            type='submit'
                            className='w-auto rounded-lg px-10 float-right'
                        >
                            Submit
                        </ButtonLoading>
                    </div>
                </FormProviders>
            </div>
        </>
    )
}
