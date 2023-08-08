import { SyntheticEvent, useState } from "react";

export const useTabs = () => {
  const [value, setValue] = useState<string>("1");

  const handleChange = (_: SyntheticEvent, value: string) => {
    setValue(value);
  };

  return [value, handleChange] as const;
};

export default useTabs;
