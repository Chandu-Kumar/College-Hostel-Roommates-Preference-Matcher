import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import HobbyChip from "../components/HobbyChip";

import {
  getHobbies,
  createHobbies,
  updateHobbies,
} from "../services/hobbyService";

import api from "../api/api";

function Hobbies() {
  const [allHobbies, setAllHobbies] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [hobbiesExist, setHobbiesExist] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHobbies();
  }, []);

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

        alert("Hobbies Updated Successfully ✅");
      } else {
        await createHobbies(payload);

        alert("Hobbies Saved Successfully ✅");

        setHobbiesExist(true);
      }
    } catch (err) {
      console.error(err);

      alert("Failed to Save Hobbies ❌");
    }
  };

  return (
        <MainLayout>
            <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">

                <h1 className="text-3xl font-bold text-center">
                🎯 My Hobbies
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-8">
                Select all hobbies that describe you.
                </p>

                {loading ? (

                <div className="text-center py-10">
                    Loading hobbies...
                </div>

                ) : (

                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

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

                    <h2 className="font-semibold text-lg">
                        Selected:
                        {" "}
                        <span className="text-blue-600">
                        {selectedHobbies.length}
                        </span>
                    </h2>

                    <button
                        type="button"
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition"
                    >
                        Save Hobbies
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