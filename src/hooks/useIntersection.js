import { useCallback, useEffect, useRef } from "react";

const useIntersection = (onIntersect) => {
  const defaultOption = {
    root: null,
    threshold: 0.5,
    rootMargin: "0px",
  };

  const ref = useRef(null);

  const checkIntersection = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        onIntersect();
        //observer.unobserve(entry.target);
      }
    },
    [onIntersect]
  );

  useEffect(() => {
    let observer;
    if (ref.current) {
      observer = new IntersectionObserver(checkIntersection, {
        ...defaultOption,
      });
      observer.observe(ref.current);
    }
    return () => observer && observer.disconnect();
  }, [
    ref,
    defaultOption.root,
    defaultOption.threshold,
    defaultOption.rootMargin,
    checkIntersection,
  ]);

  return ref;
};

export default useIntersection;
