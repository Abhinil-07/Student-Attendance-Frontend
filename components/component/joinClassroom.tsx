"use client";
import Link from "next/link";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "@/src/atoms/userAtom";

export function MyDashboard() {
  const studentInfo = useRecoilValue(userAtom);
  const setStudentInfo = useSetRecoilState(userAtom);
  console.log("from recoil", studentInfo);
  const studentId = studentInfo._id;
  const [imageFile, setImageFile] = useState("");
  const [classroomCode, setClassroomCode] = useState("");

  const handleImageChange = (e: any) => {
    setImageFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleClassroomCodeChange = (e: any) => {
    setClassroomCode(e.target.value);
  };

  const handleClick = async () => {
    console.log("classroomCode", classroomCode);
    console.log(imageFile);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append(
        "jsonData",
        JSON.stringify({
          classroomId: classroomCode,
          studentId: studentId,
          name: studentInfo.username,
        })
      );

      const response = await axios.post(
        "http://127.0.0.1:5000/image/individual",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const embeddingId = response.data.embeddingId;
      console.log("renid", embeddingId); // Assuming the response contains the embedding ID

      // Update Recoil state
      const updatedStudentInfo = { ...studentInfo, embeddings_id: embeddingId };
      setStudentInfo(updatedStudentInfo);

      // Update local storage
      localStorage.setItem("user-info", JSON.stringify(updatedStudentInfo));

      console.log("Upload successful:", response.data);
      alert("Upload successful!");
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Upload failed. Please try again.");
    }
  };

  const handleAlreadyExistingClick = async () => {
    console.log("studentId", studentId);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/enroll",
        {
          classroomId: classroomCode,
          studentId: studentId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Enroll successful:", response.data);
      alert("Enroll successful!");
    } catch (error) {
      console.error("Error enrolling:", error);
      alert("Enrollment failed. Please try again.");
    }
  };

  const handleSubmit = () => {
    if (studentInfo.embeddings_id === null) {
      handleClick();
    } else {
      handleAlreadyExistingClick();
    }
  };

  return (
    <>
      <main className="flex-1 py-10 px-4 md:px-6">
        <div className="mx-auto max-w-md space-y-6">
          <h1 className="text-2xl font-bold">Submit Details</h1>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="code">Classroom Code</Label>
            <Input
              onChange={handleClassroomCodeChange}
              id="code"
              type="text"
              value={classroomCode}
            />
          </div>
          <>
            {!studentInfo.embeddings_id && (
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Picture</Label>
                <Input onChange={handleImageChange} id="picture" type="file" />
              </div>
            )}

            <Button onClick={handleSubmit} className="w-full">
              Submit
            </Button>
          </>
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
