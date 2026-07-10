import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import MatchCard from "../components/MatchCard";

import { getMatches } from "../services/matchingService";

function Matches() {

    const [matches, setMatches] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadMatches();

    }, []);

    const loadMatches = async () => {

        try {

            const data = await getMatches();

            setMatches(data);

        } catch (error) {

            console.error(error);
             if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
            }

            alert("Failed to Load Matches ❌");

        } finally {

            setLoading(false);

        }

    };

    return (

        <MainLayout>

            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold mb-8">
                    ❤️ My Matches
                </h1>

                {

                    loading ? (

                        <div className="text-center text-lg">
                            Loading Matches...
                        </div>

                    ) : (

                        <div className="grid gap-6">

                            {

                                matches.length === 0 ? (

                                    <div className="bg-white rounded-xl shadow p-6 text-center">

                                        No Matches Found

                                    </div>

                                ) : (

                                    matches.map((match) => (

                                        <MatchCard
                                            key={match.user_id}
                                            match={match}
                                        />

                                    ))

                                )

                            }

                        </div>

                    )

                }

            </div>

        </MainLayout>

    );

}

export default Matches;