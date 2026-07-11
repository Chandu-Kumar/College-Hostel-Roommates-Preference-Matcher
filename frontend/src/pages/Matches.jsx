import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import MatchCard from "../components/MatchCard";

import { getMatches } from "../services/matchingService";

import { toast } from "sonner";

import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
import { getHobbies } from "../services/hobbyService";



function Matches() {

    const [matches, setMatches] = useState([]);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        checkAccess();
    }, []);

    const checkAccess = async () => {
        try {

            console.log("checking hobbies....");

            await getHobbies();

            console.log("hobbies exist");

            loadMatches();

        } catch(error){

            console.log("hobbies do not exist");

            console.log(error);

            toast.warning("Please select your hobbies first.");

            navigate("/hobbies");

        }
    };

    const loadMatches = async () => {

        try {

            const data = await getMatches();

            setMatches(data);

        } catch (error) {

            console.error(error);

            if (error.response?.data?.detail) {

                toast.warning(error.response.data.detail);

            } else {

                toast.error("Failed to load matches.");

            }

        }finally {

            setLoading(false);

        }

    };

    return (

        <MainLayout>

            <div className="bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-3xl p-8 shadow-xl mb-8">

                <h1 className="text-4xl font-bold">

                    ❤️ My Roommate Matches

                </h1>

                <p className="mt-3 text-pink-100">

                    Discover students who match your lifestyle, preferences and hobbies.

                </p>

            </div>

            <div className="max-w-6xl mx-auto">

                

                {

                    loading ? (

                        <div className="text-center py-16 text-lg text-gray-500">

                            Finding your best roommate matches...

                        </div>

                    ) : (

                        <div className="grid gap-6">

                            {

                                matches.length === 0 ? (

                                    <div className="bg-white rounded-3xl shadow-xl p-12 text-center">

                                        <div className="text-6xl">

                                            😔

                                        </div>

                                        <h2 className="text-2xl font-bold mt-4">

                                            No Matches Found

                                        </h2>

                                        <p className="text-gray-500 mt-3">

                                            Complete your profile, preferences and hobbies
                                            to improve your roommate recommendations.

                                        </p>

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