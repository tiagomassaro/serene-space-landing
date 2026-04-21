import * as React from "react";

/**
 * Observa um elemento e adiciona a classe `is-visible` quando entra na viewport.
 * Usado em conjunto com `.reveal` (definido em styles.css) para fade-in on scroll.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
) {
  const ref = React.useRef<T | null>(null);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respeita preferência de redução de movimento
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/**
 * Wrapper conveniente: renderiza um elemento com fade-in on scroll.
 */
type RevealProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "article" | "li";
  delay?: number; // ms
};

export function Reveal({ as: Tag = "div", delay = 0, className = "", style, children, ...rest }: RevealProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}