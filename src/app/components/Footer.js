import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative z-10 py-8 px-6 border-t border-white/10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-gray-400 mb-4 md:mb-0">
                    © 2025 Muhammad Abdullah.
                </div>

                <div className="flex space-x-6">
                    <a
                        href="https://linkedin.com/in/muhammadabdullah-cs"
                        className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                        href="https://github.com/Abdullahar990"
                        className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                    <a
                        href="mailto:abdullahar990@gmail.com"
                        className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                    >
                        <Mail className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;