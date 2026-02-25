import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { glassStyle, techPillStyle, liveBadgeStyle, visitButtonStyle } from '../styles/glassStyles';

interface Project {
    title: string;
    desc: string;
    fullDesc: string;
    tech: string[];
    link: string;
    live: boolean;
}

const projects: Record<string, Project> = {
    'task-scheduler': {
        title: 'Task Scheduler',
        desc: 'https://github.com/Mohd-Sayeedul-Hoda/task_runner',
        fullDesc: 'A distributed system built to schedule and execute tasks across multiple workers. It uses a REST API for management, gRPC for high-speed communication between services, and PostgreSQL for persistent task tracking. Designed to be scalable, it supports running and managing multiple worker instances.',
        tech: ['Go', 'PostgreSQL', 'gRPC', 'Docker', 'Goose', 'Sql'],
        link: 'https://github.com/Mohd-Sayeedul-Hoda/task_runner',
        live: false,
    },
    'tunnel-app': {
        title: 'Tunnel',
        desc: 'Tunnel is a self-hosted solution for exposing local development servers to the internet',
        fullDesc: 'A self-hosted NAT traversal solution similar to ngrok. Expose local servers to the internet through secure tunnels with user authentication and API key management.',
        tech: ['React', 'Go', 'PostgreSQL', 'Redis', 'yamux', 'SQL', 'Typescript', 'Node js'],
        link: 'https://github.com/Mohd-Sayeedul-Hoda/tunnel',
        live: false,
    },
    'go-web-proxy': {
        title: 'Go Web Proxy',
        desc: 'Web Proxy with LRU Caching',
        fullDesc: 'High-performance Go web proxy featuring a custom LRU cache with O(1) search and eviction to reduce data retrieval latency',
        tech: ['Go', 'HTTP/Net', 'Sync/Mutex', 'LRU-Cache'],
        link: 'https://github.com/Mohd-Sayeedul-Hoda/proxy_with_lru_cache',
        live: false,
    },
    'tinypath': {
        title: 'TinyPath',
        desc: 'High-Performance Go URL Shortener',
        fullDesc: 'A fast and reliable service built with Go to shorten, manage, and track URLs. It uses PostgreSQL for secure data storage and features an automated migration system to handle database updates smoothly.',
        tech: ['Go', 'PostgreSQL', 'Goose', 'REST API'],
        link: 'https://github.com/Mohd-Sayeedul-Hoda/tinypath',
        live: false,
    },
};

interface ProjectDetailProps {
    projectSlug: string;
    onBack: () => void;
}

export default function ProjectDetail({ projectSlug, onBack }: ProjectDetailProps) {
    const project = projects[projectSlug];

    if (!project) {
        return null;
    }

    return (
        <section className="min-h-[100dvh] py-20 px-4 md:px-6 flex flex-col">
            <div className="max-w-3xl mx-auto w-full my-auto">
                <div className="rounded-2xl p-10" style={glassStyle}>
                    {/* Back Button */}
                    <motion.button
                        onClick={onBack}
                        className="flex items-center gap-2 text-foreground/70 hover:text-foreground mb-8 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <ArrowLeft size={20} />
                        <span className="font-medium">Back</span>
                    </motion.button>

                    {/* Project Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground">{project.title}</h1>
                            {project.live && (
                                <span className="px-3 py-1 rounded-full text-sm font-medium" style={liveBadgeStyle}>
                                    Live
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-lg text-foreground/70 leading-relaxed mb-8">
                            {project.fullDesc}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-10">
                            {project.tech.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-4 py-2 rounded-full text-sm"
                                    style={techPillStyle}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Visit Site Button */}
                        <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-transform hover:scale-105"
                            style={visitButtonStyle}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span>Visit Site</span>
                            <ExternalLink size={18} />
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
