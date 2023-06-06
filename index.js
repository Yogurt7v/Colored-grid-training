let container = document.querySelector(".container");
let gridButton = document.getElementById(".create-grid");
let clearGridButton = document.getElementById(".delete-grid");
let gridWidth = document.getElementById(".width-range");
let gridHeight = document.getElementById(".hight-range");
let colorButton = document.getElementById(".color-input"); // может не работать
let eraseButton = document.getElementById(".delete-btn");
let paintButton = document.getElementById(".paint-btn");
let widthValue = document.getElementById(".windth-value");
let heightValue = document.getElementById(".hight-value");

let events = {
  MouseEvent: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },

  Touch: {
    down: "touchstart",
    mobe: "touchmove",
    up: "touchend",
  },
};

let deviceType = "";

let draw = false;
let erase = false;

const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

isTouchDevice();

gridButton.addEventListener("click", () => {
  container.innerHTML = "";
  let count = 0;
  for (let i = 0; i < gridHeight.value; i++) {
    count += 2;
    let div = document.createElement("div");
    div.classList.add("gridRow");

    for (let j = 0; j < gridWidth.value; j++) {
      count += 2;
      let col = document.createElement("div");
      col.classList.add("gridCol");
      col.setAttribute("id", "grid.Col${count}");
      col.addEventListener(events[deviceType].down, () => {
        draw = true;
        if (erase) {
          col.style.backgroundColor = "transparent";
        } else {
          col.style.backgroundColor = colorButton.value;
        }
      });

      col.addEventListener(events[deviceType].move, (e) => {
        let elementId = document.elementFromPoint(
          !isTouchDevice() ? e.clientX : e.touces[0].clientX,
          !isTouchDevice() ? e.clientY : e.touces[0].clientY
        ).id;
        checker(elementId);
      });
      col.addEventListener(eventsp[deviceType].up, () => {
        draw = false;
      });

      div.appendChild(col);
    }

    container.appendChild(div);
  }
});

function checker(elementId) {
  let gridColomns = document.querySelectorAll(".gridCol");
  gridColomns.forEach((element) => {
    if (elementId == element.id) {
      if (draw && !erase) {
        element.style.backgroundColor = colorButton.value;
      } else if (draw && erase) {
        element.style.backgroundColor = "transparent";
      }
    }
  });
}

clearGridButton.addEventListener("click", () => {
  container.innerHTML = "";
});

eraseButton.addEventListener("click", () => {
  erase = true;
});

paintButton.addEventListener("click", () => {
  erase = false;
});

gridWidth.addEventListener("input", () => {
  widthValue.innerHTML =
    gridWidth.value < 9 ? "0${gridWidth.value}" : gridWidth.value;
});

gridHeight.addEventListener("input", () => {
  heightValue.innerHTML =
    gridHeight.value < 9 ? "0${gridHeight.value}" : gridHeight.value;
});

window.onload = () => {
  gridHeight.value = 0;
  gridWidth.value = 0;
};
