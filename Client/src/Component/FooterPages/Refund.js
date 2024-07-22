export default function CancellationAndRefund() {
  return (
    <>
      <div className="categoryview m-auto row">
        <hr className="row hr-line" style={{ borderColor: "white" }}></hr>
        <p className="p-1">
          <a href="/" className="anchortext">
            Home
          </a>{" "}
          {">"} Terms
        </p>
      </div>

      <div className="container  m-auto p-4">
        <div className="row text-center">
          <h1 className="m-auto heading mb-3 mt-3">
            Refund and Cancellation Policy
          </h1>
        </div>
        <p className="refund-text">
          Our refund and cancellation policy details how you can manage
          cancellations or refunds for products/services purchased through the
          Platform. Here are the guidelines:{" "}
        </p>
        <ul>
          <li className="list_typ">Cancellation Policy:</li>
          <ul>
            <li className="refund-text">
              {" "}
              <strong>Perishable Items:</strong> We do not accept cancellation
              requests for perishable items such as flowers and edibles, or for
              workshop tickets once purchased. However, if the product delivered
              is of unsatisfactory quality, a replacement can be arranged upon
              verification.
            </li>
            <li className="refund-text">
              {" "}
              <strong>Non-perishable :</strong>items such as glass containers
              and planters, cancellations are not assured. You may request
              cancellation by calling 96205 20200 on the same day the order is
              placed, and we will consider processing your request.
            </li>
            <li className="refund-text">
              {" "}
              <strong>Workshop tickets:</strong> Once a workshop ticket is
              purchased, it cannot be canceled, exchanged, or rescheduled to
              another date.
            </li>
          </ul>
          <li className="sub_heading list_typ">Damaged or Defective Items:</li>
          <ul>
            <li className="refund-text">
              If you receive damaged or defective items, please contact our
              customer service team immediately. Requests will be processed
              after verification by the seller/merchant. For perishable items
              like plants, please report issues on the same day of delivery; for
              non-perishable products, within 48 hours. Our customer service
              team will assess your complaint and make a suitable decision.
            </li>
          </ul>

          <li className="sub_heading list_typ">Refunds:</li>
          <ul>
            <li className="refund-text">
              Approved refunds by HEALING GARDEN will be processed within 7
              days.
            </li>
          </ul>
        </ul>
        <p>
          <strong>Return Policy</strong>
        </p>{" "}
        <p className="refund-text">
          We only offer replacements for damaged products; returns or refunds
          are not available.
        </p>
        <strong>Shipping Policy</strong>
        <p className="refund-text">
          Orders are shipped via registered domestic courier companies or speed
          post only. Shipments are dispatched within 5 days from the
          order/payment date or as per the agreed delivery date at the time of
          order confirmation. Delivery timelines are subject to courier
          company/postal authority norms. The Platform Owner is not responsible
          for delays caused by courier companies or postal authorities. All
          orders will be delivered to the address provided by the buyer during
          purchase. Shipping costs, if any, imposed by the seller or Platform
          Owner are non-refundable.
        </p>
      </div>
    </>
  );
}
