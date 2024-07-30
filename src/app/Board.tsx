"use client";

import { useEffect, useState } from "react";
import Square from "./Square";

export default function Board() {
	const initGame = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];
	const [winner, setWinner] = useState<"None" | "Sente" | "Gote">("None");
	const [isSente, setIsSente] = useState(true);
	const handleTeban = () => setIsSente((prev) => !prev);

	const [game, setGame] = useState<string[][]>(initGame);
	const handleReset = () => {
		setIsSente(true);
		setWinner("None");
		setGame(initGame);
	};

	const handleOX = (x: number, y: number) => {
		if (winner !== "None") return;
		if (game[x][y] !== "") return;
		setGame((prev: string[][]) => {
			prev[x][y] = isSente ? "X" : "O";
			return prev;
		});
		handleTeban();
	};

	useEffect(() => {
		const checkWinner = () => {
			// 縦横判定ロジック
			for (let x = 0; game.length > x; x++) {
				const xAxis = game[x][0] + game[x][1] + game[x][2];
				if (xAxis === "XXX") setWinner("Sente");
				if (xAxis === "OOO") setWinner("Gote");
				for (let y = 0; game[x].length > y; y++) {
					const yAxis = game[0][y] + game[1][y] + game[2][y];
					if (yAxis === "XXX") setWinner("Sente");
					if (yAxis === "OOO") setWinner("Gote");
				}
			}
			// 斜め判定ロジック
			const diagonal1 = game[0][0] + game[1][1] + game[2][2];
			const diagonal2 = game[0][2] + game[1][1] + game[2][0];
			if (diagonal1 === "XXX" || diagonal2 === "XXX") setWinner("Sente");
			if (diagonal1 === "OOO" || diagonal2 === "OOO") setWinner("Gote");
		};
		checkWinner();
	}, [
		game[0][0],
		game[0][1],
		game[0][2],
		game[1][0],
		game[1][1],
		game[1][2],
		game[2][0],
		game[2][1],
		game[2][2],
	]);

	return (
		<div className="flex items-center flex-col">
			<div id="statusArea" className="mt-1.5 mb-1.5 font-bold text-lg">
				Next player:{" "}
				<span>{winner === "None" ? (isSente ? "X" : "O") : "None"}</span>
			</div>
			<div id="winnerArea" className="mt-1.5 mb-1.5 font-bold text-lg">
				Winner: <span>{winner}</span>
			</div>
			<button
				type="button"
				className="mt-4 mb-4 w-20 h-10 bg-teal-400 text-white text-lg"
				onClick={handleReset}
			>
				Reset
			</button>
			<div className="bg-gray-200 w-52 flex items-center justify-center flex-col border-4 border-gray-200">
				<div className="flex">
					<Square game={game} handleOX={handleOX} x={0} y={0} />
					<Square game={game} handleOX={handleOX} x={0} y={1} />
					<Square game={game} handleOX={handleOX} x={0} y={2} />
				</div>
				<div className="flex">
					<Square game={game} handleOX={handleOX} x={1} y={0} />
					<Square game={game} handleOX={handleOX} x={1} y={1} />
					<Square game={game} handleOX={handleOX} x={1} y={2} />
				</div>
				<div className="flex">
					<Square game={game} handleOX={handleOX} x={2} y={0} />
					<Square game={game} handleOX={handleOX} x={2} y={1} />
					<Square game={game} handleOX={handleOX} x={2} y={2} />
				</div>
			</div>
		</div>
	);
}
