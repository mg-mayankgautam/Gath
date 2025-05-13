import React, { useEffect } from "react";
import { useTheme } from "../../context/ThemeProvider";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { darkMode } = useTheme();


  return (
    <div className="bigscreen p-10 px-5 md:px-10 flex flex-col gap-5">
      <div>
        <div className="font-bold text-3xl md:text-4xl">Privacy Policy</div>
        <div
          className={`${
            darkMode ? "bg-[#284637]" : "bg-[#C9DBD2]"
          } py-1 px-2 rounded text-sm mt-2 w-fit`}
        >
          Last Updated On: 30 March'25
        </div>
      </div>

      <div className="flex flex-col gap-6 text-sm leading-relaxed">
        <p>
          Privacy Policy is part of the Terms of service of our website. By
          accepting the Terms of service and privacy policy, you grant consent
          to provide sensitive personal data or personal information. At the
          time of registration, Shotkut.com requires mandatory personal
          information. We request you not to register with Shotkut.com in case
          you do not want to share compulsory personal information. Without
          providing non-optional personal information, registration process
          cannot be completed. Shotkut.com may request additional personal
          information for grant of access to subscription based stock footage.
        </p>

        <p>
          Gath Productions Private Limited and its affiliated companies,
          conducting this business as Shotkut (hereinafter referred to as
          “Shotkut”, "us", "our" or "we") are dedicated to providing Users
          (hereinafter referred to as “User”, “Customer”, “they” or “you”) with
          the highest level of transparency and control over the use of their
          information. In order for us to provide Users with our Services, we
          are required to collect and process certain personal information about
          User and User’s activity. By entrusting Shotkut with your information,
          we would like to assure you of our commitment to keep such information
          private. We have taken measurable steps to protect the
          confidentiality, security and integrity of this Information.
        </p>

        <p>
          When Users use our Services, you consent to the collection, storage,
          use, disclosure and other uses of your Personal Data as described in
          this Privacy Policy. We urge you to read this Privacy Policy carefully
          and make sure that you fully understand and agree to it. If you do not
          agree to this Privacy Policy, please discontinue and avoid using our
          Services.
        </p>

        {/* Section 1 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Policy Objective</h2>
          <p>
            Shotkut.com respects your privacy and grants assurance that any
            information provided by you to Shotkut.com is protected and dealt
            with as per the applicable laws and this policy. Users are requested
            to provide necessary information to avail the services provided by
            Shotkut.com. The policy herein lays down the procedure followed for
            collection, use, disclosure, storage and management of the personal
            data of the user. The data is collected by Shotkut.com only for
            account verification purposes, completion of transactions and
            analysing requirements and behaviour of the user.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            2. What all comes under personal data?
          </h2>
          <p>
            User’s personal data includes the following types of information:
          </p>
          <div className="mt-2 ml-4">
            <p className="font-semibold">a. Sensitive Personal Data</p>
            <ul className="list-disc list-inside ml-4">
              <li>Account Password</li>
              <li>
                Financial Information including Bank details/ Debit Card/ Credit
                Card/ UPI/ other payment details
              </li>
            </ul>

            <p className="font-semibold mt-4">b. Other Personal Information:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Name</li>
              <li>Date of birth</li>
              <li>Mobile Number</li>
              <li>Email Address</li>
              <li>Contact Address</li>
              <li>PAN Number</li>
              <li>IP Address, browser type, language</li>
              <li>Date and time of access of site</li>
              <li>Address of website used for linking with Shotkut.com</li>
              <li>Photograph (for testimonials/ promotions)</li>
              <li>
                Such other relevant information defined as sensitive personal
                data under the applicable law
              </li>
            </ul>
            <p className="mt-2">
              Information provided by you can be updated by contacting us at{" "}
              <a
                href="mailto:support@shotkut.com"
                className="text-blue-600 underline"
              >
                support@shotkut.com
              </a>{" "}
              subject to reasonable checks and approvals.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">3. User Consents:</h2>

          <div className="ml-4">
            <p className="font-semibold">
              a. Consent to use Sensitive Personal Data and Other Personal
              Information
            </p>
            <p>
              Users of Shotkut agree and acknowledge to the usage of Sensitive
              Personal Data and other Personal Information for the purpose
              provided in the policy. The access to such personal information is
              restricted and is accessible to those who are required to know the
              said information.
            </p>
            <p>
              Consent can be withdrawn by users for usage of Sensitive Personal
              Data or Other Personal Information by sending an email at{" "}
              <a
                href="mailto:support@shotkut.com"
                className="text-blue-600 underline"
              >
                support@shotkut.com
              </a>
              . Any withdrawal of consent of all or any part of Sensitive
              Personal Data and other Personal Information can result in
              withdrawal of rights for availing services of Shotkut. Any
              withdrawal of consent shall not restrict Shotkut from using Other
              Personal Information for data analysis subject to the condition
              that usage of such Other Personal Information in any analysis is
              not personally identifiable.
            </p>
            <p>
              Photographs, videos or stock footages, if any, provided by the
              User grants rights to Shotkut to use it irrevocably and delete it
              at their sole discretion.
            </p>

            <p className="font-semibold mt-4">b. Consent for use of cookies</p>
            <p>
              A cookie is a text file for unique identification of your browser.
              You agree and acknowledge that when you visit the website, cookie
              may be left on your computer. Shotkut may use these cookies for
              authentication, data analysis, management and security purpose.
              Cookies are also assigned by advertisers of Shotkut upon clicking
              on advertisements displayed on websites wherein advertisers
              control such cookies and not Shotkut.
            </p>

            <p className="font-semibold mt-4">
              c. Consent to email communication
            </p>
            <p>
              Upon registration of your email address with Shotkut, you consent
              to receive emails from Shotkut and its authorised entities. You
              also acknowledge that when you invite your friends to subscribe on
              Shotkut, Shotkut sends emails to such person referred by you in
              your name and on your behalf. Such information related to your
              contacts may be accessed and stored by Shotkut for sending
              invitations and other periodic promotions.
            </p>
            <p>
              Shotkut uses customer’s contact information to contact the user
              when necessary. Shotkut also stores your contact related
              information for sending invitations, service offers and other
              promotional activities. Users may opt out of receiving future
              mails by clicking on the “unsubscribe” link in the emails that you
              receive from us. Please note that even if Users unsubscribe from
              our promotional or marketing emails, Shotkut may continue to send
              you service-related updates and notifications, or reply to User
              queries and feedback Users provide to Shotkut.
            </p>
          </div>
        </div>

        {/* sectionn 4 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            4. How do we use details provided by you?
          </h2>
          <p>
            Shotkut uses the provided details at the time of registration,
            deposit, withdrawal, response to a survey, market communication,
            site browsing, etc. Such information is utilised to:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>
              personalise your experience with the content you are attracted to
            </li>
            <li>enhance site mechanism</li>
            <li>
              aid in customer service, support and response to customer queries
            </li>
            <li>service announcements and offers</li>
            <li>marketing, promotions, surveys, analytical research, etc.</li>
            <li>perform transactions</li>
            <li>check reviews and ratings</li>
            <li>follow up after correspondence via email, SMS, etc.</li>
          </ul>
          <p className="mt-2">
            Shotkut shares user information with companies in our group as well
            as our employees, in order to provide you with our services. Shotkut
            shares user information with business partners, such as storage and
            analytics providers who help us provide users with our services.
            Such third parties may have access to user Personal Data for
            performance of tasks on user’s behalf, but they are obligated to
            comply with this Privacy Policy and may not use User Personal Data
            for any other purpose. Shotkut may use User’s Personal Data in order
            to enforce their policies, including but not limited to user’s
            client agreement.
          </p>
          <p className="mt-2">
            Shotkut uses software applications to analyse the website traffic
            and gather statistics used for advertisement and determination of
            efficacy and popularity of Shotkut. Shotkut further uses this data
            to tailor its visitor's experience and services at its website,
            showing them content that Shotkut thinks they might be interested
            in, and displaying the content according to their preferences.
          </p>
          <p className="mt-2">
            Shotkut uses display advertisement and remarketing through Google
            Analytics ads of Shotkut which are displayed on such sites which use
            the cookies of first party and third party for optimisation of ads
            on the basis of visitors on the website. Visitors have an option to
            opt out from Google Analytics for display advertisements using the
            ad preference manager.
          </p>
          <p className="mt-2">
            Shotkut uses pixels, cookies, events and other technologies
            (collectively, "Tracking Technologies") which allows Shotkut to
            automatically collect information about User, User device and User’s
            online behaviour to enhance User navigation in our services, improve
            our services’ performance, perform analytics and customize User
            experience. We store Tracking Technologies when User visits or
            access our Services. These are called "First Party Tracking
            Technologies". In addition, Tracking Technologies are stored by
            other third parties (for example our analytics service providers,
            business partners and advertisers) – these are called "Third Party
            Tracking Technologies". Both types of Tracking Technologies may be
            stored either for the duration of your visit on our Services or for
            repeat visits.
          </p>
          <p className="mt-2">
            Shotkut does not sell personal information about its users. Shotkut
            may share customer information with its clients who may send
            promotional material to users. Shotkut maintains a strict "No-Spam"
            policy that means Shotkut does not sell, rent, or otherwise give its
            users’ e-mail address to a third-party, without their consent or as
            permitted by this Privacy Policy.
          </p>
          <p className="mt-2">
            Sensitive Personal Information is used by Shotkut to process and
            fulfil the order placed by its users. Such Sensitive Personal
            Information is not shared by Shotkut with any third parties for any
            purpose except as provided in this Privacy Policy without your
            express permission.
          </p>
          <p className="mt-2">
            Wherever customers provide their Sensitive Personal Information to
            Shotkut, they agree to accept the terms of this Privacy Policy
            available on the website.
          </p>
        </div>

        {/* section 5 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
          <p>
            Appropriate security measures are taken by Shotkut for protection of
            unauthorised access or alteration, disclosure or destruction of
            data. Such measures include data collection review, storage,
            processing, security measures, encryption, and physical measures for
            safeguarding any unauthorised access. Information security program
            of Shotkut is diversified with implication of managerial,
            operational, physical, and technical security control measures for
            protecting Sensitive Personal Data and Other Personal Information.
          </p>
          <p className="mt-2">
            Shotkut stores the collected information in a secure manner with
            firewalls as a security application. However, Shotkut does not
            guarantee any non-breach of security measures. Transmitted data on
            internet is exposed to threats or security risks and Shotkut does
            not guarantee any security for such information in the course of
            transmission or in case of unsolicited disclosures made by any user.
          </p>
          <p className="mt-2">
            Shotkut, upon registration, protects the account with login
            information including username and password known to the user. Users
            are requested not to share their personal information with anyone
            whosoever. Any breach herein shall constitute violation of Policy
            and account deactivation depending on the nature of the case. In
            case of any breach of security or compromise of login details, you
            are requested to notify Shotkut at the earliest.
          </p>
          <p className="mt-2">
            Links related to other websites might be present on the website
            which are governed by their own privacy policies and Shotkut
            exercises no control in the said case. You are responsible for
            reading and understanding the privacy policy of such websites upon
            clicking on links of other websites. While sharing any personal
            information with any other third party advertising on the website,
            you are advised to be cautious and Shotkut holds no responsibility
            upon sharing of such information with third party websites.
          </p>
          <p className="mt-2">
            Shotkut does not share any personally identifiable information with
            any other entity including sponsors and advertisers of Shotkut.
            Personal information including name, login ID, etc. shall be used by
            Shotkut for periodic analysis and survey done for market research
            and advertisement. Shotkut reserves the right to share registration
            information with companies appointed for advertisement and market
            research purposes. Non-personal information may also be used
            cumulatively for the purpose of audit and analysis for improvement
            of services.
          </p>
        </div>

        {/* section 6 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            6. Data Retention Policy
          </h2>
          <p>
            Shotkut reserves the right to retain information provided by the
            users for such period as may be necessary for fulfilment of purpose
            of information collection as provided under this Privacy Policy,
            subject to requirement of retention for a longer period as may be
            necessary under the applicable law.
          </p>
        </div>

        {/* section 7 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">7. Exclusions</h2>
          <p>
            Shotkut reserves the right to share Sensitive Personal data and
            other Personal Information in case it is necessary:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>in case of any legal proceedings;</li>
            <li>for enforcement of Terms of Service and this Privacy Policy</li>
            <li>
              to prevent a fraud, stop any activity we may consider to be, or to
              pose a risk of being, illegal, unethical, inappropriate or legally
              actionable
            </li>
            <li>in case of any information security related issue</li>
            <li>
              to protect user's rights, rights of any third party, rights of
              Shotkut or general public
            </li>
            <li>in good faith belief that such action is necessary</li>
            <li>
              to protect and defend the rights or property of Shotkut related
              properties, or visitors to the Shotkut and related properties
            </li>
            <li>
              identify persons who may be violating the law, Shotkut's legal
              notice or any other website user agreement, rights of third
              parties, or otherwise misusing the Shotkut's website, its assets
              or its related properties
            </li>
            <li>
              to take precautions against liabilities, investigate and defend
              ourselves against any third party claims or allegations,
              investigate and protect ourselves from fraud, protect the security
              or integrity of our services and protect the rights and property
              of Shotkut, its users and/or partners
            </li>
            <li>fulfilment of a customer's order or request</li>
            <li>
              for reasonable precautions to keep the information disclosed to
              them secure
            </li>
          </ul>
          <p className="mt-2">
            Shotkut reserves the right to transfer all such information in
            connection with transactions such as a merger, acquisition,
            reorganization, bankruptcy, or sale of all or part of Shotkut's
            capital stock or assets. Any party that acquires our assets as part
            of such a transaction may continue to use customer's Personal Data
            in accordance with the terms of this Privacy Policy. Furthermore,
            Shotkut is not responsible for any breach of security or for any
            actions of any third parties that receive the information. Shotkut
            is not responsible for such third party privacy policies or how they
            treat information about their users.
          </p>
        </div>

        {/* section 8 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            8. Limitation of Liability
          </h2>
          <p>
            Shotkut confirms that this Privacy Policy is a description of its
            operation regarding the information related to the user. This policy
            does not create any legal rights in your favour. All the rights to
            alter this Policy are reserved with Shotkut without any prior notice
            of the same. The liability of Shotkut is limited to removal of
            Sensitive Personal Data from the website system and identifiable
            elements of other personal information.
          </p>
          <p className="mt-2">
            In case of any alteration in the applicable laws of land,
            unforeseeable political disturbance, intervention by government
            authorities, force majeure or Act of God, Shotkut shall not be held
            liable for anything beyond the direct control. We put in our best
            efforts to ensure safety of your information, however, with the
            increase in number of cyber-attacks, we do not guarantee that there
            can be no slip-up of personal details. We do hereby declare that
            Shotkut shall not be accountable for any indirect, incidental,
            momentous or disciplinary harm which pertains to utilisation or
            disclosure of personal information on Shotkut.com. Shotkut shall be
            under no liability whatsoever for any loss or damage arising
            directly or indirectly as a result of any fraudulent transaction
            from card holder's account or any decline of authorization of any
            transaction, on account of cardholder having exceeded the preset
            limit mutually agreed with the bank.
          </p>
        </div>

        {/* section 9 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">9. Children</h2>
          <p>
            To be able to use and access our services, you must have attained
            the age of majority. We request parents/ legal guardians not to
            allow minors to submit/ disclose any Personal Information to
            Shotkut. In case of any such disclosure, you consent to the
            processing of such minor's Personal Information and accept and agree
            to be bound by this Privacy Policy. You are hereby responsible for
            the actions of your minor.
          </p>
        </div>

        {/* section 10 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">10. Governing Law</h2>
          <p>
            You consent to the application of laws of the Republic of India
            which govern this Privacy Policy and any dispute which arises in
            respect hereof shall be subject to the process of dispute resolution
            as provided under our Terms and Conditions.
          </p>
        </div>

        {/* section 11 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">11. Changes</h2>
          <p>
            We reserve the right to make periodical changes to this Privacy
            Policy and any prominent change herein shall be notified/ displayed
            on the webpage. Users are required to read and accept such terms for
            further access to Services.
          </p>
        </div>

        {/* section 12 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">12. Contact us</h2>
          <p>
            Any query, comment, grievance redressal, complaints or feedback
            associated with personal data or Privacy Policy can be sent to our
            Grievance Redressal Officer at{" "}
            <a
              href="mailto:support@shotkut.com"
              className="text-blue-600 underline"
            >
              support@shotkut.com
            </a>
            .
          </p>
        </div>

        {/* section 13 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">13. Effectiveness</h2>
          <p>
            This Privacy Policy shall be effective from April 2025 and shall
            continue to be in place unless amended or revised as per applicable
            law.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
