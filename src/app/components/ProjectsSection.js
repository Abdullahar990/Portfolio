import React, { useState, useCallback, memo } from 'react';
import { Github, Star, Calendar, Cpu, Code, Database, Globe } from 'lucide-react';
import Image from 'next/image';

const ProjectCard = memo(({ project, index, hoveredProject, setHoveredProject }) => {
    const getCategoryIcon = useCallback((category) => {
        switch (category) {
            case 'AI/ML':
                return <Cpu className="w-4 h-4" />;
            case 'Computer Vision':
                return <Code className="w-4 h-4" />;
            case 'Full Stack':
                return <Database className="w-4 h-4" />;
            case 'Web Development':
                return <Globe className="w-4 h-4" />;
            default:
                return <Code className="w-4 h-4" />;
        }
    }, []);

    return (
        <div className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02] max-w-4xl lg:max-w-6xl mx-auto" onMouseEnter={() => setHoveredProject(index)} onMouseLeave={() => setHoveredProject(null)}>
            {/* Card Container */}
            <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group-hover:border-purple-500/30 transition-all duration-500">

                {/* Featured Badge */}
                {project.featured && (
                    <div className="absolute top-4 left-4 z-20">
                        <div className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-white/20">
                            <Star className="w-3 h-3" />
                            <span>Featured</span>
                        </div>
                    </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 right-4 z-20">
                    <div className="flex items-center space-x-1 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs text-gray-300 border border-white/10">
                        {getCategoryIcon(project.category)}
                        <span>{project.category}</span>
                    </div>
                </div>

                {/* Content Layout */}
                <div className="flex flex-col lg:flex-row">
                    {/* Image Section */}
                    <div className="relative w-full lg:w-1/2 h-80 lg:h-96 overflow-hidden">
                        <Image
                            src={project.image}
                            alt={`${project.title} - ${project.category} project`}
                            width={800}
                            height={600}
                            className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
                            quality={60}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,..."
                            priority={index < 2}
                            loading={index < 2 ? undefined : "lazy"}
                        />




                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900/90"></div>

                        {/* Hover Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-purple-900/80 transition-opacity duration-500 ${hoveredProject === index ? 'opacity-100' : 'opacity-0'
                            }`}></div>

                        {/* Project Stats */}
                        <div className="absolute bottom-4 left-4 flex items-center space-x-4 text-white/80 text-sm">
                            <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4" />
                                <span>{project.stats.stars}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{project.stats.commits}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 lg:w-1/2 flex flex-col justify-between">
                        <div className="flex-grow">
                            <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors duration-300">
                                {project.title}
                            </h3>

                            <p className="text-gray-400 mb-6 leading-relaxed text-base lg:text-lg">
                                {project.description}
                            </p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 rounded-lg text-sm font-medium border border-purple-500/20 backdrop-blur-sm"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex justify-center">
                            <a
                                href={project.github}
                                className="flex items-center justify-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-base font-medium shadow-lg hover:shadow-purple-500/25 group/btn"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <Github className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                                <span>View Code</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

ProjectCard.displayName = 'ProjectCard';

const ProjectsSection = () => {
    const [hoveredProject, setHoveredProject] = useState(null);

    const projects = [
        {
            title: 'Disease Prediction App',
            description: 'A web application that predicts diseases based on user symptoms using KNN algorithm. Built with Python Flask, NumPy, and Pandas.',
            tech: ['Python', 'Flask', 'NumPy', 'Pandas', 'KNN'],
            image: '/DPA.jpg',
            github: 'https://github.com/Abdullahar990/Disease-Prediction-App',
            featured: true,
            category: 'AI/ML',
            stats: { stars: 24, commits: 156 }
        },
        {
            title: 'Traffic Detection System',
            description: 'An intelligent traffic monitoring system using YOLOv11 for real-time vehicle detection. Built with Python Flask, NumPy, and Pandas.',
            tech: ['Python', 'Flask', 'YOLOv11', 'NumPy', 'Pandas'],
            image: '/Traffic.jpg',
            github: 'https://github.com/Abdullahar990/vehicle_counter_app/tree/main/Desktop/vehicle_counter_app',
            featured: true,
            category: 'Computer Vision',
            stats: { stars: 31, commits: 203 }
        },
        {
            title: 'Check INN, Chill Out',
            description: 'A hotel management website that handles reservations, room listings, and admin panel. Built using Next.js, MongoDB, Node.js, and Bootstrap.',
            tech: ['Next.js', 'MongoDB', 'Node.js', 'Bootstrap'],
            image: '/Hotel.jpg',
            github: '#',
            featured: true,
            category: 'Full Stack',
            stats: { stars: 18, commits: 89 }
        },
        {
            title: 'Spare Parts Management System',
            description: 'A spare parts inventory and request system built with HTML, CSS, JavaScript, PHP, and Bootstrap for streamlined warehouse operations.',
            tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Bootstrap'],
            image: '/Spare.jpg',
            github: 'https://github.com/Abdullahar990/Spare-Parts-Management-System',
            featured: false,
            category: 'Web Development',
            stats: { stars: 12, commits: 67 }
        }
    ];

    return (
        <section id="projects" className="relative z-10 py-20 px-6 mt-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Featured Projects
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6 rounded-full"></div>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Showcasing innovative solutions that blend cutting-edge technology with user-centric design
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="space-y-8">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={index}
                            hoveredProject={hoveredProject}
                            setHoveredProject={setHoveredProject}
                        />
                    ))}
                </div>

                {/* View All Projects Button */}
                <div className="text-center mt-16">
                    <a
                        href="https://github.com/Abdullahar990"
                        className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-full hover:from-purple-600/30 hover:to-pink-600/30 transform hover:scale-105 transition-all duration-300 border border-purple-500/30 hover:border-purple-400/50 text-lg font-semibold"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <span>View All Projects</span>
                        <Github className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;