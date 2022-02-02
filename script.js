function readBarCode(blob) {
  if (!("BarcodeDetector" in window)) {
    console.log("Barcode Detector is not supported by this browser.");
  } else {
    console.log("Barcode Detector supported!");

    // create new detector
    var barcodeDetector = new BarcodeDetector({
      formats: [
        "code_39",
        "codabar",
        "ean_13",
        "qr_code",
        "data_matrix",
        "aztec",
      ],
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

function gotMedia(mediaStream) {
  const mediaStreamTrack = mediaStream.getVideoTracks()[0];
  const imageCapture = new ImageCapture(mediaStreamTrack);
  return imageCapture;
}

function captureVideo() {
  var video = document.getElementById("video");
  video.setAttribute("playsinline", "");
  video.setAttribute("autoplay", "");
  video.setAttribute("muted", "");
  video.style.width = "200px";
  video.style.height = "200px";

  /* Setting up the constraint */
  var constraints = {
    audio: false,
    video: {
      facingMode: { exact: "environment" },
      // facingMode: "user",
    },
  };

  /* Stream it to video element */
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function success(stream) {
      video.srcObject = stream;

      document.getElementById("capture").addEventListener("click", () => {
        const imageCapture = gotMedia(stream);
        const image = document.getElementById("imageEl");

        imageCapture
          .takePhoto()
          .then((blob) => {
            image.src = URL.createObjectURL(blob);
            image.onload = () => {
              URL.revokeObjectURL(this.src);
            };

            readBarCode(image);
          })
          .catch((error) => console.error("takePhoto() error:", error));
      });
    });
}

function captureImage() {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((mediaStream) => {
      const imageCapture = gotMedia(mediaStream);
      const image = document.getElementById("imageEl");

      imageCapture
        .takePhoto()
        .then((blob) => {
          image.src = URL.createObjectURL(blob);
          image.onload = () => {
            URL.revokeObjectURL(this.src);
          };

          readBarCode(image);
        })
        .catch((error) => console.error("takePhoto() error:", error));
    })
    .catch((error) => console.error("getUserMedia() error:", error));
}

window.onload = () => {
  captureVideo();
};
