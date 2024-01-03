"use client";
import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export default function FileUploadComponent() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const { toast } = useToast();
  const handleSubmit = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        // uploading ...
        toast({
          title: "Uploading...",
          description: "Your file is being uploaded.",
        });
        // const response = await axios.post("YOUR_API_ENDPOINT", formData, {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // });
        // setUploadStatus(`Upload Successful: ${response.data.message}`);

        const reader = new FileReader();
        reader.onload = (e) => {
          console.log(e.target?.result);
        };

        // Read the file as text
        reader.readAsText(selectedFile);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setUploadStatus(`Upload Failed: ${error.response.data}`);
        } else {
          setUploadStatus("Upload Failed: An unexpected error occurred");
        }
      }
    }
  };

  return (
    <div>
      {/* {uploadStatus && <p>{uploadStatus}</p>} */}
      <Input type="file" onChange={handleFileSelect} />
      <Button className="mt-4 w-full" onClick={handleSubmit}>
        Upload
      </Button>
    </div>
  );
}
