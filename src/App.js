/* eslint-disable */
import React, { useEffect, useState } from "react";

function App() {
	// mid point of document
	const [mid, setMid] = useState({
		x: window.innerWidth / 2,
		y: window.innerHeight / 2,
	});

	const maxRange = 255;

	const [bgColor, setBgColor] = useState("rgb(255, 255, 255)");

	// Colors grading according to mose position
	let rI = false;
	let gI = false;
	let bI = false;

	let r = 255; // red
	let g = 255; // green
	let b = 255; // blue
	let color = `rgb(${r}, ${g}, ${b})`; // by default it's white color

	// distance between two points
	let dist = 0; // initial
	let x_diff = 0; // initial
	let y_diff = 0; // initial

	// change bg color on mouse move
	const changeBgColor = (e) => {
		const { pageX, pageY } = e;

		if (pageX > mid.x && pageY > mid.y) {
			// Bottom Right
			x_diff = pageX - mid.x;
			y_diff = pageY - mid.y;
		} else if (pageX < mid.x && pageY < mid.y) {
			// Top Left
			x_diff = mid.x - pageX;
			y_diff = mid.y - pageY;

			rI = true;
			gI = false;
			bI = false;
		} else if (pageX < mid.x && pageY > mid.y) {
			// Bottom Left
			x_diff = mid.x - pageX;
			y_diff = mid.y - pageY;

			rI = false;
			gI = false;
			bI = true;
		} else {
			// Top Right
			x_diff = pageX - mid.x;
			y_diff = mid.y - pageY;

			rI = false;
			gI = true;
			bI = false;
		}

		dist = Math.sqrt(Math.pow(x_diff, 2) + Math.pow(y_diff, 2));

		let highestRange = mid.x;
		if (mid.y > mid.x) {
			highestRange = mid.y;
		}

		let __per = (dist / highestRange) * 100;
		if (dist > highestRange) {
			__per = 100;
		}

		// Color in 255 range
		const colorRange = (__per / 100) * maxRange;

		if (rI) r = colorRange;
		else if (gI) g = colorRange;
		else b = colorRange;

		color = `rgb(${r}, ${g}, ${b})`;

		console.log(color);

		setBgColor(color);
	};

	useEffect(() => {
		// window.addEventListener("mousemove", changeBgColor);

		window.addEventListener("resize", (e) => {
			setMid({
				x: window.innerWidth / 2,
				y: window.innerHeight / 2,
			});
		});

		return () => {
			// window.removeEventListener("mousemove", changeBgColor);
		};
	}, []);

	return (
		<>
			<div className="relative w-screen h-screen overflow-hidden">
				<div
					className="relative w-full h-full overflow-auto"
					style={{
						background: bgColor,
						transition: "all 0.2s linear",
					}}
				>
					<div className="relative w-full h-full bg-white/90 backdrop-blur-3xl flex">
						{/* Portfolio image */}
						<div className="relative w-4/12 h-full flex items-center justify-center">
							{/* Image grid */}
							<div className="relative w-auto h-auto grid gap-8 justify-items-center">
								{/* Image */}
								<div className="relative w-64 h-64 rounded-full border-[20px] border-transparent ring-[6px] ring-indigo-600">
									<div className="relative w-full h-full rounded-full overflow-hidden border border-indigo-200 flex items-center justify-center">
										<img
											src="/images/cat.jpg"
											alt=""
											className="relative w-auto h-auto flex items-center justify-center"
										/>
									</div>
								</div>

								{/* Horizontal line */}
								<div className="relative w-6/12 h-[1px] bg-gray-300" />

								{/* Grid */}
								<div className="relative w-auto h-auto grid gap-3 justify-items-center">
									{/* Diamond shaped */}
									<div className="relative w-4 h-4 rotate-45 bg-indigo-600" />

									{/* Vertical line */}
									<div className="relative w-[1px] h-20 bg-gray-300" />

									{/* Diamond shaped */}
									<div className="relative w-4 h-4 rotate-45 bg-indigo-600" />
								</div>
							</div>
						</div>

						{/* Content */}
						<div className="relative w-4/12 h-full flex items-center justify-center"></div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
