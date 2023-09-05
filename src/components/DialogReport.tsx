import _ from "lodash";
import { useCallback, useState } from "react";
import { useStore } from "@/stores";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import LabelProgress from "@/components/LabelProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { ComAtprotoModerationDefs, AppBskyActorDefs, AppBskyFeedDefs } from "@atproto/api";

type Props = {
  actor?: AppBskyActorDefs.ProfileViewDetailed;
  post?: AppBskyFeedDefs.PostView;
  open: boolean;
  onClose: () => void;
  onSend?: () => void;
};

const MAX_TEXT_LENGTH = 300;

export const DialogReport = (props: Props) => {
  const [reason, setReason] = useState<string>("");
  const [reasonType, setReasonType] = useState<string>("");
  const reportActor = useStore((state) => state.reportActor);
  const reportPost = useStore((state) => state.reportPost);

  const onChangeReason = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setReason(e.currentTarget.value);
    },
    [setReason]
  );

  const onRadioReason = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setReasonType(e.currentTarget.value);
    },
    [setReasonType]
  );

  const onClear = useCallback(() => {
    props.onClose();
    setReason("");
  }, [props, setReason]);

  const onSend = useCallback(() => {
    props.onClose();
    setReason("");
    setReasonType("");
    if (props.actor) {
      reportActor(reason, reasonType, props.actor.did);
    }
    if (props.post) {
      reportPost(reason, reasonType, props.post.cid, props.post.uri);
    }
  }, [props, reason, setReason, reasonType, setReasonType, reportActor, reportPost]);

  const isNotSendable = MAX_TEXT_LENGTH < reason.length || !reason.length;

  const reportMenus = props.post
    ? [
        { value: ComAtprotoModerationDefs.REASONMISLEADING, label: "Misleading Account" },
        { value: ComAtprotoModerationDefs.REASONSPAM, label: "Spam" },
        { value: ComAtprotoModerationDefs.REASONVIOLATION, label: "Violates" },
        { value: ComAtprotoModerationDefs.REASONRUDE, label: "Rude" },
        { value: ComAtprotoModerationDefs.REASONSEXUAL, label: "Sexual" },
        { value: ComAtprotoModerationDefs.REASONOTHER, label: "Other" },
      ]
    : [
        { value: ComAtprotoModerationDefs.REASONMISLEADING, label: "Misleading Account" },
        { value: ComAtprotoModerationDefs.REASONSPAM, label: "Spam" },
        { value: ComAtprotoModerationDefs.REASONVIOLATION, label: "Violates" },
      ];

  return (
    <Dialog open={props.open} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }} onClose={onClear}>
      <DialogTitle>Report Account</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <DialogContentText component="div">
            <RadioGroup onChange={onRadioReason}>
              {_.map(reportMenus, (menu) => (
                <FormControlLabel value={menu.value} control={<Radio />} label={menu.label} />
              ))}
            </RadioGroup>
          </DialogContentText>
          <TextField
            multiline
            rows={4}
            fullWidth
            label="Any other details"
            autoFocus
            value={reason}
            onChange={onChangeReason}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Stack alignSelf="flex-start">
                    <LabelProgress
                      variant="determinate"
                      color={isNotSendable ? "error" : "primary"}
                      value={Math.min((reason.length / MAX_TEXT_LENGTH) * 100, 100)}
                      label={(MAX_TEXT_LENGTH - reason.length).toString()}
                    />
                  </Stack>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Button
          sx={{ width: "50%", borderRadius: 5, fontWeight: 600 }}
          variant="contained"
          onClick={onSend}
          disabled={!reasonType}
        >
          Send Report
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogReport;
