import {
  makeStyles,
  Theme,
  createStyles,
  ButtonBase,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { GetServerSideProps } from "next";
import React from "react";
import { CarModel } from "../../../../../api/Car";
import { openDB } from "../../../../openDB";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
    },
    img: {
      width: "100%",
    },
  })
);

interface CarDetailsProps {
  car: CarModel | null;
}

export default function CarDetails({ car }: CarDetailsProps) {
  const classes = useStyles();

  if (!car) {
    return <h1>Sorry, car not found!</h1>;
  }
  return (
    <div>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={5}>
            <img className={classes.img} alt="complex" src={car.photoUrl} />
          </Grid>
          <Grid item xs={12} sm={6} md={7} container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="h5">
                  {car.make + " " + car.model}
                </Typography>
                <Typography gutterBottom variant="h4">
                  ${car.price}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Year: {car.year}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  KMs: {car.kilometers}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Fuel Type: {car.fuelType}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Details: {car.details}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id;
  const db = await openDB();
  const car = await db.get<CarModel | undefined>(
    "SELECT * FROM Car where id = ?",
    id
  );
  return { props: { car: car || null } };
};
