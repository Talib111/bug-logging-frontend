import { useEffect, useState } from 'react'
import { RHFTextField } from '@/components/forms'

const UseCaptchaVerify = (enterCaptchaPlaceholder:string) => {
  const [captcha, setCaptcha] = useState('')

  const generateCaptcha = () => {
    // Generate a alphanumeric captcha code
    const captchaCode = Math.random().toString(36).slice(2, 8).toUpperCase()
    setCaptcha(captchaCode)
  }

  const verifyCaptcha = (values: any, resetForm: any) => {
    if (values === captcha) {
      // Captcha verification success
      return true
    } else {
      // Captcha verification failed
      //   only reset the captcha field
      resetForm(
        {
          captchaName: '',
        },
        false
      )
      generateCaptcha()
      return false
    }
  }

  const canvas = document.createElement('canvas')
  // create a canvas element with 0 margin and padding
  canvas.style.margin = '0'
  canvas.style.padding = '0'
  canvas.width = 100
  canvas.height = 22
  const ctx: any = canvas.getContext('2d')
  //   font bold 15px
  ctx.font = 'bold 15px Arial'
  //   text color red
  ctx.fillStyle = 'blue'
  ctx.fillText(captcha, 21, 16)
  const dataUrl = canvas.toDataURL()

  useEffect(() => {
    generateCaptcha()
  }, [])

  const catptchaTextField = () => {
    return (
      <div>
        <RHFTextField
          name='captchaName'
          placeholder={enterCaptchaPlaceholder}
          type='text'
        />
      </div>
    )
  }

  return {
    catptchaTextField,
    captcha,
    dataUrl,
    verifyCaptcha,
    generateCaptcha,
  }
}

export default UseCaptchaVerify