import React, { useEffect } from "react";
import { useTheme } from "../../context/ThemeProvider";

const ShipmentDelivery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { darkMode } = useTheme();

  return (
    <div className="bigscreen p-10 flex flex-col gap-5">
      <div>
        <div className="font-bold text-4xl">
          Terms of Shipment and Delivery
        </div>
        <div
          className={`${
            darkMode ? "bg-[#284637]" : "bg-[#C9DBD2]"
          } py-1 px-2 rounded text-sm mt-2 w-fit`}
        >
          Last Updated On: 30 March'25
        </div>
      </div>

      <div className="flex flex-col gap-6 text-sm leading-relaxed">
        {/* Section 1 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Shipment</h2>
          <p>
            To receive full access to Shotkut’s stock footage library of
            Products, you must become a Subscriber. If you elect to subscribe to
            Shotkut, you must select one of our subscription plans. You
            acknowledge that you are signing up for a recurring payment plan in
            order to access Shotkut and its paid Products/Services. Your
            subscription will automatically renew at the end of each billing
            period in accordance with the frequency and payment method that was
            selected by you at the point of first payment confirmation and
            checkout. Payment will be charged to your nominated payment method
            at the start of each billing period until you cancel.
          </p>
          <p className="mt-4">
            We currently offer the following subscription types:
          </p>
          <div className="ml-4 mt-2">
            <p className="font-semibold">I. Single Use</p>
            <p>
              A single stock footage video can be downloaded by a single real
              person without sharing the seat. Use of a single stock footage
              does not require purchase of a monthly, quarterly or yearly plan
              and is a one-time purchase with following two variants:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>Mobile (vertical) quality</li>
              <li>HD quality</li>
              <li>4K quality</li>
            </ul>

            <p className="font-semibold mt-4">II. Monthly Subscription</p>
            <p>
              A single use monthly subscription can be used by a single real
              person for a month without sharing the seat. A single real person
              shall have unlimited download and use access for a month to all
              the stock footage which can be used in both the variants:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>Mobile (vertical) quality</li>
              <li>HD and</li>
              <li>4K</li>
            </ul>

            <p className="font-semibold mt-4">III. Annual Subscription</p>
            <p>
              Annual subscription offers a single use yearly subscription by a
              single real person at a discounted price for the first year, and a
              fixed price for every year thereafter. A single real person shall
              have unlimited download and use access for one year to all the
              stock footage which can be used in both the variants:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>Mobile (vertical) quality</li>
              <li>HD and</li>
              <li>4K</li>
            </ul>
          </div>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            2. Terms of Subscription
          </h2>
          <p>
            It is not permitted to share the subscription on multiple devices
            and each subscription is available for use by a single real person
            or for a single seat usage by a company with less than fifty
            employees. You are not permitted to share the seat. If your company
            has over 50 employees, please contact us to discuss a Company
            account.
          </p>
          <p className="mt-2">
            In the event, you are unable to subscribe to the Services due to any
            reason, you will have the right either to cancel the subscription.
            You agree that the Company shall not be liable to pay for any damage
            or loss either direct or indirect owing to such subscription or
            cancellation of such subscription or any default in payment for the
            subscription of Products/Services.
          </p>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            3. Delivery of Purchased Services
          </h2>
          <p>
            Upon purchase of the Products/ Services, you will receive an email
            with the details of the purchased Products/Services. The
            Products/Services shall be subject to refund and cancellation policy
            of the Company other than discontinuation of subscription services.
            In case of any query regarding the purchased Products/Services, you
            may contact our support team on the details mentioned on the
            website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDelivery;
