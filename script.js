window.onload = () => {
  function gotMedia(mediaStream) {
    const mediaStreamTrack = mediaStream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(mediaStreamTrack);
    return imageCapture;
  }

  function readBarCode(blob) {
    if (!("BarcodeDetector" in window)) {
      console.log("Barcode Detector is not supported by this browser.");
    } else {
      console.log("Barcode Detector supported!");

      // create new detector
      var barcodeDetector = new BarcodeDetector({
        formats: ["code_39", "codabar", "ean_13"],
      });

      barcodeDetector
        .detect(blob)
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
  }

  document.getElementById("capture").addEventListener("click", () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((mediaStream) => {
        const imageCapture = gotMedia(mediaStream);
        const image = document.getElementById("imageEl");

        imageCapture
          .takePhoto()
          .then((blob) => {
            readBarCode(blob);

            const src = URL.createObjectURL(blob);
            image.src = src;
            image.onload = () => {
              URL.revokeObjectURL(this.src);
            };
          })
          .catch((error) => console.error("takePhoto() error:", error));
      })
      .catch((error) => console.error("getUserMedia() error:", error));
  });
};
