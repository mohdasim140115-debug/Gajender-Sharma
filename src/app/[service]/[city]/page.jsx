import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, MapPin, Phone, ArrowUpRight } from "lucide-react";
import {
  getCityService,
  getCity,
  cities,
  getCityServiceParams,
} from "@/data/cities";
import { getPracticeArea } from "@/data/practiceAreas";
import { getLawyersByCity, getLawyersByPracticeArea } from "@/data/lawyers";
import { faqs } from "@/data/faqs";
import { SITE } from "@/constants/site";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import PageHeader from "@/components/shared/PageHeader";
import LawyerCard from "@/components/lawyers/LawyerCard";
import FAQAccordion from "@/components/shared/FAQAccordion";
import CTASection from "@/components/shared/CTASection";

// Every /service/city combo is prerendered from a single data file.
export function generateStaticParams() {
  return getCityServiceParams();
}

export async function generateMetadata({ params }) {
  const { service, city } = await params;
  const svc = getCityService(service);
  const loc = getCity(city);
  if (!svc || !loc) return {};
  return {
    title: `${svc.name} in ${loc.name} — Consult Verified Advocates`,
    description: `Looking for a ${svc.name.toLowerCase()} in ${loc.name}? Connect with ${svc.description}. Book a confidential consultation today.`,
    alternates: { canonical: `/${svc.slug}/${loc.slug}` },
  };
}

export default async function CityServicePage({ params }) {
  const { service, city } = await params;
  const svc = getCityService(service);
  const loc = getCity(city);
  if (!svc || !loc) notFound();

  const area = getPracticeArea(svc.practiceArea);
  const cityLawyers = getLawyersByCity(city);
  const areaLawyers = getLawyersByPracticeArea(svc.practiceArea);
  const shown = (cityLawyers.length ? cityLawyers : areaLawyers).slice(0, 3);
  const otherCities = cities.filter((c) => c.slug !== city).slice(0, 8);

  return (
    <>
      <PageHeader
        eyebrow={`${loc.name}, ${loc.state}`}
        title={`${svc.name} in ${loc.name}`}
        subtitle={`Connect with ${svc.description}. Confidential, verified and affordable legal help in ${loc.name}.`}
        crumbs={[
          { label: "Legal Services", href: "/legal-services" },
          { label: svc.name, href: area ? `/legal-services/${area.slug}` : undefined },
          { label: loc.name },
        ]}
      />

      <section className="bg-cream py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <Reveal>
              <h2 className="font-display text-3xl font-bold text-ink-900">
                Trusted {svc.name}s in {loc.name}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-600">
                Finding a reliable {svc.name.toLowerCase()} in {loc.name} shouldn&apos;t
                be stressful. We connect you with verified, experienced advocates who
                understand local courts and procedures — so your matter is handled with
                clarity and care. {area?.overview}
              </p>
            </Reveal>   

            {area && (
              <Reveal className="mt-10">
                <h3 className="font-display text-xl font-bold text-ink-900">
                  How our {loc.name} {svc.name.toLowerCase()}s help
                </h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {area.services.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-white p-4"
                    >
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-100 text-gold-600">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-sm text-ink-700">{s}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            <Reveal className="mt-10 rounded-3xl border border-ink-100 bg-white p-7">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink-900">
                <MapPin className="h-5 w-5 text-gold-500" /> {svc.name} in other cities
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {otherCities.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/${svc.slug}/${c.slug}`}
                    className="rounded-full bg-ink-50 px-3.5 py-1.5 text-xs font-medium text-ink-600 transition hover:bg-gold-100 hover:text-gold-700"
                  >
                    {svc.name}, {c.name}
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-3xl border border-ink-100 bg-white p-7 shadow-[var(--shadow-card)]">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-400 text-ink-950">
                <Icon name={area?.icon || "Scale"} className="h-7 w-7" />
              </span>
              <p className="mt-5 text-sm text-ink-500">
                Consultations in {loc.name} from
              </p>
              <p className="font-display text-4xl font-bold text-ink-900">
                ₹{area?.startingPrice || 999}
              </p>
              <Button href="/consultation" variant="gold" className="mt-6 w-full">
                Book Consultation
              </Button>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-ink-200 px-6 py-3 text-sm font-semibold text-ink-800 transition hover:border-gold-400"
              >
                <Phone className="h-4 w-4" /> Call {SITE.phone}
              </a>
            </div>
          </aside>
        </Container>
      </section>

      {shown.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <Container>
            <SectionHeading
              align="left"
              eyebrow={loc.name}
              title={`${svc.name}s available now`}
              className="max-w-xl"
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((l) => (
                <LawyerCard key={l.slug} lawyer={l} />
              ))}
            </div>
            <div className="mt-10">
              <Button href="/lawyers" variant="outline">
                View all lawyers <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </Container>
        </section>
      )}

      <section className="bg-cream py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="FAQ" title={`${svc.name} in ${loc.name} — FAQs`} />
          <div className="mt-10">
            <FAQAccordion items={faqs.slice(0, 5)} />
          </div>
        </Container>
      </section>

      <CTASection title={`Need a ${svc.name} in ${loc.name}?`} />
    </>
  );
}
