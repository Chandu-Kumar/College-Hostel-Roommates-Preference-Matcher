import MainLayout from "../layouts/MainLayout";

import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";

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

            alert("Profile Updated Successfully ✅");

        } else {

            const response = await createProfile(data);

            console.log(response);

            alert("Profile Created Successfully ✅");

            setProfileExists(true);

        }

    } catch (error) {

        console.error(error);

        alert("Something went wrong ❌");

    }

};

    return (

        <MainLayout>

            <h1 className="text-3xl font-bold mb-6">
                My Profile
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                <input
                    type="number"
                    placeholder="Age"
                    {...register("age", {
                        required: "Age is required"
                    })}
                    className="w-full border rounded-lg p-3"
                />

                <select
                    {...register("gender")}
                    className="w-full border rounded-lg p-3"
                >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>

                <input
                    placeholder="Department"
                    {...register("department")}
                    className="w-full border rounded-lg p-3"
                />

                <input
                    type="number"
                    placeholder="Year"
                    {...register("year")}
                    className="w-full border rounded-lg p-3"
                />

                <input
                    placeholder="Hostel"
                    {...register("hostel")}
                    className="w-full border rounded-lg p-3"
                />

                <input
                    placeholder="Phone"
                    {...register("phone")}
                    className="w-full border rounded-lg p-3"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                >
                    Save Profile
                </button>

            </form>

        </MainLayout>

    );
}

export default Profile;