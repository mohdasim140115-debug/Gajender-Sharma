// Central place for site-wide config, navigation and contact info.
// Update here to change branding across the whole app.

export const SITE = {
  name: "Advocate Gajender Sharma",
  tagline: "India's Trusted Legal Consultation Platform",
  description:
    "Connect with verified, top-rated advocates across India. Book confidential legal consultations for property, family, criminal, corporate and 15+ Legal Services.",
  url: "https://advocategajendersharma.com",
  phone: "+91 97281 09109",
  email: "adv.g.sharma15@gmail.com",
  address: " Chamber No. 424, Judicial Court Complex, Haily Mandi Road, Pataudi, Haryana 122503",
  hours: "Mon – Sat · 9:00 AM to 8:00 PM",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Legal Services", href: "/legal-services", hasMega: true },
  { label: "Lawyers", href: "/lawyers" },
  { label: "Blogs", href: "/blogs" },
  { label: "About", href: "/about" },
   { label: "Cities", href: "/cities" },
  { label: "Contact", href: "/contact" },
];

export const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com", icon: "Facebook" },
  { label: "Twitter", href: "https://twitter.com", icon: "Twitter" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
  { label: "Instagram", href: "https://instagram.com", icon: "Instagram" },
  { label: "YouTube", href: "https://youtube.com", icon: "Youtube" },
];

export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Lawyers", href: "/lawyers" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact", href: "/contact" },
    { label: "Book Consultation", href: "/consultation" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "FAQ", href: "/faq" },
  ],
};
