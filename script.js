function readBarCode(blob) {
  if (!("BarcodeDetector" in window)) {
    alert("Barcode Detector is not supported by this browser.");
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

          // document.getElementById("barcode-data").innerHTML = barcode.rawData;
          document.getElementById("barcode-data").innerHTML =
            JSON.stringify(barcode);
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

function handleCapture(mediaStream) {
  document.getElementById("capture").addEventListener("click", () => {
    const imageCapture = gotMedia(mediaStream);
    const image = document.getElementById("imageEl");

    imageCapture
      .takePhoto()
      .then((blob) => {
        image.src = URL.createObjectURL(blob);
        // image.onload = () => {
        //   URL.revokeObjectURL(this.src);
        // };

        readBarCode(image);
      })
      .catch((error) => console.error("takePhoto() error:", error));
  });
}

function getVideo(videoElement) {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        facingMode: { exact: "environment" },
        // facingMode: "user",
      },
    })
    .then(function (mediaStream) {
      videoElement.srcObject = mediaStream;

      handleCapture(mediaStream);
    });
}

function main() {
  var video = document.getElementById("video");
  video.setAttribute("playsinline", "");
  video.setAttribute("autoplay", "");
  video.setAttribute("muted", "");
  video.style.width = "200px";
  video.style.height = "200px";

  getVideo(video);
}

window.onload = () => {
  main();
};
