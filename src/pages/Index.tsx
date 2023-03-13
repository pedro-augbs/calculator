import { useState } from "react";
import { Button } from "../components/Button";

interface ButtonsProps {
  children: any;
}

const styles = {
  buttonPrim: "bg-lightlight text-darkdark",
  buttonSec: "bg-gray-500 text-darkdark",
  buttonAlt: "bg-blue-500 text-darkdark",
  buttonSpc: "bg-lightlight grow text-darkdark",
};

const OPERATIONS_MAP: any = {
  "/": (a: any, b: any) => a / b,
  "*": (a: any, b: any) => a * b,
  "-": (a: any, b: any) => a - b,
  "+": (a: any, b: any) => a + b,
};

export const Index = () => {
  const [currScrValue, setCurrScrValue] = useState("0");
  const [prevScrValue, setPrevScrValue] = useState("0");
  const [signal, setSignal] = useState("");

  const write = (button: any) => {
    console.log("signal", signal);
    const del = () => {
      if (currScrValue.length > 1) {
        setCurrScrValue(currScrValue.slice(0, -1));
      } else {
        setCurrScrValue("0");
      }
    };
    const reset = () => {
      setCurrScrValue("0");
    };
    const resetAll = () => {
      setPrevScrValue("0");
      setCurrScrValue("0");
      setSignal("");
    };

    const insertSymbol = (symbol: string) => {
      if (signal === "") {
        setSignal(symbol);
        setPrevScrValue(currScrValue);
        setCurrScrValue("0");
      } else {
        const isValidCalc =
          currScrValue != "" && prevScrValue != "" && signal != "";
        console.log(isValidCalc);
        if (!isValidCalc) return;

        console.log(currScrValue, prevScrValue, signal);

        const result = String(
          OPERATIONS_MAP[signal](
            parseFloat(prevScrValue),
            parseFloat(currScrValue)
          )
        );
        console.log(result);
        setPrevScrValue(result);
        setCurrScrValue("");
        setSignal(symbol);
      }
    };

    const SYMBOL_MAP: any = {
      C: () => reset(),
      AC: () => resetAll(),
      DEL: () => del(),
      "=": () => doCalc(),
      "/": () => insertSymbol("/"),
      X: () => insertSymbol("*"),
      "-": () => insertSymbol("-"),
      "+": () => insertSymbol("+"),
    };

    function doCalc() {
      const isValidCalc =
        currScrValue != "" && prevScrValue != "" && signal != "";
      console.log(isValidCalc);
      if (!isValidCalc) return;

      console.log(currScrValue, prevScrValue, signal);

      const result = String(
        OPERATIONS_MAP[signal](
          parseFloat(prevScrValue),
          parseFloat(currScrValue)
        )
      );
      console.log(result);
      setCurrScrValue(result);
      setPrevScrValue("");
      setSignal("");
    }

    const isNumber = !Boolean(SYMBOL_MAP[button]);

    const insertNumber = (number: any) => {
      if (currScrValue === "0") {
        setCurrScrValue(number);
        return;
      }
      setCurrScrValue(currScrValue + number);
    };
    if (isNumber) {
      insertNumber(button);
    } else {
      SYMBOL_MAP[button]();
    }
  };

  return (
    <section
      className="w-screen h-screen flex items-center justify-center bg-dark
        md:bg-blue-500"
    >
      <div
        className="flex flex-col w-96 bg-dark rounded-3xl
      sm:h-screen
      md:w-96 md:h-auto"
      >
        <div
          className="flex flex-col items-end px-5 py-10 rounded-t-3xl
        md:w-96 md:h-auto"
        >
          <div className="h-10">
            <span className="text-4xl text-medium">{prevScrValue}</span>
            <span className="text-4xl text-medium">{signal}</span>
          </div>
          <span className="text-6xl text-lightlight">{currScrValue}</span>
        </div>
        <div
          className="flex flex-col px-5 py-20 gap-2 w-full h-full bg-darkdark rounded-3xl
        md:w-96 md:h-auto"
        >
          <Buttons>
            <Button rest={styles.buttonSec} onClick={write}>
              C
            </Button>
            <Button rest={styles.buttonSec} onClick={write}>
              AC
            </Button>
            <Button rest={styles.buttonSec} onClick={write}>
              DEL
            </Button>
            <Button rest={styles.buttonAlt} onClick={write}>
              /
            </Button>
          </Buttons>
          <Buttons>
            <Button rest={styles.buttonPrim} onClick={write}>
              7
            </Button>
            <Button rest={styles.buttonPrim} onClick={write}>
              8
            </Button>
            <Button rest={styles.buttonPrim} onClick={write}>
              9
            </Button>
            <Button rest={styles.buttonAlt} onClick={write}>
              X
            </Button>
          </Buttons>
          <Buttons>
            <Button rest={styles.buttonPrim} onClick={write}>
              4
            </Button>
            <Button rest={styles.buttonPrim} onClick={write}>
              5
            </Button>
            <Button rest={styles.buttonPrim} onClick={write}>
              6
            </Button>
            <Button rest={styles.buttonAlt} onClick={write}>
              -
            </Button>
          </Buttons>
          <Buttons>
            <Button rest={styles.buttonPrim} onClick={write}>
              1
            </Button>
            <Button rest={styles.buttonPrim} onClick={write}>
              2
            </Button>
            <Button rest={styles.buttonPrim} onClick={write}>
              3
            </Button>
            <Button rest={styles.buttonAlt} onClick={write}>
              +
            </Button>
          </Buttons>
          <Buttons>
            <Button rest={styles.buttonSpc} onClick={write}>
              0
            </Button>
            <Button rest={styles.buttonPrim} onClick={write}>
              .
            </Button>
            <Button rest={styles.buttonAlt} onClick={write}>
              =
            </Button>
          </Buttons>
        </div>
      </div>
    </section>
  );
};

const Buttons = ({ children }: ButtonsProps) => {
  return <div className="flex gap-2 justify-between">{children}</div>;
};
