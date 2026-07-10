import MainLayout from "../layouts/MainLayout";

import { useEffect, useState } from "react";

import {
    getSentRequests,
    getReceivedRequests,
    acceptRequest,
    rejectRequest
} from "../services/roomRequestService";


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

            alert("Failed to Load Requests");

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

            alert("Request Accepted ✅");

            loadRequests();

        } catch (error) {

            console.error(error);

        }

    };

    const handleReject = async (id) => {

        try {

            await rejectRequest(id);

            alert("Request Rejected ❌");

            loadRequests();

        } catch (error) {

            console.error(error);

        }

    };

    return (
    <MainLayout>

        <div className="max-w-6xl mx-auto">

            <h1 className="text-3xl font-bold mb-8">
                📥 Room Requests
            </h1>

            {loading ? (

                <div className="text-center text-lg">
                    Loading...
                </div>

            ) : (

                <>

                    {/* Received */}

                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

                        <h2 className="text-2xl font-semibold mb-5">

                            📥 Received Requests

                        </h2>

                        {

                            receivedRequests.length === 0 ? (

                                <p className="text-gray-500">

                                    No Received Requests

                                </p>

                            ) : (

                                receivedRequests.map((request) => (

                                    <div
                                        key={request.id}
                                        className="border rounded-xl p-4 mb-4 flex justify-between items-center"
                                    >

                                        <div>

                                            <p>

                                                <strong>Sender ID:</strong>{" "}

                                                {request.sender_id}

                                            </p>

                                            <p>

                                                <strong>Status:</strong>{" "}

                                                {request.status}

                                            </p>

                                        </div>

                                        {

                                            request.status === "pending" && (

                                                <div className="flex gap-3">

                                                    <button
                                                        onClick={() => handleAccept(request.id)}
                                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                                                    >
                                                        Accept
                                                    </button>

                                                    <button
                                                        onClick={() => handleReject(request.id)}
                                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                                    >
                                                        Reject
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

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <h2 className="text-2xl font-semibold mb-5">

                            📤 Sent Requests

                        </h2>

                        {

                            sentRequests.length === 0 ? (

                                <p className="text-gray-500">

                                    No Sent Requests

                                </p>

                            ) : (

                                sentRequests.map((request) => (

                                    <div
                                        key={request.id}
                                        className="border rounded-xl p-4 mb-4 flex justify-between items-center"
                                    >

                                        <div>

                                            <p>

                                                <strong>Receiver ID:</strong>{" "}

                                                {request.receiver_id}

                                            </p>

                                            <p>

                                                <strong>Status:</strong>{" "}

                                                {request.status}

                                            </p>

                                        </div>

                                    </div>

                                ))

                            )

                        }

                    </div>

                </>

            )}

        </div>

    </MainLayout>
);

}

export default RoomRequests;