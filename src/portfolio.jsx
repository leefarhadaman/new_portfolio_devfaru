import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaCheckCircle, FaExclamationCircle, FaSpinner, FaPhone, FaReact, FaNode, FaDatabase, FaMobile, FaTools, FaServer, FaRocket, FaAws, FaHtml5, FaCalendar, FaBuilding, FaBriefcase, FaJava } from "react-icons/fa";
import { SiFlutter, SiFirebase, SiMongodb, SiPostgresql, SiPython, SiPhp, SiGit, SiFigma, SiTailwindcss, SiNetlify, SiTypescript,SiMysql,SiCplusplus} from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";

const CustomAlert = ({ type, message, onClose }) => {
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    const Icon = type === 'success' ? FaCheckCircle : FaExclamationCircle;

    return (
        <div className={`${bgColor} text-white p-4 rounded-lg shadow-lg flex items-center justify-between animate-fade-in`}>
            <div className="flex items-center space-x-2">
                <Icon className="h-5 w-5" />
                <p>{message}</p>
            </div>
            <button
                onClick={onClose}
                className="ml-4 hover:opacity-80 transition-opacity"
            >
                ×
            </button>
        </div>
    );
};

const Portfolio = () => {
    const [activeTab, setActiveTab] = useState('skills');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState({ type: '', message: '' });




    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setFormStatus({ type: '', message: '' });

        try {
            const formData = new FormData(event.target);

            // Access key stored in environment variable or secure configuration
            const ACCESS_KEY = process.env.REACT_APP_FORM_ACCESS_KEY;   

            const payload = {
                access_key: ACCESS_KEY,
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message'),
            };

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.success) {
                setFormStatus({
                    type: 'success',
                    message: 'Thank you for your message! I will get back to you soon.'
                });
                event.target.reset();
            } else {
                throw new Error('Something went wrong!');
            }
        } catch (error) {
            setFormStatus({
                type: 'error',
                message: 'Oops! Something went wrong. Please try again later.'
            });
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setFormStatus({ type: '', message: '' }), 5000);
        }
    };

    const personalInfo = {
        name: "Farhad Ali",
        role: "Software Developer",
        location: "Barijani Pacharia Guwahati, Assam, India 781104",
        email: "farhadali.60613@gmail.com",
        phone: "+91 8638960613",
        github: "https://github.com/leefarhadaman",
        linkedin: "https://www.linkedin.com/in/farhad-ali-8bb801201/",
    };

    const experience = [
        {
            title: "Full Stack Developer",
            company: "Zero9 Communication Pvt Ltd",
            duration: "June 2024 – Present",
            description: "Designed, developed, deployed, and maintained full-stack applications across frontend and backend for various projects.",
        },
        {
            title: "Flutter Developer (Part-Time/Intern)",
            company: "Rhinoceros Technologies Pvt Ltd",
            duration: "2023 Dec – 2024 Apr",
            description: "Created and implemented the entire UI of the product using Flutter, adhering to project requirements.",
        },
        {
            title: "Flutter Developer Intern",
            company: "Vidcomet Ecommerce Pvt Ltd",
            duration: "2023 Sep-Dec",
            description: "Developed an eCommerce application with features like product purchasing, payment gateway integration, and Firebase authentication.",
        },
        
        {
            title: "Freelancer",
            company: "Self-employed",
            duration: "2020 – Present",
            description: "Worked on diverse projects, offering end-to-end solutions in web, mobile, and backend development.",
        },
    ];

    const projects = [
        { name: "DineSmart", tech: "Flutter, Firebase", description: "A food ordering app with real-time data storage and user authentication." },
        { name: "EventSync", tech: "ReactJS, Node.js", description: "A real-time event scheduling and management platform with live notifications and attendee management." },
        { name: "TaskFlow", tech: "ReactJS, Firebase", description: "A task management system with real-time task updates and drag-and-drop functionality." },
        { name: "SpotOn", tech: "Python, TensorFlow", description: "A skin cancer detection app with machine learning, high accuracy in detection using image analysis." },
        { name: "ECommerce App", tech: "MERN Stack", description: "A complete eCommerce platform with user authentication, product management, and payment gateway integration." },
        { name: "ChatApp", tech: "MERN Stack, WebSocket", description: "A real-time chat application with message notifications and group chat functionalities." },
        { name: "Blog Platform", tech: "React, Node.js, MongoDB", description: "A blogging platform where users can create, edit, and comment on blog posts." },
        { name: "TravelMate", tech: "Flutter, Firebase", description: "A travel app for discovering and booking places to visit with real-time location tracking." },
        { name: "Task Manager App", tech: "ReactNative, Firebase", description: "A task manager app for tracking personal tasks with notifications and deadlines." },
        { name: "Portfolio Website", tech: "React, Tailwind CSS", description: "A personal portfolio website to showcase projects, skills, and certifications." },
    ];

    const skillCategories = [
        {
            title: "Frontend Development",
            icon: <FaReact className="w-8 h-8 text-blue-400" />,
            skills: [
                { name: "React.js", icon: <FaReact className="text-blue-400" /> },
                { name: "Flutter", icon: <SiFlutter className="text-blue-400" /> },
                { name: "HTML5/CSS3", icon: <FaHtml5 className="text-blue-400" /> },
                { name: "JavaScript", icon: <IoLogoJavascript className="text-blue-400" /> },
                { name: "TypeScript", icon: <SiTypescript className="text-blue-400" /> }
            ]
        },
        {
            title: "Backend Development",
            icon: <FaServer className="w-8 h-8 text-purple-400" />,
            skills: [
                { name: "Node.js", icon: <FaNode className="text-green-400" /> },
                { name: "Express.js", icon: <FaNode className="text-green-400" /> },
                { name: "Python", icon: <SiPython className="text-yellow-400" /> },
                { name: "PHP", icon: <SiPhp className="text-purple-400" /> }
            ]
        },
        {
            title: "Database Management",
            icon: <FaDatabase className="w-8 h-8 text-orange-400" />,
            skills: [
                { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
                { name: "MySQL", icon: <SiMysql className="text-yellow-500" /> },
                { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-500" /> },
                { name: "Firebase", icon: <SiFirebase className="text-yellow-500" /> }
                
            ]
        },
        {
            title: "Mobile Development",
            icon: <FaMobile className="w-8 h-8 text-green-400" />,
            skills: [
                { name: "Flutter", icon: <SiFlutter className="text-blue-400" /> },
                { name: "React Native", icon: <FaReact className="text-blue-400" /> }
            ]
        },
        {
            title: "Version Control & Tools",
            icon: <FaTools className="w-8 h-8 text-yellow-400" />,
            skills: [
                { name: "Git", icon: <SiGit className="text-orange-500" /> },
                { name: "Figma", icon: <SiFigma className="text-purple-400" /> },
                { name: "Tailwind CSS", icon: <SiTailwindcss className="text-blue-400" /> }
            ]
        },
        {
            title: "Deployment & Hosting",
            icon: <FaRocket className="w-8 h-8 text-red-400" />,
            skills: [
                { name: "Firebase", icon: <SiFirebase className="text-yellow-500" /> },
                { name: "AWS", icon: <FaAws className="text-orange-400" /> },
                { name: "Netlify", icon: <SiNetlify className="text-blue-400" /> }
            ]
        },
        {
            title: "Programming Languages",
            icon: <FaCode className="w-8 h-8 text-indigo-400" />,
            skills: [
                { name: "JavaScript", icon: <IoLogoJavascript className="text-yellow-400" /> },
                { name: "Python", icon: <SiPython className="text-yellow-400" /> },
                { name: "Java", icon: <FaJava className="text-red-400" /> },
                { name: "C++", icon: <SiCplusplus className="text-blue-500" /> },
                { name: "C", icon: <SiCplusplus className="text-blue-500" /> },
            ]
        }
    ];

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        formData.append("access_key", "71b56bed-78db-4d22-95e7-a60595d14373");

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        }).then((res) => res.json());

        if (res.success) {
            console.log("Success", res);
        }
    };


    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
            {/* Navbar */}
            <nav className="fixed w-full bg-gray-900 bg-opacity-90 backdrop-blur-sm z-50 px-6 py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        {personalInfo.name}
                    </h1>
                    <div className="flex gap-6">
                        {['skills', 'experience', 'projects', 'contact'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`capitalize px-4 py-2 rounded-lg transition-all ${activeTab === tab ? 'bg-blue-500 text-white' : 'hover:bg-gray-800'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Enhanced Hero Section */}
            <header className="pt-32 pb-20 px-6 bg-gradient-to-b from-blue-600/20 to-purple-600/20">
                <div className="container mx-auto flex flex-col items-center">
                    {/* Profile Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            {personalInfo.name}
                        </h1>
                        <p className="text-2xl text-gray-300 mb-2">{personalInfo.role}</p>
                        <p className="text-gray-400">{personalInfo.location}</p>
                    </div>

                    {/* New Two-Column Layout for Intro */}
                    <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center mb-12">
                        {/* Left Column: Introduction */}
                        <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-lg">
                            <p className="text-lg text-gray-300 leading-relaxed">
                                Passionate Software Developer specializing in full-stack and mobile development. 
                                Building scalable applications with React, Flutter, and Node.js. 
                                Let's create something amazing together!
                            </p>
                        </div>

                        {/* Right Column: Quick Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 text-center">
                                <span className="text-3xl font-bold text-blue-400">2+</span>
                                <p className="text-gray-300 text-sm">Years Experience</p>
                            </div>
                            <div className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 text-center">
                                <span className="text-3xl font-bold text-purple-400">20+</span>
                                <p className="text-gray-300 text-sm">Projects</p>
                            </div>
                            <div className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 text-center">
                                <span className="text-3xl font-bold text-green-400">10+</span>
                                <p className="text-gray-300 text-sm">Technologies</p>
                            </div>
                            <div className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 text-center">
                                <span className="text-3xl font-bold text-yellow-400">3+</span>
                                <p className="text-gray-300 text-sm">Companies</p>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-6">
                        <a href={personalInfo.github} 
                           className="p-3 bg-gray-800/30 rounded-full transform hover:scale-110 transition-all hover:bg-gray-700/50">
                            <FaGithub size={24} className="text-gray-300 hover:text-blue-400" />
                        </a>
                        <a href={personalInfo.linkedin} 
                           className="p-3 bg-gray-800/30 rounded-full transform hover:scale-110 transition-all hover:bg-gray-700/50">
                            <FaLinkedin size={24} className="text-gray-300 hover:text-blue-400" />
                        </a>
                        <a href={`mailto:${personalInfo.email}`} 
                           className="p-3 bg-gray-800/30 rounded-full transform hover:scale-110 transition-all hover:bg-gray-700/50">
                            <FaEnvelope size={24} className="text-gray-300 hover:text-blue-400" />
                        </a>
                        <a href={`tel:${personalInfo.phone}`} 
                           className="p-3 bg-gray-800/30 rounded-full transform hover:scale-110 transition-all hover:bg-gray-700/50">
                            <FaPhone size={24} className="text-gray-300 hover:text-blue-400" />
                        </a>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-16">
                {/* Skills Section */}
                <section className={`transition-all duration-500 ${activeTab === 'skills' ? 'block' : 'hidden'}`}>
                    <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Technical Skills
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {skillCategories.map((category, index) => (
                            <div key={index} className="bg-gray-800 rounded-xl p-6 transform hover:-translate-y-2 transition-all duration-300 hover:bg-gray-700">
                                <div className="flex items-center gap-4 mb-6">
                                    {category.icon}
                                    <h3 className="text-xl font-bold text-blue-400">{category.title}</h3>
                                </div>
                                <div className="space-y-4">
                                    {category.skills.map((skill, skillIndex) => (
                                        <div key={skillIndex} className="flex items-center gap-3 bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-colors">
                                            {skill.icon}
                                            <span className="text-gray-300">{skill.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Experience Section with Enhanced UI */}
                <section className={`transition-all duration-500 ${activeTab === 'experience' ? 'block' : 'hidden'}`}>
                    <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Work Experience
                    </h2>
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-0 md:left-1/2 h-full w-1 bg-gradient-to-b from-blue-400 to-purple-500 transform -translate-x-1/2"></div>

                        <div className="space-y-12">
                            {experience.map((exp, index) => (
                                <div key={index} className={`flex flex-col md:flex-row gap-8 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    {/* Timeline Dot */}
                                    <div className="absolute left-0 md:left-1/2 w-6 h-6 bg-blue-400 rounded-full transform -translate-x-1/2 border-4 border-gray-900"></div>

                                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                                        <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-blue-500/20">
                                            <div className="flex items-center gap-3 mb-4">
                                                <FaBriefcase className="text-blue-400 text-2xl" />
                                                <h3 className="text-2xl font-bold text-blue-400">{exp.title}</h3>
                                            </div>
                                            <div className="flex items-center gap-3 mb-3">
                                                <FaBuilding className="text-purple-400" />
                                                <p className="text-xl text-gray-300">{exp.company}</p>
                                            </div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <FaCalendar className="text-green-400" />
                                                <p className="text-gray-400">{exp.duration}</p>
                                            </div>
                                            <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Projects Section - Simplified and more responsive */}
                <section className={`transition-all duration-500 ${activeTab === 'projects' ? 'block' : 'hidden'}`}>
                    <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Featured Projects
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/20"
                            >
                                <h3 className="text-xl font-bold text-blue-400 mb-3">{project.name}</h3>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tech.split(', ').map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="px-3 py-1 bg-gray-700 rounded-full text-xs text-purple-400"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-gray-300 leading-relaxed">{project.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section className={`transition-all duration-500 ${activeTab === 'contact' ? 'block' : 'hidden'}`}>
                    <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Get In Touch
                    </h2>

                    <div className="max-w-3xl mx-auto">
                        <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="John Doe"
                                            className="w-full p-3 bg-gray-700/50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="john@example.com"
                                            className="w-full p-3 bg-gray-700/50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="+91 98765 43210"
                                        className="w-full p-3 bg-gray-700/50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Message</label>
                                    <textarea
                                        name="message"
                                        placeholder="Your message here..."
                                        rows="5"
                                        className="w-full p-3 bg-gray-700/50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <FaSpinner className="animate-spin" />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <span>Send Message</span>
                                    )}
                                </button>
                            </form>
                        </div>

                        {formStatus.message && (
                            <div className="mt-6">
                                <CustomAlert
                                    type={formStatus.type}
                                    message={formStatus.message}
                                    onClose={() => setFormStatus({ type: '', message: '' })}
                                />
                            </div>
                        )}
                    </div>
                </section>
                {/* Toast Notification Container */}
                {/* <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar /> */}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 py-8 text-center">
                <p className="text-gray-400">&copy; 2024 {personalInfo.name}. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Portfolio;