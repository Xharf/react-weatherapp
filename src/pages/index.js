import {
	Grid,
	Container,
	TextField,
	Typography,
	ImageList,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import Axios from "../../model/axios";
import moment from "moment/moment";
import Link from "next/link";

export async function getStaticProps() {
	return {
		props: {
			API_KEY: process.env.API_KEY,
		},
	};
}

export default function Home(props) {
	const [initializing, setInitializing] = useState(true);
	const [displayedLocation, setDisplayedLocation] = useState("");
	const [location, setLocation] = useState("depok");
	const [forecast, setForecast] = useState({});

	const changeDisplayedLocationHandler = (value) => {
		setDisplayedLocation(value);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setLocation(displayedLocation);
		}, 500);
		return () => clearTimeout(timeout);
	}, [displayedLocation]);

	useEffect(() => {
		setInitializing(true);
		Axios.get(
			`/forecast.json?key=${props.API_KEY}&lang=en&q=${
				location ? location : "depok"
			}&days=1`,
		).then((res) => {
			setForecast(res.data);
			setInitializing(false);
		});
		setInitializing(false);
	}, []);

	useEffect(() => {
		setInitializing(true);
		Axios.get(
			`/forecast.json?key=${props.API_KEY}&lang=en&q=${
				location ? location : "depok"
			}&days=1`,
		).then((res) => {
			setForecast(res.data);
			setInitializing(false);
		});
	}, [location]);

	if (initializing) return <div>Loading...</div>;

	return (
		<>
			<Container maxWidth="sm" sx={{ mt: 3, minHeight: "100vh" }}>
				<Grid container justifyContent="space-between" alignItems="center">
					<Grid item xs={2} textAlign="center">
						<LocationOnIcon />
					</Grid>
					<Grid item xs={8} textAlign="center">
						<TextField
							fullWidth
							sx={{
								"& .MuiOutlinedInput-root": {
									"& fieldset": {
										borderRadius: 50,
									},
								},
							}}
							variant="outlined"
							size="small"
							label="Location"
							value={displayedLocation}
							onChange={(e) => changeDisplayedLocationHandler(e.target.value)}
						></TextField>
					</Grid>
					<Grid item xs={2} textAlign="center">
						<Link
							href={{
								pathname: "/forecast",
								query: {
									location: location ? location : "depok",
								},
							}}
							style={{ textDecoration: "none", color: "black" }}
						>
							<CalendarMonthIcon></CalendarMonthIcon>
						</Link>
					</Grid>
				</Grid>
				<Grid container justifyContent="center">
					<Grid item xs={12} textAlign="center">
						<img
							style={{ width: "40%" }}
							src={forecast.current.condition.icon}
							alt="Weather Icon"
						/>
					</Grid>
					<Grid item xs={12} textAlign="center">
						<Typography variant="subtitle2">
							{forecast.current.condition.text}
						</Typography>
					</Grid>
					<Grid item xs={12} textAlign="center">
						<Typography variant="h1" sx={{ fontWeight: "bold" }}>
							28 °
						</Typography>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Grid container justifyContent="end">
								<Grid>
									<AirIcon></AirIcon>
								</Grid>
								<Grid>
									<Typography variant="subtitle2">
										{forecast.current.wind_kph} Km/h
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={6}>
							<Grid container>
								<Grid>
									<WaterDropIcon></WaterDropIcon>
								</Grid>
								<Grid>
									<Typography variant="subtitle2">
										{forecast.current.humidity}%
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={12} textAlign="center">
							<Typography variant="subtitle1">
								Last updated: {forecast.current.last_updated}
							</Typography>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={12} textAlign="center">
							<Typography variant="subtitle1" sx={{ textAlign: "center" }}>
								Location {forecast.location.name}, {forecast.location.region},{" "}
								{forecast.location.country}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<ImageList
					gap={8}
					sx={{
						padding: 2,
						gridAutoFlow: "column",
						gridTemplateColumns:
							"repeat(auto-fill,minmax(160px,1fr)) !important",
						gridAutoColumns: "minmax(160px, 1fr)",
					}}
				>
					{forecast.forecast.forecastday[0].hour.map((item, index) => (
						<Grid key={index} container>
							<Grid item xs={12} sx={{ textAlign: "center", mb: 2 }}>
								<Typography variant="body1">
									{moment(item.time).format("HHA")}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Card
									elevation={3}
									sx={{
										textAlign: "center",
										borderRadius: 4,
										backgroundColor: "rgba(255,255,255,0.5)",
									}}
								>
									<CardActionArea>
										<CardMedia
											component="img"
											width="100"
											image={item.condition.icon}
											alt={item.condition.text}
										/>
										<CardContent>
											<Typography gutterBottom variant="h5" component="div">
												{item.temp_c} °C
											</Typography>
											<Typography variant="subtitle1" color="text.secondary">
												UV {item.uv}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
						</Grid>
					))}
				</ImageList>
			</Container>
		</>
	);
}
