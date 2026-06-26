// 1. Import Dependencies
import * as React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Copy, Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

// 2. Define Prop Types
export interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  isSeparator?: boolean; // Optional separator for grouping items
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  isRegistered: boolean;
}

export interface UserProfileSidebarProps {
  user: UserProfile;
  navItems: NavItem[];
  onRegister: (name: string, email: string, avatarUrl: string) => void;
  logoutItem: {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
  };
  className?: string;
}

// 10 Custom Korean Culture Emoji Avatars
const AVATAR_OPTIONS = [
  { id: 'av1', name: 'Flor de Cerezo', emoji: '🌸' },
  { id: 'av2', name: 'Té Verde', emoji: '🍵' },
  { id: 'av3', name: 'Mandarina Jeju', emoji: '🍊' },
  { id: 'av4', name: 'Arroz Wash', emoji: '🍚' },
  { id: 'av5', name: 'Miel Real', emoji: '🍯' },
  { id: 'av6', name: 'Melocotón', emoji: '🍑' },
  { id: 'av7', name: 'Skincare', emoji: '🧖‍♀️' },
  { id: 'av8', name: 'Bambú', emoji: '🎋' },
  { id: 'av9', name: 'Mandu', emoji: '🥟' },
  { id: 'av10', name: 'Palillos', emoji: '🥢' }
];

// 3. Define Animation Variants
const sidebarVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 18,
    },
  },
};

export const UserProfileSidebar = React.forwardRef<HTMLDivElement, UserProfileSidebarProps>(
  ({ user, navItems, onRegister, logoutItem, className }, ref) => {
    // Form States
    const [regName, setRegName] = React.useState('');
    const [regEmail, setRegEmail] = React.useState('');
    const [selectedAv, setSelectedAv] = React.useState(AVATAR_OPTIONS[0].emoji);
    const [copied, setCopied] = React.useState(false);

    const handleRegisterSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (regName.trim() && regEmail.trim()) {
        onRegister(regName.trim(), regEmail.trim(), selectedAv);
      }
    };

    const handleCopyCoupon = () => {
      navigator.clipboard.writeText('GLOWY10');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    const renderAvatar = (urlOrEmoji: string, sizeClass = "h-14 w-14 text-2xl") => {
      if (urlOrEmoji && urlOrEmoji.startsWith('http')) {
        return (
          <img
            src={urlOrEmoji}
            alt="Avatar"
            className={cn("rounded-full object-cover border-2 border-glowy-pink-soft/40 shadow-sm", sizeClass)}
          />
        );
      }
      return (
        <div className={cn("rounded-full bg-glowy-pink-soft/20 flex items-center justify-center border-2 border-glowy-pink-soft/40 shadow-sm", sizeClass)}>
          {urlOrEmoji || '🌸'}
        </div>
      );
    };

    return (
      <motion.aside
        ref={ref}
        className={cn(
          'flex h-full w-full max-w-xs flex-col rounded-3xl border bg-card p-5 text-card-foreground shadow-sm overflow-y-auto no-scrollbar',
          className
        )}
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
        aria-label="User Profile Menu"
      >
        {user.isRegistered ? (
          // REGISTERED USER VIEW
          <>
            {/* User Info Header */}
            <motion.div variants={itemVariants} className="flex items-center space-x-4 p-2">
              {renderAvatar(user.avatarUrl)}
              <div className="flex flex-col truncate">
                <span className="font-semibold text-base text-slate-800 flex items-center">
                  {user.name}
                  <Sparkles className="w-3.5 h-3.5 text-glowy-pink-deep ml-1" />
                </span>
                <span className="text-xs text-muted-foreground truncate">{user.email}</span>
              </div>
            </motion.div>

            {/* Discount Coupon Card */}
            <motion.div 
              variants={itemVariants} 
              className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-glowy-pink-soft/10 to-glowy-lavender/30 border border-glowy-pink-soft/20 flex flex-col space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-glowy-pink-deep uppercase tracking-wider">Tu Regalo de Bienvenida</span>
                <span className="px-2 py-0.5 rounded-full bg-glowy-pink-deep text-white text-[9px] font-bold">10% OFF</span>
              </div>
              <p className="text-[11px] text-slate-600 font-light">Usa este cupón en tu primera compra escribiendo en WhatsApp.</p>
              <div className="flex items-center justify-between bg-white rounded-xl p-2 border border-slate-100 shadow-sm">
                <span className="font-mono font-bold text-slate-800 text-sm pl-1">GLOWY10</span>
                <button
                  onClick={handleCopyCoupon}
                  className="p-1.5 rounded-lg bg-slate-50 hover:bg-glowy-pink-soft/10 text-slate-500 hover:text-glowy-pink-deep transition-all flex items-center justify-center cursor-pointer"
                  aria-label="Copiar cupón"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="my-4 border-t border-border" />

            {/* Navigation Links */}
            <nav className="flex-1 space-y-1" role="navigation">
              {navItems.map((item, index) => (
                <React.Fragment key={index}>
                  {item.isSeparator && <motion.div variants={itemVariants} className="h-6" />}
                  <motion.a
                    href={item.href}
                    variants={itemVariants}
                    className="group flex items-center rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-glowy-pink-deep hover:bg-glowy-pink-soft/5 transition-all"
                  >
                    <span className="mr-3 h-5 w-5 text-slate-400 group-hover:text-glowy-pink-deep transition-colors">{item.icon}</span>
                    <span>{item.label}</span>
                    <ChevronRight className="ml-auto h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </motion.a>
                </React.Fragment>
              ))}
            </nav>

            {/* Logout Button */}
            <motion.div variants={itemVariants} className="mt-4 border-t border-slate-100 pt-4">
              <button
                onClick={logoutItem.onClick}
                className="group flex w-full items-center rounded-2xl px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 cursor-pointer"
              >
                <span className="mr-3 h-5 w-5">{logoutItem.icon}</span>
                <span>{logoutItem.label}</span>
              </button>
            </motion.div>
          </>
        ) : (
          // UNREGISTERED / REGISTRATION FORM VIEW
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-4">
              <motion.div variants={itemVariants} className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-full bg-glowy-pink-soft/10 text-glowy-pink-deep mb-1">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="serif-title text-xl font-bold text-slate-800">Tu Cuenta GLOWYSKIN</h3>
                <p className="text-xs text-slate-500 font-light">
                  Crea tu cuenta personalizada y recibe de inmediato un **10% de descuento** en tu primera compra de k-beauty.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="border-t border-slate-100 my-2" />

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                {/* Name Input */}
                <motion.div variants={itemVariants} className="space-y-1">
                  <label htmlFor="reg-name" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Nombre Completo</label>
                  <input
                    id="reg-name"
                    type="text"
                    required
                    placeholder="Tu nombre..."
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-glowy-pink-soft text-xs"
                  />
                </motion.div>

                {/* Email Input */}
                <motion.div variants={itemVariants} className="space-y-1">
                  <label htmlFor="reg-email" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Correo Electrónico</label>
                  <input
                    id="reg-email"
                    type="email"
                    required
                    placeholder="ejemplo@correo.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-glowy-pink-soft text-xs"
                  />
                </motion.div>

                {/* Avatar Selector (10 Emojis Coreanos) */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Elige tu avatar K-beauty</label>
                  <div className="grid grid-cols-5 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    {AVATAR_OPTIONS.map(av => (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => setSelectedAv(av.emoji)}
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all border-2 active:scale-95 cursor-pointer hover:bg-white",
                          selectedAv === av.emoji ? "border-glowy-pink-deep bg-white scale-105 shadow-sm ring-2 ring-glowy-pink-soft/20" : "border-transparent opacity-60 hover:opacity-100"
                        )}
                        title={av.name}
                      >
                        {av.emoji}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Submit Register */}
                <motion.div variants={itemVariants} className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 hover:bg-glowy-pink-deep text-white text-xs font-semibold tracking-widest uppercase rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                  >
                    CREAR MI PERFIL · ACTIVAR 10% OFF
                  </button>
                </motion.div>
              </form>
            </div>
            
            <motion.div variants={itemVariants} className="text-center pt-4">
              <span className="text-[9px] text-slate-400 font-light">
                Al registrarte aceptas recibir promociones de K-Beauty.
              </span>
            </motion.div>
          </div>
        )}
      </motion.aside>
    );
  }
);

UserProfileSidebar.displayName = 'UserProfileSidebar';
