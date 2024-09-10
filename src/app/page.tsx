"use client";

import { useState } from "react";

import type { KeysType, OperatorsType } from "@/utils/types";

import { MATH_OPERATIONS_MAP } from "@/utils/functions/math-operations";

import { keys } from "@/utils/data/keys";

import { Button, type ButtonProps } from "@/components/ui/button";

export default function Home() {
	const [currentScreen, setCurrentScreen] = useState("0");
	const [previousScreen, setPreviousScreen] = useState("");
	const [operator, setOperator] = useState<OperatorsType>("");

	function write(button: KeysType) {
		function del() {
			if (currentScreen.length > 1) {
				setCurrentScreen(currentScreen.slice(0, -1));
			} else {
				setCurrentScreen("");
			}
		}

		function clear() {
			setCurrentScreen("");
		}

		function clearAll() {
			setPreviousScreen("");
			setCurrentScreen("");
			setOperator("");
		}

		function insertOperator(symbol: OperatorsType) {
			if (operator !== "" && currentScreen === "") {
				setOperator(symbol);
				return;
			}
			if (operator === "") {
				setOperator(symbol);
				setPreviousScreen(currentScreen);
				setCurrentScreen("");
			} else {
				const isValidCalc = currentScreen !== "" && previousScreen !== "";
				if (!isValidCalc) return;

				const result = String(
					MATH_OPERATIONS_MAP[operator](
						Number.parseFloat(previousScreen),
						Number.parseFloat(currentScreen),
					),
				);
				setPreviousScreen(result);
				setCurrentScreen("");
				setOperator(symbol);
			}
		}

		const SYMBOL_MAP: Record<KeysType, () => void> = {
			C: () => clear(),
			AC: () => clearAll(),
			DEL: () => del(),
			"=": () => doCalc(),
			"/": () => insertOperator("/"),
			X: () => insertOperator("*"),
			"-": () => insertOperator("-"),
			"+": () => insertOperator("+"),
			"0": () => insertNumber("0"),
			"1": () => insertNumber("1"),
			"2": () => insertNumber("2"),
			"3": () => insertNumber("3"),
			"4": () => insertNumber("4"),
			"5": () => insertNumber("5"),
			"6": () => insertNumber("6"),
			"7": () => insertNumber("7"),
			"8": () => insertNumber("8"),
			"9": () => insertNumber("9"),
			".": () => insertNumber("."),
		};

		function doCalc() {
			const isValidCalc =
				currentScreen !== "" && previousScreen !== "" && operator !== "";
			if (!isValidCalc) return;

			const result = String(
				MATH_OPERATIONS_MAP[operator](
					Number.parseFloat(previousScreen),
					Number.parseFloat(currentScreen),
				),
			);
			setCurrentScreen(result);
			setPreviousScreen("");
			setOperator("");
		}

		const insertNumber = (number: string) => {
			if (currentScreen.includes(".") && number === ".") {
				return;
			}
			if (currentScreen === "0") {
				setCurrentScreen(number);
				return;
			}
			setCurrentScreen(currentScreen + number);
		};

		SYMBOL_MAP[button]();
	}

	return (
		<main className="bg-primary min-h-screen flex flex-col items-center justify-center">
			<div className="flex flex-col">
				<section className="flex flex-col items-end min-w-96 w-full max-w-xs px-5 py-6 bg-background/90 rounded-t-xl">
					<div className="h-10">
						<span className="text-4xl text-medium">{previousScreen}</span>
						<span className="text-4xl text-medium">{operator}</span>
					</div>
					<span className="text-6xl h-14">{currentScreen}</span>
				</section>
				<section className="grid grid-cols-4 gap-1 w-full bg-black p-4 rounded-b-xl">
					{keys.map((item) => {
						return (
							<Button
								key={item.key}
								variant={item.color as ButtonProps["variant"]}
								className={`h-14 text-xl rounded-xl ${item.key === "0" && "col-start-1 col-end-3"}`}
								onClick={() => write(item.key as KeysType)}
							>
								{item.key}
							</Button>
						);
					})}
				</section>
			</div>
		</main>
	);
}
