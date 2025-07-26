import React from 'react';
import { FaCode, FaServer, FaDatabase, FaPalette, FaPython } from 'react-icons/fa';
import { SiNextdotjs, SiTensorflow, SiKeras, SiCplusplus, SiOpencv } from 'react-icons/si';

const SkillsSection = ({ isLoaded }) => {
    const skills = [
        { name: 'Python', level: 92, icon: <FaPython className="w-5 h-5 text-white" />, color: 'from-yellow-400 to-amber-500' },
        { name: 'TensorFlow', level: 87, icon: <SiTensorflow className="w-5 h-5 text-white" />, color: 'from-orange-500 to-yellow-400' },
        { name: 'Keras', level: 83, icon: <SiKeras className="w-5 h-5 text-white" />, color: 'from-red-500 to-rose-400' },
        { name: 'C++', level: 90, icon: <SiCplusplus className="w-5 h-5 text-white" />, color: 'from-blue-600 to-indigo-400' },
        { name: 'OpenCV', level: 84, icon: <SiOpencv className="w-5 h-5 text-white" />, color: 'from-indigo-500 to-purple-400' },
        { name: 'React.js', level: 90, icon: <FaCode className="w-5 h-5 text-white" />, color: 'from-blue-500 to-cyan-400' },
        { name: 'Next.js', level: 90, icon: <SiNextdotjs className="w-5 h-5 text-white" />, color: 'from-gray-700 to-zinc-500' },
        { name: 'Node.js', level: 88, icon: <FaServer className="w-5 h-5 text-white" />, color: 'from-green-500 to-lime-400' },
        { name: 'MongoDB', level: 85, icon: <FaDatabase className="w-5 h-5 text-white" />, color: 'from-green-600 to-emerald-400' },
        { name: 'UI/UX Design', level: 80, icon: <FaPalette className="w-5 h-5 text-white" />, color: 'from-pink-500 to-fuchsia-400' }
    ];

    return (
        <section id="skills" className="relative z-10 py-20 px-6 mt-16">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Skills & Expertise
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {skills.map((skill, index) => (
                        <div
                            key={skill.name}
                            className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                            style={{
                                animationDelay: `${index * 0.1}s`,
                                animation: isLoaded ? 'fadeInUp 0.6s ease-out forwards' : 'none'
                            }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className={`p-2 rounded-lg bg-gradient-to-r ${skill.color}`}>
                                        {skill.icon}
                                    </div>
                                    <span className="text-xl font-semibold">{skill.name}</span>
                                </div>
                                <span className="text-gray-400">{skill.level}%</span>
                            </div>

                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                                    style={{ width: isLoaded ? `${skill.level}%` : '0%' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;