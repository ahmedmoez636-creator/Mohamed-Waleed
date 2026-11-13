import React, { useMemo, useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface ParentGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ParentGateModal: React.FC<ParentGateModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const challenge = useMemo(() => {
    const a = 12 + Math.floor(Math.random() * 14);
    const b = 13 + Math.floor(Math.random() * 15);
    return { a, b, answer: a + b };
  }, [isOpen]);

  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(input.trim()) === challenge.answer) {
      playClickSound();
      setInput('');
      setError(false);
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 animate-gentle-pop">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-emerald-700 font-display font-extrabold text-xl">
            <ShieldCheck className="w-6 h-6" />
            <span>منطقة ولي الأمر فقط</span>
          </div>
          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-slate-600 text-sm sm:text-base mb-5 leading-relaxed">
          لحماية إعدادات التطبيق ولوحة المتابعة من دخول محمد بالخطأ، يرجى حل المسألة التالية للمتابعة:
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-2xl bg-sky-50 border border-sky-200 p-4 text-center">
            <p className="text-sm font-bold text-sky-800 mb-1">ما ناتج الجمع؟</p>
            <p className="font-display text-3xl font-black text-slate-900 tabular-nums" dir="ltr">
              {challenge.a} + {challenge.b} = ?
            </p>
          </div>

          <input
            type="number"
            inputMode="numeric"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            placeholder="اكتب الإجابة بالأرقام..."
            autoFocus
            className="w-full rounded-2xl border-2 border-slate-200 focus:border-sky-500 px-4 py-3 text-center text-xl font-bold outline-none tabular-nums"
          />

          {error && (
            <p className="text-sm font-bold text-rose-600 text-center">
              الإجابة غير صحيحة، حاول مرة أخرى ({challenge.a} + {challenge.b}).
            </p>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 text-base transition cursor-pointer"
            >
              دخول للوحة ولي الأمر
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 px-5 text-base transition cursor-pointer"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
