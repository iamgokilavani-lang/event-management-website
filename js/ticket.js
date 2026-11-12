// Digital Ticket Generator & Renderer

class TicketRenderer {
  // Generates an inline SVG QR Code representation deterministically from string
  static generateQRCodeSVG(dataString, size = 140) {
    // Generate pseudo-random matrix based on hash of dataString
    let hash = 0;
    for (let i = 0; i < dataString.length; i++) {
      hash = ((hash << 5) - hash) + dataString.charCodeAt(i);
      hash |= 0;
    }

    const grid = 21; // 21x21 QR code grid
    const matrix = [];
    for (let r = 0; r < grid; r++) {
      matrix[r] = [];
      for (let c = 0; c < grid; c++) {
        // Corner markers (standard QR finder patterns)
        if (
          (r < 7 && c < 7) ||
          (r < 7 && c >= grid - 7) ||
          (r >= grid - 7 && c < 7)
        ) {
          const inCornerBorder = (r === 0 || r === 6 || c === 0 || c === 6) && (r < 7 && c < 7);
          const inCornerBorder2 = (r === 0 || r === 6 || c === grid - 1 || c === grid - 7) && (r < 7 && c >= grid - 7);
          const inCornerBorder3 = (r === grid - 1 || r === grid - 7 || c === 0 || c === 6) && (r >= grid - 7 && c < 7);
          const inCornerCenter = (r >= 2 && r <= 4 && c >= 2 && c <= 4);
          const inCornerCenter2 = (r >= 2 && r <= 4 && c >= grid - 5 && c <= grid - 3);
          const inCornerCenter3 = (r >= grid - 5 && r <= grid - 3 && c >= 2 && c <= 4);

          matrix[r][c] = (inCornerBorder || inCornerBorder2 || inCornerBorder3 || inCornerCenter || inCornerCenter2 || inCornerCenter3) ? 1 : 0;
        } else {
          // Data bits from hash and coordinate
          const seed = Math.sin(hash * 0.1 + r * 17 + c * 31) * 10000;
          matrix[r][c] = (seed - Math.floor(seed)) > 0.46 ? 1 : 0;
        }
      }
    }

    const cellSize = (size - 16) / grid;
    let rects = "";
    for (let r = 0; r < grid; r++) {
      for (let c = 0; c < grid; c++) {
        if (matrix[r][c]) {
          const x = 8 + c * cellSize;
          const y = 8 + r * cellSize;
          rects += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${cellSize.toFixed(1)}" height="${cellSize.toFixed(1)}" fill="#111827" />`;
        }
      }
    }

    return `
      <svg class="qr-svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" rx="12" fill="#ffffff" />
        ${rects}
      </svg>
    `;
  }

  // Generates SVG Barcode
  static generateBarcodeSVG(code, width = 260, height = 50) {
    const bars = [];
    let x = 10;
    const endX = width - 10;
    
    // Seed bars
    for (let i = 0; i < code.length * 6; i++) {
      const barWidth = (i % 3 === 0 || i % 7 === 0) ? 3 : 1.5;
      const space = (i % 2 === 0) ? 2 : 3;
      if (x + barWidth >= endX) break;
      bars.push(`<rect x="${x}" y="5" width="${barWidth}" height="${height - 15}" fill="#1e293b" />`);
      x += barWidth + space;
    }

    return `
      <svg class="barcode-svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <rect width="${width}" height="${height}" fill="transparent" />
        ${bars.join("")}
        <text x="${width / 2}" y="${height - 2}" text-anchor="middle" font-family="monospace" font-size="10" fill="#64748b" letter-spacing="3">${code}</text>
      </svg>
    `;
  }

  // Generate downloadable/printable HTML for ticket
  static printTicket(registration) {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to print ticket.");
      return;
    }

    const qrSvg = this.generateQRCodeSVG(registration.qrCodeData || registration.bookingId, 160);
    const barcodeSvg = this.generateBarcodeSVG(registration.bookingId, 280, 55);

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Ticket - ${registration.eventTitle}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f1f5f9; padding: 30px; display: flex; justify-content: center; }
          .ticket-card { width: 620px; background: white; border-radius: 18px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); overflow: hidden; border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, #4f46e5, #7c3aed); color: white; padding: 26px 30px; }
          .header h1 { margin: 0 0 6px 0; font-size: 22px; }
          .header p { margin: 0; opacity: 0.9; font-size: 13px; }
          .body { padding: 30px; display: grid; grid-template-columns: 1fr 180px; gap: 24px; align-items: center; }
          .info-group { margin-bottom: 16px; }
          .info-label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; letter-spacing: 0.5px; }
          .info-val { font-size: 15px; font-weight: 600; color: #1e293b; margin-top: 3px; }
          .qr-side { display: flex; flex-direction: column; align-items: center; justify-content: center; background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px dashed #cbd5e1; }
          .footer { background: #f8fafc; padding: 18px 30px; border-top: 2px dashed #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
          @media print {
            body { background: white; padding: 0; }
            .ticket-card { box-shadow: none; border: 1px solid #cbd5e1; }
          }
        </style>
      </head>
      <body>
        <div class="ticket-card">
          <div class="header">
            <span style="display:inline-block; background:rgba(255,255,255,0.25); padding:4px 10px; border-radius:100px; font-size:11px; font-weight:700; text-transform:uppercase; margin-bottom:8px;">${registration.categoryLabel || "Confirmed Ticket"}</span>
            <h1>${registration.eventTitle}</h1>
            <p>${registration.eventDate} • ${registration.eventTime}</p>
          </div>
          <div class="body">
            <div>
              <div class="info-group">
                <div class="info-label">Attendee Name</div>
                <div class="info-val">${registration.attendee.fullName}</div>
              </div>
              <div class="info-group">
                <div class="info-label">Venue & Location</div>
                <div class="info-val">${registration.eventVenue}</div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div class="info-group">
                  <div class="info-label">Ticket Tier</div>
                  <div class="info-val">${registration.ticketTier}</div>
                </div>
                <div class="info-group">
                  <div class="info-label">Quantity / Seats</div>
                  <div class="info-val">${registration.quantity} Pass(es)</div>
                </div>
              </div>
              <div class="info-group">
                <div class="info-label">Booking Reference</div>
                <div class="info-val" style="font-family:monospace; color:#4f46e5; font-size:16px;">${registration.bookingId}</div>
              </div>
            </div>
            <div class="qr-side">
              ${qrSvg}
              <div style="font-size:10px; color:#64748b; margin-top:8px; text-align:center;">Scan at Entrance Gate</div>
            </div>
          </div>
          <div class="footer">
            ${barcodeSvg}
            <div style="text-align:right;">
              <span style="display:inline-block; background:#dcfce7; color:#166534; padding:5px 12px; border-radius:100px; font-weight:700; font-size:12px;">VALID PASS</span>
            </div>
          </div>
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  }
}

window.TicketRenderer = TicketRenderer;

