(function () {
  // 1. CONFIGURATION: Update with your full international phone number (no spaces, no +)
  const WHATSAPP_NUMBER = '254720005493'; 

  // 2. GENERATE AND INJECT THE COMPLETE STRUCTURAL MARKUP
  const modalHTML = `
    <div class="bh-modal-glow-container">
      <div class="bh-modal-glow" aria-hidden="true"></div>
      <div class="bh-modal-card">
        <h3>Order Your Lamp</h3>
        <p>Secure your <span id="bh-dynamic-product" style="color:#f5f3ee; font-weight:500;">Floor Lamp</span>. <strong>Payment on Delivery</strong>.</p>
        
        <form id="bhWhatsAppOrderForm">
          <input type="hidden" id="bhProductInput" value="">
          
          <div class="bh-form-group">
            <label for="bhCustName">Your Full Name</label>
            <input type="text" id="bhCustName" class="bh-form-input" required autocomplete="name" placeholder="e.g., Jane">
          </div>
          
          <div class="bh-form-group">
            <label for="bhCustLocation">Delivery Location / Estate</label>
            <input type="text" id="bhCustLocation" class="bh-form-input" required placeholder="e.g., Kilimani, Nairobi">
          </div>

          <div class="bh-form-group">
            <label for="bhCustLocationLandMark">Main Landmark</label>
            <input type="text" id="bhCustLocationLandMark" class="bh-form-input" required placeholder="e.g., Next to QuickMart">
          </div>
          
          <div class="bh-form-group">
            <label for="bhCustNotes">Delivery Instructions (Optional)</label>
            <textarea id="bhCustNotes" class="bh-form-input" placeholder="e.g., Best delivered after 3 PM, call on arrival"></textarea>
          </div>
          
          <div class="bh-modal-actions">
            <button type="submit" class="bh-btn-submit">
              Order via WhatsApp
            </button>
            <button type="button" id="bhCloseModal" class="bh-btn-cancel">Close</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const overlayContainer = document.createElement('div');
  overlayContainer.id = 'bhOrderOverlay';
  overlayContainer.className = 'bh-modal-overlay';
  overlayContainer.innerHTML = modalHTML;
  document.body.appendChild(overlayContainer);

  // 3. INTERCEPT EVENTS AND MANAGE STATE LOGIC
  const overlay = document.getElementById('bhOrderOverlay');
  const productSpan = document.getElementById('bh-dynamic-product');
  const hiddenInput = document.getElementById('bhProductInput');
  const form = document.getElementById('bhWhatsAppOrderForm');
  const cancelButton = document.getElementById('bhCloseModal');

  function openModal(productName) {
    hiddenInput.value = productName;
    if (productSpan) productSpan.textContent = productName;
    overlay.classList.add('is-active');
    document.body.style.overflow = 'hidden'; // Lock scrolling
  }

  function closeModal() {
    overlay.classList.remove('is-active');
    document.body.style.overflow = ''; // Restore scrolling
    form.reset();
  }

  // Handle Global Delegate Click for any button matching data-order-trigger
  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-order-trigger]');
    if (trigger) {
      e.preventDefault();
      const product = trigger.getAttribute('data-order-trigger') || 'Black Hue Product';
      openModal(product);
    }
  });

  // Close conditions
  cancelButton.addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  // Form Submission text layout assembly
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const product = hiddenInput.value;
    const name = document.getElementById('bhCustName').value.trim();
    const location = document.getElementById('bhCustLocation').value.trim();
    const notes = document.getElementById('bhCustNotes').value.trim() || 'None provided';
    
    // Clean, crisp payload architecture optimized for a modern business workflow
    const textPayload = 
      `📦 *NEW ORDER PLACED* 📦\n\n` +
      `🛒 *Product:* ${product}\n` +
      `👤 *Customer Name:* ${name}\n` +
      `📍 *Delivery Location:* ${location}\n` +
      `📝 *Logistics Notes:* ${notes}\n\n` +
      `⚠️ *Payment Framework:* Payment on Delivery (Cash/Mobile Money).\n\n` +
      `Please confirm my order and delivery`;
    
    const encodedPayload = encodeURIComponent(textPayload);
    const whatsappFinalUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedPayload}`;
    
    window.open(whatsappFinalUrl, '_blank');
    closeModal();
  });
})();