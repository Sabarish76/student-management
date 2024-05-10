"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import StudentForm from "./StudentForm/page";
import StudentList from "./StudentList/page";
import EditStudentForm from "./EditStudentForm/page";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/api");
      setStudents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleSubmit = async (studentData) => {
    try {
      const response = await axios.post("/api", studentData);
      if (response.status === 200) {
        fetchStudents();
      }
    } catch (error) {
      console.error("Error posting student:", error);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleUpdate = async (updatedStudent) => {
    try {
      const response = await axios.put("/api", updatedStudent);
      if (response.status === 200) {
        fetchStudents();
        setEditingStudent(null);
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete("/api", { data: { id } });
      if (response.status === 200) {
        fetchStudents();
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <main>
      <h1 className="text-3xl text-center my-5 font-bold">Student Form</h1>
      <StudentForm onSubmit={handleSubmit} />
      <h1 className="text-3xl text-center my-5 font-bold">Student List</h1>
      <StudentList
        students={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {editingStudent && (
        <>
          <h1 className="text-3xl text-center my-5 font-bold">Edit Student</h1>
          <EditStudentForm student={editingStudent} onUpdate={handleUpdate} />
        </>
      )}
    </main>
  );
}
