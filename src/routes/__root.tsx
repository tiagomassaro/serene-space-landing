import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Espaço Terapêutico Perdizes | Psicologia Infantil em Perdizes - SP" },
      { name: "description", content: "Psicóloga especialista, há 34 anos atendendo crianças e adolescentes, com foco no comportamento e orientação de pais." },
      { name: "keywords", content: "psicóloga Perdizes, psicologia infantil São Paulo, psicopedagogia clínica, neuropsicologia infantil, terapia para crianças Perdizes, TEA, TDAH, psicóloga infantil SP" },
      { name: "author", content: "Maria Colomba Raccuia Ferreira" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow" },
      { name: "google-site-verification", content: "QUd_E_sxrEB4OuVzlaPDgWQDJSvkl_yU47mdflgt31c" },
      { name: "language", content: "Portuguese" },
      { name: "geo.region", content: "BR-SP" },
      { name: "geo.placename", content: "Perdizes, São Paulo" },
      { name: "theme-color", content: "#A3B5A6" },
      // Open Graph
      { property: "og:title", content: "Espaço Terapêutico Perdizes | Psicologia Infantil em SP" },
      { property: "og:description", content: "Psicoterapia e psicopedagogia clínica para crianças, adolescentes e família. Atendimento acolhedor em Perdizes, São Paulo." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:site_name", content: "Espaço Terapêutico Perdizes" },
      { property: "og:url", content: "https://espacoterapeuticoperdizes.lovable.app/" },
      { property: "og:image", content: "https://espacoterapeuticoperdizes.lovable.app/og-image.png" },
      { property: "og:image:alt", content: "Espaço Terapêutico Perdizes — Psicologia Clínica Infantil" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "1200" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Espaço Terapêutico Perdizes | Psicologia Infantil em SP" },
      { name: "twitter:description", content: "Psicoterapia e psicopedagogia clínica para crianças, adolescentes e família em Perdizes, São Paulo." },
      { name: "twitter:image", content: "https://espacoterapeuticoperdizes.lovable.app/og-image.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "canonical", href: "https://espacoterapeuticoperdizes.lovable.app/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "MedicalBusiness", "Psychologist"],
          "name": "Espaço Terapêutico Perdizes",
          "description": "Psicoterapia e psicopedagogia clínica para crianças, adolescentes e família em Perdizes, São Paulo.",
          "url": "https://espacoterapeuticoperdizes.lovable.app/",
          "image": "https://espacoterapeuticoperdizes.lovable.app/og-image.png",
          "telephone": "+55-11-97089-1810",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Perdizes",
            "addressRegion": "SP",
            "addressCountry": "BR",
          },
          "areaServed": {
            "@type": "City",
            "name": "São Paulo",
          },
          "sameAs": [
            "https://www.instagram.com/espacoterapeuticoperdizes/",
          ],
          "founder": {
            "@type": "Person",
            "name": "Maria Colomba Raccuia Ferreira",
            "jobTitle": "Psicóloga Clínica",
            "identifier": "CRP 06/181440",
          },
          "medicalSpecialty": [
            "Psychiatric",
            "Psychotherapy",
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}
