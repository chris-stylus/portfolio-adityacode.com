import { useState, useEffect } from 'react';
import { 
  Cpu, 
  Globe, 
  Database, 
  Sparkles, 
  Mail, 
  ExternalLink, 
  Code, 
  CheckCircle2, 
  Server, 
  Menu,
  X
} from 'lucide-react';
import Terminal from './components/Terminal';

// Inline Github Icon Component to replace missing brand icon in lucide v1.x.x
const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);


// Projects list based on github summary
const projects = [
  {
    name: "Udaya Public School Portal",
    id: "upsmp",
    category: "web",
    description: "An automated management portal built to handle school administration, attendance tracking, and grading systems.",
    language: "TypeScript",
    tags: ["React", "TypeScript", "Node.js", "Express", "Vercel"],
    github: "https://github.com/chris-stylus/udaya-public-school-management-portal",
    demo: "https://udaya-public-school-management-port.vercel.app",
    featured: true
  },
  {
    name: "RESULT Generator",
    id: "result",
    category: "web",
    description: "A fast, automated report card and scorecard generation application for parsing student logs and building digital certificates.",
    language: "TypeScript",
    tags: ["Vite", "React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/chris-stylus/RESULT",
    demo: "https://result-sfvz.vercel.app",
    featured: true
  },
  {
    name: "Smile LED Color Changer",
    id: "smile",
    category: "iot",
    description: "A smart computer vision project that monitors your webcam, detects a smile, and changes the color of a physical addressable LED strip in real-time.",
    language: "HTML",
    tags: ["Arduino", "Computer Vision", "Web Sockets", "ESP8266"],
    github: "https://github.com/chris-stylus/SMILE",
    featured: true
  },
  {
    name: "Smart Weather Station",
    id: "weather",
    category: "iot",
    description: "A microclimatic IoT weather station logging temperature, humidity, and atmospheric pressure using ESP8266 and micro-sensors.",
    language: "HTML",
    tags: ["ESP8266", "BME280 Sensor", "Web Server", "C++"],
    github: "https://github.com/chris-stylus/weather-station",
    featured: true
  },
  {
    name: "Plant Health Monitor",
    id: "plants",
    category: "iot",
    description: "An automated agricultural telemetry system using soil moisture and UV sensors to monitor crop health and display logs on a web page.",
    language: "HTML",
    tags: ["ESP32", "Soil Sensors", "Web Dashboard", "HTTP Webhooks"],
    github: "https://github.com/chris-stylus/plant-health",
    featured: false
  },
  {
    name: "Udaya-Event Check-in",
    id: "event",
    category: "web",
    description: "A smart QR-code based entry pass and secure ticketing system for scanning attendees and recording gate check-in logs in real-time.",
    language: "TypeScript",
    tags: ["React", "TypeScript", "QR Scanner", "Tailwind CSS"],
    github: "https://github.com/chris-stylus/Udaya-Event",
    featured: false
  },
  {
    name: "Smart Watch for Elderly",
    id: "watch",
    category: "iot",
    description: "A prototype smart watch designed for elderly health safety, incorporating GPS tracking and fall-detection alarms.",
    language: "HTML",
    tags: ["Arduino", "MPU6050", "GSM Module", "GPS Module"],
    github: "https://github.com/chris-stylus/watch",
    featured: false
  },
  {
    name: "RC Voice Car",
    id: "rc-car",
    category: "iot",
    description: "An interactive radio-controlled car managed using neural speech command recognition on a connected web page interface.",
    language: "HTML",
    tags: ["ESP32 Robotics", "Speech Synthesis", "Web Speech API"],
    github: "https://github.com/chris-stylus/rcvoicecar",
    featured: false
  }
];

function App() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'web' | 'iot'>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [latency, setLatency] = useState(15);
  const [cfNode, setCfNode] = useState('DEL-01 (Delhi, IN)');
  
  // Contact state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    // Simulate minor network ping changes for the Cloudflare widget
    const interval = setInterval(() => {
      setLatency(prev => Math.max(10, Math.min(30, prev + Math.floor(Math.random() * 5) - 2)));
    }, 4000);

    // Pick a regional Cloudflare node based on timezone
    const offset = new Date().getTimezoneOffset();
    if (offset === -330) {
      setCfNode('DEL-02 (Delhi, India Edge)');
    } else {
      setCfNode('SGP-01 (Singapore Edge)');
    }

    return () => clearInterval(interval);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    // Simulate API contact submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  const filteredProjects = projects.filter(p => 
    activeCategory === 'all' ? true : p.category === activeCategory
  );

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Navbar */}
      <nav className="glass" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        borderRadius: 0,
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        background: 'rgba(5, 5, 10, 0.75)'
      }}>
        <div className="container" style={{
          height: '70px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo */}
          <a href="#" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            textDecoration: 'none',
            fontSize: '20px',
            fontWeight: 800,
            fontFamily: 'var(--font-mono)'
          }}>
            <span className="text-gradient-cyan">&lt;</span>
            <span style={{ color: 'var(--text-primary)' }}>ADITYA_CODE</span>
            <span className="text-gradient-cyan">/&gt;</span>
          </a>

          {/* Desktop Navigation */}
          <div className="desktop-nav" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <a href="#about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, fontSize: '15px' }} className="hover-link">About</a>
            <a href="#stack" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, fontSize: '15px' }} className="hover-link">Skills</a>
            <a href="#projects" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, fontSize: '15px' }} className="hover-link">Projects</a>
            <a href="#terminal" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, fontSize: '15px' }} className="hover-link">Terminal</a>
            <a href="#contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, fontSize: '15px' }} className="hover-link">Contact</a>
            
            <a href="https://github.com/chris-stylus" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '14px' }}>
              <GithubIcon size={16} /> GitHub
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button 
            className="mobile-nav-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'none' // Controlled in CSS or inline responsiveness
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="glass" style={{
            position: 'absolute',
            top: '70px',
            left: 0,
            right: 0,
            background: 'var(--bg-dark)',
            borderLeft: 'none',
            borderRight: 'none',
            borderRadius: '0 0 16px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '24px',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)'
          }}>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '16px' }}>About</a>
            <a href="#stack" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '16px' }}>Skills</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '16px' }}>Projects</a>
            <a href="#terminal" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '16px' }}>Terminal</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '16px' }}>Contact</a>
            <a href="https://github.com/chris-stylus" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ justifyContent: 'center' }}>
              <GithubIcon size={18} /> GitHub
            </a>
          </div>
        )}
      </nav>

      {/* Hero / About Section */}
      <section id="about" style={{ paddingTop: '150px', paddingBottom: '80px', position: 'relative' }}>
        <div className="grid-bg"></div>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}>
          {/* Hero text */}
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(0, 242, 254, 0.08)', border: '1px solid rgba(0, 242, 254, 0.15)', marginBottom: '16px' }}>
              <Sparkles size={14} className="text-gradient-cyan" style={{ filter: 'drop-shadow(0 0 4px var(--cyber-cyan))' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--cyber-cyan)', letterSpacing: '0.05em' }}>AVAILABLE FOR CONTRACTS</span>
            </div>
            
            <h1 style={{ fontSize: '3rem', lineHeight: '1.1', marginBottom: '16px' }}>
              Hi, I'm <span className="text-gradient-cyan">Aditya Gupta</span>
            </h1>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '24px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span>Web Developer</span> 
              <span style={{ color: 'var(--text-muted)' }}>&bull;</span> 
              <span className="text-gradient-purple">IoT Integrator</span>
            </h2>
            
            <p style={{ fontSize: '17px', marginBottom: '32px' }}>
              I build robust, automated full-stack web applications and bridge them to the physical world using smart microcontrollers. From real-time event check-ins to smart plant diagnostics and web-enabled voice robotics, I build technology that works.
            </p>
            
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="#projects" className="btn btn-primary">
                <Globe size={18} /> View My Work
              </a>
              <a href="#terminal" className="btn btn-secondary">
                <Code size={18} /> Try Interactive CLI
              </a>
            </div>
          </div>

          {/* Interactive terminal column */}
          <div className="animate-float">
            <Terminal />
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="stack" style={{ padding: '80px 0', background: 'rgba(10, 10, 20, 0.4)' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '16px' }}>
            My <span className="text-gradient-purple">Tech Core</span>
          </h2>
          <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px' }}>
            A tailored engineering stack matching software capabilities with hardware interfaces.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {/* Frontend / Full Stack card */}
            <div className="glass glow-cyan hover-card" style={{ padding: '32px', textAlign: 'left' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                background: 'rgba(0, 242, 254, 0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '24px',
                border: '1px solid rgba(0, 242, 254, 0.2)'
              }}>
                <Globe size={24} style={{ color: 'var(--cyber-cyan)' }} />
              </div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Web Frontend</h3>
              <p style={{ fontSize: '14px', marginBottom: '20px' }}>
                Building highly interactive, component-driven interfaces with smooth responsive behaviors.
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="tech-badge">React</span>
                <span className="tech-badge">Next.js</span>
                <span className="tech-badge">TypeScript</span>
                <span className="tech-badge">Tailwind CSS</span>
                <span className="tech-badge">Vite</span>
              </div>
            </div>

            {/* Backend / Integrations card */}
            <div className="glass glow-purple hover-card" style={{ padding: '32px', textAlign: 'left' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                background: 'rgba(185, 39, 252, 0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '24px',
                border: '1px solid rgba(185, 39, 252, 0.2)'
              }}>
                <Database size={24} style={{ color: 'var(--neon-purple)' }} />
              </div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Server & Database</h3>
              <p style={{ fontSize: '14px', marginBottom: '20px' }}>
                Structuring efficient REST endpoints, parsing automation tasks, and hosting stable micro-services.
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="tech-badge">Node.js</span>
                <span className="tech-badge">Express</span>
                <span className="tech-badge">APIs</span>
                <span className="tech-badge">Vercel</span>
                <span className="tech-badge">Firebase</span>
              </div>
            </div>

            {/* Hardware / IoT card */}
            <div className="glass glow-cyan hover-card" style={{ padding: '32px', textAlign: 'left' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                background: 'rgba(0, 255, 135, 0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '24px',
                border: '1px solid rgba(0, 255, 135, 0.2)'
              }}>
                <Cpu size={24} style={{ color: 'var(--electric-green)' }} />
              </div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>IoT & Robotics</h3>
              <p style={{ fontSize: '14px', marginBottom: '20px' }}>
                Programming physical controllers, collecting analog sensor signals, and building wireless web links.
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="tech-badge-green">Arduino IDE</span>
                <span className="tech-badge-green">ESP8266</span>
                <span className="tech-badge-green">ESP32</span>
                <span className="tech-badge-green">Sensors</span>
                <span className="tech-badge-green">Robotics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section id="projects" style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '16px' }}>
            Built &amp; <span className="text-gradient-cyan">Deployed</span> Projects
          </h2>
          <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 32px' }}>
            Explore my work across responsive web platforms and embedded hardware.
          </p>

          {/* Project Filters */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '12px', 
            marginBottom: '40px'
          }}>
            <button 
              onClick={() => setActiveCategory('all')} 
              className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
            >
              All Builds ({projects.length})
            </button>
            <button 
              onClick={() => setActiveCategory('web')} 
              className={`filter-btn ${activeCategory === 'web' ? 'active' : ''}`}
            >
              Web Solutions
            </button>
            <button 
              onClick={() => setActiveCategory('iot')} 
              className={`filter-btn ${activeCategory === 'iot' ? 'active' : ''}`}
            >
              IoT &amp; Hardware
            </button>
          </div>

          {/* Projects Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px'
          }}>
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="glass hover-card" 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '24px',
                  textAlign: 'left',
                  border: project.featured ? '1px solid rgba(0, 242, 254, 0.25)' : '1px solid var(--border-light)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <span style={{ 
                    fontSize: '11px', 
                    fontWeight: 700, 
                    color: project.category === 'web' ? 'var(--cyber-cyan)' : 'var(--electric-green)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {project.category === 'web' ? 'Web FullStack' : 'IoT Integration'}
                  </span>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }} className="hover-link">
                      <GithubIcon size={18} />
                    </a>
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cyber-cyan)' }} className="hover-link">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 style={{ fontSize: '18px', marginBottom: '12px', color: 'var(--text-primary)' }}>
                  {project.name}
                </h3>
                
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px', flex: 1 }}>
                  {project.description}
                </p>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: 'auto' }}>
                  {project.tags.map(t => (
                    <span 
                      key={t} 
                      style={{ 
                        fontSize: '11px', 
                        background: 'rgba(255, 255, 255, 0.03)', 
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cloudflare Edge Status Badge Section */}
      <section style={{ padding: '40px 0' }}>
        <div className="container">
          <div className="glass glow-cyan" style={{
            padding: '24px 32px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
            borderRadius: '16px',
            border: '1px solid rgba(0, 242, 254, 0.15)',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', position: 'relative' }}>
                <span className="cursor-blink" style={{ width: '12px', height: '12px', background: 'var(--electric-green)', borderRadius: '50%', display: 'inline-block' }}></span>
                <span style={{ position: 'absolute', width: '12px', height: '12px', background: 'var(--electric-green)', borderRadius: '50%', display: 'inline-block', opacity: 0.4, transform: 'scale(1.8)' }}></span>
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Server size={16} style={{ color: 'var(--cyber-cyan)' }} /> Cloudflare Edge Deployment
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  This portfolio is distributed globally across Cloudflare's network on the root domain <strong>adityacode.com</strong>.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>NODE:</span> <span style={{ color: 'var(--cyber-cyan)' }}>{cfNode}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>LATENCY:</span> <span style={{ color: 'var(--electric-green)' }}>{latency}ms</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>STATUS:</span> <span style={{ color: 'var(--text-primary)' }}>SECURED / HTTP3</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal direct anchor wrapper */}
      <div id="terminal"></div>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '16px' }}>
            Initialize <span className="text-gradient-purple">Connection</span>
          </h2>
          <p style={{ textAlign: 'center', marginBottom: '40px' }}>
            Send a message directly to get started on a project or hardware integration.
          </p>

          <form onSubmit={handleContactSubmit} className="glass glow-purple" style={{
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="name" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Sender Identity (Name)</label>
              <input 
                type="text" 
                id="name"
                required
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                style={{
                  background: 'rgba(5, 5, 10, 0.6)',
                  border: '1px solid var(--border-light)',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                className="input-focus-glow"
                placeholder="Your Name"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="email" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Communication Channel (Email)</label>
              <input 
                type="email" 
                id="email"
                required
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                style={{
                  background: 'rgba(5, 5, 10, 0.6)',
                  border: '1px solid var(--border-light)',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                className="input-focus-glow"
                placeholder="your@email.com"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="message" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Transmitted Message</label>
              <textarea 
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                style={{
                  background: 'rgba(5, 5, 10, 0.6)',
                  border: '1px solid var(--border-light)',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '15px',
                  outline: 'none',
                  resize: 'none',
                  transition: 'all 0.2s'
                }}
                className="input-focus-glow"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn btn-primary"
              style={{ justifyContent: 'center', marginTop: '8px' }}
            >
              {isSubmitting ? 'Transmitting Data...' : 'Transmit Message'}
            </button>

            {submitStatus === 'success' && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '12px', 
                borderRadius: '8px', 
                background: 'rgba(0, 255, 135, 0.1)', 
                border: '1px solid rgba(0, 255, 135, 0.2)',
                color: 'var(--electric-green)',
                fontSize: '14px'
              }}>
                <CheckCircle2 size={16} /> Transmission complete! I'll get back to you shortly.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px 0',
        borderTop: '1px solid var(--border-light)',
        background: 'rgba(5, 5, 10, 0.8)',
        fontSize: '14px',
        color: 'var(--text-secondary)'
      }}>
        <div className="container" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="https://github.com/chris-stylus" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }} className="hover-link">
              <GithubIcon size={20} />
            </a>
            <a href="mailto:chrisstylusxspidy@gmail.com" style={{ color: 'var(--text-secondary)' }} className="hover-link">
              <Mail size={20} />
            </a>
          </div>
          <p>&copy; {new Date().getFullYear()} ADITYA GUPTA. All Rights Reserved. Hosted via Cloudflare Edge.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
