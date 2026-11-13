import type { Metadata } from "next";
import { carePlan, launchPromo, site } from "@/content/en";
import { Clause, LegalPage } from "@/components/legal/LegalPage";
import { languageAlternates } from "@/components/RootShell";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "Terms for working with Rosekorn Studio: scope, payment, revisions, delivery, ownership of the work, and cancellation.",
  alternates: languageAlternates("en", "/terms/"),
};

const toc = [
  { id: "scope", label: "What these terms cover" },
  { id: "quote", label: "Quotes and getting started" },
  { id: "packages", label: "What each package includes" },
  { id: "payment", label: "Payment" },
  { id: "client", label: "What you provide" },
  { id: "revisions", label: "Revisions and extra work" },
  { id: "delivery", label: "Delivery and acceptance" },
  { id: "ip", label: "Ownership of the work" },
  { id: "content", label: "Your content" },
  { id: "warranty", label: "Warranty" },
  { id: "care", label: "Care Plan" },
  { id: "cancel", label: "Cancellation" },
  { id: "liability", label: "Limitation of liability" },
  { id: "law", label: "Governing law" },
];

/** What each package does and does not include (the quote for each job spells out the details) */
const scope = [
  {
    name: "Landing Basic",
    yes: "A one-page template adapted to your brand colours and copy, a contact form, mobile-ready layout",
    no: "A fully custom design, extra pages, special animation",
  },
  {
    name: "Landing Custom",
    yes: "One custom-designed page built with Next.js, technical SEO, Open Graph, 2 rounds of revisions",
    no: "3D and special animation (available as add-ons), member accounts, online payments",
  },
  {
    name: "Landing Signature",
    yes: "A 3D scene designed for your brand, scroll-driven storytelling, a menu or catalogue that orders via LINE, custom illustrations, 3 rounds of revisions",
    no: "Product photography, 3D models scanned from real objects, an admin back office",
  },
  {
    name: "Shop Starter",
    yes: "Shopify or WooCommerce setup, theme customisation, 20 products uploaded",
    no: "Platform subscription fees, paid plugins, uploading more than 20 products",
  },
];

export default function Terms() {
  return (
    <LegalPage
      locale="en"
      path="/terms/"
      eyebrow="Terms of service"
      title="Terms of service"
      updated="13 November 2026"
      toc={toc}
      intro={
        <>
          <p>
            In short: pay a 50% deposit and we start; you get the number of revision rounds your package includes; settle the balance and
            you receive the code and full ownership. The details are below.
          </p>
          <p className="mt-3 text-base text-muted">
            This English version is provided for convenience. If it differs from the Thai version, the Thai version prevails.
          </p>
        </>
      }
    >
      <Clause id="scope" n={1} title="What these terms cover">
        <p>
          These terms apply to every project a client commissions from {site.name} (&ldquo;the studio&rdquo;). The details of each project
          are set out in its quote. If the quote and these terms differ, the quote applies.
        </p>
      </Clause>

      <Clause id="quote" n={2} title="Quotes and getting started">
        <ul>
          <li>Quotes are valid for 30 days and list what is and isn’t included in the price.</li>
          <li>Work begins once you confirm the quote in writing (a chat message or email is fine) and the deposit has been paid.</li>
          <li>Delivery times are counted from the day we receive the deposit and all the information we need.</li>
        </ul>
      </Clause>

      <Clause id="packages" n={3} title="What each package includes">
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Package</th>
                <th>Included</th>
                <th>Not included</th>
              </tr>
            </thead>
            <tbody>
              {scope.map((s) => (
                <tr key={s.name}>
                  <td className="whitespace-nowrap font-semibold">{s.name}</td>
                  <td>{s.yes}</td>
                  <td>{s.no}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Unless the quote says otherwise, no package includes domain fees, hosting after the first year, third-party service fees, paid
          images or fonts, or copywriting and product descriptions.
        </p>
      </Clause>

      <Clause id="payment" n={4} title="Payment">
        <ul>
          <li>50% deposit before work begins, and the remaining 50% before we hand over the domain, code and admin access.</li>
          <li>Payment by bank transfer or PromptPay, as stated on the invoice.</li>
          <li>Prices on this website exclude VAT, where applicable.</li>
          {launchPromo.active ? (
            <li>
              Launch pricing applies to our first {launchPromo.total} clients until {launchPromo.until}, on the condition that the client
              allows us to feature the project in our portfolio and writes one review.
            </li>
          ) : null}
          <li>
            If the final payment is more than 30 days overdue after delivery, the studio may suspend any site hosted on the studio’s servers
            until payment is received in full.
          </li>
        </ul>
      </Clause>

      <Clause id="client" n={5} title="What you provide">
        <ul>
          <li>Your logo, images, copy, product details and prices in a usable format</li>
          <li>Access to the accounts we need to connect, such as LINE OA, Google Business Profile and your domain</li>
          <li>One contact person who can make decisions about the project</li>
        </ul>
        <p>
          If materials arrive late, the delivery date moves back by the same amount of time. If a project is on hold waiting for the client
          for more than 60 days, the studio may close it and charge for the work completed so far.
        </p>
      </Clause>

      <Clause id="revisions" n={6} title="Revisions and extra work">
        <ul>
          <li>The number of revision rounds follows your package or quote.</li>
          <li>&ldquo;One round&rdquo; means a single, consolidated list of changes sent by the client.</li>
          <li>Revisions beyond the included rounds are charged at ฿350 per hour.</li>
          <li>Features or pages not in the quote require a new written quote before work begins.</li>
        </ul>
      </Clause>

      <Clause id="delivery" n={7} title="Delivery and acceptance">
        <p>On handover you receive:</p>
        <ul>
          <li>Your website, live on your own domain</li>
          <li>The full source code in your GitHub account, with a README on how to run and update it</li>
          <li>Admin access to every account related to the website</li>
        </ul>
        <p>You have 7 days after delivery to review the work. If no issues are reported within that time, the work is considered accepted.</p>
      </Clause>

      <Clause id="ip" n={8} title="Ownership of the work">
        <ul>
          <li>Once paid in full, you own the design, illustrations and code created specifically for your project.</li>
          <li>
            Base code the studio reuses across projects, and open-source libraries, remain with their original owners. You receive a
            permanent licence to use and modify them on your own website.
          </li>
          <li>The studio may show the work in its portfolio and on social media, unless we agree in writing that it will not.</li>
        </ul>
      </Clause>

      <Clause id="content" n={9} title="Your content">
        <p>
          You confirm that you have the right to use the images, copy, logos and information you send us for the website, and you are
          responsible for the content of your site, including its privacy policy.
        </p>
      </Clause>

      <Clause id="warranty" n={10} title="Warranty">
        <p>
          The studio fixes bugs caused by its own code free of charge for 30 days after delivery. This does not cover new features, changes
          made to the code by you or others, or changes to third-party services.
        </p>
      </Clause>

      <Clause id="care" n={11} title="Care Plan">
        <p>
          The Care Plan costs ฿{carePlan.price} per month, billed monthly in advance, and can be cancelled with 30 days’ notice. Unused
          hours do not roll over to the next month.
        </p>
      </Clause>

      <Clause id="cancel" n={12} title="Cancellation">
        <ul>
          <li>Cancel within 7 days of paying the deposit, before design work has started: full refund of the deposit.</li>
          <li>Cancel after work has started: the deposit is non-refundable, and you receive the work completed so far.</li>
          <li>If the studio cancels: we refund the portion covering work not yet done.</li>
        </ul>
      </Clause>

      <Clause id="liability" n={13} title="Limitation of liability">
        <p>
          The studio’s liability for any project is limited to the fees paid for that project and excludes indirect losses, such as sales
          lost while a site is offline. Nothing here limits any liability that cannot be excluded by law.
        </p>
      </Clause>

      <Clause id="law" n={14} title="Governing law">
        <p>These terms are governed by the laws of Thailand. If a dispute arises, both parties will first try to resolve it together.</p>
      </Clause>
    </LegalPage>
  );
}
