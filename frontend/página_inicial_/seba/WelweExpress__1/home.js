let x = Number(document.getElementById("onda").textContent)

document.getElementById("submit").addEventListener("click", () => {
  document.getElementById("onda").innerHTML = x++
})