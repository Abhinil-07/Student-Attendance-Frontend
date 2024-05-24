import Link from "next/link";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import userAtom from "@/src/atoms/userAtom";

export function MyDashboard() {
  const studentInfo = useRecoilValue(userAtom);
  console.log("from recoil", studentInfo);
  const studentId = studentInfo._id;
  const [imageFile, setImageFile] = useState("");

  const handleChange = (e: any) => {
    setImageFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const handleClick = async () => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append(
        "jsonData",
        JSON.stringify({
          classroomId: "6640fbd74ca657ece9b9d5ea",
          studentId: studentId,
        })
      ); // Convert JSON object to string

      const response = await axios.post(
        "http://127.0.0.1:5000/image/individual",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload successful:", response.data);
      alert("Upload successful!");
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Upload failed. Please try again.");
    }
  };
  return (
    <>
      <main className="flex-1 py-10 px-4 md:px-6">
        <div className="mx-auto max-w-md space-y-6">
          <h1 className="text-2xl font-bold">Submit Details</h1>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="code">Classroom Code</Label>
            <Input onChange={handleChange} id="picture" type="text" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <Input onChange={handleChange} id="picture" type="file" />
          </div>
          <Button onClick={handleClick} className="w-full">
            Upload
          </Button>
        </div>
      </main>
    </>
  );
}

function LogOutIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
