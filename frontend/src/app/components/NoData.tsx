import Image from "next/image";

interface NoDataProps {
  message: string;
  imageUrl: string;
  description: string;
  onClick: () => void;
  buttonText: string;
}
export default function NoData({
  message,
  imageUrl,
  description,
  onClick,
  buttonText = "Try Again",
}: NoDataProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white overflow-x-hidden space-y-6 mx-auto">
      <div className="relative w-60 md:w80">
        <Image
          src={imageUrl}
          alt="No Data"
          height={320}
          width={320}
          className="shadow-md hover:shadow-lg transition duration-300"
        />
      </div>
      <div className="text-center max-w-md space-y-2">
        <p className="text-2xl font-bold text-gray-900 tracking-wide">
          {message}
        </p>
        <p className="text-base text-gray-600 leading-relaxed">{description}</p>
      </div>

      {onClick && (
        <button
          onClick={onClick}
          className="px-6 w-60 py-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-300 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition duration-300 ease-in-out"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
