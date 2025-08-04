import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    FaGithub,
    FaLinkedin,
    FaEnvelope,
    FaPhone,
    FaCheckCircle,
    FaExclamationCircle,
    FaSpinner,
    FaReact,
    FaNode,
    FaDatabase,
    FaTools,
    FaServer,
    FaRocket,
    FaAws,
    FaHtml5,
    FaBuilding,
    FaCertificate,
    FaBriefcase,
    FaJava,
    FaGraduationCap,
    FaDownload,
    FaGamepad,
    FaSearch,
    FaStar,
    FaCode,
    FaAccessibleIcon,
    FaCodeBranch,
    FaLaptopCode,
    FaUserGraduate,
    FaShieldAlt,
    FaNetworkWired,
    FaBrain,
    FaChartBar,
} from "react-icons/fa";
import {
    SiFlutter,
    SiFirebase,
    SiMongodb,
    SiPostgresql,
    SiPython,
    SiPhp,
    SiGit,
    SiFigma,
    SiTailwindcss,
    SiTypescript,
    SiMysql,
    SiCplusplus,
    SiDocker,
    SiKubernetes,
    SiGraphql,
} from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

// Custom Alert Component
export const CustomAlert = ({ type, message, onClose }) => {
    const bgColor = type === "success" ? "bg-green border-green-400" : "bg-red-100 border-red-400";
    const Icon = type === "success" ? FaCheckCircle : FaExclamationCircle;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`${bgColor} border-l-4 p-4 rounded-2xl shadow-lg flex items-center justify-between dark:bg-opacity-90`}
        >
            <div className="flex items-center space-x-2">
                <Icon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                <p className="text-gray-800 text-sm dark:text-gray-200">{message}</p>
            </div>
            <button
                onClick={onClose}
                className="ml-4 text-gray-800 hover:text-gray-900 transition-colors dark:text-gray-200"
            >
                ×
            </button>
        </motion.div>
    );
};

// Project Modal Component
const ProjectModal = ({ project, onClose, theme }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 dark:bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                className={`${theme === "dark" ? "bg-gray-900" : "bg-white"} bg-opacity-90 backdrop-blur-md rounded-3xl p-6 max-w-lg w-full shadow-2xl`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {project.name}
                    </h3>
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                        ×
                    </motion.button>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.split(", ").map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-teal-500 text-white text-xs rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="mb-6">
                    <h4 className={`font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                        Description
                    </h4>
                    <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                        {project.description}
                    </p>
                </div>
                <div className="mb-6">
                    <h4 className={`font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                        Key Features
                    </h4>
                    <ul className={`list-disc list-inside text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                        {project.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>
                <div className="flex gap-3">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-2xl hover:bg-gray-700 transition-all dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                        <FaGithub /> View on GitHub
                    </a>
                    {project.demo && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-2xl hover:bg-teal-700 transition-all"
                        >
                            <FaRocket /> Live Demo
                        </a>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

// Memory Game Component
const MemoryGame = ({ onClose, theme }) => {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [gameStarted, setGameStarted] = useState(false);
    const [difficulty, setDifficulty] = useState("medium");
    const [moves, setMoves] = useState(0);

    const timerRef = useRef(null);

    const generateCards = useCallback(() => {
        const emojis = {
            easy: ["😺", "🐶", "🦁", "🐻", "🐼", "🐨"],
            medium: ["😺", "🐶", "🦁", "🐻", "🐼", "🐨", "🐯", "🦒"],
            hard: ["😺", "🐶", "🦁", "🐻", "🐼", "🐨", "🐯", "🦒", "🐘", "🦊", "🐹", "🐰"],
        };
        const selectedEmojis = emojis[difficulty];
        const doubledEmojis = [...selectedEmojis, ...selectedEmojis].sort(() => Math.random() - 0.5);
        return doubledEmojis.map((emoji, index) => ({ id: index, emoji, isFlipped: false }));
    }, [difficulty]);

    useEffect(() => {
        setCards(generateCards());
    }, [generateCards]);

    useEffect(() => {
        if (gameStarted && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [gameStarted, timeLeft]);

    useEffect(() => {
        if (matched.length > 0 && matched.length === cards.length) {
            clearInterval(timerRef.current);
        }
    }, [matched, cards.length]);

    const startGame = () => {
        setGameStarted(true);
        setTimeLeft(difficulty === "easy" ? 90 : difficulty === "medium" ? 60 : 45);
        setScore(0);
        setMoves(0);
        setMatched([]);
        setFlipped([]);
        setCards(generateCards());
    };

    const handleCardClick = (index) => {
        if (!gameStarted) return;
        if (flipped.length < 2 && !flipped.includes(index) && !matched.includes(index)) {
            const newFlipped = [...flipped, index];
            setFlipped(newFlipped);
            const newCards = cards.map((card, i) =>
                i === index ? { ...card, isFlipped: true } : card
            );
            setCards(newCards);
            if (newFlipped.length === 2) {
                setMoves(moves + 1);
                const [first, second] = newFlipped;
                if (cards[first].emoji === cards[second].emoji) {
                    setMatched([...matched, first, second]);
                    setScore(score + (difficulty === "easy" ? 5 : difficulty === "medium" ? 10 : 15));
                    setFlipped([]);
                } else {
                    setTimeout(() => {
                        setFlipped([]);
                        setCards((prev) =>
                            prev.map((card, i) =>
                                !matched.includes(i) && (i === first || i === second)
                                    ? { ...card, isFlipped: false }
                                    : card
                            )
                        );
                    }, 1000);
                }
            }
        }
    };

    const restartGame = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setGameStarted(false);
        setCards(generateCards());
        setFlipped([]);
        setMatched([]);
        setScore(0);
        setMoves(0);
        setTimeLeft(difficulty === "easy" ? 90 : difficulty === "medium" ? 60 : 45);
    };

    const getGridCols = () => {
        if (difficulty === "easy") return "grid-cols-3";
        if (difficulty === "medium") return "grid-cols-4";
        return "grid-cols-4 sm:grid-cols-6";
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                className={`${theme === "dark" ? "bg-gray-900" : "bg-white"
                    } bg-opacity-90 backdrop-blur-md rounded-3xl p-6 max-w-md w-full shadow-2xl`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        Memory Game
                    </h3>
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                        ×
                    </motion.button>
                </div>
                {!gameStarted ? (
                    <div className="mb-6">
                        <h4 className={`font-medium mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                            Select Difficulty
                        </h4>
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            {["easy", "medium", "hard"].map((level) => (
                                <motion.button
                                    key={level}
                                    onClick={() => setDifficulty(level)}
                                    className={`py-2 px-4 rounded-xl ${difficulty === level
                                        ? "bg-teal-500 text-white"
                                        : theme === "dark"
                                            ? "bg-gray-800 text-gray-300"
                                            : "bg-gray-200 text-gray-700"
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {level.charAt(0).toUpperCase() + level.slice(1)}
                                </motion.button>
                            ))}
                        </div>
                        <motion.button
                            onClick={startGame}
                            className="w-full py-3 bg-teal-600 text-white rounded-2xl hover:bg-teal-700 transition-all flex items-center justify-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Start Game
                        </motion.button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                            <div className={`p-2 rounded-xl ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
                                <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Score</p>
                                <p className={`font-bold ${theme === "dark" ? "text-teal-400" : "text-teal-600"}`}>{score}</p>
                            </div>
                            <div className={`p-2 rounded-xl ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
                                <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Time</p>
                                <p
                                    className={`font-bold ${timeLeft < 10 ? "text-red-500" : theme === "dark" ? "text-teal-400" : "text-teal-600"
                                        }`}
                                >
                                    {timeLeft}s
                                </p>
                            </div>
                            <div className={`p-2 rounded-xl ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
                                <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Moves</p>
                                <p className={`font-bold ${theme === "dark" ? "text-teal-400" : "text-teal-600"}`}>{moves}</p>
                            </div>
                            <div className={`p-2 rounded-xl ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
                                <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Pairs</p>
                                <p className={`font-bold ${theme === "dark" ? "text-teal-400" : "text-teal-600"}`}>
                                    {matched.length / 2} / {cards.length / 2}
                                </p>
                            </div>
                        </div>
                        {timeLeft > 0 && matched.length < cards.length ? (
                            <div className={`grid ${getGridCols()} gap-2 mb-4`}>
                                {cards.map((card, index) => (
                                    <motion.div
                                        key={card.id}
                                        className={`p-2 sm:p-4 cursor-pointer flex items-center justify-center text-2xl rounded-2xl ${card.isFlipped || matched.includes(index)
                                            ? "bg-teal-500"
                                            : theme === "dark"
                                                ? "bg-gray-800"
                                                : "bg-gray-200"
                                            }`}
                                        onClick={() => handleCardClick(index)}
                                        whileHover={!card.isFlipped && !matched.includes(index) ? { scale: 1.05 } : {}}
                                        whileTap={!card.isFlipped && !matched.includes(index) ? { scale: 0.95 } : {}}
                                        animate={
                                            matched.includes(index)
                                                ? { rotateY: [0, 180, 0], scale: [1, 1.1, 1] }
                                                : card.isFlipped
                                                    ? { rotateY: 180 }
                                                    : { rotateY: 0 }
                                        }
                                    >
                                        {card.isFlipped || matched.includes(index) ? card.emoji : "?"}
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="mb-6 text-center">
                                <h4
                                    className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                                >
                                    {matched.length === cards.length ? "You Won! 🎉" : "Game Over! ⏱️"}
                                </h4>
                                <div className={`p-6 rounded-2xl mb-4 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Final Score</p>
                                            <p className={`text-2xl font-bold ${theme === "dark" ? "text-teal-400" : "text-teal-600"}`}>
                                                {score}
                                            </p>
                                        </div>
                                        <div>
                                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Time Taken</p>
                                            <p className={`text-2xl font-bold ${theme === "dark" ? "text-teal-400" : "text-teal-600"}`}>
                                                {difficulty === "easy" ? 90 : difficulty === "medium" ? 60 : 45} - {timeLeft}s
                                            </p>
                                        </div>
                                        <div>
                                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Moves</p>
                                            <p className={`text-2xl font-bold ${theme === "dark" ? "text-teal-400" : "text-teal-600"}`}>
                                                {moves}
                                            </p>
                                        </div>
                                        <div>
                                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Pairs Found</p>
                                            <p className={`text-2xl font-bold ${theme === "dark" ? "text-teal-400" : "text-teal-600"}`}>
                                                {matched.length / 2} / {cards.length / 2}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex gap-4">
                            <motion.button
                                onClick={restartGame}
                                className="flex-1 py-2 bg-teal-600 text-white rounded-2xl hover:bg-teal-700 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Play Again
                            </motion.button>
                            <motion.button
                                onClick={onClose}
                                className={`flex-1 py-2 rounded-2xl transition-all ${theme === "dark"
                                    ? "bg-gray-800 text-white hover:bg-gray-700"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Close
                            </motion.button>
                        </div>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
};

// Main Portfolio Component
const Portfolio = () => {
    const [activeTab, setActiveTab] = useState("about");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState({ type: "", message: "" });
    const [selectedProject, setSelectedProject] = useState(null);
    const [projectFilter, setProjectFilter] = useState("all");
    const [showGame, setShowGame] = useState(false);
    const [theme, setTheme] = useState("dark");
    const [searchTerm, setSearchTerm] = useState("");
    const [imgError, setImgError] = useState(false);
    const [downloadStatus, setDownloadStatus] = useState({ type: "", message: "" });

    // Theme toggle effect
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
            if (savedTheme === "light") {
                document.documentElement.classList.remove("dark");
            } else {
                document.documentElement.classList.add("dark");
            }
        } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
            setTheme("light");
            document.documentElement.classList.remove("dark");
        } else {
            document.documentElement.classList.add("dark");
        }
    }, []);

    // Form submission handler
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setFormStatus({ type: "", message: "" });

        const formData = new FormData(event.target);
        formData.append("access_key", process.env.REACT_APP_FORM_ACCESS_KEY);

        try {
            const response = await fetch(process.env.REACT_APP_API_URL, {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                setFormStatus({
                    type: "success",
                    message: "Message sent! I'll get back to you soon.",
                });
                event.target.reset();
            } else {
                setFormStatus({
                    type: "error",
                    message: "Failed to send your message. Please try again.",
                });
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setFormStatus({
                type: "error",
                message: "Oops! Something went wrong. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setFormStatus({ type: "", message: "" }), 5000);
        }
    };

    // Resume download handler
    const handleDownloadResume = () => {
        const link = document.createElement("a");
        link.href = personalInfo.resume;
        link.download = "Farhad_Ali_Resume.pdf";
        link.target = "_blank";
        link.onerror = () => {
            console.error("Failed to download resume. Check if file exists at", personalInfo.resume);
            setDownloadStatus({
                type: "error",
                message: "Failed to download resume. Please try again or contact me directly.",
            });
            setTimeout(() => setDownloadStatus({ type: "", message: "" }), 5000);
        };
        link.onload = () => {
            setDownloadStatus({
                type: "success",
                message: "Resume download started!",
            });
            setTimeout(() => setDownloadStatus({ type: "", message: "" }), 5000);
        };
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Personal Information
    const personalInfo = {
        name: "Farhad Ali",
        role: "Full Stack Developer",
        location: "Guwahati, Assam, India",
        email: "farhadali.60613@gmail.com",
        phone: "+91 8638960613",
        github: "https://github.com/leefarhadaman",
        linkedin: "https://www.linkedin.com/in/farhad-ali-8bb801201/",
        resume: "/SoftwareDeveloper.pdf",
        bio: `I'm a passionate Full Stack Developer with over 2 years of experience in crafting robust, user-centric web and mobile applications. My journey began with a curiosity for technology, leading me to master both frontend and backend development. I specialize in creating seamless, high-performance solutions using technologies like React, Flutter, Node.js, and Python. 

Beyond coding, I thrive on solving complex problems, collaborating with teams, and delivering projects that make a tangible impact. My freelance work has honed my ability to understand client needs and translate them into intuitive applications. I'm deeply committed to staying at the forefront of technology, constantly exploring new tools and frameworks to enhance my skill set.

When I'm not coding, you can find me contributing to open-source projects, writing tech blogs, or exploring the outdoors through hiking. I'm excited about opportunities to build innovative solutions and grow as a developer in a dynamic, forward-thinking environment.`,
        education: [
            {
                degree: "Masters of Computer Applications (MCA)",
                institution: "Indira Gandhi National Open University",
                graduationYear: 2027,
                gpa: "Pursuing",
                icon: <FaGraduationCap className="text-teal-500" />,
            },
            {
                degree: "Bachelor of Computer Applications (BCA)",
                institution: "Assam Don Bosco University",
                graduationYear: 2024,
                gpa: "7.69/10",
                icon: <FaGraduationCap className="text-teal-500" />,
            },
            {
                degree: "Class 12",
                institution: "Kendriya Vidyalaya NFR Maligaon",
                graduationYear: 2021,
                gpa: "76.6%",
                icon: <FaBuilding className="text-indigo-500" />,
            },
            {
                degree: "Class 10",
                institution: "Brahmaputra Valley English Academy",
                graduationYear: 2019,
                gpa: "81.44%",
                icon: <FaBuilding className="text-coral-500" />,
            },
        ],
    };

    // Work Experience Data
    const experience = [
        {
            title: "Software Engineer",
            company: "XopunTech (India) Pvt. Ltd.",
            location: "Guwahati, India",
            duration: "August 2025 – Present",
            description:
                "Joined the engineering team to contribute to the development of scalable software solutions. Looking forward to collaborating on impactful projects and growing within a dynamic tech environment.",
            responsibilities: [],
            tech: [],
        },
        {
            title: "Full Stack Developer",
            company: "Zero9 Communication Pvt Ltd",
            location: "Guwahati, India",
            duration: "June 2024 – July 2025",
            description:
                "Leading development of scalable web applications using React, Node.js, and MongoDB. Implemented RESTful APIs and responsive interfaces for multiple client projects.",
            responsibilities: [
                "Architected and implemented complete web solutions for clients in e-commerce and finance sectors",
                "Optimized database queries resulting in 40% faster load times",
                "Mentored junior developers and led code reviews",
                "Integrated third-party APIs for payment processing and data analytics",
            ],
            tech: ["React", "Node.js", "MongoDB", "Express", "AWS"],
        },
        {
            title: "Flutter Developer (Part-Time/Intern)",
            company: "Rhinoceros Technologies Pvt Ltd",
            location: "Remote",
            duration: "Dec 2023 – Apr 2024",
            description:
                "Developed cross-platform mobile applications using Flutter and Firebase for startups and small businesses.",
            responsibilities: [
                "Built feature-rich UI components with complex animations",
                "Implemented state management using Provider and Bloc patterns",
                "Created real-time chat functionality with Firebase",
                "Optimized app performance across iOS and Android platforms",
            ],
            tech: ["Flutter", "Dart", "Firebase", "REST APIs", "SQLite"],
        },
        {
            title: "Flutter Developer Intern",
            company: "Vidcomet Ecommerce Pvt Ltd",
            location: "Guwahati, India",
            duration: "Sep 2023 – Dec 2023",
            description:
                "Developed an e-commerce mobile application with product catalog, user authentication, and payment integration.",
            responsibilities: [
                "Implemented user authentication with Firebase Auth",
                "Built shopping cart and checkout functionality",
                "Integrated payment gateways including Razorpay and PayTM",
                "Created product filtering and search functionality",
            ],
            tech: ["Flutter", "Firebase", "Dart", "Payment APIs"],
        },
        {
            title: "Freelancer",
            company: "Self-employed",
            location: "Remote",
            duration: "2020 – Present",
            description:
                "Delivered custom web and mobile solutions for various clients, specializing in React, Flutter, and MERN stack development.",
            responsibilities: [
                "Developed full-stack web applications for small businesses",
                "Created mobile apps for Android and iOS using Flutter",
                "Designed and implemented database schemas",
                "Provided ongoing maintenance and support services",
            ],
            tech: ["React", "Node.js", "Flutter", "MongoDB", "Firebase"],
        },
    ];

    // Projects Data
    const projects = [
        {
            "name": "SecretVault",
            "tech": "Node.js, Express, Redis, UUID, Helmet, Express-rate-limit, Dotenv, Crypto",
            "description": "SecretVault is a secure, Node.js-based API for sharing sensitive data (e.g., passwords, API keys, tokens) via one-time-use links. Links self-destruct after a single access or a specified expiration time (e.g., 10 minutes, 1 hour), ensuring data security. Ideal for developers needing a reliable way to share secrets securely.",
            "github": "https://github.com/leefarhadaman/SecretVault",
            "demo": "*",
            "features": [
                "One-Time Access: Secrets are accessible only once via a unique link, then deleted",
                "Configurable Expiration: Set custom TTL (e.g., 10 minutes, 1 hour) for automatic secret deletion using Redis",
                "Secure Encryption: AES-256-CBC encryption for all stored secrets via Node.js Crypto",
                "Rate-Limiting: Express-rate-limit prevents brute-force attacks",
                "Security Headers: Helmet enhances HTTP security",
                "Unique IDs: UUID generates secure, unique secret identifiers",
                "Environment Configuration: Dotenv manages secure environment variables",
                "RESTful API: Simple and intuitive endpoints for secret creation and retrieval"
            ]
        },
        {
            "name": "DisasterResponseCoordinationPlatform",
            "tech": "React, TypeScript, Tailwind CSS, Framer Motion, Node.js, Express, Socket.IO, Pino, Cheerio, Google Gemini API, Mapbox, ",
            "description": "A real-time MERN stack application for disaster management and resource coordination. This platform aggregates data from multiple sources to aid emergency response teams in managing disasters effectively.",
            "github": "https://github.com/leefarhadaman/DisasterResponseCoordinationPlatform",
            "demo": "*",
            "features": [
                "Real-time Disaster Management: Create, update, and monitor disasters with live updates via WebSocket",
                "Resource Coordination: Track and manage emergency resources with geospatial queries",
                "Social Media Integration: Monitor social media feeds for disaster-related posts",
                "AI-Powered Location Extraction: Use Google Gemini API to extract locations from text",
                "Geospatial Queries: Find nearby resources using PostGIS",
                "Caching System: Efficient caching with Supabase for external API calls",
                "Official Updates Scraping: Web scraping for government and NGO updates",
                "Image Verification: AI-powered image verification for social media posts",

            ]
        },
        {
            "name": "VideoMerger",
            "tech": "React, TypeScript, Tailwind CSS, Framer Motion, Node.js, Express, FFmpeg",
            "description": "A powerful web application that lets you merge multiple videos with background music seamlessly. Built with modern web technologies and optimized for performance.",
            "github": "https://github.com/leefarhadaman/video_merger",
            "demo": "*",
            "features": [
                "FFmpeg integration for professional-grade video processing",
                "Multiple codec support (H.264, HEVC, VP8, VP9)",
                "Merge up to 20 videos simultaneously",
                "Add background music",
                "Real-time progress tracking",
                "High-quality output",
                "Modern, responsive UI",
                "Video previews with thumbnails",
            ]
        },
        {
            "name": "VideoStreamingHub",
            "tech": "FastAPI, SQLAlchemy, Bootstrap 5, JavaScript, Jinja2",
            "description": "A modern and feature-rich video streaming platform where users can upload, share, and interact with videos in a YouTube-like environment.",
            "github": "https://github.com/leefarhadaman/videostreaminghub.git",
            "demo": "*",
            "features": [
                "User authentication with JWT tokens for secure login and registration",
                "Upload, view, edit, and delete videos with automatic thumbnail generation using FFmpeg",
                "Like videos, add comments, and maintain watch history",
                "Responsive UI using Bootstrap 5 and drag-and-drop video upload",
                "User profiles with customizable profile pictures",
                "Server-side rendering with Jinja2 templates and dynamic frontend using vanilla JavaScript",
                "File-based storage system with support for thumbnails, profile pictures, and videos",
                "Comprehensive error handling and feedback throughout the platform",
                "Recent updates include Python 3.13 compatibility, improved FFmpeg handling, and enhanced UI"
            ]
        },
        {
            "name": "EliteFitness",
            "tech": "HTML5, CSS3, JavaScript (Vanilla JS), Tailwind CSS, LottieFiles",
            "description": "A fully responsive landing page for a freelance personal trainer, showcasing services, testimonials, and a contact form with modern UI and animations.",
            "github": "https://github.com/leefarhadaman/personal_training",
            "demo": "https://personaltrainerdemo.netlify.app",
            "features": [
                "Responsive design for all screen sizes using Flexbox and CSS Grid",
                "Smooth scroll navigation with sticky navbar",
                "Scroll-triggered animations for engaging user experience",
                "Testimonial slider to showcase client feedback",
                "Validated contact form for inquiries",
                "Modern UI/UX with clean typography and spacing"
            ]
        },
        {
            "name": "ShopHub",
            "tech": "React.js, Tailwind CSS, Vite",
            "description": "A modern and responsive eCommerce platform for seamless online shopping, featuring product browsing, cart management, and a clean UI.",
            "github": "https://github.com/leefarhadaman/new_eccomerce",
            "demo": "https://newshophub.netlify.app",
            "features": [
                "Product listing with category filtering and search",
                "Add to cart and cart quantity management",
                "Responsive UI for mobile and desktop",
                "Wishlist functionality for saving products",
                "Fast performance with Vite build tool",
                "Mock backend for product data"
            ]
        },
        {
            "name": "MsgDetect",
            "tech": "React, TypeScript, Vite, Tailwind CSS, Python, FastAPI, Uvicorn, Pillow, NumPy, Axios, Pydantic, Sentry",
            "description": "A web application for detecting hidden messages in image, audio, and text files. Users can upload files through an intuitive React frontend, and the FastAPI backend analyzes them for steganography using techniques like LSB analysis and entropy scoring, providing detailed results and metadata.",
            "github": "https://github.com/leefarhadaman/steganography_detector_frontend",
            "demo": "https://msgdetect.netlify.app/",
            "features": [
                "Drag-and-drop file upload for PNG, JPEG, WAV, MP3, and TXT files",
                "Steganography detection with LSB, entropy, and correlation analysis",
                "Detailed detection results with confidence scores and metrics",
                "Responsive UI with loading animations and clear results option",
                "File metadata extraction including size and format",
                "Secure FastAPI backend with CORS and error handling"
            ]
        },
        {
            "name": "SmallFancy",
            "tech": "MERN, React",
            "description": "A full-featured eCommerce web application built with the MERN stack. It offers seamless product browsing, user authentication, cart management, and secure checkout functionality.",
            "github": "https://github.com/leefarhadaman/ecco_merce",
            "demo": "https://smallfancy.netlify.app",
            "features": [
                "User registration and authentication",
                "Product listing with search and filters",
                "Shopping cart and checkout process",
                "Admin dashboard for product and order management",
                "Order history and payment integration"
            ]
        },
        {
            name: "Simple_FaceRecognizeApp",
            tech: "Python",
            description:
                "A Python-based application for real-time face recognition using computer vision techniques. It detects and identifies faces in images or video streams with high accuracy.",
            github: "https://github.com/leefarhadaman/Simple_FaceRecognizeApp",
            demo: "*",
            features: [
                "Real-time face detection using OpenCV",
                "Face recognition with pre-trained models",
                "Support for image and video input",
                "User-friendly interface for testing",
                "Export detection results to CSV"
            ],
        },
        {
            name: "InstaProfileAnalyzer",
            tech: "Flutter, Python",
            description:
                "A Python-based tool designed to fetch and analyze data from public Instagram profiles, with a Flutter frontend for a user-friendly interface. It provides insights into profile details and post analytics.",
            github: "https://github.com/leefarhadaman/InstaProfileAnalyzer",
            demo: "*",
            features: [
                "Fetch profile details: Bio, username, external links, and profile picture",
                "Analyze post engagement metrics (likes, comments)",
                "Organized output in JSON or CSV format",
                "Cross-platform Flutter UI for easy navigation",
                "Support for batch profile analysis"
            ],
        },
        {
            name: "Real-Time-Sorting-Algorithms-Comparison",
            tech: "Python, HTML",
            description:
                "A web-based tool that visualizes and compares the performance of various sorting algorithms in real time, implemented in Python and rendered using HTML.",
            github: "https://github.com/leefarhadaman/-Real-Time-Sorting-Algorithms-Comparison",
            demo: "*",
            features: [
                "Visualize sorting algorithms (Bubble, Quick, Merge, etc.)",
                "Real-time performance metrics (time, comparisons)",
                "Interactive HTML dashboard for algorithm selection",
                "Customizable input data sizes",
                "Export comparison results as charts"
            ],
        },
        {
            name: "AI-Powered Chat App with Flutter & GetX",
            tech: "Flutter, GetX, Google Gemini API, HTTP",
            description:
                "An AI-powered chat application built with Flutter and GetX, leveraging the Google Gemini API for generating intelligent, real-time responses.",
            github: "https://github.com/leefarhadaman/chatapp-flutter",
            demo: "*",
            features: [
                "Real-time chat interface with smooth, user-friendly UI",
                "AI-driven responses using Google Gemini API",
                "State management with GetX for efficient performance",
                "Support for multimedia message previews",
                "Chat history storage and retrieval"
            ],
        },
        {
            name: "Phone Directory",
            tech: "Python, Tkinter, SQLite3, CSV",
            description:
                "A simple phone directory application built using Python, SQLite, and Tkinter. It provides CRUD functionality for managing contacts and supports exporting contacts to a CSV file.",
            github: "https://github.com/leefarhadaman/phonedirectory",
            demo: "*",
            features: [
                "Add contacts with name and phone number",
                "Update existing contact details",
                "Delete unwanted contacts from the directory",
                "Search contacts by name or phone number",
                "Export all contacts to a CSV file",
                "User-friendly Tkinter graphical interface"
            ],
        },
        {
            name: "TripPlanner - Flutter",
            tech: "Flutter, GetX, Google Gemini API, HTTP",
            description:
                "A travel planning application built with Flutter and GetX, utilizing the Google Gemini API to generate personalized trip itineraries and recommendations.",
            github: "https://github.com/leefarhadaman/TripPlanner_Flutter",
            demo: "*",
            features: [
                "Generate customized trip itineraries based on user preferences",
                "AI-powered destination and activity recommendations",
                "Real-time budget tracking and expense management",
                "Interactive map integration for route planning",
                "Offline access to saved itineraries"
            ],
        },
        {
            name: "SQL_QUERY_RUNNER",
            tech: "React, MERN, MySQL",
            description:
                "A web application built with React and the MERN stack, allowing users to connect to a MySQL database, run SQL queries, and view results in real time. Features a query editor and dark mode support.",
            github: "https://github.com/leefarhadaman/SQL_QUERY_RUNNER",
            demo: "*",
            features: [
                "Interactive SQL query editor with syntax highlighting",
                "Real-time query execution and result display",
                "Query history for quick access to past queries",
                "Dark mode for improved user experience",
                "Secure database connection management"
            ],
        },
        {
            name: "Advanced-Typing-Speed-Test",
            tech: "Python, SQLite, Flask Sessions, Chart.js, JavaScript",
            description:
                "A web-based typing speed test application that measures typing speed and accuracy, with features for saving results and visualizing performance using Chart.js.",
            github: "https://github.com/leefarhadaman/Advanced-Typing-Speed-Test",
            demo: "*",
            features: [
                "Accurate typing speed and accuracy measurement",
                "Save test results to SQLite database",
                "Interactive performance charts with Chart.js",
                "Session management with Flask for user tracking",
                "Customizable test duration and difficulty"
            ],
        },
        {
            name: "Online Python Compiler",
            tech: "React, MERN",
            description:
                "A web-based Python compiler built with React and the MERN stack, allowing users to write, run, and debug Python code in real time with a user-friendly interface.",
            github: "https://github.com/leefarhadaman/online-python-compiler",
            demo: "*",
            features: [
                "Real-time Python code execution",
                "Syntax-highlighted code editor",
                "Error handling and debug output",
                "Save and share code snippets",
                "Support for multiple Python libraries"
            ],
        },
        {
            name: "Scrapper",
            tech: "Flutter, GetX, Google Gemini API, HTTP",
            description:
                "A web scraping tool with a Flutter-based GUI and Turtle graphics, designed to extract and save data from websites with AI-assisted parsing using the Google Gemini API.",
            github: "https://github.com/leefarhadaman/Scrapper",
            demo: "*",
            features: [
                "Extract data from websites with customizable selectors",
                "AI-assisted data parsing with Google Gemini API",
                "Interactive Turtle graphics for visualizing scraping process",
                "Export scraped data to JSON or CSV",
                "Cross-platform Flutter interface"
            ],
        },
        {
            name: "DineSmart",
            tech: "Flutter, Firebase, Stripe API",
            description:
                "A food ordering app with real-time order tracking, authentication, and secure payment processing.",
            github: "/project-info",
            demo: "*",
            features: [
                "User authentication with email and social login",
                "Real-time order tracking with notifications",
                "Restaurant browsing with filters and search",
                "Secure payment processing with Stripe",
                "Order history and favorite restaurants"
            ],
        },
        {
            name: "EventSync",
            tech: "ReactJS, Node.js, MongoDB, Socket.io",
            description:
                "A real-time event scheduling platform with notifications, allowing teams to coordinate and manage events efficiently.",
            github: "/project-info",
            demo: "*",
            features: [
                "Real-time calendar updates with Socket.io",
                "Team collaboration and event sharing",
                "Customizable notification preferences",
                "Integration with Google Calendar",
                "Advanced filtering and search capabilities"
            ],
        },
        {
            name: "TaskFlow",
            tech: "ReactJS, Firebase, Tailwind CSS",
            description:
                "A task management system with drag-and-drop functionality, real-time updates, and team collaboration features.",
            github: "/project-info",
            demo: "*",
            features: [
                "Kanban-style board with drag-and-drop",
                "Task deadline reminders and notifications",
                "Team assignments and shared workspaces",
                "Activity logs and task history tracking",
                "Priority levels and task categorization"
            ],
        },
        {
            name: "CloudVault",
            tech: "React, Node.js, AWS S3, MongoDB",
            description:
                "A secure cloud storage solution with file encryption, sharing capabilities, and access control.",
            github: "/project-info",
            demo: "*",
            features: [
                "End-to-end file encryption",
                "Granular access control and permissions",
                "File versioning and recovery",
                "Advanced file search with metadata",
                "Folder organization and batch operations"
            ],
        },
        {
            name: "MedConnect",
            tech: "Flutter, Firebase, Agora API",
            description:
                "A telehealth application connecting patients with healthcare providers through secure video consultations.",
            github: "/project-info",
            demo: "*",
            features: [
                "Encrypted video consultations",
                "Electronic health records management",
                "Appointment scheduling and reminders",
                "Prescription management and history",
                "Integrated payment processing"
            ],
        },
        {
            name: "CodeCollab",
            tech: "React, WebSocket, Express, MongoDB",
            description:
                "A collaborative code editing platform with real-time collaboration, version control, and code execution features.",
            github: "/project-info",
            demo: "*",
            features: [
                "Real-time collaborative code editing",
                "Multiple programming language support",
                "Code execution and output display",
                "Version history and diff viewing",
                "Team project management"
            ],
        },
        {
            name: "FitTrack",
            tech: "Flutter, Firebase, RESTful APIs",
            description:
                "A fitness tracking application with workout plans, progress tracking, and health metrics visualization.",
            github: "/project-info",
            demo: "*",
            features: [
                "Custom workout plan creation",
                "Progress tracking with graphs and statistics",
                "Nutrition tracking and meal planning",
                "Exercise library with video demonstrations",
                "Goal setting and achievement tracking"
            ],
        },
        {
            name: "SmartBudget",
            tech: "React Native, Firebase, Charts.js",
            description:
                "A personal finance management app with expense tracking, budget planning, and financial insights.",
            github: "https://github.com/leefarhadaman/expense_tracker",
            demo: "*",
            features: [
                "Expense categorization and tracking",
                "Budget creation and monitoring",
                "Financial insights and reports",
                "Bill reminders and recurring expenses",
                "Multi-currency support"
            ],
        },
        {
            name: "SpotOn",
            tech: "Python, Machine Learning, Flutter",
            description:
                "A skin cancer detection app using machine learning to analyze skin images and determine the likelihood of skin cancer.",
            github: "/project-info",
            demo: "*",
            features: [
                "Machine learning model to analyze skin images",
                "Real-time cancer detection suggestions",
                "Flutter-based mobile app interface",
                "User profile and health history tracking",
                "Educational resources on skin cancer prevention"
            ],
        },
        {
            name: "StegoSecure",
            tech: "Python, OpenCV, Cryptography",
            description:
                "A steganography app to hide sensitive information in images with encryption for secure data transfer.",
            github: "https://github.com/leefarhadaman/steganography-tool",
            demo: "*",
            features: [
                "Hide text or files within images",
                "Encryption for added security",
                "Extraction of hidden data from images",
                "Password protection for hidden data",
                "Supports various image formats"
            ],
        },
        {
            name: "PasswordVault",
            tech: "Python, SQLite, Cryptography",
            description:
                "A secure password manager to store and encrypt user credentials with password generation capabilities.",
            github: "/project-info",
            demo: "*",
            features: [
                "Secure password encryption",
                "Password generation tool",
                "Database backup and restore",
                "Autofill and password auto-login support",
                "Searchable password vault"
            ],
        },
        {
            name: "SecureChat",
            tech: "Python, Flask, WebSockets",
            description:
                "A real-time encrypted chat application with end-to-end encryption, perfect for secure communication.",
            github: "/project-info",
            demo: "*",
            features: [
                "Real-time messaging with WebSockets",
                "End-to-end encryption for privacy",
                "User authentication and profiles",
                "Message history storage with encryption",
                "Custom chat room creation"
            ],
        },
        {
            name: "FileEncryptor",
            tech: "Python, Cryptography",
            description:
                "A Python-based tool to encrypt and decrypt files with AES encryption, ensuring secure file transfers.",
            github: "/project-info",
            demo: "*",
            features: [
                "AES encryption and decryption",
                "Password-based file protection",
                "Drag-and-drop file interface",
                "File compression during encryption",
                "Real-time progress tracking"
            ],
        },
        {
            name: "BookStore",
            tech: "React, Node.js, Express, MongoDB, MERN",
            description:
                "A full-fledged e-commerce platform to buy and sell books with real-time updates and payment integration.",
            github: "/project-info",
            demo: "*",
            features: [
                "Real-time product updates with WebSocket",
                "User authentication with JWT",
                "Product reviews and ratings",
                "Shopping cart with real-time pricing",
                "Secure payment integration"
            ],
        },
        {
            name: "TaskMaster",
            tech: "React, Node.js, MongoDB, Express, MERN",
            description:
                "A task management system with user authentication, to-do lists, and team collaboration.",
            github: "/project-info",
            demo: "*",
            features: [
                "User authentication with JWT",
                "Task creation and management",
                "Team collaboration and assignments",
                "Task priority and deadlines",
                "Real-time task updates"
            ],
        },
        {
            name: "WeatherApp",
            tech: "React, Node.js, Express, MongoDB, OpenWeather API, MERN",
            description:
                "A weather forecast app that shows real-time weather data based on user's location with detailed insights.",
            github: "https://github.com/leefarhadaman/weatherapp_starter_project",
            demo: "*",
            features: [
                "Real-time weather data fetching",
                "Location-based weather display",
                "Weather forecasts with graphs",
                "Search weather by city or coordinates",
                "Weather alerts and notifications"
            ],
        },
        {
            name: "ExpenseTracker",
            tech: "React, Node.js, Express, MongoDB, MERN",
            description:
                "A personal finance management app that helps track income, expenses, and financial goals.",
            github: "https://github.com/leefarhadaman/expense_tracker",
            demo: "*",
            features: [
                "Track daily expenses and income",
                "Create and monitor financial goals",
                "Category-based expense tracking",
                "Visual expense reports and insights",
                "Recurring expense support"
            ],
        },
        {
            name: "SocialConnect",
            tech: "React, Node.js, Express, MongoDB, Socket.io, MERN",
            description:
                "A social media platform with real-time chat, post creation, and friend management features.",
            github: "/project-info",
            demo: "*",
            features: [
                "Real-time chat with Socket.io",
                "User profiles and friend requests",
                "Post creation and media sharing",
                "Like, comment, and share functionality",
                "Notification system"
            ],
        },
        {
            name: "RealEstatePortal",
            tech: "React, Node.js, Express, MongoDB, MERN",
            description:
                "A platform for browsing and managing real estate listings, including property details and booking options.",
            github: "/project-info",
            demo: "*",
            features: [
                "Property search and filtering",
                "User profiles and property bookings",
                "Admin panel for managing listings",
                "Real-time property updates",
                "Mortgage calculator integration"
            ],
        },
        {
            name: "JobPortal",
            tech: "React, Node.js, Express, MongoDB, MERN",
            description:
                "A job portal for job seekers and employers with job listings, applications, and real-time updates.",
            github: "/project-info",
            demo: "*",
            features: [
                "Job listing and search functionality",
                "Employer profile management",
                "Job application submissions",
                "Real-time notifications for new listings",
                "Resume upload and profile updates"
            ],
        },
    ];

    // Skills Data
    const skills = {
        frontend: [
            { name: "React", icon: <FaReact className="text-teal-500" />, proficiency: 90 },
            { name: "JavaScript", icon: <IoLogoJavascript className="text-yellow-500" />, proficiency: 90 },
            { name: "TypeScript", icon: <SiTypescript className="text-blue-600" />, proficiency: 80 },
            { name: "HTML5/CSS3", icon: <FaHtml5 className="text-orange-500" />, proficiency: 95 },
            { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-500" />, proficiency: 95 },
            { name: "Flutter", icon: <SiFlutter className="text-blue-400" />, proficiency: 85 },
        ],
        backend: [
            { name: "Node.js", icon: <FaNode className="text-green-500" />, proficiency: 85 },
            { name: "Express", icon: <FaServer className="text-gray-500" />, proficiency: 85 },
            { name: "Python", icon: <SiPython className="text-blue-500" />, proficiency: 80 },
            { name: "PHP", icon: <SiPhp className="text-indigo-500" />, proficiency: 75 },
            { name: "Java", icon: <FaJava className="text-red-500" />, proficiency: 70 },
            { name: "GraphQL", icon: <SiGraphql className="text-pink-500" />, proficiency: 75 },
        ],
        database: [
            { name: "MongoDB", icon: <SiMongodb className="text-green-600" />, proficiency: 85 },
            { name: "MySQL", icon: <SiMysql className="text-blue-700" />, proficiency: 80 },
            { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-500" />, proficiency: 80 },
            { name: "Firebase", icon: <SiFirebase className="text-yellow-500" />, proficiency: 90 },
        ],
        tools: [
            { name: "Git", icon: <SiGit className="text-red-500" />, proficiency: 90 },
            { name: "Docker", icon: <SiDocker className="text-blue-500" />, proficiency: 75 },
            { name: "AWS", icon: <FaAws className="text-yellow-600" />, proficiency: 80 },
            { name: "Kubernetes", icon: <SiKubernetes className="text-blue-700" />, proficiency: 70 },
            { name: "Figma", icon: <SiFigma className="text-coral-500" />, proficiency: 85 },
        ],
        languages: [
            { name: "JavaScript", icon: <IoLogoJavascript className="text-yellow-500" />, proficiency: 90 },
            { name: "Python", icon: <SiPython className="text-blue-500" />, proficiency: 80 },
            { name: "Java", icon: <FaJava className="text-red-500" />, proficiency: 70 },
            { name: "C++", icon: <SiCplusplus className="text-blue-600" />, proficiency: 65 },
            { name: "Dart", icon: <SiFlutter className="text-blue-400" />, proficiency: 85 },
        ],
    };

    // Navigation Items
    const navItems = [
        { id: "about", label: "About", icon: <FaBriefcase /> },
        { id: "education", label: "Education", icon: <FaGraduationCap /> },
        { id: "skills", label: "Skills", icon: <FaTools /> },
        { id: "experience", label: "Experience", icon: <FaBuilding /> },
        { id: "projects", label: "Projects", icon: <FaRocket /> },
        { id: "certifications", label: "Certifications", icon: <FaCertificate /> },
        { id: "contact", label: "Contact", icon: <FaEnvelope /> },
        { id: "timepass", label: "Timepass", icon: <FaGamepad /> },
    ];

    const certifications = [
        {
            title: "Java (Basic)",
            issuer: "HackerRank",
            icon: <FaJava className="text-red-500" />,
        },
        {
            title: "Problem Solving (Basic)",
            issuer: "HackerRank",
            icon: <FaCode className="text-teal-500" />,
        },
        {
            title: "JavaScript",
            issuer: "HackerRank",
            icon: <IoLogoJavascript className="text-yellow-500" />,
        },
        {
            title: "SQL",
            issuer: "HackerRank",
            icon: <SiMysql className="text-blue-700" />,
        },
        {
            title: "RPA: Robotic Process Automation Using UiPath",
            issuer: "UiPath",
            icon: <FaTools className="text-indigo-500" />,
        },
        {
            title: "Certified Flutter Developer",
            issuer: "thingQbator",
            icon: <SiFlutter className="text-blue-400" />,
        },
        {
            title: "App with Flutter",
            issuer: "The Net Ninja",
            icon: <SiFlutter className="text-blue-400" />,
        },
        {
            title: "Google Flutter & Dart",
            issuer: "The Digital Adda",
            icon: <SiFlutter className="text-blue-400" />,
        },
        {
            title: "Foundation of Cyber Security",
            issuer: "Coursera",
            icon: <FaShieldAlt className="text-purple-500" />, // Note: FaShieldAlt requires react-icons/fa
        },
        {
            title: "Play it Safe: Manage Security Risk",
            issuer: "Coursera",
            icon: <FaShieldAlt className="text-purple-500" />,
        },
        {
            title: "Connect & Protect: Networks & Network Security",
            issuer: "Coursera",
            icon: <FaNetworkWired className="text-blue-500" />, // Note: FaNetworkWired requires react-icons/fa
        },
        {
            title: "Machine Learning",
            issuer: "NIELIT",
            icon: <FaBrain className="text-pink-500" />, // Note: FaBrain requires react-icons/fa
        },
        {
            title: "Python for Data Science",
            issuer: "NPTEL",
            icon: <SiPython className="text-blue-500" />,
        },
        {
            title: "Data Analytics and Visualization",
            issuer: "Accenture North America",
            icon: <FaChartBar className="text-green-500" />, // Note: FaChartBar requires react-icons/fa
        },
    ];
    // Project Filter Options
    const filterOptions = [
        { value: "all", label: "All" },
        { value: "React", label: "React" },
        { value: "Flutter", label: "Flutter" },
        { value: "Node.js", label: "Node.js" },
        { value: "Python", label: "Python" },
        { value: "MERN", label: "MERN" },
    ];

    // Filter projects
    const filteredProjects = projects.filter((project) => {
        const matchesFilter = projectFilter === "all" || project.tech.includes(projectFilter);
        const matchesSearch =
            searchTerm === "" ||
            project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.tech.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div
            className={`min-h-screen bg-gray-900 dark:bg-gray-900 text-white font-sans w-full transition-colors duration-300`}
        >
            <div className="lg:flex w-full">
                {/* Desktop Sidebar */}
                <motion.aside
                    initial={{ x: -300 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="hidden lg:block fixed top-0 left-0 h-screen w-80 bg-gray-800 bg-opacity-90 backdrop-blur-md p-8 rounded-r-3xl shadow-2xl z-30"
                >
                    <div className="flex items-center justify-between mb-10">
                        <h1 className="text-3xl font-bold text-teal-400">{personalInfo.name}</h1>
                    </div>
                    <nav className="flex flex-col gap-4">
                        {navItems.map((item) => (
                            <motion.button
                                key={item.id}
                                onClick={() => (item.id === "timepass" ? setShowGame(true) : setActiveTab(item.id))}
                                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${activeTab === item.id
                                    ? "bg-teal-500 text-white shadow-lg"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {item.icon}
                                {item.label}
                            </motion.button>
                        ))}
                    </nav>
                    <motion.button
                        onClick={handleDownloadResume}
                        className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-2xl hover:bg-teal-700 transition-all w-full justify-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaDownload /> Download Resume
                    </motion.button>
                    <div className="mt-6 flex gap-4 justify-center">
                        {[
                            { icon: <FaGithub />, link: personalInfo.github },
                            { icon: <FaLinkedin />, link: personalInfo.linkedin },
                            { icon: <FaEnvelope />, link: `mailto:${personalInfo.email}` },
                            { icon: <FaPhone />, link: `tel:${personalInfo.phone}` },
                        ].map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.link}
                                className="p-3 bg-gray-700 rounded-full"
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                </motion.aside>

                {/* Mobile Bottom Navigation */}
                <motion.nav
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-800 bg-opacity-90 backdrop-blur-md p-4 z-50 flex justify-around shadow-2xl rounded-t-2xl"
                >
                    {navItems.map((item) => (
                        <motion.button
                            key={item.id}
                            onClick={() => (item.id === "timepass" ? setShowGame(true) : setActiveTab(item.id))}
                            className={`p-3 rounded-full text-xl ${activeTab === item.id ? "bg-teal-500 text-white" : "text-gray-300"}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {item.icon}
                        </motion.button>
                    ))}
                </motion.nav>

                {/* Main Content */}
                <main className="lg:ml-80 p-6 lg:p-12 flex-1 pb-20 lg:pb-12 w-full">
                    {/* Mobile Header */}
                    <div className="lg:hidden flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-teal-400">{personalInfo.name}</h1>
                    </div>

                    {/* Download Status Alert */}
                    <AnimatePresence>
                        {downloadStatus.message && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full"
                            >
                                <CustomAlert
                                    type={downloadStatus.type}
                                    message={downloadStatus.message}
                                    onClose={() => setDownloadStatus({ type: "", message: "" })}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        {/* About Section */}
                        {activeTab === "about" && (
                            <motion.section
                                key="about"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.5 }}
                                className="py-12"
                            >
                                <div className="lg:grid lg:grid-cols-3 gap-6">
                                    <motion.div
                                        className="lg:col-span-1 bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-3xl p-8 shadow-xl mb-6 lg:mb-0"
                                        whileHover={{ y: -10, rotateX: 5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h2 className="text-2xl font-bold text-teal-400 mb-6">Profile</h2>
                                        <div className="h-32 w-32 mx-auto rounded-full mb-6 flex items-center justify-center bg-teal-500 overflow-hidden">
                                            {!imgError ? (
                                                <img
                                                    src="https://media.licdn.com/dms/image/v2/D5603AQGZzX_iVN4w3Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1732049854829?e=2147483647&v=beta&t=wgPwijGrCj7XT96hrvkpQ21R-V9psd1VOsXEQJ9p3LU"
                                                    alt="Profile"
                                                    className="h-full w-full object-cover"
                                                    onError={() => setImgError(true)}
                                                />
                                            ) : (
                                                <span className="text-4xl font-bold text-white">FA</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-300 mb-3">
                                            <span className="font-medium text-teal-400">Role:</span> {personalInfo.role}
                                        </p>
                                        <p className="text-sm text-gray-300 mb-3">
                                            <span className="font-medium text-teal-400">Location:</span> {personalInfo.location}
                                        </p>
                                        <p className="text-sm text-gray-300 mb-3">
                                            <span className="font-medium text-teal-400">Email:</span>{" "}
                                            <a href={`mailto:${personalInfo.email}`} className="text-indigo-400 hover:underline">
                                                {personalInfo.email}
                                            </a>
                                        </p>
                                        <p className="text-sm text-gray-300 mb-6">
                                            <span className="font-medium text-teal-400">Phone:</span>{" "}
                                            <a href={`tel:${personalInfo.phone}`} className="text-indigo-400 hover:underline">
                                                {personalInfo.phone}
                                            </a>
                                        </p>
                                        <motion.button
                                            onClick={handleDownloadResume}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-2xl hover:bg-teal-700 transition-all w-full justify-center lg:hidden"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <FaDownload /> Download Resume
                                        </motion.button>
                                        <div className="flex gap-4 justify-center mt-6 lg:hidden">
                                            {[
                                                { icon: <FaGithub />, link: personalInfo.github },
                                                { icon: <FaLinkedin />, link: personalInfo.linkedin },
                                                { icon: <FaEnvelope />, link: `mailto:${personalInfo.email}` },
                                                { icon: <FaPhone />, link: `tel:${personalInfo.phone}` },
                                            ].map((social, index) => (
                                                <motion.a
                                                    key={index}
                                                    href={social.link}
                                                    className="p-3 bg-gray-700 rounded-full"
                                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    {social.icon}
                                                </motion.a>
                                            ))}
                                        </div>
                                    </motion.div>
                                    <div className="lg:col-span-2 space-y-6">
                                        <motion.div
                                            className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-3xl p-8 shadow-xl"
                                            whileHover={{ y: -10, rotateX: 5 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <h2 className="text-2xl font-bold text-teal-400 mb-6">About Me</h2>
                                            <p className="text-gray-300 text-sm leading-relaxed mb-6">{personalInfo.bio}</p>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-4 bg-gray-700 rounded-2xl">
                                                    <h3 className="text-lg font-semibold text-white mb-2">Languages</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {["English (Fluent)", "Hindi (Native)", "Assamese (Native)"].map((lang, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs"
                                                            >
                                                                {lang}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="p-4 bg-gray-700 rounded-2xl">
                                                    <h3 className="text-lg font-semibold text-white mb-2">Interests</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {["Open Source", "AI/ML", "Tech Blogs", "Hiking"].map((interest, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs"
                                                            >
                                                                {interest}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-3xl p-8 shadow-xl"
                                            whileHover={{ y: -10, rotateX: 5 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <h2 className="text-2xl font-bold text-teal-400 mb-6">Milestones</h2>
                                            <div className="relative mx-auto max-w-lg">
                                                <div className="absolute left-6 top-0 w-1 h-full bg-gradient-to-b from-teal-500 to-indigo-500" />
                                                {[
                                                    {
                                                        year: 2020,
                                                        event: "Started Freelancing",
                                                        description:
                                                            "Launched my freelance career by building a website for a local business, marking the beginning of my professional journey.",
                                                        icon: <FaCodeBranch className="text-teal-400" />,
                                                        isMajor: false,
                                                    },
                                                    {
                                                        year: 2023,
                                                        event: "Joined Vidcomet",
                                                        description:
                                                            "Secured my first internship as a Flutter Developer at Vidcomet, working on an e-commerce mobile app.",
                                                        icon: <FaLaptopCode className="text-indigo-400" />,
                                                        isMajor: false,
                                                    },
                                                    {
                                                        year: 2024,
                                                        event: "Graduated & Joined Zero9",
                                                        description:
                                                            "Completed BCA from Assam Don Bosco University and joined Zero9 as a Full Stack Developer, leading web projects.",
                                                        icon: <FaUserGraduate className="text-teal-400" />,
                                                        isMajor: true,
                                                    },
                                                ].map((milestone, index) => (
                                                    <motion.div
                                                        key={index}
                                                        className="relative mb-8"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.5, delay: index * 0.3 }}
                                                    >
                                                        <div className="absolute left-4 top-4 w-4 h-4 bg-teal-500 rounded-full border-2 border-gray-800 shadow-lg" />
                                                        <motion.div
                                                            className="ml-12 bg-gray-700 bg-opacity-90 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-teal-500/50 transition-shadow"
                                                            whileHover={{ y: -5, scale: 1.02 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <div className={`text-2xl ${milestone.isMajor ? "text-3xl" : ""}`}>
                                                                    {milestone.icon}
                                                                </div>
                                                                <div>
                                                                    <h3 className="text-lg font-semibold text-white">
                                                                        {milestone.event}
                                                                        {milestone.isMajor && <FaStar className="inline ml-2 text-yellow-400" />}
                                                                    </h3>
                                                                    <p className="text-sm text-teal-400">{milestone.year}</p>
                                                                </div>
                                                            </div>
                                                            <p className="text-gray-300 text-sm">{milestone.description}</p>
                                                        </motion.div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.section>
                        )}

                        {/* Education Section */}
                        {activeTab === "education" && (
                            <motion.section
                                key="education"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.5 }}
                                className="py-12"
                            >
                                <h2 className="text-3xl font-bold text-center mb-8 text-teal-400">Education</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {personalInfo.education.map((edu, index) => (
                                        <motion.div
                                            key={index}
                                            className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-3xl p-6 shadow-xl"
                                            whileHover={{ y: -10, rotateX: 5 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="flex items-center gap-3 mb-3">
                                                {edu.icon}
                                                <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
                                            </div>
                                            <p className="text-gray-300 text-sm mb-2">{edu.institution}</p>
                                            <p className="text-gray-400 text-xs mb-2">Graduation: {edu.graduationYear}</p>
                                            <p className="text-gray-400 text-xs mb-3">GPA: {edu.gpa}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {/* Skills Section */}
                        {activeTab === "skills" && (
                            <motion.section
                                key="skills"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.5 }}
                                className="py-12"
                            >
                                <h2 className="text-3xl font-bold text-center mb-8 text-teal-400">Technical Skills</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[
                                        { title: "Frontend Development", icon: <FaCode />, skills: skills.frontend },
                                        { title: "Backend Development", icon: <FaServer />, skills: skills.backend },
                                        { title: "Database & Storage", icon: <FaDatabase />, skills: skills.database },
                                        { title: "Tools & Platforms", icon: <FaTools />, skills: skills.tools },
                                        { title: "Programming Languages", icon: <FaAccessibleIcon />, skills: skills.languages },
                                    ].map((category, index) => (
                                        <motion.div
                                            key={index}
                                            className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-3xl p-6 shadow-xl"
                                            whileHover={{ y: -10, rotateX: 5 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="flex items-center gap-3 mb-4">
                                                {category.icon}
                                                <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                                            </div>
                                            <div className="space-y-3">
                                                {category.skills.map((skill, skillIndex) => (
                                                    <div key={skillIndex} className="space-y-2">
                                                        <div className="flex items-center gap-3">
                                                            {skill.icon}
                                                            <span className="text-gray-300 text-sm">{skill.name}</span>
                                                        </div>
                                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                                            <motion.div
                                                                className="bg-teal-500 h-2 rounded-full"
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${skill.proficiency}%` }}
                                                                transition={{ duration: 1, delay: skillIndex * 0.2 }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {/* Experience Section */}
                        {activeTab === "experience" && (
                            <motion.section
                                key="experience"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.5 }}
                                className="py-12"
                            >
                                <h2 className="text-3xl font-bold text-center mb-8 text-teal-400">Work Experience</h2>
                                <div className="hidden lg:block relative">
                                    <div className="absolute left-1/2 w-1 bg-teal-500 transform -translate-x-1/2 h-full" />
                                    {experience.map((exp, index) => (
                                        <motion.div
                                            key={index}
                                            className={`flex items-center mb-12 ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
                                            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.2 }}
                                        >
                                            <div className="w-1/2 px-6">
                                                <motion.div
                                                    className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-3xl p-6 shadow-xl"
                                                    whileHover={{ y: -10, rotateX: 5 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <FaBriefcase className="text-teal-500" />
                                                        <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                                                    </div>
                                                    <p className="text-gray-300 text-sm mb-2">
                                                        {exp.company} • {exp.location}
                                                    </p>
                                                    <p className="text-gray-400 text-xs mb-3">{exp.duration}</p>
                                                    <p className="text-gray-300 text-sm mb-4">{exp.description}</p>
                                                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Responsibilities:</h4>
                                                    <ul className="list-disc list-inside text-gray-300 text-sm">
                                                        {exp.responsibilities.map((resp, idx) => (
                                                            <li key={idx}>{resp}</li>
                                                        ))}
                                                    </ul>
                                                    <div className="flex flex-wrap gap-2 mt-4">
                                                        {exp.tech.map((tech, techIndex) => (
                                                            <span
                                                                key={techIndex}
                                                                className="px-3 py-1 bg-teal-500 text-white text-xs rounded-full"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            </div>
                                            <div className="absolute left-1/2 w-4 h-4 bg-teal-500 rounded-full transform -translate-x-1/2" />
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="lg:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4">
                                    {experience.map((exp, index) => (
                                        <motion.div
                                            key={index}
                                            className="snap-center flex-shrink-0 w-80 bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-2xl p-6 shadow-xl"
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.2 }}
                                        >
                                            <div className="flex items-center gap-3 mb-3">
                                                <FaBriefcase className="text-teal-500 text-xl" />
                                                <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                                            </div>
                                            <p className="text-gray-300 text-sm mb-2">
                                                {exp.company} • {exp.location}
                                            </p>
                                            <p className="text-gray-400 text-xs mb-3">{exp.duration}</p>
                                            <p className="text-gray-300 text-sm mb-4">{exp.description}</p>
                                            <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Responsibilities:</h4>
                                            <ul className="list-disc list-inside text-gray-300 text-sm">
                                                {exp.responsibilities.map((resp, idx) => (
                                                    <li key={idx}>{resp}</li>
                                                ))}
                                            </ul>
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {exp.tech.map((tech, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className="px-3 py-1 bg-teal-500 text-white text-xs rounded-full"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {/* Projects Section */}
                        {activeTab === "projects" && (
                            <motion.section
                                key="projects"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.5 }}
                                className="py-12"
                            >
                                <h2 className="text-3xl font-bold text-center mb-8 text-teal-400">Featured Projects</h2>
                                <div className="flex flex-col items-center mb-6">
                                    <div className="relative w-full max-w-md mb-4">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaSearch className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            className="pl-10 pr-4 py-2 w-full bg-gray-700 rounded-2xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                            placeholder="Search projects..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-4 justify-center">
                                        {filterOptions.map((filter) => (
                                            <motion.button
                                                key={filter.value}
                                                onClick={() => setProjectFilter(filter.value)}
                                                className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all ${projectFilter === filter.value
                                                    ? "bg-teal-500 text-white"
                                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                                    }`}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {filter.label}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredProjects.map((project, index) => (
                                        <motion.div
                                            key={index}
                                            className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-3xl p-6 shadow-xl cursor-pointer"
                                            whileHover={{ y: -10, rotateX: 5 }}
                                            transition={{ duration: 0.3 }}
                                            onClick={() => setSelectedProject(project)}
                                        >
                                            <h3 className="text-lg font-semibold text-white mb-3">{project.name}</h3>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.tech.split(", ").map((tech, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className="px-3 py-1 bg-teal-500 text-white text-xs rounded-full"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="text-gray-300 text-sm">{project.description}</p>
                                        </motion.div>
                                    ))}
                                </div>
                                {filteredProjects.length === 0 && (
                                    <div className="text-center py-12">
                                        <FaSearch className="mx-auto text-4xl text-gray-400 mb-4" />
                                        <h3 className="text-xl font-semibold text-gray-300">No projects found</h3>
                                        <p className="text-gray-400">Try adjusting your search or filter.</p>
                                    </div>
                                )}
                            </motion.section>
                        )}

                        {/* Certifications Section */}
                        {activeTab === "certifications" && (
                            <motion.section
                                key="certifications"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.5 }}
                                className="py-12"
                            >
                                <h2 className="text-3xl font-bold text-center mb-8 text-teal-400">Certifications</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {certifications.map((cert, index) => (
                                        <motion.div
                                            key={index}
                                            className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-3xl p-6 shadow-xl"
                                            whileHover={{ y: -10, rotateX: 5 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="flex items-center gap-3 mb-3">
                                                {cert.icon}
                                                <h3 className="text-lg font-semibold text-white">{cert.title}</h3>
                                            </div>
                                            <p className="text-gray-300 text-sm mb-2">{cert.issuer}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>
                        )}


                        {/* Contact Section */}
                        {activeTab === "contact" && (
                            <motion.section
                                key="contact"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.5 }}
                                className="py-12"
                            >
                                <h2 className="text-3xl font-bold text-center mb-8 text-teal-400">Get In Touch</h2>
                                <div className="lg:grid lg:grid-cols-2 gap-6">
                                    <motion.div
                                        className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-3xl p-8 shadow-xl mb-6 lg:mb-0"
                                        whileHover={{ y: -10, rotateX: 5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h3 className="text-xl font-bold text-white mb-6">Contact Form</h3>
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-300">Name</label>
                                                <motion.input
                                                    type="text"
                                                    name="name"
                                                    placeholder="John Doe"
                                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-2xl text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                                                    required
                                                    whileFocus={{ scale: 1.02 }}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-300">Email</label>
                                                <motion.input
                                                    type="email"
                                                    name="email"
                                                    placeholder="john@example.com"
                                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-2xl text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                                                    required
                                                    whileFocus={{ scale: 1.02 }}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-300">Subject</label>
                                                <motion.input
                                                    type="text"
                                                    name="subject"
                                                    placeholder="Project Inquiry"
                                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-2xl text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                                                    required
                                                    whileFocus={{ scale: 1.02 }}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-300">Message</label>
                                                <motion.textarea
                                                    name="message"
                                                    placeholder="Your message here..."
                                                    rows="4"
                                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-2xl text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm resize-none"
                                                    required
                                                    whileFocus={{ scale: 1.02 }}
                                                />
                                            </div>
                                            <motion.button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full py-3 bg-teal-600 text-white rounded-2xl hover:bg-teal-700 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 shadow-lg"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <FaSpinner className="animate-spin" />
                                                        <span>Sending...</span>
                                                    </>
                                                ) : (
                                                    <span>Send Message</span>
                                                )}
                                            </motion.button>
                                        </form>
                                        <AnimatePresence>
                                            {formStatus.message && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="mt-6"
                                                >
                                                    <CustomAlert
                                                        type={formStatus.type}
                                                        message={formStatus.message}
                                                        onClose={() => setFormStatus({ type: "", message: "" })}
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                    <motion.div
                                        className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-3xl p-8 shadow-xl"
                                        whileHover={{ y: -10, rotateX: 5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
                                        <div className="space-y-4">
                                            {[
                                                { icon: <FaEnvelope />, title: "Email", value: personalInfo.email, link: `mailto:${personalInfo.email}` },
                                                { icon: <FaPhone />, title: "Phone", value: personalInfo.phone, link: `tel:${personalInfo.phone}` },
                                                { icon: <FaBuilding />, title: "Location", value: personalInfo.location },
                                                { icon: <FaLinkedin />, title: "LinkedIn", value: "linkedin.com/in/farhad-ali", link: personalInfo.linkedin },
                                                { icon: <FaGithub />, title: "GitHub", value: "github.com/leefarhadaman", link: personalInfo.github },
                                            ].map((info, index) => (
                                                <div key={index} className="flex items-start space-x-4">
                                                    <div className="bg-teal-500 p-3 rounded-xl text-white">{info.icon}</div>
                                                    <div>
                                                        <h4 className="font-medium text-gray-300">{info.title}</h4>
                                                        {info.link ? (
                                                            <a href={info.link} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">
                                                                {info.value}
                                                            </a>
                                                        ) : (
                                                            <p className="text-gray-300">{info.value}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-6">
                                            <h4 className="text-lg font-semibold text-white mb-4">Availability</h4>
                                            <div className="space-y-2">
                                                {[
                                                    "Available for Freelance Projects",
                                                    "Open to Full-time Opportunities",
                                                    "Remote or On-site"
                                                ].map((item, index) => (
                                                    <div key={index} className="flex items-center space-x-2">
                                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                        <p className="text-gray-300 text-sm">{item}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.section>
                        )}
                    </AnimatePresence>

                    {/* Project Modal */}
                    <AnimatePresence>
                        {selectedProject && (
                            <ProjectModal
                                project={selectedProject}
                                onClose={() => setSelectedProject(null)}
                                theme={theme}
                            />
                        )}
                    </AnimatePresence>

                    {/* Game Modal */}
                    <AnimatePresence>
                        {showGame && <MemoryGame onClose={() => setShowGame(false)} theme={theme} />}
                    </AnimatePresence>
                </main>

                {/* Floating Resume Button (Desktop) */}
                <motion.a
                    href={personalInfo.resume}
                    download
                    className="hidden lg:block fixed bottom-20 right-8 p-4 bg-teal-600 text-white rounded-full shadow-lg z-40"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FaDownload size={20} />
                </motion.a>
            </div>
        </div>
    );
};

export default Portfolio;