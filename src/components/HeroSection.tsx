import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { glassStyle } from '../styles/glassStyles';

export default function HeroSection() {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 md:px-6">
            <div className="max-w-3xl mx-auto w-full">
                <div className="rounded-3xl p-6 sm:p-8 md:p-12" style={glassStyle}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 md:mb-6 tracking-tight">
                            Mohd Sayeedul Hoda
                        </h1>

                        <p className="text-base sm:text-lg text-foreground/80 max-w-xl mb-8 md:mb-10 leading-relaxed font-medium">
                            I architect distributed systems and high-performance web applications backed by cloud-native infrastructure.
                        </p>

                        <motion.div
                            className="flex items-center gap-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <a
                                href="https://github.com/Mohd-Sayeedul-Hoda"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2 text-sm"
                            >
                                <Github size={18} />
                                <span>GitHub</span>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/mohd-sayeedul-hoda/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2 text-sm"
                            >
                                <Linkedin size={18} />
                                <span>LinkedIn</span>
                            </a>
                            <a
                                href="mailto:him@sayeedhoda.com"
                                className="text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2 text-sm"
                            >
                                <Mail size={18} />
                                <span>Email</span>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
