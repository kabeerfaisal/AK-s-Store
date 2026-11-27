const STYLES = {
    wrapper: 'font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; background-color: #FAF8F5; border: 1px solid #E8DFD1; border-radius: 10px; color: #1F2937;',
    header: 'border-bottom: 2px solid #8C1515; padding-bottom: 12px; margin-bottom: 20px;',
    brand: 'margin: 0; font-size: 20px; color: #8C1515; letter-spacing: 1px;',
    subtitle: 'margin: 4px 0 0; font-size: 13px; color: #6B7280;',
    text: 'font-size: 14px; line-height: 1.5; margin: 0 0 12px;',
    muted: 'font-size: 12px; color: #6B7280; margin: 12px 0 0;',
    card: 'background: #FFFFFF; border: 1px solid #E8DFD1; border-radius: 8px; padding: 14px; margin: 16px 0; font-size: 13px;',
    cardRow: 'margin: 4px 0;',
    table: 'width: 100%; border-collapse: collapse; background: #FFFFFF; border: 1px solid #E8DFD1; border-radius: 8px;',
    th: 'padding: 10px 8px; background-color: #F3ECE1; font-size: 12px; color: #374151;',
    td: 'padding: 10px 8px; border-bottom: 1px solid #E8DFD1; font-size: 13px;',
    footer: 'margin-top: 28px; padding-top: 14px; border-top: 1px solid #E8DFD1; font-size: 12px; color: #6B7280; text-align: center;',
};

const formatCurrency = (amount) => `Rs. ${Number(amount ?? 0).toLocaleString()}`;
const getShortId = (id) => id?.toString().slice(-8).toUpperCase() ?? '';

// Reusable Building Blocks
const renderGreeting = (name) =>
    `<p style="${STYLES.text}">Hello <strong>${name || 'Valued Customer'}</strong>,</p>`;

const renderInfoCard = (rows) => `
  <div style="${STYLES.card}">
    ${Object.entries(rows)
        .map(([label, value]) => `<p style="${STYLES.cardRow}"><strong>${label}:</strong> ${value}</p>`)
        .join('')}
  </div>
`;

const renderLayout = ({ subtitle, customerName, body, footerNote = '' }) => `
  <div style="${STYLES.wrapper}">
    <div style="${STYLES.header}">
      <h1 style="${STYLES.brand}">AK'S STORE</h1>
      <p style="${STYLES.subtitle}">${subtitle}</p>
    </div>
    ${renderGreeting(customerName)}
    ${body}
    ${footerNote ? `<p style="${STYLES.muted}">${footerNote}</p>` : ''}
    <div style="${STYLES.footer}">
      Thank you for shopping with AK'S STORE. If you have any questions, reply to this email.
    </div>
  </div>
`;

export const orderInvoiceTemplate = (user, order) => {
    const shortId = getShortId(order._id)
    const address = order.shippingAddress ?? {}

    const orderDate = new Date(order.createdAt ?? date.now()).toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })

    const itemRows = (order.products ?? []).map(
        ({ title, selectedSize, quantity, price }) => `
            <tr>
                <td style="${STYLES.td}">
                    <strong>${title}</strong>
                    ${selectedSize ? `<br/><span style="color: #6B7280; font-size: 11px;">Size: ${selectedSize}</span>` : ''}
                </td>
                <td style="${STYLES.td} text-align: center;">${quantity}</td>
                <td style="${STYLES.td} text-align: right;">${formatCurrency(price)}</td>
                <td style="${STYLES.td} text-align: right; font-weight: bold;">${formatCurrency(price * quantity)}</td>
            </tr>`
    ).join('')

    return renderLayout({
        subtitle: `Order Invoice #${shortId}`,
        customerName: address.fullName || user?.name,
        body: `
      <p style="${STYLES.text}">Your order has been placed successfully! Below is your official order invoice.</p>
      ${renderInfoCard({
            'Order ID': `#${shortId}`,
            'Order Date': orderDate,
            'Payment Method': order.paymentMethod || 'COD',
            'Shipping Address': `${address.streetAddress}, ${address.city} (${address.postalCode}) — ${address.phone}`,
        })}
      <table style="${STYLES.table}">
        <thead>
          <tr>
            <th style="${STYLES.th} text-align: left;">Item</th>
            <th style="${STYLES.th} text-align: center;">Qty</th>
            <th style="${STYLES.th} text-align: right;">Price</th>
            <th style="${STYLES.th} text-align: right;">Subtotal</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
      </table>
      <div style="margin-top: 16px; text-align: right; font-size: 13px;">
        <p style="${STYLES.cardRow}">Items Subtotal: <strong>${formatCurrency(order.itemsPrice)}</strong></p>
        <p style="${STYLES.cardRow}">Shipping Fee: <strong>${order.shippingFee === 0 ? 'FREE' : formatCurrency(order.shippingFee)}</strong></p>
        <p style="margin: 8px 0 0; font-size: 16px; color: #8C1515;">Total Payable: <strong>${formatCurrency(order.totalAmount)}</strong></p>
      </div>
    `,
    });

}

export const orderStatusTemplate = (customerName, order, status) => {
    const shortId = getShortId(order._id);
  const message =
    status.toLowerCase() === 'shipped'
      ? `Great news! Your order <strong>#${shortId}</strong> has been <strong>shipped</strong> and is on its way.`
      : `Your order <strong>#${shortId}</strong> status has been updated to <strong>${status}</strong>.`;

  return renderLayout({
    subtitle: `Order #${shortId} — ${status}`,
    customerName,
    body: `
      <p style="${STYLES.text}">${message}</p>
      ${renderInfoCard({
        'Order Total': formatCurrency(order.totalAmount),
        'Delivery City': order.shippingAddress?.city || 'N/A',
      })}
    `,
  });
}

export const orderCancelledTemplate = (customerName, order, cancelledBy = 'customer') => {
  const shortId = getShortId(order._id);
  const actor = cancelledBy === 'admin' ? 'by our store team' : 'as per your request';

  return renderLayout({
    subtitle: `Order #${shortId} Cancelled`,
    customerName,
    body: `<p style="${STYLES.text}">Your order <strong>#${shortId}</strong> (${formatCurrency(order.totalAmount)}) has been cancelled ${actor}.</p>`,
    footerNote: 'If you paid online or have any questions regarding this cancellation, please contact our support team.',
  });
};

export const registerAlertTemplate = (user, loginMethod = 'Email & Password') => {
  const timestamp = new Date().toLocaleString('en-PK', {
    timeZone: 'Asia/Karachi',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return renderLayout({
    subtitle: 'Account Created Successfully',
    customerName: user?.name,
    body: `
      <p style="${STYLES.text}">Welcome to the <strong>AK'S STORE</strong> family! Your account is all set—start exploring our latest collection anytime.</p>
      ${renderInfoCard({
        Method: loginMethod,
        'Time (PKT)': timestamp,
      })}
    `,
    footerNote: 'You can now log in anytime to browse our latest collection, track your orders, and enjoy a faster checkout. If you did not create this account, please contact our support team immediately.',

  });
};

export const loginAlertTemplate = (user, loginMethod = 'Email & Password') => {
  const timestamp = new Date().toLocaleString('en-PK', {
    timeZone: 'Asia/Karachi',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return renderLayout({
    subtitle: 'New Login Detected',
    customerName: user?.name,
    body: `
      <p style="${STYLES.text}">We noticed a new sign-in to your <strong>AK'S STORE</strong> account.</p>
      ${renderInfoCard({
        Method: loginMethod,
        'Time (PKT)': timestamp,
      })}
    `,
    footerNote: 'If this was you, no action is needed. Otherwise, please reset your password immediately.',
  });
};