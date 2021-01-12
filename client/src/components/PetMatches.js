import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { clearPetMatches, setPetMatches } from "../redux/actions/petsActions";
import { Card, CardContent, CardMedia, Container, Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 275,
  },
  section: {
    marginBottom: theme.spacing(6),
  },
  fab: {
    marginLeft: theme.spacing(6),
  },
  gridItem: {
    marginBottom: theme.spacing(4),
  },
  petMedia: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
    backgroundSize: "contain",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
  },
  sectionTitle: {
    marginBottom: theme.spacing(4),
  },
}));

function PetMatches({ setPetMatches, clearPetMatches, matches }) {
  const [fetched, setFetched] = useState(false);
  const { petId } = useParams();

  const classes = useStyles();

  useEffect(() => {
    if (!fetched) {
      setPetMatches(petId);
      setFetched(true);
    }
    return () => {
      clearPetMatches();
    };
  }, [fetched, petId, setPetMatches, setFetched, clearPetMatches]);
  return (
    <Container>
      <h3>{matches && matches.length ? 'Here are your matches' : 'No matches found'}</h3>
      <Grid container spacing={2}>
      {matches &&
        matches.map((p) => (
          <Grid item key={p._id} className={classes.gridItem}>
            <Card className={classes.card}>
                  <CardMedia
                    image={`/${p.type === "dog" ? "dog" : "cat"}-icon.png`}
                    className={classes.petMedia}
                  />
                  <CardContent>
                    <Typography variant="h6">{p.name}</Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {p.type}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {p.ageMonths} Months
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {p.breed}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {p.city}
                    </Typography>
                  </CardContent>
                </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

const matchStateToProps = (state) => ({
  matches: state.pets.matches,
  fetched: state.pets.fetched,
});

export default connect(matchStateToProps, { setPetMatches, clearPetMatches })(
  PetMatches
);
