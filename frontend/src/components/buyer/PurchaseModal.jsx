import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import { formatCurrency, formatEnergy } from '../../utils/formatters';
import { Zap, ShieldCheck } from 'lucide-react';

import { orderService } from '../../services/orderService';

export const PurchaseModal = ({ isOpen, onClose, listing, onConfirmPurchase }) => {
  const [units, setUnits] = useState('10');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!listing) return null;

  const unitNum = parseFloat(units) || 0;
  const price = listing.pricePerKwh || 0.12;
  const totalCost = unitNum * price;
  const platformFee = totalCost * 0.02;
  const finalTotal = totalCost + platformFee;

  const handleConfirm = async () => {
    setError('');
    setLoading(true);
    try {
      const listingId = listing._id || listing.id;
      const order = await orderService.createOrder({
        listingId,
        amountKwh: unitNum,
      });

      setSuccess(true);
      if (onConfirmPurchase) onConfirmPurchase(order);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
    } catch (err) {
      setError(err.message || 'Failed to complete energy purchase. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Instant P2P Energy Purchase">
      <div className="space-y-4">
        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-xl">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 dark:text-[#DAA520] dark:bg-[#DAA520]/10 dark:border-[#DAA520]/30 text-xs rounded-xl font-medium">
            Order confirmed! Power dispatch scheduled via smart contract.
          </div>
        )}
        {/* Listing preview */}
        <div className="p-3 bg-[#EAE6DE] dark:bg-[#1C1C1C] rounded-xl border border-[#DCD6CB] dark:border-[#383430] neu-inset-sm flex items-center justify-between text-xs">
          <div>
            <span className="text-[#77736B] dark:text-[#B5A898] block">Producer Node:</span>
            <span className="font-semibold text-[#292824] dark:text-[#F5E8D8]">{listing.sellerName || 'GreenMicrogrid Node 4'}</span>
          </div>
          <div className="text-right">
            <span className="text-[#77736B] dark:text-[#B5A898] block">Energy Rate:</span>
            <span className="font-semibold text-[#DAA520] dark:text-[#DAA520]">${price}/kWh</span>
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
        <div className="p-3.5 bg-[#F0E8DE] dark:bg-[#242424] rounded-xl border border-[#DCD6CB] dark:border-[#383430] neu-card-sm space-y-2 text-xs">
          <div className="flex justify-between text-[#77736B] dark:text-[#B5A898]">
            <span>Energy Subtotal ({unitNum} kWh):</span>
            <span className="text-[#292824] dark:text-[#F5E8D8]">{formatCurrency(totalCost)}</span>
          </div>
          <div className="flex justify-between text-[#77736B] dark:text-[#B5A898]">
            <span>Smart Contract & Grid Fee (2%):</span>
            <span className="text-[#292824] dark:text-[#F5E8D8]">{formatCurrency(platformFee)}</span>
          </div>
          <div className="pt-2 border-t border-[#DCD6CB] dark:border-[#383430] flex justify-between font-semibold text-sm">
            <span className="text-[#292824] dark:text-[#F5E8D8]">Total Payment:</span>
            <span className="text-[#DAA520] dark:text-[#DAA520]">{formatCurrency(finalTotal)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[#77736B] dark:text-[#B5A898] text-xs bg-[#EAE6DE] dark:bg-[#1C1C1C] border border-[#DCD6CB] dark:border-[#383430] neu-inset-sm p-2.5 rounded-lg">
          <ShieldCheck className="w-4 h-4 text-[#6B8F71] dark:text-[#DAA520] shrink-0" />
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
