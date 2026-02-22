import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { glassStyle } from './styles/glassStyles';
import BackgroundSimulation from './components/BackgroundSimulation';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutExperienceSection from './components/AboutExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ProjectDetail from './components/ProjectDetail';
import ContactSection from './components/ContactSection';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isSimulationPaused, setIsSimulationPaused] = useState(false);

  const handleProjectSelect = (slug: string) => {
    setSelectedProject(slug);
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
  };

  const renderPage = () => {
    if (selectedProject && currentPage === 'projects') {
      return <ProjectDetail key="project-detail" projectSlug={selectedProject} onBack={handleBackToProjects} />;
    }

    switch (currentPage) {
      case 'home': return <HeroSection key="home" />;
      case 'experience': return <AboutExperienceSection key="experience" />;
      case 'projects': return <ProjectsSection key="projects" onProjectSelect={handleProjectSelect} />;
      case 'contact': return <ContactSection key="contact" />;
      default: return <HeroSection key="home" />;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden text-foreground font-sans bg-[var(--background)]">
      <BackgroundSimulation isPaused={isSimulationPaused} />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Simulation Control Toggle */}
      <motion.button
        className="fixed top-4 right-4 md:top-auto md:bottom-[30px] md:right-8 lg:bottom-10 lg:right-10 z-50 p-3 md:p-4 rounded-full transition-all group shadow-lg"
        style={glassStyle}
        onClick={() => setIsSimulationPaused(!isSimulationPaused)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        {isSimulationPaused ? (
          <Play size={24} className="text-foreground/70 group-hover:text-accent transition-colors" />
        ) : (
          <Pause size={24} className="text-foreground/70 group-hover:text-accent transition-colors" />
        )}
      </motion.button>

      {/* Portfolio Content Layer */}
      <div className="relative z-10 w-full h-screen flex flex-col pointer-events-auto overflow-y-auto">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
