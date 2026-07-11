import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import HobbyChip from "../components/HobbyChip";

import {
  getHobbies,
  createHobbies,
  updateHobbies,
} from "../services/hobbyService";

import api from "../api/api";

import { toast } from "sonner";

import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
import { getPreference } from "../services/preferenceService";

function Hobbies() {
  const [allHobbies, setAllHobbies] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [hobbiesExist, setHobbiesExist] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    checkAccess();
    }, []);

  const checkAccess = async () => {
      try {

          await getPreference();

          loadHobbies();

      } catch(error) {
          console.log(error);

          toast.warning("Please complete your preferences first.");

          navigate("/preferences");

      }
  };

  const loadHobbies = async () => {
    try {
      const hobbyList = await api.get("/hobbies");

      setAllHobbies(hobbyList.data);

      try {
        const myHobbies = await getHobbies();

        setSelectedHobbies(myHobbies.hobbies);

        setHobbiesExist(true);
      } catch {
        setSelectedHobbies([]);

        setHobbiesExist(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleHobby = (hobby) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(
        selectedHobbies.filter((item) => item !== hobby)
      );
    } else {
      setSelectedHobbies([
        ...selectedHobbies,
        hobby,
      ]);
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        hobbies: selectedHobbies,
      };

      if (hobbiesExist) {
        await updateHobbies(payload);

        // console.log("toast line reached");

        toast.success("Hobbies Updated Successfully");
      } else {
        await createHobbies(payload);

        // console.log("toast line reached");

        toast.success("Hobbies Saved Successfully");

        setHobbiesExist(true);
      }
    } catch (err) {
      console.error(err);

      // console.log("toast line reached");

      toast.error("Failed to Save Hobbies ❌");
    }
  };

  return (
        <MainLayout>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-3xl p-8 shadow-xl mb-8">

                <h1 className="text-4xl font-bold">

                    🎯 My Hobbies

                </h1>

                <p className="mt-3 text-purple-100">

                    Select hobbies that best describe your interests. These help us find more compatible roommates.

                </p>

            </div>

            <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-10">

                

                {loading ? (

                <div className="text-center py-12 text-gray-500 text-lg">

                    Loading your hobbies...

                </div>

                ) : (

                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-2">

                    {allHobbies.map((hobby) => (
                        <HobbyChip
                        key={hobby}
                        hobby={hobby}
                        selected={selectedHobbies.includes(hobby)}
                        onClick={() => toggleHobby(hobby)}
                        />
                    ))}

                    </div>

                    <div className="flex justify-between items-center mt-8">

                    <h2 className="text-xl font-bold">
                        Selected Hobbies
                        {" "}
                        <span className="ml-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                        {selectedHobbies.length}
                        </span>
                    </h2>

                    <button
                        type="button"
                        onClick={handleSave}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition shadow-lg"
                    >
                        {hobbiesExist? "💾 Update Hobbies": "💾 Save Hobbies"}
                    </button>

                    </div>

                </>

                )}

            </div>
            </div>
        </MainLayout>
        );
}

export default Hobbies;