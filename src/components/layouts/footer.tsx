import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="w-full border-t-2 border-b-2 border-zinc-200">
            <div className="max-2xl:container mx-auto px-5 py-7">
                <div className="text-center text-[#111111] font-medium">
                    Copyright &copy; 2024{" "}
                    <Link to="/" className="hover:text-red-500">
                        Decyfin community
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
