import type { Metadata } from "next";
import { site } from "@/content/en";
import { Clause, LegalPage } from "@/components/legal/LegalPage";
import { languageAlternates } from "@/components/RootShell";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Rosekorn Studio collects and uses your personal data, under Thailand’s Personal Data Protection Act B.E. 2562 (2019) (PDPA).",
  alternates: languageAlternates("en", "/privacy/"),
};

const toc = [
  { id: "controller", label: "Who we are" },
  { id: "data", label: "Data we collect" },
  { id: "purpose", label: "How we use it" },
  { id: "cookies", label: "Cookies" },
  { id: "sharing", label: "Sharing your data" },
  { id: "retention", label: "How long we keep it" },
  { id: "rights", label: "Your rights" },
  { id: "security", label: "Security" },
  { id: "client-sites", label: "Data on client websites" },
  { id: "changes", label: "Changes to this policy" },
];

export default function Privacy() {
  return (
    <LegalPage
      locale="en"
      path="/privacy/"
      eyebrow="Privacy policy · PDPA"
      title="Privacy policy"
      updated="13 November 2026"
      toc={toc}
      intro={
        <>
          <p>
            We collect only what we need to discuss your project and build your website. We do not sell your data, and we do not use
            tracking or advertising cookies. This policy is written under Thailand’s Personal Data Protection Act B.E. 2562 (2019)
            (&ldquo;PDPA&rdquo;).
          </p>
          <p className="mt-3 text-base text-muted">
            This English version is provided for convenience. If it differs from the Thai version, the Thai version prevails.
          </p>
        </>
      }
    >
      <Clause id="controller" n={1} title="Who we are">
        <p>
          {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is the data controller for personal data collected through{" "}
          {site.url.replace("https://", "")} and the studio’s contact channels.
        </p>
        <p>
          For anything related to your personal data, email <a href={`mailto:${site.email}`}>{site.email}</a> or message us on LINE at{" "}
          <a href={site.lineUrl}>{site.lineOaId}</a>.
        </p>
      </Clause>

      <Clause id="data" n={2} title="Data we collect">
        <ul>
          <li>
            <strong>What you enter in the contact form:</strong> your name, a way to reach you (LINE ID, phone number or email), your type
            of business, the package you are interested in, and details about your project.
          </li>
          <li>
            <strong>Project records:</strong> messages exchanged over LINE or email, quotes, invoices, proof of payment, and files you send
            us for use on your website.
          </li>
          <li>
            <strong>Technical data:</strong> IP address, browser type and time of visit, logged automatically by our hosting provider to
            keep the service secure.
          </li>
        </ul>
        <p>We do not ask for sensitive data such as religion, health or biometric data. Please do not include it in the form.</p>
      </Clause>

      <Clause id="purpose" n={3} title="How we use it">
        <table>
          <thead>
            <tr>
              <th>Purpose</th>
              <th>Legal basis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Replying to you, scoping your project and preparing the quote you asked for</td>
              <td>Steps taken at your request before entering into a contract</td>
            </tr>
            <tr>
              <td>Building and delivering your website, and supporting it afterwards</td>
              <td>Performance of a contract</td>
            </tr>
            <tr>
              <td>Issuing receipts and keeping accounting and tax records</td>
              <td>Legal obligation</td>
            </tr>
            <tr>
              <td>Preventing spam and attacks on the website</td>
              <td>Legitimate interest</td>
            </tr>
            <tr>
              <td>Sending studio news or promotions</td>
              <td>Your consent only, which you may withdraw at any time</td>
            </tr>
          </tbody>
        </table>
      </Clause>

      <Clause id="cookies" n={4} title="Cookies">
        <p>
          This website does not use analytics, marketing or advertising cookies. Our hosting provider may set cookies that are strictly
          necessary for security; these are not used to identify you.
        </p>
        <p>If we add analytics in the future, we will ask for your consent first and update this policy.</p>
      </Clause>

      <Clause id="sharing" n={5} title="Sharing your data">
        <p>We never sell or rent your data. We share it only with service providers we need to do the work:</p>
        <ul>
          <li>Cloudflare, for website hosting and security</li>
          <li>LINE and our email provider, when you choose to contact us through them</li>
          <li>GitHub, for storing your website’s source code</li>
          <li>Government authorities, where the law requires it</li>
        </ul>
        <p>
          Some providers store data on servers outside Thailand. We only use providers with adequate data protection standards, as the
          PDPA requires.
        </p>
      </Clause>

      <Clause id="retention" n={6} title="How long we keep it">
        <ul>
          <li>Enquiries that do not become projects: deleted within 1 year of our last contact</li>
          <li>Client and financial records: kept for 5 years after the project ends, as Thai accounting and tax law requires</li>
          <li>Technical data: kept according to our hosting provider’s retention cycle</li>
        </ul>
      </Clause>

      <Clause id="rights" n={7} title="Your rights">
        <p>Under the PDPA, you have the right to:</p>
        <ul>
          <li>Access your data and receive a copy of it</li>
          <li>Have your data corrected and kept up to date</li>
          <li>Have your data deleted, destroyed or anonymised</li>
          <li>Restrict or object to the use of your data</li>
          <li>Have your data transferred to another party</li>
          <li>Withdraw any consent you have given</li>
          <li>Lodge a complaint with the Personal Data Protection Committee (PDPC)</li>
        </ul>
        <p>
          Send requests to <a href={`mailto:${site.email}`}>{site.email}</a>. We respond within 30 days, free of charge.
        </p>
      </Clause>

      <Clause id="security" n={8} title="Security">
        <p>
          Every page is served over an encrypted connection (HTTPS). Accounts that hold your data use two-factor authentication, and access
          is limited to the people working on your project. If a data breach affects you, we will notify you and the PDPC within the time
          the law requires.
        </p>
      </Clause>

      <Clause id="client-sites" n={9} title="Data on client websites">
        <p>
          On websites we build for clients, the client is the data controller for their visitors’ data, and we act only as a data processor
          on the client’s instructions. We can help draft a privacy policy for your site, but you should have it reviewed by your own legal
          adviser.
        </p>
      </Clause>

      <Clause id="changes" n={10} title="Changes to this policy">
        <p>
          When we change this policy, we update the &ldquo;Last updated&rdquo; date above, and we tell current clients if a change affects
          their rights.
        </p>
      </Clause>
    </LegalPage>
  );
}
