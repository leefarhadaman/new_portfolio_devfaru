import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import Lottie from "react-lottie";
import * as animationData from "./404.json"; 

const NotFound = () => {
  // Lottie animation options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Starry background effect
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "-1";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random(),
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        star.opacity += Math.random() * 0.02 - 0.01;
        if (star.opacity > 1) star.opacity = 1;
        if (star.opacity < 0) star.opacity = 0;
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.removeChild(canvas);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6 text-white font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-3xl p-8 max-w-lg w-full shadow-2xl text-center"
      >
        <Lottie options={defaultOptions} height={200} width={400} />
        <h1 className="text-4xl font-bold text-teal-400 mb-4">Oops! Demo Not Found</h1>
        <p className="text-gray-300 text-sm mb-6">
          The live demo for this project is not available yet, but it’s coming soon! Stay tuned for updates, and in the meantime, explore my portfolio.
        </p>
        <motion.a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-2xl hover:bg-teal-700 transition-all shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft /> Back to Portfolio
        </motion.a>
      </motion.div>
    </div>
  );
};

export default NotFound;