// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component 
import Button from '../button';

export default class Iphone extends Component {
  //var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true});
		
	}

	// a call to fetch weather data via wunderground
	fetchWeatherDataSun = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.wunderground.com/api/82ba090fb7703694/astronomy/q/UK/London.json";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponseSun,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		
		this.setState({ display: false });
	}
	
	fetchWeatherDataCon = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.wunderground.com/api/82ba090fb7703694/conditions/q/UK/London.json";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
		
		var interval = 1000 * 60 * 2; //every 2 mins
		
		//return(setInterval(this.fetchWeatherDataCon, interval));
	}

	
	fetchWeatherDataFore = () => { //doesnt work
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.wunderground.com/api/82ba090fb7703694/forecast/q/UK/London.json";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponsePop,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		
		this.setState({ display: false });
	}

	// the main render method for the iphone component
	render() {
	
			
		
		//setInterval(this.fetchWeatherData, interval);
		
		
		
		
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		
		// display all weather data
		return (
			<div class={ style.container }>
				
				<div class={ style.fsegment }>
				
					<div class={ style.city }>{this.state.maxt},{this.state.locate}, {this.state.countr} </div> 
					
					
					<div class = {style.feels}> {"Feels like: " + this.state.feel +"°"} </div>

					<div class = {style.conditions }> { this.state.cond }</div>
				
					<div class = {style.sunr}>  </div>
					<div class = {style.sunrt}> {this.state.sunr} </div>

					<div class = {style.suns}>  </div>
					<div class = {style.sunst}> {this.state.suns} </div>

					<div class = {style.rain}>  </div>
					<div class = {style.raint}> {this.state.precip + "%"} </div>

					<div class = {style.visib}>  </div>
					<div class = {style.visibt}> {this.state.visi} </div>
					
					<div class={ tempStyles }>{ this.state.temp }</div>


					<div class={ style.details }>
					<div class= { style_iphone.container }> 
					{ this.state.display ? <Button clickFunction={ this.fetchWeatherDataCon }/> : null }
					</div>
					</div>
				
				</div>

				<div class = { style.ssegment }> second segment 
				<Button id="myBtn" clickFunction={ this.fetchWeatherDataFore }/>
				<p id="demo"></p>
				</div>
				<div class = { style.tsegment }> third </div>
				
				
			</div>
		);
	}


  
	parseResponse = (parsed_json) => {
		var country = parsed_json['current_observation']['display_location']['country'];
		var location = parsed_json['current_observation']['display_location']['city'];
		var temp_c = parsed_json['current_observation']['temp_c'];
		var conditions = parsed_json['current_observation']['weather'];
		
		var feels_like =  parsed_json['current_observation']['feelslike_c'];
		var precip_metric = parsed_json['current_observation']['precip_today_metric'];
		var visibility = parsed_json['current_observation']['visibility_mi'];
		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions, 
			countr : country,
			feel : feels_like,
			visi : visibility,
			precip : precip_metric
			//sunr : sunrise,
			//suns : sunset,
			
		});      
	}

	parseResponseSun = (parsed_json) => {
			
			alert("fgohi");
			var sunrise = parsed_json['moon_phase']['sunrise']['hour'];
			var sunset = parsed_json['moon_phase']['sunset']['hour'];
			this.setState({
			sunr : sunrise,
			suns : sunset
		});
	}


	parseResponsePop = (parsed_json) => { //function for Probability of Precipitation
			alert("POP");
			var precip_chance = parsed_json['forecast']['txt_forecast']['forecastday'][0]['pop'];
			var maximum_temp = parsed_json['forecast']['simpleforecast']['forecastday'][0]['high']['celsius'];
			//var minimum_temp
		this.setState({
			precip : precip_chance,
			maxt : maximum_temp
		});
	}
}

