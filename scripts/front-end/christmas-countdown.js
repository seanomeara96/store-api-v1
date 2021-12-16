function main(backgroundColor = "#ECDBEC", fontColor = "#000") {
    const getBanner = () => document.querySelector(".countdown");
    const container = (backgroundColor, fontColor, innerText) =>
        `<div style="background-color: ${backgroundColor}; color:${fontColor} !important; padding:3px; border-radius: 4px;">${innerText}</div>`;
    if (getBanner()) {
      setInterval(() => {
        const today = new Date();
        const endTime = new Date("December 23, 2021 14:00:00");
        const currentTime = today.getTime();
        const endTimeAt2 = endTime.getTime();
        if (currentTime < endTimeAt2) {
          const secondsUntil2 = Math.floor((endTimeAt2 - currentTime) / 1000);
          const daysUntil = Math.floor(secondsUntil2 / 60 / 60 / 24);
          const hoursUntil2 = Math.floor(
            (secondsUntil2 - daysUntil * 24 * 60 * 60) / 60 / 60
          );
          const minutesUntil2 = Math.floor(
            (secondsUntil2 - (hoursUntil2 * 60 * 60 + daysUntil * 24 * 60 * 60)) /
              60
          );
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
  