
# Landing Page para Psicóloga Clínica

## Visão Geral
Landing page moderna, responsiva e minimalista para uma psicóloga clínica, com paleta em Verde Sálvia, Bege e Cinza Quente, transmitindo calma e profissionalismo.

## Estrutura

### 1. Design System
- Atualizar `styles.css` com a paleta: Verde Sálvia (#B2AC88), Bege (#F5F5DC), Cinza Quente (#4A4A4A)
- Importar Google Fonts: Playfair Display (títulos) + Inter (corpo)
- Bordas arredondadas (`rounded-2xl`), sombras suaves

### 2. Componentes
- **Header** — Sticky, navegação com scroll suave (Início, Sobre Mim, Especialidades, Abordagem, FAQ) + botão CTA "Agendar Consulta". Menu hamburger no mobile.
- **Hero Section** — Layout em duas colunas: título impactante + subtítulo acolhedor + botão WhatsApp à esquerda; placeholder de foto com bordas arredondadas à direita.
- **Especialidades** — Grid de 4 cards com ícones Lucide (Ansiedade, Depressão, Relacionamentos, Autoconhecimento).
- **Sobre Mim** — Foto + texto biográfico lado a lado, formação acadêmica.
- **Abordagem** — Explicação didática sobre TCC com elementos visuais.
- **FAQ** — Accordion (Shadcn) com perguntas como duração da sessão, convênios, etc.
- **Rodapé** — CRP, redes sociais, links úteis.
- **Botão flutuante WhatsApp** — Fixo no canto inferior direito.

### 3. Páginas
Tudo na `index.tsx` como single-page com scroll sections (apropriado para landing page). Navegação por âncoras dentro da mesma página.

### 4. Responsividade
- Mobile-first com Tailwind breakpoints
- Hero empilha verticalmente no mobile
- Grid de cards adapta de 1 a 2 a 4 colunas
- Menu hamburger com Sheet (Shadcn) no mobile
