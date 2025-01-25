import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const DownloadButton = ({ base64Image, side }) => {
  const downloadImage = () => {
    const base64String = base64Image.split(",")[1];
    const binaryString = atob(base64String);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: "image/jpeg" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "downloaded_image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex">
      <button
        onClick={downloadImage}
        className="flex items-center justify-center space-x-2 "
      >
        <span>Download {side} Image </span>{" "}
        <ArrowDownTrayIcon
          aria-hidden="true"
          className="size-6 text-blue-900"
        />{" "}
      </button>
    </div>
  );
};

export default DownloadButton;
