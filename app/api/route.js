import fs from "fs";
import path from "path";

const studentsFilePath = path.join(process.cwd(), "data", "students.json");

export async function POST(req) {
  try {
    const { name, age, grade } = await req.json();
    console.log("Received data:", name, age, grade);
    const id = Date.now().toString();

    const studentsData = fs.readFileSync(studentsFilePath);
    const students = JSON.parse(studentsData);

    students.push({ id, name, age, grade });
    fs.writeFileSync(studentsFilePath, JSON.stringify(students));

    return Response.json({ message: "Posted Successfully" });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Poste Failed" });
  }
}

export async function GET() {
  try {
    const studentsData = fs.readFileSync(studentsFilePath);
    const students = JSON.parse(studentsData);
    return Response.json(students);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Students Not Found" });
  }
}

export async function PUT(req) {
  try {
    const { id, name, age, grade } = await req.json();
    const studentsData = fs.readFileSync(studentsFilePath);
    const students = JSON.parse(studentsData);

    const index = students.findIndex((student) => student.id === id);

    if (index !== -1) {
      students[index] = { id, name, age, grade };
      fs.writeFileSync(studentsFilePath, JSON.stringify(students));
      return Response.json({ message: "Updated Successfully" });
    } else {
      return Response.json({ message: "Student not found" });
    }
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Update UnSuccessfull" });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const studentsData = fs.readFileSync(studentsFilePath);
    let students = JSON.parse(studentsData);

    const index = students.findIndex((student) => student.id === id);

    if (index !== -1) {
      students = students.filter((student) => student.id !== id);
      fs.writeFileSync(studentsFilePath, JSON.stringify(students));
      return Response.json({ message: "Deleted Successfully" });
    } else {
      return Response.json({ message: "Student not found" });
    }
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Deletion Unsuccessful" });
  }
}
