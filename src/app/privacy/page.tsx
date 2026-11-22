import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { AnalyticsObjection } from "@/components/AnalyticsObjection";
import { controller, privacyUpdated, WISHLIST_CONSENT_TEXT } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "What nrgtrw.com collects, why, and how to stop it.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <article className="container max-w-3xl py-24">
      <p className="text-sm text-muted-foreground">Updated {privacyUpdated}</p>
      <h1 className="mt-3 text-4xl font-bold">Privacy notice</h1>
      <p className="mt-4 text-muted-foreground">
        {controller.name} ({controller.location}) operates {controller.brand} at{" "}
        <a className="underline" href={controller.site}>
          {controller.site}
        </a>
        . Contact: <a className="underline" href={`mailto:${controller.email}`}>{controller.email}</a>
        {" · "}
        <a className="underline" href={`tel:${controller.phone.replace(/\s/g, "")}`}>{controller.phone}</a>.
        This notice covers the GDPR and the UK GDPR where they apply. It is the notice at collection, not a
        contract that waives your rights.
      </p>

      <Section title="Consultation form">
        <p>
          If you book a consultation, the server receives your name, business name, email address, phone
          number if you add one, business type, service of interest, and message. When email is configured,
          that copy is sent to my mailbox. When it is not, the same fields may be written to a private file
          on the server so I can still reply. If neither email nor that file can be used, the form says so
          and nothing is kept. I use the request to answer you, on the basis of steps you asked for before a
          contract, or legitimate interest in replying (GDPR Art. 6(1)(b) or 6(1)(f)). I do not add you to a
          mailing list because you wrote once.
        </p>
      </Section>

      <Section title="Clothing interest list">
        <p>
          The clothing pages are not published. The source is still in the project, and this section still
          describes the list if you joined it earlier. The clothing pages do not take payment. If you leave
          an email, it is stored with the piece you
          named, the time, and the fact that you agreed to this sentence: “{WISHLIST_CONSENT_TEXT}” The
          basis is consent (GDPR Art. 6(1)(a), and the ePrivacy rules on email). If those pages are published
          again, the page shows a count, not the addresses. I can see the addresses because I operate the list.
        </p>
        <p className="mt-3">
          Storage is Supabase when the site is deployed. Your browser also keeps the address locally so the
          button can show that you already checked in. Withdraw from the same dialog, or email me. Withdrawal
          stops future mail. It does not undo a message already sent.
        </p>
      </Section>

      <Section title="Audience measurement">
        <p>
          Vercel Web Analytics and Speed Insights run without cookies and without writing an identifier on
          your device. Vercel describes a request hash that resets daily and is used for aggregated counts
          (pages, referrer, browser, country). The basis is legitimate interest in knowing whether the site
          works (Art. 6(1)(f)). Vercel, Inc. processes that data and may do so in the United States under its
          standard contractual clauses. This is not advertising and I do not sell or share personal
          information for cross-context advertising.
        </p>
        <AnalyticsObjection />
      </Section>

      <Section title="What stays on your device">
        <p>
          The interest-list address is in local storage under <code>nrg-clothing-wishlist-signups</code>.
          Background settings are under <code>nrg-light-pillar-settings</code>. An objection to measurement
          is under <code>nrg-analytics-objection</code>. Clearing site data removes them. They are not sent
          to an ad network.
        </p>
      </Section>

      <Section title="How long">
        <p>
          A consultation that is emailed stays in the mailbox until the thread is finished and I delete it.
          A consultation saved only as a private server file stays until I have replied and deleted the file.
          Interest-list
          addresses stay until you withdraw or I delete the list after the notice for that piece is done.
          There is no separate marketing archive.
        </p>
      </Section>

      <Section title="Your rights">
        <p>
          You can ask for access, correction, deletion, restriction, or a copy of the data I actually hold,
          and you can object to legitimate-interest processing. The measurement control above is the
          objection for audience measurement. The interest-list dialog is the withdrawal for that email.
          You can complain to the Commission for Personal Data Protection in Bulgaria (cpdp.bg) or, if you
          are elsewhere in the EEA or the UK, to your local authority. I do not make decisions about you by
          automated means that produce legal effects.
        </p>
        <p className="mt-3">
          The site is not aimed at children. Do not send a child’s email address.
        </p>
      </Section>

      <p className="mt-10 text-sm text-muted-foreground">
        <Link className="underline" href="/legal">
          Legal notice
        </Link>
      </p>
    </article>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-3 space-y-3 text-muted-foreground">{children}</div>
    </section>
  );
}
