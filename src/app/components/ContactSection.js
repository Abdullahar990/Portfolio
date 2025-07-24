import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection = () => {
    return (
        <section id="contact" className="relative z-10 py-20 px-6 mt-16">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Let's Work Together
                </h2>

                <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                    Ready to bring your ideas to life? I'm always excited to collaborate on
                    innovative projects and help businesses achieve their digital goals.
                </p>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <Mail className="w-8 h-8 mx-auto mb-4 text-purple-400" />
                        <h3 className="text-lg font-semibold mb-2">Email</h3>
                        <p className="text-gray-400">abdullahar990@gmail.com</p>
                    </div>

                    <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <Phone className="w-8 h-8 mx-auto mb-4 text-purple-400" />
                        <h3 className="text-lg font-semibold mb-2">Phone</h3>
                        <p className="text-gray-400">+92 3190538307</p>
                    </div>

                    <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <MapPin className="w-8 h-8 mx-auto mb-4 text-purple-400" />
                        <h3 className="text-lg font-semibold mb-2">Location</h3>
                        <p className="text-gray-400">Lahore, Punjab, PK</p>
                    </div>
                </div>

                <a
                    href="mailto:abdullahar990@gmail.com"
                    className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-2xl text-lg font-semibold"
                >
                    <Mail className="w-5 h-5" />
                    <span>Start a Conversation</span>
                </a>
            </div>
        </section>
    );
};

export default ContactSection;