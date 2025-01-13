import { motion } from "framer-motion";
import AdminLayout from "../../components/Layout/AdminLayout";
import AllStudents from "../../components/students/all-students";
import Buttons from "../../components/buttons/Buttons";

const GetAllStudents = () => {
  const handleClick = () => {
    console.log("Button clicked!");
    // Add your logic here
  };
  return (
    <>
      <AdminLayout>
        <motion.div
          className="flex dark:bg-slate-800 justify-center p-12 items-center h-screen w-full overflow-hidden border-l-2 border-slate-600  flex-col gap-4"
          initial={{ opacity: 0, y: 50 }} // Starting state
          animate={{ opacity: 1, y: 0 }} // Animation state
          exit={{ opacity: 0, y: -50 }} // Exit state
          transition={{ duration: 0.5, ease: "easeInOut" }} // Animation timing
        >
          <div className="w-full flex justify-end">
            <Buttons btnName="create student" onClick={handleClick} />
          </div>
          <AllStudents />
        </motion.div>
      </AdminLayout>
    </>
  );
};

export default GetAllStudents;
