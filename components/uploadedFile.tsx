"use client";
export default function UploadedFile() {
  const fileContent = localStorage.getItem("uploadedFile");
  return (
    <div className="">
      <h1>Uploaded File</h1>
      {/* Display the content based on file type */}
      <div>{fileContent}</div>
    </div>
  );
}
