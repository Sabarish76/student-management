"use client";
import React, { useState, useEffect } from "react";

function EditStudentForm({ student, onUpdate }) {
  const [name, setName] = useState(student.name);
  const [age, setAge] = useState(student.age);
  const [grade, setGrade] = useState(student.grade);

  useEffect(() => {
    setName(student.name);
    setAge(student.age);
    setGrade(student.grade);
  }, [student]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...student, name, age, grade });
    alert("Student Updated successfully!");
  };

  return (
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
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-36 ml-4 py-2.5 me-2 mb-2 "
      >
        Update
      </button>
    </form>
  );
}

export default EditStudentForm;
