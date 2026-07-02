import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { cities, cityServices } from "@/data/cities";

export const metadata = {
  title: "All Cities",
};

export default function Cities({ showAll = false }) {
  const primary = cityServices[0]; // Property Lawyer landing per city

  const visibleCities = showAll ? cities : cities.slice(0, 17);
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="City Coverage"
          title="Find lawyers in your city"
          subtitle="We connect you with local, verified advocates across India's major cities — with more added every week."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {visibleCities.map((city, i) => (
            <Reveal key={city.slug} delay={i * 0.03}>
              <Link
                href={`/${primary.slug}/${city.slug}`}
                className="group flex items-center justify-between rounded-2xl border border-ink-100 bg-cream px-5 py-4 transition hover:-translate-y-1 hover:border-gold-200 hover:bg-white hover:shadow-[var(--shadow-card)]"
              >
                <span className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-gold-500" />
                  <span>
                    <span className="block font-semibold text-ink-900">
                      {city.name}
                    </span>
                    <span className="block text-xs text-ink-400">
                      {city.state}
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-ink-300 transition group-hover:text-gold-600" />
              </Link>
            </Reveal>
          ))}
        </div>

        {!showAll && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/cities"
              className="rounded-xl bg-gold-500 px-8 py-3 font-semibold text-white transition hover:bg-gold-600"
            >
              View All Cities →
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
