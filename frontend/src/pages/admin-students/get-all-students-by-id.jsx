import { useEffect } from "react";
import { useGetAllStudentByIdStore } from "../../store/admin-store/admin-get-all-student-by-id";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import StudentCard from "../../components/students/student-card";

const GetAllStudentsById = () => {
  const { id } = useParams();
  const { allCurrentStudentsById, getAllStudentsById } =
    useGetAllStudentByIdStore();
  useEffect(() => {
    if (!id && !allCurrentStudentsById) {
      getAllStudentsById(id);
    }
  }, [getAllStudentsById, id, allCurrentStudentsById]);

  console.log(id);

  const student = allCurrentStudentsById;
  console.log(student);

  return (
    <>
      <div className="h-screen dark:bg-slate-800  w-screen p-12">
        <div className=" w-[10%]">
          <Link
            to="/admin/students"
            className="flex px-4 py-2 rounded-xl justify-center items-center text-white bg-sky-600 gap-1"
          >
            <ArrowLeft size={20} />
            Go Back
          </Link>
        </div>

        <StudentCard />
      </div>
    </>
  );
};

export default GetAllStudentsById;
