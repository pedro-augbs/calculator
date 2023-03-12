interface ButtonProps {
  children: number | string;
  rest?: string;
  onClick?: any;
}

export const Button = ({ children, rest, onClick }: ButtonProps) => {
  return (
    <button
      className={`text-black text-3xl rounded-2xl w-20 py-4 shadow-xl ${rest}`}
      onClick={() => onClick(children) || (() => null)}
    >
      {children}
    </button>
  );
};
