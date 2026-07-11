import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import MainLayout from "../layouts/MainLayout";

import {
  getPreference,
  createPreference,
  updatePreference,
} from "../services/preferenceService";

import { toast } from "sonner";

import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
import { getProfile } from "../services/profileService";

function Preferences() {
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();

  const navigate = useNavigate();

  const [preferenceExists, setPreferenceExists] = useState(false);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
      try {

          console.log("checking profile....");

          await getProfile();

          console.log("profile exists");

          loadPreference();

      } catch( error) {
          
          console.log("profile does not exist");
          console.log(error);

          toast.warning("Please complete your profile first.");

          navigate("/profile");

      }
  };

  const loadPreference = async () => {
    try {
      const preference = await getPreference();

      setValue("sleep_time", preference.sleep_time);
      setValue("wake_up_time", preference.wake_up_time);
      setValue("study_habit", preference.study_habit);
      setValue("cleanliness", preference.cleanliness);
      setValue("smoking", preference.smoking);
      setValue("drinking", preference.drinking);
      setValue("guest_preference", preference.guest_preference);
      setValue("ac_preference", preference.ac_preference);
      setValue("budget", preference.budget);
      setValue("food_preference", preference.food_preference);
      setValue("personality", preference.personality);

      setPreferenceExists(true);

    } catch (err) {

      console.log("No Preference Found");

      setPreferenceExists(false);

    }
  };

  const onSubmit = async (data) => {
    try {

      if (preferenceExists) {

        await updatePreference(data);

        // console.log("toast line reached");

        toast.success("Preferences Updated Successfully");

      } else {

        await createPreference(data);

        // console.log("toast line reached");

        toast.success("Preferences Saved Successfully");

        setPreferenceExists(true);

      }

    } catch (err) {

      console.error(err);

      // console.log("toast line reached");

      toast.error("Failed to Save Preferences ❌");

    }
  };

  return (
    <MainLayout>

      <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white rounded-3xl p-8 shadow-xl mb-8">

          <h1 className="text-4xl font-bold">
              🏠 Room Preferences
          </h1>

          <p className="mt-3 text-blue-100">
              Configure your lifestyle and room preferences for better roommate matching.
          </p>

      </div>

      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl p-10">

          

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid md:grid-cols-2 gap-6"
          >

            {/* Sleep Time */}

            <div>

              <label className="block mb-2 font-semibold">
                  🌙 Sleep Time
              </label>
              <input
                type="time"
                {...register("sleep_time")}
                className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />

            </div>

            {/* Wake Up */}

            <div>

              <label className="block mb-2 font-semibold">
                  ☀ Wake Up Time
              </label>

              <input
                type="time"
                {...register("wake_up_time")}
                className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />

            </div>

            {/* Study Habit */}

            <div>

              <label className="block mb-2 font-semibold">
                  📚 Study Habit
              </label>

              <select
                {...register("study_habit")}
                className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
              >

                <option value="Morning">Morning</option>
                <option value="Night">Night</option>
                <option value="Flexible">Flexible</option>

              </select>

            </div>

            {/* Cleanliness */}

            <div>

              <label className="block mb-2 font-semibold">
                  🧹 Cleanliness
              </label>

              <select
                {...register("cleanliness")}
                className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
              >

                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>

              </select>

            </div>

            {/* Lifestyle */}

            <div>

              <label className="block mb-3 font-semibold text-lg">
                  🏠 Lifestyle
              </label>

              <div className="space-y-4 bg-slate-50 rounded-2xl p-5 border">

                <label className="flex items-center gap-3">

                  <input
                    type="checkbox"
                    {...register("smoking")}
                  />

                  Smoking

                </label>

                <label className="flex items-center gap-3">

                  <input
                    type="checkbox"
                    {...register("drinking")}
                  />

                  Drinking

                </label>

                <label className="flex items-center gap-3">

                  <input
                    type="checkbox"
                    {...register("guest_preference")}
                  />

                  Guests Allowed

                </label>

              </div>

            </div>

            {/* AC */}

            <div>

              <label className="block mb-2 font-semibold">
                  ❄ AC Preference
              </label>

              <select
                {...register("ac_preference")}
                className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
              >

                <option value="AC">AC</option>
                <option value="Non-AC">Non-AC</option>
                <option value="Any">Any</option>

              </select>

            </div>

            {/* Budget */}

            <div>

              <label className="block mb-2 font-semibold">
                  💰 Monthly Budget (₹)
              </label>

              <input
                type="number"
                placeholder="10000"
                {...register("budget")}
                className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />

            </div>

            {/* Food */}

            <div>

              <label className="block mb-2 font-semibold">
                  🍽 Food Preference
              </label>

              <select
                {...register("food_preference")}
                className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
              >

                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Any">Any</option>

              </select>

            </div>

            {/* Personality */}

            <div>

              <label className="block mb-2 font-semibold">
                  😊 Personality
              </label>

              <select
                {...register("personality")}
                className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
              >

                <option value="Introvert">Introvert</option>
                <option value="Extrovert">Extrovert</option>
                <option value="Ambivert">Ambivert</option>

              </select>

            </div>

            <button
              type="submit"
              className="md:col-span-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
            >
              
              {preferenceExists ? "💾 Update Preferences": "💾 Save Preferences"}
            </button>

          </form>

        </div>

      </div>

    </MainLayout>
  );
}

export default Preferences;