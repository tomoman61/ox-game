interface SquareProps {
	game: string[][];
	handleOX: (x: number, y: number) => void;
	x: number;
	y: number;
}

export default function Square(props: SquareProps) {
	return (
		<button
			type="button"
			style={{ width: "60px", height: "60px" }}
			className="bg-gray-300 m-1 flex justify-center items-center text-lg text-black"
			onClick={() => props.handleOX(props.x, props.y)}
		>
			{props.game[props.x][props.y]}
		</button>
	);
}
