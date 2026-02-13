'use client';

import { Icons } from './icons';

export function LeafLogoAnimation() {
  return (
    <div className="relative w-8 h-8">
      <Icons.logo className="w-8 h-8 text-primary animate-leaf-sway origin-bottom" />
    </div>
  );
}
