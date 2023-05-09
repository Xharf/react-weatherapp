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

export async function getStaticProps() {
	return {
		props: {
			API_KEY: process.env.API_KEY,
		},
	};
}

export default function Home(props) {
	const [initializing, setInitializing] = useState(true);
	const [weather, setWeather] = useState({});
	const [displayedLocation, setDisplayedLocation] = useState("");
	const [location, setLocation] = useState("depok");
	const [future, setFuture] = useState([]);

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
		if (location) {
			Axios.get(
				`/current.json?key=${props.API_KEY}&lang=en&q=${location}`,
			).then((res) => {
				setWeather(res.data);
				setInitializing(false);
			});

			Axios.get(
				`/forecast.json?key=${props.API_KEY}&lang=en&q=${location}&days=3`,
			).then((res) => {
				setFuture(res.data.forecast.forecastday);
			});
		}
	}, []);

	useEffect(() => {
		if (location) {
			Axios.get(
				`/current.json?key=${props.API_KEY}&lang=en&q=${location}`,
			).then((res) => {
				setWeather(res.data);
				setInitializing(false);
			});

			Axios.get(
				`/forecast.json?key=${props.API_KEY}&lang=en&q=${location}&days=3`,
			).then((res) => {
				setFuture(res.data.forecast.forecastday);
			});
		}
	}, [location]);

	if (initializing) return <div>Loading...</div>;

	return (
		<>
			<Container maxWidth="sm" sx={{ mt: 3 }}>
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
						<CalendarMonthIcon></CalendarMonthIcon>
					</Grid>
				</Grid>
				<Grid container justifyContent="center">
					<Grid item xs={12} textAlign="center">
						<img
							style={{ width: "40%" }}
							src={weather.current.condition.icon}
							alt="Weather Icon"
						/>
					</Grid>
					<Grid item xs={12} textAlign="center">
						<Typography variant="subtitle2">
							{weather.current.condition.text}
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
										{weather.current.wind_kph} Km/h
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
										{weather.current.humidity}%
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={12} textAlign="center">
							<Typography variant="subtitle1">
								Last updated: {weather.current.last_updated}
							</Typography>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={12} textAlign="center">
							<Typography variant="subtitle1" sx={{ textAlign: "center" }}>
								Location {weather.location.name}, {weather.location.region},{" "}
								{weather.location.country}
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
					{future.map((item, index) => (
						<Grid key={index} container>
							<Grid item xs={12} sx={{ textAlign: "center", mb: 2 }}>
								<Typography variant="body1">
									{moment(item.date).format("ddd, hA")}
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
											image={item.day.condition.icon}
											alt={item.day.condition.text}
										/>
										<CardContent>
											<Typography gutterBottom variant="h5" component="div">
												{item.day.avgtemp_c} °C
											</Typography>
											<Typography variant="subtitle1" color="text.secondary">
												UV {item.day.uv}
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
