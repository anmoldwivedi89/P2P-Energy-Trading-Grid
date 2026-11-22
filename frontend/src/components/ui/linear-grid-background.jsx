import React from 'react';

export const LinearGridBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full pointer-events-none bg-[#EAE6DE] bg-[linear-gradient(to_right,rgba(220,214,203,0.45)_1px,transparent_1px),linear-gradient(to_bottom,rgba(220,214,203,0.45)_1px,transparent_1px)] bg-[size:5rem_3.5rem]">
      {/* Soft Warm Neumorphic Ambient Light Accents */}
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_900px_at_100%_200px,rgba(255,255,255,0.7),transparent)]"></div>
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_500px_at_0%_0%,rgba(218,165,32,0.06),transparent)]"></div>
      <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle_400px_at_100%_50%,rgba(255,111,97,0.04),transparent)]"></div>
    </div>
  );
};

export default LinearGridBackground;

