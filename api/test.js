export default function handler(req, res) {
  res.status(200).json({ 
    message: "Vercel received your call",
    timestamp: new Date().toISOString()
  });
}
