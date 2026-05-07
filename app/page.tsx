"use client";

import Image from "next/image";
import heroImage from "../New_Hero_Cover.png";
import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  FileText,
  Mail,
  MessageSquareQuote,
  Plus,
  Sparkles,
  SwatchBook,
  UsersRound,
} from "lucide-react";
import { ArrowLeft } from "lucide-react";

const HERO_IMAGE_SRC = heroImage;
const BOOKING_URL = "https://cal.com/silkandsteel/20min";

const navItems = [
  { label: "THE PROBLEM", href: "#problem" },
  { label: "THE SHIFT", href: "#shift" },
  { label: "THE PROCESS", href: "#process" },

  { label: "THE OFFER", href: "#offer" },
  { label: "THE QUESTION", href: "#questions" },
] as const;

/* ─── brand tokens ─── */
const T = {
  night:  "#1A1714",
  wine:   "#1C1008",
  garnet: "#B85C38",
  bone:   "#D4C4B0",
  light:  "#EDE4D8",
  ash:    "#3D2E28",
  cream:  "#F4F0EB",
};

/* ─── Eyebrow ─── */
const benefits = [
  {
    number: "01",
    title: "Your primary audience — defined with real precision",
    body: "Not a demographic. A real understanding of who you serve best, what they're going through, and why they choose you when they find you.",
  },
  {
    number: "02",
    title: "Your competitive landscape — mapped honestly",
    body: "See where you sit in your market, who you're actually competing with, and where the white space is that only you can claim.",
  },
  {
    number: "03",
    title: "Your differentiator — owned, not just named",
    body: "Find the thing that makes your business genuinely distinct — and learn how to talk about it in a way that lands with the right people.",
  },
  {
    number: "04",
    title: "A Brand Playbook + 'What Now' page",
    body: "A 3-4 page document capturing everything we built, plus channel direction and messaging angles you can put to use immediately.",
  },
] as const;

const processSteps = [
  {
    number: "1",
    eyebrow: "BEFORE WE MEET",
    title: "You complete an intake questionnaire",
    body:
      "A detailed set of questions about your business, your clients, and what you're working toward. This ensures we walk into Session One ready to go deep from the first minute.",
  },
  {
    number: "2",
    eyebrow: "SESSION ONE + TWO",
    title: "We build your strategy together",
    body:
      "Two 2-hour virtual sessions, spaced a few days apart. Session One covers audience and competitive landscape. Session Two focuses on differentiators and positioning. You're in the room as the strategy takes shape.",
  },
  {
    number: "3",
    eyebrow: "UNDER A MONTH",
    title: "Your Brand Playbook is delivered",
    body:
      "A clean 3-4 page document with everything we built, plus a one-page 'What Now?' section with channel direction and 2-3 messaging angles based on your specific audience and positioning.",
  },
] as const;

const testimonials = [
  {
    quote:
      "I thought I needed a rebrand. What I actually needed was clarity on who I'm for and why I'm different. The playbook I walked away with is the most useful document in my business.",
    author: "R.M.",
    role: "Business Coach, 5 Years in Practice",
  },
  {
    quote:
      "I'd rebuilt my website twice in two years and it still felt wrong. After these sessions I understood why -- I'd been building on the wrong foundation. The positioning work changed everything.",
    author: "K.L.",
    role: "Brand Consultant & Creative Strategist",
  },
  
  {
    quote:
      "Within a month of getting clear on my positioning, I raised my prices and filled the first round. My brand was finally showing the value I was already delivering.",
    author: "J.W.",
    role: "Marketing Consultant & Copywriter",
  },
] as const;

/* const pricingBullets = [
  "Pre-session intake questionnaire",
  "Two 2-hour virtual strategy sessions",
  "Session 1: Primary audience + competitive analysis",
  "Session 2: Differentiator identification + positioning strategy",
  "Brand Playbook delivered within one week (3–4 pages)",
  '"What Now" page with channel direction and 2–3 messaging angles',
] as const; */

const deliverables = [
  {
    icon: FileText,
    title: "Pre-session intake questionnaire",
    body: "Focused prompts that help us arrive with the right context before the strategy work begins.",
  },
  {
    icon: Clock3,
    title: "Two 2-hour virtual strategy sessions",
    body: "A structured pair of sessions designed to go deep without dragging the process out.",
  },
  {
    icon: UsersRound,
    title: "Session 1: Primary audience + competitive analysis",
    body: "Define who you serve best and where your work sits inside the market around you.",
  },
  {
    icon: Sparkles,
    title: "Session 2: Differentiator identification + positioning strategy",
    body: "Clarify what makes your offer distinct and how to communicate that value with confidence.",
  },
  {
    icon: SwatchBook,
    title: "Brand Playbook delivered under a month (3-4 pages)",
    body: "A concise reference document that captures the strategy and language you can keep using.",
  },
  {
    icon: MessageSquareQuote,
    title: "'What Now' page with channel direction and 2-3 messaging angles",
    body: "Practical next steps for turning the strategy into visible brand and marketing decisions.",
  },
] as const;



const faqs = [
  {
    question: "Do I need to be in a specific industry?",
    answer:
      "No. This session is built for service-based businesses of any kind -- creative agencies, consultants, coaches, copywriters, marketers, and others. The methodology applies across industries because positioning challenges are fundamentally the same.",
  },
  {
    question: "I already have a brand. Is this still worth it?",
    answer:
      "Often yes -- and sometimes even more so. If you have an existing brand that isn't quite working, these sessions help you understand exactly why and what to do about it. You don't have to start over to benefit from a clearer strategy.",
  },
  {
    question: "How is this different from hiring a brand designer?",
    answer:
      "A designer works on how your brand looks. This works on what your brand says, who it speaks to, and how it positions you in your market. Most designers need this work done before they start, not after. This session gives you the strategy that makes design decisions easy.",
  },
  {
    question: "What if I want more comprehensive brand strategy work?",
    answer:
      "There's a larger engagement available that covers brand substance, messaging framework, and brand voice in full depth. This mini session is the entry point -- and the $2,500 investment applies toward the larger engagement if you decide to continue.",
  },
  {
    question: "How quickly can we schedule?",
    answer:
      "Availability varies. Booking at least two to three weeks out is recommended. Current availability is shown on the booking page.",
  },
  {
    question: "What do I need to prepare?",
    answer:
      "You complete the intake questionnaire before Session One -- that's the main preparation. It takes about 30 to 45 minutes and ensures we make the most of our time together. No additional research or homework is required before your first session.",
  },
] as const;

const footerLinks = [
  { label: "The Problem", href: "#problem" },
  { label: "The Shift", href: "#shift" },
  { label: "The Process", href: "#process" },
  { label: "The Offer", href: "#offer" },
  { label: "The Question", href: "#questions" },

] as const;

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookies", href: "#" },
] as const;

const socialLinks = [
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "LinkedIn", href: "#", icon: LinkedinIcon },
  { label: "Email", href: "mailto:hello@silkandsteel.com", icon: Mail },
] as const;

const faqColumns = [faqs.slice(0, 3), faqs.slice(3)];

const motionViewport = { once: true, amount: 0.25 };

const bookingTarget = BOOKING_URL.startsWith("http")
  ? { target: "_blank", rel: "noreferrer" }
  : {};

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M7 10v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M12 17v-4.2a2.3 2.3 0 0 1 4.6 0V17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 10v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="7" cy="7" r="1.2" fill="currentColor" />
    </svg>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 24,
    mass: 0.2,
  });

  return (
    <motion.div
      
      style={{ scaleX }}
    />
  );
}

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={motionViewport}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionEyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`mb-5 font-[family:var(--font-cinzel)] text-[12px] leading-6 tracking-[0.10em] sm:text-[14px] md:text-[16px] ${
        light ? "text-[var(--ss-muted)]" : "text-[var(--ss-bronze)]"
      }`}
    >
      {children}
    </p>
  );
}

function CtaLink({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">) {
  const base =
    "inline-flex max-w-full items-center justify-center gap-2 whitespace-nowrap rounded-[4px] border text-center text-[10px] font-semibold leading-[1.2] tracking-[0.18em] uppercase transition duration-300 ease-out will-change-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-[var(--ss-bronze-soft)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:tracking-[0.22em]";

  const variantClass =
    variant === "primary"
      ? "border-[var(--ss-bronze)] bg-[var(--ss-bronze)] text-[var(--ss-light)] hover:border-[var(--ss-bronze-hover)] hover:bg-[var(--ss-bronze-hover)]"
      : variant === "secondary"
        ? "border-white/40 bg-transparent text-[var(--ss-light)] hover:border-[var(--ss-bronze-soft)] hover:text-[var(--ss-bronze-soft)]"
        : "border-[var(--ss-soft-border)] bg-white/70 text-[var(--ss-dark-text)] hover:border-[var(--ss-bronze)] hover:text-[var(--ss-bronze)]";

  return (
    <a
      href={href}
      {...(href === BOOKING_URL ? bookingTarget : {})}
      {...props}
      className={`${base} ${variantClass} ${className}`}
    >
      {children}
    </a>
  );
}

function BrandMark() {
  return (
    <a href="#top" className="inline-flex items-center">
      <span className="flex items-baseline gap-1.5 no-underline">
        <span style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 300, fontSize: 25, color: T.light, letterSpacing: "0.01em" }}>Silk</span>
        <span style={{ fontFamily: "var(--font-cormorant)", fontWeight: 200, fontSize: 17, color: T.light }}>&amp;</span>
        <span style={{ fontFamily: "var(--font-cinzel)", fontWeight: 600, fontSize: 16, letterSpacing: "0.18em", color: T.light, textTransform: "uppercase" }}>Steel</span>
      </span>
    </a>
  );
}

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/18 bg-[rgba(20,13,9,0.98)] backdrop-blur-md">
      <div className="mx-auto flex h-[64px] max-w-[1400px] items-center justify-between gap-3 px-4 sm:gap-6 sm:px-6 md:h-[68px] lg:px-8">
        <div className="shrink-0 lg:ml-[4px]">
          <BrandMark />
        </div>
        <nav className="hidden items-center gap-6 pt-1 xl:flex 2xl:gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[12px] font-medium tracking-[0.1em] text-[var(--ss-light)] transition hover:text-[var(--ss-bronze-soft)]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:block">
            <CtaLink
              href={BOOKING_URL}
              className="-translate-y-[1px] px-4 py-3 font-semibold shadow-[0_10px_24px_rgba(182,101,56,0.18)] hover:scale-105 md:px-5"
            >
              BOOK NOW - $2,500
            </CtaLink>
          </div>
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] border border-[var(--ss-soft-border)] bg-white/70 text-[var(--ss-dark-text)] transition hover:border-[var(--ss-bronze)] hover:text-[var(--ss-bronze)] xl:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-5 bg-current transition duration-300 ${
                  mobileMenuOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] h-[1.5px] w-5 bg-current transition duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[12px] h-[1.5px] w-5 bg-current transition duration-300 ${
                  mobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>
      <motion.div
        initial={false}
        animate={{
          height: mobileMenuOpen ? "auto" : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden border-t border-[var(--ss-soft-border)] bg-[rgba(245,241,236,0.98)] xl:hidden"
      >
        <div className="max-h-[calc(100vh-64px)] space-y-2 overflow-y-auto px-4 py-4 sm:px-6 md:max-h-[calc(100vh-68px)]">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-[4px] border border-transparent px-3 py-3 text-[12px] font-medium tracking-[0.16em] text-[var(--ss-dark-text)]/88 transition hover:border-[var(--ss-bronze)]/35 hover:bg-[rgba(182,101,56,0.04)] hover:text-[var(--ss-bronze)]"
            >
              {item.label}
            </a>
          ))}
          <CtaLink href={BOOKING_URL} className="mt-2 w-full px-4 py-3">
            BOOK NOW <ArrowRight className="size-3.5" strokeWidth={1.7} />
          </CtaLink>
        </div>
      </motion.div>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[var(--ss-ink)] pt-[64px] text-[var(--ss-light)] md:pt-[68px]"
    >
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE_SRC}
          alt="Founder in an office at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_15%]"
        />
      </div>
      <div className="absolute inset-0 bg-[rgba(20,13,9,0.44)]" />
      <div className="mx-auto min-h-[calc(100svh-64px)] max-w-[1400px] md:min-h-[calc(100svh-68px)]">
        <div className="relative z-10 flex min-h-[calc(100svh-64px)] items-center px-5 py-8 sm:px-6 sm:py-10 md:min-h-[calc(100svh-68px)] md:px-6 md:py-12 lg:px-6 lg:py-14">
          <div className="flex w-full justify-center">
            <div className="w-full max-w-[1200px] text-center">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <SectionEyebrow light>For the woman who knows exactly what she does — but stumbles over trying to explain it.</SectionEyebrow>
                <motion.blockquote
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4 font-[family:var(--font-cormorant)] text-[clamp(2.85rem,6vw,3.1rem)] leading-[1.04] tracking-[-0.04em] text-[var(--ss-light)]"
                >
                  You&apos;ve built something real. Is your brand keeping up?
                </motion.blockquote>
              </motion.div>

              <FadeIn delay={0.35} className="mx-auto mt-6 max-w-[1000px] text-center">
                <p className="text-[16px] leading-7 text-[var(--ss-light)]/84 sm:text-[15px]">
                  The most powerful sales tool you&apos;re not using is your own conviction. I can help you build a brand around it.
                </p>
                {/* <p className="mx-auto mt-4 max-w-[620px] font-[family:var(--font-cormorant)] text-[18px] italic leading-7 text-[var(--ss-muted)]">
                  Turn institutional knowledge into a repeatable process, not a single point of
                  failure.
                </p> */}
              </FadeIn>
              <FadeIn delay={0.48} className="mt-8 flex flex-wrap justify-center gap-4">
                <CtaLink href="#process" variant="primary" className="min-w-[176px] px-6 py-4">
                  SEE HOW IT WORKS
                </CtaLink>
                <CtaLink href={BOOKING_URL} variant="secondary" className="min-w-[176px] px-6 py-4">
                  Let&apos;s talk
                </CtaLink>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemStatsSection() {
  return (
    <section id="problem" className="bg-[var(--ss-cream)]">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-12 sm:px-6 md:py-14 text-center lg:px-8 lg:py-16">
        <FadeIn>
          <SectionEyebrow>THE PROBLEM</SectionEyebrow>
          
          <h3 className="font-[family:var(--font-cormorant)] text-[clamp(2.38rem,2.55vw,3.2rem)] leading-[1.05] tracking-[-0.03em] text-[var(--ss-dark-text)]">
            It’s not that your brand is bad.
            <br />
            You’ve simply outgrown it.
          </h3>
          <div className="mt-5 space-y-4 text-[13.5px] leading-[1.72] text-[var(--ss-dark-text)]/72">
            <p>
              {/* As you’ve evolved, your brand hasn’t. It’s holding you back from positioning at your
              level, charging what you’re worth, and attracting the right clients. You don’t need a
              “new logo” — you need a brand that reflects who you are now. */}
              Before you take the garden shears to the surface-level stuff again — your logo, typography, website copy, and so on — consider what&apos;s growing beneath. A strategic refresh is a different kind of brand evolution. It gets down to the root of your business, nurturing what&apos;s working and pruning what isn&apos;t.
            </p>
            <p>
              {/* Your brand deserves to be as refined, impactful, and successful as you are ready to
              become. Let’s build a brand that works for your next chapter of growth. */}
              It&apos;s about knowing where and what to cut. The right brand doesn&apos;t try to speak to everyone — it speaks so clearly to the right people that the wrong ones disqualify themselves. Less selling. Less explaining. Less time on calls that go nowhere. Your brand does the heavy lifting before you have to open your mouth.
            </p>
          </div>
          <p className="mt-4 font-[family:var(--font-cormorant)] text-[17px] italic leading-7 text-[var(--ss-dark-text)]/70">
            Are you ready to go deep on your brand? Down to the root? Roll up our sleeves. Let&apos;s cultivate a brand strategy that will help your business thrive.
          </p>
        </FadeIn>
        {/* <FadeIn delay={0.08}>
          <div
            id="results"
            className="grid border-t border-[var(--ss-soft-border)] md:grid-cols-3 md:border-l md:border-t-0"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="flex min-h-[188px] flex-col items-center justify-start border-b border-[var(--ss-soft-border)] px-6 py-6 text-center last:border-b-0 md:min-h-[228px] md:border-b-0 md:border-r md:px-7 md:py-4"
                >
                  <Icon className="size-6 text-[var(--ss-dark-text)]/62" strokeWidth={1.55} />
                  <p className="mt-7 font-[family:var(--font-cormorant)] text-[60px] leading-none tracking-[-0.045em] text-[var(--ss-dark-text)]">
                    {stat.value}
                  </p>
                  <p className="mt-5 font-[family:var(--font-cinzel)] text-[10px] font-semibold tracking-[0.14em] text-[var(--ss-dark-text)]">
                    {stat.label}
                  </p>
                  <p className="mt-4 max-w-[170px] text-[12.5px] leading-6 text-[var(--ss-dark-text)]/68">
                    {stat.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </FadeIn> */}
      </div>
    </section>
  );
}

function GetSection() {
  return (
    <section id="shift" className="bg-[var(--ss-ink-2)] text-[var(--ss-light)]">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-12 sm:px-6 md:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
        <FadeIn>
          <SectionEyebrow light>THE SHIFT</SectionEyebrow>
          
          <h3 className="mt-5 max-w-[440px] font-[family:var(--font-cormorant)] text-[clamp(2.2rem,2.5vw,3.25rem)] leading-[1.02] tracking-[-0.03em]">
            From clarity, ease.
           {/*  <br />
            to move <span className="italic text-[var(--ss-bronze-soft)]">forward.</span> */}
          </h3>
          <p className="mt-6 max-w-[400px] text-[15px] leading-7 text-[var(--ss-muted)]">
            After two 2-hour sessions, you&apos;ll have a documented brand strategy covering the highest-leverage pieces of your positioning — plus a clear picture of where to focus next.
          </p>
        </FadeIn>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {benefits.map((item, index) => (
            <FadeIn
              key={item.number}
              delay={0.08 * index}
              className="grid gap-2 py-3 sm:grid-cols-[72px_1fr] sm:gap-1 sm:py-3"
            >
              <p className="pt-1 font-[family:var(--font-cormorant)] text-[30px] leading-none tracking-[-0.03em] text-[var(--ss-bronze)]">
                {item.number}
              </p>
              <div>
                <h3 className="text-[22px] leading-[1.15] text-[var(--ss-light)] sm:text-[18px]">
                  {item.title}
                </h3>
                <p className="mt-2.5 max-w-[540px] text-[14px] leading-6 text-[var(--ss-muted)]">
                  {item.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="bg-[var(--ss-cream)]">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-12 sm:px-6 md:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
        <FadeIn>
          <SectionEyebrow>THE PROCESS</SectionEyebrow>
          <h2 className="mt-5 max-w-[350px] font-[family:var(--font-cormorant)] text-[clamp(2.1rem,3.7vw,3.2rem)] leading-[1.03] tracking-[-0.03em] text-[var(--ss-dark-text)]">
            How we&apos;ll get it done together.
          </h2>
          <p className="mt-6 max-w-[350px] text-[14px] leading-7 text-[var(--ss-dark-text)]/72">
            The whole point of this session is that it works and feels focused. Everything is
            designed to give you the highest-impact strategy work in the least amount of time --
            without cutting corners on depth.
          </p>
        </FadeIn>

        <div className="space-y-6">
          {processSteps.map((step, index) => (
            <FadeIn
              key={step.number}
              delay={index * 0.06}
              className="grid gap-4 border-t border-[var(--ss-soft-border)] pt-5 sm:grid-cols-[88px_1fr]"
            >
              <div className="flex items-start gap-3 sm:block">
                <p className="font-[family:var(--font-cormorant)] text-[32px] leading-none text-[var(--ss-bronze)]/72">
                  {step.number}
                </p>
                <p className="font-[family:var(--font-cinzel)] text-[10px] uppercase tracking-[0.2em] text-[var(--ss-bronze)]/68 sm:mt-3">
                  {step.eyebrow}
                </p>
              </div>
              <div>
                <h3 className="text-[16px] leading-6 text-[var(--ss-dark-text)]">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-6 text-[var(--ss-dark-text)]/68">{step.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}


function TestimonialSection() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const active = testimonials[index];
  return (
    <section className="bg-[var(--ss-ink)] text-[var(--ss-light)]">
      <div className="mx-auto max-w-[1180px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start">
          <FadeIn className="max-w-[760px]">
            <p className="font-[family:var(--font-cormorant)] text-[24px] italic text-[var(--ss-bronze-soft)]/78">
              What clients say
            </p>
            <blockquote className="mt-8 font-[family:var(--font-cormorant)] text-[clamp(1.6rem,3.6vw,2rem)] italic leading-[1.14] tracking-[-0.03em] text-[var(--ss-light)]/96">
              &quot;{active.quote}&quot;
            </blockquote>
            <div className="mt-8 border-t border-[var(--ss-bronze)]/25 pt-5">
              <p className="font-[family:var(--font-cinzel)] text-[10px] uppercase tracking-[0.24em] text-[var(--ss-bronze-soft)]">
                {active.author}
              </p>
              <p className="mt-2 text-[12px] uppercase tracking-[0.18em] text-[var(--ss-light)]/58">
                {active.role}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="flex items-center gap-3 lg:pt-8">
            <button
              type="button"
              onClick={() => setIndex((value) => (value - 1 + total) % total)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--ss-bronze)]/25 text-[var(--ss-light)]/72 transition hover:border-[var(--ss-bronze-soft)] hover:text-[var(--ss-bronze-soft)]"
            >
              <ArrowLeft className="size-4" />
            </button>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--ss-light)]/56">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={() => setIndex((value) => (value + 1) % total)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--ss-bronze)]/25 text-[var(--ss-light)]/72 transition hover:border-[var(--ss-bronze-soft)] hover:text-[var(--ss-bronze-soft)]"
            >
              <ArrowRight className="size-4" />
            </button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}


function Offer() {
  return (
    <section id="offer" className="bg-[var(--ss-cream)] px-4 py-14 text-[var(--ss-dark-text)] sm:px-6 md:py-16 lg:px-8 lg:py-[72px]">
      <div className="mx-auto max-w-[1180px]">
        <SectionEyebrow>THE OFFER</SectionEyebrow>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-4">
          <h2 className="font-[family:var(--font-cormorant)] text-[2.1rem] font-light leading-[1.04] text-[var(--ss-dark-text)] sm:text-[2.65rem] lg:text-[3.2rem]">
            Your Brand Clarity Session —
          </h2>
          <span className="font-[family:var(--font-cinzel)] text-[1.75rem] font-semibold leading-none text-[var(--ss-bronze)] sm:text-[2.25rem] lg:text-[3rem]">
            $2,500
          </span>
        </div>
        <p className="mt-3 font-[family:var(--font-cinzel)] text-[11px] uppercase leading-5 tracking-[0.1em] text-[var(--ss-dark-text)]/40 sm:text-[12px]">
          Full investment, paid at booking
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(310px,370px)] lg:items-start lg:gap-12">
          {/* deliverables */}
          <div>
            {deliverables.map((d) => (
              <div
                key={d.title}
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                  padding: "12px 0",
                  borderBottom: "0.5px solid rgba(61,46,40,0.1)",
                  fontSize: 15,
                  color: T.ash,
                  lineHeight: 1.45,
                }}
              >
                <span style={{ color: T.garnet, flexShrink: 0, marginTop: 3, fontSize: 14 }}>→</span>
                {d.title}
              </div>
            ))}
          </div>

          {/* sticky CTA */}
          <div className="flex min-w-0 flex-col gap-4 border border-[rgba(61,46,40,0.12)] bg-white/40 p-5 shadow-[0_18px_50px_rgba(33,21,15,0.06)] sm:p-6 lg:sticky lg:top-24">
            <div style={{ fontFamily: "var(--font-cinzel)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,23,20,0.4)", marginBottom: 4 }}>
              Ready to commit?
            </div>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-[2px] bg-[var(--ss-bronze)] px-4 py-3.5 text-center font-[family:var(--font-cinzel)] text-[10px] font-semibold uppercase leading-5 tracking-[0.14em] text-[var(--ss-light)] no-underline shadow-[0_4px_20px_rgba(184,92,56,0.25)] transition hover:bg-[var(--ss-bronze-hover)] sm:px-6 sm:tracking-[0.2em]"
            >
              Book Your Session
            </a>
            <p style={{ fontSize: 12, color: "rgba(26,23,20,0.4)", lineHeight: 1.5, letterSpacing: "0.02em" }}>
              Secure Stripe checkout. You&apos;ll receive a scheduling link immediately after payment.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 11,
                color: "rgba(26,23,20,0.3)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              <span style={{ flex: 1, height: 0.5, background: "rgba(61,46,40,0.15)" }} />
              or
              <span style={{ flex: 1, height: 0.5, background: "rgba(61,46,40,0.15)" }} />
            </div>
            {/* <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-[2px] border border-[rgba(61,46,40,0.25)] bg-transparent px-4 py-3.5 text-center font-[family:var(--font-cinzel)] text-[10px] font-semibold uppercase leading-5 tracking-[0.12em] text-[var(--ss-dark-text)] no-underline transition hover:border-[var(--ss-bronze)] hover:text-[var(--ss-bronze)] sm:px-6 sm:tracking-[0.18em]"
            >
              Book a Free Discovery Call
            </a> */}
            <p style={{ fontSize: 12, color: "rgba(26,23,20,0.4)", lineHeight: 1.5, letterSpacing: "0.02em" }}>
              A 20-minute call, no pitch. Just a conversation to see if it&apos;s a good fit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const resultBullets = [
  "You've been in business for 2+ years and have real results to show",
  "You know your work is good, but feel your brand undersells it",
  "You're attracting inconsistent clients or the wrong clients",
  "You're ready to invest in getting it right, not just getting it prettier",
  "You want focused answers fast, not a months-long process",
] as const;

function FinalResultSection() {
  return (
    <section className="bg-[var(--ss-ink-2)] text-[var(--ss-light)]">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-2 lg:py-20">
        <FadeIn>
          <SectionEyebrow light>THE FINAL RESULT</SectionEyebrow>
          <h2 className="mt-5 max-w-[430px] font-[family:var(--font-cormorant)] text-[clamp(2.05rem,3.5vw,3rem)] leading-[1.03] tracking-[-0.03em]">
            A rich foundation to grow
          </h2>
          <div className="mt-6 max-w-[430px] space-y-5 text-[14px] leading-7 text-[var(--ss-muted)]">
            <p>
              At the end of our journey, you&apos;ll receive a Brand Playbook. This document captures
              who you serve, where you stand in your market, what makes you different, and where
              you want to focus your energy.
            </p>
            <p>
              This playbook is your foundation, there to guide all the other decisions you make
              about your brand with renewed ease.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <SectionEyebrow light>This session is right for you if:</SectionEyebrow>
          <ul className="mt-6 space-y-4">
            {resultBullets.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[13px] leading-6 text-[var(--ss-muted)]">
                <span className="pt-[2px] text-[var(--ss-bronze-soft)]">-&gt;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="questions" className="bg-[var(--ss-cream)]">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 md:py-14 lg:px-8 lg:py-16">
        <FadeIn>
          <SectionEyebrow>QUESTIONS</SectionEyebrow>
       
          <h2 className="mt-5 font-[family:var(--font-cormorant)] text-[clamp(2.1rem,2.5vw,3rem)] leading-[1.04] tracking-[-0.03em] text-[var(--ss-dark-text)]">
            Honest answers.
          </h2>
          <p className="mt-5 text-[14px] leading-7 text-[var(--ss-dark-text)]/68">
            If something isn&apos;t covered here, you&apos;re always welcome to reach out before booking. A
            discovery call is available if you want to talk through whether this is the right fit.
          </p>
        </FadeIn>
        <div className="mt-7 grid gap-4 lg:grid-cols-2">
          {faqColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-3">
              {column.map((faq, itemIndex) => (
                <AccordionItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                  delay={0.05 * (columnIndex * 3 + itemIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalBanner() {
  return (
    <section className="bg-[var(--ss-bronze)] text-[var(--ss-light)]">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center px-4 py-12 text-center sm:px-6 md:py-14 lg:px-8 lg:py-16">
        <FadeIn>
          <h2 className="font-[family:var(--font-cormorant)] text-[clamp(2.3rem,3.8vw,3.35rem)] leading-[1.08] tracking-[-0.03em]">
            Easy growth starts with digging deep.
          </h2>
          <CtaLink href="https://buy.stripe.com/00wbJ3ezC2WIg3NezSeUU01"  
          target="_blank"
          rel="noopener noreferrer" variant="ghost" className="mt-7 px-7 py-4">
            PAY &amp; BOOK - $2,500
          </CtaLink>
          <p className="mt-5 text-[14px] leading-6 text-[var(--ss-light)]/76">
            Book your 20-minute discovery call today.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--ss-ink)] text-[var(--ss-light)]">
      <div className="mx-auto grid max-w-[1400px] gap-7 px-4 py-10 sm:px-6 md:py-12 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1fr] lg:px-8">
        <div>
          <BrandMark />
          <p className="mt-5 max-w-[250px] text-[15px] leading-7 text-[var(--ss-muted)]">
            Helping women founders build brands that match the level they&apos;re actually operating at.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-full border border-white/10 p-2 text-[var(--ss-light)]/75 transition hover:border-[var(--ss-bronze)] hover:text-[var(--ss-bronze-soft)]"
                  aria-label={item.label}
                >
                  <Icon className="size-4" strokeWidth={1.7} />
                </a>
              );
            })}
          </div>
        </div>
        <FooterColumn title="LINKS" items={footerLinks} />
        <FooterColumn title="LEGAL" items={legalLinks} />
        <div>
          <p className="font-[family:var(--font-cinzel)] text-[10px] tracking-[0.22em] text-[var(--ss-bronze-soft)]">
            LET’S CONNECT
          </p>
          <p className="mt-5 max-w-[260px] text-[15px] leading-7 text-[var(--ss-muted)]">
            Have questions or ready to elevate your brand? We’d love to hear from you.
          </p>
          <a
            href="mailto:hello@silkandsteel.com"
            className="mt-5 inline-flex items-center gap-2 text-[15px] text-[var(--ss-light)] hover:text-[var(--ss-bronze-soft)]"
          >
            <Mail className="size-4" strokeWidth={1.8} />
            hello@silkandsteel.com
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 border-t border-white/10 px-4 py-4 text-[11px] text-[var(--ss-light)]/45 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© 2026 Silk & Steel. All rights reserved.</p>
       
      </div>
    </footer>
  );
}

function FloatingSocialProof() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.65 }}
      className="fixed bottom-6 right-6 z-40 hidden w-[260px] rounded-[4px] border border-[var(--ss-soft-border)] bg-[rgba(245,241,236,0.96)] p-3.5 shadow-[0_20px_55px_rgba(0,0,0,0.18)] backdrop-blur xl:block"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-full border border-[var(--ss-soft-border)] bg-white p-2 text-[var(--ss-bronze)]">
          <UsersRound className="size-4" strokeWidth={1.8} />
        </div>
        <div>
          <p className="font-medium text-[var(--ss-dark-text)]">3 spots remaining</p>
          <p className="mt-1 text-[13px] leading-5 text-[var(--ss-dark-text)]/70">
            This week for discovery calls
          </p>
        </div>
      </div>
    </motion.aside>
  );
}

function StickyCTA() {
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 hidden xl:block">
      <div className="mx-auto flex max-w-[560px] items-center justify-between gap-4 rounded-[6px] border border-[var(--ss-soft-border)] bg-[rgba(245,241,236,0.96)] p-3 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur">
        <p className="hidden flex-1 text-[13px] leading-5 text-[var(--ss-dark-text)]/78 sm:block">
          Ready to elevate your brand and attract your next-level clients?
        </p>
        <CtaLink href={BOOKING_URL} className="w-full min-w-0 px-4 py-3 sm:w-auto">
          BOOK NOW
        </CtaLink>
      </div>
    </div>
  );
}

function AccordionItem({
  question,
  answer,
  delay,
}: {
  question: string;
  answer: string;
  delay: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <FadeIn delay={delay}>
      <div className="overflow-hidden rounded-[4px] border border-[var(--ss-soft-border)] bg-white/60 shadow-[0_8px_24px_rgba(33,21,15,0.03)] transition duration-300 hover:border-[var(--ss-bronze)]/30">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-4 px-5 py-4.5 text-left"
        >
          <span className="text-[15px] leading-7 text-[var(--ss-dark-text)]">{question}</span>
          <Plus
            className={`size-4 shrink-0 text-[var(--ss-bronze)] transition-transform duration-300 ${
              open ? "rotate-45" : ""
            }`}
            strokeWidth={1.8}
          />
        </button>
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="px-5 pb-5 text-[13px] leading-7 text-[var(--ss-dark-text)]/72">{answer}</div>
        </motion.div>
      </div>
    </FadeIn>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="font-[family:var(--font-cinzel)] text-[10px] tracking-[0.22em] text-[var(--ss-bronze-soft)]">
        {title}
      </p>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.label}>
            <a href={item.href} className="text-[15px] text-[var(--ss-muted)] hover:text-[var(--ss-bronze-soft)]">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-[var(--ss-ink)] text-[var(--ss-light)]">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <ProblemStatsSection />
      <GetSection />
      <ProcessSection />
      <TestimonialSection />
      <Offer />
      {/* <DeliverablesSection /> */}
      <FinalResultSection />
      <FAQSection />
      <FinalBanner />
      <Footer />
      <FloatingSocialProof />
      <StickyCTA />
    </main>
  );
}
