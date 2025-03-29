// form
import { useFormContext, Controller } from 'react-hook-form';
import { Input, InputProps } from '@/components/ui/input';
import {
  customInputValidation,
  InputValidationType,
  InputElementType
} from '@/lib';

// ----------------------------------------------------------------------

type Props = InputProps & {
  name?: string;
  label?: string;
  isDynamic?: boolean;
  inputValidation?: InputValidationType;
  inputSize?: 'small' | 'medium' | 'large';
  isRequired?: boolean;
};

export default function RHFTextField({
  name,
  label,
  isDynamic,
  inputValidation,
  inputSize,
  isRequired,
  ...other
}: Props) {
  const { control } = useFormContext();

  // Custom validation function to allow English and Hindi characters
  const englishAndHindiValidation = (value: string) => {
    const englishAndHindiRegex = /^[A-Za-z\u0900-\u097F\s]*$/;
    return englishAndHindiRegex.test(value) || 'Only English and Hindi letters are allowed';
  };

  // Combine custom input validation with the new validation function
  const validateInput = (e: InputElementType) => {
    if (inputValidation) {
      customInputValidation(e, inputValidation);
    }
    if (!englishAndHindiValidation(e.target.value)) {
      e.target.setCustomValidity('Only English and Hindi letters are allowed');
    } else {
      e.target.setCustomValidity('');
    }
  };

  return (
    <>
      {name ? (
        <Controller
          name={name}
          control={control}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <div>
              <h1 className="text-gray-700 dark:text-gray-200 mb-1">
                {label}{' '}
                {isRequired && label && <span className="text-red-400">*</span>}
              </h1>
              <Input
                {...field}
                value={
                  typeof field.value === 'number' && field.value === 0
                    ? ''
                    : field.value
                }
                ref={ref}
                // if error then border-red-400 else border-indigo-400
                className={`${error ? 'border-red-400' : null}
            ${
              (inputSize === 'small' && 'h-8') ||
              (inputSize === 'medium' && 'h-10') ||
              (inputSize === 'large' && 'h-12') ||
              'h-9'
            }`}
                onInput={validateInput}
                {...other}
              />
              {
                // if is field array then show error message
                error && (
                  <span className="text-red-400 text-xs">{error.message}</span>
                )
              }
            </div>
          )}
        />
      ) : (
        <div>
          <h1 className="text-gray-700 dark:text-gray-200 mb-1">{label}</h1>

          <Input
            {...other}
            // if error then border-red-400 else border-indigo-400
            className={`
        ${
          (inputSize === 'small' && 'h-8') ||
          (inputSize === 'medium' && 'h-10') ||
          (inputSize === 'large' && 'h-12') ||
          'h-9'
        }`}
            onInput={validateInput}
          />
        </div>
      )}
    </>
  );
}