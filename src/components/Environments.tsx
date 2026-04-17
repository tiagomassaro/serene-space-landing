import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import brinquedoteca1 from "@/assets/ambiente-brinquedoteca-1.jpeg";
import brinquedoteca2 from "@/assets/ambiente-brinquedoteca-2.jpeg";
import clinico1 from "@/assets/ambiente-clinico-1.jpeg";
import clinico2 from "@/assets/ambiente-clinico-2.jpeg";
import externo from "@/assets/ambiente-externo.jpeg";

type Category = "brinquedoteca" | "clinico" | "externo";

type Photo = {
  src: string;
  alt: string;
  caption: string;
  category: Category;
};

const PHOTOS: Photo[] = [
  {
    src: brinquedoteca1,
    alt: "Brinquedoteca acolhedora com brinquedos coloridos",
    caption: "Onde o brincar se transforma em aprendizado.",
    category: "brinquedoteca",
  },
  {
    src: brinquedoteca2,
    alt: "Estante organizada com jogos e materiais lúdicos",
    caption: "Onde o brincar se transforma em aprendizado.",
    category: "brinquedoteca",
  },
  {
    src: clinico1,
    alt: "Consultório clínico com ambiente sereno",
    caption: "Espaço sereno para escuta e acolhimento.",
    category: "clinico",
  },
  {
    src: clinico2,
    alt: "Sala de atendimento com decoração acolhedora",
    caption: "Espaço sereno para escuta e acolhimento.",
    category: "clinico",
  },
  {
    src: externo,
    alt: "Espaço externo de arte com plantas e cavaletes",
    caption: "Liberdade e criatividade em nossas atividades ao ar livre.",
    category: "externo",
  },
];

const TABS: { value: Category | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "brinquedoteca", label: "Brinquedoteca" },
  { value: "clinico", label: "Consultório Clínico" },
  { value: "externo", label: "Espaço de Arte Externo" },
];

export function Environments() {
  const [activeTab, setActiveTab] = useState<Category | "todos">("todos");

  const filtered =
    activeTab === "todos"
      ? PHOTOS
      : PHOTOS.filter((p) => p.category === activeTab);

  return (
    <section id="ambientes" className="bg-sage-light py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Ambientes que Acolhem
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Cada detalhe do nosso espaço em Perdizes foi planejado para oferecer
            segurança, liberdade e o estímulo certo para cada fase do
            desenvolvimento.
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as Category | "todos")}
          className="flex flex-col items-center"
        >
          <TabsList className="mb-10 flex h-auto flex-wrap justify-center gap-2 rounded-2xl bg-card/60 p-2">
            {TABS.map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="rounded-xl px-4 py-2 text-sm font-medium transition-all duration-500 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <EnvironmentsCarousel key={activeTab} photos={filtered} />
        </Tabs>
      </div>
    </section>
  );
}

function EnvironmentsCarousel({ photos }: { photos: Photo[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative w-full max-w-5xl animate-fade-in">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="min-w-0 shrink-0 grow-0 basis-full pl-4 first:pl-0 md:basis-1/2 lg:basis-1/2"
            >
              <figure className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg shadow-foreground/10 transition-all duration-500 hover:shadow-xl hover:shadow-foreground/15">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 via-foreground/40 to-transparent p-5 backdrop-blur-[2px]">
                  <p className="font-display text-base text-background md:text-lg">
                    {photo.caption}
                  </p>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => emblaApi?.scrollPrev()}
        aria-label="Foto anterior"
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-gold text-warm shadow-lg transition-all hover:bg-gold/90 hover:scale-110 md:-left-6 md:h-12 md:w-12"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => emblaApi?.scrollNext()}
        aria-label="Próxima foto"
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-gold text-warm shadow-lg transition-all hover:bg-gold/90 hover:scale-110 md:-right-6 md:h-12 md:w-12"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Dots */}
      <div className="mt-6 flex justify-center gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir para foto ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className={cn(
              "h-2.5 rounded-full transition-all duration-500",
              i === selectedIndex
                ? "w-8 bg-primary"
                : "w-2.5 bg-primary/30 hover:bg-primary/50",
            )}
          />
        ))}
      </div>
    </div>
  );
}
