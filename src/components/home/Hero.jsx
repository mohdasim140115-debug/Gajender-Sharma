"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, ArrowRight, Scale, Star, BadgeCheck, Landmark } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { stats } from "@/data/home";

const EASE = [0.22, 1, 0.36, 1];
const rise = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.1 + i * 0.12, ease: EASE },
  }),
};

export default function Hero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const onSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/lawyers?q=${encodeURIComponent(q)}` : "/lawyers");
  };

  return (
    <section className="relative overflow-hidden bg-ink-950 pt-32 pb-20 text-white sm:pt-40 sm:pb-28">
      {/* Background layers */}
      <div className="absolute inset-0 hero-grid opacity-40" />
      <div className="absolute -left-24 top-10 h-96 w-96 animate-float-slow rounded-full bg-gold-400/10 blur-3xl" />
      <div className="absolute -right-16 bottom-0 h-96 w-96 animate-float rounded-full bg-ink-500/30 blur-3xl" />
      {/* Scales-of-justice watermark */}
      <Scale
        className="pointer-events-none absolute -right-16 top-24 hidden h-[34rem] w-[34rem] text-white/[0.03] lg:block"
        strokeWidth={0.5}
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Copy */}
          <div>
            <motion.p
              custom={0}
              variants={rise}
              initial="hidden"
              animate="visible"
              className="gold-rule inline-flex items-center text-xs font-semibold uppercase tracking-[0.25em] text-gold-300"
            >
              Trusted Legal Counsel
            </motion.p>

            <motion.h1
              custom={1}
              variants={rise}
              initial="hidden"
              animate="visible"
              className="mt-6 font-display text-4xl font-bold leading-[1.08] text-balance sm:text-5xl lg:text-[4rem]"
            >
              Justice, Guided by
              <br />
              <span className="gold-gradient-text">Trusted Advocates.</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={rise}
              initial="hidden"
              animate="visible"
              className="mt-6 max-w-xl text-base leading-relaxed text-ink-200 sm:text-lg"
            >
              Connect with verified advocates for property, family, criminal,
              corporate and 15+ practice areas. Confidential consultations —
              fast, secure and .
            </motion.p>

            <motion.form
              custom={3}
              variants={rise}
              initial="hidden"
              animate="visible"
              onSubmit={onSearch}
              className="mt-9 flex max-w-xl flex-col gap-3 rounded-2xl bg-white/5 p-2 backdrop-blur sm:flex-row sm:rounded-full"
            >
              <div className="flex flex-1 items-center gap-3 rounded-full bg-white px-5 py-3.5">
                <Search className="h-5 w-5 text-ink-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by lawyer, city or practice area…"
                  className="w-full bg-transparent text-sm text-ink-900 outline-none placeholder:text-ink-400"
                />
              </div>
              <Button type="submit" variant="gold" size="md" className="sm:px-8">
                Search
              </Button>
            </motion.form>

            <motion.div
              custom={4}
              variants={rise}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-wrap items-center gap-6"
            >
              <Button href="/consultation" variant="gold" size="lg">
                Book Consultation <ArrowRight className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 text-sm text-ink-200">
                <span className="flex text-gold-400">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-400" strokeWidth={0} />
                  ))}
                </span>
                Rated 4.8/5 by 15,000+ clients
              </div>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="frame-gold relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image
                src="/hero-lawyer.jpeg"
                alt="Professional advocate ready to help"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
              {/* Emblem chip */}
              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-ink-950/60 px-3 py-1.5 text-xs font-medium backdrop-blur">
                <Landmark className="h-3.5 w-3.5 text-gold-400" /> Bar Council Verified
              </div>
            </div>

            {/* Floating stat card — verified advocates */}
            <div className="absolute -bottom-6 -left-4 animate-float rounded-2xl bg-white p-4 text-ink-900 shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-3">
                <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-gold-100 text-gold-600">
                  <BadgeCheck className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-display text-xl font-bold">
                    <AnimatedCounter value="500+" />
                  </p>
                  <p className="text-xs text-ink-500">Verified Advocates</p>
                </div>
              </div>
            </div>

            {/* Floating stat card — consultations */}
            <div className="absolute -right-4 top-8 animate-float-slow rounded-2xl bg-gold-400 p-4 text-ink-950 shadow-[var(--shadow-gold)]">
              <p className="font-display text-xl font-bold">
                <AnimatedCounter value="15K+" />
              </p>
              <p className="text-xs font-medium">Consultations</p>
            </div>
          </motion.div>
        </div>


        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur transition hover:border-gold-400/40 hover:bg-white/[0.08]"
            >
              <p className="font-display text-3xl font-bold text-gold-400">
                <AnimatedCounter value={s.value} />
              </p>
              <p className="mt-1 text-sm text-ink-300">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
