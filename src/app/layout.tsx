import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sougandh Velikkakath | English Language & Literature Educator",
  description: "Official portfolio of Sougandh Velikkakath, a distinguished internationally experienced English Educator with 16+ years of expertise in IGCSE, CBSE, and ESL curricula.",
  keywords: "English Teacher, English Literature, Educator Portfolio, IGCSE English, CBSE English, ESL, Maldives School Teacher, Sougandh Velikkakath",
  authors: [{ name: "Sougandh Velikkakath" }],
  openGraph: {
    title: "Sougandh Velikkakath | English Educator Portfolio",
    description: "16+ years of international teaching experience, credentials, and digital certificate vault.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sougandh Velikkakath | English Educator Portfolio",
    description: "Official portfolio of Sougandh Velikkakath, showcasing 16+ years of educational excellence.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sougandh Velikkakath",
    "jobTitle": "English Language & Literature Educator",
    "description": "Internationally experienced English Language & Literature Educator with 16+ years teaching history across Maldives and India.",
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "name": "Master of Arts in English",
        "educationalLevel": "Master"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "name": "Bachelor of Education (B.Ed) in English",
        "educationalLevel": "Bachelor"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "certification",
        "name": "State Eligibility Test (SET) Qualified"
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className="min-h-full bg-charcoal text-ivory font-sans antialiased overflow-x-hidden selection:bg-gold selection:text-charcoal">
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
