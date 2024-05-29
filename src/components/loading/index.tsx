import { FallingLines, Circles, TailSpin } from "react-loader-spinner";

interface LoadingProps {
  color?: string;
}

export default function Loading({ color }: LoadingProps) {
  return (
    <div className="flex imtext-white font-bold h-6 w-auto">
      <FallingLines width="30px" color={color} />
    </div>
  );
}

export function LoadingSpinner({ color }: LoadingProps) {
  return <TailSpin width="30px" color={color} />;
}
