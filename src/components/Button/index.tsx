import { Link } from "react-router-dom";

type Props = {
    children: string | JSX.Element | JSX.Element[];
    txtColor: string;
    bgColor: string;
};

function Button({ children, bgColor, txtColor }: Props) {
    return (
        <div className="flex justify-center items-center">
            <Link
                to=""
                className={`text-[16px] font-semibold ${txtColor} px-4 py-3 ${bgColor} rounded-lg hover:bg-opacity-40 hover:text-black transition-all duration-300`}
            >
                <span className="px-3 py-2">{children}</span>
            </Link>
        </div>
    );
}

export default Button;
