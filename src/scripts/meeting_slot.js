function findMeetingSlots(schedules) {
  let slots = schedules.flat().sort((a, b) => a[0] - b[0]);
  console.log(slots);
  let previousEnd = 0;
  let results = [];
  for (let i = 0; i < slots.length; i++) {
    let start = slots[i][0];
    let end = slots[i][1];
    if (previousEnd < start) {
      results.push([previousEnd, start]);
    }
    //if (time < end) {
    previousEnd = Math.max(previousEnd, end);
    //}
  }
  if (previousEnd != 24) {
    results.push([previousEnd, 24]);
  }
  // your code here
  return results;
}

console.log(
  findMeetingSlots([
    [
      [13, 15],
      [11, 12],
      [10, 13],
    ], //schedule for member 1
    [[8, 9]], // schedule for member 2
    [[13, 18]], // schedule for member 3
  ])
);
//[[0,8],[9,10],[18,24]]
