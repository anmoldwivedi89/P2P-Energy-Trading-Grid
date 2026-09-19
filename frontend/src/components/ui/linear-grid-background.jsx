import React from 'react';

export const LinearGridBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full pointer-events-none bg-[#EEF2F6] bg-[linear-gradient(to_right,rgba(197,208,219,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(197,208,219,0.3)_1px,transparent_1px)] bg-[size:5rem_3.5rem]">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(213,197,255,0.35),transparent)]"></div>
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_400px_at_0%_0%,rgba(16,185,129,0.12),transparent)]"></div>
    </div>
  );
};

export default LinearGridBackground;

