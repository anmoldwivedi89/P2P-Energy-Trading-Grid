import React, { useEffect, useState } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Character-by-character typewriter effect that animates text from left to right on page load.
 */
export const TypewriterText = ({
  text,
  words,
  className,
  cursorClassName,
  delay = 0.1,
  speed = 0.035,
  showCursor = true,
}) => {
  // If words array is provided (array of { text: string, className?: string })
  // Otherwise parse standard text string
  const wordsArray = words
    ? words
    : (text || '').split(' ').map((word) => ({ text: word }));

  return (
    <span className={cn('inline-block', className)}>
      <motion.span
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: speed,
              delayChildren: delay,
            },
          },
        }}
        className="inline"
      >
        {wordsArray.map((wordObj, wordIndex) => {
          return (
            <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap">
              {Array.from(wordObj.text).map((char, charIndex) => (
                <motion.span
                  key={`char-${wordIndex}-${charIndex}`}
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: -6,
                      filter: 'blur(3px)',
                    },
                    visible: {
                      opacity: 1,
                      x: 0,
                      filter: 'blur(0px)',
                      transition: {
                        duration: 0.16,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  className={cn('inline-block transition-colors', wordObj.className)}
                >
                  {char}
                </motion.span>
              ))}
              {wordIndex < wordsArray.length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          );
        })}
      </motion.span>
      {showCursor && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 0.75,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className={cn(
            'inline-block ml-1.5 w-[3px] sm:w-[4px] h-[0.9em] align-middle bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.9)]',
            cursorClassName
          )}
        />
      )}
    </span>
  );
};

/**
 * Dynamic Typewriter Loop: Types text letter by letter from left to right,
 * pauses, and loops through a list of rotating phrases.
 */
export const TypewriterRotating = ({
  phrases = [],
  className,
  cursorClassName,
  typingSpeed = 65,
  deletingSpeed = 35,
  pauseDuration = 2200,
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;

    const fullPhrase = phrases[currentPhraseIndex];
    let timer;

    if (!isDeleting && currentText === fullPhrase) {
      // Pause at full word before deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && currentText === '') {
      // Move to next phrase
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    } else {
      const speed = isDeleting ? deletingSpeed : typingSpeed;
      timer = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting
            ? fullPhrase.substring(0, prev.length - 1)
            : fullPhrase.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={cn('inline-flex items-center', className)}>
      <span>{currentText}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={cn(
          'inline-block ml-1 w-[3px] h-[1em] align-middle bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.9)]',
          cursorClassName
        )}
      />
    </span>
  );
};

/**
 * Aceternity-style Smooth Left-to-Right Reveal Typewriter Effect
 */
export const TypewriterEffectSmooth = ({
  words = [],
  className,
  cursorClassName,
  delay = 0.2,
  duration = 2.5,
}) => {
  return (
    <div className={cn('flex items-center justify-center my-2', className)}>
      <motion.div
        className="overflow-hidden pb-1"
        initial={{
          width: '0%',
        }}
        animate={{
          width: 'fit-content',
        }}
        transition={{
          duration: duration,
          ease: 'easeInOut',
          delay: delay,
        }}
      >
        <div
          className="text-3xl sm:text-5xl md:text-6xl font-semibold whitespace-nowrap"
          style={{ whiteSpace: 'nowrap' }}
        >
          {words.map((word, idx) => (
            <span key={`word-smooth-${idx}`} className={cn('inline-block', word.className)}>
              {word.text}&nbsp;
            </span>
          ))}
        </div>
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className={cn(
          'block rounded-sm w-[4px] h-8 sm:h-12 md:h-14 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]',
          cursorClassName
        )}
      />
    </div>
  );
};

export default TypewriterText;
