import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import MainLayout from "../layouts/MainLayout";

import {
  getPreference,
  createPreference,
  updatePreference,
} from "../services/preferenceService";

function Preferences() {
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();

  const [preferenceExists, setPreferenceExists] = useState(false);

  useEffect(() => {
    loadPreference();
  }, []);

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

        alert("Preferences Updated Successfully ✅");

      } else {

        await createPreference(data);

        alert("Preferences Saved Successfully ✅");

        setPreferenceExists(true);

      }

    } catch (err) {

      console.error(err);

      alert("Failed to Save Preferences ❌");

    }
  };

  return (
    <MainLayout>

      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <h1 className="text-3xl font-bold mb-8 text-center">
            🏠 Room Preferences
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >

            {/* Sleep Time */}

            <div>

              <label className="block mb-2 font-semibold">
                Sleep Time
              </label>

              <input
                type="time"
                {...register("sleep_time")}
                className="w-full border rounded-lg p-3"
              />

            </div>

            {/* Wake Up */}

            <div>

              <label className="block mb-2 font-semibold">
                Wake Up Time
              </label>

              <input
                type="time"
                {...register("wake_up_time")}
                className="w-full border rounded-lg p-3"
              />

            </div>

            {/* Study Habit */}

            <div>

              <label className="block mb-2 font-semibold">
                Study Habit
              </label>

              <select
                {...register("study_habit")}
                className="w-full border rounded-lg p-3"
              >

                <option value="Morning">Morning</option>
                <option value="Night">Night</option>
                <option value="Flexible">Flexible</option>

              </select>

            </div>

            {/* Cleanliness */}

            <div>

              <label className="block mb-2 font-semibold">
                Cleanliness
              </label>

              <select
                {...register("cleanliness")}
                className="w-full border rounded-lg p-3"
              >

                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>

              </select>

            </div>

            {/* Lifestyle */}

            <div>

              <label className="block mb-3 font-semibold">
                Lifestyle
              </label>

              <div className="space-y-3">

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
                AC Preference
              </label>

              <select
                {...register("ac_preference")}
                className="w-full border rounded-lg p-3"
              >

                <option value="AC">AC</option>
                <option value="Non-AC">Non-AC</option>
                <option value="Any">Any</option>

              </select>

            </div>

            {/* Budget */}

            <div>

              <label className="block mb-2 font-semibold">
                Monthly Budget (₹)
              </label>

              <input
                type="number"
                placeholder="10000"
                {...register("budget")}
                className="w-full border rounded-lg p-3"
              />

            </div>

            {/* Food */}

            <div>

              <label className="block mb-2 font-semibold">
                Food Preference
              </label>

              <select
                {...register("food_preference")}
                className="w-full border rounded-lg p-3"
              >

                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Any">Any</option>

              </select>

            </div>

            {/* Personality */}

            <div>

              <label className="block mb-2 font-semibold">
                Personality
              </label>

              <select
                {...register("personality")}
                className="w-full border rounded-lg p-3"
              >

                <option value="Introvert">Introvert</option>
                <option value="Extrovert">Extrovert</option>
                <option value="Ambivert">Ambivert</option>

              </select>

            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Save Preferences
            </button>

          </form>

        </div>

      </div>

    </MainLayout>
  );
}

export default Preferences;