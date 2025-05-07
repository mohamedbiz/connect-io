
import { Loader2 } from "lucide-react";

interface QualificationPageLoaderProps {
  message: string;
}

const QualificationPageLoader = ({ message }: QualificationPageLoaderProps) => {
  return (
    <div className="flex justify-center items-center min-h-[60vh] flex-col">
      <Loader2 className="h-8 w-8 text-[#0E3366] animate-spin mb-4" />
      <p className="text-[#0E3366]">{message}</p>
    </div>
  );
};

export default QualificationPageLoader;
