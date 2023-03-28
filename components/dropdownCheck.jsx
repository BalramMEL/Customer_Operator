import React from "react";
import { Dropdown } from "@nextui-org/react";

export default function DropDownCheck() {
  const [selected, setSelected] = React.useState(new Set(["tracking_shot"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

    return (
      <div className="dropdown flex w-auto items-center gap-3">

        <h3 className="font-semibold">Drone Shot :</h3>
        <Dropdown className="flex w-auto" >
            <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
                {selectedValue}
            </Dropdown.Button>
        <Dropdown.Menu
            aria-label="Single selection actions"
            color="secondary"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selected}
            onSelectionChange={setSelected}
        >
                <Dropdown.Item key="tracking_shot">Tracking shot</Dropdown.Item>
                <Dropdown.Item key="number">Arc shot</Dropdown.Item>
                <Dropdown.Item key="date">High angle shot</Dropdown.Item>
                <Dropdown.Item key="180_degree_shot">180-degree shot</Dropdown.Item>
                <Dropdown.Item key="object_shot">Object shot</Dropdown.Item>
                <Dropdown.Item key="half_moon_bay_shot">Half moon bay shot</Dropdown.Item>
                <Dropdown.Item key="spinning_elevation_shot">Spinning elevation shot </Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    </div>
  );
}
