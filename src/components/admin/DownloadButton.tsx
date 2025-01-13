import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const DownloadButton = ({ base64Image, side }) => {
  const downloadImage = () => {
    // Extract the Base64 data (remove data URL prefix)
    const base64String = base64Image.split(",")[1];
    const binaryString = atob(base64String); // Decode Base64 string
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Create a Blob from the binary data
    const blob = new Blob([bytes], { type: "image/jpeg" }); // Set MIME type
    const url = URL.createObjectURL(blob); // Create a URL for the Blob

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = url;
    link.download = "downloaded_image.jpg"; // Set the filename
    document.body.appendChild(link);
    link.click(); // Trigger download
    document.body.removeChild(link); // Clean up
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
