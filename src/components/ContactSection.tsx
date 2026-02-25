import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { glassStyle } from '../styles/glassStyles';

export default function ContactSection() {
    return (
        <section id="contact" className="min-h-[100dvh] py-20 px-4 md:px-6 flex flex-col">
            <div className="max-w-2xl mx-auto w-full my-auto">
                <div className="rounded-3xl p-6 sm:p-8 md:p-12" style={glassStyle}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6 tracking-tight">
                            Get in Touch
                        </h1>

                        <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-8 md:mb-10 font-medium">
                            I’m always happy to chat about Go routines, Kubernetes,
                            or the latest in frontend ecosystems. Send an email, and let’s connect!
                        </p>

                        <motion.a
                            href="mailto:him@sayeedhoda.com"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
                            style={{
                                background: '#5c5046',
                                color: '#ffffff',
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Mail size={20} />
                            <span>Email Me</span>
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
