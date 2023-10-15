import React from "react";
import styles from "./banner.module.css";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const Banner = () => {
    return (
        <div className={styles.bannergrid}>
            <div className={styles.title}>
                <Typography variant="h4">Recipe App</Typography>
                <br />
                <Button variant="outlined" startIcon={<HomeIcon />} color="primary">
                    <Link color="inherit" href="/">
                        HOME
                    </Link>
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                    variant="outlined"
                    startIcon={<RestaurantIcon />}
                    color="primary"
                >
                    <Link color="inherit" href="/recipes">
                        RECIPES
                    </Link>
                </Button>
            </div>
            <div className={styles.userinfo}>
                <Typography variant="h4">Mo Afolayan</Typography>
            </div>
        </div>
    );
};

export default Banner;
