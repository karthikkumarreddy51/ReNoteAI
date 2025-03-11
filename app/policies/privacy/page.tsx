export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Privacy Policy
        </h1>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
          <div className="prose prose-blue max-w-none">
            {/* Last Updated */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-8">
              <p className="text-gray-700 font-medium">Last updated: July 15, 2024</p>
            </div>

            {/* Summary of Key Points */}
            <div className="bg-white/50 p-6 rounded-xl mb-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 text-blue-900">Summary of Key Points</h2>
              <p>
                This summary provides key points from our privacy notice, but you
                can find out more details about any of these topics by clicking the
                link following each key point or by using our table of contents
                below to find the section you are looking for.
              </p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  <strong>What personal information do we process?</strong>{" "}
                  When you visit, use, or navigate our Services, we may process
                  personal information depending on how you interact with us and the
                  Services, the choices you make, and the products and features you
                  use.{" "}
                  <a
                    href="#what-information-do-we-collect"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Learn more
                  </a>
                </li>
                <li>
                  <strong>Do we process any sensitive personal information?</strong>{" "}
                  We do not process sensitive personal information.
                </li>
                <li>
                  <strong>Do we collect any information from third parties?</strong>{" "}
                  We do not collect any information from third parties.
                </li>
                <li>
                  <strong>How do we process your information?</strong> We process
                  your information to provide, improve, and administer our Services,
                  communicate with you, for security and fraud prevention, and to
                  comply with law.{" "}
                  <a
                    href="#how-do-we-process-your-information"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Learn more
                  </a>
                </li>
                <li>
                  <strong>
                    In what situations and with which types of parties do we share
                    personal information?
                  </strong>{" "}
                  We may share information in specific situations and with specific
                  categories of third parties.{" "}
                  <a
                    href="#when-and-with-whom-do-we-share-your-personal-information"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Learn more
                  </a>
                </li>
                <li>
                  <strong>How do we keep your information safe?</strong> We have
                  organisational and technical processes and procedures in place to
                  protect your personal information.{" "}
                  <a
                    href="#how-do-we-keep-your-information-safe"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Learn more
                  </a>
                </li>
                <li>
                  <strong>What are your rights?</strong> Depending on where you are
                  located, you may have certain rights regarding your personal
                  information.{" "}
                  <a
                    href="#what-are-your-privacy-rights"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Learn more
                  </a>
                </li>
                <li>
                  <strong>How do you exercise your rights?</strong> The easiest way to
                  exercise your rights is by contacting us at{" "}
                  <a
                    href="mailto:info@renote.al"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    info@renote.al
                  </a>
                  .
                </li>
              </ul>
            </div>

            {/* Table of Contents */}
            <nav className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl mb-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-900">Table of Contents</h2>
              <ol className="list-decimal list-inside space-y-2 text-blue-600">
                <li>
                  <a href="#what-information-do-we-collect">
                    WHAT INFORMATION DO WE COLLECT?
                  </a>
                </li>
                <li>
                  <a href="#how-do-we-process-your-information">
                    HOW DO WE PROCESS YOUR INFORMATION?
                  </a>
                </li>
                <li>
                  <a href="#when-and-with-whom-do-we-share-your-personal-information">
                    WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                  </a>
                </li>
                <li>
                  <a href="#what-is-our-stance-on-third-party-websites">
                    WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?
                  </a>
                </li>
                <li>
                  <a href="#do-we-use-cookies">
                    DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                  </a>
                </li>
                <li>
                  <a href="#how-long-do-we-keep-your-information">
                    HOW LONG DO WE KEEP YOUR INFORMATION?
                  </a>
                </li>
                <li>
                  <a href="#how-do-we-keep-your-information-safe">
                    HOW DO WE KEEP YOUR INFORMATION SAFE?
                  </a>
                </li>
                <li>
                  <a href="#what-are-your-privacy-rights">
                    WHAT ARE YOUR PRIVACY RIGHTS?
                  </a>
                </li>
                <li>
                  <a href="#do-we-make-updates-to-this-notice">
                    DO WE MAKE UPDATES TO THIS NOTICE?
                  </a>
                </li>
                <li>
                  <a href="#how-can-you-contact-us-about-this-notice">
                    HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                  </a>
                </li>
                <li>
                  <a href="#how-can-you-review-update-or-delete-your-data">
                    HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
                    YOU?
                  </a>
                </li>
              </ol>
            </nav>

            {/* Content Sections */}
            <div className="space-y-8">
              {/* Section: What Information Do We Collect? */}
              <section id="what-information-do-we-collect" className="bg-white/50 rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-blue-900">
                  WHAT INFORMATION DO WE COLLECT?
                </h2>
                <h3 className="text-xl font-semibold mb-2">
                  Personal information you disclose to us
                </h3>
                <p>
                  <strong>In Short:</strong> We collect personal information that
                  you provide to us.
                </p>
                <p>
                  We collect personal information that you voluntarily provide to
                  us when you register on the Services, express an interest in
                  obtaining information about us or our products and Services, when
                  you participate in activities on the Services, or otherwise when
                  you contact us.
                </p>
                <p>
                  <strong>Personal Information Provided by You.</strong> The personal
                  information that we collect depends on the context of your
                  interactions with us and the Services, the choices you make, and
                  the products and features you use. The personal information we
                  collect may include the following:
                </p>
                <ul className="list-disc ml-6">
                  <li>names</li>
                  <li>phone numbers</li>
                  <li>email addresses</li>
                  <li>mailing addresses</li>
                  <li>job titles</li>
                  <li>usernames</li>
                  <li>passwords</li>
                  <li>contact preferences</li>
                  <li>contact or authentication data</li>
                </ul>
                <p>
                  <strong>Sensitive Information.</strong> We do not process sensitive
                  information.
                </p>
                <h3 className="text-xl font-semibold mb-2">Application Data</h3>
                <p>
                  If you use our application(s), we may also collect the following
                  information if you choose to provide us with access or permission:
                </p>
                <p>
                  <strong>Mobile Device Access:</strong> We may request access or
                  permission to certain features from your mobile device, including
                  your mobile device&rsquo;s camera, storage, calendar, contacts,
                  microphone, reminders, and other features. If you wish to change
                  our access or permissions, you may do so in your device&rsquo;s
                  settings.
                </p>
                <p>
                  <strong>Mobile Device Data:</strong> We automatically collect
                  device information (such as your mobile device ID, model, and
                  manufacturer), operating system, version information and system
                  configuration information, browser type and version, and if you are
                  using our application(s), your mobile device&rsquo;s operating
                  system or platform, the type of mobile device you use, and
                  information about the features of our application(s) you accessed.
                  This information is primarily needed to maintain the security and
                  operation of our applications, for troubleshooting, and for our
                  internal analytics and reporting purposes.
                </p>
                <p>
                  All personal information that you provide to us must be true,
                  complete, and accurate, and you must notify us of any changes to
                  such personal information.
                </p>
                <h3 className="text-xl font-semibold mb-2">
                  Information automatically collected
                </h3>
                <p>
                  <strong>In Short:</strong> Some information – such as your
                  Internet Protocol (IP) address and/or browser and device
                  characteristics – is collected automatically when you visit our
                  Services.
                </p>
                <p>
                  We automatically collect certain information when you visit, use,
                  or navigate the Services. This information does not reveal your
                  specific identity (like your name or contact information) but may
                  include device and usage information, browser and device
                  characteristics, operating system, device name, country, how and
                  when you use our Services, and other technical information. This
                  information is primarily needed to maintain the security and
                  operation of our Services, and for our internal analytics and
                  reporting purposes.
                </p>
                <p>
                  The information we collect includes:
                </p>
                <ul className="list-disc ml-6">
                  <li>
                    <strong>Log and Usage Data:</strong> Service-related,
                    diagnostic, usage, and performance information our servers
                    automatically collect when you access or use our Services and
                    record in log files. This may include your IP address, device
                    information, browser type, details about your activity (e.g.,
                    date/time stamps, pages viewed, searches, and actions taken),
                    and device event information (e.g., system activity, error
                    reports, and hardware settings).
                  </li>
                  <li>
                    <strong>Device Data:</strong> Information about your computer,
                    phone, tablet, or other device used to access the Services.
                    Depending on the device, this may include device and application
                    identification numbers, location, browser type, hardware model,
                    operating system, and system configuration information.
                  </li>
                </ul>
              </section>

              {/* Section: How Do We Process Your Information? */}
              <section id="how-do-we-process-your-information" className="bg-white/50 rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-blue-900">
                  HOW DO WE PROCESS YOUR INFORMATION?
                </h2>
                <p>
                  <strong>In Short:</strong> We process your information to provide,
                  improve, and administer our Services, communicate with you, for
                  security and fraud prevention, and to comply with law. We may also
                  process your information for other purposes with your consent.
                </p>
                <p>
                  We process your personal information for various reasons, including:
                </p>
                <ul className="list-disc ml-6">
                  <li>
                    To facilitate account creation and authentication and manage user
                    accounts.
                  </li>
                  <li>To deliver and facilitate delivery of services to you.</li>
                  <li>
                    To respond to user inquiries and offer support to users.
                  </li>
                  <li>
                    To send administrative information such as product details,
                    service changes, and policy updates.
                  </li>
                  <li>
                    To request feedback and contact you about your use of our Services.
                  </li>
                  <li>
                    To protect our Services, including fraud monitoring and prevention.
                  </li>
                  <li>
                    To evaluate and improve our Services, products, marketing, and your
                    experience.
                  </li>
                  <li>
                    To identify usage trends and better understand how our Services are
                    used.
                  </li>
                  <li>
                    To comply with legal obligations, respond to legal requests, and
                    defend our legal rights.
                  </li>
                </ul>
              </section>

              {/* Section: When And With Whom Do We Share Your Personal Information? */}
              <section id="when-and-with-whom-do-we-share-your-personal-information" className="bg-white/50 rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-blue-900">
                  WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                </h2>
                <p>
                  <strong>In Short:</strong> We may share your data with third-party
                  service providers who perform services for us or on our behalf and
                  require access to such information to do that work.
                </p>
                <p>
                  The categories of third parties we may share personal information
                  with include, but are not limited to, data analytics services.
                </p>
              </section>

              {/* Section: What Is Our Stance On Third-Party Websites? */}
              <section id="what-is-our-stance-on-third-party-websites" className="bg-white/50 rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-blue-900">
                  WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?
                </h2>
                <p>
                  <strong>In Short:</strong> We are not responsible for the safety of
                  any information you share with third parties that we may link to or
                  that advertise on our Services, and we are not affiliated with them.
                </p>
                <p>
                  Our Services may include links to third-party websites, online
                  services, or mobile applications, and may contain advertisements.
                  We do not guarantee the safety or privacy of data you provide to
                  these third parties. Any data collected by third parties is not
                  covered by this privacy notice, and we are not responsible for their
                  content or practices. Please review their policies and contact them
                  directly with any concerns.
                </p>
                <p>
                  <strong>Google Analytics:</strong> We may share your information
                  with Google Analytics to track and analyse the use of our Services.
                  The Google Analytics Advertising Features we may use include
                  Demographics and Interests Reporting. To opt out, visit{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    this link
                  </a>{" "}
                  or adjust your Ads Settings. For more details on Google&rsquo;s
                  privacy practices, please visit their Privacy &amp; Terms page.
                </p>
              </section>

              {/* Section: Do We Use Cookies And Other Tracking Technologies? */}
              <section id="do-we-use-cookies" className="bg-white/50 rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-blue-900">
                  DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                </h2>
                <p>
                  [Information about cookies and tracking technologies can be added
                  here if applicable. If not, you may state that we only use such
                  technologies as necessary for the operation of our Services.]
                </p>
              </section>

              {/* Section: How Long Do We Keep Your Information? */}
              <section id="how-long-do-we-keep-your-information" className="bg-white/50 rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-blue-900">
                  HOW LONG DO WE KEEP YOUR INFORMATION?
                </h2>
                <p>
                  <strong>In Short:</strong> We retain your personal information only
                  as long as necessary to fulfil the purposes outlined in this privacy
                  notice unless otherwise required by law.
                </p>
                <p>
                  We will keep your personal information for as long as it is necessary
                  for the purposes set out in this privacy notice, unless a longer
                  retention period is required or permitted by law. Specifically, we
                  will retain your personal information, including your email address,
                  until you request its deletion or until we delete it from our
                  database. This is necessary to allow you to access your synchronized
                  files if you reinstall the application and log in with your
                  previously registered email address.
                </p>
                <p>
                  When there is no ongoing legitimate business need to process your
                  personal information, we will either delete or anonymise it, or if
                  that is not possible (e.g., due to backups), we will securely store it
                  until deletion is feasible.
                </p>
              </section>

              {/* Section: How Do We Keep Your Information Safe? */}
              <section id="how-do-we-keep-your-information-safe" className="bg-white/50 rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-blue-900">
                  HOW DO WE KEEP YOUR INFORMATION SAFE?
                </h2>
                <p>
                  <strong>In Short:</strong> We have implemented organisational and
                  technical measures to protect your personal information.
                </p>
                <p>
                  We have implemented appropriate and reasonable technical and
                  organisational security measures designed to protect the personal
                  information we process. However, no electronic transmission or
                  storage system can be 100% secure, so while we strive to protect your
                  data, we cannot guarantee its absolute security. We recommend that
                  you only access our Services within a secure environment.
                </p>
              </section>

              {/* Section: What Are Your Privacy Rights? */}
              <section id="what-are-your-privacy-rights" className="bg-white/50 rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-blue-900">
                  WHAT ARE YOUR PRIVACY RIGHTS?
                </h2>
                <p>
                  <strong>In Short:</strong> You may review, change, or terminate your
                  account at any time, subject to applicable laws.
                </p>
                <p>
                  <strong>Withdrawing your consent:</strong> If we rely on your consent
                  to process your personal information, you have the right to withdraw
                  that consent at any time by contacting us using the details provided
                  in the “HOW CAN YOU CONTACT US ABOUT THIS NOTICE?” section. Please
                  note that this will not affect the lawfulness of processing conducted
                  before the withdrawal.
                </p>
                <p>
                  <strong>Account Information:</strong> You can review or change your
                  account information by logging into your account settings. If you
                  request account termination, we will deactivate or delete your account
                  and its information from our active databases, though we may retain
                  some data for fraud prevention, troubleshooting, or legal compliance.
                </p>
                <p>
                  If you have any questions or comments about your privacy rights,
                  please contact us at{" "}
                  <a
                    href="mailto:info@renote.ai"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    info@renote.ai
                  </a>
                  .
                </p>
              </section>

              {/* Section: Do We Make Updates To This Notice? */}
              <section id="do-we-make-updates-to-this-notice" className="bg-white/50 rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-blue-900">
                  DO WE MAKE UPDATES TO THIS NOTICE?
                </h2>
                <p>
                  <strong>In Short:</strong> Yes, we will update this notice as necessary
                  to stay compliant with relevant laws.
                </p>
                <p>
                  We may update this privacy notice from time to time. The updated
                  version will be indicated by a revised date at the top of the notice.
                  If material changes are made, we may notify you by prominently posting
                  a notice or by sending you a direct notification. We encourage you to
                  review this notice frequently to stay informed about how we protect
                  your information.
                </p>
              </section>

              {/* Section: How Can You Contact Us About This Notice? */}
              <section id="how-can-you-contact-us-about-this-notice" className="bg-white/50 rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-blue-900">
                  HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                </h2>
                <p>
                  If you have questions or comments about this notice, you may email
                  us at{" "}
                  <a
                    href="mailto:info@renote.ai"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    info@renote.ai
                  </a>{" "}
                  or contact us by post at:
                </p>
                <p className="mt-2">
                  ReNote AI Pvt Ltd<br />
                  [Address Line]<br />
                  India
                </p>
              </section>

              {/* Section: How Can You Review, Update, Or Delete The Data We Collect From You? */}
              <section id="how-can-you-review-update-or-delete-your-data" className="bg-white/50 rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-blue-900">
                  HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
                </h2>
                <p>
                  Based on the applicable laws of your country, you may have the right
                  to request access to, correct, or delete the personal information we
                  collect. You may also have the right to withdraw your consent to our
                  processing of your personal information. These rights may be subject
                  to certain limitations under applicable law.
                </p>
                <p>
                  To request to review, update, or delete your personal information,
                  please contact us at{" "}
                  <a
                    href="mailto:info@renote.ai"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    info@renote.ai
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
