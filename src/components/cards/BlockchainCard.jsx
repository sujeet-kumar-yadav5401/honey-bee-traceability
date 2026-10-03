import React, { useState } from 'react';
import { ShieldCheck, Copy, Check, Blocks, Cpu, Info, ExternalLink } from 'lucide-react';

export const BlockchainCard = ({ blockchain, batchId }) => {
  const [copiedField, setCopiedField] = useState(null);

  if (!blockchain) return null;

  const handleCopy = (field, text) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-200 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-5 sm:p-6 shadow-md">
      {/* Decorative background grid and glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-400/30">
            <Blocks size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Blockchain Record Card
              <span className="text-[10px] font-semibold tracking-wider uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck size={11} />
                Verified
              </span>
            </h3>
            <p className="text-xs text-slate-400">Tamper-evident agricultural provenance ledger entry</p>
          </div>
        </div>

        {/* Prototype Disclaimer Badge */}
        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-medium self-start sm:self-auto">
          <Info size={13} className="shrink-0" />
          <span>Prototype / Demo Blockchain Record</span>
        </div>
      </div>

      {/* Blockchain Parameters Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 text-xs">
        {/* Data Hash */}
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1.5 font-medium">
            <span className="flex items-center gap-1.5">
              <Cpu size={14} className="text-indigo-400" />
              Cryptographic Data Hash (SHA-256)
            </span>
            <button
              onClick={() => handleCopy('dataHash', blockchain.dataHash)}
              className="text-slate-400 hover:text-white transition-colors"
              title="Copy Hash"
            >
              {copiedField === 'dataHash' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            </button>
          </div>
          <div className="font-mono text-indigo-200 text-[11px] break-all select-all font-semibold">
            {blockchain.dataHash}
          </div>
        </div>

        {/* Transaction ID */}
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1.5 font-medium">
            <span className="flex items-center gap-1.5">
              <Blocks size={14} className="text-amber-400" />
              Transaction ID
            </span>
            <button
              onClick={() => handleCopy('txId', blockchain.transactionId)}
              className="text-slate-400 hover:text-white transition-colors"
              title="Copy Tx ID"
            >
              {copiedField === 'txId' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            </button>
          </div>
          <div className="font-mono text-amber-200 text-[11px] break-all select-all font-semibold">
            {blockchain.transactionId}
          </div>
        </div>

        {/* Block & Ledger Info */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
          <span className="text-slate-400">Block Number</span>
          <span className="font-mono font-bold text-white">#{blockchain.blockNumber}</span>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
          <span className="text-slate-400">Smart Contract</span>
          <span className="font-mono text-[11px] text-indigo-300 font-semibold">{blockchain.smartContract}</span>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
          <span className="text-slate-400">Consortium Network</span>
          <span className="text-[11px] text-slate-200 font-medium">{blockchain.network}</span>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
          <span className="text-slate-400">Gas Used / Computational Cost</span>
          <span className="font-mono text-[11px] text-emerald-400 font-semibold">{blockchain.gasUsed} Units</span>
        </div>
      </div>

      {/* Bottom Educational / College Notice */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-start sm:items-center justify-between gap-3 text-[11px] text-slate-400">
        <p>
          State hashes are anchored at each supply chain step. Any retroactive modification to harvest or quality records invalidates the block Merkle root.
        </p>
      </div>
    </div>
  );
};

export default BlockchainCard;
