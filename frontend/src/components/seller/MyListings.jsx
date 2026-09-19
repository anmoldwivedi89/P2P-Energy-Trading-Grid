import React, { useState, useEffect } from 'react';
import ListingCard from './ListingCard';
import { Plus, Database, Zap, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { listingService } from '../../services/listingService';

export const MyListings = ({ onEdit, onDelete }) => {
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyListings = async () => {
      setLoading(true);
      try {
        const res = await listingService.getMyListings();
        if (Array.isArray(res)) {
          setMyListings(res);
        } else if (res && Array.isArray(res.data)) {
          setMyListings(res.data);
        } else {
          setMyListings([]);
        }
      } catch {
        setMyListings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMyListings();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-[#12372A]">Your Energy Listings</h3>
          <p className="text-xs text-[#475569]">Live power generation feeds connected to your smart meter</p>
        </div>
        <Link
          to="/seller/create-listing"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-[#16A34A] hover:bg-[#15803D] text-white rounded-xl shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>New Listing</span>
        </Link>
      </div>

      {loading && (
        <div className="py-8 text-center text-xs text-[#475569]">
          Loading your active listings...
        </div>
      )}

      {!loading && myListings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myListings.map((item) => (
            <ListingCard
              key={item.id || item._id}
              listing={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {!loading && myListings.length === 0 && (
        <div className="p-8 rounded-3xl bg-white border border-[#DDE8E1] text-center space-y-4 shadow-xs">
          <div className="p-3 bg-[#ECFDF3] text-[#16A34A] rounded-2xl w-fit mx-auto border border-[#DDE8E1]">
            <Zap className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto">
            <h4 className="text-base font-semibold text-[#12372A]">No Active Energy Listings</h4>
            <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
              You haven't listed any surplus solar or renewable energy yet. Connect your smart meter output and start selling power to local neighbors.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/seller/create-listing"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium bg-[#16A34A] hover:bg-[#15803D] text-white rounded-xl shadow-sm transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish First Solar Listing</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
