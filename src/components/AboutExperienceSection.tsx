import { motion } from 'framer-motion';
import { glassStyle, techPillStyle } from '../styles/glassStyles';

const experiences = [
    {
        role: "Software Engineer",
        company: "Tymeline",
        period: "Sep 2024 – Present",
        location: "Remote",
        desc: "Mainly working as a backend engineer, building microservices and APIs."
    },
];

const skills = {
    primaryStack: ["Golang", "Typescript", "Javascript", "Node.js", "Python", "React"],
    tools: ["PostgreSql", "MongoDB", "Redis", "Docker", "Kubernetes", "Terraform", "AWS", "Azure", "RabbitMQ", "Express", "Gin"],
};

export default function AboutExperienceSection() {
    return (
        <section id="about" className="min-h-screen py-20 px-4 md:px-6 flex items-center">
            <div className="max-w-3xl mx-auto w-full">
                {/* Experience Card */}
                <div className="rounded-3xl p-6 sm:p-8 md:p-12" style={glassStyle}>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-foreground tracking-tight">Experience</h2>
                        <p className="text-foreground/80 text-base md:text-lg font-medium">2+ years building scalable applications</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h3 className="text-sm font-semibold tracking-widest uppercase text-accent mb-4">Primary Stack</h3>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {skills.primaryStack.map((skill, i) => (
                                <span
                                    key={i}
                                    className="px-4 py-2 text-sm"
                                    style={techPillStyle}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <h3 className="text-sm font-semibold tracking-widest uppercase text-accent mb-4">Tools & Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.tools.map((skill, i) => (
                                <span
                                    key={i}
                                    className="px-4 py-2 text-sm"
                                    style={techPillStyle}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    <div className="relative">
                        <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-accent/30" />

                        <div className="space-y-12">
                            {experiences.map((exp, i) => (
                                <motion.div
                                    key={i}
                                    className="relative pl-10"
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                >
                                    <div className="absolute left-0 top-2 w-[14px] h-[14px] rounded-full bg-[#d94676] ring-2 ring-[#d94676]/40" />

                                    <span className="text-accent text-sm font-bold tracking-widest uppercase mb-1 block">{exp.period}</span>
                                    <h3 className="text-xl font-bold text-foreground mb-1">{exp.role}</h3>
                                    <div className="flex items-center gap-2 mb-3 text-foreground/70">
                                        <span>{exp.company}</span>
                                        <span className="text-accent">•</span>
                                        <span>{exp.location}</span>
                                    </div>
                                    <p className="text-foreground/80 leading-relaxed">{exp.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
