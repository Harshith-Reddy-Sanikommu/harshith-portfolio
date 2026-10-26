
export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error('ADMIN_PASSWORD environment variable is missing.');
    return res.status(500).json({
      success: false,
      message: 'Server configuration error',
    });
  }

  const { password } = req.body || {};

  if (
    typeof password !== 'string' ||
    password.length === 0 ||
    password !== adminPassword
  ) {
    return res.status(401).json({
      success: false,
      message: 'Incorrect password',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Authentication successful',
  });
}
