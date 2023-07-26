import _ from "lodash";
import { ReactNode } from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreIcon from "@mui/icons-material/MoreHoriz";
import Typography from "@mui/material/Typography";
import useMenu from "@/hooks/useMenu";

type Props = {
  items: {
    name: string;
    label: string;
    icon: ReactNode;
    action: () => void;
  }[];
  size?: "tiny";
};

export const DropDownMenu = (props: Props) => {
  const [anchor, openMenu, closeMenu] = useMenu();
  return (
    <>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          openMenu(e);
        }}
        size="small"
      >
        {props.size ? <MoreIcon sx={{ fontSize: 18 }} /> : <MoreIcon />}
      </IconButton>
      <Menu onClose={closeMenu} anchorEl={anchor} open={Boolean(anchor)}>
        {_.map(props.items, (action, key) => (
          <MenuItem
            key={key}
            onClick={(e) => {
              e.stopPropagation();
              if (action.action) {
                action.action();
              }
              closeMenu();
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              {action.icon}
              <Typography variant="body2">{action.label}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default DropDownMenu;
