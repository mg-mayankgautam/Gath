import React, { useEffect } from 'react'

const Terms = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='bigscreen p-10 flex flex-col gap-5'>

      <div>
        <div className='font-bold text-4xl'>Terms and Conditions</div>
        <div className='bg-[#C9DBD2] py-1 px-2 rounded text-sm mt-2 w-fit'>Effective Date: 09 April'25</div>
      </div>

      <div className='flex flex-col gap-6 text-sm leading-relaxed'>

        <p>
          Welcome to www.shotkut.com ("Website") and Shotkut Application ("App"), a platform that develops, markets, sells, purchases, mediates the sale and purchase of content and stock footages including photos, videos, short films and scripts ("Products") under its own brand name, 'Shotkut' via App, Website, online channels and retailers to the market in India and abroad (Website and App are hereinafter collectively referred to as the "Platform/ Shotkut") owned and managed by Gath Productions Private Limited and its affiliates ("Company").
        </p>

        <p>
          These Terms and Conditions ("Terms"/ "Terms and Conditions") along with the privacy policy of the Platform ("Privacy Policy") and other terms and conditions of the Platform, govern your visit and use of the Platform for sale of Company's Products or purchase of third party products by the Company for the purpose of self-use or re- sale and any other Services offered through the Platform(s) (together or individually referred to as "Services") operated by the Company.
        </p>

        {/* Section 1 - Introduction */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>1. Introduction</h2>
          <p>
            In this Terms and Conditions "we", "our" and "us" refers to the Company and "you", "your" and/or "Users" refers to the user(s) of the Platform. Our Platform is for the Users intending to avail the Services, however, the Services provided on the Platform are not being offered to or intended to be used by the residents of European Union, United Kingdom and United States of America.
          </p>
          <p className='mt-2'>
            If you are resident of India and under the age of 18, or if you are resident of any other country and are considered to be of any age determined for use of internet services but are less than the contractual age determined by the applicable laws of such country, you and your parent or legal guardian should review this Terms and Conditions to make sure that you and your parent or legal guardian understands and agrees to it, and by using the Platform, you confirm to us that your use of the Platform is with the permission of your parent or legal guardian, and further, if required, you and your parent or legal guardian shall perform or undertake such activities which will entitle you to enter into a legally binding and enforceable agreement with the Company.
          </p>
          <p className='mt-2'>
            If you represent a company, partnership firm or sole proprietorship, you shall be eligible to access and use the Platform to conduct the transactions on its behalf only if you have been duly authorized by way of necessary corporate action, as may be prescribed statutorily and/or under the charter documents of such entity. If you are availing the Service on behalf of an organisation or any legal entity as admin user ("Admin User"), you represent and warrant that you have the actual authority to agree to these Terms on behalf of such organisation and/or legal entity.
          </p>
          <p className='mt-2'>
            By using this Platform or accepting this Terms and Conditions, you and your parent or legal guardian represent and warrant to the Company that you or your parent or legal guardian are 18 years of age or older, and that you have the right, authority and capacity to use the Platform and agree to and abide by this Terms and Conditions.
          </p>
          <p className='mt-2'>
            If you are accessing, browsing and using the Platform on someone else's behalf; you represent that you have the authority to bind that person to all the Terms herein. In the event that the person refuses to be bound as the principal to the Terms, you agree to accept liability for any harm caused by any wrongful use of the Platform resulting from such access or use of the Platform in whatsoever nature.
          </p>
          <p className='mt-2'>
            This Terms and Conditions is an electronic record in the form of an electronic contract formed under the Information Technology Act, 2000, rules made thereunder, and any other applicable statutes, as amended from time to time. This Terms and Conditions does not require any physical, electronic or digital signature.
          </p>
          <p className='mt-2'>
            Please read these Terms and Conditions and Privacy Policy (as updated on the Platform time to time) carefully. By accessing and utilising the Services on the Platform, you indicate, agree and acknowledge that you understand and consent to this Terms and Conditions, our Privacy Policy and other Terms and Conditions of the Platform (hereinafter collectively referred to as the "User Agreements"), and to the collection and use of information in accordance with this Terms and Conditions.
          </p>
          <p className='mt-2'>
            Your use of the Services on behalf of your organization shall also be governed by terms of the User Agreements. Additionally, the use of the Services is subject to the provisions and validity of order form and/or software services agreement, if any, executed by your organisation with the Company.
          </p>
          <p className='mt-2'>
            If you do not agree with (or cannot comply with) the User Agreements, then you may not use the Service, but please let us know by emailing at <a href='mailto:support@shotkut.com' className='text-blue-600 underline'>support@shotkut.com</a> so we can try to find a solution. These Terms apply to all visitors, Users and others who wish to access or use Services.
          </p>
          <p className='mt-2'>
            The Users expressly agrees and acknowledges that these Terms and Conditions and Privacy Policy are co-terminus in nature and that expiry/termination of either one will lead to the termination of the other. Further, the Platform provides access rights of the Services for a subscription/service period mentioned in the order form and/or software services agreement executed between the organisation authorising you and the Company ("Subscription Period"). Upon termination or expiry of Subscription Period, access to all or part of the Services available to User accounts and Admin User accounts associated with such organisation may also be terminated.
          </p>
        </div>

        {/* Section 2 - System Requirements */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>2. System Requirements</h2>
          <p>
            Use of the Services requires one or more compatible devices, internet access, and certain software, and may require obtaining updates or upgrades from time to time. Because use of the Services involves hardware, software, and Internet access, your ability to access and use the Services may be affected by the performance of these factors. High speed internet access and download speed is recommended. You acknowledge and agree that such system requirements, which may be changed from time to time, are your responsibility.
          </p>
        </div>

        {/* Section 3 - Terms of Offer */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>3. Terms of Offer</h2>
          <p>
            The Platform offers Products and Services for sale. The Products and Services shall include trial products/services and the products/services offered free of cost. By placing an order for the Products/ Services through the Platform, you agree to the Terms and Conditions set forth herein. The Products/Services described on the Platform, and any samples thereof we may provide to you, are for personal use only. You may not sell or resell any of the Products/Services, or samples thereof, you receive from us unless agreed otherwise. We reserve the right, with or without notice, to cancel or reduce the quantity of any Products/Services to be provided to you that we believe, in our sole discretion, may result in the violation of our Terms and Conditions.
          </p>
          <p className='mt-2'>
            The Company may change, suspend, or discontinue the availability of any of the Products/Services at any time, without any notice or liability. You acknowledge that the price payable in connection with the Products or any Service, may be subject to change, without notice or liability.
          </p>
          <p className='mt-2'>
            While describing our Products on our Platform, we endeavour to be as accurate as possible. To the extent implied by applicable law, we do not warrant that the Product descriptions, colours, information or other content available on the Platform are accurate, complete, reliable, current, or error-free. The Platform may contain typographical errors or inaccuracies and may not be complete or updated. Such errors, inaccuracies or omissions may also relate to pricing and availability of the Product or Services. Please note that the Product pictures are indicative and may not match the actual Product.
          </p>
        </div>

        {/* Section 4 - Customer Solicitation */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>4. Customer Solicitation</h2>
          <p>
            By accessing the Platform or placing an order or sending any information, you are communicating with the Company electronically and you agree to receive communications (including transactional, promotional and/or commercial messages) from the Company periodically and as and when required. We may communicate with you by e-mail, SMS, phone call or by posting notices on the Platform or by any other mode of communication. At any point of time, you have the right to withdraw your consent by following the opt-out procedure (as mentioned hereinafter).
          </p>
        </div>

        {/* Section 5 - Tax */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>5. Tax</h2>
          <p>
            If you purchase any Products/Services, you will be responsible for paying any applicable taxes in relation to such purchase.
          </p>
          <p className='mt-2'>
            Transaction taxes: In any jurisdiction where we are required to collect and/or pay any GST, VAT, sales tax or other taxes that apply to transactions on Shotkut, you acknowledge and agree that:
          </p>
          <ul className='list-disc list-inside ml-4 mt-2'>
            <li>we may add the applicable tax, or make an appropriate adjustment, to the amount payable;</li>
            <li>we will generally display the tax amount at checkout or on an applicable invoice, and it will be included in the total amount payable; and</li>
            <li>we will collect this tax amount via any means available to us, and remit the tax to the relevant authority.</li>
          </ul>
          <p className='mt-2'>
            Tax information: From time to time, we may request or collect information or documentation from you that may be used for tax purposes, including location information for tax residency purposes. Tax rates are calculated based on this information and the applicable tax rate at the relevant time. Any information you provide must be accurate, complete and kept up-to-date.
          </p>
        </div>

        {/* Section 6 - User License for Services */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>6. User License for Services</h2>
          <p>
            The Company will provide the Services and standard updates to the Services that are made generally available by the Company during the term of your use of the Platform. The Company may, at its sole discretion, discontinue the Services or modify the features of the Services from time to time without prior notice.
          </p>
          <p className='mt-2'>
            Subject to the terms of the User Agreements, the Company grants a non-exclusive, non-transferable, non-sublicensable right and license to access and use the Platform and the Services solely for your professional (commercial or otherwise) or educational purposes, strictly in accordance with these Terms and Conditions (including without limitation any applicable service-specific terms), User Agreements and all applicable scope of use descriptions.
          </p>
          <p className='mt-2'>
            The Company may enable platforms of other companies, organisations, etc. to market the Services of the Company and retarget or relocate the Users to the Company's Platform. In such an event, the Users shall be bound by the Terms and Conditions of Company as well as those of such other companies, organisations, etc.
          </p>
          <p className='mt-2'>
            The Company may also provide and/or facilitate third-party hardware for which, Users will be bound to Terms and Conditions of such hardware provider, however the Company shall not be held liable for any issues arising out of the use of such third-party hardware and any claims and actions shall be made directly against the hardware provider.
          </p>
        </div>

        {/* Section 7 - User Accounts */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>7. User Accounts</h2>
          <p>
            When you create an account with us, you guarantee that you are above the age of 18 years, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Platform.
          </p>
          <p className='mt-2'>
            In case the Services needs to be used by a person who does not fulfil the age requirements mentioned above (as may be revised as per applicable laws from time to time) and is desirous of registering on the Platform i.e., if a User is a minor/child, then the account must be created by the parents or legal guardian who has agreed to these Terms and Conditions, and the Users may use the Platform with the consent of, and under the supervision of, their parent or legal guardian. Accordingly, in such a case, the parent or legal guardian must agree to this Terms and Conditions at the time of their registration on the Platform. In the event a person below the age of 18 years utilizes the Services, it is assumed that he/she has obtained the consent of the parents or legal guardian and such use is made enabled by the parents or legal guardian, and that such usage by the minor/child User is under the supervision of their parent or legal guardian. The Company will not be responsible for any consequence that arises as a result of misuse of any kind that may occur by virtue of any person registering for the Services.
          </p>
          <p className='mt-2'>
            Users need to sign up for a free User account by providing all required information in order to access or use the Services. We recommend that you sign up for User accounts by providing the assigned institutional email address by your organization. The Users may verify and authenticate the registration of their account through email id/mobile number OTP verification. You agree to: (a) provide true, accurate, current and complete information about yourself as prompted by the sign-up process; and (b) maintain and promptly update the information provided during sign up to keep it true, accurate, current, and complete. If you provide any information that is untrue, inaccurate, outdated, or incomplete, or if the Company has reasonable grounds to suspect that such information is untrue, inaccurate, outdated, or incomplete, the Company may terminate your User Account and refuse current or future use of any or all of the Services.
          </p>
          <p className='mt-2'>
            You are responsible for maintaining the confidentiality of your account, contact details and/or password, including but not limited to the restriction of access to your computer and/or account. Contact details include your email address, street address and phone number (but not social network handles).You agree to accept responsibility for any and all activities or actions that occur under your account and/or password, whether your password is with our Service or a third-party service. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account. If we have found a breach or suspected breach of the security of your Account, we may require you to change your password, temporarily or permanently block or suspend your account without any liability to the Company.
          </p>
          <p className='mt-2'>
            You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you, without appropriate authorization. You may not use as a username any name that is offensive, vulgar or obscene.
          </p>
          <p className='mt-2'>
            Your organization's administrator may authorise your User Account through the panel on the Admin User account and/or through such other modes enabled on the Platform. Towards this, the Admin User might also require you to follow additional rules and may be able to access or disable your user account, at its sole discretion.
          </p>
          <p className='mt-2'>
            We reserve the right to refuse Services, terminate accounts, remove or edit content, or cancel subscriptions/ orders in our sole discretion.
          </p>
        </div>

        {/* Section 8 - Communications */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>8. Communications</h2>
          <p>
            When you use the Services or send emails or other data, information or communication to the Platform you agree and understand that you are communicating with the Company through electronic modes and other telecommunication modes and by using our Services, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send via any and all electronic, digital and other telecommunication modes. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or by emailing at <a href='mailto:support@shotkut.com' className='text-blue-600 underline'>support@shotkut.com</a>.
          </p>
          <p className='mt-2'>
            The Company may, based on any form of access to the Platform (including free download/trials) or Services or Website or registrations through any source whatsoever, contact the User through Platform, WhatsApp, SMS, email, and call, to give information about its Products/Services as well as notifications on various important updates, account set-up, order confirmation, delivery information, tracking of courier, promotions, etc. The User expressly grants such permission to contact him/her through Platform, telephone, WhatsApp, SMS, e-mail and holds the Company indemnified against any liabilities including financial penalties, damages, expenses in case the User's mobile number is registered with Do not Call (DNC) database. By registering yourself, you agree to make your contact details available to our employees, associates and partners so that you may be contacted for account set-up, subscription confirmation, customer support, promotions, etc. through telephone, WhatsApp, SMS, email, etc.
          </p>
        </div>

        {/* Section 9 - Subscription */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>9. Subscription</h2>
          <p>
            To receive full access to Shotkut's stock footage library of Products, you must become a Subscriber. If you elect to subscribe to Shotkut, you must select one of our subscription plans. You acknowledge that you are signing up for a recurring payment plan in order to access Shotkut and its paid Products/Services. Your subscription will automatically renew at the end of each billing period in accordance with the frequency and payment method that was selected by you at the point of first payment confirmation and checkout. Payment will be charged to your nominated payment method at the start of each billing period until you cancel.
          </p>
          <p className='mt-2'>
            We currently offer the following subscription types:
          </p>
          <div className='ml-4 mt-2'>
            <p className='font-semibold'>I. Single Use</p>
            <p>
              A single stock footage video can be downloaded by a single real person without sharing the seat. Use of a single stock footage does not require purchase of a monthly, quarterly or yearly plan and is a one-time purchase with following two variants:
            </p>
            <ul className='list-disc list-inside ml-4 mt-1'>
              <li>Mobile (vertical) quality</li>
              <li>HD quality</li>
              <li>4K quality</li>
            </ul>

            <p className='font-semibold mt-4'>II. Monthly Subscription</p>
            <p>
              A single use monthly subscription can be used by a single real person for a month without sharing the seat. A single real person shall have unlimited download and use access for a month to all the stock footage which can be used in both the variants – (i) Mobile (vertical) quality; (ii) HD and (iii) 4K.
            </p>

            <p className='font-semibold mt-4'>III. Annual Subscription</p>
            <p>
              Annual subscription offers a single use yearly subscription by a single real person at a discounted price for the first year, and a fixed price for every year thereafter. A single real person shall have unlimited download and use access for one year to all the stock footage which can be used in both the variants – (i) Mobile (vertical) quality; (ii) HD and (iii) 4K.
            </p>
          </div>
        </div>

        {/* Section 10 - Terms of Subscription */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>10. Terms of Subscription</h2>
          <p>
            It is not permitted to share the subscription on multiple devices and each subscription is available for use by a single real person or for a single seat usage by a company with less than fifty employees. You are not permitted to share the seat. If your company has over 50 employees, please contact us to discuss a Company account.
          </p>
          <p className='mt-2'>
            In the event, you are unable to subscribe to the Services due to any reason, you will have the right either to cancel the subscription. You agree that the Company shall not be liable to pay for any damage or loss either direct or indirect owing to such subscription or cancellation of such subscription or any default in payment for the subscription of Products/Services.
          </p>
          <p className='mt-2'>
            Upon purchase of the Products/ Services, you will receive an email with the details of the purchased Products/Services. The Products/Services shall not be subject to any return, cancellation or refunds other than discontinuation of subscription services.
          </p>
        </div>

        {/* Section 11 - Fees and Charges */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>11. Fees and Charges</h2>
          <p>
            The Company reserves the right to charge fees for providing various Products/Services on the Platform and change its policies from time to time. The Company may at its sole discretion introduce new Products/Services and modify some or all of the existing Products/Services offered on the Platform. In such an event the Company reserves the unrestricted and discretionary right to change, rearrange, add or delete Products/Services offerings, the selections in those offerings, prices, and may offer any other Products/Service, at any time and accordingly, reserves, the right to introduce fees for the new Services and/or for some or all of the existing Services on the Platform, as the case may be. Changes to the fee and related policies shall automatically become effective immediately once implemented on the Platform. You shall be solely responsible for compliance of all applicable laws including those in India for making payments to the Company. The Company will endeavour to notify you of any such change and its effective date.
          </p>
          <p className='mt-2'>
            Geographical pricing: The price of your Shotkut subscription may vary depending on the country you are in. We may offer special plans, prices or offers limited to certain geographical areas or for a limited time. We may use information such as geographical location information, or other information associated with your account or method of payment to determine your eligibility for a price, plan or offer. Eligibility for certain plans, prices or offers are determined by us at our discretion and we reserve the right to adjust the pricing for your subscription in the event that we determine you are not eligible for a particular plan, price or offer, including on the basis of your geographic location.
          </p>
          <p className='mt-2'>
            Changes to prices: We may change our pricing at any time, however if you are a Subscriber any increase in standard pricing for your subscription will apply no earlier than 21 days following notice to you.
          </p>
          <p className='mt-2'>
            Payment information: If you elect to pay by credit card or other payment method, you will be required to provide information regarding your credit card or other payment method. You represent and warrant that such information is true and that you are authorized to use the payment method. You will promptly update your account information of any changes (for example, a change in your billing address or credit card expiration date) that may occur. You agree to pay the amount that is specified in the subscription plan in accordance with the terms of such plan and these User Terms. As noted above, all subscriptions automatically renew and you hereby authorize us (through the Payment Processors) to bill your payment method in advance on such periodic basis in accordance with the terms of the applicable payment plan until you terminate your subscription, and you further agree to pay any charges so incurred. If you dispute any charges you must let us know within sixty (60) days after the date that we charge you, or within such longer period of time as may be required under applicable law.
          </p>
          <p className='mt-2'>
            Pricing / typographical error: If the Company comes across any typographic errors with respect to pricing or services information, the Company shall have the right to rectify the same or cancel the order(s) and refund monies, if any, collected from the customer within 90 (ninety) business days of such corrective action taken. It is hereby clarified that in the event of such pricing or typographical error, the Company shall in no event be responsible to compensate the User for any loss, or against any liability caused to the User.
          </p>
          <p className='mt-2'>
            The prices displayed at the Platform are inclusive of goods and sales tax ("GST") or a service charge. The Prices and offers offered offline and online on other apps and portals other than the Platform may vary from the prices displayed on the Platform.
          </p>
          <p className='mt-2'>
            Currency conversion costs: Shotkut subscription fees are in Indian Rupees, or if you are (i) in the European Union, in Euros; (ii) in the US, in US Dollars; (iii) in Canada, in Canadian Dollars; (iv) in Singapore, in Singapore Dollar; (v) in Dubai, in Dirham; (vi) in Australia, in Australian Dollar; (vii) in Sri Lanka, in Sri Lankan rupee; (viii) in Bangladesh, in Bangladeshi Taka; (ix) in Indonesia, in Indonesian rupiah; (x) in Malaysia, in Malaysian Ringgit or in any other country as per the currency of the country. We may offer subscription fees in other currencies from time to time. You are responsible for all costs of currency conversion relating to your Shotkut subscription. Your financial institution does the currency conversion and may charge you additional fees outside of our control.
          </p>
          <p className='mt-2'>
            Payment Methods: The Payments for the Products/ Services available on the Platform may be made through Credit Cards, Debit Cards, Net Banking, Wallets, UPI, QR, PayPal, reward points or other modes of payments offered from time to time. You may be required to pay a handling fee from your selected payment provider or financial institution, depending on the method of payment you choose. Shotkut has no control over these handling fees and they will not be stated at the checkout. If you have any questions on those fees, we recommend reaching out to your own financial institution or payment provider.
          </p>
          <p className='mt-2'>
            Notwithstanding any amounts owed to us hereunder, WE DO NOT PROCESS PAYMENTS FOR ANY SHOTKUT SERVICES. The Company may enable payments via third-party payment service providers ("PSP") partners and it shall be the User's responsibility not to share the credential for authenticating the payment including the UPI pin or OTP with any third-party intentionally or unintentionally. These payment processing services are provided by the PSP's terms and conditions, privacy policy, and all other relevant agreements. You hereby authorize the applicable PSP to store payment information and continue billing your specified payment method. The Company never solicits credential information for authenticating the payment such as UPI pin or OTP over a call or otherwise. The Company shall not be liable for any fraud due to the sharing of such details by the User.
          </p>
          <p className='mt-2'>
            While availing any of the payment methods available on the Platform, the Company shall not be responsible or assume any liability, whatsoever in respect of any loss or damage arising directly or indirectly to you due to:
          </p>
          <ul className='list-disc list-inside ml-4 mt-2'>
            <li>lack of authorisation for any transaction;</li>
            <li>exceeding the pre-set limit mutually agreed by you and between the third-party bank;</li>
            <li>any payment issues arising out of the transaction; or</li>
            <li>decline of transaction for any other reasons.</li>
          </ul>
          <p className='mt-2'>
            The Company will not be responsible for any money collected by a third-party by impersonating any representative of the Company.
          </p>
        </div>

        {/* Section 12 - Refund/Cancellation */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>12. Refund/Cancellation</h2>
          <p>
            Given the nature of the digital content, the Company does not support refunds in any form for the payment transactions being enabled on the Platform. If the User has entered the wrong number/user details, then the Company is not a liable party in the transaction.
          </p>
          <p className='mt-2'>
            Disputes lodged with payment agents: If, as a Subscriber, you lodge a dispute with a PSP, this will result in a suspension of your Shotkut subscription and your Shotkut account until the dispute raised with the PSP has been cancelled or resolved. Once a dispute has been lodged with a PSP, resolving the related issues can become a complex process and means we cannot make payments or issue refunds out of your Shotkut account.
          </p>
        </div>

        {/* Section 13 - Referrals, Contests, Sweepstakes and Promotions, Sales, Offers */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>13. Referrals, Contests, Sweepstakes and Promotions, Sales, Offers</h2>
          <p>
            Members may apply to become a Shotkut affiliate. As a part of our affiliate program, if you refer a new Subscriber or Member you may be eligible to receive affiliate income. You can find out more about the affiliate program and the terms applying to referrals on the website.
          </p>
          <p className='mt-2'>
            Any contests, sweepstakes or other promotions (collectively, "Promotions") made available through the Services may be governed by rules that are separate from these Terms and Conditions. If you participate in any Promotions, please review the applicable rules as well as our Privacy Policy. If the rules for Promotions conflict with these Terms and Conditions, rules for Promotions will prevail.
          </p>
          <p className='mt-2'>
            The Company may conduct competitions from time to time and you agree to allow the Company to use the submissions by you including but not limited to videos, written content, craft work etc. for promotional purposes. All rights will be reserved by the Company for usage of such submissions by you. You additionally permit the Company to use every kind of information submitted by you like photos, videos etc. for promotional campaigns as it so pleases and you will cease to have any rights on the same once your submissions are made to the Company.
          </p>
          <p className='mt-2'>
            If you sign up for a Shotkut subscription during a promotional or sale period where you receive a discounted subscription price or other promotional offer (such as a free trial for a limited period), you agree that at the conclusion of that promotional or sale period your subscription will automatically renew at the then standard pricing and frequency notified to you at the start of the promotional or sale period, unless you cancel before expiry of that period.
          </p>
        </div>

        {/* Section 14 - User Rights */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>14. User Rights</h2>
          <div className='ml-4'>
            <p className='font-semibold'>a. License:</p>
            <p>
              When you download a Product/Service as a Subscriber, you will be asked to register and save the Product/Service as part of a project. Upon registration, you will be granted a limited, non-exclusive license to use that Item in accordance with the specific terms set out in the Terms.
            </p>

            <p className='font-semibold mt-4'>b. No guarantee of availability:</p>
            <p>
              We and our affiliates do not make any promise that any particular Product/Service will be available on Shotkut at all times and Products/Service may become unavailable during the term of your subscription period, unless downloaded by you.
            </p>

            <p className='font-semibold mt-4'>c. No ownership:</p>
            <p>
              The Products/Services on Shotkut are owned by Shotkut, Company, its affiliates or respective right holders. They are licensed to you on a non-exclusive basis under the terms of the Shotkut license (as amended from time to time). You acknowledge that by downloading or registering a Products/Services, you are only acquiring a license to use the Products/Services in accordance with the Terms, and no rights of ownership are granted to you for Products/Services.
            </p>

            <p className='font-semibold mt-4'>d. Effect of ceasing subscription:</p>
            <p>
              As a subscription service, certain rights granted under a Product/Service license is only applicable for as long as your Shotkut subscription is active. For trial licenses, free files and everything else, you'll need to remove the Product/Service from any associated product, project or end-use.
            </p>
          </div>
        </div>

        {/* Section 15 - User Restrictions */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>15. User Restrictions</h2>
          <p>
            You must not (either in your own right or through any third party), and you must not permit any third party to:
          </p>
          <ul className='list-disc list-inside ml-4 mt-2'>
            <li>interfere with or disrupt the integrity or performance of Shotkut (for example through sending mass unsolicited messages, "flooding" servers, or introducing a virus, time bomb, trojan horse, worm, cancelbot or other computer routine);</li>
            <li>attempt to gain unauthorized access to Shotkut or related systems and networks;</li>
            <li>rent, license, sublicense, sell, resell or otherwise commercially exploit or make Shotkut, any Shotkut Intellectual Property or any Item available to any third party (except as expressly contemplated by these User Terms);</li>
            <li>use Shotkut to provide, or incorporate the matters contemplated by Shotkut into, any product or service provided to a third party;</li>
            <li>use, or permit the use of, any security testing tools in order to probe, scan or attempt to penetrate or ascertain the security of Shotkut;</li>
            <li>use any data mining, robots, or other similar data and/or image gathering and extraction methods in connection with the Shotkut, or the Items available on Shotkut;</li>
            <li>access Shotkut or its related systems and networks for the purpose of building a similar or competitive product or service or for the purpose of obtaining unauthorized access to Shotkut;</li>
            <li>copy, republish, frame, link to, download, transmit, modify, adapt, create derivative works based on, rent, lease, loan, sell, assign, distribute, display, perform, license, sublicense, reverse engineer, reverse assemble, disassemble, or decompile any part of Shotkut (including any component of the website), any Shotkut Intellectual Property;</li>
            <li>use Shotkut as a trademark or trade name, without our prior written consent;</li>
            <li>a virtual private network (VPN) or any other means to avoid compliance with these Terms, or for any fraudulent or illegal reasons;</li>
            <li>remove any watermarking, copyright notices or other protective measures from any Item, including preview files;</li>
            <li>use a false email address, impersonate others, or misrepresent your affiliation with any third party;</li>
            <li>use scripts or bots to mass download Items (this includes using any means whatsoever to scrape/download the entire library and/or database of Items from Shotkut) and/or</li>
            <li>access or use Shotkut in any way not expressly permitted by these Terms.</li>
          </ul>
        </div>

        {/* Section 16 - User Content */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>16. User Content</h2>
          <p>
            Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, audio, videos, or other material ("Content"). You are responsible for Content that you post on or through the Service, including its legality, reliability, and appropriateness.
          </p>
          <p className='mt-2'>
            By posting/ selling Content on or through the Platform, you represent and warrant that: (a) Content is yours (you own it) and/or you have the right to use, distribute it and the right to grant us the rights and license as provided in these Terms, and (b) that the posting of your Content on or through the Platform does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity.
          </p>
          <p className='mt-2'>
            You shall not post, host, display, sell, upload, modify, publish, transmit, store, update or share any Content or information on the Platform that:
          </p>
          <ul className='list-disc list-inside ml-4 mt-2'>
            <li>belongs to another person and to which you do not have any right to; or</li>
            <li>that is grossly harmful, harassing, blasphemous, defamatory, libellous, obscene, pornographic, paedophilic, libellous, invasive of another's privacy, including bodily privacy, hateful, insulting or harassing on the basis of gender, religiously, racially or, ethnically objectionable, disparaging, relating or encouraging money laundering or gambling, or otherwise unlawful in any manner whatever, or unlawfully threatening or unlawfully harassing or misleading in any way; or promoting any such illegal activities; or otherwise inconsistent with or contrary to the laws in force; or</li>
            <li>is patently offensive to the online community, such as sexually explicit content, religiously offensive content or content that promotes obscenity, paedophilia, racism, bigotry, hatred or physical harm of any kind against any group or individual; or</li>
            <li>harasses or advocates harassment of another person; or involves the transmission of "junk mail," "chain letters," or unsolicited mass mailing or "spamming"; or</li>
            <li>infringes upon or violates any third party's rights, including without limitation unauthorized disclosure of any person's personal information e.g. a person's name, email address, physical address or phone number or rights of publicity; or</li>
            <li>infringes any patent, trademark, copyright, or other proprietary rights or third party's trade secrets or rights of publicity or privacy or shall not be fraudulent; or</li>
            <li>promotes an infringement of, or illegal or unauthorized copy of another person's copyrighted work; or</li>
            <li>provides material that exploits people in a sexual, violent, or otherwise inappropriate manner or solicits personal information from anyone; or</li>
            <li>contains video, photographs, or images of another person without his or her express written consent and permission or the permission or the consent of his/her guardian in the case of minor; or</li>
            <li>refers to any website or URL that, in the sole discretion of the Company contains material that is inappropriate for the Platform, or URL of any other website contains content that would be prohibited or violates the letter or spirit of these Terms and Conditions; or</li>
            <li>tries to gain unauthorized access or exceeds the scope of authorized access to the Platform or to profiles, blogs, communities, account information, bulletins or other areas of the Platform or solicits passwords or personal identifying information for commercial or unlawful purposes from other Users; or</li>
            <li>intends to advertise or engage in commercial activities and/or sales without prior written consent of the Company or intends to mislead, defraud or cheat any person. Throughout these Terms and Conditions, the Company's prior written consent" means a communication coming from the Company's legal personnel, specifically in response to your request, and specifically addressing the activity or conduct for which you seek authorization; or</li>
            <li>interferes with another User's use and access to the Platform; or</li>
            <li>is harmful to any child or harms minors in any way; or</li>
            <li>violates any law for the time being in force; or</li>
            <li>deceives or misleads the reader/ addressee/ Users about the origin of such messages or knowingly and intentionally communicates any information which is patently false or misleading in nature but may reasonably be perceived as a fact, or grossly offensive or menacing in nature; or impersonate another person; or</li>
            <li>contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer resource; or contains virus, malware or other computer programming routines that may damage, detrimentally interfere with, diminish value of, surreptitiously intercept or expropriate any system, data or personal identifiable information; or</li>
            <li>threatens the unity, integrity, defence, security or sovereignty of India, friendly relations with foreign states, or public order or causes incitement to the commission of any cognizable offence or prevents investigation of any offence or is insulting to any other nation; or</li>
            <li>is patently false and untrue, and is written or published in any form, with the intent to mislead or harass a person, entity or agency for financial gain or to cause any injury to any person; or</li>
            <li>shall not create liability for us or cause us to lose (in whole or in part) the services of our ISPs or other suppliers.</li>
          </ul>
          <p className='mt-2'>
            The Company is under no obligation to examine or verify any Content posted on the Platform by you, and the Company assumes no responsibility or liability relating to any such Content on the Platform; nor does the Company assumes or shall assume responsibility or liability for breach of any of your obligation(s) under these Terms and Conditions. Notwithstanding the above, the Company has the right but not the obligation to monitor, edit, delete the Content provided by users and may decline to accept and/or remove any Content that contain any information inconsistence with these Terms and Conditions. Any Content uploaded by you shall be subject to relevant laws and these Terms and Conditions and may be disabled, or and may be subject to investigation under appropriate laws. Furthermore, if you are found to be in non-compliance with the laws and regulations, these Terms, or the User Agreement, the Company may terminate your account/block your access to the Platform or permanently disable User account and we reserve the right to remove any non- compliant Content uploaded by you and/or claim indemnity on account of such non-compliance. We reserve the right to terminate the account of anyone found to be infringing any intellectual property right of any other person or violating any applicable laws or these Terms and Conditions. Company reserves the rights mentioned herein above and may at its sole discretion determine that action of such User has resulted in breach of fair usage policy or Terms. You specifically agree that the Company shall not be responsible for unauthorized access to or alteration of your transmissions or data, any material or data sent or received or not sent or received through the Platform. Further, under no circumstances, the Company shall be liable for any unlawful act of the User or its affiliates, relatives, employees, agents including but not limited to misuse of any data, unfair trade practices, fraud, cyber squatting, hacking and other cyber crimes.
          </p>
          <p className='mt-2'>
            You retain any and all of your rights to any Content you submit, post or display on or through the Platform and you are responsible for protecting those rights. We take no responsibility and assume no liability for Content you or any third-party posts on or through the Platform. However, by posting, selling Content using Service you grant us non-exclusive, worldwide, perpetual, irrevocable, royalty-free, sub-licensable (through multiple tiers) right and license to use, collect, analyse, utilise purchase, modify, publicly perform, publicly display, reproduce, distribute and re-distribute such Content on and through Service. You agree that this license includes the right for us to make your Content available to other users of the Platform and the Service, who may also use your Content for any purpose subject to these Terms. You also acknowledge that owing to the manner in which the Platform is used, your Content may be available to other Users on the Platform.
          </p>
          <p className='mt-2'>
            In addition, any data, information, material and other content found on or through the Platform are the property of the Company or licensed to the Company. You may not distribute, modify, transmit, reuse, download, repost, copy, or use said data, information, material or other content, whether in whole or in part, for commercial purposes or for personal gain, without express advance written permission from us. The Company may use such data for its own commercial purposes. This includes, but is not limited to, data relating to site activity, User preferences, and transaction patterns.
          </p>
          <p className='mt-2'>
            You understand that the Company has the right at all times to disclose any information (including the identity of the User providing information or materials on the Platform) as necessary to satisfy any law, regulation or valid governmental request, or in response to any court order or summons. In addition, the Company can (and you hereby expressly authorize us to) disclose any information about you to law enforcement or other government officials, as we, in our sole discretion, believe necessary or appropriate in connection with the investigation and/or resolution of possible crimes, especially those that may involve personal injury.
          </p>
        </div>

        {/* Section 17 - Chat Support */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>17. Chat Support</h2>
          <p>
            The chat support/facility has been provided to help you with any and all Platform related queries. Any use of this Services shall be subject to the following conditions:
          </p>
          <ul className='list-disc list-inside ml-4 mt-2'>
            <li>The Company may suspend the chat service at any time without notice.</li>
            <li>The Company or its executives are not responsible for any delay caused in attending to or replying to the queries via chat.</li>
            <li>Communication through chat may be stored by the Company for future reference, and the User of such service will not have the right to access such information at any future date.</li>
            <li>While 'chatting', you may not communicate any objectionable information i.e. unlawful, threatening, abusive, defamatory, obscene information.</li>
            <li>The chat room shall not be used to sell any products or services, to give suggestion on business opportunity or any other form of solicitation.</li>
          </ul>
          <p className='mt-2'>
            You may proceed further and chat with our chat bot or online customer care executive only if you agree to the above terms and conditions.
          </p>
        </div>

        {/* Section 18 - Use of the Platform and the Services */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>18. Use of the Platform and the Services</h2>
          <p>
            You may use the Platform and the Services only for lawful purposes and in accordance with these Terms and Conditions.
          </p>
          <p className='mt-2'>
            You hereby agree not to use the Platform and the Services:
          </p>
          <ul className='list-disc list-inside ml-4 mt-2'>
            <li>In any way that violates any applicable national or international law or regulation;</li>
            <li>For the purpose of exploiting, harming, or attempting to exploit any person or harm minors in any way by exposing them to inappropriate content or otherwise;</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation;</li>
            <li>To impersonate or attempt to impersonate Company, a Company employee, another User, or any other person or entity;</li>
            <li>In any way that infringes upon the rights of others, or in any way that is illegal, threatening, fraudulent, or harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity; or</li>
            <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of Service, or which, as determined by us, may harm or offend Company or users of Service or expose them to any liability.</li>
          </ul>
          <p className='mt-2'>
            Additionally, you agree not to:
          </p>
          <ul className='list-disc list-inside ml-4 mt-2'>
            <li>Use Service in any manner that could disable, overburden, damage, or impair Service or interfere with any other party's use of Service, including their ability to engage in real time activities through Service;</li>
            <li>Use any "deep-link", "page-scrape", "robot", "spider", or other automatic device, process, program or means to access the Platform and/or the Service for any purpose, including monitoring or copying any of the material on the Platform;</li>
            <li>Use any manual process to monitor or copy any of the material on Service or for any other unauthorized purpose without our prior written consent;</li>
            <li>Use for any purpose that is unlawful or otherwise prohibited by these Terms and Conditions, or for other activity which infringes the rights of the Company or others;</li>
            <li>Use any device, software, or routine that interferes with the proper working of the Platform;</li>
            <li>Introduce any viruses, trojan horses, worms, logic bombs, or other material which is malicious or technologically harmful;</li>
            <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of Service, the server on which the Platform is stored, or any server, computer, or database connected to Service;</li>
            <li>Attack the Platform via a denial-of-service attack or a distributed denial-of-service attack;</li>
            <li>Take any action that may damage or falsify Company rating;</li>
            <li>In any way decompile, reverse engineer, or disassemble any material or content on the Website; or</li>
            <li>Otherwise attempt to interfere with the proper working of the Platform and the Service.</li>
          </ul>
        </div>

        {/* Section 19 - Analytics */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>19. Analytics</h2>
          <p>
            Towards optimization of the Services and other offerings on the Platform, we may use third-party service providers to collect data and analyse your use of our Services, including but not limited to user session lengths, time spent on various sections, login frequencies, etc.
          </p>
        </div>

        {/* Section 20 - Intellectual Property */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>20. Intellectual Property</h2>
          <p>
            All the brand names owned and licensed to the Company are exclusive property of the Company, its affiliates, partners or licensors, and is protected by laws of India, including laws governing all applicable forms of Intellectual Property. The Platform and its original content (excluding Content provided by Users), proprietary rights and trade secrets in the Products, information, software, APIs, text, design, compilation, features and functionality, structure, expression, logos, trademarks, trade names, other materials, "look and feel", all graphics, user interfaces, visual interfaces, photographs, trademarks, logos, sounds, music, artwork, computer code and other materials.
          </p>
          <p className='mt-2'>
            ("Intellectual Property/Company Data") are and will remain the exclusive property of the Company and its licensors. The Content provided by licensors to the Company are owned/controlled by the licensors who have granted license to the Company to make the Products available to you. We take no responsibility for the quality, safety or legality of the Products/Services.
          </p>
          <p className='mt-2'>
            The Platform is protected by copyright, trademark, and other applicable laws in the jurisdiction applicable to the operations of the Company. Our trademarks may not be used in connection with any Product or Services without the prior written consent of the Company. No trademark is granted in connection with the Products, Services or the materials contained on the Platform. The access or subscription to the Platform does not authorize anyone to use any trademarks in any manner. The trademarks displayed on the Platform whether registered or unregistered, are the Intellectual Property of the Company.
          </p>
          <p className='mt-2'>
            Except as expressly provided in these Terms and Conditions, no part of the Platform and no Company Data may be copied, reproduced, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted or distributed in any way (including "mirroring") to any other computer, server, website or other medium for publication or distribution or for any commercial use, without the Company's express prior written consent. Company Data on the Platform is solely for your personal, limited and non-exclusive use. Use of the Company Data on any other web site or networked computer environment or use of the Company Data for any purpose other than personal, non-commercial use is a violation of the copyrights, trademarks, and other proprietary rights, and is prohibited.
          </p>
          <p className='mt-2'>
            Preview Files: Preview files are made available as part of an Item to allow you to evaluate the suitability of a Product/Service for your project. No rights are granted under these Terms to use preview files for any other purposes.
            Intellectual Property claims: We respect the intellectual property rights of others. If you believe that a Product or Content on Shotkut infringes any intellectual property right (including copyright), you shall be required to provide us a takedown notice/ order from relevant authorities. If you own any intellectual property (other than copyright including trademark) or are authorised to act on behalf of intellectual property owner, you may consider sending us a general IPR notice requesting to takedown the author content made available at <a href='mailto:support@shotkut.com' className='text-blue-600 underline'>support@shotkut.com</a>.
          </p>
        </div>

        {/* Section 21 - Copyright Policy */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>21. Copyright Policy</h2>
          <p>
            We respect the intellectual property rights of others and expect our Users to do the same. The Company may terminate in appropriate circumstances the accounts of Users who infringe or are believed to be infringing the rights of copyright holders.
          </p>
        </div>

        {/* Section 22 - Privacy */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>22. Privacy</h2>
          <p>
            The Company believes strongly in protecting User privacy and providing you with notice of the Company's use of data. Please refer to the Company Privacy Policy, incorporated by reference herein that is uploaded on the Platform.
          </p>
        </div>

        {/* Section 23 - Error Reporting and Feedback */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>23. Error Reporting and Feedback</h2>
          <p>
            You may provide us either directly at <a href='mailto:support@shotkut.com' className='text-blue-600 underline'>support@shotkut.com</a> or via third-party sites and tools with information and feedback concerning errors, suggestions for improvements, ideas, problems, complaints, reviews, ratings and other matters related to our Service ("Feedback"). You acknowledge and agree that: (a) you shall not retain, acquire or assert any intellectual property right or other right, title or interest in or to the Feedback; (b) Company may have development ideas similar to the Feedback; (c) Feedback shall not contain confidential information or proprietary information from you or any third party; and (d) Company is not under any obligation of confidentiality with respect to the Feedback; (e) any contribution of Feedback does not and shall not give or grant you any right, title or interest in the Company. In the event the transfer of the ownership to the Feedback is not possible due to applicable mandatory laws, you grant Company and its affiliates an exclusive, transferable, irrevocable, free-of-charge, sub-licensable, unlimited and perpetual right to use (including copy, modify, create derivative works, publish, distribute, not use, disclose and commercialize) Feedback in any manner and for any purpose without further notice or compensation to you. You hereby assign to us any and all right, title and interest (including any intellectual property right) that you may have in and to any and all Feedback.
          </p>
        </div>

        {/* Section 24 - Links to Other Web Sites */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>24. Links to Other Web Sites</h2>
          <p>
            Our Platform uses third party application program interfaces and may contain links to third party web sites or services that are not owned or controlled by the Company.
          </p>
          <p className='mt-2'>
            The Company has no control over, and assumes no responsibility for the content, privacy policies, or practices of any third-party web sites or services. We do not warrant the offerings of any of these entities/individuals or their websites.
          </p>
          <p className='mt-2'>
            You acknowledge and agree that Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such third-party web sites or services.
          </p>
          <p className='mt-2'>
            We strongly advise you to read these Terms and Conditions and privacy policies of any third-party web sites or services that you visit.
          </p>
        </div>

        {/* Section 25 - Third Party Offers */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>25. Third Party Offers</h2>
          <div className='ml-4'>
            <p className=''>a.
              As a Subscriber you may also have access to, or be eligible for special offers in relation to, products and services provided by our partnered suppliers ("Third Party Offers"). Information about Third Party Offers will be published on our website.
            </p>

            <p className='mt-4'>b.
              You have no obligation to redeem any Third Party Offer. However, if you choose to do so, then you will be buying the relevant product and/or service from the supplier of that Third Party Offer and not from us.
            </p>

            <p className='mt-4'>c.
              The redemption of a Third Party Offer is subject to terms and conditions set by the supplier. You should read and make sure that you agree to the applicable terms and conditions before redeeming any Third Party Offer.
            </p>

            <p className='mt-4'>d.
              The description of products and services forming part of a Third Party Offer published on our site, and any associated links, have been provided to us by the suppliers and are provided to you as a convenience. While we have made reasonable efforts to check the accuracy of the descriptions, the suppliers are solely responsible for any representations contained in those descriptions.
            </p>

            <p className='mt-4'>e.
              Your use of any product or service made available as part of a Third Party Offer is at your own risk, and we do not endorse or assume any responsibility or liability for those products and services or your use of them.
            </p>
          </div>
        </div>

        {/* Section 26 - Disclaimer of Warranty */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>26. Disclaimer of Warranty</h2>
          <p>
            The Platform and Services and the company data are provided by the company on an "as is" and "as available" basis. The company makes no representations or warranties of any kind, express or implied, as to the operation of the platform and the services, or the information, content or materials included therein. You expressly agree that your use of the platform, their content, and any services or items obtained from us is at your sole risk.
          </p>
          <p className='mt-2'>
            Neither the company nor any person associated with the company makes any warranty or representation with respect to the completeness, security, reliability, quality, accuracy, or availability of the services or its content. Without limiting the foregoing, neither the company nor anyone associated with the company represents or warrants that the platform, their content, or any Services or items obtained through the Services will be accurate, reliable, error-free, or uninterrupted, that defects will be corrected, that the services or the platform that makes it available are free of viruses or other harmful components or that the Platform or any Services or items obtained through the platform will otherwise meet your needs or expectations.
          </p>
          <p className='mt-2'>
            All Products/ Services are available to you on an "as is" basis and the company hereby disclaims all warranties of any kind, whether express or implied, statutory, or otherwise, including but not limited to any warranties of merchantability, non-infringement, and fitness for particular purpose. The company will not be liable for any losses, damages or claims by you or any third-party in this regard. You acknowledge that the Company makes no warranty that (a) Shotkut shall meet your requirements; (b) your access to Shotkut shall be uninterrupted, timely, secure, error free, or free from third party interferences or act of God; (c) the results that may be obtained from the use of Shotkut shall be accurate or reliable; (d) the quality of any items, Products, Services, Content, information or other material obtained by you through Shotkut shall meet your expectations.
          </p>
          <p className='mt-2'>
            The foregoing does not affect any warranties which cannot be excluded or limited under applicable law.
          </p>
        </div>

        {/* Section 27 - Fair Use */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>27. Fair Use</h2>
          <p className='font-semibold'>Acceptable use:</p>
          <p>
            Your use of Shotkut, including its content and the Products, must comply with our policies (as published on our sites or our Help Center from time to time).
          </p>
          <p className='font-semibold mt-4'>Content removal:</p>
          <p>
            We may remove any Items or other content (including Item reviews) for any reason at our discretion, including for quality assurance or if we receive a valid copyright take-down notice or General IPR Notice (as defined in our Intellectual Property Policy), if we think that the content is unauthorized, misleading, incorrect, offensive, illegal, inappropriate, or in breach of anyone else's rights, or if we think that your use of Shotkut and any Products or other content might result in liability to us or anyone else.
          </p>
          <p className='font-semibold mt-4'>Community participation:</p>
          <p>
            We take great pride in our global community focusing on transparency and mutual respect and invite you to participate give feedback. Before using Shotkut, please make sure you have read the Community Guidelines, as you agree to follow them as part of these Terms.
          </p>
          <p className='font-semibold mt-4'>Linking to Shotkut:</p>
          <p>
            We reserve the right to insist that any link to Shotkut discontinued, and to revoke your ability to link to Shotkut.
          </p>
        </div>

        {/* Section 28 - Indemnity and Limitation of Liability */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>28. Indemnity and Limitation of Liability</h2>
          <p>
            Except as prohibited by law, you will hold us and our Company, group of companies, licensor, officers, directors, employees, other licensee and agents harmless for and against, any and all loss, demand, expenses, liabilities, damage, or claim, however it arises (including attorneys' fees and all related costs and expenses of litigation and arbitration, or at trial or on appeal, if any, whether or not litigation or arbitration is instituted), whether in an action of contract, negligence, or other tortious action, or arising out of or in connection with these terms, including without limitation (a) any claim for personal injury or property damage, arising from these Terms and any violation by you of any central, state, or local laws, statutes, rules, or regulations or Terms and Conditions, even if the company has been previously advised of the possibility of such losses or damage or Claims; (b) this terms and conditions or the breach of your warranties, representations and obligations or any other terms and conditions under these Terms; (c) the platform content or your use of the platform content; (d) the services or products or subscriptions or your use of the products/ services (including trial versions); (e) any intellectual property or other proprietary right of any person or entity; (f) your violation of any provision of these Terms; or (g) any information or data you supplied to the company; or (h) any third party claims against the Company related to your use of Shotkut forming part of any third party offer. When the company is threatened with suit or sued by a third party, the company may seek written assurances from you concerning your promise to indemnify the Company; your failure to provide such assurances may be considered by the company to be a material breach of these terms. Except as prohibited by law, if there is liability found on the part of the Company, it will be limited to the amount paid by you for the Products and/or Services on the Platform.
          </p>
          <p className='mt-2'>
            The Company will have the right to participate in any defence or assume and control defence of any claim including a third-party claim related to your use of any of the Platform, Content or Products, with counsel of the Company's choice at its expense. The Company will reasonably cooperate in any defense by you of a third-party claim at your request and expense. You will have sole responsibility to defend the Company against any claim, but you must receive the prior written consent of the Company regarding any related settlement. The Terms of this provision will survive any termination or cancellation of these Terms or your use of the platform or the Services/Products.
          </p>
          <p className='mt-2'>
            Under no circumstance, including, but not limited to, negligence, platform, Products, services and/or any breach of these terms, shall the Company be liable for any indirect, incidental, special, consequential, exemplary, damages for lost profits, business interruption and loss of programs or information arising out of the use of or inability to use the platform or consequential damages that result from the use of, or the inability to use, including but not limited to the information, content, materials on the platform, or any part thereof including liabilities resulting from (a) the use or the inability to use the platform content or products or allied services; (b) the cost of procuring substitute the products or content; (c) any products or subscriptions purchased or obtained or transactions entered into through the platform; or (d) any lost profits you allege, even if we have been advised of the possibility of such damages and in no event shall our maximum aggregate liability exceed the total amount paid by you to us for Shotkut subscription in the past 6 (six) months immediately preceding the date on which the claim giving rise to the liability arose or, if no fees apply, INR 10,000/- (Indian Rupees Ten Thousand) Only. While the company shall take reasonable precautions against security breaches, the platform or internet transmission is not completely secure, and as such, the company shall not be liable for any indirect, special, exemplary, or consequential damages that may result from unauthorized access, hacking, data loss, or other breaches that may occur.
          </p>
          <p className='mt-2'>
            You agree that, to the fullest extent permitted by applicable law, neither the company nor our affiliates, partners, or licensors will be responsible or liable (whether in contract, tort (including negligence) or otherwise) under any circumstances to you or any third party for any (a) interruption of business; (b) access delays or access interruptions to the platform; (c) data non-delivery, loss, loss of revenue, theft, mis-delivery, corruption, destruction or other modification, loss of profit, loss of goodwill; loss of customers; loss of capital; damage to reputation; loss in connection with any contract; loss of data; (d) loss or damages of any sort incurred as a result of dealings with or the presence of third party links on the platform; (e) viruses, system failures or malfunctions which may occur in connection with your use of the platform, including during hyperlink; (f) any inaccuracies or omissions in content; or (g) events beyond the reasonable control of the company; or (h) indirect, consequential, or special loss, damage or expense. We make no representations or warranties that defects or errors will be corrected.
          </p>
          <p className='mt-2'>
            This disclaimer constitutes an essential part of these Terms.
          </p>
        </div>

        {/* Section 29 - Termination */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>29. Termination</h2>
          <p>
            In case of any dissatisfaction with these Terms, the sole and exclusive remedy available to you is to discontinue the use of Shotkut, its Platform, Products, Content, Services or any other material offered by the Company.
          </p>
          <p className='mt-2'>
            We may terminate or suspend your account and bar access to the Platform or any of the Services immediately, without prior notice or liability, if we reasonably believe, under our sole discretion, for any reason whatsoever and without limitation, you to have caused any of the breach specified hereinunder:
          </p>
          <ul className='list-disc list-inside ml-4 mt-2'>
            <li>a breach of these Terms and Conditions or any other agreement or any other terms applicable to your Shotkut account;</li>
            <li>failure to make any payment when due;</li>
            <li>breach of any of our policies (or the policies of any other group company);</li>
            <li>breach of any applicable laws, rules or regulations;</li>
            <li>act in a way that does not align with the values of our community including (a) engaging in serious or illegal misconduct (such as criminal or fraudulent activities); or (b) infringing the intellectual property rights of others; or (c) breaching our community guidelines; or</li>
            <li>act in a manner that could cause harm to Shotkut and Company, its group companies, affiliates, any authors, content creators, licensors, or Users harm including (a) any public conduct or activity (such as public communications) that would adversely affect the reputation of any Group Company; and/or (b) any threats of harm or damage to any author, licensor, member or User of Shotkut, Platform and Company.</li>
          </ul>
          <p className='mt-2'>
            If we terminate your Shotkut account you must not apply for a new account as you will no longer be welcome in our community. This decision may also apply to any other Shotkut accounts you use. Additionally, we may cancel unverified accounts or accounts that have been inactive for a substantial period of time.
          </p>
          <p className='mt-2'>
            If you wish to terminate your account, you may simply discontinue using Service or cancel the subscription as per the cancellation instructions, subject to the provisions of order agreement and/or software services agreement and/or other agreements you may have entered into with the Company and/or the organisations and/or any other legal entity.
          </p>
          <p className='mt-2'>
            Following termination, you will not be permitted to use the Platform and the Company may, in its sole discretion and without advance notice to you, cancel any outstanding orders for Products. If you cancel your subscription, your subscription will automatically close at the end of your current billing period and you will not be able to download any new Items or previously licensed Items, or use Items as part of any project, even if you have downloaded the Products prior to cancellation. If your access to the Platform is terminated, the Company reserves the right to exercise whatever means it deems necessary to prevent the unauthorized access of the Platform.
          </p>
          <p className='mt-2'>
            Survival: All provisions of these Terms and Conditions which by their nature should survive termination, shall survive termination, including without limitation, intellectual property, dispute resolution, governing law, arbitration, ownership provisions, warranty disclaimers, indemnity and limitations of liability, force majeure, changes to service, amendment to Terms, Waiver and Severability, relationship between the parties, cease of operations, entire agreement, waiver of class action rights, arbitration, Assignment, and until the Company chooses, in its sole discretion and without advance notice to you, to terminate it. Notwithstanding the foregoing, if you breach these Terms and Conditions or Privacy Policy or other rules and policies, the Company reserves the right to recover any amounts due and owing by you or to take strict legal action including but not limited to a referral to the appropriate police or other authorities for initiating criminal or other proceedings against you.
          </p>
        </div>

        {/* Section 30 - Governing Law */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>30. Governing Law</h2>
          <p>
            These Terms and Conditions shall be governed and construed in accordance with the laws of India, which governing law applies to the User Agreement without regard to its conflict of law provisions, and any disputes relating to these Terms and Conditions and User Agreements will be subject to the exclusive jurisdiction of the courts of New Delhi, India.
          </p>
          <p className='mt-2'>
            We are subject to law and regulations governing the use of our Services which may prohibit us from providing Services to you or require that we discontinue making Services available to you without notice. By using our services you agree to comply with all trade or economic sanctions, export and import laws and regulations and warrant that: (i) you are not prohibited from accessing our services; and (ii) you will not make our services available to anyone who is prohibited from accessing them under the laws or regulations of any jurisdiction.
          </p>
        </div>

        {/* Section 31 - Force Majeure */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>31. Force Majeure</h2>
          <p>
            The Company is not liable for any delay in the performance or non-performance of any of its obligations hereunder and shall not be liable for any loss or damages caused thereby where the same is occasioned by any cause whatsoever that is beyond our control including but not limited to an act of God, war, civil disturbance, inducement of any virus, trojan or other disruptive mechanisms, any event of hacking or illegal usage of the Platform, utility or communication failures, acts of public enemies, blockade, embargo or any law, order, proclamation, regulation, ordinance, demand or requirement having legal effect of any government or any judicial authority or representative of any such government, governmental or parliamentary restrictions, prohibitions or enactments of any kind, or accident or non-availability/ delay in transport, any endemic, pandemic, epidemic or outbreak of any disease including Covid-19.
          </p>
        </div>

        {/* Section 32 - Changes to Service */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>32. Changes to Service</h2>
          <p>
            We reserve the right to withdraw or amend our Services, and any service or material we provide via the Platform, in our sole discretion without notice. The amended Terms will be effective immediately after it is uploaded on this Platform. We will not be liable if for any reason all or any part of Service is unavailable at any time or for any period. From time to time, we may restrict access to some parts of the Platform or the Services, or the entire Platform, to Users, including registered Users.
          </p>
          <p className='mt-2'>
            We may use the services of another Group Company for any purpose in relation to Shotkut, including to collect, make or process payments.
          </p>
          <p className='mt-2'>
            Your access or use of the Platform following any such changes constitutes your acceptance to follow and you shall be bound by these Terms, as amended. The version of the Terms and Conditions that will apply to your order will be those uploaded on the Platform at the time you use or access or place your order. For this reason, we encourage you to review these Terms each time you access and place your order. These Terms do not alter in any way the terms or conditions of any other written agreement you may have with the Company for other Products or Services. If you do not agree to these Terms (including any referenced policies or guidelines), please immediately terminate your use of the Platform.
          </p>
        </div>

        {/* Section 33 - Amendments to Terms */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>33. Amendments to Terms</h2>
          <p>
            We may amend this Terms and Conditions at any time by posting the amended terms ("Revised Terms") on the same or different webpage designated by us for the Terms on the Platform. It is your responsibility to review these Terms and Conditions periodically. Any such amendment shall be deemed to be effective in respect of you, thirty (30) days from the date such change was posted on this webpage (or any other such webpage on the Platform) or otherwise communicated to you.
          </p>
          <p className='mt-2'>
            Subject to the above, your continued use of the Platform following the posting of Revised Terms shall imply your acknowledgement and agreement with the Revised Terms, which shall be binding on you.
          </p>
          <p className='mt-2'>
            If you do not agree to the Revised Terms, you are no longer authorized to use the Platform and the Service.
          </p>
        </div>

        {/* Section 34 - Waiver and Severability */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>34. Waiver and Severability</h2>
          <p>
            No waiver by the Company of any term or condition set forth in these Terms and Conditions shall be deemed to be a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of Company to assert any right or provision under Terms and Conditions shall not constitute a waiver of such right or provision.
          </p>
          <p className='mt-2'>
            If any provision of Terms and Conditions is held by a court or other tribunal of competent jurisdiction to be invalid, illegal or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of these Terms and Conditions will continue in full force and effect.
          </p>
        </div>

        {/* Section 35 - Relationship Between the Parties */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>35. Relationship Between the Parties</h2>
          <p>
            Nothing in these Terms is to be construed as constituting a partnership, joint venture, employment or agency relationship between you and any group company, or between you and any other User. You cannot act on behalf of or bind a group company or any other User in any way.
          </p>
        </div>

        {/* Section 36 - Assignment */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>36. Assignment</h2>
          <p>
            The Company may assign, transfer, sub-contract or otherwise deal with its rights and/or obligations under these Terms and Conditions without notifying you or obtaining your consent.
          </p>
          <p className='mt-2'>
            You shall not assign, transfer, sub-contract or otherwise deal with your rights and/or obligations under these Terms and Conditions. Shotkut may transfer or assign any of its rights and obligations under these Terms, in whole or in part, at any time with or without notice.
          </p>
        </div>

        {/* Section 37 - Cease of Operations */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>37. Cease of Operations</h2>
          <p>
            The Company may at any time, in its sole discretion and without advance notice to you, cease operation of the Platform, or change or remove distribution of the Products and delivery of Services, temporarily or permanently, without any notice.
          </p>
        </div>

        {/* Section 38 - Entire Agreement */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>38. Entire Agreement</h2>
          <p>
            These Terms comprises the entire agreement between you and the Company and supersedes any prior agreements or understandings whether written or oral, with respect to Shotkut pertaining to the subject matter contained herein.
          </p>
        </div>

        {/* Section 39 - Waiver of Class Action Rights */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>39. Waiver of Class Action Rights</h2>
          <p>
            By accepting the Terms, you hereby irrevocably waive any right you may have to join claims with those of other in the form of a class action or similar procedural device, any claims arising out of, relating to, or connection with these Terms must be asserted individually.
          </p>
        </div>

        {/* Section 40 - Arbitration */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>40. Arbitration</h2>
          <p>
            Any controversy or claim arising out of or relating to these Terms, or the breach thereof, shall be settled through arbitration under Arbitration and Conciliation Act and the seat and venue of arbitration shall be in New Delhi, India. The language of the arbitration shall be English. There shall be one arbitrator to be mutually agreed by the parties. Each party shall bear its own costs in the arbitration. Both parties agree that the following claims are exceptions to the Arbitration Agreement and will be brought in a judicial proceeding in a court of competent jurisdiction: (i) any claim related to actual or threatened infringement, misappropriation or violation of a party's copyrights, trademarks, trade secrets, patents, or other intellectual property rights; (ii) any claim seeking emergency injunctive relief based on exigent circumstances (e.g., imminent danger or commission of a crime, hacking, cyber-attack) (iii) any claim arising solely from your alleged failure to pay fees due to Shotkut. All aspects of the arbitration proceeding, and any ruling, decision, or award by the arbitrator, will be strictly confidential for the benefit of all parties.
          </p>
        </div>

        {/* Section 41 - Domestic Use */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>41. Domestic Use</h2>
          <p>
            The Company makes no representation that the Platform or Services are appropriate or available for use in locations outside India. The Users who access the Platform from outside India do so at their own risk and initiative and must bear all responsibility for compliance with any applicable local laws.
          </p>
        </div>

        {/* Section 42 - Acknowledgement */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>42. Acknowledgement</h2>
          <p>
            By using the platform or other Services provided by us, you acknowledge that you have read these terms and conditions and agree to be bound by them.
          </p>
        </div>

        {/* Section 43 - Contact Us */}
        <div>
          <h2 className='text-xl font-semibold mb-2'>43. Contact Us</h2>
          <p>
            Please send your feedback, comments, notice, requests for technical support by email: <a href='mailto:support@shotkut.com' className='text-blue-600 underline'>support@shotkut.com</a>.
            As a Subscriber you shall also receive standard support services from us. You may reach our support team via chat bot or by email at <a href='mailto:support@shotkut.com' className='text-blue-600 underline'>support@shotkut.com</a>. However, due to the availability of unlimited downloads and traffic on Shotkut, the Products may not include the level of after-sale support. Any notice sent to you by us may be provided via our website and/or email to the User's email account associated with Shotkut.
          </p>
          <p className='mt-2'>
            In accordance with the Information Technology Act, 2000 and Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, the name and contact details of the Grievance Officer are provided below:
          </p>
          <p className='mt-2'>
            Name: Admin Support<br />
            Email: <a href='mailto:support@shotkut.com' className='text-blue-600 underline'>support@shotkut.com</a>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Terms