import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="toggle-switch">
      <input
        onChange={handleToggleSwitchChange}
        type="checkbox"
        className="toggle-switch__checkbox"
      />
      <span className="toggle-switch__circle"></span>
      <span className={`toggle-switch__text toggle-switch__text_F`}>F</span>
      <span className="toggle-switch__text toggle-switch__text_C">C</span>
    </label>
  );
}

// transform: translatex(...);
// mix-blend-mode: ...t;

{
  /* <span
        style={{ color: `${currentTemperatureUnit === "F" ? "white" : ""}` }}
        className={`toggle-switch__text toggle-switch__text_F`}
      >
        F
      </span>

      <span
        style={{ color: `${currentTemperatureUnit === "F" ? "white" : ""}` }}
        className={`toggle-switch__text toggle-switch__text_C`}
      >
        F
      </span> */
}

{
  /* <span className={`toggle-switch__text toggle-switch__text_F ${ 
      currentTemperatureUnit === "F" 
      ? "toggle-switch__text_color_white" : "" }`}>F</span> */
}

{
  /* <span
        className={`toggle-switch__text toggle-switch__text_C ${
          currentTemperatureUnit === "C"
            ? "toggle-switch__text_color_white"
            : ""
        }`}
      >
        C
      </span> */
}
