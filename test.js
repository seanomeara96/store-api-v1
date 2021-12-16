function main(backgroundColor = "#ECDBEC", fontColor = "#000") {
  const getBanner = () => document.querySelector(".countdown");
  if (getBanner()) {
    const container = (backgroundColor, fontColor, innerText) =>
      `<div style="background-color: ${backgroundColor}; color:${fontColor} !important; padding:3px; border-radius: 4px;">${innerText}</div>`;
    setInterval(() => {
      const today = new Date();
      const endTime = new Date("December 23, 2021 14:00:00");
      const currentTime = today.getTime();
      const endTimeAt2 = endTime.getTime();
      if (currentTime < endTimeAt2) {
        /**
         * divide milliseconds into seconds
         */
        const secondsUntil2 = Math.floor((endTimeAt2 - currentTime) / 1000);
        const daysUntil = Math.floor(secondsUntil2 / 60 / 60 / 24);
        /**
         * full hours = seconds to minutes to hours
         */
        const hoursUntil2 = Math.floor(
          (secondsUntil2 - daysUntil * 24 * 60 * 60) / 60 / 60
        );
        /**
         * minutesuntil - subtract full hours (converted into seconds) from seconds and divide by 60. The remainder should be used to calculate seconds
         */
        const minutesUntil2 = Math.floor(
          (secondsUntil2 - (hoursUntil2 * 60 * 60 + daysUntil * 24 * 60 * 60)) /
            60
        );
        /**
         * seconds remaining in current minute = seconds until finish time - seconds remaining after hours and minutes subtracted (hours remaining in seconds - minutes remaining in seconds)
         */
        const secondsRemaining = Math.floor(
          secondsUntil2 -
            (hoursUntil2 * 60 * 60 + daysUntil * 24 * 60 * 60) -
            minutesUntil2 * 60
        );

        getBanner().innerHTML = container(
          backgroundColor,
          fontColor,
          `<strong>${daysUntil}<span style="font-size:.8rem;">days</span> ${hoursUntil2}<span style="font-size:.8rem;">hrs</span> ${minutesUntil2}<span style="font-size:.8rem;">mins</span> ${secondsRemaining}<span style="font-size:.8rem;">secs</span></strong> left for Pre-Xmas Delivery`
        );
      }
    }, 1000);
  }
}

main();
