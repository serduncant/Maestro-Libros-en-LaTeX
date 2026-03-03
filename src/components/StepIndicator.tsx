import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../utils/cn';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.15 : 1,
                  backgroundColor: isCompleted ? '#6c5ce7' : isCurrent ? '#6c5ce7' : 'rgba(255,255,255,0.1)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all',
                  isCompleted || isCurrent ? 'text-white shadow-lg shadow-brand-500/30' : 'text-white/40 border border-white/10'
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
              </motion.div>
              <span className={cn(
                'mt-1.5 text-[10px] font-medium hidden sm:block',
                isCurrent ? 'text-brand-300' : isCompleted ? 'text-white/60' : 'text-white/30'
              )}>
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                'mx-1 sm:mx-2 h-0.5 w-6 sm:w-10 rounded-full transition-colors',
                isCompleted ? 'bg-brand-500' : 'bg-white/10'
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}
