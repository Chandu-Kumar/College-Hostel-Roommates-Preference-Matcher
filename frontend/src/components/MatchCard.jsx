import { useState } from "react";

import { sendRoomRequest } from "../services/roomRequestService";

function MatchCard({ match }) {

    const [sending, setSending] = useState(false);

    const handleSendRequest = async () => {

        try {

            setSending(true);

            await sendRoomRequest(match.user_id);

            alert("Room Request Sent Successfully ✅");

        } catch (error) {

            console.error(error);

            if (error.response?.data?.detail) {

                alert(error.response.data.detail);

            } else {

                alert("Failed to Send Request ❌");

            }

        } finally {

            setSending(false);

        }

    };

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

            <div className="flex justify-between items-center">

                <div>

                    <h2 className="text-2xl font-bold">
                        {match.name}
                    </h2>

                    <p className="text-gray-500">
                        User ID: {match.user_id}
                    </p>

                </div>

                <div className="text-right">

                    <p className="text-sm text-gray-500">
                        Match Score
                    </p>

                    <h2 className="text-3xl font-bold text-blue-600">
                        {match.match_score}%
                    </h2>

                </div>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 mt-5">

                <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{
                        width: `${match.match_score}%`
                    }}
                />

            </div>

            <div className="mt-6 flex justify-end">

                <button
                    onClick={handleSendRequest}
                    disabled={sending}
                    className="
                        bg-green-600
                        hover:bg-green-700
                        disabled:bg-gray-400
                        text-white
                        px-6
                        py-2
                        rounded-lg
                        transition
                    "
                >

                    {sending
                        ? "Sending..."
                        : "Send Room Request"}

                </button>

            </div>

        </div>

    );

}

export default MatchCard;