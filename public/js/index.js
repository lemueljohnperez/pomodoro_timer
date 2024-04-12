let buttons = document.querySelectorAll(".btn");
let focusButton = document.getElementById("focus");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let startBtn = document.getElementById("btn-start");
let pause = document.getElementById("btn-pause")
let reset = document.getElementById("btn-reset");
let time = document.getElementById("time");

let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 24;

time.textContent = `${minCount + 1}:00`;

// Function to update title with live countdown
const updateTitleWithCountdown = () =>
{
    document.title = `${appendZero(minCount)}:${appendZero(count)} - Steady Clockwork`;
};

// Function to start updating title with live countdown
const startUpdatingTitle = () =>
{
	updateTitleWithCountdown();
    setInterval(updateTitleWithCountdown, 1000);
};

// Fetch live countdown on page load
window.addEventListener("load", () => {
	// Calculate initial countdown time
    updateTitleWithCountdown();

	// Start updating title with live countdown
    startUpdatingTitle();
});

const appendZero = (value) =>
{
	value = value < 10 ? `0${value}` : value;
	return value;
}

reset.addEventListener(
	"click",
	(resetTime = () =>
		{
			pauseTimer();

			switch(active)
			{
			case "long":
				minCount = 14;
				break;

			case "short":
				minCount = 4;
				break;

			default:
				minCount = 24;
				break;
			}
			count = 59;
			time.textContent = `${minCount + 1}:00`;
		}
	)
);

const removeFocus = () => {
	buttons.forEach((btn) =>
	{
		btn.classList.remove("btn-focus");
	});
};

focusButton.addEventListener("click", () => {
	removeFocus();
	focusButton.classList.add("btn-focus");
	pauseTimer();
	minCount = 24;
	count = 59;
	time.textContent = `${minCount + 1}:00`;

	// Change body background color for short break
    document.body.style.backgroundColor = "#439294";

	// Change navbar background color to match body
    document.querySelector(".navbar").style.backgroundColor = "#439294";
});

shortBreakButton.addEventListener("click", () => {
	active = "short";
	removeFocus();
	shortBreakButton.classList.add("btn-focus");
	pauseTimer();
	minCount = 4;
	count = 59;
	time.textContent = `${appendZero(minCount + 1)}:00`;

	// Change body background color for short break
    document.body.style.backgroundColor = "#77B0AA";

	// Change navbar background color to match body
    document.querySelector(".navbar").style.backgroundColor = "#77B0AA";
});

longBreakButton.addEventListener("click", () => {
	active = "long";
	removeFocus();
	longBreakButton.classList.add("btn-focus");
	pauseTimer();
	minCount = 14;
	count =  59;
	time.textContent = `${minCount + 1}:00`

	// Change body background color for long break
    document.body.style.backgroundColor = "#427D9D";

	// Change navbar background color to match body
    document.querySelector(".navbar").style.backgroundColor = "#427D9D";
});

pause.addEventListener("click", (pauseTimer = () => {
	paused = true;
	clearInterval(set);
	startBtn.classList.remove("hide");
	pause.classList.remove("show");
	reset.classList.remove("show");
}));

startBtn.addEventListener("click", () => {
	reset.classList.add("show");
	pause.classList.add("show");
	startBtn.classList.add("hide");
	startBtn.classList.remove("show");

	if (paused)
	{
		paused = false;

		// Update title with live countdown
        updateTitleWithCountdown();

		time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;

		set = setInterval(() => {
			count--;
			time.textContent = `${appendZero(minCount)}:${appendZero(count)}`

			if (count == 0)
			{
				if (minCount != 0)
				{
					minCount--;
					count = 60;
				}

				else
				{
					clearInterval(set);
					playBreakSound(); // Plays break.mp3 when timer reaches 0
				}
			}
		}, 1000);
	}
});

// Sound Functions

function playStartSound()
{
	var audio = new Audio("./src/sounds/click.mp3");
	audio.play();
}

function playBreakSound()
{
    var audio = new Audio("./src/sounds/break.mp3");
    audio.play();
}