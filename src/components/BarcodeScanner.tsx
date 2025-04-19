
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Search, Scan } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      <div className="max-w-4xl w-full mx-auto text-center space-y-8 mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-white">
          Food Scanner Pro
        </h1>
        <p className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto">
          Instantly discover detailed nutritional information about any food product with a simple scan
        </p>
      </div>

      <Card className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg border-purple-300/20 shadow-2xl">
        <div className="space-y-6">
          {!scanning ? (
            <div className="space-y-6">
              <div className="w-16 h-16 mx-auto bg-purple-600 rounded-full flex items-center justify-center">
                <Scan className="w-8 h-8 text-white" />
              </div>
              <Button 
                onClick={() => setScanning(true)}
                className="w-full text-lg py-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg"
              >
                <Search className="mr-2 h-5 w-5" />
                Start Scanning
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div id="reader" className="overflow-hidden rounded-lg"></div>
              <Button 
                onClick={() => setScanning(false)}
                variant="outline"
                className="w-full border-purple-300/20 text-purple-100 hover:bg-purple-800/50"
              >
                Cancel Scan
              </Button>
            </div>
          )}
        </div>
      </Card>

      <div className="mt-12 text-center text-purple-200 text-sm">
        <p>Point your camera at any food product barcode to get started</p>
      </div>
    </div>
  );
};

export default BarcodeScanner;
