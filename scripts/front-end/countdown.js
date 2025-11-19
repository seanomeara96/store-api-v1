window.addEventListener("DOMContentLoaded", async () => {
  const publicHolidays = [
    "1 January 2025",
    "17 March 2025",
    "21 April 2025",
    "5 May 2025",
    "2 June 2025",
    "4 August 2025",
    "27 October 2025",
    "25 December 2025",
    "26 December 2025",
    "1 January 2026",
    "17 March 2026",
    "6 April 2026",
    "4 May 2026",
    "1 June 2026",
    "3 August 2026",
    "26 October 2026",
    "25 December 2026",
    "26 December 2026",
  ];

  // this should work
  function getContainer() {
    return new Promise((resolve, reject) => {
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
          // Potential bug: This only allows for 5 attempts due to zero-based index.
          clearInterval(itr);
          reject("no countdown container");
        }
        count++;
      }, 2000);
    });
  }

  try {
    const container = await getContainer();

    const today = new Date();

    const todayIsNotWeekend = ![0, 5, 6].includes(today.getDay()); // Potential bug: Sunday (0) is a weekend, but Friday (5) typically is not.

    const todayIsNotPublicHoliday = !publicHolidays.includes(
      new Intl.DateTimeFormat("en-IE", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(today),
    );

    const todayAtEnd = new Date(
      `${today.toString().replace(/[0-9]+:[0-9]+:[0-9]+/, "14:00:00")}`,
    ); // Potential bug: Assumes today.toString() produces a consistent, parseable format.

    const timeAtEnd = todayAtEnd.getTime();

    if (todayIsNotWeekend && todayIsNotPublicHoliday && container) {
      setInterval(() => {
        const currentTime = new Date().getTime();
        if (timeAtEnd > currentTime) {
          const secondsUntilEnd = Math.floor((timeAtEnd - currentTime) / 1000);

          const hoursUntilEnd = Math.floor(secondsUntilEnd / 60 / 60);

          const minutesUntilEnd = Math.floor(
            (secondsUntilEnd - hoursUntilEnd * 60 * 60) / 60,
          );

          const secondsRemaining = Math.floor(
            secondsUntilEnd - hoursUntilEnd * 60 * 60 - minutesUntilEnd * 60,
          );

          container.innerHTML = `&#128666; ${hoursUntilEnd} hrs ${minutesUntilEnd} mins ${secondsRemaining} secs left for Next Day Delivery`;
        }
      }, 1000);
    } else {
      container.innerHTML = "&#128666; Order before 2pm for Next Day Delivery"; // Potential issue: Doesn't account for cases where 2pm has passed.
    }
  } catch (err) {
    console.error(err);
  }
});
