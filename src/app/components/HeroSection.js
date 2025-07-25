'use client';

import React, { memo } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import useHasMounted from '../hooks/useHasMounted';

const HeroSection = memo(() => {
    const hasMounted = useHasMounted();

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center z-10 pt-20">
            <div className={`text-center max-w-4xl mx-auto px-6 transition-all duration-700 transform ${
                hasMounted ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
            }`}>
                <div className="mb-8">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
                        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                            <Image
                                src="/profile_pic.jpeg"
                                alt="Muhammad Abdullah - AI/ML Engineer"
                                width={120}
                                height={120}
                                className="rounded-full object-cover"
                                priority
                                quality={85}
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyBhWVl3XTauumBrEziWEjyO2lQf//Z"
                            />
                        </div>
                    </div>
                </div>

                <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                    Muhammad Abdullah
                </h1>

                <div className="text-2xl md:text-3xl mb-8 text-gray-300">
                    Computer Vision Specialist | Next.js Expert | AI/ML Engineer
                </div>

                <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Passionate about creating meaningful digital experiences by combining the power of AI with intuitive web design.
                    I build smart, user-focused applications that solve real problems.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <a
                        href="#contact"
                        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-2xl"
                    >
                        Get In Touch
                    </a>
                    <a
                        href="#projects"
                        className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transform hover:scale-105 transition-all duration-300 border border-white/20"
                    >
                        View Projects
                    </a>
                </div>

                <div className="flex justify-center space-x-6">
                    <a 
                        href="https://linkedin.com/in/muhammadabdullah-cs" 
                        className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transform hover:scale-110 transition-all duration-300"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <Linkedin className="w-6 h-6" />
                    </a>
                    <a 
                        href="https://github.com/Abdullahar990" 
                        className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transform hover:scale-110 transition-all duration-300"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <Github className="w-6 h-6" />
                    </a>
                    <a 
                        href="mailto:abdullahar990@gmail.com" 
                        className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transform hover:scale-110 transition-all duration-300"
                    >
                        <Mail className="w-6 h-6" />
                    </a>
                </div>
            </div>
        </section>
    );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;