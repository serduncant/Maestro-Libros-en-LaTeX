import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface OptionCardProps {
  selected: boolean;
  onClick: () => void;
  emoji?: string;
  label: string;
  desc?: string;
  flag?: string;
  compact?: boolean;
}

export function OptionCard({ selected, onClick, emoji, label, desc, flag, compact }: OptionCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        'relative flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200',
        compact ? 'p-2.5' : 'p-3 sm:p-4',
        selected
          ? 'border-brand-500 bg-brand-500/15 shadow-lg shadow-brand-500/20'
          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
      )}
    >
      {selected && (
        <motion.div
          layoutId="selection-glow"
          className="absolute inset-0 rounded-xl border-2 border-brand-400"
          initial={false}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
      {(emoji || flag) && (
        <span className={cn('text-xl flex-shrink-0', compact && 'text-lg')}>
          {flag || emoji}
        </span>
      )}
      <div className="min-w-0">
        <div className={cn(
          'font-semibold text-white truncate',
          compact ? 'text-sm' : 'text-sm sm:text-base'
        )}>
          {label}
        </div>
        {desc && (
          <div className="text-xs text-white/50 mt-0.5 line-clamp-2">{desc}</div>
        )}
      </div>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-brand-400 shadow-sm shadow-brand-400/50"
        />
      )}
    </motion.button>
  );
}
