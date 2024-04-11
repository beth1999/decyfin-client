import React from "react";
import { Link } from "react-router-dom";
import { Api } from "../service/api";
import { format } from "date-fns";

export default function Survey() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [surveys, setSurveys] = React.useState<any>([]);

    React.useEffect(() => {
        getSurveys();
    }, []);

    const getSurveys = async () => {
        try {
            const { data } = await Api.get("/survey/all");

            if (data) setSurveys(data.data);
        } catch (err) {
            setSurveys([]);
        }
    };

    return (
        <div className="flex flex-col flex-1">
            <h2 className="text-4xl font-medium py-10">Survey</h2>
            <div className="max-w-4xl flex flex-col gap-5 w-full">
                {surveys.length > 0 ? (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    surveys.map((survey: any, index: number) => (
                        <div
                            className="p-4 border-[1px] border-zinc-300 rounded-lg bg-white transition-all duration-300 hover:shadow-lg"
                            key={survey.id}
                        >
                            <div className="pb-3.5">
                                <Link to={"/survey/" + survey.id} className="text-2xl font-medium hover:text-red-500">
                                    Survey - {index + 1}
                                </Link>
                            </div>
                            <div className="flex items-center justify-start gap-2 pb-3.5">
                                <img src="/image/user.jpg" alt="" className="w-10 h-10 rounded-full" />
                                <div className="flex flex-col items-center gap-1">
                                    <p className="text-sm font-medium">Written by admin</p>
                                    <p className="text-sm font-medium">{format(survey.created_at, "MMMM dd yyyy")}</p>
                                </div>
                            </div>
                            <p className="text-zinc-600 text-sm font-semibold">{survey.content}</p>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center">No Data1</div>
                )}
            </div>
        </div>
    );
}
