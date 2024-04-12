import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Api } from "../service/api";
import { useAuth } from "../context/Authprovider";
import { toast } from "react-toastify";

export default function SurveyDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [survey, setSurvey] = useState<any>(null);
    const [isSelect, setIsSelect] = useState<boolean>(false);
    const [selected, setSelected] = useState<{
        option1: boolean;
        option2: boolean;
        option3: boolean;
        option4: boolean;
        option5: boolean;
    }>({
        option1: false,
        option2: false,
        option3: false,
        option4: false,
        option5: false,
    });

    useEffect(() => {
        if (id) {
            getSurvey(id);
        }
    }, [id, user.isAuth]);

    const getSurvey = async (id: string) => {
        try {
            const { data } = await Api.get("/survey/" + id);

            setSurvey(data.data);

            if (
                data.data.option1.includes(user.address) ||
                data.data.option2.includes(user.address) ||
                data.data.option3.includes(user.address) ||
                data.data.option4.includes(user.address) ||
                data.data.option5.includes(user.address)
            ) {
                setIsSelect(true);
                if (data.data.option1.includes(user.address)) {
                    setSelected({
                        ...selected,
                        option1: true,
                    });
                }
                if (data.data.option2.includes(user.address)) {
                    setSelected({
                        ...selected,
                        option2: true,
                    });
                }
                if (data.data.option3.includes(user.address)) {
                    setSelected({
                        ...selected,
                        option3: true,
                    });
                }
                if (data.data.option4.includes(user.address)) {
                    setSelected({
                        ...selected,
                        option4: true,
                    });
                }
                if (data.data.option5.includes(user.address)) {
                    setSelected({
                        ...selected,
                        option5: true,
                    });
                }
            } else {
                setIsSelect(false);
            }
        } catch (err) {
            setSurvey(null);
        }
    };

    const handleSubmit = async (status: number) => {
        try {
            if (!user.isAuth) {
                toast.warn("Please login");
                return;
            }

            const { data } = await Api.put(`/survey/choose/${id}`, { status: status });

            if (data && data.status) {
                toast.success("Successfully selected");
                if (id) {
                    getSurvey(id);
                }
            }
        } catch (err) {
            toast.error("Something went wrong!");
        }
    };

    return (
        <section className="container mx-auto px-5 min-h-screen max-w-5xl">
            {survey ? (
                <div className="transition-all duration-300 mx-auto p-5">
                    <div className="py-2">
                        <h2 className="text-4xl font-medium">Survey</h2>
                    </div>
                    <div className="flex items-center justify-start gap-2 py-3">
                        <img src="/image/user.jpg" alt="" className="w-10 h-10 rounded-full" />
                        <div className="flex flex-col items-center gap-1">
                            <p className="text-sm font-medium">Written by admin</p>
                            <p className="text-sm font-medium">{format(survey?.created_at, "MMMM dd yyyy")}</p>
                        </div>
                    </div>
                    <p className="text-zinc-600 text-sm font-semibold">{survey?.content}</p>
                </div>
            ) : null}

            <div className="flex items-center justify-center gap-10 py-10 flex-wrap">
                <div className="flex items-center gap-x-3">
                    <input
                        id="option1"
                        name="survey-choose"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                        onClick={() => handleSubmit(1)}
                        disabled={isSelect}
                        checked={selected.option1}
                    />
                    <label
                        htmlFor="option1"
                        className="block text-sm font-medium leading-6 text-gray-900 cursor-pointer"
                    >
                        Option1
                    </label>
                </div>
                <div className="flex items-center gap-x-3">
                    <input
                        id="option2"
                        name="survey-choose"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                        onClick={() => handleSubmit(2)}
                        disabled={isSelect}
                        checked={selected.option2}
                    />
                    <label
                        htmlFor="option2"
                        className="block text-sm font-medium leading-6 text-gray-900 cursor-pointer"
                    >
                        Option2
                    </label>
                </div>
                <div className="flex items-center gap-x-3">
                    <input
                        id="option3"
                        name="survey-choose"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                        onClick={() => handleSubmit(3)}
                        disabled={isSelect}
                        checked={selected.option3}
                    />
                    <label
                        htmlFor="option3"
                        className="block text-sm font-medium leading-6 text-gray-900 cursor-pointer"
                    >
                        Option3
                    </label>
                </div>
                <div className="flex items-center gap-x-3">
                    <input
                        id="option4"
                        name="survey-choose"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                        onClick={() => handleSubmit(4)}
                        disabled={isSelect}
                        checked={selected.option4}
                    />
                    <label
                        htmlFor="option4"
                        className="block text-sm font-medium leading-6 text-gray-900 cursor-pointer"
                    >
                        Option4
                    </label>
                </div>
                <div className="flex items-center gap-x-3">
                    <input
                        id="option5"
                        name="survey-choose"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                        onClick={() => handleSubmit(5)}
                        disabled={isSelect}
                        checked={selected.option5}
                    />
                    <label
                        htmlFor="option5"
                        className="block text-sm font-medium leading-6 text-gray-900 cursor-pointer"
                    >
                        Option5
                    </label>
                </div>
            </div>
        </section>
    );
}
