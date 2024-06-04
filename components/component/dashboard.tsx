"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import userAtom from "@/src/atoms/userAtom";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { teacherURL } from "@/src/utils/constants";
import axios from "axios";
import Loading from "./loading";

interface Classroom {
  _id: string;
  name: string;
  teacher: string;
  code: string;
  __v: number;
}

export function Dashboard() {
  const studentInfo = useRecoilValue(userAtom);
  const studentID = studentInfo._id;
  console.log("student ka id", studentID);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await axios.get(
          `${teacherURL}/classrooms/${studentID}`
        );
        const data = response.data;
        console.log("data", data);
        setClassrooms(data.classrooms);
      } catch (error) {
        console.error("Error fetching student classrooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClassrooms();
  }, []);

  return (
    <main className="flex flex-col gap-8 p-6 md:p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Classrooms</h1>
        <Link href="/joinClassroom">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Join new Class
          </Button>
        </Link>
      </div>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {classrooms.length > 0 ? (
            classrooms.map((classroom) => (
              <Card key={classroom._id}>
                <CardContent className="flex flex-col items-center justify-center p-6 gap-4">
                  <ClapperboardIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                  <div className="text-lg font-semibold">{classroom.name}</div>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4" />
                      <span>{classroom.teacher}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No classrooms found.</p>
          )}
        </div>
      )}
    </main>
  );
}

function ClapperboardIcon(props: any) {
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
      <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
      <path d="m6.2 5.3 3.1 3.9" />
      <path d="m12.4 3.4 3.1 4" />
      <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </svg>
  );
}

function PlusIcon(props: any) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function UserIcon(props: any) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
