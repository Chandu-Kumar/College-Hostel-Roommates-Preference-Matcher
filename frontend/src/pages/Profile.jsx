import MainLayout from "../layouts/MainLayout";

import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";

import { toast } from "sonner";

// import { createProfile } from "../services/profileService";

// import { useEffect } from "react";

import {
    getProfile,
    createProfile,
    updateProfile
} from "../services/profileService";


function Profile() {

    const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
    } = useForm();

    const [profileExists, setProfileExists] = useState(false);

    const loadProfile = async () => {

    try {

        const profile = await getProfile();

        setValue("age", profile.age);
        setValue("gender", profile.gender);
        setValue("department", profile.department);
        setValue("year", profile.year);
        setValue("hostel", profile.hostel);
        setValue("phone", profile.phone);

        setProfileExists(true);


    } catch (error) {

        console.log("No profile found");

        setProfileExists(false);

    }

    };

    useEffect(() => {

    loadProfile();

    }, []);

    const onSubmit = async (data) => {

    try {

        if (profileExists) {

            const response = await updateProfile(data);

            console.log(response);

            // console.log("toast line reached");

            toast.success("Profile Updated Successfully");

        } else {

            const response = await createProfile(data);

            console.log(response);

            console.log("toast line reached");

            toast.success("Profile Created Successfully");

            setProfileExists(true);

        }

    } catch (error) {

        console.error(error);

        toast.error("Something went wrong ❌");

    }

};

   return (

        <MainLayout>

            {/* Hero */}

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-8 shadow-xl">

                <h1 className="text-4xl font-bold">

                    👤 Student Profile

                </h1>

                <p className="mt-3 text-blue-100">

                    Keep your personal information updated to improve roommate matching.

                </p>

            </div>

            {/* Form Card */}

            <div className="bg-white rounded-3xl shadow-xl p-10 mt-8">

                <h2 className="text-2xl font-bold mb-8">

                    Personal Information

                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid md:grid-cols-2 gap-6"
                >

                    {/* Age */}

                    <div>

                        <label className="block font-semibold mb-2">

                            🎂 Age

                        </label>

                        <input
                            type="number"
                            placeholder="Enter your age"
                            {...register("age", {
                                required: "Age is required"
                            })}
                            className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />

                    </div>

                    {/* Gender */}

                    <div>

                        <label className="block font-semibold mb-2">

                            👥 Gender

                        </label>

                        <select
                            {...register("gender")}
                            className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        >

                            <option>Male</option>

                            <option>Female</option>

                            <option>Other</option>

                        </select>

                    </div>

                    {/* Department */}

                    <div>

                        <label className="block font-semibold mb-2">

                            🎓 Department

                        </label>

                        <input
                            placeholder="Computer Science"
                            {...register("department")}
                            className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />

                    </div>

                    {/* Year */}

                    <div>

                        <label className="block font-semibold mb-2">

                            📚 Academic Year

                        </label>

                        <input
                            type="number"
                            placeholder="Enter Year"
                            {...register("year")}
                            className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />

                    </div>

                    {/* Hostel */}

                    <div>

                        <label className="block font-semibold mb-2">

                            🏠 Hostel

                        </label>

                        <input
                            placeholder="Hostel Name"
                            {...register("hostel")}
                            className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />

                    </div>

                    {/* Phone */}

                    <div>

                        <label className="block font-semibold mb-2">

                            📱 Phone Number

                        </label>

                        <input
                            placeholder="Enter Phone Number"
                            {...register("phone")}
                            className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />

                    </div>

                    {/* Button */}

                    <div className="md:col-span-2">

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
                        >

                            💾 {profileExists ? "Update Profile" : "Save Profile"}

                        </button>

                    </div>

                </form>

            </div>

        </MainLayout>

    );
}

export default Profile;