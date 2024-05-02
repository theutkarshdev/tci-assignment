import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import GroupTaskLists from "./GroupTaskLists";
import { addGroup, removeGroup, updateGroupFrom, updateGroupTo } from "../redux/action";

const AddGroupForm = () => {
  const groups = useSelector((state) => state.groups);
  const dispatch = useDispatch();
  const [areGroupsValid, setAreGroupsValid] = useState(false);

  const handleAddNewGroup = () => {
    dispatch(addGroup());
  };

  const handleRemoveGroup = (index) => {
    dispatch(removeGroup(index));
  };

  const handleFromChange = (value, index) => {
    dispatch(updateGroupFrom(index, parseInt(value, 10)));
  };

  const handleToChange = (value, index) => {
    dispatch(updateGroupTo(index, parseInt(value, 10)));
  };

  const validateGroups = () => {
    const sortedGroups = [...groups].sort((a, b) => a.from - b.from);

    // Validate range coverage
    if (sortedGroups[0].from > 1 || sortedGroups[sortedGroups.length - 1].to < 10) {
      return { valid: false, message: "Groups must cover the entire range from 1 to 10." };
    }

    // Validate no overlaps and no gaps
    for (let i = 0; i < sortedGroups.length - 1; i++) {
      if (sortedGroups[i].to >= sortedGroups[i + 1].from) {
        return { valid: false, message: "There should be no overlap between consecutive groups." };
      }
      console.log(sortedGroups[i].to + 1, sortedGroups[i + 1].from);
      if (sortedGroups[i].to + 1 !== sortedGroups[i + 1].from) {
        return { valid: false, message: "There should be no gaps between consecutive groups." };
      }
    }

    // Validate group bounds
    for (let group of sortedGroups) {
      if (group.from < 1 || group.to > 10) {
        return { valid: false, message: "Groups cannot go outside the range of 1 to 10." };
      }
    }

    return { valid: true, message: "All groups are valid!" };
  };

  const handleStatus = () => {
    const result = validateGroups();
    setAreGroupsValid(result.valid);
    result.valid ? toast.success(result.message) : toast.error(result.message);
  };

  useEffect(() => {
    const result = validateGroups();
    setAreGroupsValid(result.valid);
  }, [groups]);

  return (
    <>
      <Toaster />
      {groups.map((group, index) => (
        <div key={index} className="flex gap-3 mb-5">
          <div className="bg-gray-100 rounded-lg p-5 border flex gap-3 items-center">
            <Icon
              icon="mdi:delete"
              className="bg-red-200 text-red-500 rounded-lg w-8 h-8 p-1.5 cursor-pointer"
              onClick={() => handleRemoveGroup(index)}
            />
            <h2 className="font-bold text-lg">Group {group.id}</h2>
            <input
              type="number"
              className="border py-2 px-3 rounded-lg w-20"
              placeholder="From"
              value={group.from || ""}
              onChange={(e) => handleFromChange(e.target.value, index)}
            />
            <Icon icon="mdi:arrow-right" className="bg-sky-200 text-sky-500 rounded-lg w-8 h-8 p-1.5 cursor-pointer" />
            <input
              type="number"
              className="border py-2 px-3 rounded-lg w-20"
              placeholder="To"
              value={group.to || ""}
              onChange={(e) => handleToChange(e.target.value, index)}
            />
          </div>

          <div className="bg-gray-100 rounded-lg p-5 border flex-grow flex items-center">
            {areGroupsValid && <GroupTaskLists showStatus={areGroupsValid} from={group.from} to={group.to} />}
          </div>
        </div>
      ))}

      <button className="py-2 px-3 bg-sky-500 text-white hover:bg-sky-600 rounded-lg" onClick={handleAddNewGroup}>
        Add new Group
      </button>

      <div className="mt-5 text-center">
        <button className="py-2 px-3 bg-green-500 text-white hover:bg-green-600 rounded-lg" onClick={handleStatus}>
          Show Status
        </button>
      </div>
    </>
  );
};

export default AddGroupForm;
