import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaArrowLeft } from "react-icons/fa";

const ProjectInfo = () => {
  // Personal Information
  const personalInfo = {
    name: "Farhad Ali",
    email: "farhadali.60613@gmail.com",
    phone: "+91 8638960613",
    github: "https://github.com/leefarhadaman",
    linkedin: "https://www.linkedin.com/in/farhad-ali-8bb801201/",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6 text-white font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-3xl p-10 max-w-3xl w-full shadow-2xl border border-gray-700"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-teal-400 mb-8 text-center">
          Project Details
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 text-center leading-relaxed">
          Thank you for your interest in my projects! <br />
          <span className="text-teal-400 font-semibold text-2xl md:text-3xl">
            The source code is currently private
          </span>{" "}
          due to privacy and personal reasons. <br />
          I’d be thrilled to share more details or explore potential collaborations. Please reach out via my social channels below!
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-8 mb-10">
          {[
            { icon: <FaGithub size={32} />, link: personalInfo.github },
            { icon: <FaLinkedin size={32} />, link: personalInfo.linkedin },
            { icon: <FaEnvelope size={32} />, link: `mailto:${personalInfo.email}` },
            { icon: <FaPhone size={32} />, link: `tel:${personalInfo.phone}` },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gray-700 rounded-full text-white hover:bg-teal-600 transition-all shadow-md hover:shadow-teal-500/50"
              whileHover={{ scale: 1.3, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        {/* Back to Portfolio Button */}
        <motion.a
          href="/"
          className="inline-flex items-center gap-3 px-8 py-4 bg-teal-600 text-white rounded-2xl hover:bg-teal-700 transition-all w-full justify-center shadow-lg hover:shadow-teal-500/50 text-lg font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft /> Back to Portfolio
        </motion.a>
      </motion.div>
    </div>
  );
};

export default ProjectInfo;