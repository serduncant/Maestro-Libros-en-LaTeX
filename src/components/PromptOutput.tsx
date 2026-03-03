import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Download, RotateCcw, Sparkles } from 'lucide-react';

interface PromptOutputProps {
  prompt: string;
  onReset: () => void;
}

export function PromptOutput({ prompt, onReset }: PromptOutputProps) {
  const [copied, setCopied] = useState(false);
  const textRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = prompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([prompt], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mega-prompt-latex-book.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const wordCount = prompt.split(/\s+/).length;
  const lineCount = prompt.split('\n').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-5xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-5 w-5 text-accent-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Tu Mega Prompt está listo</h2>
          </div>
          <p className="text-white/50 text-sm">
            {wordCount.toLocaleString()} palabras · {lineCount} líneas · Optimizado 10x
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 hover:bg-brand-600 transition-colors"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  ¡Copiado!
                </motion.div>
              ) : (
                <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                  <Copy className="h-4 w-4" />
                  Copiar
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">.md</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline">Nuevo</span>
          </motion.button>
        </div>
      </div>

      {/* Prompt Content */}
      <div className="relative rounded-2xl border border-white/10 bg-surface-950/80 backdrop-blur-xl overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-white/30 font-mono ml-2">mega-prompt-latex-book.md</span>
        </div>
        
        {/* Content */}
        <div className="overflow-auto max-h-[60vh] p-4 sm:p-6">
          <pre
            ref={textRef}
            className="text-sm text-white/80 font-mono leading-relaxed whitespace-pre-wrap break-words"
          >
            {prompt}
          </pre>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface-950 to-transparent pointer-events-none" />
      </div>

      {/* Tips */}
      <div className="mt-6 rounded-xl border border-brand-500/20 bg-brand-500/5 p-4">
        <h3 className="text-sm font-semibold text-brand-300 mb-2">💡 Cómo usar este prompt</h3>
        <ol className="text-xs text-white/60 space-y-1.5">
          <li>1. Copia el prompt completo (botón de arriba)</li>
          <li>2. Pégalo en ChatGPT (GPT-4 recomendado), Claude, o tu IA favorita</li>
          <li>3. La IA te dará la FASE 1 completa — estructura + archivos base</li>
          <li>4. Cuando termines de copiar la Fase 1, escribe: <code className="bg-white/10 px-1.5 py-0.5 rounded text-brand-300 font-mono">"listo capítulo 1"</code></li>
          <li>5. Repite para cada capítulo. Al final escribe: <code className="bg-white/10 px-1.5 py-0.5 rounded text-brand-300 font-mono">"finalizar libro"</code></li>
        </ol>
      </div>
    </motion.div>
  );
}
