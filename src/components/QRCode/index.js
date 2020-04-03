const { useState, useEffect } = require("react");
const QrCode = require("qrcode");

const useQrCode = () => {
  const [qrCode, setQrCode] = useState(null);

  const getQrCode = async args => {
    try {
      const qrCode = await QrCode.toDataURL(args)  
      return qrCode;

    } catch (error) {
      console.log(error)
    }
    
  }

  return { getQrCode, qrCode };
};

export default useQrCode;

// import { useState, useEffect } from "react";
// import QrCode from "qrcode";

// const useQrCode = (...args) => {
//   const [qrCode, setQrCode] = useState(null);
//   useEffect(() => {
//     if (args.length && args[0]) {
//       const canvas = document.createElement('canvas');
//       canvas.width = 1024;
//       canvas.height = 1024;
//       QrCode.toDataURL(canvas, ...args).then(res => setQrCode(res));
//     }
//   }, args);
//   return qrCode;
// };

// export default useQrCode;