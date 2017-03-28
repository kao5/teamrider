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

		//initialize variables for hourly data
		this.state.index = 0;
		this.hours = [];
		this.hourlytemps = [];
		this.hourlyicons = [];
		this.hourlypops = [];

		// button display state
		this.setState({ display: true});
		
		
	}

	// a call to fetch astronomy weather data via wunderground
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
	

	// a call to fetch conditions weather data via wunderground
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
		
	}


	// a call to fetch forecast weather data via wunderground
	fetchWeatherDataFore = () => {
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


	//hourly call
	fetchHourlyDataFore = () => {
		var url = "http://api.wunderground.com/api/10a725acf42720a1/hourly/q/UK/London.json"; 
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseHourlyResponse,
			error : function(req, err) { console.log('API call failed ' + err); }
		 }) 

		// once the data grabbed, hide the button 
		this.setState({ display: false });
	}


	// increase index of hourly temps to show
	increaseIndex = () => {
		var temp = this.state.index;
		if (temp < 9)
			this.setState({ index: temp+3 });

		this.setState({
			hour0: this.hours[this.state.index],
			hour1: this.hours[this.state.index+1],
			hour2: this.hours[this.state.index+2],
			temp0: this.hourlytemps[this.state.index],
			temp1: this.hourlytemps[this.state.index+1],
			temp2: this.hourlytemps[this.state.index+2],
			icon0: this.hourlyicons[this.state.index],
			icon1: this.hourlyicons[this.state.index+1],
			icon2: this.hourlyicons[this.state.index+2],
			pop0: this.hourlypops[this.state.index],
			pop1: this.hourlypops[this.state.index+1],
			pop2: this.hourlypops[this.state.index+2]
		});
	}

	// decrease index of hourly temps to show
	decreaseIndex = () => {
		if (this.state.index > 0)
			this.setState({ index: this.state.index - 3 });

		this.setState({
			hour0: this.hours[this.state.index],
			hour1: this.hours[this.state.index+1],
			hour2: this.hours[this.state.index+2],
			temp0: this.hourlytemps[this.state.index],
			temp1: this.hourlytemps[this.state.index+1],
			temp2: this.hourlytemps[this.state.index+2],
			icon0: this.hourlyicons[this.state.index],
			icon1: this.hourlyicons[this.state.index+1],
			icon2: this.hourlyicons[this.state.index+2],
			pop0: this.hourlypops[this.state.index],
			pop1: this.hourlypops[this.state.index+1],
			pop2: this.hourlypops[this.state.index+2]
		});
	}


	information = () => {
		if (this.state.temp  >= 75)
		{
			window.alert("It's pretty warm! Remember to take a water bottle with you.");
		}
		else if(this.state.temp < 50)
		{
			if(this.state.precip > 10)
			{
				window.alert("Remember to take a coat and umbrella with you! It looks like it's going to be cold and rainy.");
			}
			else {
				window.alert("Remember to take a coat! It's going to be chilly today.");
			}
		}
		else if (this.state.precip > 5)
		{

			window.alert("Remember to take an umbrella! It looks like it's gonna rain today.");

		}
		else
		{

			window.alert("sdgf");
		}
		

	}

	//call APIs once before rendering
	componentWillMount(){
	this.callingAPIs()
	}

	render(){

		const Link = ({children, ...props}) => <a {...props}>{children}</a>;
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		
		// display all weather data
		return (
			
			<div class={ style.container}>
				
				<div class={ style.fsegment }>
					
					<div class = {style.flag}>
					<button > </button>
					</div>


					<div class = {style.info} > {this.state.locate} </div>

					<div class = {style.warning}>
					<button onclick = {this.information}> </button>
					</div>
					<div class={ style.city }>{this.state.locate}, {this.state.countr} </div> 
					
					
					<div class = {style.maxmintemp}> {this.state.maxt + "°" + " | " + this.state.mint + "°"} </div>
					
					<div class = {style.feels}> {"Feels like: " + this.state.feel +"°"} </div>

					<div class = {style.conditions }> { this.state.cond }</div>
				

					<div class = {style.sunr}>  </div>
					<div class = {style.sunrt}> {this.state.sunr + ":" + this.state.sunrt} </div>

					<div class = {style.suns}>  </div>
					<div class = {style.sunst}> {this.state.suns + ":" + this.state.sunst} </div>

					<div class = {style.rain}>  </div>
					<div class = {style.raint}> {this.state.precip + "%"} </div>

					<div class = {style.visib}>  </div>
					<div class = {style.visibt}> {this.state.visi + " mi"} </div>
					
					<div class={ tempStyles }>{ this.state.temp }</div>


					
				
				</div>

				<div class = { style.ssegment }> 
				
					<div class = {style.left_button}>
						<button onClick={ this.decreaseIndex }></button>
					</div>

					<div class = {style.hour0}>
						{ this.state.hour0 }
					</div>
					<div class = {style.hour1}>
						{ this.state.hour1 }
					</div>
					<div class = {style.hour2}>
						{ this.state.hour2 }
					</div>

					<div class = {style.hourlytemp0}>
						{ this.state.temp0 + "°" + " | " + this.state.pop0 + "%" }
					</div>
					<div class = {style.hourlytemp1}>
						{ this.state.temp1 + "°" + " | " + this.state.pop1 + "%" }
					</div>
					<div class = {style.hourlytemp2}>
						{ this.state.temp2 + "°" + " | " + this.state.pop2 + "%" }
					</div>

					<div class = {style.hourlyicon0}>
						<img src={ this.state.icon0 } />
					</div>
					<div class = {style.hourlyicon1}>
						<img src={ this.state.icon1 } />
					</div>
					<div class = {style.hourlyicon2}>
						<img src={ this.state.icon2 } />
					</div>

					<div class = {style.right_button}>
						<button onClick={ this.increaseIndex }></button>
					</div>
				
				</div>
				<div class = { style.tsegment }>  <p>It is a good day for:</p>
					<div class = {style.placeicon}>

                        			 <ul class = {style.ul}>
                           	  		   <Link href="http://www.britishmuseum.org"><li class = {style.li}>British Museum</li></Link>
                                		   <Link href="http://boroughmarket.org.uk"><li class = {style.li}>Borough Market</li></Link>
                                 		   <Link href="https://www.visitsealife.com"><li class = {style.li}>Sea Life London Aquarium</li></Link>
                        			 </ul>

                        		 </div>
				</div>
			</div>
		);
	}




  //calling APIs and then setting a interval
	callingAPIs = () => {
				
	this.fetchWeatherDataCon()
	this.fetchWeatherDataSun()
	this.fetchWeatherDataFore()
	this.fetchHourlyDataFore()

	setInterval(this.callingAPIs, 1000 * 60 * 2); //update every 2 mins
	
	}
	
	
  
	parseResponse = (parsed_json) => { //function to store conditions
		var country = parsed_json['current_observation']['display_location']['country'];
		var location = parsed_json['current_observation']['display_location']['city'];
		var temp_c = parsed_json['current_observation']['temp_f'];
		var conditions = parsed_json['current_observation']['weather'];
		var feels_like =  parsed_json['current_observation']['feelslike_f'];
		var visibility = parsed_json['current_observation']['visibility_mi'];
		
		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions, 
			countr : country,
			feel : feels_like,
			visi : visibility,
			


		});      
	}

	parseResponseSun = (parsed_json) => { //function to store sunrise/sunset details
			
			
			var sunrise = parsed_json['moon_phase']['sunrise']['hour'];
			var sunrise_min = parsed_json['moon_phase']['sunrise']['minute'];
			var sunset = parsed_json['moon_phase']['sunset']['hour'];
			var sunset_min = parsed_json['moon_phase']['sunset']['minute'];
			this.setState({
			sunr : sunrise,
			sunrt : sunrise_min,
			suns : sunset,
			sunst : sunset_min
			 
		});
	}


	parseResponsePop = (parsed_json) => { //function to store Probability of Precipitation (pop) and max/min temp
			
			var precip_chance = parsed_json['forecast']['txt_forecast']['forecastday'][0]['pop'];
			var maximum_temp = parsed_json['forecast']['simpleforecast']['forecastday'][0]['high']['fahrenheit'];
			var minimum_temp = parsed_json['forecast']['simpleforecast']['forecastday'][0]['low']['fahrenheit'];
			var index2 = 0;
		this.setState({
			precip : precip_chance,
			maxt : maximum_temp,
			mint : minimum_temp,
			ind2 : index2
		});
	}


	parseHourlyResponse = (parsed_json) => {
		// get hours
		var hour_0 = parsed_json['hourly_forecast'][0]['FCTTIME']['civil'];
		var hour_1 = parsed_json['hourly_forecast'][1]['FCTTIME']['civil'];
		var hour_2 = parsed_json['hourly_forecast'][2]['FCTTIME']['civil'];
		var hour_3 = parsed_json['hourly_forecast'][3]['FCTTIME']['civil'];
		var hour_4 = parsed_json['hourly_forecast'][4]['FCTTIME']['civil'];
		var hour_5 = parsed_json['hourly_forecast'][5]['FCTTIME']['civil'];
		var hour_6 = parsed_json['hourly_forecast'][6]['FCTTIME']['civil'];
		var hour_7 = parsed_json['hourly_forecast'][7]['FCTTIME']['civil'];
		var hour_8 = parsed_json['hourly_forecast'][8]['FCTTIME']['civil'];
		var hour_9 = parsed_json['hourly_forecast'][9]['FCTTIME']['civil'];
		var hour_10 = parsed_json['hourly_forecast'][10]['FCTTIME']['civil'];
		var hour_11 = parsed_json['hourly_forecast'][11]['FCTTIME']['civil'];
		
		// get hourly temperature
		var temp_0 = parsed_json['hourly_forecast'][0]['temp']['english'];
		var temp_1 = parsed_json['hourly_forecast'][1]['temp']['english'];
		var temp_2 = parsed_json['hourly_forecast'][2]['temp']['english'];
		var temp_3 = parsed_json['hourly_forecast'][3]['temp']['english'];
		var temp_4 = parsed_json['hourly_forecast'][4]['temp']['english'];
		var temp_5 = parsed_json['hourly_forecast'][5]['temp']['english'];
		var temp_6 = parsed_json['hourly_forecast'][6]['temp']['english'];
		var temp_7 = parsed_json['hourly_forecast'][7]['temp']['english'];
		var temp_8 = parsed_json['hourly_forecast'][8]['temp']['english'];
		var temp_9 = parsed_json['hourly_forecast'][9]['temp']['english'];
		var temp_10 = parsed_json['hourly_forecast'][10]['temp']['english'];
		var temp_11 = parsed_json['hourly_forecast'][11]['temp']['english'];

		//get condition icons
		var icon_0 = parsed_json['hourly_forecast'][0]['icon_url'];
		var icon_1 = parsed_json['hourly_forecast'][1]['icon_url'];
		var icon_2 = parsed_json['hourly_forecast'][2]['icon_url'];
		var icon_3 = parsed_json['hourly_forecast'][3]['icon_url'];
		var icon_4 = parsed_json['hourly_forecast'][4]['icon_url'];
		var icon_5 = parsed_json['hourly_forecast'][5]['icon_url'];
		var icon_6 = parsed_json['hourly_forecast'][6]['icon_url'];
		var icon_7 = parsed_json['hourly_forecast'][7]['icon_url'];
		var icon_8 = parsed_json['hourly_forecast'][8]['icon_url'];
		var icon_9 = parsed_json['hourly_forecast'][9]['icon_url'];
		var icon_10 = parsed_json['hourly_forecast'][10]['icon_url'];
		var icon_11 = parsed_json['hourly_forecast'][11]['icon_url'];

		//get hourly chance of precipitation
		var pop_0 = parsed_json['hourly_forecast'][0]['pop'];
		var pop_1 = parsed_json['hourly_forecast'][1]['pop'];
		var pop_2 = parsed_json['hourly_forecast'][2]['pop'];
		var pop_3 = parsed_json['hourly_forecast'][3]['pop'];
		var pop_4 = parsed_json['hourly_forecast'][4]['pop'];
		var pop_5 = parsed_json['hourly_forecast'][5]['pop'];
		var pop_6 = parsed_json['hourly_forecast'][6]['pop'];
		var pop_7 = parsed_json['hourly_forecast'][7]['pop'];
		var pop_8 = parsed_json['hourly_forecast'][8]['pop'];
		var pop_9 = parsed_json['hourly_forecast'][9]['pop'];
		var pop_10 = parsed_json['hourly_forecast'][10]['pop'];
		var pop_11 = parsed_json['hourly_forecast'][11]['pop'];

		//array of hourly times
		this.hours = [hour_0, hour_1, hour_2, hour_3, hour_4, hour_5, hour_6, hour_7, hour_8, hour_9, hour_10, hour_11];
		//array of hourly temps
		this.hourlytemps = [temp_0, temp_1, temp_2, temp_3, temp_4, temp_5, temp_6, temp_7, temp_8, temp_9, temp_10, temp_11];

		//array of hourly condition icons
		this.hourlyicons = [icon_0, icon_1, icon_2, icon_3, icon_4, icon_5, icon_6, icon_7, icon_8, icon_9, icon_10, icon_11];

		//array of hourly chance of precipitation
		this.hourlypops = [pop_0, pop_1, pop_2, pop_3, pop_4, pop_5, pop_6, pop_7, pop_8, pop_9, pop_10, pop_11];

		//set inital state for hourly forecast
		this.setState({
			index: 0,
			hour0: this.hours[0],
			temp0: this.hourlytemps[0],
			hour1: this.hours[1],
			temp1: this.hourlytemps[1],
			hour2: this.hours[2],
			temp2: this.hourlytemps[2],
			icon0: this.hourlyicons[0],
			icon1: this.hourlyicons[1],
			icon2: this.hourlyicons[2],
			pop0: this.hourlypops[0],
			pop1: this.hourlypops[1],
			pop2: this.hourlypops[2],
		});
	}	


}

