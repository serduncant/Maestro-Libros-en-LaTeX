import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (val: boolean) => void;
  label: string;
  emoji: string;
}

export function ToggleSwitch({ checked, onChange, label, emoji }: ToggleSwitchProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        'flex items-center gap-3 rounded-xl border p-3 sm:p-4 transition-all w-full text-left',
        checked
          ? 'border-brand-500/50 bg-brand-500/10'
          : 'border-white/10 bg-white/5 hover:bg-white/8'
      )}
    >
      <span className="text-xl flex-shrink-0">{emoji}</span>
      <span className="text-sm font-medium text-white flex-1">{label}</span>
      <div className={cn(
        'relative h-6 w-11 rounded-full transition-colors flex-shrink-0',
        checked ? 'bg-brand-500' : 'bg-white/20'
      )}>
        <motion.div
          initial={false}
          animate={{ x: checked ? 20 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm"
        />
      </div>
    </button>
  );
}
