// form
import { useFormContext, Controller } from 'react-hook-form';
import {
  customInputValidation,
  InputValidationType,
  TextAreaType
} from '@/lib';

// ----------------------------------------------------------------------

type Props = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  name: string;
  size?: 'small' | 'medium' | 'large';
  label?: string;
  borderColor?: string;
  inputValidation?: InputValidationType;
  isRequired?: boolean;
};

export default function RHFTextArea({
  name,
  label,
  size,
  borderColor,
  inputValidation,
  isRequired,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <>
          <label className="text-gray-700 dark:text-gray-200 " htmlFor={label}>
            {label} {isRequired && <span className="text-red-400">*</span>}
          </label>
          <textarea
            ref={ref}
            {...field}
            value={
              typeof field.value === 'number' && field.value === 0
                ? ''
                : field.value
            }
            onInput={(e: TextAreaType) => {
              if (inputValidation) {
                customInputValidation(e, inputValidation);
              }
            }}
            className={`bg-transparent block w-full rounded-sm border mt-2 dark:text-white ${
              (size === 'small' && 'p-1') ||
              (size === 'medium' && 'p-3') ||
              (size === 'large' && 'p-4') ||
              'p-2'
            } placeholder-gray-500 focus:outline-none focus:z-10 
              ${error ? 'focus:border-red-400' : 'focus:border-indigo-400'}  
              ${error ? 'border-red-400' : borderColor ?? 'border-gray-300'}
          `}
            {...other}
          ></textarea>
          {error && (
            <span className="text-red-400 text-xs">{error?.message}</span>
          )}
        </>
      )}
    />
  );
}
