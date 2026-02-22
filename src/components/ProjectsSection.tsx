import { motion } from 'framer-motion';
import { glassStyle, liveBadgeStyle } from '../styles/glassStyles';

const projects = [
    {
        title: 'Task Scheduler',
        desc: 'A distributed task scheduling system built with Go, PostgreSQL, and gRPC',
        tech: ['Go', 'PostgreSQL', 'gRPC'],
        link: '#',
        live: false,
        slug: 'task-scheduler',
    },
    {
        title: 'Tunnel',
        desc: 'Tunnel is a self-hosted solution for exposing local development servers to the internet',
        tech: ['React', 'Go', 'PostgreSQL', 'Redis', 'yamux', 'SQL', 'Typescript', 'Node js'],
        link: 'https://github.com/Mohd-Sayeedul-Hoda/tunnel#',
        live: false,
        slug: 'tunnel-app',
    },
    {
        title: 'Go Web Proxy',
        desc: 'Web Proxy with LRU Caching',
        tech: ['Go', 'HTTP/Net', 'Sync/Mutex', 'LRU-Cache'],
        link: 'https://github.com/Mohd-Sayeedul-Hoda/proxy_with_lru_cache',
        live: false,
        ive: true,
        slug: 'go-web-proxy',
    },
    {
        title: 'TinyPath',
        desc: 'High-Performance Go URL Shortener',
        tech: ['Go', 'PostgreSQL', 'Goose', 'REST API'],
        link: 'https://github.com/Mohd-Sayeedul-Hoda/tinypath',
        live: false,
        slug: 'tinypath',
    },
];

interface ProjectsSectionProps {
    onProjectSelect: (slug: string) => void;
}

export default function ProjectsSection({ onProjectSelect }: ProjectsSectionProps) {
    return (
        <section id="projects" className="min-h-screen py-20 px-4 md:px-6 flex items-center">
            <div className="max-w-3xl mx-auto w-full">
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 md:mb-16 text-foreground tracking-tight px-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Projects
                </motion.h2>

                <div className="space-y-4">
                    {projects.map((p, i) => (
                        <motion.button
                            key={i}
                            onClick={() => onProjectSelect(p.slug)}
                            className="block group w-full text-left"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div
                                className="rounded-2xl p-5 sm:p-6 flex items-center justify-between gap-4 transition-transform duration-300 group-hover:scale-[1.02] sm:group-hover:scale-[1.03]"
                                style={glassStyle}
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                                            {p.title}
                                        </h3>
                                        {p.live && (
                                            <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={liveBadgeStyle}>
                                                Live
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-foreground/70 text-sm truncate">{p.desc}</p>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    );
}
