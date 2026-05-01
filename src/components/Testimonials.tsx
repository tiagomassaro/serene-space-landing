import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Star, ExternalLink } from "lucide-react";
import { Reveal } from "@/hooks/use-reveal";

type Testimonial = {
  name: string;
  text: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Caroline Sgambato",
    text: "A Mara acompanha minha filha há alguns meses, e já observamos melhorias significativas nesse período. Além de ser extremamente atenta e cuidadosa, ela sempre traz recursos e estratégias que contribuem de forma efetiva para o desenvolvimento do tratamento. Tem sido uma grande aliada da nossa família, e sentimos segurança em contar com seu apoio para promover mudanças positivas no comportamento da nossa filha.",
  },
  {
    name: "Julia Coaracy",
    text: "Estamos realmente muito felizes de ter a Mara acompanhando e nos ajudando no desenvolvimento da minha filha. O olhar atento, as observações, os jogos que trazem a tona diferentes reações através de atividades lúdicas que ensinam a ganhar e a perder, que ensinam assim a lidar com as emoções junto com muitas conversas. Quando conhecemos a Mara estávamos realmente com problemas e ela tem tido um papel crucial para todas as conquistas que a minha filha conseguiu alcançar. Somos gratos e queremos ela bem pertinho da gente.",
  },
  {
    name: "Giovanna Carmo",
    text: "Recomendo de olhos fechados! Sou muito grata pelo excelente trabalho e parceria durante os anos que estamos juntas.",
  },
  {
    name: "Marisa Giannini",
    text: "Desde que meu filho iniciou a terapia com a Mara, tivemos grandes avanços, especialmente no comportamento. Seu suporte tem sido fundamental para nossa família.",
  },
  {
    name: "Paula Quaggio",
    text: "Profissional excelente, tem trazido ótimos resultados no comportamento da nossa filha.",
  },
  {
    name: "Leni Carmo",
    text: "Foi ótimo, super indico. É uma ótima profissional.",
  },
];

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=psicologa+infantil+perdizes&newwindow=1&sca_esv=149386f24b38c522&hl=pt-BR&sxsrf=ANbL-n48OKcPbCF87WytAqzgeSHsrLLjNg:1777591331927&udm=1&lsack=I-TzafGlOJ3m1sQPluLq4Ao&sa=X&ved=2ahUKEwixw5Tf25aUAxUds5UCHRaxGqwQjGp6BAgoEAA&biw=1366&bih=599&dpr=1#sv=CAESzQEKuQEStgEKd0FNbjMteVQ0UHpsVnNzT2lTdmNTeHZiQkppQy1fTGQzbmZ0aEVFalNHNk9FQ01GcFRNYnBrR3FYVThvQ1FYVnp6aUNwcTNSX29lYWhibDVsTW5NS2pvR3Z3U2RvMzN0Q05MLWpZbHNzT3d3RHR6ZG5hRFRHOUhFEhdOdVR6YWRYd0F0dksxc1FQaE4tMjRBRRoiQUpLTEZtS0UzRG9hdnNHdVBHVXBXWmlRYm43aUNnelFTURIEODA1MRoBMyoAMAA4AUAAGAAgyfa9tQlKAhAC";

/** Logo Google oficial (multicolor) — SVG inline. */
function GoogleLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Google"
      role="img"
    >
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}

function Stars() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4"
          style={{ color: "#F4B400", fill: "#F4B400" }}
          aria-hidden
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  t,
  onReadMore,
}: {
  t: Testimonial;
  onReadMore: () => void;
}) {
  // ~340 chars ≈ 5 linhas no card. Acima disso, usa "Ler mais".
  const isLong = t.text.length > 280;

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-border/50 bg-card/95 shadow-sm backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 tap-press">
      <CardContent className="flex h-full flex-col p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-display text-base font-semibold text-foreground">
              {t.name}
            </h3>
            <div className="mt-1">
              <Stars />
            </div>
          </div>
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-border/60"
            aria-label="Avaliação do Google"
            title="Avaliação do Google"
          >
            <GoogleLogo className="h-5 w-5" />
          </span>
        </div>

        <div className="relative flex-1">
          <p
            className="text-sm leading-relaxed text-muted-foreground"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 5,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            “{t.text}”
          </p>
          {isLong && (
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-card to-transparent"
              aria-hidden
            />
          )}
        </div>

        {isLong && (
          <button
            type="button"
            onClick={onReadMore}
            className="mt-3 self-start text-sm font-medium text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
          >
            Ler mais
          </button>
        )}
      </CardContent>
    </Card>
  );
}

export function Testimonials() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const active = openIndex !== null ? TESTIMONIALS[openIndex] : null;

  return (
    <section
      id="depoimentos"
      className="relative overflow-hidden py-16 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-gold-light blur-3xl opacity-50"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-sage-soft blur-3xl opacity-50"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4">
        <Reveal className="mb-12 text-center">
          <span className="mb-3 inline-block text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Depoimentos
          </span>
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            O que dizem as famílias
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Histórias reais de famílias que confiam no nosso trabalho. Avaliações
            verificadas no Google.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              dragFree: false,
              containScroll: "trimSnaps",
            }}
            className="px-2 md:px-12"
          >
            <CarouselContent className="-ml-4">
              {TESTIMONIALS.map((t, i) => (
                <CarouselItem
                  key={t.name}
                  className="pl-4 sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full py-2">
                    <TestimonialCard t={t} onReadMore={() => setOpenIndex(i)} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

          {/* Dots / indicadores */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir para depoimento ${i + 1}`}
                onClick={() => api?.scrollTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  selectedIndex === i
                    ? "w-6 bg-primary"
                    : "w-2 bg-primary/30 hover:bg-primary/50"
                }`}
              />
            ))}
          </div>
        </Reveal>

        <Reveal delay={200} className="mt-10 flex justify-center">
          <Button
            asChild
            className="group relative flex items-center gap-2 overflow-hidden rounded-2xl bg-primary px-8 py-6 text-base font-medium text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 tap-press-cta"
          >
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GoogleLogo className="relative z-10 h-5 w-5" />
              <span className="relative z-10">Ver mais avaliações no Google</span>
              <ExternalLink className="relative z-10 h-4 w-4" />
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            </a>
          </Button>
        </Reveal>
      </div>

      {/* Modal com depoimento completo */}
      <Dialog
        open={openIndex !== null}
        onOpenChange={(o) => !o && setOpenIndex(null)}
      >
        <DialogContent className="max-w-lg rounded-2xl border-border/50 bg-card">
          {active && (
            <>
              <div className="flex items-start justify-between gap-3 pr-8">
                <div className="min-w-0">
                  <DialogTitle className="font-display text-xl text-foreground">
                    {active.name}
                  </DialogTitle>
                  <div className="mt-2">
                    <Stars />
                  </div>
                </div>
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-border/60"
                  aria-label="Avaliação do Google"
                >
                  <GoogleLogo className="h-6 w-6" />
                </span>
              </div>
              <DialogDescription className="mt-4 max-h-[60vh] overflow-y-auto text-base leading-relaxed text-foreground/90">
                “{active.text}”
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}