setInterval(() => {
  const publicHolidays = [
    "1 January 2022",
    "17 March 2022",
    "18 April 2022",
    "2 May 2022",
    "6 June 2022",
    "1 August 2022",
    "31 October 2022",
    "25 December 2022",
    "26 December 2022",
  ];
  const today = new Date();
  const todayIsNotWeekend = ![0, 5, 6].includes(today.getDay());
  const todayIsNotPublicHoliday = !publicHolidays.includes(
    new Intl.DateTimeFormat("en-IE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(today)
  );
  const todayAt2 = new Date(
      `${today
        .toString()
        .replace(
          /[0-9]+:[0-9]+:[0-9]+/,
          today.getDay() === 1 ? "14:00:00" : "15:00:00"
        )}`
    ),
    currentTime = new Date().getTime(),
    timeAt2 = todayAt2.getTime();
  if (timeAt2 > currentTime && todayIsNotWeekend && todayIsNotPublicHoliday) {
    let secondsUntil2 = Math.floor((timeAt2 - currentTime) / 1000),
      hoursUntil2 = Math.floor(secondsUntil2 / 60 / 60),
      minutesUntil2 = Math.floor((secondsUntil2 - hoursUntil2 * 60 * 60) / 60),
      secondsRemaining = Math.floor(
        secondsUntil2 - hoursUntil2 * 60 * 60 - minutesUntil2 * 60
      );
    document.querySelector(
      ".countdown"
    ).innerHTML = `<span style="background-color:#EE1D56; padding:1px; border-radius:1.5px; display:inline-block; width: 55px;">${hoursUntil2}hrs</span> <span style="background-color:#EE1D56; padding:1px; border-radius:1.5px; display:inline-block; width: 60px;">${minutesUntil2}mins</span> <span style="background-color:#EE1D56; padding:1px; border-radius:1.5px; display:inline-block; width: 65px;">${secondsRemaining} secs</span> left for next day delivery`;
  } else {
    document.querySelector(".countdown").innerHTML =
      "Free shipping over 69 Euro - Code: IRISH";
  }
}, 1000);
