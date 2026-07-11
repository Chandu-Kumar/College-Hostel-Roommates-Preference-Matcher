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

                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">

                        <div className="flex items-center gap-6">

                            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-5xl font-bold border border-white/30">

                                {loading ? "?" : user.name.charAt(0).toUpperCase()}

                            </div>

                            <div>

                                <h1 className="text-4xl font-bold">

                                    {loading ? "Loading..." : user.name}

                                </h1>

                                <p className="mt-2 text-blue-100">

                                    {loading
                                        ? "Department"
                                        : `${user.profile.department} • Year ${user.profile.year}`}

                                </p>

                                <p className="text-blue-200 mt-1">

                                    🏠 {loading ? "--" : user.profile.hostel}

                                </p>

                            </div>

                        </div>

                        <div className="mt-6 md:mt-0">

                            <div className="bg-white/20 backdrop-blur px-6 py-4 rounded-2xl text-center">

                                <p className="text-sm text-blue-100">

                                    Student

                                </p>

                                <h2 className="text-3xl font-bold">

                                    👨‍🎓

                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Card */}

                <div className="bg-white rounded-3xl shadow-xl p-10 mt-8">

                    <h2 className="text-2xl font-bold mb-8">

                        📋 Personal Information

                    </h2>

                    {/* Personal Details */}

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

                        <div className="bg-gray-50 rounded-2xl p-5">

                            <p className="text-gray-500 text-sm">Age</p>

                            <h3 className="text-xl font-bold mt-2">

                                🎂 {loading ? "--" : user.profile.age}

                            </h3>

                        </div>

                        <div className="bg-gray-50 rounded-2xl p-5">

                            <p className="text-gray-500 text-sm">Gender</p>

                            <h3 className="text-xl font-bold mt-2">

                                👤 {loading ? "--" : user.profile.gender}

                            </h3>

                        </div>

                        <div className="bg-gray-50 rounded-2xl p-5">

                            <p className="text-gray-500 text-sm">Hostel</p>

                            <h3 className="text-xl font-bold mt-2">

                                🏠 {loading ? "--" : user.profile.hostel}

                            </h3>

                        </div>

                        <div className="bg-gray-50 rounded-2xl p-5">

                            <p className="text-gray-500 text-sm">Academic Year</p>

                            <h3 className="text-xl font-bold mt-2">

                                📚 {loading ? "--" : user.profile.year}

                            </h3>

                        </div>

                    </div>
                    <hr className="my-8" />

                    {/* Preferences */}

                    <h3 className="text-2xl font-bold mb-6">

                        ⚙ Lifestyle Preferences

                    </h3>

                    {

                        loading

                        ?

                        <p>Loading...</p>

                        :

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                            <div className="bg-blue-50 rounded-2xl p-5">

                                <p className="text-sm text-gray-500">

                                    Sleep

                                </p>

                                <h3 className="font-bold text-lg mt-2">

                                    🌙 {user.preference.sleep_time}

                                </h3>

                            </div>

                            <div className="bg-blue-50 rounded-2xl p-5">

                                <p className="text-sm text-gray-500">

                                    Wake Up

                                </p>

                                <h3 className="font-bold text-lg mt-2">

                                    ☀️ {user.preference.wake_up_time}

                                </h3>

                            </div>

                            <div className="bg-blue-50 rounded-2xl p-5">

                                <p className="text-sm text-gray-500">

                                    Study Habit

                                </p>

                                <h3 className="font-bold text-lg mt-2">

                                    📚 {user.preference.study_habit}

                                </h3>

                            </div>

                            <div className="bg-blue-50 rounded-2xl p-5">

                                <p className="text-sm text-gray-500">

                                    Cleanliness

                                </p>

                                <h3 className="font-bold text-lg mt-2">

                                    🧹 {user.preference.cleanliness}

                                </h3>

                            </div>

                            <div className="bg-blue-50 rounded-2xl p-5">

                                <p className="text-sm text-gray-500">

                                    Food

                                </p>

                                <h3 className="font-bold text-lg mt-2">

                                    🍛 {user.preference.food_preference}

                                </h3>

                            </div>

                            <div className="bg-blue-50 rounded-2xl p-5">

                                <p className="text-sm text-gray-500">

                                    Personality

                                </p>

                                <h3 className="font-bold text-lg mt-2">

                                    🎭 {user.preference.personality}

                                </h3>

                            </div>

                            <div className="bg-blue-50 rounded-2xl p-5">

                                <p className="text-sm text-gray-500">

                                    AC

                                </p>

                                <h3 className="font-bold text-lg mt-2">

                                    ❄ {user.preference.ac_preference}

                                </h3>

                            </div>

                            <div className="bg-blue-50 rounded-2xl p-5">

                                <p className="text-sm text-gray-500">

                                    Budget

                                </p>

                                <h3 className="font-bold text-lg mt-2">

                                    ₹ {user.preference.budget}

                                </h3>

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
                                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:scale-105 transition text-blue-700 px-4 py-2 rounded-full font-medium"
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

                    <div className="rounded-3xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">

                        <div className="text-5xl">

                            🔒

                        </div>

                        <h2 className="text-2xl font-bold mt-4">

                            Contact Information Locked

                        </h2>

                        <p className="text-gray-700 mt-2">

                            {

                                user?.email

                                ?

                                user.email

                                :

                                "📧 Hidden until room request is accepted"

                            }

                        </p>
                        <p className="text-gray-700 mt-2">

                            {

                                user?.phone

                                ?

                                user.phone

                                :

                                "📱 Hidden until room request is accepted"

                            }

                        </p>

                    </div>
                </div>

            </div>

        </MainLayout>

    );

}

export default UserProfile;