
import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Home as HomeIcon, 
  Tv, 
  Info, 
  MessageSquare, 
  Phone, 
  Facebook, 
  Youtube, 
  Music,
  Play,
  Pause,
  Volume2,
  Loader2
} from 'lucide-react';
import { View } from './types';
import { RADIO_NAME, RADIO_SLOGAN, DISPLAY_PHONE, WHATSAPP_PHONE, EMAIL_CONTACT, SOCIALS, RADIO_STREAM_URL, TV_IFRAME_URL } from './constants';

// --- Components ---

const Sidebar: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  currentView: View; 
  onViewChange: (view: View) => void; 
}> = ({ isOpen, onClose, currentView, onViewChange }) => {
  const menuItems = [
    { id: View.HOME, label: 'Accueil', icon: <HomeIcon size={20} /> },
    { id: View.TV, label: 'Regarder la TV', icon: <Tv size={20} /> },
    { id: View.ABOUT, label: 'À propos', icon: <Info size={20} /> },
    { id: View.CONTACT, label: 'Écrivez-nous', icon: <MessageSquare size={20} /> },
  ];

  const handleLink = (url: string) => {
    window.open(url, '_blank');
    onClose();
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div className={`fixed top-0 left-0 h-full w-72 bg-[#0a192f] z-50 transform transition-transform duration-300 ease-in-out border-r border-yellow-500/20 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-yellow-500">{RADIO_NAME}</h2>
            <button onClick={onClose} className="text-white hover:text-red-500 transition-colors">
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onViewChange(item.id); onClose(); }}
                className={`flex items-center space-x-4 w-full p-3 rounded-lg transition-all ${currentView === item.id ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-white/5'}`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            
            <div className="border-t border-white/10 my-4 pt-4">
              <p className="text-xs text-gray-500 uppercase tracking-widest px-3 mb-2 font-bold">Nous suivre</p>
              <button onClick={() => handleLink(SOCIALS.FACEBOOK)} className="flex items-center space-x-4 w-full p-3 text-gray-300 hover:text-blue-500 transition-all">
                <Facebook size={20} />
                <span>Facebook</span>
              </button>
              <button onClick={() => handleLink(SOCIALS.TIKTOK)} className="flex items-center space-x-4 w-full p-3 text-gray-300 hover:text-pink-400 transition-all">
                <Music size={20} />
                <span>TikTok</span>
              </button>
              <button onClick={() => handleLink(SOCIALS.YOUTUBE)} className="flex items-center space-x-4 w-full p-3 text-gray-300 hover:text-red-500 transition-all">
                <Youtube size={20} />
                <span>YouTube</span>
              </button>
            </div>
          </nav>

          <div className="pt-4 border-t border-white/10">
            <button 
              onClick={() => window.location.href = `tel:${WHATSAPP_PHONE}`}
              className="flex items-center justify-center space-x-2 w-full bg-yellow-500 text-black py-3 rounded-xl font-bold hover:bg-yellow-400 transition-colors"
            >
              <Phone size={18} />
              <span>Appelez-nous</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Header: React.FC<{ onOpenMenu: () => void }> = ({ onOpenMenu }) => (
  <header className="sticky top-0 z-30 bg-[#0a192f]/95 backdrop-blur-md border-b border-yellow-500/20 h-16 px-4 flex items-center justify-between shadow-lg">
    <button onClick={onOpenMenu} className="p-2 hover:bg-white/5 rounded-full transition-colors">
      <Menu size={24} className="text-yellow-500" />
    </button>
    <div className="flex-1 flex justify-center">
      <h1 className="text-lg font-black tracking-tighter text-white">
        <span className="text-red-600">ALLIANCE</span> <span className="text-yellow-500">RADIO</span>
      </h1>
    </div>
    <div className="w-10"></div>
  </header>
);

const RadioPlayer: React.FC<{ 
  isPlaying: boolean; 
  isLoading: boolean;
  onToggle: () => void; 
}> = ({ isPlaying, isLoading, onToggle }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0a192f] border-t border-yellow-500/30 p-4 pb-6 safe-area-bottom z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4 overflow-hidden">
          <div className={`w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0 ${isPlaying ? 'animate-pulse' : ''}`}>
            <Music className="text-white" size={20} />
          </div>
          <div className="overflow-hidden">
            <h3 className="text-sm font-bold truncate">ALLIANCE RADIO</h3>
            <p className="text-xs text-yellow-500 font-medium">
              {isLoading ? 'Connexion au flux...' : (isPlaying ? 'En direct' : 'Écouter le direct')}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <button 
            onClick={onToggle}
            disabled={isLoading}
            className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 size={24} className="animate-spin text-white" />
            ) : (
              isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />
            )}
          </button>
          <div className="hidden sm:block">
            <Volume2 size={20} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => (
  <div className="flex flex-col animate-fade-in">
    <div className="relative h-80 w-full overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1200&auto=format&fit=crop" 
        alt="Studio" 
        className="w-full h-full object-cover brightness-[0.3]"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-[#0a192f] via-transparent to-[#4b0082]/30">
        <div className="w-56 h-auto mb-4 drop-shadow-2xl">
          {/* Note: In a real app, replace the src below with the actual uploaded logo file path */}
          <img 
            src="https://raw.githubusercontent.com/ai-gen-assets/logos/main/alliance_radio_logo.png" 
            alt="Alliance Radio Logo" 
            className="w-full h-full object-contain" 
            onError={(e) => { 
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.classList.add('bg-white/10', 'rounded-xl', 'p-4');
                const text = document.createElement('h2');
                text.innerText = "RADIO ALLIANCE";
                text.className = "text-3xl font-black text-red-600 tracking-tighter";
                e.currentTarget.parentElement?.appendChild(text);
            }} 
          />
        </div>
        <h2 className="text-3xl font-black text-white italic tracking-tighter hidden">RADIO ALLIANCE</h2>
        <p className="text-yellow-500 font-bold text-xl font-slogan italic mt-2 opacity-90 drop-shadow-md">
          {RADIO_SLOGAN}
        </p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 p-6">
      <a href={`tel:${WHATSAPP_PHONE}`} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col items-center justify-center space-y-2 hover:bg-white/10 transition-all group">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
          <Phone size={20} />
        </div>
        <span className="text-sm font-semibold">Appeler</span>
      </a>
      <button 
        onClick={() => window.open(`https://wa.me/${WHATSAPP_PHONE.replace('+', '')}`, '_blank')}
        className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col items-center justify-center space-y-2 hover:bg-white/10 transition-all group"
      >
        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
          <MessageSquare size={20} />
        </div>
        <span className="text-sm font-semibold">WhatsApp</span>
      </button>
    </div>

    <div className="px-6 pb-24">
      <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
        <span className="w-1 h-6 bg-red-600 inline-block rounded-full"></span>
        <span className="text-yellow-500 uppercase tracking-wider text-sm">Nous suivre</span>
      </h3>
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {[
          { name: 'Facebook', url: SOCIALS.FACEBOOK, icon: <Facebook />, color: 'bg-blue-700' },
          { name: 'YouTube', url: SOCIALS.YOUTUBE, icon: <Youtube />, color: 'bg-red-700' },
          { name: 'TikTok', url: SOCIALS.TIKTOK, icon: <Music />, color: 'bg-black' },
        ].map((social) => (
          <button 
            key={social.name}
            onClick={() => window.open(social.url, '_blank')}
            className={`flex-shrink-0 flex items-center space-x-2 px-6 py-3 rounded-full ${social.color} text-white font-bold shadow-md hover:scale-105 transition-transform border border-white/10`}
          >
            {social.icon}
            <span>{social.name}</span>
          </button>
        ))}
      </div>
    </div>
  </div>
);

const TVPage: React.FC = () => (
  <div className="p-4 flex flex-col min-h-screen bg-black animate-fade-in pb-24">
    <div className="flex items-center space-x-3 mb-6">
      <Tv className="text-red-600" size={24} />
      <h2 className="text-2xl font-black">ALLIANCE TV</h2>
    </div>
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-900 border border-white/10">
      <iframe 
        allowFullScreen 
        src={TV_IFRAME_URL} 
        height="100%" 
        width="100%" 
        frameBorder="0"
        title="Alliance TV Stream"
        className="w-full h-full"
      />
    </div>
    <div className="mt-6 p-6 bg-white/5 rounded-2xl border border-white/10 border-l-4 border-l-yellow-500">
      <h3 className="text-xl font-bold text-yellow-500 mb-2">Le Direct TV</h3>
      <p className="text-gray-400 leading-relaxed italic">
        "{RADIO_SLOGAN}"
      </p>
      <p className="mt-2 text-gray-300">
        Suivez tous vos programmes préférés en direct sur Alliance TV. Émissions de divertissement, informations et débats 24h/24.
      </p>
    </div>
  </div>
);

const AboutPage: React.FC = () => (
  <div className="p-6 pb-24 animate-fade-in">
    <h2 className="text-2xl font-black mb-6 text-red-600">À PROPOS D'ALLIANCE</h2>
    <div className="space-y-6">
      <div className="bg-white/5 p-6 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <p className="text-gray-300 leading-relaxed relative z-10">
          Alliance Radio est une station de radio dynamique basée en Côte d'Ivoire. Notre mission est d'être <span className="text-yellow-500 font-bold">"{RADIO_SLOGAN}"</span>. Nous nous engageons à offrir à nos auditeurs le meilleur de la musique, de l'information et du divertissement divinement inspiré.
        </p>
      </div>
      <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
        <h3 className="font-bold text-yellow-500 mb-4 uppercase tracking-widest text-sm">Contact Direct</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-500">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Téléphone</p>
              <p className="text-white font-medium">{DISPLAY_PHONE}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center text-red-600">
              <MessageSquare size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-white font-medium italic">{EMAIL_CONTACT}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ContactPage: React.FC = () => {
  const [sent, setSent] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="p-6 pb-24 animate-fade-in">
      <h2 className="text-2xl font-black mb-6">ÉCRIVEZ-NOUS</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Votre nom" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-yellow-500 transition-colors" required />
        <input type="email" placeholder="Votre email" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-yellow-500 transition-colors" required />
        <textarea placeholder="Votre message" rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-yellow-500 transition-colors" required />
        <button type="submit" className="w-full bg-gradient-to-r from-red-600 to-red-800 py-4 rounded-xl font-black text-lg shadow-lg hover:shadow-red-600/20 active:scale-[0.98] transition-all">
          {sent ? 'MESSAGE ENVOYÉ !' : 'ENVOYER LE MESSAGE'}
        </button>
      </form>
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  const [isRadioLoading, setIsRadioLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleRadio = () => {
    if (!audioRef.current) return;

    if (isRadioPlaying) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current.load();
      setIsRadioPlaying(false);
    } else {
      setIsRadioLoading(true);
      audioRef.current.src = RADIO_STREAM_URL;
      audioRef.current.load();
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsRadioPlaying(true);
            setIsRadioLoading(false);
          })
          .catch(err => {
            console.error("Erreur de lecture :", err);
            setIsRadioLoading(false);
            setIsRadioPlaying(false);
          });
      }
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case View.HOME: return <HomePage />;
      case View.TV: return <TVPage />;
      case View.ABOUT: return <AboutPage />;
      case View.CONTACT: return <ContactPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a192f] select-none text-white">
      <Header onOpenMenu={() => setIsSidebarOpen(true)} />
      
      <audio 
        ref={audioRef} 
        preload="none"
        onCanPlay={() => setIsRadioLoading(false)}
        onWaiting={() => setIsRadioLoading(true)}
        onPlaying={() => { setIsRadioPlaying(true); setIsRadioLoading(false); }}
        onPause={() => setIsRadioPlaying(false)}
        onError={(e) => {
           console.error("Audio error event:", e);
           setIsRadioLoading(false);
           setIsRadioPlaying(false);
        }}
      />

      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <RadioPlayer 
        isPlaying={isRadioPlaying} 
        isLoading={isRadioLoading}
        onToggle={toggleRadio} 
      />

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .font-slogan {
          font-family: 'Great Vibes', cursive;
        }
      `}</style>
    </div>
  );
};

export default App;
