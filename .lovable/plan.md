
The user wants to reuse the existing "Agendar Consulta" button (in the header) to open the booking form, instead of adding a new nav item. Let me revise the plan.

Looking at the code, "Agendar Consulta" buttons exist in:
- Header desktop nav
- Header mobile nav (Sheet)
- Hero section ("Agendar pelo WhatsApp")

Currently they all open `WHATSAPP_URL` directly. The user wants these to open/scroll to the new booking form section instead.

## Plano: Seção de Agendamento com Formulário via WhatsApp

Vou adicionar uma nova seção "Agende sua Consulta" e reaproveitar os botões "Agendar Consulta" já existentes para levar o usuário até o formulário.

### O que será implementado

**1. Nova seção `BookingForm` em `src/routes/index.tsx`** (id `agendar`, posicionada antes do FAQ)
- Mesma paleta e estilo visual (card arredondado, fundo `bg-secondary/50` ou `bg-background` alternado)
- Título "Agende sua Consulta" + subtítulo acolhedor

**2. Campos do formulário**
- Nome completo (texto, obrigatório, máx 100)
- Data sugerida (DatePicker shadcn — Popover + Calendar, datas passadas desabilitadas)
- Telefone (texto, obrigatório, máx 20)
- Botão "Enviar pelo WhatsApp" com ícone

**3. Validação e segurança**
- `react-hook-form` + `zod` (já no projeto via shadcn `form`)
- Limites de tamanho em todos os campos
- `encodeURIComponent` ao montar a URL
- Sem logs de dados no console

**4. Fluxo de envio**
- Monta mensagem formatada e abre `https://wa.me/5511962250790?text=...` em nova aba
- Toast de sucesso via `sonner`: "Solicitação enviada! Entraremos em contato em breve."
- Reseta o formulário

**5. Reaproveitar botões existentes (sem novo item de menu)**
- Os 3 botões "Agendar Consulta" / "Agendar pelo WhatsApp" passam a fazer scroll para `#agendar` em vez de abrir o WhatsApp diretamente
- O envio para o WhatsApp acontece apenas após o usuário preencher o formulário

### Detalhes técnicos
- Bibliotecas (já instaladas): `react-hook-form`, `@hookform/resolvers/zod`, `zod`, `date-fns`, shadcn `Form/Input/Calendar/Popover/Button`, `sonner`
- Verificar `<Toaster />` do sonner em `src/routes/__root.tsx`; se ausente, adicionar
- Calendar com `pointer-events-auto`
- Layout: card centralizado `max-w-xl rounded-2xl`

### Estrutura visual
```text
[Header: botão "Agendar Consulta"] ──► scroll para #agendar
        ↓
[Hero: botão "Agendar pelo WhatsApp"] ──► scroll para #agendar
        ↓
[Sobre] [Especialidades] [Abordagem]
        ↓
[#agendar — Formulário]
  Nome / Data / Telefone → WhatsApp + toast
        ↓
[FAQ] [Footer]
```
