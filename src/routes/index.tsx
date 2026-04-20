import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import logoEspaco from "@/assets/logo-espaco.png";
import logoPequeno from "@/assets/logo-pequeno.png";
import fotoSobreMim from "@/assets/foto-sobremim.jpeg";
import headerLogo from "@/assets/header-logo.png";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Brain,
  Heart,
  Sparkles,
  Menu,
  MessageCircle,
  Instagram,
  Mail,
  Phone,
  CalendarIcon,
  GraduationCap,
  BookOpen,
  Activity,
  Handshake,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Environments } from "@/components/Environments";

export const Route = createFileRoute("/")({
  component: Index,
});

const WHATSAPP_NUMBER = "5511970891810";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta.`;

const NAV_ITEMS = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre Mim", href: "#sobre" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Áreas de Atuação", href: "#areas" },
  { label: "Abordagem", href: "#abordagem" },
  { label: "Ambientes", href: "#ambientes" },
  { label: "FAQ", href: "#faq" },
];

const SPECIALTIES = [
  {
    icon: Heart,
    title: "Psicoterapia infantil e na adolescência",
    description:
      "Espaço de escuta cuidadosa para crianças e adolescentes elaborarem emoções, vínculos e desafios próprios de cada fase do desenvolvimento.",
  },
  {
    icon: BookOpen,
    title: "Psicopedagogia clínica e orientação de pais",
    description:
      "Avaliação e intervenção nas dificuldades de aprendizagem, com orientação aos pais para fortalecer a parceria entre família, escola e clínica.",
  },
  {
    icon: Brain,
    title: "Neuropsicologia",
    description:
      "Avaliação das funções cognitivas — atenção, memória, linguagem e funções executivas — para compreender o funcionamento e direcionar o cuidado.",
  },
  {
    icon: Handshake,
    title: "Parceria com escolas e equipes de saúde",
    description:
      "Trabalho em rede com professores, neuropediatras e demais profissionais, porque cuidar de uma criança é sempre uma construção coletiva.",
  },
];

const FORMACOES = [
  "Especialização em Psicoterapia da Criança e do Adolescente — Sedes Sapientae",
  "Psicopedagogia — Faculdade Oswaldo Cruz",
  "Pós-graduação em Neuropsicologia",
  "Formação em ABA — Neurosaber",
];

const AREAS_ATUACAO = [
  "TEA — Transtorno do Espectro Autista",
  "TDAH — Transtorno do Déficit de Atenção e Hiperatividade",
  "Enurese noturna",
  "Tricotilomania",
  "Transtornos alimentares",
  "Crises comportamentais e emocionais",
];

const FAQ_ITEMS = [
  { question: "Quanto tempo dura cada sessão?", answer: "As sessões têm duração de 45 minutos. Com crianças pequenas, trabalho em blocos de 25 minutos — sempre seguidos de uma devolutiva para o responsável, que é parte essencial do processo" },
  { question: "Atende por convênio?", answer: "Não atendo por convênio. Emito nota fiscal para que você possa solicitar reembolso junto ao seu plano de saúde." },
  { question: "Como funciona a primeira sessão?", answer: "O processo começa com uma anamnese detalhada com os pais, onde colho informações sobre a gestação, parto, primeiros anos de vida e a queixa atual. Em seguida, realizo sessões de observação lúdica com a criança e, quando indicado, aplico testes de personalidade. Todo esse processo — que ocorre entre a 4ª e a 10ª sessão — culmina em uma devolutiva completa do psicodiagnóstico." },
  { question: "Atende online ou presencial?", answer: "Crianças são atendidas exclusivamente de forma presencial. Adolescentes e adultos podem ser atendidos de forma presencial, online ou híbrida." },
  { question: "Com que frequência devo fazer terapia?", answer: "O mais indicado é uma sessão por semana, especialmente no início do processo. Com o tempo, podemos ajustar a frequência conforme sua evolução." },
];

function scrollTo(href: string) {
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ─── Header ─── */
function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1">
        <button onClick={() => scrollTo("#inicio")} className="flex items-center" aria-label="Espaço Terapêutico Perdizes">
          <img src={headerLogo} alt="Espaço Terapêutico Perdizes" className="block h-[68px] w-auto md:h-20" />
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="group relative px-4 py-2 text-[13px] font-medium tracking-wide text-foreground/70 transition-colors duration-300 hover:text-primary"
            >
              <span className="relative z-10 text-sm">{item.label}</span>
              <span className="pointer-events-none absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-500 ease-out group-hover:w-[80%]" />
            </button>
          ))}
          <Button
            onClick={() => scrollTo("#agendar")}
            className="group relative ml-4 overflow-hidden rounded-full bg-primary px-7 py-5 text-sm font-medium tracking-wide text-primary-foreground shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.35)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-primary hover:shadow-[0_10px_30px_-6px_hsl(var(--primary)/0.55)]"
          >
            <span className="relative z-10">Agendar Consulta</span>
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
          </Button>
        </nav>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background">
            <SheetTitle className="font-display">Menu</SheetTitle>
            <nav className="mt-8 flex flex-col gap-6">
              {NAV_ITEMS.map((item) => (
                <button key={item.href} onClick={() => { scrollTo(item.href); setOpen(false); }} className="text-left text-lg font-medium text-foreground">
                  {item.label}
                </button>
              ))}
              <Button onClick={() => { scrollTo("#agendar"); setOpen(false); }} className="mt-4 rounded-2xl bg-primary text-primary-foreground">
                Agendar Consulta
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* Decorative sage accents */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-sage-soft blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-gold-light blur-3xl" aria-hidden />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 py-16 md:flex-row md:gap-16 md:py-24">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-sage-light px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Psicologia Clínica em Perdizes
          </span>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Acolhendo emoções, <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">transformando</span> o aprender.
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
            Psicoterapia e Psicopedagogia clínica para crianças. No Espaço Terapêutico Perdizes, ajudamos os pequenos a construírem uma base sólida para uma vida mais leve e feliz.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row md:items-start">
            <Button
              onClick={() => scrollTo("#agendar")}
              className="group relative flex items-center gap-2 overflow-hidden rounded-2xl bg-primary px-8 py-6 text-base font-medium text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40"
            >
              <MessageCircle className="relative z-10 h-5 w-5" />
              <span className="relative z-10">Agendar pelo WhatsApp</span>
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            </Button>
          </div>
        </div>
        <div className="flex flex-1 justify-center mx-0 ml-0">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-sage-medium via-sage-soft to-gold-light blur-xl opacity-70" aria-hidden />
            <div className="relative aspect-square w-72 overflow-hidden rounded-3xl bg-primary/20 shadow-xl md:w-96 flex items-center justify-center p-2 ring-1 ring-primary/10 transition-all duration-700 ease-out hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/30">
              <img src={logoEspaco} alt="Espaço Terapêutico Perdizes" className="w-full h-full object-contain rounded-xl shadow-2xl opacity-65" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Especialidades ─── */
function Specialties() {
  return (
    <section id="especialidades" className="bg-secondary/50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Especialidades</h2>
          <p className="mt-4 text-muted-foreground">Áreas em que posso te ajudar a encontrar equilíbrio e bem-estar</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SPECIALTIES.map((s) => (
            <Card key={s.title} className="rounded-2xl border-border/50 bg-card shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-light">
                  <s.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Sobre Mim ─── */
function About() {
  return (
    <section id="sobre" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16 md:items-start">
        <div className="flex justify-center md:w-1/3 md:sticky md:top-24">
          <div className="aspect-square w-72 overflow-hidden rounded-3xl bg-primary/20 shadow-xl md:w-96 flex items-center justify-center p-2 transition-all duration-700 ease-out hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/30">
            <img src={fotoSobreMim} alt="Maria Colomba Raccuia Ferreira - Psicóloga Clínica" className="w-full h-full object-cover rounded-xl shadow-2xl opacity-90" />
          </div>
        </div>
        <div className="flex-1 space-y-5 text-center md:text-left">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Sobre Mim</h2>
          <p className="leading-relaxed text-muted-foreground">
            Sou <strong className="text-foreground">Maria Colomba Raccuia Ferreira</strong>, psicóloga com 34 anos de atuação clínica dedicada ao universo da infância, adolescência e família.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            Minha formação é sólida e contínua:
          </p>

          <ul className="space-y-3 text-left">
            {FORMACOES.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 rounded-2xl border border-border/50 bg-card/60 p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sage-light">
                  <GraduationCap className="h-4 w-4 text-primary" />
                </span>
                <span className="text-sm leading-relaxed text-foreground">{f}</span>
              </li>
            ))}
          </ul>

          <p className="leading-relaxed text-muted-foreground">
            Atendo crianças, adolescentes e adultos, realizo orientação de pais e trabalho em parceria com escolas e neuropediatras — porque acredito que cuidar de uma criança é sempre um trabalho em rede.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            No <strong className="text-foreground">Espaço Terapêutico Perdizes</strong>, cada criança é acolhida com escuta cuidadosa, respeito ao seu tempo e atenção à sua singularidade.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Áreas de Atuação ─── */
function AreasAtuacao() {
  return (
    <section id="areas" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
          Áreas de Atuação
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Atendo crianças e adolescentes com demandas diversas, com escuta psicanalítica e intervenção baseada em evidências.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AREAS_ATUACAO.map((area) => (
          <div
            key={area}
            className="flex items-start gap-3 rounded-2xl border border-border/50 bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-light">
              <Activity className="h-4 w-4 text-accent" />
            </span>
            <span className="text-sm font-medium leading-relaxed text-foreground">{area}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Abordagem ─── */
function Approach() {
  const movimentos = [
    {
      title: "Acolher",
      description: "Escuta cuidadosa da criança, do adolescente e de sua família.",
      icon: Heart,
    },
    {
      title: "Intervir",
      description: "Manejo do sintoma com técnicas baseadas em evidências.",
      icon: Activity,
    },
    {
      title: "Transformar",
      description: "Compreensão da causa e promoção de mudanças duradouras.",
      icon: Sparkles,
    },
  ];

  return (
    <section id="abordagem" className="bg-secondary/50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Abordagem Terapêutica
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Profundidade da escuta psicanalítica somada à eficácia das intervenções estruturadas.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <div className="space-y-5">
            <p className="leading-relaxed text-muted-foreground">
              Minha prática clínica integra a <strong className="text-foreground">escuta psicanalítica</strong> com intervenções estruturadas pelo método <strong className="text-foreground">ABA</strong> e pela <strong className="text-foreground">Terapia Comportamental</strong> — uma combinação que me permite atuar tanto na profundidade quanto na superfície do sintoma.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              A psicanálise me oferece o olhar para o sujeito: sua história, seus vínculos, o que o sintoma quer dizer. O ABA e a Terapia Comportamental me oferecem as ferramentas para intervir de forma eficaz e mensurável no comportamento.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Essa integração garante um cuidado completo: <strong className="text-foreground">humano, técnico e eficaz</strong>.
            </p>
            <blockquote className="rounded-2xl border-l-4 border-accent bg-card/60 p-5 italic text-foreground shadow-sm">
              “Escuto a causa. Trato o sintoma. Transformo o comportamento.”
            </blockquote>
          </div>

          <div className="space-y-4">
            <p className="font-display text-lg font-semibold text-foreground">
              Trabalho em três movimentos:
            </p>
            {movimentos.map((m, i) => (
              <div
                key={m.title}
                className="flex items-start gap-4 rounded-2xl border border-border/50 bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sage-light">
                  <m.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xs font-bold text-accent">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {m.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <div className="mb-12 text-center">
        <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Perguntas Frequentes</h2>
        <p className="mt-4 text-muted-foreground">Tire suas dúvidas sobre o processo terapêutico</p>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {FAQ_ITEMS.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border border-border/50 bg-card px-6 shadow-sm">
            <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="leading-relaxed text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

/* ─── Booking Form ─── */
const bookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Informe seu nome completo." })
    .max(100, { message: "Nome muito longo." }),
  date: z.date({ required_error: "Selecione uma data sugerida." }),
  phone: z
    .string()
    .trim()
    .min(8, { message: "Informe um telefone válido." })
    .max(20, { message: "Telefone muito longo." })
    .regex(/^[0-9()+\-.\s]+$/, { message: "Use apenas números e ( ) + - ." }),
});

type BookingValues = z.infer<typeof bookingSchema>;

function BookingForm() {
  const form = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { name: "", phone: "" },
  });

  function onSubmit(values: BookingValues) {
    const formattedDate = format(values.date, "PPP", { locale: ptBR });
    const message =
      `Olá! Gostaria de agendar uma consulta.\n` +
      `Nome: ${values.name}\n` +
      `Data sugerida: ${formattedDate}\n` +
      `Telefone: ${values.phone}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Solicitação enviada!", {
      description: "Entraremos em contato em breve.",
    });
    form.reset({ name: "", phone: "", date: undefined as unknown as Date });
  }

  return (
    <section id="agendar" className="bg-secondary/50 py-16 md:py-24">
      <div className="mx-auto max-w-xl px-4">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Agende sua Consulta
          </h2>
          <p className="mt-4 text-muted-foreground">
            Preencha os dados abaixo e enviaremos sua solicitação direto pelo WhatsApp.
          </p>
        </div>
        <Card className="rounded-2xl border-border/50 bg-card shadow-sm">
          <CardContent className="p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome" maxLength={100} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data sugerida</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value
                                ? format(field.value, "PPP", { locale: ptBR })
                                : "Selecione uma data"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              return date < today;
                            }}
                            initialFocus
                            locale={ptBR}
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="(11) 99999-9999"
                          maxLength={20}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-6 text-base font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
                >
                  <MessageCircle className="h-5 w-5" />
                  Enviar pelo WhatsApp
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-semibold text-foreground">Espaço Terapêutico Perdizes</p>
          <p className="mt-1 text-sm text-muted-foreground">Psicóloga Clínica — CRP 06/181440</p>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://www.instagram.com/espacoterapeuticoperdizes/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary" aria-label="Instagram">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="mailto:colombamaria@hotmail.com" className="text-muted-foreground transition-colors hover:text-primary" aria-label="E-mail">
            <Mail className="h-5 w-5" />
          </a>
          <a href="tel:+5511970891810" className="text-muted-foreground transition-colors hover:text-primary" aria-label="Telefone">
            <Phone className="h-5 w-5" />
          </a>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

/* ─── WhatsApp Float ─── */
function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

/* ─── Page ─── */
function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Specialties />
      <AreasAtuacao />
      <Approach />
      <Environments />
      <BookingForm />
      <Faq />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
