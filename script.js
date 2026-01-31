const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll("li");

let current = "";
let previous = "";
let operator = "";

// Default screen
screen.textContent = "0";

// Function: Calculate
function calculate() {
  const a = parseFloat(previous);
  const b = parseFloat(current);

  if (isNaN(a) || isNaN(b)) return "";

  switch (operator) {
    case "+":
      return a + b;

    case "-":
      return a - b;

    case "x":
      return a * b;

    case "/":
      return b === 0 ? "Undefined" : a / b;

    default:
      return "";
  }
}

// Button click
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    /* CLEAR */
    if (value === "C") {
      current = "";
      previous = "";
      operator = "";
      screen.textContent = "0";
      return;
    }

    /* DELETE */
    if (value === "DEL") {
      current = current.slice(0, -1);
      screen.textContent = current || "0";
      return;
    }

    /* PERCENT */
    if (value === "%") {
      if (current !== "") {
        current = (parseFloat(current) / 100).toString();
        screen.textContent = current;
      }
      return;
    }

    /* NUMBERS */
    if (!isNaN(value) || value === "." || value === "00") {
      if (value === "." && current.includes(".")) return;

      current += value;
      screen.textContent = current;
      return;
    }

    /* OPERATORS */
    if (["+", "-", "x", "/"].includes(value)) {
      // Agar pehle se calculation hai
      if (previous && current) {
        previous = calculate().toString();
        screen.textContent = previous;
      } else {
        previous = current;
      }

      operator = value;
      current = "";
      return;
    }

    /* EQUAL */
    if (value === "=") {
      if (!previous || !current) return;

      const result = calculate();

      screen.textContent = result;

      current = result.toString();
      previous = "";
      operator = "";
    }
  });
});
