import React, { useEffect} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import axios from "axios";
import Hour from './Hour'

function App(){
var apikey='0c204223fd6ae15239717b7682a3fe3d';
function disDate(){
	let today=new Date();
	let day=today.getDay();
	document.getElementById('daytime').innerText=day;
	console.log(today);
};

function kelvintocelsius(kelvin){
  var celsius =  kelvin-273;
 return parseInt(celsius);
 }


function datecoverter(timestamp){
  // unix timestamp
  var ts = timestamp;
  
  // convert unix timestamp to milliseconds
  var ts_ms = ts * 1000;
  
  // initialize new Date object
  var date_ob = new Date(ts_ms);

  var dayname= date_ob.getDay();
  
  // year as 4 digits (YYYY)
  var year = date_ob.getFullYear();
  
  // month as 2 digits (MM)
  var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  
  // date as 2 digits (DD)
  var date = ("0" + date_ob.getDate()).slice(-2);

  var monthname=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return monthname[month-1]+' '+date;
  }
  function daynamecoverter(timestamp){
    // unix timestamp
    var ts = timestamp;
    
    // convert unix timestamp to milliseconds
    var ts_ms = ts * 1000;
    
    // initialize new Date object
    var date_ob = new Date(ts_ms);
    //The getDay() method returns the day of the week (from 0 to 6) for the specified date.
    // Note: Sunday is 0, Monday is 1, and so on.
    var dayno= date_ob.getDay();
    let dayname = ["Sunday","Monday" ,"Tuesday","Wednesday","Thursday","Friday","Saturday"];
      return dayname[dayno];
      }

  function timecoverter(timestamp){
  
    // unix timestamp
    var ts = timestamp;
    
    // convert unix timestamp to milliseconds
    var ts_ms = ts * 1000;
    
    // initialize new Date object
    var date_ob = new Date(ts_ms);
    // hours as 2 digits (hh)
      var hours = ("0" + date_ob.getHours()).slice(-2);
    
      // minutes as 2 digits (mm)
      var minutes = ("0" + date_ob.getMinutes()).slice(-2);
      
      // seconds as 2 digits (ss)
      var seconds = ("0" + date_ob.getSeconds()).slice(-2);
  
        // time as hh:mm format: 
      return hours + ":" + minutes;
      }
function celsius(){
    let temp=document.getElementById('temperature');
  let fah=document.getElementById('temperature').textContent;
 let cel= (fah-32) * 5 / 9;
 console.log(fah)
 temp.innerHTML=cel;
 document.getElementById('tempsign').innerHTML='&#8451;';
}
function fahrenheit(){
  let temp=document.getElementById('temperature');
  let cel=document.getElementById('temperature').textContent;
  console.log(cel);
  let fah = cel * 9/5 + 32;
  
  temp.innerHTML=fah; //+'&#8457;'
  document.getElementById('tempsign').innerHTML='&#8457;';
}
//useEffect(() => {
	//  async function weather(lat,lon){
	//  const data=await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`);
	//  console.log(data);

	// async function weather(lat,lon){
	// const data=await axios.get('F:\API.txt');

	// console.log(data);
    function weather(lat,lon){   
	fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
exclude={part}&appid=${apikey}`).then((response)=>{
	 response.json().then((data)=>{
	console.log(data);
  console.log(data.current.weather[0].main);
  console.log(data.hourly[11].dt);
	console.log(`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`);
   // document.getElementById().innerHTML;

    //let fdata=JSON.data;

    //console.log(fdata);
	 if(data.current.weather[0].main === "Thunderstorm"){
               document.getElementById('status').innerHTML = 'Thunderstorm';
               document.getElementById('weatherIcon').src=`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
              }else if(data.current.weather[0].main === "Drizzle"){
                document.getElementById('status').innerHTML = 'Drizzle';
                document.getElementById('weatherIcon').src=`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
             }else if(data.current.weather[0].main === "Rain"){
                document.getElementById('status').innerHTML = 'Rain';
                document.getElementById('weatherIcon').src=`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
              }else if(data.current.weather[0].main === "Snow"){
               document.getElementById('status').innerHTML = 'Snow';
               document.getElementById('weatherIcon').src=`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
            }else if(data.current.weather[0].main === "Mist"){
                document.getElementById('status').innerHTML = 'Mist';
                document.getElementById('weatherIcon').src=`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
              }else if(data.current.weather[0].main === "Clear"){
                document.getElementById('status').innerHTML = 'Clear';
                document.getElementById('weatherIcon').src=`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
             }else if(data.current.weather[0].main === "Clouds"){
                document.getElementById('status').innerHTML ='Clouds';
                document.getElementById('weatherIcon').src=`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
              }else if(data.current.weather[0].main === "Haze"){
                document.getElementById('status').innerHTML ='Haze';
                document.getElementById('weatherIcon').src=`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
              }

              document.getElementById('temperature').innerHTML=kelvintocelsius(data.current.temp); //+'&#8451;

              document.getElementById('daytime').innerHTML=daynamecoverter(data.current.dt);
              document.getElementById('lastupdate').innerHTML='Last Update on '+timecoverter(data.timezone_offset) ;

           // daily hour data

              document.getElementById('hourdt0').innerHTML=timecoverter(data.hourly[0].dt);
              document.getElementById('hourtemp0').innerHTML=kelvintocelsius(data.hourly[0].temp)+'&#8451;';
              document.getElementById('hourimg0').src = `http://openweathermap.org/img/wn/${data.hourly[0].weather[0].icon}@2x.png`;
              document.getElementById('hourdesc0').innerHTML=data.hourly[0].weather[0].description;
  
               document.getElementById('hourdt1').innerHTML = timecoverter(data.hourly[1].dt);
               document.getElementById('hourtemp1').innerHTML = kelvintocelsius(data.hourly[1].temp)+'&#8451;';
               document.getElementById('hourimg1').src = `http://openweathermap.org/img/wn/${data.hourly[1].weather[0].icon}@2x.png`;
               document.getElementById('hourdesc1').innerHTML = data.hourly[1].weather[0].description;
  
              document.getElementById('hourdt2').innerHTML=timecoverter(data.hourly[2].dt);
              document.getElementById('hourtemp2').innerHTML=kelvintocelsius(data.hourly[2].temp)+'&#8451;';
              document.getElementById('hourimg2').src = `http://openweathermap.org/img/wn/${data.hourly[2].weather[0].icon}@2x.png`;
              document.getElementById('hourdesc2').innerHTML=data.hourly[2].weather[0].description;
  
              document.getElementById('hourdt3').innerHTML=timecoverter(data.hourly[3].dt);
              document.getElementById('hourtemp3').innerHTML=kelvintocelsius(data.hourly[3].temp)+'&#8451;';
              document.getElementById('hourimg3').src = `http://openweathermap.org/img/wn/${data.hourly[3].weather[0].icon}@2x.png`;
              document.getElementById('hourdesc3').innerHTML=data.hourly[3].weather[0].description;
                
              document.getElementById('hourdt4').innerHTML=timecoverter(data.hourly[4].dt);
              document.getElementById('hourtemp4').innerHTML=kelvintocelsius(data.hourly[4].temp)+'&#8451;';
              document.getElementById('hourimg4').src = `http://openweathermap.org/img/wn/${data.hourly[4].weather[0].icon}@2x.png`;
              document.getElementById('hourdesc4').innerHTML=data.hourly[4].weather[0].description;

              document.getElementById('hourdt5').innerHTML=timecoverter(data.hourly[5].dt);
              document.getElementById('hourtemp5').innerHTML=kelvintocelsius(data.hourly[5].temp)+'&#8451;';
              document.getElementById('hourimg5').src = `http://openweathermap.org/img/wn/${data.hourly[5].weather[0].icon}@2x.png`;
              document.getElementById('hourdesc5').innerHTML=data.hourly[5].weather[0].description;

              
         // details humidity 

         document.getElementById('currentfeelslike').innerHTML = kelvintocelsius(data.current.feels_like);
              document.getElementById('currentuvi').innerHTML = data.current.uvi;
              document.getElementById('currenthumidity').innerHTML = data.current.humidity + " %";
              document.getElementById('currentvisibility').innerHTML = data.current.visibility + " m";
              document.getElementById('currentwindspeed').innerHTML = data.current.wind_speed + " metre/sec";
              document.getElementById('currentpressure').innerHTML = data.current.pressure + " hPa";
              document.getElementById('currentsunrise').innerHTML = timecoverter(data.current.sunrise);
              document.getElementById('currentsunset').innerHTML = timecoverter(data.current.sunset);
    // end

    document.getElementById('dailydt0').innerHTML = datecoverter(data.daily[0].dt);
    document.getElementById('dailywdesc0').innerHTML = data.daily[0].weather[0].description;
    document.getElementById('dailywicon0').src =`http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`;
    document.getElementById('dailytemp0').innerHTML = kelvintocelsius(data.daily[0].temp.max)+'/'+kelvintocelsius(data.daily[0].temp.min);

    document.getElementById('dailydt1').innerHTML = datecoverter(data.daily[1].dt);
    document.getElementById('dailywdesc1').innerHTML = data.daily[1].weather[0].description;
    document.getElementById('dailywicon1').src =`http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png`;
    document.getElementById('dailytemp1').innerHTML = kelvintocelsius(data.daily[1].temp.max)+'/'+kelvintocelsius(data.daily[1].temp.min);

    document.getElementById('dailydt2').innerHTML = datecoverter(data.daily[2].dt);
    document.getElementById('dailywdesc2').innerHTML = data.daily[2].weather[0].description;
    document.getElementById('dailywicon2').src =`http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png`;
    document.getElementById('dailytemp2').innerHTML = kelvintocelsius(data.daily[0].temp.max)+'/'+kelvintocelsius(data.daily[0].temp.min);

    document.getElementById('dailydt3').innerHTML = datecoverter(data.daily[3].dt);
    document.getElementById('dailywdesc3').innerHTML = data.daily[3].weather[0].description;
    document.getElementById('dailywicon3').src =`http://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png`;
    document.getElementById('dailytemp3').innerHTML = kelvintocelsius(data.daily[0].temp.max)+'/'+kelvintocelsius(data.daily[0].temp.min);

    document.getElementById('dailydt4').innerHTML = datecoverter(data.daily[4].dt);
    document.getElementById('dailywdesc4').innerHTML = data.daily[4].weather[0].description;
    document.getElementById('dailywicon4').src =`http://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png`;
    document.getElementById('dailytemp4').innerHTML = kelvintocelsius(data.daily[4].temp.max)+'/'+kelvintocelsius(data.daily[4].temp.min);

    document.getElementById('dailydt5').innerHTML = datecoverter(data.daily[5].dt);
    document.getElementById('dailywdesc5').innerHTML = data.daily[5].weather[0].description;
    document.getElementById('dailywicon5').src =`http://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}@2x.png`;
    document.getElementById('dailytemp5').innerHTML = kelvintocelsius(data.daily[5].temp.max)+'/'+kelvintocelsius(data.daily[5].temp.min);

    document.getElementById('dailydt6').innerHTML = datecoverter(data.daily[6].dt);
    document.getElementById('dailywdesc6').innerHTML = data.daily[6].weather[0].description;
    document.getElementById('dailywicon6').src =`http://openweathermap.org/img/wn/${data.daily[6].weather[0].icon}@2x.png`;
    document.getElementById('dailytemp6').innerHTML = kelvintocelsius(data.daily[6].temp.max)+'/'+kelvintocelsius(data.daily[6].temp.min);

    
  })
	})
	};
 
//});

function fetchCity() {
	let city=document.getElementById('city').value;
	console.log(city);
	fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=ff0bddf526ae4f82bee54f6ef844e238`).then((response)=>{
	 response.json().then((res)=>{
      
	cityname(res.results[0].geometry.lat,res.results[0].geometry.lng);
	weather(res.results[0].geometry.lat,res.results[0].geometry.lng);
     document.getElementById('cityname').innerHTML= city;
	})
	.catch((error) => {
	alert("Enter your city name correctly or use location");
	});
});}

function cityname(lan,lon){
	fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lan}+${lon}+&key=ac4a081f3e3f49ac99e707606b00755c`) //  5b28e77f5c474f739d928132f3aa0ca1
            .then(response => response.json())
            .then(cdata => {
             document.getElementById('cityname').innerHTML= cdata.results[0].formatted;
                           
            })
              .catch((error) => {
              console.log(error);
              
              });
  
          }

function location(){
	if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
        
       weather(position.coords.latitude, position.coords.longitude); 
  cityname(position.coords.latitude, position.coords.longitude);
      })
    }else{
      alert("you blocked or your borowser dont support location . showing default location kolkata");
    }  
  };
 function defaultlocation() {
    cityname(22.5454125, 88.3567752); 
    weather(22.5454125, 88.3567752) ;
   };
defaultlocation();
	return(
	<>
	<div className="container">
	<nav className="navbar navbar-light bg-light">
  <span className="navbar-brand mb-0 h1">Weather Application</span>
</nav>
</div>

		<div className="container" style={{marignTop:"10px", paddngTop:"5px"}}>
	<div className="row justify-content-center">
	
  <div className="form-group mx-sm-3 mb-2">
    
    <input className="form-control" id="city" placeholder="Enter City Name" />
  </div>
  <button className="btn btn-dark mb-2" onClick={fetchCity}><i className="fa fa-search" aria-hidden="true"></i></button>
  <button style={{ marginLeft: "10px" ,fontSize:"15px", padding:"4px 4px 5px 5px"}} className="btn btn-success mb-2" onClick={location}><i className="fa fa-location-arrow" aria-hidden="true"></i></button>

</div>
</div>
<div className="container" style={{backgroundColor:'#dbe9ff'}}>
  <div className="row">
    <div className="col-8">
      <h2 style={{fontWeight:"200"}} id="cityname">City Name</h2>
      <h3 style={{fontWeight:"200"}} id="daytime">Day, time</h3>
      <h3 style={{fontWeight:"200"}} id="lastupdate">Last Update</h3>
    </div>
    
  </div>
  <div className="row">
    <div className="col-8">
    <img src="" alt="WeatherIcon" id="weatherIcon" />
    <div>
    <h1 style={{fontSize:'100px',display:"inline"}} id='temperature'></h1><h1 id="tempsign"style={{display:"inline"}}>&#8451;</h1>
    </div>
    </div>
    <div className="col-4">
      <h1 style={{fontWeight:"200"}} id="status">Status</h1>
    </div>
  </div>
</div>
<div className="container">
  <p><a href="#" onClick={celsius}>Celsius</a> <a href="#" onClick={fahrenheit}>Fahrenheit</a></p>
</div>
<div className="container" style={{backgroundColor:"#f8f9fa"}}>
       
          <div>
           <h2>Next 6 Hours Weather Forcast:</h2></div>
           <div className="row">
          <div className=" col today">
           <p id="hourdt0">aaa</p>
           <img id="hourimg0" src=""/>
           <p id="hourdesc0">aaaaaa</p>
           <p id="hourtemp0">aaa</p>
          </div>

          <div className="col today">
           <p id="hourdt1">aaa</p>
           <img id="hourimg1" src=""/>
           <p id="hourdesc1">aaaaaa</p>
           <p id="hourtemp1">aaa</p>
          </div>

          <div className="col today">
           <p id="hourdt2">aaa</p>
           <img id="hourimg2" src=""/>
           <p id="hourdesc2">aaaaaa</p>
           <p id="hourtemp2">aaa</p>
          </div>

          <div className=" col today">
           <p id="hourdt3">aaa</p>
           <img id="hourimg3" src=""/>
           <p id="hourdesc3">aaaaaa</p>
           <p id="hourtemp3">aaa</p>
          </div>

          <div className="col today">
           <p id="hourdt4">aaa</p>
           <img id="hourimg4" src=""/>
           <p id="hourdesc4">aaaaaa</p>
           <p id="hourtemp4">aaa</p>
          </div>

          <div className=" col today">
           <p id="hourdt5">aaa</p>
           <img id="hourimg5" src=""/>
           <p id="hourdesc5">aaaaaa</p>
           <p id="hourtemp5">aaa</p>
          </div>

                

        
   
   </div>
</div>
<div className="container">
  <div className="row">
    <div className="col-sm-4 humidity" style={{textAlign: 'center'}}>
    <h2 style={{marginBottom: "30px"}}>Daily Informaion:</h2>
      <div><p>Sunrise: </p><p id="currentsunrise">32</p></div>
      <div><p>Sunset: </p><p id="currentsunset">32</p></div>
      <div><p>Feels like: </p><p id="currentfeelslike">30</p></div>
      <div><p>UV Index: </p><p id="currentuvi">32</p></div>
      <div><p>Wind: </p><p  id="currentwindspeed">10</p></div>
      <div><p>Humidity: </p><p id="currenthumidity">85</p></div>
      <div><p>Visibility: </p><p id="currentvisibility">32</p></div>
      <div><p>Air Pressure: </p><p id="currentpressure">32</p></div>
    </div>
    
    
    <div className="col-sm-8 future" style={{textAlign: 'center'}}>
  
       <h2 style={{marginBottom: '30px'}}>Forcast For The Next 7 Days</h2>
          <hr />
          <div className="daily" >
        <div style={{width:'100%', height:'60px'}}>
             <p id='dailydt0'></p>
             <p id='dailywdesc0'></p>
             <i style={{float:'left', height: '100%', width: '25%'}}><img id='dailywicon0' src='icon.png' style={{width: '50px', height: '50px'}} /></i>
             <p id='dailytemp0'></p>
       </div>
       <div style={{width:'100%', height:'60px'}}>
             <p id='dailydt1'></p>
             <p id='dailywdesc1'></p>
             <i style={{float:'left', height: '100%', width: '25%'}}><img id='dailywicon1' src='icon.png' style={{width: '50px', height: '50px'}} /></i>
             <p id='dailytemp1'></p>
       </div>
       <div style={{width:'100%', height:'60px'}}>
             <p id='dailydt2'></p>
             <p id='dailywdesc2'></p>
             <i style={{float:'left', height: '100%', width: '25%'}}><img id='dailywicon2' src='icon.png' style={{width: '50px', height: '50px'}} /></i>
             <p id='dailytemp2'></p>
       </div>
       <div style={{width:'100%', height:'60px'}}>
             <p id='dailydt3'></p>
             <p id='dailywdesc3'></p>
             <i style={{float:'left', height: '100%', width: '25%'}}><img id='dailywicon3' src='icon.png' style={{width: '50px', height: '50px'}} /></i>
             <p id='dailytemp3'></p>
       </div>
       <div style={{width:'100%', height:'60px'}}>
             <p id='dailydt4'></p>
             <p id='dailywdesc4'></p>
             <i style={{float:'left', height: '100%', width: '25%'}}><img id='dailywicon4' src='icon.png' style={{width: '50px', height: '50px'}} /></i>
             <p id='dailytemp4'></p>
       </div>
       <div style={{width:'100%', height:'60px'}}>
             <p id='dailydt5'></p>
             <p id='dailywdesc5'></p>
             <i style={{float:'left', height: '100%', width: '25%'}}><img id='dailywicon5' src='icon.png' style={{width: '50px', height: '50px'}} /></i>
             <p id='dailytemp5'></p>
       </div>
       <div style={{width:'100%', height:'60px'}}>
             <p id='dailydt6'></p>
             <p id='dailywdesc6'></p>
             <i style={{float:'left', height: '100%', width: '25%'}}><img id='dailywicon6' src='icon.png' style={{width: '50px', height: '50px'}} /></i>
             <p id='dailytemp6'></p>
       </div>
    </div>
  </div>
</div>
  </div>
  <div className="container">
  <div className="jumbotron text-center" style={{marginBottom:'0', borderRadius: '0px', color: 'aliceblue',backgroundColor: 'darkcyan'}}>
    <h1>Contact Info</h1>
    <p>anirbansarkar.1235@gmail.com</p>
  </div>
</div>
	</>);

};
// +`<sup style={{verticalAlign: 'super', fontSize: '16rem'}}><a href="#">&#x2103; |</a></sup><sup style={{verticalAlign: 'super',fontSize: '16rem'}} onClick={location}><a href="#">&#8457;</a></sup>`




export default App; 