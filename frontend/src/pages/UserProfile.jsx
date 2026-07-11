import MainLayout from "../layouts/MainLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getUserProfile } from "../services/userService";

function UserProfile() {

    const { id } = useParams();

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadUser();

    }, []);

    const loadUser = async () => {

        try {

            const data = await getUserProfile(id);

            setUser(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <MainLayout>

            <div className="max-w-5xl mx-auto">

                {/* Hero */}

                <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white rounded-3xl p-8 shadow-xl">

                    <h1 className="text-4xl font-bold">

                        👤 Student Profile

                    </h1>

                    <p className="mt-2 text-blue-100">

                        {loading
                            ? "Loading..."
                            : `Viewing profile of ${user.name}`}

                    </p>

                </div>

                {/* Card */}

                <div className="bg-white rounded-3xl shadow-xl p-10 mt-8">

                    <div className="flex items-center gap-6">

                        <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">

                            {loading
                                ? "?"
                                : user.name.charAt(0).toUpperCase()}

                        </div>

                        <div>

                            <h2 className="text-3xl font-bold">

                                {loading
                                    ? "Loading..."
                                    : user.name}

                            </h2>

                            <p className="text-gray-500">

                                {loading
                                    ? "Department"
                                    : user.profile.department}

                            </p>

                        </div>

                    </div>

                    <hr className="my-8" />

                    {/* Personal Details */}

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>

                            <h3 className="font-semibold">🎂 Age</h3>

                            <p>

                                {loading
                                    ? "--"
                                    : user.profile.age}

                            </p>

                        </div>

                        <div>

                            <h3 className="font-semibold">👥 Gender</h3>

                            <p>

                                {loading
                                    ? "--"
                                    : user.profile.gender}

                            </p>

                        </div>

                        <div>

                            <h3 className="font-semibold">🏠 Hostel</h3>

                            <p>

                                {loading
                                    ? "--"
                                    : user.profile.hostel}

                            </p>

                        </div>

                        <div>

                            <h3 className="font-semibold">📚 Year</h3>

                            <p>

                                {loading
                                    ? "--"
                                    : user.profile.year}

                            </p>

                        </div>

                    </div>

                    <hr className="my-8" />

                    {/* Preferences */}

                    <h3 className="text-2xl font-bold mb-5">

                        ⚙️ Preferences

                    </h3>

                    {

                        loading

                        ?

                        <p>Loading...</p>

                        :

                        <div className="grid md:grid-cols-2 gap-5">

                            <div>

                                <strong>🌙 Sleep</strong>

                                <p>{user.preference.sleep_time}</p>

                            </div>

                            <div>

                                <strong>☀️ Wake Up</strong>

                                <p>{user.preference.wake_up_time}</p>

                            </div>

                            <div>

                                <strong>📚 Study Habit</strong>

                                <p>{user.preference.study_habit}</p>

                            </div>

                            <div>

                                <strong>🧹 Cleanliness</strong>

                                <p>{user.preference.cleanliness}</p>

                            </div>

                            <div>

                                <strong>🍛 Food</strong>

                                <p>{user.preference.food_preference}</p>

                            </div>

                            <div>

                                <strong>🎭 Personality</strong>

                                <p>{user.preference.personality}</p>

                            </div>

                            <div>

                                <strong>❄ AC</strong>

                                <p>{user.preference.ac_preference}</p>

                            </div>

                            <div>

                                <strong>💰 Budget</strong>

                                <p>

                                    ₹ {user.preference.budget}

                                </p>

                            </div>

                        </div>

                    }

                    <hr className="my-8" />

                    {/* Hobbies */}

                    <h3 className="text-2xl font-bold mb-4">

                        🎯 Hobbies

                    </h3>

                    <div className="flex flex-wrap gap-3">

                        {

                            loading

                            ?

                            <span className="bg-gray-100 px-4 py-2 rounded-full">

                                Loading...

                            </span>

                            :

                            user.hobbies.map((hobby) => (

                                <span
                                    key={hobby}
                                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium"
                                >

                                    {hobby}

                                </span>

                            ))

                        }

                    </div>

                    <hr className="my-8" />

                    {/* Contact */}

                    <h3 className="text-2xl font-bold mb-4">

                        📞 Contact Information

                    </h3>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">

                        <p className="font-semibold">

                            📧 Email

                        </p>

                        <p className="text-gray-500">

                            🔒 Hidden until room request is accepted

                        </p>

                        <div className="mt-5">

                            <p className="font-semibold">

                                📱 Phone

                            </p>

                            <p className="text-gray-500">

                                🔒 Hidden until room request is accepted

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default UserProfile;