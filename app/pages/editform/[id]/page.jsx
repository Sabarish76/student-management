"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Editform = ({ params }) => {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    grade: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/api");
      console.log("Response from server:", response);
      setStudents(response.data);
      if (params.id) {
        const selectedStudent = response.data.find(
          (student) => student.id === params.id
        );
        setStudent(selectedStudent);
        setFormData({
          name: selectedStudent.name,
          age: selectedStudent.age,
          grade: selectedStudent.grade,
        });
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api`, {
        id: params.id,
        ...formData,
      });
      if (response.status === 200) {
        router.push("/pages/studentlist");
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-center my-5 font-bold">Edit Student</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-8 h-fit py-5 w-[100%] "
      >
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5"
          type="text"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />

        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5"
          type="text"
          name="grade"
          placeholder="Grade"
          value={formData.grade}
          onChange={handleChange}
        />
        <button
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-32 ml-4 py-2.5 me-2 mb-2 "
          type="submit"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Editform;
