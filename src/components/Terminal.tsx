import React, { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: 'System boot sequence completed.', type: 'success' },
    { text: 'Welcome to Aditya\'s portfolio interface. Type "help" to see available commands.', type: 'output' },
  ]);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory = [...history, { text: `visitor@adityacode:~$ ${cmd}`, type: 'input' as const }];

    if (trimmedCmd === '') {
      setHistory(newHistory);
      return;
    }

    const commands: Record<string, () => TerminalLine[]> = {
      help: () => [
        { text: 'Available commands:', type: 'success' },
        { text: '  about      - A brief bio about Aditya Gupta', type: 'output' },
        { text: '  projects   - Key projects built (Web & IoT)', type: 'output' },
        { text: '  skills     - Programming languages and hardware stack', type: 'output' },
        { text: '  contact    - Contact details & social links', type: 'output' },
        { text: '  clear      - Clear the console history', type: 'output' },
        { text: '  secret     - ???', type: 'success' },
      ],
      about: () => [
        { text: 'ABOUT ADITYA GUPTA:', type: 'success' },
        { text: 'Aditya is a Tech Enthusiast, Full-Stack Web Developer, and IoT/Hardware Integrator.', type: 'output' },
        { text: 'He blends custom circuit designs with modern web interfaces, bridging the physical and digital worlds.', type: 'output' },
        { text: 'Specializes in: building automated school portals, live event monitoring dashboards, and microcontroller automation.', type: 'output' },
      ],
      projects: () => [
        { text: 'KEY PROJECTS Showcase:', type: 'success' },
        { text: '[WEB & MANAGEMENT PORTALS]', type: 'success' },
        { text: '  * Udaya Public School Portal (UPSMP) - Live React management portal', type: 'output' },
        { text: '  * RESULT Generator - Custom digital grade card system (https://result-sfvz.vercel.app)', type: 'output' },
        { text: '  * Udaya-Event - Smart QR code-based secure entry check-in system', type: 'output' },
        { text: '[IoT & INTEGRATIONS]', type: 'success' },
        { text: '  * Smart Weather Station - Live microclimatic telemetry logs', type: 'output' },
        { text: '  * Smile LED Color Changer - webcam facial analysis control for hardware LEDs', type: 'output' },
        { text: '  * Plant Health System - Automated soil diagnostics and logs', type: 'output' },
        { text: '  * Smart Watch for Elderly - Fall-alert + GPS security tracker', type: 'output' },
      ],
      skills: () => [
        { text: 'TECHNICAL CORE STACK:', type: 'success' },
        { text: '  * Frontend:  React.js, Next.js, HTML5, CSS3, Tailwind CSS', type: 'output' },
        { text: '  * Backend:   Node.js, Express.js, TypeScript, REST APIs', type: 'output' },
        { text: '  * Hardware:  Arduino IDE, ESP32, ESP8266, Raspberry Pi', type: 'output' },
        { text: '  * Tech List: IoT Integration, Webhooks, QR/Barcode Scanner, Microcontrollers, Sensors', type: 'output' },
      ],
      contact: () => [
        { text: 'CONNECT WITH ADITYA:', type: 'success' },
        { text: '  * Email:     chrisstylusxspidy@gmail.com', type: 'output' },
        { text: '  * GitHub:    https://github.com/chris-stylus', type: 'output' },
        { text: '  * Domain:    https://adityacode.com', type: 'output' },
      ],
      secret: () => [
        { text: 'Initializing easter egg system...', type: 'success' },
        { text: 'Scanning webcam... Smile detected! 😊', type: 'output' },
        { text: 'Core Temperature: Nominal (37°C)', type: 'output' },
        { text: 'Activating RC Car voice system... Engine ignited! 🏎️💨', type: 'success' },
      ],
    };

    if (trimmedCmd === 'clear') {
      setHistory([]);
    } else if (commands[trimmedCmd]) {
      setHistory([...newHistory, ...commands[trimmedCmd]()]);
    } else {
      setHistory([
        ...newHistory,
        { text: `bash: command not found: ${cmd}. Type "help" to see available options.`, type: 'error' }
      ]);
    }

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div 
      className="glass glow-purple scanline relative overflow-hidden" 
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '14px',
        backgroundColor: 'var(--bg-terminal)',
        border: '1px solid rgba(185, 39, 252, 0.25)',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(185, 39, 252, 0.1)',
        height: '350px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Terminal Title Bar */}
      <div 
        className="flex items-center justify-between px-4 py-2 border-b border-light" 
        style={{ 
          background: 'rgba(10, 10, 20, 0.8)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div className="flex gap-2" style={{ display: 'flex', gap: '6px' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }}></span>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }}></span>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }}></span>
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>visitor@adityacode.com: ~</div>
        <div style={{ width: '40px' }}></div>
      </div>

      {/* Terminal Screen content */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-2"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          overflowY: 'auto',
          flex: 1,
          padding: '16px',
          textAlign: 'left'
        }}
      >
        {history.map((line, index) => {
          let color = 'var(--text-primary)';
          if (line.type === 'input') color = 'var(--cyber-cyan)';
          if (line.type === 'error') color = '#ff5f56';
          if (line.type === 'success') color = 'var(--electric-green)';
          
          return (
            <div key={index} style={{ color, whiteSpace: 'pre-wrap', lineBreak: 'anywhere' }}>
              {line.text}
            </div>
          );
        })}
        
        {/* Active Command Line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--cyber-cyan)' }}>
          <span>visitor@adityacode:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              flex: 1,
            }}
            placeholder="Type a command..."
          />
        </div>
      </div>
    </div>
  );
}
