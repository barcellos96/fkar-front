import { FallingLines } from "react-loader-spinner";

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
