/**
 * MYSB Seat Count Endpoint
 * =============================================================
 * Returns remaining seats and waitlist status.
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const totalSeats = parseInt(process.env.TOTAL_SEATS || '10', 10);
  const seatsRemaining = parseInt(process.env.SEATS_REMAINING || '4', 10);
  const forceWaitlist = process.env.FORCE_WAITLIST_MODE === 'true';

  return res.status(200).json({
    cohort: 1,
    totalSeats,
    seatsRemaining: forceWaitlist ? 0 : seatsRemaining,
    isWaitlist: forceWaitlist || seatsRemaining <= 0
  });
};
