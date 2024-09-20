import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Component() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <nav className="md:col-span-1">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <ul className="space-y-2">
              <li>
                <a
                  href="#introduction"
                  className="text-blue-600 hover:underline"
                >
                  Introduction
                </a>
              </li>
              <li>
                <a
                  href="#content-copyright"
                  className="text-blue-600 hover:underline"
                >
                  Content & Copyright Policy
                </a>
              </li>
              <li>
                <a href="#liability" className="text-blue-600 hover:underline">
                  Liability
                </a>
              </li>
              <li>
                <a href="#trademarks" className="text-blue-600 hover:underline">
                  Trademarks
                </a>
              </li>
              <li>
                <a
                  href="#termination"
                  className="text-blue-600 hover:underline"
                >
                  Termination of Account
                </a>
              </li>
            </ul>
          </ScrollArea>
        </nav>
        <main className="md:col-span-3">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <section id="introduction" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p>
                The domain name www.retroweebs.com (&quot;Website&quot;) is a
                site operated by RetroWeebs Pvt. Ltd., a company incorporated
                under the laws of India with its registered office at [insert
                address] (&quot;Company/RetroWeebs&quot;).
              </p>
              <p className="mt-4">
                RetroWeebs enables artists to earn money from their artwork by
                making it available for sale on a variety of products, while
                maintaining control of their rights. We prioritize the quality
                and respect of artistic representation and expect all RetroWeebs
                users to respect copyright.Whether you are an artist, customer,
                or simply browsing the Website, please respect the copyrights of
                all works displayed or purchased on RetroWeebs.
              </p>
              <p className="mt-4">
                By using the services on www.retroweebs.com, you agree to the
                following terms of service, conditions, policies, etc.
                (&quot;Terms of Service&quot;), which may be updated from time
                to time. Please check this page regularly for updates to the
                Terms of Service. If you do not agree to these terms, please
                refrain from using the Website.
              </p>
              <p className="mt-4">
                RetroWeebs provides a range of services, including but not
                limited to publishing, selling, commenting on, promoting, and
                purchasing art-related products; interacting with other users;
                and utilizing RetroWeebs&apos; product production services such
                as payment processing, transaction handling, product
                manufacturing, packaging, order fulfillment, and customer
                service.
              </p>
            </section>
            <section id="content-copyright" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Content & Copyright Policy
              </h2>
              <p>
                You acknowledge that all information, images, pictures, data,
                text, music, sound, photographs, graphics, video, messages, or
                other materials (collectively referred to as
                &quot;Content&quot;) are the exclusive property of the person
                from whom such Content originated. RetroWeebs does not claim any
                permanent ownership of your Content. You retain copyright and
                any other rights you hold in Content that you submit, post,
                upload, display, or sell on or through RetroWeebs. By doing so,
                you grant RetroWeebs a perpetual, irrevocable, worldwide,
                royalty-free, and non-exclusive (and sub-licensable) license to
                use and archive the Content as reasonably contemplated by this
                Agreement.
              </p>
              <p className="mt-4">
                RetroWeebs does not manually screen all Content before it is
                displayed on the Website. Occasionally, members may
                inadvertently or deliberately submit inappropriate Content,
                including but not limited to Content that infringes on
                copyright, defames individuals or groups, or is otherwise
                objectionable. RetroWeebs reserves the right to review, and if
                necessary, remove any Content or cancel accounts at its sole
                discretion if such Content breaches this Agreement or any
                applicable laws.
              </p>
              <p className="mt-4">
                You are solely responsible for all Content that you upload for
                sale or make available via RetroWeebs. RetroWeebs does not
                control the Content posted via its services, and therefore does
                not guarantee the accuracy, integrity, or quality of such
                Content. You acknowledge that by using RetroWeebs, you may be
                exposed to Content that is offensive or objectionable.
                RetroWeebs will not be held liable for any errors, omissions, or
                damages resulting from such Content
              </p>
              <p className="mt-4">
                RetroWeebs and its designees reserve the right to pre-screen,
                refuse, or remove any Content that violates the Terms of Service
                or is deemed inappropriate. You agree to evaluate and assume all
                risks associated with using any Content, including reliance on
                its accuracy or completeness.
              </p>
              <p className="mt-4">
                RetroWeebs may access, preserve, and disclose your account
                information and Content if required by law or in good faith
                belief that such actions are reasonably necessary to comply with
                legal processes, enforce the Terms of Service, or protect the
                rights, property, or personal safety of RetroWeebs and its
                users.
              </p>
              <p className="mt-4">
                By using RetroWeebs, you agree to receive promotional or
                informational content via SMS or email. Once you place an order,
                you are automatically subscribed to order-related WhatsApp
                notifications.
              </p>
              <p className="mt-4">
                RetroWeebs reserves the right to limit, suspend, or terminate
                services or accounts if users create problems, violate legal
                obligations, or act inconsistently with the Terms of Service.
                Unconfirmed or inactive accounts may also be canceled without
                prior notice.
              </p>
            </section>
            <section id="liability" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Liability</h2>
              <p>
                RetroWeebs is not responsible for other users&apos; Content,
                actions, or inactions. We do not guarantee the quality, safety,
                or legality of collaborations advertised on the Website or the
                ability of parties to complete transactions. RetroWeebs does not
                guarantee continuous or secure access to its services, and the
                operation of the Website may be disrupted by factors outside of
                our control. To the extent permitted by law, RetroWeebs
                disclaims all implied warranties, terms, and conditions related
                to the use of the Website.
              </p>
              <p className="mt-4">
                You are responsible for ensuring that your access to the Website
                and services is lawful. RetroWeebs is not liable for any losses
                or damage arising from your use of the Website, including but
                not limited to errors, interruptions, data loss, or exposure to
                malicious software.
              </p>
              <p className="mt-4">
                RetroWeebs may not be able to confirm the identity of other
                users or prevent users from acting under false pretenses. You
                must take appropriate precautions when interacting with others
                on the Website.
              </p>
            </section>
            <section id="trademarks" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Trademarks</h2>
              <p>
                If you use any RetroWeebs trademarks in reference to our
                products or services, you must include a statement attributing
                the trademark to RetroWeebs, only after obtaining prior written
                permission. You must not use any of our trademarks in a
                misleading manner, or in a way that implies an association with
                RetroWeebs without our consent.
              </p>
            </section>
            <section id="termination" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Termination of Account
              </h2>
              <p>
                RetroWeebs may terminate your access to all or any part of its
                services at any time, with or without cause, with or without
                notice, and effective immediately. You may terminate your use of
                the service at any time. However, you shall continue to be bound
                by all provisions of these Terms of Service, which shall survive
                termination, including, without limitation, ownership
                provisions, warranty disclaimers, indemnity, and limitations of
                liability.
              </p>
              <p>
                RetroWeebs will terminate your access to the site if, in
                RetroWeebs&apos; sole discretion, you are determined to be a
                repeat infringer of the Content & Copyright Policy and/or these
                Terms of Service.
              </p>
              <p>
                RetroWeebs may, but is not obligated to, provide you with one
                warning if you have violated these Terms of Service prior to the
                termination of your account.
              </p>
              <p>
                By accepting the terms and conditions, you consent to pay
                RetroWeebs the full amount for any order placed through
                RetroWeebs. However, RetroWeebs does not control any fees or
                charges applied by your bank in connection with your purchase
                and disclaims any liability regarding such fees.
              </p>
            </section>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
