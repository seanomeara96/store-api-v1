setInterval(() => {
  const publicHolidays = [
    "1 January 2021",
    "17 March 2021",
    "5 April 2021",
    "3 May 2021",
    "7 June 2021",
    "2 August 2021",
    "25 October 2021",
    "25 December 2021",
    "26 December 2021",
  ];

  const container = (backgroundColor, fontColor, innerText) =>
    `<div style="background-color: ${backgroundColor}; color:${fontColor} !important; padding:3px; border-radius: 4px;">${innerText}</div>`;

  const today = new Date();
  const todayAt2 = new Date(
    `${today.toString().replace(/[0-9]+:[0-9]+:[0-9]+/, "14:00:00")}`
  );
  const backgroundColor = "#000";
  const fontColor = "#fff";
  const currentTime = new Date().getTime();
  const timeAt2 = todayAt2.getTime();
  let secondsUntil2 = Math.floor((timeAt2 - currentTime) / 1000);
  let hoursUntil2 = Math.floor(secondsUntil2 / 60 / 60);
  let minutesUntil2 = Math.floor((secondsUntil2 - hoursUntil2 * 60 * 60) / 60);
  let secondsRemaining = Math.floor(
    secondsUntil2 - hoursUntil2 * 60 * 60 - minutesUntil2 * 60
  );
  let todayIsNotPublicHoliday = !publicHolidays.includes(
    new Intl.DateTimeFormat("en-IE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(today)
  );
  if (
    timeAt2 > currentTime &&
    ![0, 5, 6].includes(today.getDay()) &&
    todayIsNotPublicHoliday
  ) {
    document.querySelector(".countdown").innerHTML = container(
      backgroundColor,
      fontColor,
      `<span>${hoursUntil2}hrs</span> <span>${minutesUntil2}mins</span> <span>${secondsRemaining} secs</span> left for next day delivery`
    );
  } else if (
    timeAt2 > currentTime &&
    today.getDay() === 5 &&
    todayIsNotPublicHoliday
  ) {
    document.querySelector(".countdown").innerHTML = container(
      backgroundColor,
      fontColor,
      `<span>${hoursUntil2}hrs</span> <span>${minutesUntil2}mins</span> <span>${secondsRemaining} secs</span> left for despatch today`
    );
  } else {
    document.querySelector(".countdown").innerHTML = "";
  }
}, 1000);
