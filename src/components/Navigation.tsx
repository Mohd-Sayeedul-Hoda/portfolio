import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, FolderGit2, Mail, Menu, X } from 'lucide-react';
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Desktop Navigation - Sidebar */}
            <nav className="hidden md:block fixed right-6 top-1/2 -translate-y-1/2 z-50">
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

            {/* Mobile Navigation - Top Bar */}
            <nav className="md:hidden fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
                <div
                    className="rounded-2xl px-4 py-3 flex items-center"
                    style={glassStyle}
                >
                    <div className="flex items-center gap-2">
                        {/* Small tablets - show all nav items */}
                        <div className="hidden sm:flex items-center gap-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = currentPage === item.id;
                                return (
                                    <motion.button
                                        key={item.id}
                                        onClick={() => setCurrentPage(item.id)}
                                        className={clsx(
                                            "p-2 rounded-lg transition-all",
                                            isActive ? "bg-accent/20 text-accent" : "text-foreground/60 hover:text-foreground"
                                        )}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Icon size={18} />
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Mobile hamburger menu */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="sm:hidden p-2 rounded-lg text-foreground hover:bg-foreground/10 transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-full mt-2 p-4 rounded-2xl"
                            style={glassStyle}
                        >
                            <div className="flex flex-col gap-2">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = currentPage === item.id;
                                    return (
                                        <motion.button
                                            key={item.id}
                                            onClick={() => {
                                                setCurrentPage(item.id);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className={clsx(
                                                "flex items-center gap-3 p-3 rounded-xl transition-all",
                                                isActive ? "bg-accent/20 text-accent" : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                                            )}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Icon size={20} />
                                            <span className="font-medium">{item.label}</span>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Spacer for mobile top bar */}
            <div className="md:hidden h-20" />
        </>
    );
}
