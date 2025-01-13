/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { CalendarDays, Mail, MapPin, Phone, User } from "lucide-react";

export default function StudentCard({
  name,
  email,
  image,
  phoneNumber,
  address,
  dateOfBirth,
  createdAt,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-gray-700 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto"
    >
      <div className="relative h-48">
        <img
          src={image}
          alt={`${name}'s profile picture`}
          className="transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {name}
        </h2>
        <div className="space-y-3">
          <InfoItem
            icon={<Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
            text={email}
          />
          <InfoItem
            icon={
              <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            }
            text={phoneNumber}
          />
          <InfoItem
            icon={
              <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            }
            text={address}
          />
          <InfoItem
            icon={
              <CalendarDays className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            }
            text={`Born: ${dateOfBirth}`}
          />
          <InfoItem
            icon={<User className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
            text={`Joined: ${createdAt}`}
          />
        </div>
      </div>
    </motion.div>
  );
}

function InfoItem({ icon, text }) {
  return (
    <motion.div
      className="flex items-center space-x-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {icon}
      <span className="text-gray-600 dark:text-gray-400">{text}</span>
    </motion.div>
  );
}
