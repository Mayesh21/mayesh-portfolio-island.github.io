import { useState, useEffect, useRef } from 'react';

/**
 * Typing animation hook.
 * @param {string[]} texts - Array of strings to type through
 * @param {number} typingSpeed - ms per character typed
 * @param {number} deletingSpeed - ms per character deleted
 * @param {number} pauseDuration - ms to pause after finishing a word
 */
const useTypingEffect = (texts, typingSpeed = 80, deletingSpeed = 40, pauseDuration = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const textIndex = useRef(0);
  const charIndex = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const currentText = texts[textIndex.current];

    const tick = () => {
      if (isTyping) {
        // Typing forward
        if (charIndex.current < currentText.length) {
          charIndex.current++;
          setDisplayText(currentText.slice(0, charIndex.current));
          timeoutRef.current = setTimeout(tick, typingSpeed);
        } else {
          // Finished typing, pause then delete
          timeoutRef.current = setTimeout(() => {
            setIsTyping(false);
            tick();
          }, pauseDuration);
        }
      } else {
        // Deleting backward
        if (charIndex.current > 0) {
          charIndex.current--;
          setDisplayText(currentText.slice(0, charIndex.current));
          timeoutRef.current = setTimeout(tick, deletingSpeed);
        } else {
          // Finished deleting, move to next text
          textIndex.current = (textIndex.current + 1) % texts.length;
          setIsTyping(true);
          timeoutRef.current = setTimeout(tick, typingSpeed);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, typingSpeed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isTyping, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return { displayText, isTyping };
};

export default useTypingEffect;
