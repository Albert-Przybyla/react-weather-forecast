import { useWeatherContext } from "@/contexts/weatherContext";
import "./DiurectInfo.css";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";
import { ArrowUp } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useForecastContext } from "@/contexts/forecastContext";
import Chart from "./chart";

const DirectInfo = () => {
  const { weatherData } = useWeatherContext();
  const { forecastData } = useForecastContext();

  const getBackgroundClass = () => {
    if (weatherData === null) return "sun";

    if (weatherData.weather[0].id >= 200 && weatherData.weather[0].id <= 232) {
      return "rain";
    } else if (weatherData.weather[0].id >= 300 && weatherData.weather[0].id <= 321) {
      return "rain";
    } else if (weatherData.weather[0].id >= 500 && weatherData.weather[0].id <= 531) {
      return "rain";
    } else if (weatherData.weather[0].id >= 600 && weatherData.weather[0].id <= 622) {
      return "snow";
    } else if (weatherData.weather[0].id >= 701 && weatherData.weather[0].id <= 781) {
      return "cold";
    } else if (weatherData.weather[0].id === 800) {
      return "sun";
    } else if (weatherData.weather[0].id >= 801 && weatherData.weather[0].id <= 804) {
      return "warm";
    } else {
      return "sun";
    }
  };

  return (
    <Card className="weather-info mx-auto my-4 text-center">
      <CardHeader>
        <CardTitle className="text-2xl ">{weatherData ? weatherData.name : "Search location"}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className={`${getBackgroundClass()} py-6 px-10`}>
        <div className="weather-info-inner rounded-md text-center p-3 mb-6">
          <div className="h-[250px] w-[200px] mx-auto mb-5">
            {weatherData ? (
              <>
                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`} />
                <h1 className="text-2xl">{weatherData?.weather[0].description}</h1>
              </>
            ) : (
              <Skeleton className="h-full w-full rounded-md" />
            )}
          </div>
          <h1 className="text-2xl mb-3">
            {weatherData ? (
              <>
                <p>Temperature</p> <b>{weatherData?.main.temp}°C</b>
              </>
            ) : (
              <Skeleton className="h-[45px]  rounded-md" />
            )}
          </h1>

          <h3 className="mb-3">
            {weatherData ? (
              <>
                <p>Perceived temperature</p> <b>{weatherData?.main.feels_like}°C</b>
              </>
            ) : (
              <Skeleton className="h-[45px]  rounded-md" />
            )}
          </h3>

          <h3 className="mb-3">
            {weatherData ? (
              <>
                <p>Wind</p>{" "}
                <b>
                  <ArrowUp
                    className="shrink-0 opacity-50 inline"
                    style={{ transform: "rotate(" + weatherData?.wind.deg + "deg)" }}
                  />
                  {weatherData?.wind.speed} m/s
                </b>
              </>
            ) : (
              <Skeleton className="h-[45px]  rounded-md" />
            )}
          </h3>
        </div>
        <div className="p-3 mt-6">
          <Carousel>
            <CarouselContent>
              {forecastData
                ? forecastData.list.map((el, index) => (
                    <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/5">
                      <div className="p-1">
                        <div className="weather-info-inner rounded-md text-center p-1">
                          <h1 className="p-2">
                            {new Date(el.dt_txt.substring(0, 11)).toString().split(" ")[1] +
                              " " +
                              new Date(el.dt_txt.substring(0, 11)).toString().split(" ")[2]}
                          </h1>
                          <h1 className="p-2">{el.dt_txt.substring(11, 16)}</h1>
                          <img
                            src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`}
                            className="mx-auto"
                          />
                          <p className="p-2">{el.weather[0].description}</p>
                          <b className="p-2">{el.main.temp} °C</b>
                          <p className="p-2">
                            <small>{el.main.feels_like} °C</small>
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))
                : Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/5">
                      <div className="p-1">
                        <div className="weather-info-inner rounded-md">
                          <Skeleton className="h-[250px] w-full rounded-md" />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="weather-info-inner rounded-md text-center p-3 mt-6">{weatherData && <Chart />}</div>
      </CardContent>
    </Card>
  );
};

export default DirectInfo;
