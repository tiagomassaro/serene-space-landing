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

    // Fallback: se IntersectionObserver não estiver disponível, mostra imediatamente.
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }

    // Se o elemento já está dentro do viewport ao montar (conteúdo above-the-fold),
    // revela imediatamente — evita conteúdo invisível dentro do iframe do preview.
    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh && rect.bottom > 0) {
      node.classList.add("is-visible");
      return;
    }

    // Safety net: garante visibilidade mesmo se o observer não disparar.
    const safety = window.setTimeout(() => {
      node.classList.add("is-visible");
    }, 1500);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(node);
    return () => {
      window.clearTimeout(safety);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/**
 * Wrapper conveniente: renderiza uma <div> com fade-in on scroll.
 */
type RevealProps = React.HTMLAttributes<HTMLDivElement> & {
  delay?: number; // ms
};

export function Reveal({ delay = 0, className = "", style, children, ...rest }: RevealProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}