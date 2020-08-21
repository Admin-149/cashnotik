import { RefObject, useEffect, useRef, useState } from 'react';

export function useHover(): [RefObject<HTMLElement>, boolean] {
  const [value, setValue] = useState(false);

  const ref = useRef<HTMLElement>(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseLeave = () => setValue(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return [ref, value];
}
