import { motion } from 'framer-motion';
import { Home, Briefcase, FolderGit2, Mail } from 'lucide-react';
import clsx from 'clsx';
import { glassStyle } from '../styles/glassStyles';

const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'experience', icon: Briefcase, label: 'Experience' },
    { id: 'projects', icon: FolderGit2, label: 'Projects' },
    { id: 'contact', icon: Mail, label: 'Contact' },
];

interface NavigationProps {
    currentPage: string;
    setCurrentPage: (page: string) => void;
}

export default function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
    return (
        <>
            {/* Desktop Navigation - Sidebar */}
            <nav className="hidden lg:block fixed right-6 xl:right-10 top-1/2 -translate-y-1/2 z-50">
                <div
                    className="rounded-full p-2 flex flex-col gap-4"
                    style={glassStyle}
                >
                    {navItems.map((item, i) => {
                        const Icon = item.icon;
                        const isActive = currentPage === item.id;

                        return (
                            <motion.button
                                key={item.id}
                                onClick={() => setCurrentPage(item.id)}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={clsx(
                                    "relative p-3 rounded-full group transition-all duration-300",
                                    isActive ? "bg-accent/20 text-accent" : "text-foreground/60 hover:text-foreground hover:bg-foreground/10"
                                )}
                            >
                                <Icon size={20} className={clsx("transition-transform duration-300", isActive && "scale-110")} />

                                {/* Tooltip */}
                                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-md glass-panel text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    {item.label}
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </nav>

            {/* Mobile/Tablet Navigation - Bottom Dock */}
            <nav className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
                <div
                    className="rounded-full px-4 py-3 flex items-center gap-4 shadow-lg"
                    style={glassStyle}
                >
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentPage === item.id;
                        return (
                            <motion.button
                                key={item.id}
                                onClick={() => setCurrentPage(item.id)}
                                className={clsx(
                                    "p-3 rounded-full transition-all",
                                    isActive ? "bg-accent/20 text-accent" : "text-foreground/60 hover:text-foreground hover:bg-foreground/10"
                                )}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Icon size={20} className={clsx("transition-transform duration-300", isActive && "scale-110")} />
                            </motion.button>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
