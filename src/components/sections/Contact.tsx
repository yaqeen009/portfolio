import ActionLink from "../ActionLink";
import Reveal from "../Reveal";
import Section from "../Section";
import { site } from "../../data/site";

/**
 * Contact is a set of real destinations. There is deliberately no form: a form
 * with nowhere to send is worse than an email address.
 */
export default function Contact() {
  const links = [site.links.github, site.links.linkedin];

  return (
    <Section id="contact" index="06" label="Contact" title="Say hello.">
      <Reveal>
        <p className="max-w-[44ch] font-display text-2xl leading-snug text-text md:text-3xl">
          <a href={site.links.email.href} className="link-underline transition-colors hover:text-accent">
            {site.email}
          </a>
        </p>
      </Reveal>

      <Reveal>
        <p className="mt-6 max-w-[58ch] text-[0.9375rem] leading-relaxed text-text-muted">
          Email is the fastest way to reach me. I am glad to talk about engineering work, immersive and interactive
          systems, or the research directions on this page — and if something here looks wrong or unfinished, I would
          rather hear it than not.
        </p>
      </Reveal>

      <Reveal>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ActionLink href={site.links.email.href}>Send an email</ActionLink>
          <ActionLink href={site.links.github.href} variant="quiet" external>
            GitHub
          </ActionLink>
          <ActionLink href={site.links.linkedin.href} variant="quiet" external>
            LinkedIn
          </ActionLink>
        </div>
      </Reveal>

      <Reveal>
        <dl className="mt-16 grid gap-x-10 gap-y-6 border-t border-line pt-8 sm:grid-cols-2">
          {links.map((link) => (
            <div key={link.href}>
              <dt className="annot">{link.label}</dt>
              <dd className="mt-2">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm text-text-muted hover:text-text"
                >
                  {link.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
