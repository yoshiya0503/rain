import _ from "lodash";
import { useCallback } from "react";
import { useStore } from "@/stores";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { AppBskyActorDefs } from "@atproto/api";

type Props = {
  open: boolean;
  preferences: AppBskyActorDefs.Preferences;
  onClose: () => void;
};

export const DialogContentFilter = (props: Props) => {
  const updatePreferences = useStore((state) => state.updatePreferences);
  const adultPref = _.find(props.preferences, (p) => AppBskyActorDefs.isAdultContentPref(p));
  const contentLabelPref = _.filter(props.preferences, (p) => AppBskyActorDefs.isContentLabelPref(p));

  const label = {
    impersonation: {
      title: "Impersonation",
      description: "Accounts falsely claiming to be people or orgs",
    },
    nsfw: {
      title: "Explicit Sexual Images",
      description: "i.e. pornography",
    },
    gore: {
      title: "Violent / Bloody",
      description: "Gore, self-harm, torture",
    },
    suggestive: {
      title: "Sexually Suggestive",
      description: "Does not include nudity",
    },
    hate: {
      title: "Hate Group Iconography",
      description: "Images of terror groups, articles covering events, etc.",
    },
    nudity: {
      title: "Other Nudity",
      description: "Including non-sexual and artistic",
    },
    spam: {
      title: "Spam",
      description: "Excessive unwanted interactions",
    },
  };

  const onToggleAdult = useCallback(() => {
    const preferences = _.map(props.preferences, (pref) => {
      if (AppBskyActorDefs.isAdultContentPref(pref)) return { ...pref, enabled: !pref.enabled };
      return pref;
    });
    updatePreferences(preferences);
  }, [props, updatePreferences]);

  const onChangeFilter = useCallback(
    (label: string) => (__: React.MouseEvent<HTMLElement>, visibility: string) => {
      const preferences = _.map(props.preferences, (pref) => {
        if (label === pref.label) return { ...pref, visibility };
        return pref;
      });
      updatePreferences(preferences);
    },
    [props, updatePreferences]
  );

  return (
    <Dialog open={props.open} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }} onClose={props.onClose}>
      <DialogTitle>Content Filter</DialogTitle>
      <DialogContent>
        <DialogContentText component="div">
          <Stack direction="row" spacing={2} alignItems="center">
            <Switch checked={!!adultPref?.enabled} onChange={onToggleAdult} />
            Enable Sexual Content
          </Stack>
        </DialogContentText>
        {_.map(contentLabelPref, (pref: AppBskyActorDefs.ContentLabelPref) => (
          <Box key={pref.label}>
            <Box sx={{ mt: 1, mb: 1 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack>
                  <Typography variant="body2">{_.get(label, pref.label).title}</Typography>
                  <Typography variant="caption" color={grey[400]}>
                    {_.get(label, pref.label).description}
                  </Typography>
                </Stack>
                <ToggleButtonGroup
                  color="primary"
                  size="small"
                  exclusive
                  value={pref.visibility}
                  onChange={onChangeFilter(pref.label)}
                >
                  <ToggleButton value="hide">
                    <Typography sx={{ fontWeight: 600, textTransform: "none" }} variant="caption">
                      Hide
                    </Typography>
                  </ToggleButton>
                  <ToggleButton value="warn">
                    <Typography sx={{ fontWeight: 600, textTransform: "none" }} variant="caption">
                      Warn
                    </Typography>
                  </ToggleButton>
                  <ToggleButton value="show">
                    <Typography sx={{ fontWeight: 600, textTransform: "none" }} variant="caption">
                      Show
                    </Typography>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Box>
            <Divider flexItem />
          </Box>
        ))}
      </DialogContent>
      <Divider />
      <DialogActions sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Button sx={{ width: "50%", borderRadius: 5, fontWeight: 600 }} variant="contained" onClick={props.onClose}>
          DONE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogContentFilter;
