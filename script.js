window.onload = () => {
  if (!("BarcodeDetector" in window)) {
    console.log("Barcode Detector is not supported by this browser.");
  } else {
    console.log("Barcode Detector supported!");

    // create new detector
    var barcodeDetector = new BarcodeDetector({
      formats: ["code_39", "codabar", "ean_13"],
    });

    barcodeDetector
      .detect(document.getElementById("imageEl"))
      .then((barcodes) => {
        console.log("barcodes foundeds");
        console.log(barcodes);

        barcodes.forEach((barcode) => {
          console.log(barcode.rawData);

          document.getElementById("barcode-data").innerHTML = barcode.rawData;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
