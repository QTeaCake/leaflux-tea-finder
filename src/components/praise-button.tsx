'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from './icons';
import { cn } from '@/lib/utils';

type Props = {
  shopId: string;
  isPraised: boolean;
  onPraise: (shopId: string) => void;
};

const NUM_STARS = 8;

export function PraiseButton({ shopId, isPraised, onPraise }: Props) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isPraised || isAnimating) return;

    setIsAnimating(true);
    onPraise(shopId);
  };

  useEffect(() => {
    if (!isAnimating) {
      return;
    }
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 800); // Corresponds to the animation duration in tailwind.config.ts
    return () => clearTimeout(timer);
  }, [isAnimating]);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={handleClick}
        disabled={isPraised || isAnimating}
        className="shrink-0 transition-transform duration-100 ease-in-out active:scale-95"
      >
        <Icons.star
          className={cn(
            'w-4 h-4 mr-2 text-yellow-400 transition-colors duration-300',
            isPraised || isAnimating ? 'fill-yellow-400' : 'fill-transparent'
          )}
        />
        <span>{isPraised ? 'Praised!' : 'Praise'}</span>
      </Button>
      {isAnimating && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {Array.from({ length: NUM_STARS }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                transform: `rotate(${(360 / NUM_STARS) * i}deg)`,
              }}
            >
              <Icons.star
                className="w-3 h-3 text-yellow-400 fill-yellow-400 animate-praise-star-burst"
                style={{ animationDelay: `${i * 0.03}s` }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
