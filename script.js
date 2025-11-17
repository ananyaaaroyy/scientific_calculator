const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const inputField = document.getElementById("function-input");
const plotButton = document.getElementById("plot-btn");
const ctx = document.getElementById("graph");

let expression = "";
let chart;

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.textContent;
    if (val === "C") {
      expression = "";
    } else if (val === "=") {
      try {
        expression = eval(
          expression.replace(/π/g, Math.PI).replace(/x²/g, "**2")
        ).toString();
      } catch {
        expression = "Error";
      }
    } else if (["sin", "cos", "tan"].includes(val)) {
      expression += `Math.${val}(`;
    } else {
      expression += val;
    }
    display.value = expression;
  });
});

// ---- GRAPH PLOTTING ----
plotButton.addEventListener("click", () => {
  const funcStr = inputField.value.trim();
  if (!funcStr) return alert("Please enter a function to plot.");

  const xs = Array.from({ length: 400 }, (_, i) => i / 20 - 10);
  const ys = xs.map((x) => {
    try {
      return eval(funcStr.replace(/x/g, `(${x})`).replace(/\^/g, "**"));
    } catch {
      return NaN;
    }
  });

  if (chart) chart.destroy();

  const gradient = ctx.getContext("2d").createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, "#00b7c2");
  gradient.addColorStop(1, "#0078d7");

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: xs,
      datasets: [
        {
          label: `f(x) = ${funcStr}`,
          data: ys,
          borderColor: gradient,
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1000, easing: "easeOutQuart" },
      scales: {
        x: {
          title: { display: true, text: "x", color: "#333", font: { size: 14 } },
          grid: { color: "rgba(0,0,0,0.1)" },
          ticks: { color: "#444" },
        },
        y: {
          title: { display: true, text: "y", color: "#333", font: { size: 14 } },
          grid: { color: "rgba(0,0,0,0.1)" },
          ticks: { color: "#444" },
        },
      },
      plugins: {
        legend: {
          labels: { color: "#222", font: { size: 13, style: "italic" } },
        },
        tooltip: {
          backgroundColor: "#0078d7",
          titleColor: "#fff",
          bodyColor: "#fff",
        },
        zoom: {
          zoom: {
            wheel: { enabled: true },
            pinch: { enabled: true },
            mode: "xy",
          },
          pan: {
            enabled: true,
            mode: "xy",
          },
          limits: {
            x: { min: -Infinity, max: Infinity },
            y: { min: -Infinity, max: Infinity },
          },
        },
      },
    },
  });
});

// ---- RESET ZOOM FEATURE ----
const resetBtn = document.createElement("button");
resetBtn.textContent = "Reset Zoom";
resetBtn.className = "reset-btn";
document.querySelector(".graph-panel").appendChild(resetBtn);

resetBtn.addEventListener("click", () => {
  if (chart) chart.resetZoom();
});
