import React from 'react';
import { MapPin, Coffee, Heart, Zap } from 'lucide-react';

const AboutSection = () => {
    return (
        <section id="about" className="relative z-10 py-20 px-6 mt-16">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    About Me
                </h2>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <p className="text-lg text-gray-300 leading-relaxed">
                            I&apos;m Muhammad Abdullah, an AI practitioner focused on deep learning and computer vision.
                            I build intelligent systems using Python, TensorFlow, Keras, and OpenCV to solve real-world problems
                            like accident detection, image classification, and video analysis. With hands-on experience deploying neural
                            networks and completing DeepLearning.AI&apos;s specialization, I&apos;ve contributed to impactful, AI-driven projects.
                        </p>

                        <p className="text-lg text-gray-300 leading-relaxed">
                            I&apos;m passionate about pushing the boundaries of what machines can see and understand.
                            Whether it&apos;s vision pipelines, edge AI, or deep learning optimization,
                            I&apos;m always exploring new ways to innovate in the field.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mt-8">
                            <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                                <div className="text-3xl font-bold text-purple-400">10+</div>
                                <div className="text-gray-400">Projects Completed</div>
                            </div>
                            <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                                <div className="text-3xl font-bold text-pink-400">2+</div>
                                <div className="text-gray-400">Years Experience</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                            <div className="h-full flex flex-col justify-center space-y-6">
                                <div className="flex items-center space-x-3">
                                    <MapPin className="w-5 h-5 text-purple-400" />
                                    <span>Lahore, Punjab, Pakistan</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Coffee className="w-5 h-5 text-purple-400" />
                                    <span>Coffee Enthusiast</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Heart className="w-5 h-5 text-purple-400" />
                                    <span>Open Source Contributor</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Zap className="w-5 h-5 text-purple-400" />
                                    <span>Always Learning</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;