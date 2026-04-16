import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logoEspaco from "@/assets/logo-espaco.png";
import logoPequeno from "@/assets/logo-pequeno.png";
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
  Users,
  Sparkles,
  Menu,
  MessageCircle,
  Instagram,
  Mail,
  Phone,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const WHATSAPP_URL = "https://wa.me/5511970891810?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta.";

const NAV_ITEMS = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre Mim", href: "#sobre" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Abordagem", href: "#abordagem" },
  { label: "FAQ", href: "#faq" },
];

const SPECIALTIES = [
  { icon: Brain, title: "Ansiedade", description: "Técnicas e acolhimento para lidar com pensamentos ansiosos e recuperar sua tranquilidade." },
  { icon: Heart, title: "Depressão", description: "Suporte empático e estratégias eficazes para reencontrar sentido e motivação." },
  { icon: Users, title: "Relacionamentos", description: "Fortalecimento de vínculos afetivos e desenvolvimento de uma comunicação saudável." },
  { icon: Sparkles, title: "Autoconhecimento", description: "Jornada de autodescoberta para uma vida mais autêntica e alinhada com seus valores." },
];

const FAQ_ITEMS = [
  { question: "Quanto tempo dura cada sessão?", answer: "Cada sessão tem duração de 50 minutos, seguindo o padrão da prática clínica psicológica." },
  { question: "Atende por convênio?", answer: "Atualmente atendo de forma particular. Emito recibo para reembolso junto ao convênio, caso sua operadora ofereça essa opção." },
  { question: "Como funciona a primeira sessão?", answer: "A primeira sessão é um momento de acolhimento e escuta. Conversamos sobre suas demandas, expectativas e definimos juntos os objetivos do processo terapêutico." },
  { question: "Atende online ou presencial?", answer: "Atendo nas duas modalidades. As sessões online são realizadas por videochamada em plataforma segura, com a mesma qualidade do atendimento presencial." },
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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <button onClick={() => scrollTo("#inicio")} className="font-display font-semibold text-foreground tracking-tight text-2xl">
          Espaço Terapêutico Perdizes
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <button key={item.href} onClick={() => scrollTo(item.href)} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {item.label}
            </button>
          ))}
          <Button onClick={() => window.open(WHATSAPP_URL, "_blank")} className="rounded-2xl bg-primary px-6 text-primary-foreground hover:bg-primary/90">
            Agendar Consulta
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
              <Button onClick={() => window.open(WHATSAPP_URL, "_blank")} className="mt-4 rounded-2xl bg-primary text-primary-foreground">
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
    <section id="inicio" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Um espaço seguro para o seu{" "}
            <span className="text-primary">autoconhecimento</span>
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
            Cuide da sua saúde mental com acolhimento, ética e profissionalismo. Dê o primeiro passo rumo a uma vida mais leve e equilibrada.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row md:items-start">
            <Button
              onClick={() => window.open(WHATSAPP_URL, "_blank")}
              className="flex items-center gap-2 rounded-2xl bg-primary px-8 py-6 text-base font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
            >
              <MessageCircle className="h-5 w-5" />
              Agendar pelo WhatsApp
            </Button>
          </div>
        </div>
        <div className="flex flex-1 justify-center">
          <div className="aspect-square w-64 overflow-hidden rounded-3xl bg-primary/20 shadow-xl md:w-80 flex items-center justify-center p-2">
            <img src={logoEspaco} alt="Espaço Terapêutico Perdizes" className="w-full h-full object-contain rounded-xl shadow-2xl opacity-65" />
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
      <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
        <div className="flex justify-center md:w-1/3">
          <div className="aspect-square w-56 overflow-hidden rounded-3xl bg-secondary shadow-lg md:w-72">
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <span className="text-sm">Foto</span>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-5 text-center md:text-left">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Sobre Mim</h2>
          <p className="leading-relaxed text-muted-foreground">
            Sou Maria Colomba, psicóloga clínica formada xxxxxxxxx
          </p>
          <p className="leading-relaxed text-muted-foreground">
            Texto
          </p>
          <p className="text-sm font-medium text-primary">CRP 00/123456</p>
        </div>
      </div>
    </section>
  );
}

/* ─── Abordagem ─── */
function Approach() {
  const points = [
    "Identificação de padrões de pensamento disfuncionais",
    "Reestruturação cognitiva com técnicas validadas",
    "Desenvolvimento de habilidades de enfrentamento",
    "Resultados comprovados por pesquisas científicas",
  ];

  return (
    <section id="abordagem" className="bg-secondary/50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
          <div className="flex-1 space-y-5">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Abordagem Terapêutica</h2>
            <p className="leading-relaxed text-muted-foreground">
              Trabalho com a <strong className="text-foreground">Terapia Cognitivo-Comportamental (TCC)</strong>, uma abordagem baseada em evidências científicas que ajuda a compreender como pensamentos, emoções e comportamentos estão interligados.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              A TCC é uma das abordagens mais eficazes para o tratamento de transtornos de ansiedade, depressão e diversas outras demandas emocionais, proporcionando resultados concretos e duradouros.
            </p>
            <ul className="space-y-3 pt-2">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-1 justify-center">
            <div className="aspect-square w-56 overflow-hidden rounded-3xl bg-card shadow-lg md:w-72">
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <Brain className="h-16 w-16 text-primary/30" />
              </div>
            </div>
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

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-semibold text-foreground">Espaço Terapêutico Perdizes</p>
          <p className="mt-1 text-sm text-muted-foreground">Psicóloga Clínica — CRP 00/123456</p>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary" aria-label="Instagram">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="mailto:contato@dramariacolomba.com.br" className="text-muted-foreground transition-colors hover:text-primary" aria-label="E-mail">
            <Mail className="h-5 w-5" />
          </a>
          <a href="tel:+5511999999999" className="text-muted-foreground transition-colors hover:text-primary" aria-label="Telefone">
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
      <Approach />
      <Faq />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
