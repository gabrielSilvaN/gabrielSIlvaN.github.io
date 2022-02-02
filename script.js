window.onload = () => {
  if (typeof Gyroscope === "function") {
    const gyroscope = new Gyroscope({ frequency: 60 });
    const xAxis = document.getElementById("x-axis");
    const yAxis = document.getElementById("y-axis");
    const zAxis = document.getElementById("z-axis");

    gyroscope.addEventListener("reading", (e) => {
      xAxis.innerHTML = "Angular velocity along the X-axis " + gyroscope.x;
      yAxis.innerHTML = "Angular velocity along the Y-axis " + gyroscope.y;
      zAxis.innerHTML = "Angular velocity along the Z-axis " + gyroscope.z;
    });
    gyroscope.start();
  }

  if ("ProximitySensor" in window) {
    document.getElementById("sensor").innerHTML = "Habemus sensor";
  }

  if (window.AmbientLightSensor) {
    document.getElementById("sensor-light").innerHTML =
      "Habemus sensor of light";
  }
};
