import QRCode from 'qrcode';

/**
 * QR Code Service
 * Generates verification QR payloads and Base64 Data URLs pointing to /verify/:batchId
 */

export const generateBatchQR = async (batchId, baseUrl = null) => {
  const frontendUrl = baseUrl || process.env.FRONTEND_URL || 'http://localhost:5173';
  const verificationUrl = `${frontendUrl}/verify/${batchId}`;

  try {
    const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      },
      width: 300
    });

    const qrSvgString = await QRCode.toString(verificationUrl, {
      type: 'svg',
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    });

    return {
      batchId,
      verificationUrl,
      qrDataUrl,
      qrSvgString
    };
  } catch (error) {
    console.error('Error generating QR code:', error);
    return {
      batchId,
      verificationUrl,
      qrDataUrl: '',
      qrSvgString: ''
    };
  }
};

export default {
  generateBatchQR
};
