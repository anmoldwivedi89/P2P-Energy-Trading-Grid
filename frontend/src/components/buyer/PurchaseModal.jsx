import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import { formatCurrency, formatEnergy } from '../../utils/formatters';
import { Zap, ShieldCheck } from 'lucide-react';

export const PurchaseModal = ({ isOpen, onClose, listing, onConfirmPurchase }) => {
  const [units, setUnits] = useState('10');
  const [loading, setLoading] = useState(false);

  if (!listing) return null;

  const unitNum = parseFloat(units) || 0;
  const price = listing.pricePerKwh || 0.12;
  const totalCost = unitNum * price;
  const platformFee = totalCost * 0.02;
  const finalTotal = totalCost + platformFee;

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onConfirmPurchase) onConfirmPurchase({ listingId: listing.id, units: unitNum, finalTotal });
      onClose();
    }, 600);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Instant P2P Energy Purchase">
      <div className="space-y-4">
        {/* Listing preview */}
        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400 block">Producer Node:</span>
            <span className="font-semibold text-white">{listing.sellerName || 'GreenMicrogrid Node 4'}</span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block">Energy Rate:</span>
            <span className="font-semibold text-emerald-400">${price}/kWh</span>
          </div>
        </div>

        <Input
          label="Purchase Amount (kWh)"
          type="number"
          min="1"
          max={listing.amount || 500}
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          helperText={`Maximum available: ${formatEnergy(listing.amount || 500)}`}
        />

        {/* Cost breakdown */}
        <div className="p-3.5 bg-slate-800/40 rounded-xl border border-slate-700/60 space-y-2 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Energy Subtotal ({unitNum} kWh):</span>
            <span className="text-slate-200">{formatCurrency(totalCost)}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Smart Contract & Grid Fee (2%):</span>
            <span className="text-slate-200">{formatCurrency(platformFee)}</span>
          </div>
          <div className="pt-2 border-t border-slate-700 flex justify-between font-bold text-sm">
            <span className="text-white">Total Payment:</span>
            <span className="text-emerald-400">{formatCurrency(finalTotal)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-xs bg-slate-800/20 p-2.5 rounded-lg">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Secured via decentralized smart contract escrow simulation.</span>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button size="sm" isLoading={loading} onClick={handleConfirm}>
            Confirm P2P Order
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PurchaseModal;
