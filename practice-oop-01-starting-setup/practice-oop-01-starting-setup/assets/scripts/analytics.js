// 분석 데이터를 2초 마다 보낸다

const intervalId = setInterval(() => {
  console.log("Sending analytics data...");
}, 2000);

document.getElementById("stop-analytics-btn").addEventListener("click", () => {
  clearInterval(intervalId);
});
