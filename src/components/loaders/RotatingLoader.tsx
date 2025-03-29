import { RotatingLines } from 'react-loader-spinner';

export default function RotatingLoader() {
  return (
    <div className="flex justify-center items-center">
      <RotatingLines strokeWidth="4" strokeColor="#6b7280" width="37" />
    </div>
  );
}
