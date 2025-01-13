import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGetAllStudentStore } from "../../store/admin-store/admin-get-students";
import { Link } from "react-router-dom";
export default function AllStudents() {
  const { allCurrentStudents, getAllStudents } = useGetAllStudentStore();
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  useEffect(() => {
    // Fetch students if not already loaded
    if (!allCurrentStudents) {
      getAllStudents();
    }
  }, [allCurrentStudents, getAllStudents]);

  // Safely access student data
  const students = allCurrentStudents?.data || [];
  const totalPages = Math.ceil(students.length / studentsPerPage);

  // Paginated students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-6 border rounded-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 dark:text-gray-300">Avatar</th>
              <th className="px-4 py-2 dark:text-gray-300">Name</th>
              <th className="px-4 py-2 dark:text-gray-300">Student ID</th>
              <th className="px-4 py-2 dark:text-gray-300">Email</th>
              <th className="px-4 py-2 dark:text-gray-300">Address</th>
              <th className="px-4 py-2 dark:text-gray-300">Date of Birth</th>
              <th className="px-4 py-2 dark:text-gray-300">Created At</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student, index) => (
              <motion.tr
                key={student?._id}
                className="border-b hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link to={`/admin/student/${student._id}`} className="">
                  <td className="px-4 py-2">
                    <img
                      src={student?.image || "/default-avatar.png"}
                      alt={`${student?.fullName || "Unknown"}'s avatar`}
                      className="rounded-full border-2 border-green-700 w-12 h-12 object-cover"
                    />
                  </td>
                </Link>
                <td className="px-4 py-2 text-xs font-semibold dark:text-gray-300">
                  {student?.fullName || "N/A"}
                </td>
                <td className="px-4 py-2 text-xs font-semibold dark:text-gray-300">
                  {student?.studentId || "N/A"}
                </td>
                <td className="px-4 py-2 text-xs font-semibold dark:text-gray-300">
                  {student?.email || "N/A"}
                </td>
                <td className="px-4 py-2 text-xs font-semibold dark:text-gray-300">
                  {student?.address || "N/A"}
                </td>
                <td className="px-4 py-2 text-xs font-semibold dark:text-gray-300">
                  {student?.dob || "N/A"}
                </td>
                <td className="px-4 py-2 text-xs font-semibold dark:text-gray-300">
                  {student?.createdAt
                    ? new Date(student.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-600 dark:text-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
