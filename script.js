import data from "./data/calendar.json" assert { type: "json" };

// Calendar Container Find Form HTML DOM
const calendarContainer = document.querySelector("[data-calender-body]");
const mainContainer = document.querySelector("[data-container]");

// Current Date Find
const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
const date = new Date();
const currentMonthIndex = date.getMonth();
const currentMonth = months[currentMonthIndex];
const currentDay = date.getDate();

// Show All Date in Month
const createCalendarDate = (total_day, holidays, month) => {
  const monthArray = new Array(total_day).fill(null);
  const date = monthArray.map((content, index) => {
    const day = index + 1;
    let holiday = holidays.indexOf(day) !== -1 ? "holiday" : "";
    let today = currentDay === day ? "data-today" : "";
    return `<div ${today}><span class=${holiday}>${day}</span></div>`;
  });
  return date.join("");
};

// Show Calendar via this
const createCalendar = () => {
  const calendar = data.map(({ month, total_day, holiday, start }) => {
    return `<div class="calendar" id=${month}>
                <div class="month-name"><span>${month}</span></div>
                <div class="date" >
                    <div class="day"><span class="holiday">sun</span></div>
                    <div class="day"><span>mon</span></div>
                    <div class="day"><span>tue</span></div>
                    <div class="day"><span>wed</span></div>
                    <div class="day"><span>thu</span></div>
                    <div class="day"><span>fri</span></div>
                    <div class="day"><span class="holiday">sat</span></div>
                    <div class=col-${start}></div> 
                    ${createCalendarDate(total_day, holiday)}
                </div>
              </div>`;
  });
  return calendar.join("");
};

// Show Calendar Body
calendarContainer.innerHTML = `${createCalendar()}`;

// Find Current Month in HTML
const currentMonthElement = document.querySelector(`#${currentMonth}`);
const currentDayElement = currentMonthElement.querySelector("[data-today]");
// set active class
currentDayElement.classList.add("active");

// Document Dynamic Title
document.title = `Calendar 2024/${currentMonth.slice(0, 3)}/${currentDay}`;

// Auto Scroll Or Navigate at Current Month
// Method-1 -> When window is loaded,, then call this method and automaticlly scroll
// const autoScroll = () => {
//   const calendarBodyHeight = currentMonthElement.offsetHeight + 60;
//   const headerBodyHeight = document.querySelector("[data-header]").offsetHeight + 20;
//   const scroll = calendarBodyHeight * currentMonthIndex + headerBodyHeight;
//   console.log(scroll);
//   window.scroll(0, scroll);
// };
// window.addEventListener("load", () => {
//   autoScroll();
// });

// Method-2 -> This Method Navigate Current Month Via Id
const autoScroll = () => {
  location.href = `index.html#${currentMonth}`;
};
autoScroll();

//Layout Changle
const SCREEN_SIZE = ["large", "medium", "small"];
const layoutChangeInput = document.querySelector("[data-layout]");

let perv = "large";
const checkScreen = (value, target) => {
  SCREEN_SIZE.map((size) => {
    if (value === size) {
      target.forEach((target) => {
        target.classList.remove(`${perv}`);
        target.classList.add(`${size}`);
      }); 
      perv = size;
    }
  });
};

const changeLayout = () => {
  const value = layoutChangeInput.value;
  checkScreen(value, [mainContainer, calendarContainer]);
};

layoutChangeInput.addEventListener("change", changeLayout);
