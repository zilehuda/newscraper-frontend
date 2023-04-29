import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import moment from "moment";

export default function MediaCard({
  title,
  image,
  url,
  source,
  description,
  published_at,
}) {
  const formattedDate = moment(published_at).format("MMMM Do YYYY, h:mm:ss a");
  return (
    <Card>
      <CardHeader title={title} subheader={formattedDate} href={url} />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <br />
          {description}
        </Typography>
        <Link href={url} target="_blank" underline="none">
          Read More
        </Link>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Typography>{source}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
