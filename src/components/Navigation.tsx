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

    const handleNavClick = (id: string) => {
        setCurrentPage(id);
        setIsMobileMenuOpen(false);
    };

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

            {/* Mobile/Tablet Navigation - Hamburger */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <motion.button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-3 rounded-full shadow-lg"
                    style={glassStyle}
                    whileTap={{ scale: 0.95 }}
                >
                    {isMobileMenuOpen ? <X size={24} className="text-foreground" /> : <Menu size={24} className="text-foreground" />}
                </motion.button>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, transformOrigin: "top left" }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-16 left-0 rounded-2xl flex flex-col py-2 w-48 shadow-xl overflow-hidden"
                            style={glassStyle}
                        >
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = currentPage === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleNavClick(item.id)}
                                        className={clsx(
                                            "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors w-full text-left",
                                            isActive ? "bg-accent/10 text-accent" : "text-foreground/80 hover:bg-foreground/5 hover:text-foreground"
                                        )}
                                    >
                                        <Icon size={18} />
                                        {item.label}
                                    </button>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
