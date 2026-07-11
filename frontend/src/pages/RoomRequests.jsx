import MainLayout from "../layouts/MainLayout";

import { useEffect, useState } from "react";

import {
    getSentRequests,
    getReceivedRequests,
    acceptRequest,
    rejectRequest
} from "../services/roomRequestService";

import { toast } from "sonner";


function RoomRequests() {

    const [sentRequests, setSentRequests] = useState([]);

    const [receivedRequests, setReceivedRequests] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadRequests = async () => {

        try {

            const sent = await getSentRequests();

            const received = await getReceivedRequests();

            setSentRequests(sent);

            setReceivedRequests(received);

        } catch (error) {

            console.error(error);

            console.log("toast line reached");

            toast.error("Failed to Load Requests");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadRequests();

    }, []);

    const handleAccept = async (id) => {

        try {

            await acceptRequest(id);

            console.log("toast line reached");

            toast.success("Request Accepted ✅");

            loadRequests();

        } catch (error) {

            console.error(error);

        }

    };

    const handleReject = async (id) => {

        try {

            await rejectRequest(id);

            console.log("toast line reached");

            toast.error("Request Rejected ❌");

            loadRequests();

        } catch (error) {

            console.error(error);

        }

    };

    return (
    <MainLayout>

        <div className="max-w-6xl mx-auto">

            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-3xl p-8 shadow-xl mb-8">

                <h1 className="text-4xl font-bold">

                    📨 Room Requests

                </h1>

                <p className="mt-3 text-orange-100">

                    Manage incoming roommate requests and track the requests you've sent.

                </p>

            </div>

            {loading ? (

                <div className="text-center py-16 text-lg text-gray-500">

                    Loading your requests...

                </div>

            ) : (

                <>
                <div className="grid lg:grid-cols-2 gap-8">

                    {/* Received */}

                    <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">

                        <div className="flex justify-between items-center mb-5">

                            <h2 className="text-2xl font-bold">

                                📥 Incoming Requests

                            </h2>

                            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">

                                {receivedRequests.length}

                            </span>

                        </div>

                        {

                            receivedRequests.length === 0 ? (

                                <p className="text-gray-500">

                                    <div className="text-center py-10">

                                        <div className="text-5xl">

                                            📭

                                        </div>

                                        <p className="text-gray-500 mt-3">

                                            No incoming requests yet.

                                        </p>

                                    </div>

                                </p>

                            ) : (

                                receivedRequests.map((request) => (

                                    <div
                                        key={request.id}
                                        className="border border-slate-200 rounded-2xl p-5 mb-4 flex justify-between items-center hover:shadow-lg transition"
                                    >

                                        <div>

                                            <p>

                                                <strong>👤 Sender ID :</strong>

                                                {request.sender_id}

                                            </p>

                                            <div>

                                                <p className="mt-2">

                                                    <span className="font-semibold">

                                                        Status :

                                                    </span>

                                                    <span

                                                        className={`

                                                            ml-2

                                                            px-3

                                                            py-1

                                                            rounded-full

                                                            text-sm

                                                            font-semibold

                                                            ${

                                                                request.status === "accepted"

                                                                    ? "bg-green-100 text-green-700"

                                                                    : request.status === "rejected"

                                                                    ? "bg-red-100 text-red-700"

                                                                    : "bg-yellow-100 text-yellow-700"

                                                            }

                                                        `}

                                                    >

                                                        {request.status === "accepted"? "🟢 Accepted": request.status === "rejected"? "🔴 Rejected": "🟡 Pending"}

                                                    </span>

                                                </p>

                                                {/* {request.status} */}

                                            </div>

                                        </div>

                                        {

                                            request.status === "pending" && (

                                                <div className="flex gap-4 w-full max-w-xs">

                                                    <button
                                                        onClick={() => handleAccept(request.id)}
                                                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl font-semibold transition"
                                                    >
                                                        ✅ Accept
                                                    </button>

                                                    <button
                                                        onClick={() => handleReject(request.id)}
                                                        className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-xl font-semibold transition"
                                                    >
                                                        ❌ Reject
                                                    </button>

                                                </div>

                                            )

                                        }

                                    </div>

                                ))

                            )

                        }

                    </div>

                    {/* Sent */}

                    <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">

                        <div className="flex justify-between items-center mb-5">

                            <h2 className="text-2xl font-bold">

                                📤 Outgoing Requests

                            </h2>

                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">

                                {sentRequests.length}

                            </span>

                        </div>

                        {

                            sentRequests.length === 0 ? (

                                <p className="text-gray-500">

                                    📤 You haven't sent any requests yet.

                                </p>

                            ) : (

                                sentRequests.map((request) => (

                                    <div
                                        key={request.id}
                                        className="border border-slate-200 rounded-2xl p-5 mb-4 flex justify-between items-center hover:shadow-lg transition"
                                    >

                                        <div>

                                            <p>

                                                <strong>👤 Receiver ID :</strong>

                                                {request.receiver_id}

                                            </p>

                                            <div>

                                                <p className="mt-2">

                                                    <span className="font-semibold">

                                                        Status :

                                                    </span>

                                                    <span

                                                        className={`

                                                            ml-2

                                                            px-3

                                                            py-1

                                                            rounded-full

                                                            text-sm

                                                            font-semibold

                                                            ${

                                                                request.status === "accepted"

                                                                    ? "bg-green-100 text-green-700"

                                                                    : request.status === "rejected"

                                                                    ? "bg-red-100 text-red-700"

                                                                    : "bg-yellow-100 text-yellow-700"

                                                            }

                                                        `}

                                                    >

                                                        {request.status.toUpperCase()}

                                                    </span>

                                                </p>

                                                {/* {request.status} */}

                                            </div>

                                        </div>

                                    </div>

                                ))

                            )

                        }

                    </div>
                </div>

                </>

            )}

        </div>

    </MainLayout>
);

}

export default RoomRequests;