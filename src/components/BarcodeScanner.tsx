
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';

const BarcodeScanner = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    let scanner: Html5QrcodeScanner;

    if (scanning) {
      scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scanner.render((decodedText) => {
        scanner.clear();
        setScanning(false);
        navigate(`/product/${decodedText}`);
      }, (error) => {
        console.warn(error);
      });
    }

    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scanning, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-purple-50 to-white">
      <Card className="w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-purple-900">Food Scanner</h1>
        {!scanning ? (
          <Button 
            onClick={() => setScanning(true)}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Start Scanning
          </Button>
        ) : (
          <div className="space-y-4">
            <div id="reader" className="w-full"></div>
            <Button 
              onClick={() => setScanning(false)}
              variant="outline"
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default BarcodeScanner;
