window.onload = (f) => {
  const labels = document.querySelectorAll("label");
  const radios = [...document.querySelectorAll("input[type = radio]")];
  const root = document.querySelector(":root");
  const buttons = [...document.querySelectorAll("button")];
  const output = document.querySelector(".output");

  function toggle(e) {
    radios.forEach((radio) => {
      const r_matcher = radio.id.substr(6);
      const this_matcher = this.id.substr(6);
      if (r_matcher == this_matcher) {
        radio.setAttribute("checked", "true");
        setTheme(r_matcher);
      } else {
        radio.removeAttribute("checked");
      }
    });
  }

  function setTheme(temp) {
    if (temp == 1) {
      root.style.setProperty("--background", "hsl(225, 21%, 49%)");
      root.style.setProperty("--mid_div_bg", "hsl(224, 36%, 15%)");
      root.style.setProperty("--bottom_toggle_bg", "hsl(223, 31%, 20%)");
      root.style.setProperty("--del_res_bg", "hsl(225, 21%, 49%)");
      root.style.setProperty("--del_res_sh", "hsl(224, 28%, 35%)");
      root.style.setProperty("--equal_bg", "hsl(6, 63%, 50%)");
      root.style.setProperty("--equal_sh", "hsl(6, 70%, 34%)");
      root.style.setProperty("--key_bg", "hsl(30, 25%, 89%)");
      root.style.setProperty("--key_sh", "hsl(28, 16%, 65%)");
      root.style.setProperty("--key_clr", "hsl(221, 14%, 31%)");
      root.style.setProperty("--top_mid_fclr", "white");
      root.style.setProperty("--eq_clr", "white");
    } else if (temp == 2) {
      root.style.setProperty("--background", "hsl(0, 0%, 90%)");
      root.style.setProperty("--mid_div_bg", "hsl(0, 0%, 93%)");
      root.style.setProperty("--bottom_toggle_bg", "hsl(0, 5%, 81%)");
      root.style.setProperty("--del_res_bg", "hsl(185, 42%, 37%)");
      root.style.setProperty("--del_res_sh", "hsl(185, 58%, 25%)");
      root.style.setProperty("--equal_bg", "hsl(25, 98%, 40%)");
      root.style.setProperty("--equal_sh", "hsl(25, 99%, 27%)");
      root.style.setProperty("--key_bg", "hsl(45, 7%, 89%)");
      root.style.setProperty("--key_sh", "hsl(35, 11%, 61%)");
      root.style.setProperty("--key_clr", "hsl(60, 10%, 19%)");
      root.style.setProperty("--top_mid_fclr", "hsl(60, 10%, 19%)");
      root.style.setProperty("--eq_clr", "white");
    } else {
      root.style.setProperty("--background", "hsl(268, 75%, 9%)");
      root.style.setProperty("--mid_div_bg", "hsl(268, 71%, 12%)");
      root.style.setProperty("--bottom_toggle_bg", "hsl(268, 71%, 12%)");
      root.style.setProperty("--del_res_bg", "hsl(281, 89%, 26%)");
      root.style.setProperty("--del_res_sh", "hsl(290, 70%, 36%)");
      root.style.setProperty("--equal_bg", "hsl(176, 100%, 44%)");
      root.style.setProperty("--equal_sh", "hsl(177, 92%, 70%)");
      root.style.setProperty("--key_bg", "hsl(268, 47%, 21%)");
      root.style.setProperty("--key_sh", "hsl(285, 91%, 52%)");
      root.style.setProperty("--key_clr", "hsl(52, 100%, 62%)");
      root.style.setProperty("--top_mid_fclr", "hsl(52, 100%, 62%)");
      root.style.setProperty("--eq_clr", "black");
    }
  }

  let display = "0";
  let flag = false;
  let operator = "";
  let flag2_n1 = false;
  let flag2_n2 = false;
  let n1 = "";
  let n2 = "";

  function calculate(e) {
    const content = this.textContent;
    if (isNumber(content)) {
      if (display === "0") {
        display = content;
      } else if (operator !== "") {
        if (n2 === "0" && content === "0") {
          return;
        } else {
          display += content;
        }
      } else {
        display += content;
      }
    } else if (content === "reset") {
      display = "0";
      n1 = "";
      n2 = "";
      flag = false;
      operator = "";
      flag2_n1 = false;
      flag2_n2 = false;
    } else if (content === "del") {
      if (isOperator(display.substr(display.length - 1))) {
        flag = false;
        operator = "";
        display = display.substr(0, display.length - 1);
      } else if (display.substr(display.length - 1) === ".") {
        if (operator !== "") {
          flag2_n2 = false;
        } else {
          flag2_n1 = false;
        }
        display = display.substr(0, display.length - 1);
      } else if (display.length === 1) {
        display = "0";
      } else {
        display = display.substr(0, display.length - 1);
      }
    } else if (isOperator(content)) {
      if (flag === false) {
        flag = true;
        display += content;
        operator = content;
      }
    } else if (content === ".") {
      if (flag2_n1 === false) {
        flag2_n1 = true;
        display += content;
      } else if (flag2_n2 === false && n2.length >= 1) {
        flag2_n2 = true;
        display += content;
      }
    } else if (content === "=") {
      let result;
      temp1 = parseFloat(display.substr(0, display.indexOf(operator)));
      temp2 = parseFloat(display.substr(display.indexOf(operator) + 1));
      if (operator === "/") {
        result = temp1 / temp2;
      } else if (operator === "x") {
        result = temp1 * temp2;
      } else if (operator === "+") {
        result = temp1 + temp2;
      } else if (operator === "-") {
        result = temp1 - temp2;
      }
      let out = "" + Math.round(result * 100) / 100;
      output.textContent = `${out}`;
      display = out;
      n1 = "" + display;
      n2 = "";
      flag = false;
      operator = "";
      if (n1.indexOf(".") == -1) {
        flag2_n1 = false;
      }
      flag2_n2 = false;
      // console.log(out);
      return;
    }

    if (flag === true) {
      n2 = display.substr(display.indexOf(operator) + 1);
    } else {
      n1 = display;
    }
    output.textContent = display;
    // console.log(display);
  }

  function isNumber(x) {
    const no = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    return no.indexOf(x) != -1 ? true : false;
  }

  function isOperator(x) {
    const operator = ["/", "x", "+", "-"];
    return operator.indexOf(x) != -1 ? true : false;
  }

  labels.forEach((label) => label.addEventListener("click", toggle));
  buttons.forEach((button) => button.addEventListener("click", calculate));
};
