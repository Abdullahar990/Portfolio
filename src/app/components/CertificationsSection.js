import React, { memo } from 'react';
import { Award, Calendar, ExternalLink, CheckCircle, Star, Users } from 'lucide-react';
import Image from 'next/image';

const certifications = [
    {
        title: "Neural Networks and Deep Learning",
        issuer: "DeepLearning.AI",
        platform: "Coursera",
        date: "June 2025",
        credentialId: "IPV24OTKOOJD",
        image: "/Deep_learning_AI.png",
        description:
            "Introductory course on the fundamentals of deep learning, including basic neural network architectures and their training using Python and TensorFlow.",
        skills: ["Neural Networks", "Deep Learning"],
        hours: "24 hours",
        grade: "98%",
        projects: 3,
        featured: true,
        verifyLink: "https://www.coursera.org/account/accomplishments/verify/IPV24OTKOOJD"
    },
    {
        title: "Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization",
        issuer: "DeepLearning.AI",
        platform: "Coursera",
        date: "June 2025",
        credentialId: "YTQ2KN22J7EB",
        image: "/Deep_learning_AI.png",
        description:
            "Introductory course on improving deep learning models using techniques like hyperparameter tuning, regularization (L2, dropout), and optimization algorithms such as Adam and RMSProp.",
        skills: [
            "Hyperparameter Tuning",
            "Regularization",
            "Gradient Descent",
            "Optimization",
            "Dropout"
        ],
        hours: "23 hours",
        grade: "98%",
        projects: 3,
        featured: true,
        verifyLink: "https://www.coursera.org/account/accomplishments/verify/YTQ2KN22J7EB"
    },
    {
        title: "Structuring Machine Learning Projects",
        issuer: "DeepLearning.AI",
        platform: "Coursera",
        date: "July 2025",
        credentialId: "BUXF8C3JNKTG",
        image: "/Deep_learning_AI.png",
        description:
            "Practical course on designing effective machine learning systems. Topics included error analysis, bias/variance tradeoffs, and building scalable ML pipelines.",
        skills: [
            "Machine Learning Workflow",
            "Error Analysis",
            "Bias-Variance Tradeoff",
            "Data Strategy",
            "ML System Design"
        ],
        hours: "6 hours",
        grade: "96%",
        projects: 2,
        featured: true,
        verifyLink: "https://www.coursera.org/account/accomplishments/verify/BUXF8C3JNKTG"
    }
];

const totalProjects = certifications.reduce((sum, cert) => sum + cert.projects, 0);
const featuredCerts = certifications.filter(cert => cert.featured);
const otherCerts = certifications.filter(cert => !cert.featured);

const CertificationCard = memo(({ cert }) => (
    <div className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02] max-w-4xl lg:max-w-6xl mx-auto">
        <div className="group relative will-change-transform rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 group-hover:border-purple-500/30">
            {cert.featured && (
                <div className="absolute top-4 left-4 z-20">
                    <div className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-yellow-600/90 to-orange-600/90 rounded-full text-xs font-semibold text-white border border-white/20">
                        <Star className="w-3 h-3" />
                        <span>Featured</span>
                    </div>
                </div>
            )}
            <div className="absolute top-4 right-4 z-20">
                <div className="flex items-center space-x-1 px-3 py-1 bg-green-600/80 rounded-full text-xs font-semibold text-white border border-white/20">
                    <CheckCircle className="w-3 h-3" />
                    <span>{cert.grade}</span>
                </div>
            </div>

            <div className="relative w-full h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center overflow-hidden">
                <div className="relative w-24 h-20">
                    <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        loading="lazy"
                        className="object-contain"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,..."
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            </div>

            <div className="p-6 flex flex-col justify-between h-[420px]">
                <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                        {cert.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                        <span className="font-semibold text-purple-400">{cert.issuer}</span>
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {cert.date}
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{cert.platform}</p>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">{cert.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                        <div className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            <span>{cert.projects} Projects</span>
                        </div>
                        <span>{cert.hours}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                        {cert.skills.slice(0, 3).map(skill => (
                            <span
                                key={skill}
                                className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 rounded text-xs font-medium border border-purple-500/20"
                            >
                                {skill}
                            </span>
                        ))}
                        {cert.skills.length > 3 && (
                            <span
                                className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded text-xs"
                                title={cert.skills.slice(3).join(', ')}
                            >
                                +{cert.skills.length - 3}
                            </span>
                        )}
                    </div>
                </div>

                <div className="mt-auto">
                    <a
                        href={cert.verifyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-sm font-medium"
                    >
                        <ExternalLink className="w-4 h-4" />
                        <span>Verify</span>
                    </a>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
    </div>
));

const CertificationsSection = () => {
    return (
        <section id="certifications" className="relative z-10 py-20 px-6 mt-16">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Certifications & Achievements
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6 rounded-full" />
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Continuous learning and professional development through industry-recognized certifications
                    </p>
                </div>

                <div className="mb-16">
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                        <Star className="w-6 h-6 text-yellow-400 mr-2" />
                        Featured Certifications
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredCerts.map(cert => (
                            <CertificationCard key={cert.credentialId} cert={cert} />
                        ))}
                    </div>
                </div>

                {otherCerts.length > 0 && (
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                            <Award className="w-6 h-6 text-purple-400 mr-2" />
                            Additional Certifications
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {otherCerts.map(cert => (
                                <CertificationCard key={cert.credentialId} cert={cert} />
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                        <div className="text-3xl font-bold text-purple-400 mb-2">{certifications.length}</div>
                        <div className="text-gray-400">Total Certifications</div>
                    </div>
                    <div className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                        <div className="text-3xl font-bold text-pink-400 mb-2">{totalProjects}</div>
                        <div className="text-gray-400">Total Projects</div>
                    </div>
                    <div className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                        <div className="text-3xl font-bold text-blue-400 mb-2">95.5%</div>
                        <div className="text-gray-400">Average Grade</div>
                    </div>
                    <div className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                        <div className="text-3xl font-bold text-green-400 mb-2">6</div>
                        <div className="text-gray-400">Months Learning</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CertificationsSection;
