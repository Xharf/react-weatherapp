import React, { useEffect, useState } from "react";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Carousel from "react-material-ui-carousel";
import Axios from "../../../model/axios";
import moment from "moment";
import Link from "next/link";

export async function getServerSideProps(context) {
	return {
		props: {
			location: context.query.location ? context.query.location : "depok", //pass it to the page props
			API_KEY: process.env.API_KEY,
		},
	};
}

export default function Forecast(props) {
	const [forecast, setForecast] = useState([]);

	useEffect(() => {
		Axios.get(
			`/forecast.json?key=${props.API_KEY}&lang=en&q=${props.location}&days=7`,
		).then((res) => {
			setForecast(res.data.forecast.forecastday);
		});
	}, []);

	if (props.location === "" || props.location === undefined) {
		<Container maxWidth="sm" sx={{ mt: 3, minHeight: "90vh" }}>
			<Typography>Please specify location</Typography>
		</Container>;
	}

	return (
		<Container maxWidth="sm" sx={{ mt: 3, minHeight: "100vh" }}>
			<Grid container mb={4}>
				<Grid item xs={12}>
					<Grid container alignItems="center" justifyContent="space-between">
						<Grid item xs={2} textAlign="center">
							<Link
								href={{
									pathname: "/",
								}}
								style={{ textDecoration: "none", color: "black" }}
							>
								<ArrowBackIcon />
							</Link>
						</Grid>
						<Grid item xs={8} textAlign="left">
							<Typography
								variant="h5"
								component="h1"
								sx={{ fontWeight: "bolder", textTransform: "capitalize" }}
							>
								{props.location}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Carousel height={200}>
				<Container>
					<Card
						sx={{
							borderRadius: 4,
							backgroundColor: "rgba(255,255,255,0.5)",
							padding: 2,
							height: "150px",
						}}
					>
						<CardContent>
							<Typography
								gutterBottom
								variant="subtitle1"
								sx={{ fontWeight: "bold" }}
								color="#3d444f"
							>
								15 menit lalu
							</Typography>
							<Typography variant="body1">
								Udara saat ini sangat kencang! Bukan waktunya untuk melakukan
								yacht trip.aaa
							</Typography>
						</CardContent>
					</Card>
				</Container>
				<Container>
					<Card
						sx={{
							borderRadius: 4,
							backgroundColor: "rgba(255,255,255,0.5)",
							padding: 2,
							height: "150px",
						}}
					>
						<CardContent>
							<Typography
								gutterBottom
								variant="subtitle1"
								sx={{ fontWeight: "bold" }}
								color="#3d444f"
							>
								19 menit lalu
							</Typography>
							<Typography variant="body1">
								Kelembaban udara saat ini sangat ideal. Kamu bisa bersantai
								bersama keluarga dengan nyaman.
							</Typography>
						</CardContent>
					</Card>
				</Container>
				<Container>
					<Card
						sx={{
							borderRadius: 4,
							backgroundColor: "rgba(255,255,255,0.5)",
							padding: 2,
							height: "150px",
						}}
					>
						<CardContent>
							<Typography
								gutterBottom
								variant="subtitle1"
								sx={{ fontWeight: "bold" }}
								color="#3d444f"
							>
								20 menit lalu
							</Typography>
							<Typography variant="body1">
								UV saat ini sangat tinggi! Jangan lupa untuk menggunakan
								sunblock.
							</Typography>
						</CardContent>
					</Card>
				</Container>
			</Carousel>

			<Container sx={{ marginY: 2 }}>
				<Typography variant="h5" component="h2">
					Next Week
				</Typography>
			</Container>

			<Container>
				<Grid container alignItems="center">
					<Grid item xs={4} textAlign="left">
						<Typography
							variant="subtitle1"
							sx={{ textAlign: "left", fontWeight: "bold" }}
						>
							Hari
						</Typography>
					</Grid>
					<Grid item xs={6} textAlign="space-between">
						<Grid container justifyContent="center">
							<Grid item xs={6}>
								<Typography
									variant="subtitle1"
									sx={{ textAlign: "center", fontWeight: "bold" }}
								>
									min
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography
									variant="subtitle1"
									color="rgba( 0,0,0,0.5)"
									sx={{ textAlign: "center", fontWeight: "bold" }}
								>
									max
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={2} textAlign="end">
						<Typography
							variant="subtitle1"
							sx={{ textAlign: "left", fontWeight: "bold" }}
						>
							condition
						</Typography>
					</Grid>
				</Grid>
			</Container>
			{forecast.map((item, index) => (
				<Container key={index}>
					<Grid container alignItems="center">
						<Grid item xs={4} textAlign="left">
							<Typography
								variant="subtitle1"
								sx={{ textAlign: "left", fontWeight: "bold" }}
							>
								{moment(item.date).format("dddd")}
							</Typography>
						</Grid>
						<Grid item xs={6} textAlign="space-between">
							<Grid container justifyContent="center">
								<Grid item xs={6}>
									<Typography
										variant="subtitle1"
										sx={{ textAlign: "center", fontWeight: "bold" }}
									>
										{item.day.maxtemp_c}°C
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography
										variant="subtitle1"
										color="rgba( 0,0,0,0.5)"
										sx={{ textAlign: "center", fontWeight: "bold" }}
									>
										{item.day.mintemp_c}°C
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={2} textAlign="end">
							<img
								src="//cdn.weatherapi.com/weather/64x64/day/113.png"
								alt="weather icon"
								width="40"
							/>
						</Grid>
					</Grid>
				</Container>
			))}
		</Container>
	);
}
