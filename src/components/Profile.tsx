import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { AppBskyActorDefs } from "@atproto/api";

type Props = {
  actor?: AppBskyActorDefs.ProfileViewDetailed;
};

export const Profile = (props: Props) => {
  return (
    <Card>
      <CardMedia sx={{ height: 140 }} image={props.actor?.banner} />
      <CardHeader
        avatar={<Avatar src={props.actor?.avatar} />}
        title={props.actor?.displayName}
        subheader={props.actor?.handle}
      />
      <CardContent>
        <Avatar sx={{ width: 64, height: 64 }} src={props.actor?.avatar} />
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Profile;
