''
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { usePostMutation } from '@/hooks/useCustomQuery';
import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox"




const schema = yup.object().shape({
  name: yup.string(),
  mobileNo: yup.string(),
  email: yup.string(),
  wardNo: yup.string(),
  area: yup.string(),
  holdingNo: yup.string(),
  safNo: yup.string(),
  consumerNo: yup.string(),
  extraInfo: yup.string(),
})

export default function FormInfo({ currentLanguage, setformStep, setcomplaintData, complaintData }: any) {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <Card className="max-w-md  md:max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">
              {currentLanguage?.PRE_SUCH_POINTS}
            </h2>
            <ol className="space-y-3 list-decimal list-inside text-sm">
              <li>{currentLanguage?.PRE_POINT_1}</li>
              <li>{currentLanguage?.PRE_POINT_2}</li>
              <li>{currentLanguage?.PRE_POINT_3}</li>
              <li>{currentLanguage?.PRE_POINT_4}</li>
              <li>{currentLanguage?.PRE_POINT_5}</li>
              <li>{currentLanguage?.PRE_POINT_6}</li>
              <li>{currentLanguage?.PRE_POINT_7}</li>
              <li>{currentLanguage?.PRE_POINT_8}</li>
            </ol>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={isChecked}
              onCheckedChange={(checked) => setIsChecked(checked as boolean)}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-sm">
            {currentLanguage?.PRE_ACKN}
            </label>
          </div>
          <Button
            onClick={() => setformStep(1)}
            className="w-full sm:w-auto"
            disabled={!isChecked}
          >
            {currentLanguage?.CONTINUE}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
