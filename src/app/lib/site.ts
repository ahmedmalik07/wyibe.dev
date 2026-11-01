// Single source of truth for the public URL. Vercel serves the site on
// www.wyibe.com (wyibe.com redirects there), so canonical URLs use www.
export const SITE_URL = "https://www.wyibe.com";

export const CONTACT_EMAIL = "ahmed.malik@wyibe.com";
export const BOOKING_URL = "https://calendly.com/ahmed-usman7615/30min";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Wyibe",
  legalName: "WYIBE.DEV (SMC-Private) Limited",
  url: SITE_URL,
  logo: `${SITE_URL}/icon-192.png`,
  email: CONTACT_EMAIL,
  founder: { "@type": "Person", name: "Ahmed Malik" },
  sameAs: [
    "https://linkedin.com/company/wyibe",
    "https://linkedin.com/in/ahhmedmalik",
    "https://github.com/ahmedmalik07",
  ],
};
