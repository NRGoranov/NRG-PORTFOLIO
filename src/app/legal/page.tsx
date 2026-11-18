import type { Metadata } from "next";
import Link from "next/link";
import { controller, privacyUpdated } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Legal notice",
  description: "Who operates nrgtrw.com and what the site does not sell.",
};

export default function LegalNoticePage() {
  return (
    <article className="container max-w-3xl py-24">
      <p className="text-sm text-muted-foreground">Updated {privacyUpdated}</p>
      <h1 className="mt-3 text-4xl font-bold">Legal notice</h1>
      <dl className="mt-8 space-y-4 text-muted-foreground">
        <Row term="Operator" value={controller.name} />
        <Row term="Site" value={controller.brand} />
        <Row term="Location" value={controller.location} />
        {controller.postalAddress ? <Row term="Postal address" value={controller.postalAddress} /> : null}
        <Row term="Email" value={controller.email} />
        <Row term="Phone" value={controller.phone} />
      </dl>
      <div className="mt-8 space-y-4 text-muted-foreground">
        <p>
          This site presents work and a clothing interest list. It does not take payment, does not close a
          sale, and does not store card numbers. A count of interested people is not an offer you can accept
          by clicking.
        </p>
        <p>
          If a distance sale is agreed later, the pre-contract information (identity, total price including
          taxes, delivery cost, and withdrawal rights) has to be given before you are bound. That information
          is not on this site yet, because checkout does not exist here.
        </p>
        <p>
          If a page blocks you, email {controller.email} and I will send the content another way. The target
          is WCAG 2.2 AA. This sentence is not an audit certificate.
        </p>
        <p>
          <Link className="underline" href="/privacy">
            Privacy notice
          </Link>
        </p>
      </div>
    </article>
  );
}

function Row({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-medium text-foreground">{term}</dt>
      <dd>{value}</dd>
    </div>
  );
}
