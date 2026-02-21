import { useState } from 'react';
import BackgroundSimulation from './components/BackgroundSimulation';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutExperienceSection from './components/AboutExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ProjectDetail from './components/ProjectDetail';
import ContactSection from './components/ContactSection';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

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
      <BackgroundSimulation />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

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
