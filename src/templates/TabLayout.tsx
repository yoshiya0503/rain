import _ from "lodash";
import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import useTabs from "@/hooks/useTabs";

type Props = {
  children: ReactNode[];
  labels: string[];
};

export const TabLayout = (props: Props) => {
  const [tab, onChangeTab] = useTabs();
  return (
    <TabContext value={tab}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={onChangeTab}>
          {_.map(props.labels, (label, key) => (
            <Tab key={key} label={label} value={_.toString(key)} />
          ))}
        </TabList>
      </Box>
      {_.map(props.children, (component, key) => (
        <TabPanel
          sx={{ display: "flex", flexDirection: "column", height: "80vh", m: 0, p: 0 }}
          key={key}
          value={_.toString(key)}
        >
          {component}
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default TabLayout;
