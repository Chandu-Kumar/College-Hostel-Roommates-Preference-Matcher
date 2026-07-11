import { useState } from "react";

import { sendRoomRequest } from "../services/roomRequestService";

import { Link } from "react-router-dom";

import { toast } from "sonner";

function MatchCard({ match }) {

    const [sending, setSending] = useState(false);

    const handleSendRequest = async () => {

        try {

            setSending(true);

            await sendRoomRequest(match.user_id);

            console.log("toast line reached");

            toast.success("Room Request Sent Successfully");

        } catch (error) {

            console.error(error);

            if (error.response?.data?.detail) {

                

                toast.error(error.response.data.detail);

            } else {
                console.log("toast line reached");


                toast.error("Failed to Send Request ❌");

            }

        } finally {

            setSending(false);

        }

    };

    return (

        <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:scale-[1.01] transform transition-all duration-700 ease-out p-8 border border-slate-200">

            <div className="flex justify-between items-start">

                <div className="flex items-center gap-5">

                    <div className="w-16 h-16 rbg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center text-2xl font-bold">

                        {match.name.split(" ").map(word => word[0]).join("").toUpperCase()}

                    </div>

                    <div>

                        <h2 className="text-2xl font-bold">

                            {match.name}

                        </h2>

                        <p className="text-gray-500">

                            User ID : {match.user_id}

                        </p>

                    </div>

                </div>

                <div className="text-right">

                    <p className="text-sm text-gray-500">

                        Compatibility

                    </p>

                    <h2 className={`text-4xl font-bold ${match.match_score >= 85? "text-green-600": match.match_score >= 65? "text-blue-600": "text-amber-600"}`}>

                        {match.match_score}%

                    </h2>

                </div>

            </div>

            {/* Progress */}

            <div className="mt-8">

                <div className="w-full bg-gray-200 rounded-full h-4">

                    <div

                        className="bg-gradient-to-r from-indigo-500 to-violet-600 h-4 rounded-full transition-all"

                        style={{
                            width: `${match.match_score}%`
                        }}

                    />

                </div>

            </div>

            {/* Badge */}

            <div className="mt-5">

                <span
                    className={`

                        px-4

                        py-2

                        rounded-full

                        text-sm

                        font-semibold

                        ${
                            match.match_score >= 85
                                ? "bg-green-100 text-green-700"
                                : match.match_score >= 65
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                        }

                    `}
                >

                    {

                        match.match_score >= 85
                            ? "Excellent Match ⭐"
                            : match.match_score >= 65
                            ? "Good Match 👍"
                            : "Average Match"

                    }

                </span>

            </div>

            {/* Button */}

            <div className="mt-8 flex flex-wrap gap-4 justify-end">

                <Link
                    to={`/users/${match.user_id}`}
                    className="
                        border
                       border-indigo-600
                       text-indigo-600
                       hover:bg-indigo-50
                        px-6
                        py-3
                        rounded-xl
                        font-semibold
                        transition
                    "
                >
                    👤 View Profile
                </Link>

                <button
                    onClick={handleSendRequest}
                    disabled={sending}
                    className="
                       bg-indigo-600
                       hover:bg-indigo-700
                        disabled:bg-gray-400
                        text-white
                        px-8
                        py-3
                        rounded-xl
                        font-semibold
                        transition
                        shadow-lg
                    "
                >

                    {sending
                        ? "Sending..."
                        : "🤝 Send Request"}

                </button>

            </div>

        </div>

    );

}

export default MatchCard;