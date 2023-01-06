window.addEventListener("DOMContentLoaded", async () => {
  const publicHolidays = [
    "21 December 2022",
    "22 December 2022",
    "23 December 2022",
    "24 December 2022",
    "25 December 2022",
    "26 December 2022",
    "27 December 2022",
    "28 December 2022",
    "29 December 2022",
    "30 December 2022",
    "31 December 2022",
    "1 January 2022",
    "2 January 2022",
    "3 January 2022",
    "6 February 2023",
    "17 March 2023",
    "10 April 2023",
    "1 May 2023",
    "5 June 2023",
    "7 August 2023",
    "30 October 2023",
    "25 December 2023",
    "26 December 2023",
  ];

  // this should work
  function getContainer() {
    return new Promise((resolve) => {
      let count = 0;
      const qry = () => document.querySelector(".countdown");
      let cntnr = qry();
      if (cntnr) return resolve(cntnr);
      const itr = setInterval(() => {
        cntnr = qry();
        if (cntnr) {
          clearInterval(itr);
          return resolve(cntnr);
        }
        if (count === 4) {
          clearInterval(itr);
          resolve(undefined);
        }
        count++;
      }, 2000);
    });
  }

  const container = await getContainer();

  const today = new Date();

  const todayIsNotWeekend = ![0, 5, 6].includes(today.getDay());

  const todayIsNotPublicHoliday = !publicHolidays.includes(
    new Intl.DateTimeFormat("en-IE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(today)
  );

  const todayAtEnd = new Date(
    `${today.toString().replace(/[0-9]+:[0-9]+:[0-9]+/, "14:00:00")}`
  );

  const timeAtEnd = todayAtEnd.getTime();

  if (todayIsNotWeekend && todayIsNotPublicHoliday && container) {
    setInterval(() => {
      const currentTime = new Date().getTime();
      if (timeAtEnd > currentTime) {
        const secondsUntilEnd = Math.floor((timeAtEnd - currentTime) / 1000);

        const hoursUntilEnd = Math.floor(secondsUntilEnd / 60 / 60);

        const minutesUntilEnd = Math.floor(
          (secondsUntilEnd - hoursUntilEnd * 60 * 60) / 60
        );

        const secondsRemaining = Math.floor(
          secondsUntilEnd - hoursUntilEnd * 60 * 60 - minutesUntilEnd * 60
        );

        container.innerHTML = `&#128666; ${hoursUntilEnd} hrs ${minutesUntilEnd} mins ${secondsRemaining} secs left for Next Day Delivery`;
      }
    }, 1000);
  } else {
    container.innerHTML = "&#128666; Order before 2pm for Next Day Delivery";
  }
});
