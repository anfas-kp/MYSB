/**
 * MYSB Serverless Registration API Endpoint
 * =============================================================
 * Compatible with Vercel Serverless Functions & Netlify Functions (Node.js)
 * 
 * Features:
 * - Server-side payload validation & sanitization
 * - Anti-spam Honeypot detection
 * - Conditional Under-18 validation (Guardian Name, Phone & Consent)
 * - Google Sheets storage (via Google Apps Script Webhook or Google Sheets API)
 * - Airtable storage (via Airtable REST API)
 * - Operations notification email & Registrant confirmation email
 */

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const data = req.body || {};

    // 01. Honeypot check for bots
    if (data.hp_country) {
      console.warn('Bot detected via honeypot field.');
      return res.status(200).json({ success: true, message: 'Registration received' });
    }

    // 02. Server-side Validation
    const errors = [];

    if (!data.fullName || typeof data.fullName !== 'string' || data.fullName.trim().length < 2) {
      errors.push('Full name is required (minimum 2 characters).');
    }

    const age = parseInt(data.age, 10);
    if (isNaN(age) || age < 15 || age > 30) {
      errors.push('Age must be a number between 15 and 30.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      errors.push('A valid email address is required.');
    }

    if (!data.phone || typeof data.phone !== 'string' || data.phone.replace(/\D/g, '').length < 7) {
      errors.push('A valid phone number is required.');
    }

    if (!data.cityCountry || typeof data.cityCountry !== 'string') {
      errors.push('City and country are required.');
    }

    if (!data.consentDataUse) {
      errors.push('Data privacy consent is required.');
    }

    // Conditional Under-18 Validation
    const isUnder18 = !isNaN(age) && age < 18;
    if (isUnder18) {
      if (!data.guardianName || typeof data.guardianName !== 'string' || data.guardianName.trim().length < 2) {
        errors.push('Parent or guardian name is required for participants under 18.');
      }
      if (!data.guardianPhone || typeof data.guardianPhone !== 'string' || data.guardianPhone.replace(/\D/g, '').length < 7) {
        errors.push('Parent or guardian phone is required for participants under 18.');
      }
      if (!data.guardianConsent) {
        errors.push('Parent or guardian consent checkbox must be confirmed for participants under 18.');
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // Sanitized record object
    const registrationRecord = {
      id: `MYSB-${Date.now().toString(36).toUpperCase()}`,
      submittedAt: new Date().toISOString(),
      fullName: data.fullName.trim(),
      age: age,
      isUnder18: isUnder18,
      phone: `${data.countryCode || '+91'} ${data.phone.trim()}`,
      email: data.email.trim().toLowerCase(),
      cityCountry: data.cityCountry.trim(),
      preferredLanguage: data.preferredLanguage || 'English',
      guardianName: isUnder18 ? (data.guardianName ? data.guardianName.trim() : '') : 'N/A',
      guardianPhone: isUnder18 ? (data.guardianPhone ? data.guardianPhone.trim() : '') : 'N/A',
      guardianConsentGiven: isUnder18 ? (data.guardianConsent ? 'Yes' : 'No') : 'N/A',
      notes: data.notes ? data.notes.trim() : '',
      isWaitlist: Boolean(data.isWaitlist),
      utmSource: data.utm?.source || 'direct',
      utmMedium: data.utm?.medium || 'web',
      utmCampaign: data.utm?.campaign || 'none',
      referrer: data.utm?.referrer || 'direct'
    };

    console.log('[MYSB Registration Received]:', registrationRecord);

    // 03. Write to Google Sheets or Airtable (Asynchronous Handlers)
    const storagePromises = [];

    // Option A: Google Sheets via Webhook (Apps Script / SheetDB)
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      storagePromises.push(
        fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registrationRecord),
          redirect: 'follow'
        }).catch(err => console.error('[Google Sheets Error]:', err))
      );
    }

    // Option B: Airtable API
    if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
      const airtableUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${encodeURIComponent(process.env.AIRTABLE_TABLE_NAME || 'Registrations')}`;
      storagePromises.push(
        fetch(airtableUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fields: {
              'Full Name': registrationRecord.fullName,
              'Age': registrationRecord.age,
              'Phone': registrationRecord.phone,
              'Email': registrationRecord.email,
              'City/Country': registrationRecord.cityCountry,
              'Language': registrationRecord.preferredLanguage,
              'Guardian Name': registrationRecord.guardianName,
              'Guardian Phone': registrationRecord.guardianPhone,
              'Notes': registrationRecord.notes,
              'Waitlist': registrationRecord.isWaitlist,
              'UTM Source': registrationRecord.utmSource,
              'Submitted At': registrationRecord.submittedAt
            }
          })
        }).catch(err => console.error('[Airtable Error]:', err))
      );
    }

    // 04. Send Notification & Confirmation Emails via Resend API
    if (process.env.RESEND_API_KEY) {
      const opsEmail = process.env.OPERATIONS_EMAIL || 'hello@mysbprogram.org';
      const whatsappLink = process.env.WHATSAPP_GROUP_INVITE_URL || 'https://chat.whatsapp.com/YOUR_GROUP_INVITE_CODE';

      // (1) Email to Operations Team
      const opsEmailPromise = fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'MYSB Registrations <registrations@mysbprogram.org>',
          to: [opsEmail],
          subject: `[New MYSB Registration] ${registrationRecord.fullName} (${registrationRecord.isWaitlist ? 'Waitlist' : 'Cohort 1'})`,
          html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #1F2A37; max-width: 600px;">
              <h2 style="color: #0F766E;">New Registration Received 🎉</h2>
              <p><strong>Status:</strong> ${registrationRecord.isWaitlist ? 'Waitlist Entry' : 'Cohort 1 Seat Request'}</p>
              <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
                <tr><td style="padding: 6px; border: 1px solid #E9E1D3;"><strong>Full Name:</strong></td><td style="padding: 6px; border: 1px solid #E9E1D3;">${registrationRecord.fullName}</td></tr>
                <tr><td style="padding: 6px; border: 1px solid #E9E1D3;"><strong>Age:</strong></td><td style="padding: 6px; border: 1px solid #E9E1D3;">${registrationRecord.age}</td></tr>
                <tr><td style="padding: 6px; border: 1px solid #E9E1D3;"><strong>Phone:</strong></td><td style="padding: 6px; border: 1px solid #E9E1D3;">${registrationRecord.phone}</td></tr>
                <tr><td style="padding: 6px; border: 1px solid #E9E1D3;"><strong>Email:</strong></td><td style="padding: 6px; border: 1px solid #E9E1D3;">${registrationRecord.email}</td></tr>
                <tr><td style="padding: 6px; border: 1px solid #E9E1D3;"><strong>City/Country:</strong></td><td style="padding: 6px; border: 1px solid #E9E1D3;">${registrationRecord.cityCountry}</td></tr>
                <tr><td style="padding: 6px; border: 1px solid #E9E1D3;"><strong>Language:</strong></td><td style="padding: 6px; border: 1px solid #E9E1D3;">${registrationRecord.preferredLanguage}</td></tr>
                ${isUnder18 ? `
                  <tr><td style="padding: 6px; border: 1px solid #E9E1D3; background:#FEF2F2;"><strong>Guardian Name:</strong></td><td style="padding: 6px; border: 1px solid #E9E1D3; background:#FEF2F2;">${registrationRecord.guardianName}</td></tr>
                  <tr><td style="padding: 6px; border: 1px solid #E9E1D3; background:#FEF2F2;"><strong>Guardian Phone:</strong></td><td style="padding: 6px; border: 1px solid #E9E1D3; background:#FEF2F2;">${registrationRecord.guardianPhone}</td></tr>
                ` : ''}
                <tr><td style="padding: 6px; border: 1px solid #E9E1D3;"><strong>Notes:</strong></td><td style="padding: 6px; border: 1px solid #E9E1D3;">${registrationRecord.notes || 'None'}</td></tr>
                <tr><td style="padding: 6px; border: 1px solid #E9E1D3;"><strong>Source / UTM:</strong></td><td style="padding: 6px; border: 1px solid #E9E1D3;">${registrationRecord.utmSource} (${registrationRecord.utmMedium})</td></tr>
              </table>
            </div>
          `
        })
      }).catch(err => console.error('[Ops Email Error]:', err));

      // (2) Confirmation Email to Registrant
      const userEmailPromise = fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'MYSB Speech Practice <hello@mysbprogram.org>',
          to: [registrationRecord.email],
          subject: 'We received your MYSB registration! Welcome to the community',
          html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #1F2A37; max-width: 600px; padding: 24px; background: #FBF6EE; border-radius: 16px;">
              <h2 style="color: #0F766E;">Welcome to MYSB, ${registrationRecord.fullName.split(' ')[0]}! 🌱</h2>
              <p>Thank you for taking this step. We've safely received your interest registration for <strong>MYSB Cohort 1</strong>.</p>
              <p>Our team is reviewing cohort allocations and will reach out with your orientation details and schedule.</p>
              
              <div style="margin: 24px 0; padding: 20px; background: #FFFFFF; border-radius: 12px; border: 1px solid #E9E1D3; text-align: center;">
                <h3 style="margin-top:0; color: #1F2A37;">Join our WhatsApp Group</h3>
                <p style="color: #5B6673; font-size: 14px;">Connect with our organizers and fellow cohort participants:</p>
                <a href="${whatsappLink}" style="display: inline-block; background: #FF7A5C; color: #FFFFFF; padding: 12px 24px; text-decoration: none; border-radius: 50px; font-weight: bold; margin-top: 8px;">Join WhatsApp Group</a>
              </div>

              <p style="font-size: 13px; color: #5B6673;">If you have any questions or need to update your details, reply directly to this email.</p>
              <hr style="border: none; border-top: 1px solid #E9E1D3; margin: 24px 0;">
              <p style="font-size: 12px; color: #8C96A3;">MYSB Program · Guided Speech Practice for Young People (Ages 15–30)</p>
            </div>
          `
        })
      }).catch(err => console.error('[User Confirmation Email Error]:', err));

      storagePromises.push(opsEmailPromise, userEmailPromise);
    }

    // Await non-blocking background promises
    await Promise.allSettled(storagePromises);

    return res.status(200).json({
      success: true,
      message: 'Registration recorded successfully.',
      registrationId: registrationRecord.id
    });

  } catch (error) {
    console.error('[Serverless API Internal Error]:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your registration.'
    });
  }
};
