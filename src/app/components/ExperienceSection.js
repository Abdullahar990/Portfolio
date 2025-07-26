import React from 'react';
import { Calendar, MapPin, Building, ChevronRight } from 'lucide-react';

const ExperienceSection = () => {
    const experiences = [
        {
            title: "Python Developer",
            company: "Datics AI",
            location: "Lahore, Punjab, Pakistan",
            duration: "July 2024 - October 2024",
            type: "Internship",
            description: "Worked on internal tools and automation scripts using Python. Gained hands-on experience with data processing, GUI development, and basic scripting for real-world tasks in an AI-focused environment.",
            achievements: [
                "Built desktop applications using Tkinter for data input and visualization",
                "Wrote automation scripts for handling and cleaning large CSV datasets",
                "Assisted in developing basic data analysis pipelines using Pandas and NumPy",
                "Collaborated with senior developers to learn industry-standard Python practices"
            ],
            technologies: [
                "Python", "NumPy", "Pandas", "Tkinter", "Matplotlib", "Jupyter Notebook"
            ]
        },
        {
            title: "Computer Vision and Deep Learning Engineer",
            company: "ML-Bench",
            location: "Lahore, Punjab, Pakistan",
            duration: "Jun 2025 - present",
            type: "Internship",
            description: "Working on cutting-edge computer vision projects involving image classification, object detection, and medical image analysis. Leveraged deep learning frameworks to develop, train, and optimize neural networks for real-world applications.",
            achievements: [
                "Developed an image-based disease classification system using CNNs with TensorFlow and Keras",
                "Implemented real-time object detection using YOLOv8 and OpenCV for surveillance applications",
                "Improved model accuracy by 12% through hyperparameter tuning and data augmentation techniques",
                "Created interactive GUI applications using Tkinter for visualizing model predictions"
            ],
            technologies: [
                "Python", "TensorFlow", "Keras", "OpenCV", "NumPy", "Pandas", "Matplotlib", "Tkinter"
            ]
        },
        {
            title: 'Front-End Intern',
            company: 'Code Alpha',
            location: 'Remote',
            duration: 'May 2024 - June 2024',
            type: 'Internship',
            description: 'Developed responsive web applications using modern JavaScript frameworks. Collaborated with cross-functional teams to deliver high-quality digital solutions for various clients.',
            achievements: [
                'Built 5+ full-stack web applications using Next.js and MongoDB',
                'Improved application performance by implementing code splitting and lazy loading',
                'Integrated third-party APIs and payment gateways',
                'Mentored junior developers on React best practices'
            ],
            technologies: ['HTML', 'CSS', 'JavaScript', 'REACT']
        }
    ];

    return (
        <section id="experience" className="relative z-10 py-20 px-6 mt-16">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Professional Experience
                </h2>

                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-500 to-pink-500"></div>

                    {experiences.map((experience, index) => (
                        <div
                            key={index}
                            className="relative mb-12 md:pl-12"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-slate-900 z-10"></div>

                            {/* Experience Card */}
                            <div className="ml-12 md:ml-24 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 group text-left">
                                {/* Header */}
                                <div className="mb-4">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                            experience.type === 'Full-time'
                                                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                                : experience.type === 'Contract'
                                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                                : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                                            }`}>
                                            {experience.type}
                                        </span>
                                        <div className="flex items-center text-gray-400 text-sm">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            {experience.duration}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                        {experience.title}
                                    </h3>

                                    <div className="flex items-center text-purple-400 mb-2">
                                        <Building className="w-4 h-4 mr-2" />
                                        <span className="font-semibold">{experience.company}</span>
                                    </div>

                                    <div className="flex items-center text-gray-400 text-sm">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {experience.location}
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-300 mb-4 leading-relaxed">
                                    {experience.description}
                                </p>

                                {/* Achievements */}
                                <div className="mb-4">
                                    <h4 className="text-white font-semibold mb-3">Key Achievements:</h4>
                                    <ul className="space-y-2">
                                        {experience.achievements.map((achievement, i) => (
                                            <li key={i} className="flex items-start text-gray-300">
                                                <ChevronRight className="w-4 h-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="text-sm">{achievement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Technologies */}
                                <div>
                                    <h4 className="text-white font-semibold mb-3">Technologies Used:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {experience.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 rounded-lg text-sm font-medium border border-purple-500/20 backdrop-blur-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
