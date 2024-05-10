"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function StudentForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !age || !grade) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const response = await axios.post("/api", { name, age, grade });
      if (response.status === 200) {
        alert("Student added successfully!");
        setName("");
        setAge("");
        setGrade("");
      }
      router.push("/pages/studentlist");
    } catch (error) {
      console.error("Error posting student:", error);
    }
  };

  return (
    <>
      <h1 className="text-3xl text-center my-5 font-bold">Student Form</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-8 h-fit py-5 w-[100%] "
      >
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5"
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5"
          type="number"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <button
          type="submit"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-32 ml-4 py-2.5 me-2 mb-2 "
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default StudentForm;
