/**
 * 
 * @param {string} timeZoneStr   "America/Los_Angeles", "America/Indiana/Knox", etc...
 * @param {string} date       "2021-03-24", "1998-12-31", etc...
 * @returns A date object set in US Central time
 */
const toUSCentralDate = (timeZoneStr, date) => {
  // expected format: "2021-03-24"
  const [strYear, strMonth, strDay] = date.split("-");

  // month is determined by indices (jan = 0, dec = 11)
  const month = parseInt(strMonth, 10) - 1;
  const day = parseInt(strDay, 10);
  const year = parseInt(strYear, 10);

  // set to 1:00:00 pm US-CT
  const USCTDate = new Date(Date.UTC(year, month, day, 13, 0, 0));
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: "UTC" }));
  const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timeZoneStr }));
  const offset = utcDate.getTime() - tzDate.getTime();

  USCTDate.setTime(USCTDate.getTime() + offset);

  return USCTDate;
};

module.exports = {
  toUSCentralDate
};
