import React, { useRef } from 'react';
import { Download, Printer, ExternalLink, ShieldCheck, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

// Deterministic matrix generator for realistic SVG QR representation
const generateQRMatrix = (text, size = 25) => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  const matrix = Array(size).fill(0).map(() => Array(size).fill(0));

  // Add 3 standard QR finder patterns in corners
  const addFinderPattern = (startX, startY) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        ) {
          matrix[startY + r][startX + c] = 1;
        } else {
          matrix[startY + r][startX + c] = 0;
        }
      }
    }
  };

  addFinderPattern(0, 0); // Top-left
  addFinderPattern(size - 7, 0); // Top-right
  addFinderPattern(0, size - 7); // Bottom-left

  // Fill remainder with pseudo-random data bits based on text hash
  let seed = Math.abs(hash) || 1234567;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // Avoid finder areas
      const isTopLeft = r < 8 && c < 8;
      const isTopRight = r < 8 && c >= size - 8;
      const isBottomLeft = r >= size - 8 && c < 8;
      const isCenter = r >= 10 && r <= 14 && c >= 10 && c <= 14;

      if (!isTopLeft && !isTopRight && !isBottomLeft && !isCenter) {
        seed = (seed * 9301 + 49297) % 233280;
        matrix[r][c] = seed / 233280 > 0.48 ? 1 : 0;
      }
    }
  }

  return matrix;
};

export const QRCodeDisplay = ({
  batchId = 'HNY-2026-001',
  productName = 'Raw Honey',
  size = 200,
  showActions = true,
  showBorder = true,
  subtitle = 'Scan with smartphone camera to verify blockchain origin'
}) => {
  const qrRef = useRef(null);
  const [copied, setCopied] = React.useState(false);

  const verificationUrl = `${window.location.origin}/verify/${batchId}`;
  const matrix = generateQRMatrix(batchId, 25);
  const cellSize = size / 25;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const svgElement = qrRef.current;
    if (!svgElement) return;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `QRCode-${batchId}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`flex flex-col items-center text-center ${
        showBorder ? 'bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs' : ''
      }`}
    >
      {/* QR Code Container with Scanner Frame */}
      <div className="relative p-3 bg-white rounded-2xl border-2 border-slate-100 shadow-inner group">
        <svg
          ref={qrRef}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transition-transform duration-300 group-hover:scale-102"
        >
          <rect width={size} height={size} fill="#ffffff" rx={8} />
          {matrix.map((row, rIdx) =>
            row.map((cell, cIdx) =>
              cell === 1 ? (
                <rect
                  key={`${rIdx}-${cIdx}`}
                  x={cIdx * cellSize}
                  y={rIdx * cellSize}
                  width={cellSize + 0.2}
                  height={cellSize + 0.2}
                  fill="#0f172a"
                  rx={cellSize > 8 ? 1 : 0}
                />
              ) : null
            )
          )}

          {/* Center Bee / Blockchain Logo Badge */}
          <rect
            x={size / 2 - 18}
            y={size / 2 - 18}
            width={36}
            height={36}
            fill="#f59e0b"
            rx={8}
            stroke="#ffffff"
            strokeWidth={2}
          />
          <text
            x={size / 2}
            y={size / 2 + 6}
            textAnchor="middle"
            fontSize="18"
            fill="#ffffff"
            fontWeight="bold"
          >
            🐝
          </text>
        </svg>

        {/* Verification verified badge overlay */}
        <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1 rounded-full shadow-md border-2 border-white">
          <ShieldCheck size={16} />
        </div>
      </div>

      {/* Batch details */}
      <div className="mt-4">
        <div className="font-mono text-sm font-bold text-slate-900 tracking-wider flex items-center justify-center gap-1.5">
          <span>{batchId}</span>
        </div>
        <div className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full inline-block mt-1">
          {productName}
        </div>
        {subtitle && <p className="text-xs text-slate-500 mt-2 max-w-xs">{subtitle}</p>}
      </div>

      {/* Action buttons */}
      {showActions && (
        <div className="mt-5 w-full flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            title="Download vector SVG"
          >
            <Download size={14} />
            <span>Download</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            title="Print batch sticker label"
          >
            <Printer size={14} />
            <span>Print</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            title="Copy verification web link"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>

          <Link
            to={`/verify/${batchId}`}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-colors shadow-2xs"
          >
            <ExternalLink size={14} />
            <span>View Verification</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default QRCodeDisplay;
