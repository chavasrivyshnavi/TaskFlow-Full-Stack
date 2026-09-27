import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Spinner({ size = 20, color }) {
  return <Loader2 size={size} className="spin" color={color || 'var(--primary)'} />;
}
