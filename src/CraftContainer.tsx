import { useNode, UserComponent } from "@craftjs/core";
import React from "react";

const CraftContainer: UserComponent<{
  setActiveKey: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setActiveKey }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => ref && connect(drag(ref))}
      style={{
        padding: `15px 15px`,
        cursor: "pointer",
      }}
      onClick={() => setActiveKey("settings")}
    />
  );
};

const ContainerSettings: React.VFC = () => {
  return <>ContainerSettings</>;
};

CraftContainer.craft = {
  related: {
    settings: ContainerSettings,
  },
  custom: {
    button: {
      label: "deleteBlock",
    },
  },
};

export default CraftContainer;
